import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  if (isLoading) {
    return (
      <section id="blog" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Travel Blog</h2>
            <p className="text-lg text-texas-slate max-w-3xl mx-auto">Loading blog posts...</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(5)].map((_, index) => (
              <Card key={index} className="overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Travel Blog</h2>
          <p className="text-lg text-texas-slate max-w-3xl mx-auto">Insider tips, seasonal guides, and local stories to help you make the most of your Hill Country adventure.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts?.map((post) => (
            <Card key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="text-texas-chocolate text-sm mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.date} • {post.category}
                </div>
                <h3 className="font-playfair text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-texas-slate mb-4">{post.excerpt}</p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-texas-chocolate font-semibold hover:text-texas-brown transition-colors flex items-center"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Button className="bg-texas-chocolate text-white hover:bg-texas-brown rounded-full px-8 py-3 text-lg font-semibold">
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
