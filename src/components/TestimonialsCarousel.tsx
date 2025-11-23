import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Marie Dupont",
    role: "Ministre de la Culture",
    avatar: "MD",
    quote: "SIFEC a transformé notre communication institutionnelle avec une approche stratégique et innovante. Leur expertise nous a permis d'atteindre nos objectifs au-delà de nos attentes.",
    rating: 5
  },
  {
    name: "Jean-Paul Martin",
    role: "PDG, Groupe Fortune 500",
    avatar: "JPM",
    quote: "Une équipe professionnelle et réactive qui comprend les enjeux de communication au plus haut niveau. Leur accompagnement a été déterminant pour notre image de marque.",
    rating: 5
  },
  {
    name: "Sophie Kouassi",
    role: "Directrice Communication, Scale-up Tech",
    avatar: "SK",
    quote: "L'accompagnement de SIFEC nous a permis de structurer notre communication et de gagner en visibilité. Leur créativité et leur professionnalisme sont remarquables.",
    rating: 5
  },
  {
    name: "Ahmed Touré",
    role: "Directeur Général, Organisation Internationale",
    avatar: "AT",
    quote: "SIFEC a su comprendre nos besoins spécifiques et nous proposer des solutions adaptées. Leur professionnalisme et leur réactivité sont exemplaires.",
    rating: 5
  },
  {
    name: "Claire Dubois",
    role: "Ministre en exercice",
    avatar: "CD",
    quote: "Une expertise remarquable en gestion de crise et communication sensible. SIFEC est un partenaire de confiance pour nos enjeux institutionnels majeurs.",
    rating: 5
  }
];

export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleTransition((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleTransition = (indexOrCallback: number | ((prev: number) => number)) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (typeof indexOrCallback === 'function') {
        setCurrentIndex(indexOrCallback);
      } else {
        setCurrentIndex(indexOrCallback);
      }
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    handleTransition(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume autoplay after 10s
  };

  const goToPrevious = () => {
    handleTransition((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    handleTransition((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const testimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Testimonial Card */}
      <div className="relative">
        <Card className="border-border/50 bg-card shadow-2xl rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          
          <CardContent 
            className={`p-12 md:p-16 relative z-10 transition-all duration-500 ${
              isTransitioning 
                ? 'opacity-0 translate-y-4' 
                : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Rating Stars */}
            <div className="flex gap-1 mb-8 justify-center">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="text-accent fill-accent" size={24} />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-foreground leading-relaxed mb-12 font-light text-xl md:text-2xl text-center relative">
              <span className="absolute -top-4 -left-2 text-7xl text-primary/20 font-serif">"</span>
              <p className="relative z-10 italic">{testimonial.quote}</p>
            </blockquote>

            {/* Client Info */}
            <div className="flex flex-col items-center gap-4 pt-8 border-t border-border/50">
              <div className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-light shadow-lg">
                <div className="flex h-full w-full items-center justify-center text-white font-semibold text-2xl">
                  {testimonial.avatar}
                </div>
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground font-light">{testimonial.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Button
          onClick={goToPrevious}
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-16 rounded-full h-12 w-12 bg-background hover:bg-muted shadow-lg border-border/50"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          onClick={goToNext}
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-16 rounded-full h-12 w-12 bg-background hover:bg-muted shadow-lg border-border/50"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Dots Indicators */}
      <div className="flex justify-center gap-3 mt-12">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-12 h-3 bg-primary"
                : "w-3 h-3 bg-border hover:bg-border/80"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="mt-8 h-1 bg-border/30 rounded-full overflow-hidden max-w-md mx-auto">
          <div
            className="h-full bg-primary transition-all duration-100"
            style={{
              width: "0%",
              animation: "progressBar 5s linear",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
