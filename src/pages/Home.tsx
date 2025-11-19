import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Users, Lightbulb, Shield, Sparkles, TrendingUp, ArrowUpRight, Award, Briefcase, TrendingUp as TrendingUpIcon, Star } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { useCountUp } from "@/hooks/useCountUp";
import VideoCarousel from "@/components/VideoCarousel";
import ministereCultureImg from "@/assets/portfolio/ministere-culture-main.jpg";
import ceoFortuneImg from "@/assets/portfolio/ceo-fortune500-main.jpg";
import groupeCac40Img from "@/assets/portfolio/groupe-cac40-main.jpg";

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

  const clients = [
    { name: "Client 1", abbr: "C1" },
    { name: "Client 2", abbr: "C2" },
    { name: "Client 3", abbr: "C3" },
    { name: "Client 4", abbr: "C4" },
    { name: "Client 5", abbr: "C5" },
    { name: "Client 6", abbr: "C6" },
  ];

  const projects = [
    {
      title: "Ministère de la Culture",
      category: "Institutionnel",
      description: "Stratégie de communication pour le lancement d'une nouvelle politique culturelle nationale",
      image: ministereCultureImg,
    },
    {
      title: "PDG Fortune 500",
      category: "Personnalité publique",
      description: "Personal branding et gestion de crise pour un dirigeant multinational",
      image: ceoFortuneImg,
    },
    {
      title: "Groupe CAC 40",
      category: "Corporate",
      description: "Accompagnement communication lors d'une fusion-acquisition majeure",
      image: groupeCac40Img,
    },
  ];

  const insights = [
    {
      category: "Tendances",
      title: "L'IA transforme la communication politique",
      date: "15 Nov 2025",
      readTime: "5 min",
    },
    {
      category: "Analyse",
      title: "Nouvelles stratégies de gestion de crise",
      date: "10 Nov 2025",
      readTime: "7 min",
    },
    {
      category: "Guide",
      title: "Optimiser sa présence sur les réseaux sociaux",
      date: "05 Nov 2025",
      readTime: "4 min",
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
        <div className="container mx-auto px-8 text-center z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 animate-fade-in-up text-primary-foreground tracking-tight leading-tight">
            <span className="text-gradient-accent">SIFEC</span> — L'expertise qui donne du <span className="text-accent">pouvoir à votre image</span>.
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto animate-fade-in-up text-primary-foreground/90 font-light" style={{ animationDelay: "0.2s" }}>
            Votre partenaire stratégique pour une communication institutionnelle forte, cohérente et performante.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-10 py-7 rounded-full font-medium">
                Découvrir nos services
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="border-2 border-primary-foreground/30 bg-primary-foreground/5 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/10 text-base px-10 py-7 rounded-full font-medium">
                Nos réalisations
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-primary-foreground/60 text-sm font-medium tracking-wide">Scroll</span>
          <div className="w-1 h-8 bg-primary-foreground/30 rounded-full relative overflow-hidden">
            <div className="w-1 h-2 bg-primary-foreground rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Section avec effets Samsung */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight">
              Notre <span className="text-gradient-accent">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Des solutions sur mesure pour répondre aux enjeux de communication les plus complexes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group relative border-border/50 bg-card hover:bg-card/80 transition-all duration-500 overflow-hidden cursor-pointer rounded-3xl"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="p-10 relative z-10">
                  <div className="mb-6 w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <service.icon className="text-primary" size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors duration-300 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">En savoir plus</span>
                    <ArrowUpRight size={16} className="ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notre travail */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 tracking-tight">
                Notre Travail
              </h2>
              <p className="text-xl text-muted-foreground font-light">
                Découvrez nos projets récents et leur impact
              </p>
            </div>
            <Link to="/portfolio">
              <Button variant="ghost" className="group rounded-full">
                Voir tout
                <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
                style={{
                  aspectRatio: "4/5",
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 group-hover:to-black/90 transition-all duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="mb-4">
                    <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 border border-white/20">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/80 font-light leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Voir le projet</span>
                    <ArrowUpRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos dernières réalisations vidéo */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 tracking-tight">
              Nos Dernières Réalisations
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Découvrez nos projets vidéo récents
            </p>
          </div>

          <VideoCarousel />
        </div>
      </section>

      {/* Section chiffres clés */}
      <section className="py-32 bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight">
              Nos Résultats en Chiffres
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto font-light">
              Des années d'excellence au service de vos ambitions
            </p>
          </div>

          <StatsGrid />
        </div>
      </section>

      {/* Références clients */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Ils nous font confiance</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
              Nos Références
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-8 bg-background rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="text-4xl font-display font-bold text-muted-foreground/30 group-hover:text-primary/60 transition-colors duration-300">
                  {client.abbr}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Insights */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 tracking-tight">
                News & Insights
              </h2>
              <p className="text-xl text-muted-foreground font-light">
                Nos dernières analyses et perspectives
              </p>
            </div>
            <Link to="/blog">
              <Button variant="ghost" className="group rounded-full">
                Voir tous les articles
                <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <Card
                key={index}
                className="group border-border/50 bg-background hover:shadow-xl transition-all duration-500 cursor-pointer rounded-3xl overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {insight.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {insight.readTime} lecture
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold mb-4 group-hover:text-primary transition-colors duration-300 tracking-tight leading-tight">
                    {insight.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-sm text-muted-foreground">{insight.date}</span>
                    <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">Lire</span>
                      <ArrowUpRight size={16} className="ml-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary to-primary-light text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        
        <div className="container mx-auto px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 tracking-tight">
            Prêt à transformer votre communication ?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-primary-foreground/90 font-light">
            Discutons de vos objectifs et construisons ensemble une stratégie gagnante
          </p>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-2 border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground hover:text-primary text-base px-10 py-7 rounded-full font-medium">
              Prendre contact
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const StatsGrid = () => {
  const stats = [
    {
      icon: Award,
      end: 15,
      suffix: "+",
      label: "Années d'expérience",
    },
    {
      icon: Users,
      end: 200,
      suffix: "+",
      label: "Clients accompagnés",
    },
    {
      icon: Briefcase,
      end: 500,
      suffix: "+",
      label: "Projets réalisés",
    },
    {
      icon: Star,
      end: 98,
      suffix: "%",
      label: "Taux de satisfaction",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} index={index} />
      ))}
    </div>
  );
};

const StatCard = ({ icon: Icon, end, suffix, label, index }: { icon: any; end: number; suffix: string; label: string; index: number }) => {
  const { count, ref } = useCountUp({ end, duration: 2500 });

  return (
    <div
      ref={ref}
      className="text-center p-8 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-500 group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 group-hover:scale-110 transition-transform duration-500">
        <Icon className="text-primary-foreground" size={32} strokeWidth={1.5} />
      </div>
      <div className="text-6xl font-display font-bold mb-3 tracking-tight">
        {count}{suffix}
      </div>
      <p className="text-lg text-primary-foreground/80 font-light">{label}</p>
    </div>
  );
};

export default Home;

