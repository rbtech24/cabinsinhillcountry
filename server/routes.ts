import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendWelcomeEmail } from "./email";
import { insertNewsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Activities endpoints
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  // Destinations endpoints
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  // Events endpoints
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  // Blog posts endpoints
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Newsletter endpoints
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email is already subscribed
      const isAlreadySubscribed = await storage.isEmailSubscribed(validatedData.email);
      if (isAlreadySubscribed) {
        return res.status(409).json({ message: "Email is already subscribed to our newsletter" });
      }

      // Subscribe to newsletter
      const subscription = await storage.subscribeToNewsletter(validatedData);
      
      // Send welcome email
      try {
        await sendWelcomeEmail(validatedData.email);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the subscription if email fails
      }

      res.status(201).json({ 
        message: "Successfully subscribed to newsletter!",
        subscription: { id: subscription.id, email: subscription.email }
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Email already subscribed') {
        res.status(409).json({ message: "Email is already subscribed to our newsletter" });
      } else {
        console.error('Newsletter subscription error:', error);
        res.status(400).json({ message: "Failed to subscribe to newsletter" });
      }
    }
  });

  app.get("/api/newsletter/subscribers", async (req, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      res.json(subscribers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch newsletter subscribers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
