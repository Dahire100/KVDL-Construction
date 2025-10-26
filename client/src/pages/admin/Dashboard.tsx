import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { 
  FolderKanban, 
  Image, 
  FileText, 
  TrendingUp, 
  Plus,
  Upload,
  FilePlus,
  Loader2,
  Calendar,
  MapPin 
} from "lucide-react";
import type { Project, GalleryImage } from "@shared/schema";

export default function AdminDashboard() {
  const { data: projects, isLoading: loadingProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: galleryImages, isLoading: loadingGallery } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const totalProjects = projects?.length || 0;
  const activeProjects = projects?.filter(p => p.status === "In Progress").length || 0;
  const totalImages = galleryImages?.length || 0;
  const websiteVisits = 1234; // Placeholder for demo

  const recentProjects = projects?.slice(0, 5) || [];

  const recentImages = galleryImages?.slice(0, 6) || [];

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
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-dashboard-title">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your construction projects.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <FolderKanban className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="stat-total-projects">
              {loadingProjects ? <Loader2 className="h-8 w-8 animate-spin" /> : totalProjects}
            </div>
            <p className="text-xs text-muted-foreground mt-1">+3 this month</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-500/10">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="stat-active-projects">
              {loadingProjects ? <Loader2 className="h-8 w-8 animate-spin" /> : activeProjects}
            </div>
            <p className="text-xs text-muted-foreground mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-500/10">
              <Image className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="stat-gallery-images">
              {loadingGallery ? <Loader2 className="h-8 w-8 animate-spin" /> : totalImages}
            </div>
            <p className="text-xs text-muted-foreground mt-1">+10 this week</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Visits</CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="stat-website-visits">
              {websiteVisits.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">+42% vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <Badge variant="outline" className="text-green-600">System Ready</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/projects?new=true">
            <Card className="border-2 hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 h-full">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Add New Project</h3>
                <p className="text-sm text-muted-foreground">Create a new construction project</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/gallery?upload=true">
            <Card className="border-2 hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 h-full">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-500/10 mb-4">
                  <Upload className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Upload Images</h3>
                <p className="text-sm text-muted-foreground">Add photos to gallery</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/cms">
            <Card className="border-2 hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 h-full">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500/10 mb-4">
                  <FilePlus className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Create Page</h3>
                <p className="text-sm text-muted-foreground">Generate new content page</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Projects</h2>
          <Link href="/admin/projects">
            <Button variant="outline" data-testid="button-view-all-projects">
              View All Projects
            </Button>
          </Link>
        </div>
        <Card className="border-2">
          <CardContent className="p-0">
            {loadingProjects ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : recentProjects.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-semibold uppercase">Project</th>
                      <th className="py-3 px-6 text-left text-xs font-semibold uppercase">Location</th>
                      <th className="py-3 px-6 text-left text-xs font-semibold uppercase">Status</th>
                      <th className="py-3 px-6 text-left text-xs font-semibold uppercase">Progress</th>
                      <th className="py-3 px-6 text-left text-xs font-semibold uppercase">Expected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects.map((project) => (
                      <tr key={project.id} className="border-b hover-elevate">
                        <td className="py-4 px-6">
                          <div className="font-medium">{project.title}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {project.location}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={`${getStatusColor(project.status)} border`}>
                            {project.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Progress value={project.progress} className="h-2 w-24" />
                            <span className="text-sm font-medium">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(project.expectedCompletion).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No projects yet. Create your first project to get started.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gallery Preview */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Gallery Preview</h2>
          <Link href="/admin/gallery">
            <Button variant="outline" data-testid="button-view-gallery">
              Upload Images
            </Button>
          </Link>
        </div>
        <Card className="border-2">
          <CardContent className="p-6">
            {loadingGallery ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : recentImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {recentImages.map((image) => (
                  <div key={image.id} className="aspect-square rounded-md overflow-hidden bg-muted border-2">
                    <img
                      src={image.imageUrl}
                      alt={image.caption || "Gallery image"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No images in gallery. Upload your first images to showcase your work.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
