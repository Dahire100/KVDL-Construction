import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import createMemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
import type { SafeUser } from "@shared/schema";

const app = express();
const MemoryStore = createMemoryStore(session);

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

// Session configuration with memorystore to prevent memory leaks
app.use(session({
  secret: process.env.SESSION_SECRET || "kvdl-construction-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      
      const isValid = await storage.verifyPassword(user.id, password);
      if (!isValid) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await storage.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// Serve static files from the attached_assets directory
app.use('/attached_assets', express.static('attached_assets'));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }


  const port = parseInt(process.env.PORT || '5000', 10);
  const listenOptions: any = {
    port,
    host: "0.0.0.0",
  };

  // Attempt to use reusePort where supported. On some platforms (Windows)
  // `reusePort` is not supported and causes an ENOTSUP error. Attach an
  // error handler so we can retry without reusePort if that happens.
  const startServer = (opts: any) => {
    server.listen(opts, () => {
      log(`serving on port ${port}`);
    });
  };

  // First try with reusePort enabled where possible.
  try {
    // Only set reusePort; Node will emit an error if unsupported.
    startServer({ ...listenOptions, reusePort: true });

    server.on("error", (err: any) => {
      if (err && (err.code === "ENOTSUP" || err.code === "EOPNOTSUPP")) {
        log("reusePort not supported on this platform, retrying without it", "express");
        // Remove the listener to avoid duplicate handling
        server.removeAllListeners("error");
        startServer(listenOptions);
      } else {
        // rethrow if it's another error
        throw err;
      }
    });
  } catch (err) {
    // If listen throws synchronously for some reason, try without reusePort
    log("Failed to listen with reusePort, retrying without it", "express");
    startServer(listenOptions);
  }
})();
