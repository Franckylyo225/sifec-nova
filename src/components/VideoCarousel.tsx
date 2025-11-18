import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const VideoCarousel = () => {
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

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {videos.map((video) => (
          <CarouselItem key={video.id} className="pl-4 md:basis-1/1 lg:basis-1/1">
            <Card className="border-0 overflow-hidden bg-card shadow-xl">
              <div className="relative group">
                {/* Video Container */}
                <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="absolute inset-0 w-full h-full rounded-t-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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
    </Carousel>
  );
};

export default VideoCarousel;