import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Shield, CheckCircle2, Target, Heart, Users } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Our Mission",
      description: "To deliver exceptional construction services that exceed client expectations while maintaining the highest standards of quality, safety, and sustainability.",
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "Our Vision",
      description: "To be the most trusted and innovative construction partner, transforming communities through sustainable infrastructure and timeless architecture.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Our Values",
      description: "Integrity, excellence, collaboration, and safety guide every decision we make. We believe in building lasting relationships alongside lasting structures.",
    },
  ];

  const certifications = [
    {
      icon: <CheckCircle2 className="h-12 w-12 text-primary" />,
      title: "Licensed",
      description: "Fully licensed and bonded in all jurisdictions where we operate, ensuring compliance and protection",
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Insured",
      description: "Comprehensive insurance coverage including liability, workers compensation, and builder's risk",
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: "LEED Certified",
      description: "Committed to sustainable building practices with LEED certification expertise",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6" data-testid="badge-about">
              About KVDL Construction
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight" data-testid="text-about-title">
              Building Excellence Since 2004
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              For over 20 years, KVDL Construction has been at the forefront of commercial and residential construction, transforming visions into reality through innovative design, quality craftsmanship, and unwavering commitment to our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Two Decades of Construction Excellence
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2004, KVDL Construction began with a simple mission: to deliver construction projects that stand the test of time. What started as a small team of dedicated professionals has grown into a full-service construction firm with hundreds of successful projects under our belt.
                </p>
                <p>
                  Our experience spans commercial buildings, residential developments, industrial facilities, and public infrastructure. Each project is approached with the same dedication to quality, safety, and client satisfaction that has defined our company from day one.
                </p>
                <p>
                  We believe that great construction is about more than just buildings—it's about creating spaces where people live, work, and thrive. Our team brings together decades of combined experience in architecture, engineering, project management, and skilled trades to deliver results that exceed expectations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </CardContent>
                </Card>
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2">20+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6 mt-12">
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                  </CardContent>
                </Card>
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2">150+</div>
                    <div className="text-sm text-muted-foreground">Team Members</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our principles guide every project and interaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-2" data-testid={`card-value-${index}`}>
                <CardContent className="p-8">
                  <div className="mb-6">{value.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Licensed, Insured & Certified
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your peace of mind is our priority
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="border-2 hover-elevate transition-all duration-200" data-testid={`card-cert-${index}`}>
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">{cert.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{cert.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Why Choose KVDL Construction?
            </h2>
            <p className="text-lg md:text-xl mb-12 opacity-90 leading-relaxed">
              When you partner with KVDL Construction, you're choosing a team that treats every project as if it were our own. We combine decades of experience with cutting-edge techniques to deliver results that stand the test of time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Proven Track Record</h4>
                  <p className="text-sm opacity-90">Over 500 successful projects across commercial, residential, and industrial sectors</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Expert Team</h4>
                  <p className="text-sm opacity-90">Highly skilled professionals with decades of combined experience</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Quality Assurance</h4>
                  <p className="text-sm opacity-90">Rigorous quality control processes at every stage of construction</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">On-Time Delivery</h4>
                  <p className="text-sm opacity-90">Commitment to meeting deadlines without compromising quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
