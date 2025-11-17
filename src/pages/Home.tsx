import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Users, Lightbulb, Shield, Sparkles, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Home = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      icon: Target,
      title: "Stratégie de communication",
      description: "Développement de stratégies sur mesure pour amplifier votre message et atteindre vos objectifs.",
    },
    {
      icon: Users,
      title: "Relations publiques",
      description: "Gestion de votre image auprès des médias, influenceurs et parties prenantes clés.",
    },
    {
      icon: Shield,
      title: "Gestion de crise",
      description: "Anticipation et gestion proactive des situations sensibles pour protéger votre réputation.",
    },
    {
      icon: Sparkles,
      title: "Médias sociaux",
      description: "Stratégie digitale et gestion de votre présence sur les plateformes sociales.",
    },
    {
      icon: Lightbulb,
      title: "Conseil en image",
      description: "Optimisation de votre image publique et coaching média personnalisé.",
    },
    {
      icon: TrendingUp,
      title: "Influence & Notoriété",
      description: "Développement de votre leadership d'opinion et de votre visibilité sectorielle.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 animate-parallax"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -2,
          }}
        />
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "var(--gradient-overlay)",
            zIndex: -1 
          }} 
        />

        {/* Hero Content */}
        <div className="container mx-auto px-6 text-center z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 animate-fade-in-up text-primary-foreground">
            Intelligence
            <span className="block text-gradient-accent mt-2">Communicationnelle</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto animate-fade-in-up text-primary-foreground/90" style={{ animationDelay: "0.2s" }}>
            Agence de communication premium dédiée aux clients institutionnels et personnalités publiques
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent-light text-accent-foreground text-lg px-8">
                Découvrir nos services
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8">
                Nos réalisations
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary-foreground rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Notre <span className="text-gradient-accent">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des solutions sur mesure pour répondre aux enjeux de communication les plus complexes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover-lift border-border bg-card group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="mb-4 w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="text-primary-foreground" size={28} />
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary-light text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Prêt à transformer votre communication ?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90">
            Discutons de vos objectifs et construisons ensemble une stratégie gagnante
          </p>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8">
              Prendre contact
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
