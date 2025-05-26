import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";
import type { Event } from "@shared/schema";

export default function Events() {
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

  if (isLoading) {
    return (
      <section id="events" className="py-16 bg-texas-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Upcoming Events</h2>
            <p className="text-lg text-texas-slate max-w-3xl mx-auto">Loading events...</p>
          </div>
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
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-16 bg-texas-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Upcoming Events</h2>
          <p className="text-lg text-texas-slate max-w-3xl mx-auto">Join us for festivals, concerts, and seasonal celebrations throughout the Hill Country.</p>
        </div>

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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
