import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Globe, Zap } from "lucide-react";
import aboutHeroImage from "@/assets/about-hero.jpg";
import teamPhoto from "@/assets/team-photo.jpg";
import { useEffect, useRef, useState } from "react";

const ValueCard = ({ value, index, total }: { value: any; index: number; total: number }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollStart = windowHeight * 0.3;
      const scrollEnd = windowHeight * 0.7;
      
      if (rect.top <= scrollStart && rect.top >= scrollEnd - windowHeight) {
        const progress = (scrollStart - rect.top) / (scrollStart - scrollEnd + windowHeight);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = scrollProgress > index / total && scrollProgress <= (index + 1) / total;
  const isPast = scrollProgress > (index + 1) / total;
  
  const scale = isPast ? 0.85 : isActive ? 1 : 0.95 - (total - index - 1) * 0.03;
  const translateY = isPast ? -100 : (total - index - 1) * 15;
  const opacity = isPast ? 0 : isActive ? 1 : 0.6;
  const rotateX = isPast ? 10 : 0;

  return (
    <div 
      ref={cardRef}
      className="absolute w-full transition-all duration-500 ease-out"
      style={{ 
        top: `${index * 20}px`,
        transform: `
          translateY(${translateY}px) 
          scale(${scale})
          rotateX(${rotateX}deg)
          perspective(1000px)
        `,
        opacity: opacity,
        zIndex: total - index,
        transformStyle: 'preserve-3d',
      }}
    >
      <Card 
        className="border-border bg-card shadow-2xl backdrop-blur-sm"
        style={{
          boxShadow: isActive 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
            : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent className="p-8">
          <div className="mb-4 w-14 h-14 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center shadow-lg">
            <value.icon className="text-accent-foreground" size={28} />
          </div>
          <h3 className="text-2xl font-display font-semibold mb-3 text-foreground">
            {value.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {value.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};


const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque projet, avec une attention méticuleuse aux détails.",
    },
    {
      icon: Heart,
      title: "Engagement",
      description: "Un accompagnement personnalisé et une implication totale pour votre réussite.",
    },
    {
      icon: Globe,
      title: "Vision globale",
      description: "Une approche stratégique qui intègre tous les aspects de votre communication.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Des solutions créatives et avant-gardistes pour vous démarquer.",
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutHeroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-light/80" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in-up text-primary-foreground">
              À propos de <span className="text-accent">SIFEC</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Experts en intelligence communicationnelle depuis plus de 15 ans
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">
              Notre <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Histoire</span>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Fondée en 2008, SIFEC est née d'une vision claire : révolutionner la manière dont les institutions et les personnalités publiques communiquent dans un monde en constante évolution.
              </p>
              <p>
                Notre équipe d'experts combine une compréhension approfondie des enjeux médiatiques contemporains avec une maîtrise des stratégies de communication les plus innovantes. Nous accompagnons nos clients dans la construction et la préservation de leur réputation, en anticipant les défis et en saisissant les opportunités.
              </p>
              <p>
                Aujourd'hui, SIFEC est reconnue comme l'une des agences de référence en matière d'intelligence communicationnelle, avec un portefeuille de clients prestigieux et des réalisations qui ont marqué le paysage médiatique français et international.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Nos <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Valeurs</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
            {/* Team Image */}
            <div className="relative h-[700px] rounded-2xl overflow-hidden shadow-2xl sticky top-24">
              <img 
                src={teamPhoto} 
                alt="L'équipe SIFEC" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            {/* Stacked Values Cards */}
            <div className="relative" style={{ minHeight: '1800px' }}>
              <div className="sticky top-24 h-[500px]">
                <div className="relative w-full h-full">
                  {values.map((value, index) => (
                    <ValueCard key={index} value={value} index={index} total={values.length} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Notre <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Équipe</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des professionnels passionnés et expérimentés à votre service
            </p>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Notre équipe pluridisciplinaire réunit des experts issus du journalisme, de la communication politique, du marketing digital et des relations publiques. Ensemble, nous mettons notre expertise au service de votre réussite, avec une approche personnalisée qui fait notre signature.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
