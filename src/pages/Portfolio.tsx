import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Briefcase, ArrowUpRight, Calendar, X } from "lucide-react";
import portfolioHeroImage from "@/assets/portfolio-hero.jpg";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import ministereCultureMain from "@/assets/portfolio/ministere-culture-main.jpg";
import ministereCultureSecondary from "@/assets/portfolio/ministere-culture-secondary.jpg";
import ceoFortuneMain from "@/assets/portfolio/ceo-fortune500-main.jpg";
import ceoFortuneSecondary from "@/assets/portfolio/ceo-fortune500-secondary.jpg";
import groupeCac40Main from "@/assets/portfolio/groupe-cac40-main.jpg";
import groupeCac40Secondary from "@/assets/portfolio/groupe-cac40-secondary.jpg";
import organisationInterMain from "@/assets/portfolio/organisation-internationale-main.jpg";
import organisationInterSecondary from "@/assets/portfolio/organisation-internationale-secondary.jpg";
import ministreExerciceMain from "@/assets/portfolio/ministre-exercice-main.jpg";
import ministreExerciceSecondary from "@/assets/portfolio/ministre-exercice-secondary.jpg";
import scaleupTechMain from "@/assets/portfolio/scaleup-tech-main.jpg";
import scaleupTechSecondary from "@/assets/portfolio/scaleup-tech-secondary.jpg";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      category: "Institutionnel",
      icon: Building2,
      title: "Ministère de la Culture",
      description: "Stratégie de communication pour le lancement d'une nouvelle politique culturelle nationale.",
      shortDescription: "Stratégie de communication pour le lancement d'une nouvelle politique culturelle nationale.",
      tags: ["Stratégie", "Relations presse", "Digital"],
      results: "+150% de visibilité médiatique",
      client: "Ministère de la Culture",
      date: "Janvier 2024",
      image: ministereCultureMain,
      detailedDescription: "Accompagnement stratégique complet pour le lancement d'une nouvelle politique culturelle nationale. Déploiement d'une campagne multicanale incluant relations presse, digital et événementiel. Création d'une narrative forte et mobilisatrice auprès des acteurs culturels et du grand public.",
      images: [
        ministereCultureMain,
        ministereCultureSecondary,
      ],
    },
    {
      category: "Personnalité publique",
      icon: User,
      title: "PDG Fortune 500",
      description: "Personal branding et gestion de crise pour un dirigeant multinational.",
      shortDescription: "Personal branding et gestion de crise pour un dirigeant multinational.",
      tags: ["Personal branding", "Gestion de crise", "Media training"],
      results: "Réputation restaurée en 3 mois",
      client: "Groupe multinational",
      date: "Mars 2024",
      image: ceoFortuneMain,
      detailedDescription: "Gestion de crise et reconstruction d'image pour un PDG de groupe Fortune 500. Media training intensif, stratégie de prise de parole et repositionnement stratégique. Accompagnement quotidien pendant 3 mois avec résultats mesurables et durables.",
      images: [
        ceoFortuneMain,
        ceoFortuneSecondary,
      ],
    },
    {
      category: "Corporate",
      icon: Briefcase,
      title: "Groupe CAC 40",
      description: "Accompagnement communication lors d'une fusion-acquisition majeure.",
      shortDescription: "Accompagnement communication lors d'une fusion-acquisition majeure.",
      tags: ["Communication financière", "Relations investisseurs", "Change management"],
      results: "Opération menée sans incident",
      client: "Groupe CAC 40",
      date: "Juin 2024",
      image: groupeCac40Main,
      detailedDescription: "Stratégie de communication globale pour accompagner une fusion-acquisition majeure. Gestion des communications internes et externes, relations investisseurs, et conduite du changement. Coordination de tous les stakeholders avec succès.",
      images: [
        groupeCac40Main,
        groupeCac40Secondary,
      ],
    },
    {
      category: "Institutionnel",
      icon: Building2,
      title: "Organisation internationale",
      description: "Campagne de communication pour une initiative environnementale mondiale.",
      shortDescription: "Campagne de communication pour une initiative environnementale mondiale.",
      tags: ["Campagne globale", "Relations publiques", "Influence"],
      results: "20M+ de personnes touchées",
      client: "Organisation internationale",
      date: "Septembre 2024",
      image: organisationInterMain,
      detailedDescription: "Campagne de communication mondiale pour une initiative environnementale majeure. Stratégie multi-pays, coordination avec les médias internationaux, création de contenus impactants. Résultats dépassant les objectifs initiaux avec plus de 20 millions de personnes touchées.",
      images: [
        organisationInterMain,
        organisationInterSecondary,
      ],
    },
    {
      category: "Personnalité publique",
      icon: User,
      title: "Ministre en exercice",
      description: "Conseil en communication et media training pour optimiser les interventions médiatiques.",
      shortDescription: "Conseil en communication et media training pour optimiser les interventions médiatiques.",
      tags: ["Media training", "Conseil stratégique", "Veille"],
      results: "95% d'opinions positives",
      client: "Ministère",
      date: "Octobre 2024",
      image: ministreExerciceMain,
      detailedDescription: "Accompagnement stratégique et media training d'un ministre en exercice. Préparation aux interviews, gestion de la communication de crise, et optimisation de la prise de parole publique. Suivi quotidien de l'opinion et adaptation des messages en temps réel.",
      images: [
        ministreExerciceMain,
        ministreExerciceSecondary,
      ],
    },
    {
      category: "Corporate",
      icon: Briefcase,
      title: "Scale-up Tech",
      description: "Positionnement et stratégie d'influence pour une licorne française.",
      shortDescription: "Positionnement et stratégie d'influence pour une licorne française.",
      tags: ["Thought leadership", "Relations médias", "Events"],
      results: "Top 3 des scale-ups visibles",
      client: "Scale-up technologique",
      date: "Novembre 2024",
      image: scaleupTechMain,
      detailedDescription: "Stratégie de positionnement et d'influence pour une licorne technologique française. Développement du thought leadership, relations médias stratégiques, et organisation d'événements majeurs. Positionnement réussi dans le top 3 des scale-ups les plus visibles de l'écosystème.",
      images: [
        scaleupTechMain,
        scaleupTechSecondary,
      ],
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
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in-up text-primary-foreground">
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
              { number: "4+", label: "Années d'expérience" },
              { number: "15+", label: "Clients accompagnés" },
              { number: "70+", label: "Projets réalisés" },
              { number: "98%", label: "Taux de satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
              Nos Projets
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Des réalisations concrètes et impactantes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(index)}
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
                    {project.shortDescription}
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

      {/* Project Detail Dialog */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-display font-bold mb-2">
                  {projects[selectedProject].title}
                </DialogTitle>
                <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <span>{projects[selectedProject].client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{projects[selectedProject].date}</span>
                  </div>
                  <Badge variant="secondary">{projects[selectedProject].category}</Badge>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Images Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {projects[selectedProject].images.map((image, idx) => (
                    <div
                      key={idx}
                      className="aspect-video rounded-xl overflow-hidden"
                      style={{ 
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ))}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-display font-bold mb-3">Description du projet</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {projects[selectedProject].detailedDescription}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-xl font-display font-bold mb-3">Expertises mobilisées</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="p-6 bg-accent/10 rounded-xl border border-accent/20">
                  <h3 className="text-xl font-display font-bold mb-2 text-accent">Résultats</h3>
                  <p className="text-lg font-semibold">
                    {projects[selectedProject].results}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Testimonial Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-6xl text-accent mb-4">"</div>
              <p className="text-2xl font-display text-foreground leading-relaxed mb-8">
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
