import { Mountain, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "wouter";
import NewsletterSignup from "@/components/newsletter-signup";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-texas-slate text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-texas-chocolate text-white p-3 rounded-lg">
                <Mountain className="text-xl" />
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-bold">Cabins in Hill Country</h3>
                <p className="text-sm opacity-75">Your Gateway to Texas Hill Country</p>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-6 max-w-md">
              Discover the magic of Texas Hill Country with our carefully curated selection of cabins, activities, and local experiences. Create memories that last a lifetime.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-texas-chocolate w-10 h-10 rounded-full flex items-center justify-center hover:bg-texas-brown transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-texas-chocolate w-10 h-10 rounded-full flex items-center justify-center hover:bg-texas-brown transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-texas-chocolate w-10 h-10 rounded-full flex items-center justify-center hover:bg-texas-brown transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                  onClick={scrollToTop}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/things-to-do"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                  onClick={scrollToTop}
                >
                  Things to Do
                </Link>
              </li>
              <li>
                <Link 
                  href="/destinations"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                  onClick={scrollToTop}
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link 
                  href="/events"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                  onClick={scrollToTop}
                >
                  Events
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                  onClick={scrollToTop}
                >
                  Blog
                </Link>
              </li>
              <li>
                <a href="https://wimberleycabins.com/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity">Booking</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span className="opacity-90">(512) 847-7460</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span className="opacity-90">info@cabinsinhillcountry.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span className="opacity-90">Hill Country, Texas</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4" />
                <span className="opacity-90">Mon-Sun: 9AM-7PM CST</span>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-playfair text-lg font-bold mb-4">Popular Destinations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/destinations" className="opacity-90 hover:opacity-100 transition-opacity">Fredericksburg</a>
              </li>
              <li>
                <a href="/destinations" className="opacity-90 hover:opacity-100 transition-opacity">Wimberley</a>
              </li>
              <li>
                <a href="/destinations" className="opacity-90 hover:opacity-100 transition-opacity">Austin</a>
              </li>
              <li>
                <a href="/destinations" className="opacity-90 hover:opacity-100 transition-opacity">New Braunfels</a>
              </li>
              <li>
                <a href="/destinations" className="opacity-90 hover:opacity-100 transition-opacity">San Marcos</a>
              </li>
              <li>
                <a href="/destinations" className="opacity-90 hover:opacity-100 transition-opacity">Dripping Springs</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-sm opacity-75">
            &copy; 2024 Cabins in Hill Country. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
