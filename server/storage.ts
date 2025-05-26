import { 
  activities, 
  destinations, 
  events, 
  blogPosts,
  type Activity, 
  type Destination, 
  type Event, 
  type BlogPost,
  type InsertActivity,
  type InsertDestination,
  type InsertEvent,
  type InsertBlogPost
} from "@shared/schema";

export interface IStorage {
  getActivities(): Promise<Activity[]>;
  getDestinations(): Promise<Destination[]>;
  getEvents(): Promise<Event[]>;
  getBlogPosts(): Promise<BlogPost[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  createEvent(event: InsertEvent): Promise<Event>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private activities: Map<number, Activity>;
  private destinations: Map<number, Destination>;
  private events: Map<number, Event>;
  private blogPosts: Map<number, BlogPost>;
  private currentActivityId: number;
  private currentDestinationId: number;
  private currentEventId: number;
  private currentBlogPostId: number;

  constructor() {
    this.activities = new Map();
    this.destinations = new Map();
    this.events = new Map();
    this.blogPosts = new Map();
    this.currentActivityId = 1;
    this.currentDestinationId = 1;
    this.currentEventId = 1;
    this.currentBlogPostId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Activities
    const sampleActivities: InsertActivity[] = [
      {
        title: "Wine Tours",
        description: "Explore the famous Fredericksburg wine trail with over 50 wineries and vineyards.",
        location: "Fredericksburg, TX",
        imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Wine & Dining"
      },
      {
        title: "River Adventures",
        description: "Tube, swim, or kayak down the crystal-clear rivers of the Guadalupe and Frio.",
        location: "New Braunfels, TX",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Water Activities"
      },
      {
        title: "Hiking Trails",
        description: "Discover scenic trails with limestone cliffs, wildflower meadows, and panoramic views.",
        location: "Austin, TX Area",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Outdoor Adventures"
      },
      {
        title: "Historic Towns",
        description: "Explore charming German heritage towns with unique shops, restaurants, and festivals.",
        location: "Fredericksburg, TX",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Culture & History"
      },
      {
        title: "Stargazing",
        description: "Experience some of the darkest skies in Texas at local observatories and state parks.",
        location: "Cherry Spring State Park",
        imageUrl: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Outdoor Adventures"
      },
      {
        title: "Local Cuisine",
        description: "Savor authentic Texas BBQ, German cuisine, and farm-to-table dining experiences.",
        location: "Throughout Hill Country",
        imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Wine & Dining"
      }
    ];

    sampleActivities.forEach(activity => {
      this.createActivity(activity);
    });

    // Destinations
    const sampleDestinations: InsertDestination[] = [
      {
        name: "Fredericksburg",
        description: "The heart of Texas wine country with German heritage, world-class wineries, and charming Main Street shopping.",
        imageUrl: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        highlights: ["50+ Wineries", "Historic Main Street"]
      },
      {
        name: "Bandera",
        description: "The Cowboy Capital of the World offering authentic dude ranch experiences and Western heritage.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        highlights: ["Dude Ranches", "Live Country Music"]
      },
      {
        name: "Wimberley",
        description: "An artistic village known for its galleries, crafts, and the crystal-clear Cypress Creek swimming holes.",
        imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        highlights: ["Art Galleries", "Swimming Holes"]
      },
      {
        name: "Dripping Springs",
        description: "Gateway to Hill Country with award-winning distilleries, breweries, and outdoor music venues.",
        imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        highlights: ["Distilleries", "Craft Breweries"]
      }
    ];

    sampleDestinations.forEach(destination => {
      this.createDestination(destination);
    });

    // Events
    const sampleEvents: InsertEvent[] = [
      {
        title: "Wildflower Festival",
        description: "Celebrate the beautiful bluebonnets and wildflowers with guided tours, photography workshops, and local vendors.",
        date: "March 15-17, 2024",
        location: "Fredericksburg, TX",
        category: "Seasonal",
        icon: "fas fa-seedling"
      },
      {
        title: "Hill Country Wine & Music",
        description: "Two days of wine tasting, live music, and local cuisine from the best Hill Country has to offer.",
        date: "April 20-21, 2024",
        location: "Various Wineries",
        category: "Wine & Music",
        icon: "fas fa-wine-glass-alt"
      },
      {
        title: "Cowboy Capital Rodeo",
        description: "Experience authentic Texas cowboy culture with bull riding, barrel racing, and country music concerts.",
        date: "May 25-27, 2024",
        location: "Bandera, TX",
        category: "Rodeo",
        icon: "fas fa-horse"
      },
      {
        title: "Summer Concert Series",
        description: "Weekly outdoor concerts featuring country, folk, and blues artists under the Texas stars.",
        date: "June - August 2024",
        location: "Wimberley, TX",
        category: "Music",
        icon: "fas fa-music"
      },
      {
        title: "Fall Harvest Festival",
        description: "Celebrate the season with pumpkin patches, apple picking, and harvest-themed activities for the whole family.",
        date: "October 12-14, 2024",
        location: "Dripping Springs, TX",
        category: "Seasonal",
        icon: "fas fa-leaf"
      },
      {
        title: "Holiday Lights Tour",
        description: "Magical holiday light displays throughout Hill Country towns with special holiday markets and events.",
        date: "December 1-31, 2024",
        location: "Regional Tour",
        category: "Holiday",
        icon: "fas fa-star"
      }
    ];

    sampleEvents.forEach(event => {
      this.createEvent(event);
    });

    // Blog Posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "Best Time to See Wildflowers in Hill Country",
        excerpt: "Discover when and where to find the most spectacular wildflower displays, including the famous Texas bluebonnets.",
        imageUrl: "https://images.unsplash.com/photo-1458419948946-19fb2cc296af?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Travel Guide",
        date: "March 10, 2024",
        slug: "best-time-wildflowers-hill-country"
      },
      {
        title: "Top 10 Luxury Cabins for Your Hill Country Getaway",
        excerpt: "From romantic retreats to family-friendly lodges, explore the most beautiful and well-appointed cabins in the region.",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Accommodation",
        date: "March 5, 2024",
        slug: "top-10-luxury-cabins"
      },
      {
        title: "Ultimate Guide to Hill Country Wine Trail",
        excerpt: "Plan the perfect wine tasting adventure with our insider's guide to the best wineries, tasting rooms, and wine events.",
        imageUrl: "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Wine & Dining",
        date: "February 28, 2024",
        slug: "hill-country-wine-trail-guide"
      },
      {
        title: "Family-Friendly Adventures in Hill Country",
        excerpt: "Create lasting memories with activities perfect for kids and adults, from river tubing to cave exploring.",
        imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Family Travel",
        date: "February 20, 2024",
        slug: "family-friendly-adventures"
      },
      {
        title: "Perfect Romantic Getaway Ideas",
        excerpt: "Plan an unforgettable romantic escape with intimate dining, couples' activities, and the most scenic spots for two.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Romance",
        date: "February 15, 2024",
        slug: "romantic-getaway-ideas"
      }
    ];

    sampleBlogPosts.forEach(blogPost => {
      this.createBlogPost(blogPost);
    });
  }

  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }

  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const activity: Activity = { ...insertActivity, id };
    this.activities.set(id, activity);
    return activity;
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    const destination: Destination = { ...insertDestination, id };
    this.destinations.set(id, destination);
    return destination;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = { ...insertBlogPost, id };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
}

export const storage = new MemStorage();
