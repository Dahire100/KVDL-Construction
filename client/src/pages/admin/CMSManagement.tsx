import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlus, Pencil, Trash2, Loader2, FileText } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertCMSPageSchema, type InsertCMSPage, type CMSPage } from "@shared/schema";

export default function CMSManagement() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<CMSPage | null>(null);

  const form = useForm<InsertCMSPage>({
    resolver: zodResolver(insertCMSPageSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      published: false,
    },
  });

  const { data: pages, isLoading } = useQuery<CMSPage[]>({
    queryKey: ["/api/cms"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertCMSPage) => {
      return apiRequest("POST", "/api/cms", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms"] });
      toast({ title: "Success", description: "Page created successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create page", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertCMSPage }) => {
      return apiRequest("PATCH", `/api/cms/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms"] });
      toast({ title: "Success", description: "Page updated successfully" });
      setIsDialogOpen(false);
      setEditingPage(null);
      form.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update page", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/cms/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms"] });
      toast({ title: "Success", description: "Page deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete page", variant: "destructive" });
    },
  });

  const handleEdit = (page: CMSPage) => {
    setEditingPage(page);
    form.reset({
      title: page.title,
      slug: page.slug,
      content: page.content,
      published: page.published,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: InsertCMSPage) => {
    if (editingPage) {
      updateMutation.mutate({ id: editingPage.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this page?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-cms-title">
            Create Page (CMS)
          </h1>
          <p className="text-muted-foreground">
            Create and manage custom content pages for your website
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingPage(null);
            form.reset();
            setIsDialogOpen(true);
          }}
          data-testid="button-create-page"
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Create Page
        </Button>
      </div>

      {/* Pages List */}
      <Card className="border-2">
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : pages && pages.length > 0 ? (
            <div className="space-y-4">
              {pages.map((page) => (
                <Card key={page.id} className="border" data-testid={`page-${page.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{page.title}</h3>
                          <Badge variant={page.published ? "default" : "outline"}>
                            {page.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Slug: /{page.slug}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {page.content}
                        </p>
                        {page.createdAt && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Created: {new Date(page.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(page)}
                          data-testid={`button-edit-page-${page.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(page.id)}
                          data-testid={`button-delete-page-${page.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                No custom pages yet
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <FilePlus className="mr-2 h-4 w-4" />
                Create Your First Page
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPage ? "Edit Page" : "Create New Page"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="title">Page Title *</Label>
              <Input
                id="title"
                placeholder="About Our Services"
                {...form.register("title")}
                data-testid="input-page-title"
              />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug">URL Slug *</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">/</span>
                <Input
                  id="slug"
                  placeholder="about-our-services"
                  {...form.register("slug")}
                  data-testid="input-page-slug"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Use lowercase letters and hyphens only
              </p>
              {form.formState.errors.slug && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.slug.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                placeholder="Write your page content here..."
                rows={12}
                {...form.register("content")}
                data-testid="input-page-content"
              />
              {form.formState.errors.content && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.content.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="published"
                checked={form.watch("published")}
                onCheckedChange={(checked) => form.setValue("published", checked)}
                data-testid="switch-page-published"
              />
              <Label htmlFor="published">Publish this page</Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setEditingPage(null);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                data-testid="button-save-page"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : editingPage
                  ? "Update Page"
                  : "Create Page"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
