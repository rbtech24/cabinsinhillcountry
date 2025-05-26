import { 
  activities, 
  destinations, 
  events, 
  blogPosts,
  newsletters,
  type Activity, 
  type Destination, 
  type Event, 
  type BlogPost,
  type Newsletter,
  type InsertActivity,
  type InsertDestination,
  type InsertEvent,
  type InsertBlogPost,
  type InsertNewsletter
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
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscribers(): Promise<Newsletter[]>;
  isEmailSubscribed(email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private activities: Map<number, Activity>;
  private destinations: Map<number, Destination>;
  private events: Map<number, Event>;
  private blogPosts: Map<number, BlogPost>;
  private newsletters: Map<number, Newsletter>;
  private currentActivityId: number;
  private currentDestinationId: number;
  private currentEventId: number;
  private currentBlogPostId: number;
  private currentNewsletterId: number;

  constructor() {
    this.activities = new Map();
    this.destinations = new Map();
    this.events = new Map();
    this.blogPosts = new Map();
    this.newsletters = new Map();
    this.currentActivityId = 1;
    this.currentDestinationId = 1;
    this.currentEventId = 1;
    this.currentBlogPostId = 1;
    this.currentNewsletterId = 1;

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
        title: "53rd Annual Kerrville Folk Festival",
        description: "Long-standing folk music festival with multiple stages, camping, workshops, and performances by renowned folk artists from across the country.",
        date: "May 22 - June 8, 2025",
        location: "Kerrville, TX",
        category: "Music Festival",
        icon: "fas fa-music"
      },
      {
        title: "Blanco Lavender Festival",
        description: "Celebrates the lavender harvest with vendors, food, live music, and guided lavender farm tours throughout the beautiful Hill Country.",
        date: "June 6-8, 2025",
        location: "Blanco, TX",
        category: "Seasonal",
        icon: "fas fa-seedling"
      },
      {
        title: "Stonewall Peach JAMboree & Rodeo",
        description: "Celebrates the famous Hill Country peach harvest with authentic rodeo events, live music, and delicious peach dishes and desserts.",
        date: "June 19-21, 2025",
        location: "Stonewall, TX",
        category: "Rodeo & Food",
        icon: "fas fa-horse"
      },
      {
        title: "Austin City Limits Music Festival",
        description: "One of the nation's premier music festivals featuring top artists across multiple genres at the iconic Zilker Park venue.",
        date: "October 3-5 & October 10-12, 2025",
        location: "Austin, TX",
        category: "Music Festival",
        icon: "fas fa-music"
      },
      {
        title: "Fredericksburg Oktoberfest",
        description: "Authentic German heritage celebration with traditional polka music, German food, craft beer, and handmade crafts in the heart of Texas Hill Country.",
        date: "October 3-5, 2025",
        location: "Fredericksburg, TX",
        category: "Cultural",
        icon: "fas fa-beer"
      },
      {
        title: "Wurstfest",
        description: "New Braunfels' famous 'Ten Day Salute To Sausage' - massive German festival featuring authentic food, beer, live music, and carnival attractions.",
        date: "October 31 - November 9, 2025",
        location: "New Braunfels, TX",
        category: "Cultural",
        icon: "fas fa-beer"
      },
      {
        title: "Formula 1 United States Grand Prix",
        description: "High-speed Formula 1 racing and major concerts at Circuit of The Americas, featuring world-class drivers and entertainment.",
        date: "October 17-19, 2025",
        location: "Austin, TX",
        category: "Sports",
        icon: "fas fa-flag-checkered"
      },
      {
        title: "Texas Monthly BBQ Fest",
        description: "Celebrates Texas' legendary barbecue tradition with the state's best pitmasters, live music demonstrations, and authentic Texas BBQ.",
        date: "November 1-2, 2025",
        location: "Lockhart, TX",
        category: "Food",
        icon: "fas fa-fire"
      },
      {
        title: "Lights Spectacular",
        description: "Johnson City transforms into 'Twinkle Town' with dazzling holiday light displays throughout the historic downtown area.",
        date: "November 15, 2025 - January 1, 2026",
        location: "Johnson City, TX",
        category: "Holiday",
        icon: "fas fa-star"
      },
      {
        title: "Fredericksburg Christmas Nights of Lights",
        description: "German-Texas holiday celebration featuring spectacular light shows, traditional German Christmas markets, and festive entertainment.",
        date: "November 28, 2025 - January 4, 2026",
        location: "Fredericksburg, TX",
        category: "Holiday",
        icon: "fas fa-star"
      },
      {
        title: "Wimberley Trail of Lights",
        description: "Extensive holiday light display with magical walking trails through scenic Hill Country landscapes and themed light installations.",
        date: "November 28 - December 31, 2025",
        location: "Wimberley, TX",
        category: "Holiday",
        icon: "fas fa-star"
      },
      {
        title: "Gillespie County Fair & Race Meet",
        description: "Traditional county fair featuring horse racing, rodeo events, live country music, carnival rides, and authentic Texas fair food.",
        date: "August 15-24, 2025",
        location: "Fredericksburg, TX",
        category: "Fair & Rodeo",
        icon: "fas fa-horse"
      }
    ];

    sampleEvents.forEach(event => {
      this.createEvent(event);
    });

    // Blog Posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "2025 Hill Country Wildflower Season: Complete Guide to Texas Bluebonnets and Beyond",
        excerpt: "Everything you need to know about the 2025 wildflower season in Texas Hill Country. From prime viewing locations along Highway 290 to the best photography spots in Fredericksburg, discover when and where to see Texas bluebonnets, Indian paintbrush, and evening primrose at their peak. Includes insider tips from local botanists, hidden viewing areas away from crowds, weather impact on bloom timing, and a detailed month-by-month blooming calendar. Perfect for photographers, nature lovers, and families planning their Hill Country wildflower adventure.",
        imageUrl: "https://images.unsplash.com/photo-1458419948946-19fb2cc296af?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Seasonal Guide",
        date: "May 20, 2025",
        slug: "2025-hill-country-wildflower-bluebonnet-complete-guide"
      },
      {
        title: "Texas Hill Country Wine Trail: 50+ Wineries, Tastings, and Award-Winning Vineyards",
        excerpt: "Explore the thriving Texas Hill Country wine region with our comprehensive guide to over 50 wineries spanning from Fredericksburg to Dripping Springs. Discover world-class Tempranillo at Becker Vineyards, sample unique Viognier at Grape Creek Vineyards, and experience the renowned Sangiovese at Fall Creek Vineyards. This complete wine lover's guide includes detailed tasting notes, food pairing recommendations, seasonal harvest events, winery tour packages, and exclusive behind-the-scenes access with vineyard owners. Learn about the unique terroir that makes Hill Country wines special and plan the perfect wine country weekend.",
        imageUrl: "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Wine & Dining",
        date: "May 15, 2025",
        slug: "texas-hill-country-wine-trail-complete-guide-2025"
      },
      {
        title: "Hidden Swimming Holes and Natural Springs: Local's Guide to Hill Country's Best Swimming Spots",
        excerpt: "Discover the most pristine swimming holes, natural springs, and crystal-clear pools hidden throughout Texas Hill Country. From the famous Jacob's Well in Wimberley to the secluded Blue Hole in Leakey, explore swimming destinations that locals have cherished for generations. This comprehensive guide covers water temperatures year-round, accessibility and parking information, safety guidelines, and conservation efforts to protect these natural treasures. Includes lesser-known gems like Krause Springs, Hamilton Pool Preserve, and the Frio River's best access points, plus insider tips on avoiding crowds and respecting private property.",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Outdoor Adventure",
        date: "May 10, 2025",
        slug: "hill-country-swimming-holes-natural-springs-guide"
      },
      {
        title: "Hill Country BBQ Trail: Authentic Texas Barbecue and Legendary Smokehouse Traditions",
        excerpt: "Embark on the ultimate barbecue pilgrimage through Texas Hill Country's legendary smokehouse scene. From the world-famous Salt Lickers BBQ in Driftwood to hidden gem pitmasters in small towns like Llano and Junction, discover the authentic flavors and time-honored traditions that make Hill Country BBQ a destination for food lovers worldwide. This definitive guide features interviews with third-generation pitmasters, detailed profiles of signature dishes, smoking techniques passed down through families, and the fascinating history behind each establishment. Includes must-try items, pricing guides, operating hours, and recipes you can try at home.",
        imageUrl: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Food & Culture",
        date: "May 5, 2025",
        slug: "hill-country-bbq-trail-authentic-texas-barbecue-guide"
      },
      {
        title: "Family Adventures in Hill Country: 25+ Kid-Friendly Activities and Educational Experiences",
        excerpt: "Create unforgettable family memories in Texas Hill Country with our comprehensive guide to child-friendly adventures and educational experiences. Explore underground wonders at Natural Bridge Caverns and Wonder World Cave, experience authentic ranch life at Mayan Dude Ranch and Dixie Dude Ranch, enjoy river tubing on the Guadalupe and Comal Rivers, and discover hands-on learning at the National Museum of the Pacific War in Fredericksburg. This family travel guide includes age-appropriate recommendations, seasonal considerations, pricing information, and special accommodation packages designed for families. Perfect for parents planning multi-generational trips or educational vacations.",
        imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Family Travel",
        date: "April 30, 2025",
        slug: "family-adventures-hill-country-kids-activities-guide"
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

  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existingSubscriber = Array.from(this.newsletters.values()).find(
      subscriber => subscriber.email === insertNewsletter.email && subscriber.isActive
    );
    
    if (existingSubscriber) {
      throw new Error('Email already subscribed');
    }

    const id = this.currentNewsletterId++;
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id,
      subscribedAt: new Date(),
      isActive: true
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values()).filter(subscriber => subscriber.isActive);
  }

  async isEmailSubscribed(email: string): Promise<boolean> {
    return Array.from(this.newsletters.values()).some(
      subscriber => subscriber.email === email && subscriber.isActive
    );
  }
}

export const storage = new MemStorage();
