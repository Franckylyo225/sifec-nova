import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import blogHeroImage from "@/assets/blog-hero.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Tous les articles");

  const categories = [
    "Tous les articles",
    "Stratégie",
    "Gestion de crise",
    "Digital",
    "Relations publiques",
    "Leadership",
    "Tendances"
  ];

  const articles = [
    {
      slug: "nouvelles-tendances-communication-2024",
      category: "Stratégie",
      title: "Les nouvelles tendances de la communication institutionnelle en 2024",
      excerpt: "Découvrez comment les institutions publiques adaptent leur communication à l'ère du digital et des réseaux sociaux.",
      date: "15 Mars 2024",
      readTime: "8 min",
      author: "Marie Kouassi",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      featured: true,
    },
    {
      slug: "gerer-crise-reputation",
      category: "Gestion de crise",
      title: "Anticiper et gérer une crise de réputation : guide pratique",
      excerpt: "Les étapes essentielles pour protéger votre image en situation de crise et en sortir renforcé.",
      date: "10 Mars 2024",
      readTime: "12 min",
      author: "Jean-Marc Touré",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      featured: true,
    },
    {
      slug: "art-storytelling-personnalites-publiques",
      category: "Digital",
      title: "L'art du storytelling pour les personnalités publiques",
      excerpt: "Comment construire un récit authentique et engageant qui résonne avec votre audience.",
      date: "5 Mars 2024",
      readTime: "10 min",
      author: "Sophie N'Guessan",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    },
    {
      slug: "relations-medias-cles-succes",
      category: "Relations publiques",
      title: "Optimiser ses relations avec les médias : les clés du succès",
      excerpt: "Techniques éprouvées pour développer et maintenir des relations médiatiques durables et fructueuses.",
      date: "28 Février 2024",
      readTime: "7 min",
      author: "Alain Bamba",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    },
    {
      slug: "personal-branding-leader-opinion",
      category: "Leadership",
      title: "Personal branding : devenir un leader d'opinion reconnu",
      excerpt: "Les étapes pour construire et affirmer votre expertise dans votre domaine d'activité.",
      date: "22 Février 2024",
      readTime: "9 min",
      author: "Fatou Diallo",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    },
    {
      slug: "intelligence-artificielle-communication",
      category: "Tendances",
      title: "Intelligence artificielle et communication : opportunités et défis",
      excerpt: "Comment l'IA transforme les métiers de la communication et quelles sont les bonnes pratiques à adopter.",
      date: "18 Février 2024",
      readTime: "11 min",
      author: "Patrick Koné",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    },
  ];

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  const filteredArticles = selectedCategory === "Tous les articles"
    ? regularArticles
    : regularArticles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${blogHeroImage})` }}
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in-up text-primary-foreground">
              Notre <span className="text-accent">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Insights, tendances et conseils d'experts en communication
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {featuredArticles.map((article, index) => (
              <Card
                key={index}
                onClick={() => navigate(`/blog/${article.slug}`)}
                className="relative overflow-hidden rounded-3xl border-none shadow-xl group cursor-pointer h-[400px] hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <CardContent className="relative h-full p-8 flex flex-col justify-end text-white">
                  <Badge className="w-fit mb-4 bg-primary text-primary-foreground border-none">
                    {article.category}
                  </Badge>
                  <h2 className="text-3xl font-display font-bold mb-3 group-hover:text-accent transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-white/90 mb-4 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-white/80">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <User size={16} />
                      </div>
                      <span>{article.author} • {article.date}</span>
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles Section */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Title and Filters */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                Tous les articles
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-6 transition-all ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <Card
                  key={index}
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="overflow-hidden border-border bg-card group cursor-pointer hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${article.image})` }}
                  />
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {article.category}
                    </Badge>
                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <User size={12} className="text-primary" />
                        </div>
                        <span>{article.author}</span>
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
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
