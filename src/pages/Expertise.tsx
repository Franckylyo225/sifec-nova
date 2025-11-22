import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Target,
  Users,
  Shield,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Megaphone,
  ArrowRight,
  Check,
  ChevronRight,
  Camera,
  Share2,
} from "lucide-react";
import expertiseHeroImage from "@/assets/expertise-hero.jpg";

const Expertise = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const expertiseAreas = [
    {
      icon: Target,
      title: "Stratégie de communication globale",
      description: "Élaboration de stratégies sur mesure alignées avec vos objectifs business et votre vision.",
      features: [
        "Audit de communication",
        "Définition du positionnement",
        "Planification stratégique",
        "Mesure de performance",
      ],
    },
    {
      icon: Users,
      title: "Relations publiques & médias",
      description: "Optimisation de votre visibilité médiatique et gestion de vos relations avec la presse.",
      features: [
        "Relations presse",
        "Organisation d'événements",
        "Gestion des influenceurs",
        "Revue de presse",
      ],
    },
    {
      icon: Camera,
      title: "Production photo & vidéo",
      description: "Création de contenus visuels professionnels pour valoriser votre image et marquer les esprits.",
      features: [
        "Photographie institutionnelle",
        "Vidéos institutionnelles",
        "Captation d'événements",
        "Post-production & montage",
      ],
    },
    {
      icon: Shield,
      title: "Gestion de crise & réputation",
      description: "Protection et restauration de votre image en situation sensible.",
      features: [
        "Cellule de crise",
        "Formation média",
        "Veille réputationnelle",
        "Plan de communication de crise",
      ],
    },
    {
      icon: Share2,
      title: "Communication digitale",
      description: "Stratégie digitale complète pour maximiser votre présence en ligne.",
      features: [
        "Social media management",
        "Content marketing",
        "Community management",
        "SEO & référencement",
      ],
    },
    {
      icon: Lightbulb,
      title: "Conseil en image",
      description: "Développement de votre marque personnelle et coaching média.",
      features: [
        "Audit d'image",
        "Media training",
        "Prise de parole publique",
        "Personal branding",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${expertiseHeroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-light/80" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in-up text-primary-foreground">
              Notre <span className="text-accent">Expertise</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Des compétences pointues pour répondre à tous vos besoins en communication
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Areas - Innovative Interactive Design */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Six domaines d'<span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">excellence</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Cliquez sur chaque expertise pour découvrir nos services en détail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {expertiseAreas.map((area, index) => {
              const isActive = activeIndex === index;
              const IconComponent = area.icon;
              
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-primary shadow-xl' 
                      : 'bg-card border-border hover:border-primary/50 hover:shadow-lg'
                  }`}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Header - Always Visible */}
                  <div className="flex items-center justify-between p-6 md:p-8">
                    <div className="flex items-center gap-4 md:gap-6 flex-1">
                      <div 
                        className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? 'bg-gradient-to-br from-primary to-primary-light scale-110 shadow-lg shadow-primary/30'
                            : 'bg-gradient-to-br from-primary/10 to-primary-light/10 group-hover:scale-105'
                        }`}
                      >
                        <IconComponent 
                          className={`transition-transform duration-500 group-hover:rotate-12 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} 
                          size={28}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`text-xl md:text-2xl font-display font-bold transition-colors duration-300 ${
                          isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                        }`}>
                          {area.title}
                        </h3>
                        <p className={`text-sm md:text-base mt-1 transition-colors duration-300 ${
                          isActive ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {area.description}
                        </p>
                      </div>
                    </div>

                    <ChevronRight 
                      className={`flex-shrink-0 ml-4 transition-all duration-500 ${
                        isActive 
                          ? 'rotate-90 text-primary' 
                          : 'text-muted-foreground group-hover:text-primary group-hover:translate-x-1'
                      }`}
                      size={24}
                    />
                  </div>

                  {/* Expanded Content */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                      <div className="border-t border-border/50 pt-6">
                        <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
                          Services inclus
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {area.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 group/feature"
                              style={{ 
                                animationDelay: `${idx * 0.05}s`,
                                animation: isActive ? 'fadeInUp 0.5s ease-out forwards' : 'none',
                                opacity: isActive ? 1 : 0,
                              }}
                            >
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center group-hover/feature:scale-110 transition-transform duration-300">
                                <Check size={12} className="text-accent-foreground" strokeWidth={3} />
                              </div>
                              <span className="text-sm font-medium text-foreground group-hover/feature:text-primary transition-colors">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative gradient line */}
                  <div 
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary-light transition-all duration-500 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section - Productions Visuelles */}
      <section className="py-24 bg-gradient-to-b from-background via-secondary/30 to-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Nos <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Productions</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez quelques exemples de nos réalisations photo et vidéo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                type: "Photo",
                title: "Portrait institutionnel",
                description: "Shooting pour dirigeant d'entreprise",
                gradient: "from-blue-500/20 to-blue-600/20",
              },
              {
                type: "Vidéo",
                title: "Interview corporate",
                description: "Captation et montage professionnel",
                gradient: "from-purple-500/20 to-purple-600/20",
              },
              {
                type: "Photo",
                title: "Événement d'entreprise",
                description: "Reportage photo complet",
                gradient: "from-red-500/20 to-red-600/20",
              },
              {
                type: "Vidéo",
                title: "Clip institutionnel",
                description: "Production vidéo complète",
                gradient: "from-green-500/20 to-green-600/20",
              },
              {
                type: "Photo",
                title: "Team building",
                description: "Photographie d'équipe",
                gradient: "from-orange-500/20 to-orange-600/20",
              },
              {
                type: "Vidéo",
                title: "Making-of",
                description: "Coulisses de production",
                gradient: "from-teal-500/20 to-teal-600/20",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`relative aspect-video bg-gradient-to-br ${item.gradient} backdrop-blur-sm overflow-hidden`}>
                  {/* Placeholder for actual images/videos */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera 
                      className="text-foreground/20 group-hover:text-foreground/30 transition-colors duration-500 group-hover:scale-110 transform" 
                      size={64}
                    />
                  </div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-semibold text-foreground border border-border/50">
                      {item.type}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/portfolio">
              <Button variant="outline" size="lg" className="group">
                Voir plus de réalisations
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Notre <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Approche</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Une méthodologie éprouvée pour garantir votre succès
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: BookOpen, title: "Analyse", description: "Audit approfondi de votre situation" },
              { icon: Lightbulb, title: "Stratégie", description: "Élaboration d'un plan sur mesure" },
              { icon: Megaphone, title: "Exécution", description: "Mise en œuvre rigoureuse" },
              { icon: TrendingUp, title: "Optimisation", description: "Mesure et ajustements continus" },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 w-16 h-16 mx-auto bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center">
                  <step.icon className="text-accent-foreground" size={28} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Prêt à développer votre communication ?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Parlons de vos besoins et découvrez comment nous pouvons vous accompagner
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent-light text-accent-foreground text-lg px-8">
              Demander un devis
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Expertise;
