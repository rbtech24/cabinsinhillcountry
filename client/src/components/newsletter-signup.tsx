import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, CheckCircle } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "default" | "compact" | "footer";
  className?: string;
}

export default function NewsletterSignup({ variant = "default", className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const result = await apiRequest({
        method: "POST",
        url: "/api/newsletter/subscribe",
        body: { email }
      });
      return result;
    },
    onSuccess: () => {
      setIsSubscribed(true);
      setEmail("");
      toast({
        title: "Welcome to Hill Country!",
        description: "You've successfully subscribed to our newsletter. Check your email for a welcome message!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/newsletter/subscribers'] });
    },
    onError: (error: any) => {
      const message = error.message || "Failed to subscribe. Please try again.";
      toast({
        title: "Subscription Failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    subscribeMutation.mutate(email.trim());
  };

  if (isSubscribed) {
    return (
      <div className={`text-center ${className}`}>
        <div className="flex items-center justify-center mb-3">
          <CheckCircle className="w-8 h-8 text-texas-green mr-2" />
          <h3 className="text-xl font-bold text-texas-green">You're In!</h3>
        </div>
        <p className="text-texas-slate">
          Welcome to our Hill Country community! Check your email for exclusive travel tips and cabin deals.
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
        />
        <Button 
          type="submit" 
          disabled={subscribeMutation.isPending}
          className="bg-texas-chocolate text-white hover:bg-texas-brown"
        >
          {subscribeMutation.isPending ? "..." : "Subscribe"}
        </Button>
      </form>
    );
  }

  if (variant === "footer") {
    return (
      <div className={className}>
        <h4 className="font-playfair text-lg font-bold mb-4 text-white flex items-center">
          <Mail className="w-5 h-5 mr-2" />
          Stay Updated
        </h4>
        <p className="text-sm opacity-90 mb-4">
          Get exclusive Hill Country travel tips and cabin deals delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
            required
          />
          <Button 
            type="submit" 
            disabled={subscribeMutation.isPending}
            className="bg-texas-chocolate text-white hover:bg-texas-brown"
          >
            {subscribeMutation.isPending ? "..." : "Join"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className={`text-center max-w-md mx-auto ${className}`}>
      <div className="mb-6">
        <div className="bg-texas-chocolate text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8" />
        </div>
        <h3 className="font-playfair text-2xl font-bold text-texas-brown mb-2">Stay in the Loop</h3>
        <p className="text-texas-slate">
          Get the latest Hill Country travel tips, seasonal guides, and exclusive cabin deals delivered to your inbox.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-texas-beige rounded-full focus:outline-none focus:ring-2 focus:ring-texas-chocolate"
          required
        />
        <Button 
          type="submit" 
          disabled={subscribeMutation.isPending}
          className="w-full bg-texas-chocolate text-white hover:bg-texas-brown rounded-full py-3 text-lg font-semibold"
        >
          {subscribeMutation.isPending ? "Subscribing..." : "Subscribe to Newsletter"}
        </Button>
      </form>
      
      <p className="text-xs text-texas-slate mt-4 opacity-75">
        No spam, just the best of Hill Country. Unsubscribe anytime.
      </p>
    </div>
  );
}