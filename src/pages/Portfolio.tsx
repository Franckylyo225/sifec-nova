import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Briefcase } from "lucide-react";
import portfolioHeroImage from "@/assets/portfolio-hero.jpg";

const Portfolio = () => {
  const projects = [
    {
      category: "Institutionnel",
      icon: Building2,
      title: "Ministère de la Culture",
      description: "Stratégie de communication pour le lancement d'une nouvelle politique culturelle nationale.",
      tags: ["Stratégie", "Relations presse", "Digital"],
      results: "+150% de visibilité médiatique",
    },
    {
      category: "Personnalité publique",
      icon: User,
      title: "PDG Fortune 500",
      description: "Personal branding et gestion de crise pour un dirigeant multinational.",
      tags: ["Personal branding", "Gestion de crise", "Media training"],
      results: "Réputation restaurée en 3 mois",
    },
    {
      category: "Corporate",
      icon: Briefcase,
      title: "Groupe CAC 40",
      description: "Accompagnement communication lors d'une fusion-acquisition majeure.",
      tags: ["Communication financière", "Relations investisseurs", "Change management"],
      results: "Opération menée sans incident",
    },
    {
      category: "Institutionnel",
      icon: Building2,
      title: "Organisation internationale",
      description: "Campagne de communication pour une initiative environnementale mondiale.",
      tags: ["Campagne globale", "Relations publiques", "Influence"],
      results: "20M+ de personnes touchées",
    },
    {
      category: "Personnalité publique",
      icon: User,
      title: "Ministre en exercice",
      description: "Conseil en communication et media training pour optimiser les interventions médiatiques.",
      tags: ["Media training", "Conseil stratégique", "Veille"],
      results: "95% d'opinions positives",
    },
    {
      category: "Corporate",
      icon: Briefcase,
      title: "Scale-up Tech",
      description: "Positionnement et stratégie d'influence pour une licorne française.",
      tags: ["Thought leadership", "Relations médias", "Events"],
      results: "Top 3 des scale-ups visibles",
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${portfolioHeroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-light/80" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in-up text-primary-foreground">
              Notre <span className="text-accent">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Des réalisations qui parlent d'elles-mêmes
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "15+", label: "Années d'expérience" },
              { number: "200+", label: "Clients accompagnés" },
              { number: "500+", label: "Projets réalisés" },
              { number: "98%", label: "Taux de satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="hover-lift border-border bg-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <project.icon className="text-primary-foreground" size={24} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-accent">
                      {project.results}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-6xl text-accent mb-4">"</div>
              <p className="text-2xl font-serif text-foreground leading-relaxed mb-8">
                SIFEC a transformé notre communication institutionnelle. Leur expertise et leur professionnalisme sont sans égal. Une équipe réactive, stratégique et profondément engagée dans notre réussite.
              </p>
              <div className="text-muted-foreground">
                <p className="font-semibold text-foreground">Marie Dubois</p>
                <p className="text-sm">Directrice de la Communication, Ministère</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
