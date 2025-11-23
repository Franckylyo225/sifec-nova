import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["Tous les articles", "Stratégie", "Gestion de crise", "Digital", "Relations publiques", "Leadership", "Tendances"];

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('archived', false)
      .maybeSingle();

    if (data) {
      setArticle(data);
      // Fetch related articles
      const { data: related } = await supabase
        .from('articles')
        .select('*')
        .eq('archived', false)
        .neq('id', data.id)
        .limit(3);
      setRelatedArticles(related || []);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <Button onClick={() => navigate('/blog')}>Retour au blog</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-background">
      {/* Category Navigation */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => navigate('/blog')}
                className={`text-foreground hover:text-primary transition-colors ${
                  category === article.category ? 'font-semibold text-primary' : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate('/blog')}
              className="mb-8 -ml-4"
            >
              <ArrowLeft className="mr-2" size={18} />
              Retour aux articles
            </Button>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <span className="font-medium text-foreground">{article.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{article.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div
              className="w-full h-[400px] md:h-[600px] bg-cover bg-center rounded-3xl shadow-2xl"
              style={{ backgroundImage: `url(${article.image_url})` }}
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-ul:text-foreground prose-ul:my-6
                prose-ol:text-foreground prose-ol:my-6
                prose-li:my-2
                prose-strong:text-primary prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Article Footer */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  {article.category}
                </Badge>
                <Button variant="outline" size="sm">
                  <Share2 size={16} className="mr-2" />
                  Partager
                </Button>
              </div>
            </div>

            {/* Author Card */}
            <Card className="mt-12 p-8 bg-secondary/5 border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-foreground">{article.author}</h3>
                  <p className="text-sm text-muted-foreground">Expert en communication</p>
                </div>
              </div>
              <p className="text-foreground leading-relaxed">
                Spécialiste en communication institutionnelle avec plus de 10 ans d'expérience, 
                {article.author} accompagne les organisations dans leur transformation digitale 
                et le développement de leur stratégie de communication.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Articles similaires
            </h2>
            {relatedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle, index) => (
                <Card
                  key={index}
                  onClick={() => navigate(`/blog/${relatedArticle.slug}`)}
                  className="overflow-hidden border-border cursor-pointer hover-lift group"
                >
                  <div
                    className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${relatedArticle.image_url})` }}
                  />
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {relatedArticle.category}
                    </Badge>
                    <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            ) : (
              <div className="text-center text-muted-foreground">Aucun article similaire</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
