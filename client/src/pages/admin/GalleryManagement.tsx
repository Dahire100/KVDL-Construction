import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertGalleryImageSchema, type InsertGalleryImage, type GalleryImage } from "@shared/schema";

export default function GalleryManagement() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<InsertGalleryImage>({
    resolver: zodResolver(insertGalleryImageSchema),
    defaultValues: {
      imageUrl: "",
      caption: "",
      projectId: "",
    },
  });

  const { data: images, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertGalleryImage) => {
      return apiRequest("POST", "/api/gallery", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Success", description: "Image uploaded successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/gallery/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Success", description: "Image deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete image", variant: "destructive" });
    },
  });

  const handleSubmit = (data: InsertGalleryImage) => {
    createMutation.mutate(data);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-gallery-title">
            Gallery Management
          </h1>
          <p className="text-muted-foreground">
            Upload, delete, and manage your project photos
          </p>
        </div>
        <Button
          onClick={() => {
            form.reset();
            setIsDialogOpen(true);
          }}
          data-testid="button-upload-image"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Images
        </Button>
      </div>

      {/* Gallery Grid */}
      <Card className="border-2">
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : images && images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="group relative" data-testid={`image-${image.id}`}>
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted border-2">
                    <img
                      src={image.imageUrl}
                      alt={image.caption || "Gallery image"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(image.id)}
                      data-testid={`button-delete-${image.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {image.caption && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {image.caption}
                    </p>
                  )}
                  {image.uploadedAt && (
                    <p className="text-xs text-muted-foreground">
                      {new Date(image.uploadedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                No images in gallery yet
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Your First Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="imageUrl">Image URL *</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                {...form.register("imageUrl")}
                data-testid="input-image-url"
              />
              {form.formState.errors.imageUrl && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.imageUrl.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                placeholder="Describe this image..."
                {...form.register("caption")}
                data-testid="input-image-caption"
              />
            </div>

            <div>
              <Label htmlFor="projectId">Project ID (optional)</Label>
              <Input
                id="projectId"
                placeholder="Link to a specific project"
                {...form.register("projectId")}
                data-testid="input-image-project-id"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending}
                data-testid="button-save-image"
              >
                {createMutation.isPending ? "Uploading..." : "Upload Image"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
