import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Target,
  Users,
  Shield,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Globe,
  BookOpen,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const Expertise = () => {
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
      icon: Sparkles,
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
      title: "Conseil en image & personal branding",
      description: "Développement de votre marque personnelle et coaching média.",
      features: [
        "Audit d'image",
        "Media training",
        "Prise de parole publique",
        "Personal branding",
      ],
    },
    {
      icon: TrendingUp,
      title: "Influence & leadership d'opinion",
      description: "Positionnement en tant que leader d'opinion dans votre secteur.",
      features: [
        "Stratégie d'influence",
        "Publication d'articles",
        "Interventions médias",
        "Thought leadership",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">
              Notre <span className="text-accent">Expertise</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Des compétences pointues pour répondre à tous vos besoins en communication
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {expertiseAreas.map((area, index) => (
              <Card
                key={index}
                className="hover-lift border-border bg-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="mb-6 w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <area.icon className="text-primary-foreground" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {area.description}
                  </p>
                  <ul className="space-y-2">
                    {area.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Notre <span className="text-gradient-accent">Approche</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                <h3 className="text-xl font-serif font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Prêt à développer votre communication ?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
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
