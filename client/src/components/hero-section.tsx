import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"}}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">Discover Texas Hill Country</h1>
        <p className="text-xl md:text-2xl mb-8 font-light">Escape to rustic cabins, rolling hills, and endless adventures in the heart of Texas</p>
        <div className="space-x-4">
          <Button 
            onClick={() => scrollToSection('destinations')}
            className="bg-texas-chocolate text-white hover:bg-texas-brown rounded-full px-8 py-3 text-lg font-semibold"
          >
            Explore Cabins
          </Button>
          <Button 
            variant="outline"
            onClick={() => scrollToSection('things-to-do')}
            className="border-2 border-white text-white hover:bg-white hover:text-texas-slate rounded-full px-8 py-3 text-lg font-semibold bg-transparent"
          >
            Things to Do
          </Button>
        </div>
      </div>
    </section>
  );
}
