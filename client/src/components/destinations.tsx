import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import type { Destination } from "@shared/schema";

export default function Destinations() {
  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  if (isLoading) {
    return (
      <section id="destinations" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Popular Destinations</h2>
            <p className="text-lg text-texas-slate max-w-3xl mx-auto">Loading destinations...</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="relative overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-300"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Popular Destinations</h2>
          <p className="text-lg text-texas-slate max-w-3xl mx-auto">Discover the most beloved spots in Texas Hill Country, each with its own unique charm and character.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {destinations?.map((destination, index) => {
            const colors = ['bg-texas-chocolate', 'bg-texas-purple', 'bg-texas-green', 'bg-texas-brown'];
            const bgColor = colors[index % colors.length];
            
            return (
              <Card key={destination.id} className={`relative ${bgColor} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow`}>
                <div className="p-6 text-white h-64 flex flex-col justify-end">
                  <h3 className="font-playfair text-2xl font-bold mb-2">{destination.name}</h3>
                  <p className="text-sm mb-3">{destination.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    {destination.highlights.map((highlight, index) => (
                      <span key={index}>
                        <i className="fas fa-star mr-1"></i> {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
