import { 
  type Project, type InsertProject,
  type GalleryImage, type InsertGalleryImage,
  type CMSPage, type InsertCMSPage,
  type Settings, type InsertSettings,
  type ContactSubmission, type InsertContactSubmission,
  type User, type InsertUser
} from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

// Image paths for sample data
const downtownImage = "/attached_assets/generated_images/Downtown_office_complex_project_a7188b97.png";
const warehouseImage = "/attached_assets/generated_images/Warehouse_facility_project_image_250c615d.png";
const residentialImage = "/attached_assets/generated_images/Residential_tower_project_image_c053e212.png";
const shoppingImage = "/attached_assets/generated_images/Shopping_mall_construction_image_3be47d9c.png";
const universityImage = "/attached_assets/generated_images/University_campus_building_image_55835342.png";

export interface IStorage {
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: InsertProject): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Gallery
  getAllGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImage(id: string): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  deleteGalleryImage(id: string): Promise<boolean>;

  // CMS Pages
  getAllCMSPages(): Promise<CMSPage[]>;
  getCMSPage(id: string): Promise<CMSPage | undefined>;
  createCMSPage(page: InsertCMSPage): Promise<CMSPage>;
  updateCMSPage(id: string, page: InsertCMSPage): Promise<CMSPage | undefined>;
  deleteCMSPage(id: string): Promise<boolean>;

  // Settings
  getSettings(): Promise<Settings>;
  updateSettings(settings: InsertSettings): Promise<Settings>;

  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;

  // Users
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyPassword(userId: string, password: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private galleryImages: Map<string, GalleryImage>;
  private cmsPages: Map<string, CMSPage>;
  private settings: Settings;
  private contactSubmissions: Map<string, ContactSubmission>;
  private users: Map<string, User>;

  constructor() {
    this.projects = new Map();
    this.galleryImages = new Map();
    this.cmsPages = new Map();
    this.contactSubmissions = new Map();
    this.users = new Map();
    
    // Initialize with default settings
    this.settings = {
      id: randomUUID(),
      companyName: "KVDL Construction",
      companyAddress: "1234 Construction Ave, Seattle, WA 98301",
      companyEmail: "contact@kvdlconstruction.com",
      companyPhone: "(555) 123-4567",
      emergencyPhone: "(555) 999-0008",
      businessHours: "Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 4:00 PM",
      facebookUrl: "https://facebook.com",
      twitterUrl: "https://twitter.com",
      linkedinUrl: "https://linkedin.com",
      instagramUrl: "https://instagram.com",
      logoUrl: null,
      mapLatitude: "47.6062",
      mapLongitude: "-122.3321",
    };

    // Seed with sample data
    this.seedData();
    // Create default admin user
    this.seedAdminUser();
  }

  private seedData() {
    // Sample projects
    const sampleProjects: Omit<Project, "id">[] = [
      {
        title: "Downtown Office Complex",
        description: "A state-of-the-art 25-story office complex featuring modern architectural design, sustainable materials, and cutting-edge technology infrastructure. The project includes 500,000 square feet of Class A office space with premium amenities.",
        location: "New York, NY",
        status: "In Progress",
        progress: 75,
        startDate: "2023-01-15",
        expectedCompletion: "2024-12-30",
        imageUrl: downtownImage,
        createdAt: new Date(),
      },
      {
        title: "Industrial Warehouse Facility",
        description: "Large-scale warehouse complex designed for modern logistics operations. Features high ceilings, advanced loading docks, and efficient layout optimized for distribution and storage.",
        location: "Chicago, IL",
        status: "Planning",
        progress: 5,
        startDate: "2025-03-01",
        expectedCompletion: "2026-05-30",
        imageUrl: warehouseImage,
        createdAt: new Date(),
      },
      {
        title: "Luxury Residential Tower",
        description: "Beautiful 40-story residential tower offering luxury apartments with stunning city views. Features modern amenities including rooftop terrace, fitness center, and concierge service.",
        location: "Los Angeles, CA",
        status: "Completed",
        progress: 100,
        startDate: "2022-06-01",
        expectedCompletion: "2024-08-15",
        imageUrl: residentialImage,
        createdAt: new Date(),
      },
      {
        title: "Shopping Mall Renovation",
        description: "Complete renovation of existing shopping center into a modern retail destination. Includes updated storefronts, improved parking, and enhanced customer experience areas.",
        location: "Houston, TX",
        status: "In Progress",
        progress: 45,
        startDate: "2024-02-01",
        expectedCompletion: "2025-08-30",
        imageUrl: shoppingImage,
        createdAt: new Date(),
      },
      {
        title: "University Campus Building",
        description: "New academic building for state university featuring modern classrooms, research labs, and collaborative learning spaces. LEED Gold certified sustainable design.",
        location: "Seattle, WA",
        status: "Planning",
        progress: 15,
        startDate: "2024-11-01",
        expectedCompletion: "2026-10-30",
        imageUrl: universityImage,
        createdAt: new Date(),
      },
    ];

    sampleProjects.forEach(project => {
      const id = randomUUID();
      this.projects.set(id, { id, ...project });
    });

    // Sample gallery images
    const projectIds = Array.from(this.projects.keys());
    const sampleImages = [
      { imageUrl: downtownImage, caption: "Downtown Office Complex - Exterior View", projectId: projectIds[0] },
      { imageUrl: warehouseImage, caption: "Industrial Warehouse - Construction Progress", projectId: projectIds[1] },
      { imageUrl: residentialImage, caption: "Residential Villa Project - Completed", projectId: projectIds[2] },
      { imageUrl: shoppingImage, caption: "Shopping Mall Construction - Interior", projectId: projectIds[3] },
      { imageUrl: universityImage, caption: "Downtown Office Complex - Progress Update", projectId: projectIds[0] },
      { imageUrl: residentialImage, caption: "Industrial Warehouse - Exterior", projectId: projectIds[1] },
    ];

    sampleImages.forEach(image => {
      const id = randomUUID();
      this.galleryImages.set(id, {
        id,
        imageUrl: image.imageUrl,
        caption: image.caption,
        projectId: image.projectId,
        uploadedAt: new Date(),
      });
    });
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, insertProject: InsertProject): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;

    const updated: Project = {
      ...insertProject,
      id,
      createdAt: existing.createdAt,
    };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Gallery
  async getAllGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values()).sort((a, b) => 
      (b.uploadedAt?.getTime() || 0) - (a.uploadedAt?.getTime() || 0)
    );
  }

  async getGalleryImage(id: string): Promise<GalleryImage | undefined> {
    return this.galleryImages.get(id);
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = randomUUID();
    const image: GalleryImage = {
      ...insertImage,
      id,
      uploadedAt: new Date(),
    };
    this.galleryImages.set(id, image);
    return image;
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  // CMS Pages
  async getAllCMSPages(): Promise<CMSPage[]> {
    return Array.from(this.cmsPages.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getCMSPage(id: string): Promise<CMSPage | undefined> {
    return this.cmsPages.get(id);
  }

  async createCMSPage(insertPage: InsertCMSPage): Promise<CMSPage> {
    const id = randomUUID();
    const now = new Date();
    const page: CMSPage = {
      ...insertPage,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.cmsPages.set(id, page);
    return page;
  }

  async updateCMSPage(id: string, insertPage: InsertCMSPage): Promise<CMSPage | undefined> {
    const existing = this.cmsPages.get(id);
    if (!existing) return undefined;

    const updated: CMSPage = {
      ...insertPage,
      id,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    };
    this.cmsPages.set(id, updated);
    return updated;
  }

  async deleteCMSPage(id: string): Promise<boolean> {
    return this.cmsPages.delete(id);
  }

  // Settings
  async getSettings(): Promise<Settings> {
    return this.settings;
  }

  async updateSettings(insertSettings: InsertSettings): Promise<Settings> {
    this.settings = {
      ...insertSettings,
      id: this.settings.id,
    };
    return this.settings;
  }

  // Contact Submissions
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      submittedAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => 
      (b.submittedAt?.getTime() || 0) - (a.submittedAt?.getTime() || 0)
    );
  }

  // Users
  private async seedAdminUser() {
    const adminId = randomUUID();
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin: User = {
      id: adminId,
      username: "admin",
      password: hashedPassword,
      email: "admin@kvdlconstruction.com",
      role: "admin",
      createdAt: new Date(),
    };
    this.users.set(adminId, admin);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user: User = {
      ...insertUser,
      id,
      password: hashedPassword,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async verifyPassword(userId: string, password: string): Promise<boolean> {
    const user = await this.getUserById(userId);
    if (!user) return false;
    return await bcrypt.compare(password, user.password);
  }
}

export const storage = new MemStorage();
