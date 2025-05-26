import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";
import type { Event } from "@shared/schema";

export default function EventsPage() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const getEventColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'seasonal':
        return 'bg-texas-purple';
      case 'wine & music':
        return 'bg-texas-chocolate';
      case 'rodeo':
        return 'bg-texas-brown';
      case 'music':
        return 'bg-texas-peach';
      case 'holiday':
        return 'bg-texas-purple';
      default:
        return 'bg-texas-green';
    }
  };

  useEffect(() => {
    document.title = "Events - Cabins in Hill Country";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover upcoming events and festivals in Texas Hill Country. From wildflower festivals to wine tastings, rodeos, and holiday celebrations.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Discover upcoming events and festivals in Texas Hill Country. From wildflower festivals to wine tastings, rodeos, and holiday celebrations.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-texas-beige">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-texas-green">
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">Events & Festivals</h1>
          <p className="text-xl md:text-2xl font-light">Celebrate the seasons in Hill Country</p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Upcoming Events</h2>
            <p className="text-lg text-texas-slate max-w-3xl mx-auto">Join us for festivals, concerts, and seasonal celebrations throughout the Hill Country. There's always something exciting happening in our charming towns.</p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="p-6 animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-lg mr-4"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-300 rounded mb-1"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events?.map((event) => (
                <Card key={event.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className={`${getEventColor(event.category)} text-white p-3 rounded-lg mr-4`}>
                      <i className={`${event.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-playfair text-lg font-bold">{event.title}</h3>
                      <p className="text-texas-chocolate text-sm flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {event.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-texas-slate mb-4">{event.description}</p>
                  <div className="text-sm text-texas-chocolate flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </div>
                  <div className="mt-4">
                    <span className="bg-texas-beige text-texas-brown px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-texas-brown mb-4">Event Categories</h2>
            <p className="text-lg text-texas-slate max-w-3xl mx-auto">From seasonal celebrations to cultural festivals, Hill Country hosts events all year round.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-texas-beige rounded-lg">
              <div className="bg-texas-purple text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-seedling text-lg"></i>
              </div>
              <h3 className="font-playfair text-lg font-bold mb-2 text-texas-brown">Seasonal</h3>
              <p className="text-texas-slate text-sm">Wildflower festivals, harvest celebrations, and holiday events</p>
            </div>

            <div className="text-center p-6 bg-texas-beige rounded-lg">
              <div className="bg-texas-chocolate text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-wine-glass-alt text-lg"></i>
              </div>
              <h3 className="font-playfair text-lg font-bold mb-2 text-texas-brown">Wine & Music</h3>
              <p className="text-texas-slate text-sm">Wine tastings paired with live music performances</p>
            </div>

            <div className="text-center p-6 bg-texas-beige rounded-lg">
              <div className="bg-texas-brown text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-horse text-lg"></i>
              </div>
              <h3 className="font-playfair text-lg font-bold mb-2 text-texas-brown">Rodeo</h3>
              <p className="text-texas-slate text-sm">Authentic Texas rodeo competitions and cowboy culture</p>
            </div>

            <div className="text-center p-6 bg-texas-beige rounded-lg">
              <div className="bg-texas-peach text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-music text-lg"></i>
              </div>
              <h3 className="font-playfair text-lg font-bold mb-2 text-texas-brown">Music</h3>
              <p className="text-texas-slate text-sm">Concert series featuring country, folk, and blues artists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-texas-brown text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold mb-4">Never Miss an Event</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">Book your Hill Country cabin near your favorite events and festivals for the perfect getaway experience.</p>
          <button className="bg-texas-peach text-texas-slate hover:bg-white rounded-full px-8 py-3 text-lg font-semibold transition-colors">
            Plan Your Visit
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}