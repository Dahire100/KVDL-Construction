import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Clock, Phone, TrendingUp, CheckCircle2, Shield } from "lucide-react";
import heroImage from "@assets/generated_images/Construction_site_hero_image_bb052577.png";

export default function Home() {
  const services = [
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: "Free Estimate",
      description: "Get a detailed project quote within 48 hours with no obligations",
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      title: "Project Planning",
      description: "Comprehensive planning and design services for your construction needs",
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: "24/7 Support",
      description: "Emergency support for ongoing projects, contact our 24/7 emergency line",
    },
  ];

  const stats = [
    { value: "20+", label: "Years Experience" },
    { value: "500+", label: "Projects Completed" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "3", label: "Certifications" },
  ];

  const certifications = [
    { icon: <CheckCircle2 className="h-6 w-6" />, label: "Licensed" },
    { icon: <Shield className="h-6 w-6" />, label: "Insured" },
    { icon: <Award className="h-6 w-6" />, label: "LEED Certified" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Construction site at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container px-4 md:px-8 text-center">
          <Badge variant="outline" className="mb-6 text-white border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2" data-testid="badge-hero">
            Building Excellence Since 2004
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight" data-testid="text-hero-title">
            Building Dreams, Creating Infrastructure
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Professional construction services with over 20 years of expertise. Licensed, Insured, and LEED Certified for your peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button size="lg" className="text-lg px-8 py-6 bg-primary/90 backdrop-blur-sm border border-primary-border" data-testid="button-hero-cta">
                Get Free Project Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 text-white border-white/30 bg-white/10 backdrop-blur-sm" data-testid="button-hero-secondary">
                View Our Projects
              </Button>
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                {cert.icon}
                <span className="font-medium">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-services-title">
              How Can We Help?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive construction solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover-elevate active-elevate-2 transition-all duration-200" data-testid={`card-service-${index}`}>
                <CardContent className="p-8">
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link href="/contact">
                    <Button variant="ghost" className="px-0 group" data-testid={`button-service-${index}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Building Excellence Since 2004
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Two decades of unwavering commitment to quality craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get in touch with our experts to discuss your construction project and receive a free detailed estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 border-white" data-testid="button-cta-estimate">
                Get Free Project Estimate
              </Button>
            </Link>
            <a href="tel:5551234567">
              <Button size="lg" variant="ghost" className="text-lg px-8 py-6 text-white border-white/20 hover:bg-white/10" data-testid="button-cta-call">
                <Phone className="mr-2 h-5 w-5" />
                Call Now: (555) 123-4567
              </Button>
            </a>
          </div>

          <div className="mt-12 p-6 bg-destructive/90 rounded-xl max-w-2xl mx-auto border-2 border-destructive-border">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Clock className="h-6 w-6" />
              <h3 className="text-xl font-semibold">Emergency Support</h3>
            </div>
            <p className="text-sm mb-3">
              For urgent construction issues on active projects, contact our 24/7 emergency line
            </p>
            <a href="tel:5559990008" className="text-lg font-bold">
              Emergency: (555) 999-0008
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
