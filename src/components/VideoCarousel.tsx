import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

const VideoCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const videos = [
    {
      id: 1,
      title: "Campagne Institutionnelle 2024",
      category: "Communication Corporate",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Spot TV - Lancement Produit",
      category: "Publicité",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Interview Leadership",
      category: "Relations Publiques",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {videos.map((video, index) => (
            <CarouselItem key={video.id} className="pl-4 md:basis-1/1 lg:basis-1/1">
              <Card className="border-0 overflow-hidden bg-card shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300">
                <div 
                  className="relative group"
                  onClick={() => setSelectedVideo(index)}
                >
                  {/* Video Container */}
                  <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                    <iframe
                      src={video.videoUrl}
                      title={video.title}
                      className="absolute inset-0 w-full h-full rounded-t-lg pointer-events-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-semibold">
                        Cliquez pour agrandir
                      </div>
                    </div>
                  </div>

                  {/* Video Info Overlay */}
                  <div className="p-8 bg-gradient-to-b from-transparent to-background/95">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4">
                      {video.category}
                    </span>
                    <h3 className="text-2xl font-display font-bold tracking-tight">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="flex justify-center gap-2 mt-8">
          <CarouselPrevious className="relative static translate-x-0 translate-y-0" />
          <CarouselNext className="relative static translate-x-0 translate-y-0" />
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>

      {/* Video Dialog */}
      <Dialog open={selectedVideo !== null} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 bg-black/95">
          <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
            <X className="h-6 w-6 text-white" />
          </DialogClose>
          {selectedVideo !== null && (
            <div className="w-full h-full flex items-center justify-center p-4">
              <iframe
                src={videos[selectedVideo].videoUrl}
                title={videos[selectedVideo].title}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoCarousel;