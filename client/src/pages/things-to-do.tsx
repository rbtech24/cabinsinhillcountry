import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import type { Activity } from "@shared/schema";

export default function ThingsToDoPage() {
  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ['/api/activities'],
  });

  useEffect(() => {
    document.title = "Things to Do - Cabins in Hill Country";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover amazing activities in Texas Hill Country. From wine tours and river adventures to hiking trails and stargazing experiences.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Discover amazing activities in Texas Hill Country. From wine tours and river adventures to hiking trails and stargazing experiences.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-texas-beige">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-texas-chocolate">
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">Things to Do</h1>
          <p className="text-xl md:text-2xl font-light">Endless adventures await in Texas Hill Country</p>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Hill Country Adventures</h2>
            <p className="text-lg text-texas-slate max-w-3xl mx-auto">From wine tasting to water adventures, Hill Country offers something for everyone. Whether you're seeking relaxation or excitement, you'll find the perfect activity for your getaway.</p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-300"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities?.map((activity) => (
                <Card key={activity.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src={activity.imageUrl} 
                    alt={activity.title} 
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <span className="bg-texas-chocolate text-white px-3 py-1 rounded-full text-sm font-medium">
                        {activity.category}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl font-bold mb-2">{activity.title}</h3>
                    <p className="text-texas-slate mb-4">{activity.description}</p>
                    <div className="flex items-center text-texas-chocolate">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{activity.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-texas-brown mb-4">Ready to Explore?</h2>
          <p className="text-lg text-texas-slate mb-8 max-w-2xl mx-auto">Book your Hill Country cabin and start planning your perfect adventure-filled getaway.</p>
          <button className="bg-texas-chocolate text-white hover:bg-texas-brown rounded-full px-8 py-3 text-lg font-semibold transition-colors">
            Book Your Stay
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}