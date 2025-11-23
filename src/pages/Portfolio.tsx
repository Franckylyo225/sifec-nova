import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Briefcase, ArrowUpRight, Calendar, X } from "lucide-react";
import portfolioHeroImage from "@/assets/portfolio-hero.jpg";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCountUp } from "@/hooks/useCountUp";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const yearsCount = useCountUp({ end: 4 });
  const clientsCount = useCountUp({ end: 15 });
  const projectsCount = useCountUp({ end: 70 });
  const satisfactionCount = useCountUp({ end: 98 });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('archived', false)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setIsLoading(false);
  };

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('institutionnel')) return Building2;
    if (category.toLowerCase().includes('brand') || category.toLowerCase().includes('personal')) return User;
    return Briefcase;
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${portfolioHeroImage})` }}
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in-up text-primary-foreground">
              Notre <span className="text-accent">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Des projets d'exception pour des clients prestigieux
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-display font-bold text-primary mb-2">
                {yearsCount.count}+
              </div>
              <div className="text-muted-foreground">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-display font-bold text-primary mb-2">
                {clientsCount.count}+
              </div>
              <div className="text-muted-foreground">Clients accompagnés</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-display font-bold text-primary mb-2">
                {projectsCount.count}+
              </div>
              <div className="text-muted-foreground">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-display font-bold text-primary mb-2">
                {satisfactionCount.count}%
              </div>
              <div className="text-muted-foreground">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
            Nos <span className="text-primary">Réalisations</span>
          </h2>

          {isLoading ? (
            <div className="text-center py-12">Chargement...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {projects.map((project, index) => {
                const Icon = getCategoryIcon(project.category);
                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative h-[450px] rounded-2xl overflow-hidden shadow-xl hover-lift cursor-pointer"
                    style={{
                      backgroundImage: `url(${project.main_image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      animationDelay: `${index * 0.1}s`,
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
                      <p className="text-white/80 font-light leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-medium">Voir le projet</span>
                        <ArrowUpRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Dialog */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-display font-bold mb-2">
                  {selectedProject.title}
                </DialogTitle>
                <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} />
                    <span>{selectedProject.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{selectedProject.completion_date}</span>
                  </div>
                  <Badge variant="secondary">{selectedProject.category}</Badge>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Images */}
                <div className="grid grid-cols-1 gap-4">
                  <img
                    src={selectedProject.main_image_url}
                    alt={selectedProject.title}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  {selectedProject.secondary_image_url && (
                    <img
                      src={selectedProject.secondary_image_url}
                      alt={`${selectedProject.title} - 2`}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-display font-bold mb-3">Description</h3>
                  <p className="text-foreground leading-relaxed">{selectedProject.description}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portfolio;
