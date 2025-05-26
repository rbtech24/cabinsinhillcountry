import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, User } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPage() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  useEffect(() => {
    document.title = "Travel Blog - Cabins in Hill Country";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read our Texas Hill Country travel blog for insider tips, seasonal guides, and local stories. Get expert advice for your Hill Country vacation.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Read our Texas Hill Country travel blog for insider tips, seasonal guides, and local stories. Get expert advice for your Hill Country vacation.';
      document.head.appendChild(meta);
    }
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'travel guide':
        return 'bg-texas-chocolate';
      case 'accommodation':
        return 'bg-texas-purple';
      case 'wine & dining':
        return 'bg-texas-brown';
      case 'family travel':
        return 'bg-texas-peach';
      case 'romance':
        return 'bg-texas-green';
      default:
        return 'bg-texas-chocolate';
    }
  };

  return (
    <div className="min-h-screen bg-texas-beige">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-texas-brown">
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">Travel Blog</h1>
          <p className="text-xl md:text-2xl font-light">Insider tips and local stories from Hill Country</p>
        </div>
      </section>

      {/* Featured Post */}
      {!isLoading && blogPosts && blogPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Featured Article</h2>
            </div>
            
            <Card className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
              <div className="md:flex">
                <img 
                  src={blogPosts[0].imageUrl} 
                  alt={blogPosts[0].title} 
                  className="w-full md:w-1/2 h-64 md:h-auto object-cover"
                />
                <CardContent className="md:w-1/2 p-8">
                  <div className="mb-4">
                    <span className={`${getCategoryColor(blogPosts[0].category)} text-white px-3 py-1 rounded-full text-sm font-medium mr-3`}>
                      {blogPosts[0].category}
                    </span>
                    <span className="text-texas-chocolate text-sm flex items-center mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {blogPosts[0].date}
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold mb-4 text-texas-brown">{blogPosts[0].title}</h3>
                  <p className="text-texas-slate mb-6 text-lg">{blogPosts[0].excerpt}</p>
                  <button className="text-texas-chocolate font-semibold hover:text-texas-brown transition-colors flex items-center">
                    Read Full Article <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-texas-brown mb-4">Latest Articles</h2>
            <p className="text-lg text-texas-slate max-w-3xl mx-auto">Discover insider tips, seasonal guides, and local stories to help you make the most of your Hill Country adventure.</p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
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
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts?.slice(1).map((post) => (
                <Card key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <span className={`${getCategoryColor(post.category)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="text-texas-chocolate text-sm mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <h3 className="font-playfair text-xl font-bold mb-3 text-texas-brown">{post.title}</h3>
                    <p className="text-texas-slate mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <button className="text-texas-chocolate font-semibold hover:text-texas-brown transition-colors flex items-center">
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                      <div className="flex items-center text-texas-slate text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        5 min read
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Categories */}
      <section className="py-16 bg-texas-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-texas-brown mb-4">Browse by Category</h2>
            <p className="text-lg text-texas-slate max-w-3xl mx-auto">Find articles that match your interests and travel style.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <button className="bg-texas-chocolate text-white p-4 rounded-lg hover:bg-texas-brown transition-colors text-center">
              <h3 className="font-playfair font-bold mb-1">Travel Guides</h3>
              <p className="text-sm opacity-90">Essential tips & routes</p>
            </button>

            <button className="bg-texas-purple text-white p-4 rounded-lg hover:bg-texas-brown transition-colors text-center">
              <h3 className="font-playfair font-bold mb-1">Accommodations</h3>
              <p className="text-sm opacity-90">Cabin reviews & tips</p>
            </button>

            <button className="bg-texas-brown text-white p-4 rounded-lg hover:bg-texas-chocolate transition-colors text-center">
              <h3 className="font-playfair font-bold mb-1">Wine & Dining</h3>
              <p className="text-sm opacity-90">Food & wine experiences</p>
            </button>

            <button className="bg-texas-peach text-white p-4 rounded-lg hover:bg-texas-brown transition-colors text-center">
              <h3 className="font-playfair font-bold mb-1">Family Travel</h3>
              <p className="text-sm opacity-90">Kid-friendly adventures</p>
            </button>

            <button className="bg-texas-green text-white p-4 rounded-lg hover:bg-texas-brown transition-colors text-center">
              <h3 className="font-playfair font-bold mb-1">Romance</h3>
              <p className="text-sm opacity-90">Couples getaways</p>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-texas-brown mb-4">Stay Updated</h2>
          <p className="text-lg text-texas-slate mb-8 max-w-2xl mx-auto">Get the latest Hill Country travel tips, seasonal guides, and exclusive cabin deals delivered to your inbox.</p>
          
          <div className="max-w-md mx-auto flex gap-3">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-texas-beige rounded-full focus:outline-none focus:ring-2 focus:ring-texas-chocolate"
            />
            <Button className="bg-texas-chocolate text-white hover:bg-texas-brown rounded-full px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-texas-brown text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold mb-4">Ready to Experience Hill Country?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">Turn your reading into reality. Book your Hill Country cabin and start creating your own stories.</p>
          <button className="bg-texas-peach text-texas-slate hover:bg-white rounded-full px-8 py-3 text-lg font-semibold transition-colors">
            Book Your Adventure
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}