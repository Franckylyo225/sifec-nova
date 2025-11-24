import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("archived", false)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Transform data to match component format
      return data.map(testimonial => ({
        name: testimonial.client_name,
        role: `${testimonial.client_position}, ${testimonial.client_company}`,
        avatar: testimonial.client_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 3),
        quote: testimonial.testimonial_text,
        rating: testimonial.rating || 5
      }));
    },
  });

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
    if (index === currentIndex || !testimonials.length) return;
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

  if (!testimonials.length) {
    return (
      <div className="text-center text-muted-foreground py-12">
        Aucun témoignage disponible pour le moment.
      </div>
    );
  }

  const testimonial = testimonials[currentIndex];

  if (!testimonial) {
    return null;
  }

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
