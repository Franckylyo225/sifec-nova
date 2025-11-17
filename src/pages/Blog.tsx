import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const articles = [
    {
      category: "Stratégie",
      title: "Les nouvelles tendances de la communication institutionnelle en 2024",
      excerpt: "Découvrez comment les institutions publiques adaptent leur communication à l'ère du digital et des réseaux sociaux.",
      date: "15 Mars 2024",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },
    {
      category: "Gestion de crise",
      title: "Anticiper et gérer une crise de réputation : guide pratique",
      excerpt: "Les étapes essentielles pour protéger votre image en situation de crise et en sortir renforcé.",
      date: "10 Mars 2024",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    },
    {
      category: "Digital",
      title: "L'art du storytelling pour les personnalités publiques",
      excerpt: "Comment construire un récit authentique et engageant qui résonne avec votre audience.",
      date: "5 Mars 2024",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    },
    {
      category: "Relations publiques",
      title: "Optimiser ses relations avec les médias : les clés du succès",
      excerpt: "Techniques éprouvées pour développer et maintenir des relations médiatiques durables et fructueuses.",
      date: "28 Février 2024",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    },
    {
      category: "Leadership",
      title: "Personal branding : devenir un leader d'opinion reconnu",
      excerpt: "Les étapes pour construire et affirmer votre expertise dans votre domaine d'activité.",
      date: "22 Février 2024",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    },
    {
      category: "Tendances",
      title: "Intelligence artificielle et communication : opportunités et défis",
      excerpt: "Comment l'IA transforme les métiers de la communication et quelles sont les bonnes pratiques à adopter.",
      date: "18 Février 2024",
      readTime: "11 min",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">
              Notre <span className="text-accent">Blog</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Insights, tendances et conseils d'experts en communication
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <Card className="max-w-5xl mx-auto overflow-hidden hover-lift border-border">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div 
                className="h-64 md:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url(${articles[0].image})` }}
              />
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4" variant="secondary">
                  Article à la une
                </Badge>
                <h2 className="text-3xl font-serif font-bold mb-4 hover:text-primary transition-colors cursor-pointer">
                  {articles[0].title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {articles[0].excerpt}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <Calendar size={16} className="mr-2" />
                  <span className="mr-4">{articles[0].date}</span>
                  <Clock size={16} className="mr-2" />
                  <span>{articles[0].readTime}</span>
                </div>
                <Button className="w-fit bg-accent hover:bg-accent-light text-accent-foreground">
                  Lire l'article
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article, index) => (
              <Card
                key={index}
                className="hover-lift border-border bg-card overflow-hidden group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3 text-xs">
                    {article.category}
                  </Badge>
                  <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar size={14} className="mr-2" />
                    <span className="mr-4">{article.date}</span>
                    <Clock size={14} className="mr-2" />
                    <span>{article.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Restez informé
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Recevez nos derniers articles et insights directement dans votre boîte mail
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-6 py-3 rounded-lg text-foreground bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button className="bg-accent hover:bg-accent-light text-accent-foreground px-8">
                S'abonner
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
