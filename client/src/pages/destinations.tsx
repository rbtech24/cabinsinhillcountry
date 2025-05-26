import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card } from "@/components/ui/card";
import type { Destination } from "@shared/schema";

export default function DestinationsPage() {
  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  useEffect(() => {
    document.title = "Destinations - Cabins in Hill Country";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore the most beloved destinations in Texas Hill Country. From Fredericksburg wineries to Bandera dude ranches and Wimberley swimming holes.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Explore the most beloved destinations in Texas Hill Country. From Fredericksburg wineries to Bandera dude ranches and Wimberley swimming holes.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-texas-beige">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-texas-purple">
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">Destinations</h1>
          <p className="text-xl md:text-2xl font-light">Discover the charm of Hill Country towns</p>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Hill Country Towns</h2>
            <p className="text-lg text-texas-slate max-w-3xl mx-auto">Each destination in Texas Hill Country has its own unique personality and charm. From German heritage towns to cowboy capitals, discover the perfect spot for your getaway.</p>
          </div>

          {isLoading ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="relative overflow-hidden animate-pulse">
                  <div className="w-full h-80 bg-gray-300"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {destinations?.map((destination) => (
                <Card key={destination.id} className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name} 
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-playfair text-3xl font-bold mb-3">{destination.name}</h3>
                    <p className="text-lg mb-4 opacity-90">{destination.description}</p>
                    <div className="flex items-center space-x-6 text-sm">
                      {destination.highlights.map((highlight, index) => (
                        <span key={index} className="flex items-center">
                          <i className="fas fa-star mr-2 text-texas-peach"></i> {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-texas-chocolate text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-wine-glass-alt text-2xl"></i>
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-texas-brown">Wine Trails</h3>
              <p className="text-texas-slate">Explore over 50 wineries along the famous Fredericksburg Wine Trail and discover award-winning Texas wines.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-texas-purple text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-horse text-2xl"></i>
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-texas-brown">Ranch Life</h3>
              <p className="text-texas-slate">Experience authentic Texas cowboy culture at working dude ranches in Bandera and surrounding areas.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-texas-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-water text-2xl"></i>
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-texas-brown">Swimming Holes</h3>
              <p className="text-texas-slate">Cool off in crystal-clear spring-fed swimming holes and rivers throughout the Hill Country region.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-texas-brown text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold mb-4">Plan Your Perfect Getaway</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">Choose your favorite Hill Country destination and book a nearby cabin for the ultimate Texas experience.</p>
          <button className="bg-texas-peach text-texas-slate hover:bg-white rounded-full px-8 py-3 text-lg font-semibold transition-colors">
            Find Cabins
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}