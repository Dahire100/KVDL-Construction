import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
                <span className="text-lg font-bold text-primary-foreground">K</span>
              </div>
              <div>
                <div className="text-lg font-bold leading-none">KVDL Construction</div>
                <div className="text-xs text-muted-foreground">Building Dreams</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Licensed, Insured & LEED Certified. Building excellence since 2004 with over 20 years of unwavering commitment to our clients.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-md border hover-elevate active-elevate-2"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-md border hover-elevate active-elevate-2"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-md border hover-elevate active-elevate-2"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-md border hover-elevate active-elevate-2"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-home">
                  Home
                </a>
              </Link>
              <Link href="/about">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-about">
                  About Us
                </a>
              </Link>
              <Link href="/projects">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-projects">
                  Our Projects
                </a>
              </Link>
              <Link href="/gallery">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-gallery">
                  Gallery
                </a>
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-semibold mb-4">Our Services</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>Commercial Construction</li>
              <li>Residential Buildings</li>
              <li>Infrastructure Projects</li>
              <li>Project Planning</li>
              <li>24/7 Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-4">Contact Info</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">1234 Construction Ave<br />Seattle, WA 98301</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">contact@kvdlconstruction.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} KVDL Construction. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
