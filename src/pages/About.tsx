import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Globe, Zap } from "lucide-react";

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
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">
              À propos de <span className="text-accent">SIFEC</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Experts en intelligence communicationnelle depuis plus de 15 ans
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-8 text-center">
              Notre <span className="text-gradient-accent">Histoire</span>
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
            <h2 className="text-4xl font-serif font-bold mb-4">
              Nos <span className="text-gradient-accent">Valeurs</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="hover-lift border-border bg-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="mb-4 w-14 h-14 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center">
                    <value.icon className="text-accent-foreground" size={28} />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Notre <span className="text-gradient-accent">Équipe</span>
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
