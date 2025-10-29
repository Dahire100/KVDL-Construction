import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MapPin, Calendar, Loader2, Phone } from "lucide-react";
import type { Project } from "@shared/schema";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const projectId = params?.id;

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ["/api/projects", projectId],
    enabled: !!projectId,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "In Progress":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20";
      case "Planning":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" data-testid="loading-project-detail">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Link href="/projects">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="aspect-[21/9] relative overflow-hidden bg-muted">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No image available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container px-4 md:px-8">
              <Link href="/projects">
                <Button variant="ghost" className="mb-4 text-white hover:bg-white/10" data-testid="button-back">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
              <Badge className={`${getStatusColor(project.status)} mb-4 border`}>
                {project.status}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" data-testid="text-project-title">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Expected: {new Date(project.expectedCompletion).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Project Timeline</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="font-semibold mb-1">Project Progress</h3>
                          <p className="text-sm text-muted-foreground">Current completion status</p>
                        </div>
                        <div className="text-3xl font-bold text-primary">{project.progress}%</div>
                      </div>
                      <Progress value={project.progress} className="h-3" />
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-sm text-muted-foreground mb-2">Start Date</div>
                        <div className="text-xl font-semibold">
                          {new Date(project.startDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-sm text-muted-foreground mb-2">Expected Completion</div>
                        <div className="text-xl font-semibold">
                          {new Date(project.expectedCompletion).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                <Card className="border-2">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Status</div>
                        <Badge className={`${getStatusColor(project.status)} border`}>
                          {project.status}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Location</div>
                        <div className="font-medium">{project.location}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Progress</div>
                        <div className="font-medium">{project.progress}% Complete</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Interested in a Similar Project?</h3>
                    <p className="text-sm mb-6 opacity-90">
                      Schedule a free consultation with our experts to discuss your construction needs.
                    </p>
                    <div className="space-y-3">
                      <Link href="/contact">
                        <Button variant="outline" className="w-full bg-white text-primary hover:bg-white/90" data-testid="button-consultation">
                          Schedule Consultation
                        </Button>
                      </Link>
                      <a href="tel:5551234567">
                        <Button variant="ghost" className="w-full text-white hover:bg-white/10" data-testid="button-call">
                          <Phone className="mr-2 h-4 w-4" />
                          Call: (555) 123-4567
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Location</h3>
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(project.location)}`}
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
