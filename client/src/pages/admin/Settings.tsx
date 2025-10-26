import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertSettingsSchema, type InsertSettings, type Settings } from "@shared/schema";

export default function SettingsPage() {
  const { toast } = useToast();
  const hasInitialized = useRef(false);

  const { data: settings, isLoading } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const form = useForm<InsertSettings>({
    resolver: zodResolver(insertSettingsSchema),
    defaultValues: {
      companyName: "KVDL Construction",
      companyAddress: "1234 Construction Ave, Seattle, WA 98301",
      companyEmail: "contact@kvdlconstruction.com",
      companyPhone: "(555) 123-4567",
      emergencyPhone: "(555) 999-0008",
      businessHours: "Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 4:00 PM",
      facebookUrl: "",
      twitterUrl: "",
      linkedinUrl: "",
      instagramUrl: "",
      logoUrl: "",
      mapLatitude: "47.6062",
      mapLongitude: "-122.3321",
    },
  });

  // Update form when settings load (only once)
  useEffect(() => {
    if (settings && !hasInitialized.current) {
      form.reset(settings);
      hasInitialized.current = true;
    }
  }, [settings, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: InsertSettings) => {
      return apiRequest("PATCH", "/api/settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({ title: "Success", description: "Settings updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update settings", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertSettings) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-settings-title">
          Website Settings
        </h1>
        <p className="text-muted-foreground">
          Control global website and company settings
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Company Information */}
        <Card className="border-2">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Company Information</h2>
            
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                {...form.register("companyName")}
                data-testid="input-company-name"
              />
            </div>

            <div>
              <Label htmlFor="companyAddress">Address *</Label>
              <Textarea
                id="companyAddress"
                {...form.register("companyAddress")}
                rows={2}
                data-testid="input-company-address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyEmail">Email *</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  {...form.register("companyEmail")}
                  data-testid="input-company-email"
                />
              </div>
              <div>
                <Label htmlFor="companyPhone">Phone *</Label>
                <Input
                  id="companyPhone"
                  {...form.register("companyPhone")}
                  data-testid="input-company-phone"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="emergencyPhone">24/7 Emergency Phone *</Label>
              <Input
                id="emergencyPhone"
                {...form.register("emergencyPhone")}
                data-testid="input-emergency-phone"
              />
            </div>

            <div>
              <Label htmlFor="businessHours">Business Hours *</Label>
              <Textarea
                id="businessHours"
                {...form.register("businessHours")}
                rows={2}
                data-testid="input-business-hours"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card className="border-2">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Social Media Links</h2>
            
            <div>
              <Label htmlFor="facebookUrl">Facebook URL</Label>
              <Input
                id="facebookUrl"
                placeholder="https://facebook.com/..."
                {...form.register("facebookUrl")}
                data-testid="input-facebook-url"
              />
            </div>

            <div>
              <Label htmlFor="twitterUrl">Twitter URL</Label>
              <Input
                id="twitterUrl"
                placeholder="https://twitter.com/..."
                {...form.register("twitterUrl")}
                data-testid="input-twitter-url"
              />
            </div>

            <div>
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input
                id="linkedinUrl"
                placeholder="https://linkedin.com/..."
                {...form.register("linkedinUrl")}
                data-testid="input-linkedin-url"
              />
            </div>

            <div>
              <Label htmlFor="instagramUrl">Instagram URL</Label>
              <Input
                id="instagramUrl"
                placeholder="https://instagram.com/..."
                {...form.register("instagramUrl")}
                data-testid="input-instagram-url"
              />
            </div>
          </CardContent>
        </Card>

        {/* Other Settings */}
        <Card className="border-2">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Other Settings</h2>
            
            <div>
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                placeholder="https://example.com/logo.png"
                {...form.register("logoUrl")}
                data-testid="input-logo-url"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mapLatitude">Map Latitude</Label>
                <Input
                  id="mapLatitude"
                  placeholder="47.6062"
                  {...form.register("mapLatitude")}
                  data-testid="input-map-latitude"
                />
              </div>
              <div>
                <Label htmlFor="mapLongitude">Map Longitude</Label>
                <Input
                  id="mapLongitude"
                  placeholder="-122.3321"
                  {...form.register("mapLongitude")}
                  data-testid="input-map-longitude"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={updateMutation.isPending}
            data-testid="button-save-settings"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
