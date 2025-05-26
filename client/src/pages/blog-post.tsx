import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const blogPost = blogPosts?.find(post => post.slug === slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-texas-cream pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-texas-cream pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Blog Post Not Found</h1>
          <p className="text-lg text-texas-slate mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="inline-flex items-center px-6 py-3 bg-texas-brown text-white rounded-lg hover:bg-texas-chocolate transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const getFullContent = (post: BlogPost) => {
    switch (post.slug) {
      case "2025-hill-country-wildflower-bluebonnet-complete-guide":
        return `
          <h2>When to Visit for Peak Blooms</h2>
          <p>The Texas Hill Country wildflower season typically runs from mid-March through early May, with peak blooming occurring in early to mid-April. However, weather conditions can significantly impact timing, with warm winters leading to earlier blooms and late freezes potentially delaying the season.</p>

          <h2>Best Viewing Locations</h2>
          <h3>Highway 290 West</h3>
          <p>The stretch between Austin and Fredericksburg offers some of the most spectacular roadside viewing. Key stops include:</p>
          <ul>
            <li>Dripping Springs area (Mile Marker 12-15)</li>
            <li>Johnson City vicinity (Mile Marker 40-45)</li>
            <li>Stonewall area around LBJ Ranch (Mile Marker 50-55)</li>
          </ul>

          <h3>Fredericksburg Region</h3>
          <p>The German heritage town serves as wildflower central, with numerous viewing areas:</p>
          <ul>
            <li>Wildseed Farms - 425 acres of cultivated wildflowers</li>
            <li>Enchanted Rock State Park - hiking trails through natural displays</li>
            <li>Old Tunnel State Park - combines wildflowers with bat viewing</li>
          </ul>

          <h2>Photography Tips</h2>
          <p>Capture stunning wildflower photos with these professional techniques:</p>
          <ul>
            <li>Visit during golden hour (first hour after sunrise or last hour before sunset)</li>
            <li>Use a polarizing filter to enhance color saturation</li>
            <li>Get low to the ground for dramatic foreground compositions</li>
            <li>Include Texas landmarks like old barns or windmills for context</li>
          </ul>

          <h2>Conservation and Respect</h2>
          <p>Help preserve these natural treasures for future generations:</p>
          <ul>
            <li>Stay on designated paths and roadways</li>
            <li>Never pick wildflowers - they're protected by state law</li>
            <li>Respect private property boundaries</li>
            <li>Pack out all trash and leave no trace</li>
          </ul>

          <h2>Monthly Blooming Calendar</h2>
          <h3>March</h3>
          <p>Early bluebonnets begin appearing in southern areas. Look for henbit, clover, and wild mustard.</p>
          
          <h3>April</h3>
          <p>Peak season! Bluebonnets at their best, joined by Indian paintbrush, evening primrose, and phlox.</p>
          
          <h3>May</h3>
          <p>Late season blooms include coreopsis, black-eyed Susan, and Turk's cap in shadier areas.</p>
        `;

      case "texas-hill-country-wine-trail-complete-guide-2025":
        return `
          <h2>Overview of Hill Country Wine Region</h2>
          <p>The Texas Hill Country American Viticultural Area (AVA) encompasses over 15,000 square miles and is home to more than 290 wineries. The region's unique terroir, characterized by limestone soils, rolling hills, and a continental climate, creates ideal conditions for growing exceptional grapes.</p>

          <h2>Featured Wineries and Vineyards</h2>
          <h3>Fredericksburg Area</h3>
          <h4>Becker Vineyards</h4>
          <p>Established in 1992, Becker Vineyards is renowned for their Tempranillo and Viognier. The stunning stone building houses a tasting room with panoramic vineyard views.</p>
          <ul>
            <li>Signature Wine: Tempranillo Reserve</li>
            <li>Tasting Fee: $15 (includes souvenir glass)</li>
            <li>Special Events: Harvest festivals, wine dinners</li>
          </ul>

          <h4>Grape Creek Vineyards</h4>
          <p>Family-owned since 1985, specializing in Mediterranean varietals and unique blends.</p>
          <ul>
            <li>Must-Try: Cabernet Sauvignon and Sangiovese blend</li>
            <li>Features: Beautiful gardens and picnic areas</li>
            <li>Tours: Daily at 2 PM and 4 PM</li>
          </ul>

          <h3>Dripping Springs Region</h3>
          <h4>Fall Creek Vineyards</h4>
          <p>Pioneer winery established in 1975, known for their Meritus red blend and estate-grown Tempranillo.</p>
          <ul>
            <li>Accolades: Multiple Texas wine competition gold medals</li>
            <li>Unique Feature: Lakeside vineyard setting</li>
            <li>Food Pairing: Artisan cheese and charcuterie boards</li>
          </ul>

          <h2>Wine Varieties and Tasting Notes</h2>
          <h3>Red Wines</h3>
          <h4>Tempranillo</h4>
          <p>The flagship grape of Texas Hill Country, producing full-bodied wines with notes of cherry, plum, and spice.</p>

          <h4>Sangiovese</h4>
          <p>Italian varietal thriving in Texas, offering bright acidity with cherry and herb characteristics.</p>

          <h3>White Wines</h3>
          <h4>Viognier</h4>
          <p>Aromatic white wine with floral notes, stone fruit flavors, and a rich, creamy texture.</p>

          <h4>Albariño</h4>
          <p>Spanish white grape producing crisp, mineral-driven wines perfect for the Texas climate.</p>

          <h2>Planning Your Wine Trail Adventure</h2>
          <h3>Best Times to Visit</h3>
          <ul>
            <li>Spring (March-May): Mild weather, fewer crowds</li>
            <li>Fall (September-November): Harvest season, special events</li>
            <li>Winter: Cozy tasting rooms, holiday events</li>
          </ul>

          <h3>Transportation Options</h3>
          <ul>
            <li>Designated driver services</li>
            <li>Wine tour companies with transportation</li>
            <li>Ride-sharing apps available in most areas</li>
          </ul>

          <h2>Food Pairing and Dining</h2>
          <p>Many wineries offer food pairings and on-site dining:</p>
          <ul>
            <li>Artisan cheese boards featuring local Texas cheeses</li>
            <li>Charcuterie with Hill Country meats</li>
            <li>Farm-to-table restaurants at select vineyards</li>
            <li>Food truck partnerships on weekends</li>
          </ul>
        `;

      case "hill-country-swimming-holes-natural-springs-guide":
        return `
          <h2>Famous Swimming Destinations</h2>
          <h3>Jacob's Well - Wimberley</h3>
          <p>Perhaps the most famous swimming hole in Texas, Jacob's Well is a natural spring that maintains a constant 68-70°F temperature year-round. The crystal-clear water emerges from an underground cave system.</p>
          <ul>
            <li>Reservation Required: Yes, book online in advance</li>
            <li>Best Time: Weekday mornings for fewer crowds</li>
            <li>Depth: Over 140 feet deep</li>
            <li>Safety Note: Swimming only in designated areas</li>
          </ul>

          <h3>Blue Hole - Leakey</h3>
          <p>Fed by natural springs along the Frio River, Blue Hole offers deep, cool water perfect for swimming and cliff jumping.</p>
          <ul>
            <li>Water Temperature: 72-75°F year-round</li>
            <li>Activities: Swimming, snorkeling, cliff jumping</li>
            <li>Amenities: Picnic areas, restrooms, concessions</li>
            <li>Parking: $5 per vehicle</li>
          </ul>

          <h3>Hamilton Pool Preserve</h3>
          <p>A collapsed underground river created this stunning natural pool, complete with a 50-foot waterfall.</p>
          <ul>
            <li>Reservations: Required year-round</li>
            <li>Features: Waterfall, limestone grotto</li>
            <li>Swimming: Allowed when bacteria levels are safe</li>
            <li>Hiking: Quarter-mile trail to the pool</li>
          </ul>

          <h2>Hidden Gems and Local Favorites</h2>
          <h3>Krause Springs</h3>
          <p>Multiple natural springs feed this swimming area, featuring both a natural pool and man-made swimming areas.</p>
          <ul>
            <li>Camping: Available on-site</li>
            <li>Springs: 32 natural springs on the property</li>
            <li>Activities: Swimming, camping, butterfly gardens</li>
          </ul>

          <h3>Cypress Creek - Wimberley</h3>
          <p>A lesser-known spot popular with locals, offering shallow areas perfect for families.</p>
          <ul>
            <li>Access: Multiple public access points</li>
            <li>Depth: Varies from shallow wading to deep swimming</li>
            <li>Wildlife: Excellent bird watching opportunities</li>
          </ul>

          <h2>River Swimming Locations</h2>
          <h3>Guadalupe River</h3>
          <p>Flowing through New Braunfels and beyond, the Guadalupe offers numerous swimming and tubing opportunities.</p>
          <ul>
            <li>Popular Sections: Canyon Lake to New Braunfels</li>
            <li>Outfitters: Multiple tube rental companies</li>
            <li>Best For: Families, large groups, tubing</li>
          </ul>

          <h3>Comal River</h3>
          <p>The shortest river in Texas but one of the most popular for swimming and tubing.</p>
          <ul>
            <li>Length: 2.5 miles from spring to Guadalupe River</li>
            <li>Temperature: Constant 72°F</li>
            <li>Clarity: Crystal clear spring-fed water</li>
          </ul>

          <h2>Safety and Conservation</h2>
          <h3>Swimming Safety</h3>
          <ul>
            <li>Always swim with a buddy</li>
            <li>Check current conditions and water levels</li>
            <li>Be aware of flash flood potential during storms</li>
            <li>Respect posted depth markers and warning signs</li>
          </ul>

          <h3>Environmental Protection</h3>
          <ul>
            <li>Use reef-safe, biodegradable sunscreen</li>
            <li>Pack out all trash, including cigarette butts</li>
            <li>Stay on designated paths to prevent erosion</li>
            <li>Respect wildlife and don't feed animals</li>
          </ul>

          <h2>Seasonal Considerations</h2>
          <h3>Spring (March-May)</h3>
          <p>Cool water temperatures, fewer crowds, wildflowers in bloom around swimming areas.</p>

          <h3>Summer (June-August)</h3>
          <p>Peak season with warmest air temperatures. Expect crowds on weekends. Early morning visits recommended.</p>

          <h3>Fall (September-November)</h3>
          <p>Comfortable air temperatures, warm water, beautiful fall foliage. Excellent time for photography.</p>

          <h3>Winter (December-February)</h3>
          <p>Many locations less crowded but water remains cold. Some facilities may have reduced hours.</p>
        `;

      case "hill-country-bbq-trail-authentic-texas-barbecue-guide":
        return `
          <h2>Legendary BBQ Destinations</h2>
          <h3>Salt Lick BBQ - Driftwood</h3>
          <p>Established in 1967, Salt Lick BBQ has become a pilgrimage site for barbecue lovers worldwide. The open pit and dry rub methodology creates a unique flavor profile that's become synonymous with Texas Hill Country BBQ.</p>
          <ul>
            <li>Signature Dish: Family-style all-you-can-eat platters</li>
            <li>Specialty: Dry-rubbed brisket and pork ribs</li>
            <li>Sauce: Tangy, tomato-based sauce served on the side</li>
            <li>Hours: Thursday-Sunday (check seasonal schedule)</li>
          </ul>

          <h3>Kreuz Market - Lockhart</h3>
          <p>Operating since 1900, Kreuz Market represents old-school Texas barbecue at its finest. No forks, no sauce, just perfectly smoked meats.</p>
          <ul>
            <li>Famous For: Shoulder clod, prime rib, pork chops</li>
            <li>Tradition: No sauce provided - meat speaks for itself</li>
            <li>Serving Style: Meats wrapped in butcher paper</li>
            <li>Wood: Post oak exclusively</li>
          </ul>

          <h3>Smitty's Market - Lockhart</h3>
          <p>Split from Kreuz Market in 1999, Smitty's maintains the original location and traditional pit-smoking methods.</p>
          <ul>
            <li>Atmosphere: Original 1900s building with historic pits</li>
            <li>Specialties: Brisket, sausage, pork shoulder</li>
            <li>Experience: Order at the pit, pay at the front</li>
          </ul>

          <h2>Hidden Gem Smokehouses</h2>
          <h3>Cooper's BBQ - Llano</h3>
          <p>Famous for their "Big Chop" pork chops and direct-heat grilling method that creates a unique char and flavor.</p>
          <ul>
            <li>Signature: Massive pork chops grilled over mesquite</li>
            <li>Style: Direct-heat grilling rather than traditional smoking</li>
            <li>Sides: Beans, coleslaw, and pickles</li>
          </ul>

          <h3>Louie Mueller Barbecue - Taylor</h3>
          <p>Third-generation family operation known for their perfectly rendered brisket and traditional barbecue atmosphere.</p>
          <ul>
            <li>Established: 1949</li>
            <li>Famous For: Beef ribs and brisket</li>
            <li>Atmosphere: Unchanged since the 1950s</li>
          </ul>

          <h2>Smoking Techniques and Traditions</h2>
          <h3>Wood Selection</h3>
          <h4>Post Oak</h4>
          <p>The gold standard for Texas barbecue, post oak burns clean and provides a mild, sweet smoke flavor that doesn't overpower the meat.</p>

          <h4>Mesquite</h4>
          <p>Stronger flavor profile, often used for direct grilling. Burns hot and fast with an intense smoke.</p>

          <h3>Traditional Methods</h3>
          <h4>Salt and Pepper Rub</h4>
          <p>Classic Texas brisket uses only coarse salt and black pepper, allowing the meat and smoke flavors to shine.</p>

          <h4>Low and Slow</h4>
          <p>Temperatures between 225-250°F for 12-16 hours create the perfect bark and tender interior.</p>

          <h2>Meat Cuts and Specialties</h2>
          <h3>Brisket</h3>
          <p>The king of Texas barbecue. A full packer brisket includes both the flat and point, each offering different textures and flavors.</p>
          <ul>
            <li>Flat: Leaner portion, slices cleanly</li>
            <li>Point: Fattier, more marbled, often chopped</li>
            <li>Burnt Ends: Cubed point seasoned and re-smoked</li>
          </ul>

          <h3>Pork Ribs</h3>
          <p>Both spare ribs and baby back ribs are popular, typically dry-rubbed and smoked without sauce.</p>

          <h3>Sausage</h3>
          <p>German influence in the Hill Country led to exceptional smoked sausages, often made in-house with local spices.</p>

          <h2>BBQ Etiquette and Ordering Tips</h2>
          <h3>Traditional Ordering</h3>
          <ul>
            <li>Meat is typically sold by the pound</li>
            <li>Specify if you want lean or moist brisket</li>
            <li>Ask for an end piece if you prefer more bark</li>
            <li>Sauce is usually served on the side, if at all</li>
          </ul>

          <h3>Timing Your Visit</h3>
          <ul>
            <li>Arrive early - popular places sell out daily</li>
            <li>Weekday visits often mean shorter lines</li>
            <li>Some places close when they run out of meat</li>
            <li>Call ahead to check availability</li>
          </ul>

          <h2>Regional Variations</h2>
          <h3>Central Texas Style</h3>
          <p>Emphasis on beef, particularly brisket. Simple rubs, post oak wood, minimal sauce.</p>

          <h3>German Influence</h3>
          <p>Hill Country's German heritage contributed to exceptional sausage-making traditions and market-style serving.</p>

          <h3>Modern Innovations</h3>
          <p>Some newer establishments blend traditional techniques with modern flavors while respecting barbecue traditions.</p>
        `;

      case "family-adventures-hill-country-kids-activities-guide":
        return `
          <h2>Underground Adventures</h2>
          <h3>Natural Bridge Caverns</h3>
          <p>Discovered in 1960, these spectacular limestone caverns offer guided tours through stunning underground formations.</p>
          <ul>
            <li>Age Recommendation: 4 years and up</li>
            <li>Tour Duration: 60-75 minutes</li>
            <li>Temperature: Constant 70°F year-round</li>
            <li>Features: Spectacular formations, underground river</li>
            <li>Special Tours: Lantern tours, wild cave expeditions</li>
          </ul>

          <h3>Wonder World Cave - San Marcos</h3>
          <p>Texas's most visited cave, formed by an earthquake fault line millions of years ago.</p>
          <ul>
            <li>Unique Feature: Earthquake-formed cave</li>
            <li>Additional Activities: Anti-gravity house, observation tower</li>
            <li>Duration: 45-minute guided tour</li>
            <li>Accessibility: Paved walkways throughout</li>
          </ul>

          <h2>Authentic Ranch Experiences</h2>
          <h3>Mayan Dude Ranch - Bandera</h3>
          <p>Family-owned guest ranch offering authentic cowboy experiences in the heart of the Texas Hill Country.</p>
          <ul>
            <li>Activities: Horseback riding, cattle drives, fishing</li>
            <li>Accommodations: Rustic cabins and lodge rooms</li>
            <li>Meals: Home-style cooking, campfire cookouts</li>
            <li>Age Groups: Activities for toddlers to grandparents</li>
          </ul>

          <h3>Dixie Dude Ranch - Bandera</h3>
          <p>Operating since 1937, this working ranch provides genuine Western experiences for families.</p>
          <ul>
            <li>Horseback Riding: Daily trail rides for all skill levels</li>
            <li>Entertainment: Live country music, dancing</li>
            <li>Activities: Swimming pool, hayrides, petting zoo</li>
            <li>Packages: Weekend and week-long stays available</li>
          </ul>

          <h2>River Adventures</h2>
          <h3>Guadalupe River Tubing</h3>
          <p>Perfect family activity with gentle rapids and beautiful scenery along the crystal-clear river.</p>
          <ul>
            <li>Best Sections: Canyon Lake to New Braunfels</li>
            <li>Age Requirements: Varies by outfitter (typically 3+)</li>
            <li>Duration: 2-4 hours depending on route</li>
            <li>What to Bring: Sunscreen, water, waterproof phone case</li>
          </ul>

          <h3>Comal River Activities</h3>
          <p>Shorter, calmer river perfect for younger children and families new to tubing.</p>
          <ul>
            <li>Distance: 2.5 miles total</li>
            <li>Temperature: Constant 72°F</li>
            <li>Family-Friendly: Shallow areas, gentle current</li>
            <li>Rentals: Tubes, rafts, and kayaks available</li>
          </ul>

          <h2>Educational Attractions</h2>
          <h3>National Museum of the Pacific War - Fredericksburg</h3>
          <p>World-class museum honoring Admiral Nimitz and Pacific Theater veterans with interactive exhibits perfect for kids.</p>
          <ul>
            <li>Features: Interactive exhibits, flight simulators</li>
            <li>Family Programs: Junior historian activities</li>
            <li>Age Appropriateness: Elementary age and up</li>
            <li>Duration: 2-4 hours for full experience</li>
          </ul>

          <h3>Enchanted Rock State Park</h3>
          <p>Massive pink granite dome offering hiking, stargazing, and geological education opportunities.</p>
          <ul>
            <li>Easy Trails: Base trail suitable for young children</li>
            <li>Summit Trail: 1-mile hike to the top (moderate difficulty)</li>
            <li>Programs: Junior ranger programs, night sky events</li>
            <li>Camping: Family-friendly campsites available</li>
          </ul>

          <h2>Animal Encounters</h2>
          <h3>Exotic Resort Zoo - Johnson City</h3>
          <p>African safari experience in the Texas Hill Country with over 500 animals from around the world.</p>
          <ul>
            <li>Safari Tours: Guided bus tours through 137 acres</li>
            <li>Walking Area: Petting zoo and small animal encounters</li>
            <li>Educational: Learn about conservation efforts</li>
            <li>Duration: 2-3 hours total experience</li>
          </ul>

          <h3>Natural Bridge Wildlife Ranch</h3>
          <p>Drive-through safari featuring over 40 species of native and exotic animals.</p>
          <ul>
            <li>Experience: Drive your own vehicle through safari</li>
            <li>Animals: Zebras, giraffes, ostriches, and more</li>
            <li>Feeding: Purchase feed bags for animal interactions</li>
            <li>Walking Area: Additional animals and playground</li>
          </ul>

          <h2>Seasonal Activities</h2>
          <h3>Spring (March-May)</h3>
          <ul>
            <li>Wildflower viewing and photography</li>
            <li>Easter egg hunts at various ranches</li>
            <li>Mild weather perfect for outdoor activities</li>
            <li>Baby animal season at petting zoos</li>
          </ul>

          <h3>Summer (June-August)</h3>
          <ul>
            <li>Water activities and swimming holes</li>
            <li>Summer camps at guest ranches</li>
            <li>Evening stargazing programs</li>
            <li>Air-conditioned museum visits during hot afternoons</li>
          </ul>

          <h3>Fall (September-November)</h3>
          <ul>
            <li>Harvest festivals and pumpkin patches</li>
            <li>Perfect weather for hiking and outdoor exploration</li>
            <li>Hunting season education programs</li>
            <li>Fall foliage viewing</li>
          </ul>

          <h3>Winter (December-February)</h3>
          <ul>
            <li>Holiday light displays in towns</li>
            <li>Indoor attractions like caves and museums</li>
            <li>Cozy cabin stays with fireplaces</li>
            <li>Wildlife viewing (animals more active in cooler weather)</li>
          </ul>

          <h2>Planning Tips for Families</h2>
          <h3>Age-Appropriate Activities</h3>
          <ul>
            <li>Toddlers (2-4): Petting zoos, shallow river areas, short cave tours</li>
            <li>Elementary (5-10): Most activities, junior ranger programs, easy hiking trails</li>
            <li>Teens (11+): All activities, longer hikes, more challenging adventures</li>
          </ul>

          <h3>Budget Considerations</h3>
          <ul>
            <li>State parks: Low-cost option with multiple activities</li>
            <li>Ranch experiences: Higher cost but all-inclusive</li>
            <li>Free activities: Hiking, swimming holes, town exploration</li>
            <li>Combo tickets: Many attractions offer package deals</li>
          </ul>

          <h3>Accommodation Options</h3>
          <ul>
            <li>Guest ranches: All-inclusive family experiences</li>
            <li>Cabin rentals: Kitchen facilities, multiple bedrooms</li>
            <li>State park camping: Budget-friendly, nature immersion</li>
            <li>Family hotels: Pools, continental breakfast, convenient locations</li>
          </ul>
        `;

      default:
        return "<p>Full blog content coming soon...</p>";
    }
  };

  return (
    <div className="min-h-screen bg-texas-cream pt-20">
      {/* Header */}
      <div className="bg-texas-brown text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-texas-peach hover:text-white mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="secondary" className="bg-texas-peach text-white">
              {blogPost.category}
            </Badge>
            <div className="flex items-center text-texas-peach">
              <Calendar className="mr-2 h-4 w-4" />
              {blogPost.date}
            </div>
          </div>
          
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            {blogPost.title}
          </h1>
          
          <p className="text-xl text-texas-cream opacity-90 max-w-4xl">
            {blogPost.excerpt}
          </p>
          
          <div className="flex items-center mt-6 space-x-6 text-sm text-texas-peach">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Hill Country Travel Guide
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              8-12 min read
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={blogPost.imageUrl} 
          alt={blogPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg">
            <div className="p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-texas-brown prose-headings:font-playfair prose-p:text-texas-slate prose-ul:text-texas-slate prose-li:text-texas-slate"
                style={{
                  lineHeight: '1.8',
                  fontSize: '18px'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: getFullContent(blogPost)
                }}
              />
              
              {/* Call to Action */}
              <div className="mt-12 p-6 bg-texas-cream rounded-lg">
                <h3 className="font-playfair text-2xl font-bold text-texas-brown mb-4">
                  Plan Your Hill Country Adventure
                </h3>
                <p className="text-texas-slate mb-6">
                  Ready to experience the beauty and adventures of Texas Hill Country? Explore our destinations, activities, and events to plan your perfect getaway.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/destinations" className="px-6 py-3 bg-texas-brown text-white rounded-lg hover:bg-texas-chocolate transition-colors">
                    Explore Destinations
                  </Link>
                  <Link href="/things-to-do" className="px-6 py-3 bg-texas-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    Things to Do
                  </Link>
                  <Link href="/events" className="px-6 py-3 bg-texas-green text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    Upcoming Events
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}