import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { GalleryImage } from "@shared/schema";

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const { data: images, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const filteredImages = selectedProject
    ? images?.filter((img) => img.projectId === selectedProject)
    : images;

  const uniqueProjects = images
    ? Array.from(new Set(images.map((img) => img.projectId).filter(Boolean)))
    : [];

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && filteredImages) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && filteredImages) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6" data-testid="badge-gallery">
              Photo Gallery
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight" data-testid="text-gallery-title">
              Project Gallery
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Explore our construction work through photos showcasing completed projects and work in progress.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      {uniqueProjects.length > 0 && (
        <section className="py-8 border-b">
          <div className="container px-4 md:px-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={selectedProject === null ? "default" : "outline"}
                onClick={() => setSelectedProject(null)}
                data-testid="button-filter-all"
              >
                All Projects
              </Button>
              {uniqueProjects.map((projectId) => (
                <Button
                  key={projectId}
                  variant={selectedProject === projectId ? "default" : "outline"}
                  onClick={() => setSelectedProject(projectId || null)}
                  data-testid={`button-filter-${projectId}`}
                >
                  Project {projectId?.slice(-4)}
                </Button>
              ))}
            </div>
            {filteredImages && (
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredImages.length} of {images?.length || 0} images
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-12 flex-1">
        <div className="container px-4 md:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20" data-testid="loading-gallery">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : filteredImages && filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <Card
                  key={image.id}
                  className="overflow-hidden border-2 hover-elevate active-elevate-2 cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedImageIndex(index)}
                  data-testid={`card-image-${image.id}`}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square relative overflow-hidden bg-muted">
                      <img
                        src={image.imageUrl}
                        alt={image.caption || "Gallery image"}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    {image.caption && (
                      <div className="p-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {image.caption}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20" data-testid="empty-gallery">
              <div className="text-muted-foreground mb-4">
                {selectedProject ? "No images for this project" : "No images available in the gallery"}
              </div>
              {selectedProject && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedProject(null)}
                  data-testid="button-clear-filter"
                >
                  View All Images
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-6xl h-[90vh] p-0 overflow-hidden">
          {selectedImageIndex !== null && filteredImages && (
            <div className="relative h-full flex flex-col bg-black">
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedImageIndex(null)}
                  className="bg-black/50 text-white hover:bg-black/70"
                  data-testid="button-close-lightbox"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex-1 flex items-center justify-center relative">
                <img
                  src={filteredImages[selectedImageIndex].imageUrl}
                  alt={filteredImages[selectedImageIndex].caption || "Gallery image"}
                  className="max-w-full max-h-full object-contain"
                />

                {filteredImages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePrevImage}
                      className="absolute left-4 bg-black/50 text-white hover:bg-black/70"
                      data-testid="button-prev-image"
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNextImage}
                      className="absolute right-4 bg-black/50 text-white hover:bg-black/70"
                      data-testid="button-next-image"
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </>
                )}
              </div>

              <div className="p-6 bg-black/90 text-white border-t border-white/10">
                <div className="text-center">
                  {filteredImages[selectedImageIndex].caption && (
                    <p className="text-lg mb-2">{filteredImages[selectedImageIndex].caption}</p>
                  )}
                  <p className="text-sm text-white/60">
                    Image {selectedImageIndex + 1} of {filteredImages.length}
                    {filteredImages[selectedImageIndex].uploadedAt && (
                      <> • Uploaded {new Date(filteredImages[selectedImageIndex].uploadedAt!).toLocaleDateString()}</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
