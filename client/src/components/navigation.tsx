import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mountain } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Things to Do", href: "/things-to-do" },
    { label: "Destinations", href: "/destinations" },
    { label: "Events", href: "/events" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-texas-brown text-white p-3 rounded-lg">
              <Mountain className="text-xl" />
            </div>
            <div>
              <h1 className="font-playfair text-2xl font-bold text-texas-brown">Cabins in Hill Country</h1>
              <p className="text-sm text-texas-slate opacity-75">Texas Hill Country Escapes</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-texas-chocolate transition-colors font-medium text-texas-slate"
              >
                {item.label}
              </Link>
            ))}
            <Button 
              className="bg-texas-chocolate text-white hover:bg-texas-brown rounded-full px-6"
              onClick={() => scrollToSection('contact')}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-texas-brown">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-left hover:text-texas-chocolate transition-colors font-medium text-texas-slate py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button 
                  className="bg-texas-chocolate text-white hover:bg-texas-brown rounded-full mt-4"
                  onClick={() => scrollToSection('contact')}
                >
                  Book Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
