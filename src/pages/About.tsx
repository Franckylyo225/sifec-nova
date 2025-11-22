import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Globe, Zap } from "lucide-react";
import aboutHeroImage from "@/assets/about-hero.jpg";
import teamPhoto from "@/assets/team-photo.jpg";


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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
            {/* Team Image */}
            <div className="relative h-[700px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={teamPhoto} 
                alt="L'équipe SIFEC" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            {/* Values Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center">
                      <value.icon className="text-accent-foreground" size={24} />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
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
