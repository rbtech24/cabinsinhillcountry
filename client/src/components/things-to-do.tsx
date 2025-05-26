import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import type { Activity } from "@shared/schema";

export default function ThingsToDo() {
  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ['/api/activities'],
  });

  if (isLoading) {
    return (
      <section id="things-to-do" className="py-16 bg-texas-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Things to Do</h2>
            <p className="text-lg text-texas-slate max-w-3xl mx-auto">Loading activities...</p>
          </div>
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
        </div>
      </section>
    );
  }

  return (
    <section id="things-to-do" className="py-16 bg-texas-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Things to Do</h2>
          <p className="text-lg text-texas-slate max-w-3xl mx-auto">From wine tasting to water adventures, Hill Country offers something for everyone.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities?.map((activity, index) => {
            const colors = ['bg-texas-chocolate', 'bg-texas-purple', 'bg-texas-green', 'bg-texas-brown', 'bg-texas-peach', 'bg-texas-slate'];
            const bgColor = colors[index % colors.length];
            
            return (
              <Card key={activity.id} className={`${bgColor} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow`}>
                <CardContent className="p-6 text-white h-64 flex flex-col justify-between">
                  <div>
                    <h3 className="font-playfair text-xl font-bold mb-3">{activity.title}</h3>
                    <p className="text-white opacity-90 mb-4 text-sm leading-relaxed">{activity.description}</p>
                  </div>
                  <div className="flex items-center text-white opacity-80">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{activity.location}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
