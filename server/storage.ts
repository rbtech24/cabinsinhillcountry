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
        title: "Hill Country Wine Trail",
        description: "Explore 50+ world-class wineries including Becker Vineyards, Fall Creek, and Grape Creek with guided tastings of award-winning Texas Tempranillo, Viognier, and Sangiovese.",
        location: "Fredericksburg & Dripping Springs",
        imageUrl: "",
        category: "Wine & Dining"
      },
      {
        title: "Guadalupe River Tubing",
        description: "Float down the crystal-clear Guadalupe River from Canyon Lake to New Braunfels. Perfect for families with gentle rapids and outfitter rentals available.",
        location: "New Braunfels, TX",
        imageUrl: "",
        category: "Water Activities"
      },
      {
        title: "Jacob's Well Swimming",
        description: "Swim in the famous natural spring with crystal-clear water at a constant 68-70°F. Advance reservations required for this pristine swimming hole.",
        location: "Wimberley, TX",
        imageUrl: "",
        category: "Water Activities"
      },
      {
        title: "Enchanted Rock Hiking",
        description: "Hike the massive pink granite dome with panoramic Hill Country views. 1-mile summit trail plus easier base trails and stargazing programs.",
        location: "Fredericksburg, TX",
        imageUrl: "",
        category: "Outdoor Adventures"
      },
      {
        title: "Natural Bridge Caverns Tour",
        description: "Explore spectacular underground limestone formations on guided 60-minute tours. Constant 70°F temperature with paved walkways throughout.",
        location: "New Braunfels, TX",
        imageUrl: "",
        category: "Underground Adventures"
      },
      {
        title: "Authentic Texas BBQ Trail",
        description: "Experience legendary BBQ at Salt Lick (Driftwood), Kreuz Market (Lockhart), and other renowned smokehouses. Learn about traditional pit-smoking techniques.",
        location: "Lockhart & Driftwood",
        imageUrl: "",
        category: "Food & Culture"
      },
      {
        title: "German Heritage Towns",
        description: "Explore Fredericksburg's authentic German culture with biergartens, bakeries, Main Street shopping, and the National Museum of the Pacific War.",
        location: "Fredericksburg, TX",
        imageUrl: "",
        category: "Culture & History"
      },
      {
        title: "Dude Ranch Experiences",
        description: "Stay at working cattle ranches like Mayan Dude Ranch or Dixie Dude Ranch. Horseback riding, cattle drives, campfire cookouts, and authentic cowboy culture.",
        location: "Bandera, TX",
        imageUrl: "",
        category: "Ranch Life"
      },
      {
        title: "Cherry Springs Dark Sky Stargazing",
        description: "Experience some of the darkest skies in the United States at this International Dark-Sky Park. Star parties and astronomical events held regularly.",
        location: "Cherry Spring State Park",
        imageUrl: "",
        category: "Stargazing"
      },
      {
        title: "Antique Shopping in Round Top",
        description: "Browse world-famous antique shows and year-round shops featuring Texas antiques, vintage finds, and handcrafted items from local artisans.",
        location: "Round Top, TX",
        imageUrl: "",
        category: "Shopping"
      },
      {
        title: "Hamilton Pool Preserve",
        description: "Visit the stunning natural pool created by a collapsed underground river with a 50-foot waterfall. Advanced reservations required year-round.",
        location: "Austin Area",
        imageUrl: "",
        category: "Natural Wonders"
      },
      {
        title: "Lavender Farm Tours",
        description: "Tour working lavender farms during harvest season (June-July). Learn about lavender cultivation, shop for products, and enjoy the fragrant fields.",
        location: "Blanco & Fredericksburg",
        imageUrl: "",
        category: "Agricultural Tours"
      },
      {
        title: "Comal River Adventures",
        description: "Float the shortest river in Texas (2.5 miles) with constant 72°F spring-fed water. Perfect for beginners and families with calm, clear conditions.",
        location: "New Braunfels, TX",
        imageUrl: "",
        category: "Water Activities"
      },
      {
        title: "Historic Dance Halls",
        description: "Experience authentic Texas music culture at Gruene Hall (oldest dance hall) and Luckenbach General Store with live country, blues, and folk performances.",
        location: "Gruene & Luckenbach",
        imageUrl: "",
        category: "Music & Culture"
      },
      {
        title: "Wildflower Photography Tours",
        description: "Capture the famous Texas bluebonnets and wildflowers during peak season (March-May). Professional photography workshops and guided tours available.",
        location: "Highway 290 Corridor",
        imageUrl: "",
        category: "Photography"
      },
      {
        title: "Craft Distillery Tours",
        description: "Sample award-winning spirits at Treaty Oak Distilling, Dripping Springs Vodka, and other local craft distilleries. Learn about grain-to-glass production.",
        location: "Dripping Springs & Austin Area",
        imageUrl: "",
        category: "Spirits & Tasting"
      },
      {
        title: "Austin City Limits Live Music",
        description: "Experience live music at iconic venues like the Continental Club, Antone's, and Stubb's Bar-B-Q. Austin's music scene extends throughout Hill Country.",
        location: "Austin, TX",
        imageUrl: "",
        category: "Live Music"
      },
      {
        title: "Lake Travis Water Sports",
        description: "Enjoy boating, jet skiing, and swimming on the clear waters of Lake Travis. Multiple marinas offer rentals and guided tours of the scenic lake.",
        location: "Austin Area",
        imageUrl: "",
        category: "Water Sports"
      },
      {
        title: "Fossil Hunting Adventures",
        description: "Search for ancient fossils and artifacts in the limestone hills. Guided tours teach about the geological history of the Edwards Plateau.",
        location: "Various Locations",
        imageUrl: "",
        category: "Educational"
      },
      {
        title: "Farm-to-Table Dining",
        description: "Experience restaurants sourcing ingredients from local Hill Country farms and ranches. Seasonal menus featuring Texas-grown produce and grass-fed beef.",
        location: "Throughout Hill Country",
        imageUrl: "",
        category: "Farm Dining"
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
      // Ongoing Events
      {
        title: "Live Music at Gruene Hall",
        description: "Texas's oldest dance hall hosts live music almost nightly featuring country, blues, and Americana artists in an authentic historic venue.",
        date: "Ongoing - Check Schedule",
        location: "Gruene, TX",
        category: "Music",
        icon: "fas fa-music"
      },
      {
        title: "Live Music at Luckenbach Dance Hall",
        description: "Iconic Texas dance hall with regular schedule of country and Americana artists in the heart of Hill Country.",
        date: "Ongoing - Check Schedule",
        location: "Luckenbach, TX",
        category: "Music",
        icon: "fas fa-music"
      },
      {
        title: "First Friday Art Walk",
        description: "Galleries and shops extend hours and host special showings showcasing local Hill Country artists and craftspeople.",
        date: "First Friday of Each Month",
        location: "Fredericksburg, TX",
        category: "Arts & Culture",
        icon: "fas fa-palette"
      },
      {
        title: "Gruene Market Days",
        description: "Monthly market featuring nearly 100 artisans, live entertainment, and food vendors in historic Gruene.",
        date: "Third Weekend Each Month",
        location: "Gruene, TX",
        category: "Market",
        icon: "fas fa-shopping-bag"
      },
      {
        title: "Hill Country Wineries Passport Events",
        description: "Signature passport events allowing tasting at multiple wineries with one pass throughout the year.",
        date: "Various Dates 2025",
        location: "Various Wineries",
        category: "Wine",
        icon: "fas fa-wine-glass-alt"
      },
      
      // June 2025
      {
        title: "53rd Annual Kerrville Folk Festival",
        description: "Long-standing folk music festival with multiple stages, camping, workshops, and performances by renowned folk artists.",
        date: "May 22 - June 8, 2025",
        location: "Kerrville, TX",
        category: "Music Festival",
        icon: "fas fa-music"
      },
      {
        title: "Blanco Lavender Festival",
        description: "Celebrates the lavender harvest with vendors, food, live music, and guided lavender farm tours.",
        date: "June 6-8, 2025",
        location: "Blanco, TX",
        category: "Seasonal",
        icon: "fas fa-seedling"
      },
      {
        title: "ATX Television Festival",
        description: "Showcasing the past, present, and future of TV with panels, screenings, and Q&As with industry professionals.",
        date: "May 29 - June 1, 2025",
        location: "Austin, TX",
        category: "Entertainment",
        icon: "fas fa-tv"
      },
      {
        title: "Central Texas Juneteenth Celebration",
        description: "Annual parade and celebration in East Austin commemorating the end of slavery in Texas.",
        date: "June 19, 2025",
        location: "Austin, TX",
        category: "Cultural",
        icon: "fas fa-flag"
      },
      {
        title: "Fredericksburg Music Festival",
        description: "Classical music performances and educational programs featuring renowned musicians.",
        date: "June 8-21, 2025",
        location: "Fredericksburg, TX",
        category: "Music",
        icon: "fas fa-music"
      },
      {
        title: "Driftwood Chiggerfest",
        description: "Local festival with live music and community focus celebrating Driftwood's unique character.",
        date: "June 14-15, 2025",
        location: "Driftwood, TX",
        category: "Community",
        icon: "fas fa-star"
      },
      {
        title: "Fredericksburg Trade Days",
        description: "Large outdoor market with antiques, crafts, and unique finds from vendors across Texas.",
        date: "June 20-22, 2025",
        location: "Fredericksburg, TX",
        category: "Market",
        icon: "fas fa-shopping-bag"
      },
      {
        title: "Stonewall Peach JAMboree & Rodeo",
        description: "Celebrates the famous Hill Country peach harvest with rodeo events, live music, and peach dishes.",
        date: "June 19-21, 2025",
        location: "Stonewall, TX",
        category: "Rodeo & Food",
        icon: "fas fa-horse"
      },
      {
        title: "Austin Asian American Film Festival",
        description: "Showcases Asian American filmmakers and perspectives with screenings and discussions.",
        date: "June 25-29, 2025",
        location: "Austin, TX",
        category: "Film",
        icon: "fas fa-film"
      },
      {
        title: "Watermelon Thump",
        description: "Iconic festival celebrating watermelons with contests, live music, and traditional Texas fair food.",
        date: "June 26-29, 2025",
        location: "Luling, TX",
        category: "Food & Fun",
        icon: "fas fa-apple-alt"
      },

      // July 2025
      {
        title: "Hill Country Fun Fest",
        description: "Community festival with family activities, live entertainment, and local food vendors.",
        date: "July 3, 2025",
        location: "Kerrville, TX",
        category: "Community",
        icon: "fas fa-star"
      },
      {
        title: "Austin Symphony July 4th Concert & Fireworks",
        description: "Patriotic concert and spectacular fireworks display over Lady Bird Lake with the Austin Symphony.",
        date: "July 4, 2025",
        location: "Austin, TX",
        category: "Holiday",
        icon: "fas fa-flag"
      },
      {
        title: "Kerrville's 4th on the River Festival",
        description: "Free concert and fireworks celebration along the Guadalupe River.",
        date: "July 4, 2025",
        location: "Kerrville, TX",
        category: "Holiday",
        icon: "fas fa-flag"
      },
      {
        title: "Hill Country Galleria Independence Day",
        description: "Family-friendly Independence Day celebration with fireworks, music, and activities.",
        date: "July 4, 2025",
        location: "Bee Cave, TX",
        category: "Holiday",
        icon: "fas fa-flag"
      },
      {
        title: "Classic Game Fest",
        description: "Largest retro video game convention in Texas featuring classic arcade games and tournaments.",
        date: "July 25-27, 2025",
        location: "Austin, TX",
        category: "Gaming",
        icon: "fas fa-gamepad"
      },
      {
        title: "MLS All Star Game",
        description: "Major League Soccer All-Star event at Q2 Stadium featuring the best MLS players.",
        date: "July 23, 2025",
        location: "Austin, TX",
        category: "Sports",
        icon: "fas fa-futbol"
      },

      // August 2025
      {
        title: "Gillespie County Fair & Race Meet",
        description: "Traditional county fair featuring horse racing, rodeo events, live music, carnival, and fair food.",
        date: "August 15-24, 2025",
        location: "Fredericksburg, TX",
        category: "Fair & Rodeo",
        icon: "fas fa-horse"
      },
      {
        title: "Beer by the Bay Music Festival",
        description: "Lakeside music festival featuring craft beer, live bands, and scenic Hill Country views.",
        date: "August 8-9, 2025",
        location: "Horseshoe Bay, TX",
        category: "Music Festival",
        icon: "fas fa-beer"
      },
      {
        title: "Central Texas State Fair",
        description: "Traditional county fair with rodeo, carnival rides, livestock shows, and authentic fair food.",
        date: "August 28-31, 2025",
        location: "Belton, TX",
        category: "Fair",
        icon: "fas fa-ferris-wheel"
      },

      // September 2025
      {
        title: "UT Longhorns Football Season",
        description: "Experience the Texas Longhorns in their first SEC season at Darrell K Royal Stadium.",
        date: "September - November 2025",
        location: "Austin, TX",
        category: "Sports",
        icon: "fas fa-football-ball"
      },
      {
        title: "Big Ta' Do Chili Cook-Off",
        description: "Annual chili cook-off and car/bike show featuring authentic Texas chili and classic vehicles.",
        date: "September 13, 2025",
        location: "Kerrville, TX",
        category: "Food & Cars",
        icon: "fas fa-pepper-hot"
      },
      {
        title: "Dripping Springs Pumpkin Festival",
        description: "Family-friendly fall festival with themed weekends, activities, and pumpkin patch experiences.",
        date: "Late September - October 2025",
        location: "Dripping Springs, TX",
        category: "Seasonal",
        icon: "fas fa-leaf"
      },
      {
        title: "Cold Waves Austin",
        description: "Industrial and electronic music festival featuring underground and established artists.",
        date: "September 19, 2025",
        location: "Austin, TX",
        category: "Music Festival",
        icon: "fas fa-music"
      },

      // October 2025
      {
        title: "Austin City Limits Music Festival",
        description: "One of the nation's premier music festivals featuring top artists across multiple genres at Zilker Park.",
        date: "October 3-5 & October 10-12, 2025",
        location: "Austin, TX",
        category: "Music Festival",
        icon: "fas fa-music"
      },
      {
        title: "Fredericksburg Oktoberfest",
        description: "Authentic German heritage celebration with polka music, German food, craft beer, and handmade crafts.",
        date: "October 3-5, 2025",
        location: "Fredericksburg, TX",
        category: "Cultural",
        icon: "fas fa-beer"
      },
      {
        title: "Formula 1 United States Grand Prix",
        description: "High-speed Formula 1 racing and major concerts at Circuit of The Americas with world-class entertainment.",
        date: "October 17-19, 2025",
        location: "Austin, TX",
        category: "Sports",
        icon: "fas fa-flag-checkered"
      },
      {
        title: "Austin String Band Festival",
        description: "Festival celebrating traditional string band music with performances and workshops.",
        date: "October 17-19, 2025",
        location: "Driftwood, TX",
        category: "Music",
        icon: "fas fa-music"
      },
      {
        title: "Wurstfest",
        description: "New Braunfels' famous 'Ten Day Salute To Sausage' with German food, beer, live music, and carnival.",
        date: "October 31 - November 9, 2025",
        location: "New Braunfels, TX",
        category: "Cultural",
        icon: "fas fa-beer"
      },
      {
        title: "Viva la Vida Fest",
        description: "Austin's largest and longest-running Day of the Dead festival with art, music, and cultural celebrations.",
        date: "Late October 2025",
        location: "Austin, TX",
        category: "Cultural",
        icon: "fas fa-skull"
      },
      {
        title: "Texas State Arts & Crafts Fair",
        description: "Juried art and craft fair showcasing the finest work from Texas artists and craftspeople.",
        date: "Late October 2025",
        location: "Ingram, TX",
        category: "Arts & Crafts",
        icon: "fas fa-palette"
      },

      // November 2025
      {
        title: "Texas Monthly BBQ Fest",
        description: "Celebrates Texas' legendary barbecue tradition with the state's best pitmasters and live music.",
        date: "November 1-2, 2025",
        location: "Lockhart, TX",
        category: "Food",
        icon: "fas fa-fire"
      },
      {
        title: "Lights Spectacular",
        description: "Johnson City transforms into 'Twinkle Town' with dazzling holiday light displays downtown.",
        date: "November 15, 2025 - January 1, 2026",
        location: "Johnson City, TX",
        category: "Holiday",
        icon: "fas fa-star"
      },
      {
        title: "Walkway of Lights",
        description: "Thousands of lights decorating the lakeside park creating a magical holiday experience.",
        date: "November 15 - December 31, 2025",
        location: "Marble Falls, TX",
        category: "Holiday",
        icon: "fas fa-star"
      },
      {
        title: "Fredericksburg Trade Days",
        description: "Last major outdoor market before Christmas featuring antiques, crafts, and holiday gifts.",
        date: "November 21-23, 2025",
        location: "Fredericksburg, TX",
        category: "Market",
        icon: "fas fa-shopping-bag"
      },
      {
        title: "Christmas Wine Affair Passport",
        description: "Special holiday passport for festive wine tastings at participating Hill Country wineries.",
        date: "Late November - Mid December 2025",
        location: "Various Wineries",
        category: "Wine & Holiday",
        icon: "fas fa-wine-glass-alt"
      },
      {
        title: "Seismic Dance Event",
        description: "Electronic music festival featuring world-renowned DJs and producers.",
        date: "November 14-16, 2025",
        location: "Austin, TX",
        category: "Music Festival",
        icon: "fas fa-music"
      },

      // December 2025
      {
        title: "Fredericksburg Christmas Nights of Lights",
        description: "German-Texas holiday celebration with spectacular light shows and traditional Christmas markets.",
        date: "November 28, 2025 - January 4, 2026",
        location: "Fredericksburg, TX",
        category: "Holiday",
        icon: "fas fa-star"
      },
      {
        title: "Wimberley Trail of Lights",
        description: "Extensive holiday light display with magical walking trails through scenic landscapes.",
        date: "November 28 - December 31, 2025",
        location: "Wimberley, TX",
        category: "Holiday",
        icon: "fas fa-star"
      },
      {
        title: "Festival of Texas Fiddling",
        description: "Celebrates Texas fiddling tradition with competitions and performances at Twin Sisters Dance Hall.",
        date: "December 5-7, 2025",
        location: "Blanco, TX",
        category: "Music",
        icon: "fas fa-music"
      },
      {
        title: "Christmas in Comfort",
        description: "Holiday light park featuring the famous Crumbling Castle and festive displays.",
        date: "Throughout December 2025",
        location: "Comfort, TX",
        category: "Holiday",
        icon: "fas fa-star"
      },
      {
        title: "Eisbahn Outdoor Ice Skating",
        description: "Outdoor ice skating rink in historic Marktplatz bringing winter magic to the Hill Country.",
        date: "Throughout December 2025",
        location: "Fredericksburg, TX",
        category: "Holiday",
        icon: "fas fa-skating"
      },
      {
        title: "Sights & Sounds of Christmas",
        description: "Winter wonderland with ice skating, carnival rides, and holiday entertainment for families.",
        date: "Throughout December 2025",
        location: "San Marcos, TX",
        category: "Holiday",
        icon: "fas fa-star"
      },
      {
        title: "Christmas Bazaar",
        description: "Holiday shopping, Santa photos, and live music in the iconic town of Luckenbach.",
        date: "December 7, 2025",
        location: "Luckenbach, TX",
        category: "Holiday & Market",
        icon: "fas fa-gift"
      },
      {
        title: "Christmas on Mercer Street",
        description: "Holiday market, family activities, and tree lighting ceremony in downtown Dripping Springs.",
        date: "December 7, 2025",
        location: "Dripping Springs, TX",
        category: "Holiday",
        icon: "fas fa-tree"
      },
      {
        title: "Hill Country Chorale Christmas Concert",
        description: "Beautiful holiday concert featuring local choir performing traditional and contemporary Christmas music.",
        date: "December 6, 2025",
        location: "Kerrville, TX",
        category: "Music",
        icon: "fas fa-music"
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
