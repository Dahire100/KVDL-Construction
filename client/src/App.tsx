import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import ManageProjects from "@/pages/admin/ManageProjects";
import GalleryManagement from "@/pages/admin/GalleryManagement";
import CMSManagement from "@/pages/admin/CMSManagement";
import SettingsPage from "@/pages/admin/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/">
        <PublicLayout>
          <Home />
        </PublicLayout>
      </Route>
      <Route path="/about">
        <PublicLayout>
          <About />
        </PublicLayout>
      </Route>
      <Route path="/projects">
        <PublicLayout>
          <Projects />
        </PublicLayout>
      </Route>
      <Route path="/projects/:id">
        <PublicLayout>
          <ProjectDetail />
        </PublicLayout>
      </Route>
      <Route path="/gallery">
        <PublicLayout>
          <Gallery />
        </PublicLayout>
      </Route>
      <Route path="/contact">
        <PublicLayout>
          <Contact />
        </PublicLayout>
      </Route>

      {/* Login Route */}
      <Route path="/login">
        <Login />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </Route>
      <Route path="/admin/projects">
        <AdminLayout>
          <ManageProjects />
        </AdminLayout>
      </Route>
      <Route path="/admin/gallery">
        <AdminLayout>
          <GalleryManagement />
        </AdminLayout>
      </Route>
      <Route path="/admin/cms">
        <AdminLayout>
          <CMSManagement />
        </AdminLayout>
      </Route>
      <Route path="/admin/settings">
        <AdminLayout>
          <SettingsPage />
        </AdminLayout>
      </Route>

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
