import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { MapPin, Calendar, Search, Loader2 } from "lucide-react";
import { useState } from "react";
import type { Project } from "@shared/schema";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [locationFilter, setLocationFilter] = useState("All Locations");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects?.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || project.status === statusFilter;
    const matchesLocation = locationFilter === "All Locations" || project.location === locationFilter;
    return matchesSearch && matchesStatus && matchesLocation;
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6" data-testid="badge-projects">
              Our Portfolio
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight" data-testid="text-projects-title">
              Construction Projects
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Explore our diverse portfolio of completed and ongoing construction projects across commercial, residential, and infrastructure sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search projects by title, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Status">All Status</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-location">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Locations">All Locations</SelectItem>
                {projects && Array.from(new Set(projects.map(p => p.location))).map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {filteredProjects && (
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredProjects.length} of {projects?.length || 0} projects
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 flex-1">
        <div className="container px-4 md:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20" data-testid="loading-projects">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="overflow-hidden border-2 hover-elevate active-elevate-2 transition-all duration-200 h-full" data-testid={`card-project-${project.id}`}>
                    <div className="aspect-video relative overflow-hidden bg-muted">
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
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-xl font-semibold line-clamp-2">{project.title}</h3>
                        <Badge className={`${getStatusColor(project.status)} flex-shrink-0 border`}>
                          {project.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Expected: {new Date(project.expectedCompletion).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20" data-testid="empty-projects">
              <div className="text-muted-foreground mb-4">
                {searchQuery || statusFilter !== "All Status" || locationFilter !== "All Locations"
                  ? "No projects match your search criteria"
                  : "No projects available at this time"}
              </div>
              {(searchQuery || statusFilter !== "All Status" || locationFilter !== "All Locations") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("All Status");
                    setLocationFilter("All Locations");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
