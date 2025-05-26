import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ThingsToDo from "@/components/things-to-do";
import Destinations from "@/components/destinations";
import Events from "@/components/events";
import Blog from "@/components/blog";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    document.title = "Cabins in Hill Country - Texas Hill Country Vacation Rentals";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover Texas Hill Country with our luxury cabin rentals, wine tours, outdoor adventures, and travel guides. Book your perfect Hill Country getaway today.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Discover Texas Hill Country with our luxury cabin rentals, wine tours, outdoor adventures, and travel guides. Book your perfect Hill Country getaway today.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-texas-beige">
      <Navigation />
      <HeroSection />
      
      {/* Quick Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Why Choose Hill Country?</h2>
            <p className="text-lg text-texas-slate max-w-3xl mx-auto">Experience the perfect blend of natural beauty, outdoor adventures, and charming small-town hospitality in Texas Hill Country.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-texas-peach text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-home text-2xl"></i>
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3">Cozy Cabins</h3>
              <p className="text-texas-slate">Rustic yet modern cabins nestled in the rolling hills, perfect for romantic getaways or family adventures.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-texas-purple text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-wine-glass-alt text-2xl"></i>
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3">Wine Country</h3>
              <p className="text-texas-slate">Explore award-winning wineries and vineyards along the Texas Wine Trail in Fredericksburg and beyond.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-texas-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-hiking text-2xl"></i>
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3">Outdoor Adventures</h3>
              <p className="text-texas-slate">From hiking and swimming to stargazing and wildlife viewing, endless outdoor activities await.</p>
            </div>
          </div>
        </div>
      </section>

      <ThingsToDo />
      <Destinations />
      <Events />
      <Blog />
      
      {/* Call to Action */}
      <section className="py-16 bg-texas-brown text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600')"}}></div>
        <div className="absolute inset-0 bg-texas-brown bg-opacity-80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Ready for Your Hill Country Adventure?</h2>
            <p className="text-xl mb-8 opacity-90">Book your perfect cabin retreat and start creating unforgettable memories in the heart of Texas.</p>
            <div className="space-x-4">
              <a href="#" className="bg-texas-peach text-texas-slate px-8 py-3 rounded-full text-lg font-semibold hover:bg-white transition-colors inline-block">Book Your Stay</a>
              <a href="#contact" className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-texas-brown transition-colors inline-block">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
