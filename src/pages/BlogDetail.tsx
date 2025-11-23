import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from an API or CMS
  const articles = [
    {
      slug: "nouvelles-tendances-communication-2024",
      category: "Stratégie",
      title: "Les nouvelles tendances de la communication institutionnelle en 2024",
      excerpt: "Découvrez comment les institutions publiques adaptent leur communication à l'ère du digital et des réseaux sociaux.",
      date: "15 Mars 2024",
      readTime: "8 min",
      author: "Marie Kouassi",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      content: `
        <p>Dans un monde en constante évolution, la communication institutionnelle doit s'adapter aux nouvelles réalités du digital. Les institutions publiques et privées sont confrontées à des défis sans précédent en matière de transparence, d'engagement et d'authenticité.</p>

        <h2>L'importance de la transformation digitale</h2>
        <p>La transformation digitale n'est plus une option, mais une nécessité pour toute institution souhaitant rester pertinente dans le paysage communicationnel actuel. Les réseaux sociaux, les plateformes de streaming et les nouvelles technologies offrent des opportunités inédites pour engager avec les publics.</p>

        <h2>Les piliers d'une communication institutionnelle moderne</h2>
        <p>Pour réussir dans cet environnement complexe, plusieurs éléments clés doivent être pris en compte :</p>
        <ul>
          <li><strong>Authenticité</strong> : Les institutions doivent communiquer de manière authentique et transparente</li>
          <li><strong>Engagement</strong> : Créer des conversations bidirectionnelles avec les audiences</li>
          <li><strong>Cohérence</strong> : Maintenir une voix cohérente sur tous les canaux</li>
          <li><strong>Innovation</strong> : Adopter de nouvelles technologies et formats de contenu</li>
        </ul>

        <h2>Les tendances émergentes</h2>
        <p>Plusieurs tendances se dessinent pour l'année 2024 et au-delà. Le storytelling visuel prend une place prépondérante, avec l'utilisation croissante de vidéos courtes, d'infographies dynamiques et de contenus interactifs.</p>

        <p>L'intelligence artificielle commence également à jouer un rôle important dans la personnalisation des messages et l'analyse des données d'engagement. Les institutions les plus avancées utilisent déjà des outils d'IA pour optimiser leurs campagnes et mieux comprendre leurs audiences.</p>

        <h2>Conclusion</h2>
        <p>La communication institutionnelle en 2024 nécessite une approche holistique qui combine tradition et innovation. Les institutions qui réussiront seront celles qui sauront s'adapter rapidement tout en restant fidèles à leurs valeurs fondamentales.</p>
      `
    },
    {
      slug: "gerer-crise-reputation",
      category: "Gestion de crise",
      title: "Anticiper et gérer une crise de réputation : guide pratique",
      excerpt: "Les étapes essentielles pour protéger votre image en situation de crise et en sortir renforcé.",
      date: "10 Mars 2024",
      readTime: "12 min",
      author: "Jean-Marc Touré",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
      content: `
        <p>Une crise de réputation peut survenir à tout moment et avoir des conséquences dévastatrices sur une organisation. La clé du succès réside dans la préparation et la rapidité de réaction.</p>

        <h2>Anticipation : La meilleure défense</h2>
        <p>La préparation en amont est cruciale. Développer un plan de gestion de crise, former les équipes et établir des protocoles clairs permet de réagir efficacement lorsque la crise survient.</p>

        <h2>Les phases de gestion de crise</h2>
        <p>Une gestion de crise efficace suit plusieurs phases distinctes :</p>
        <ol>
          <li><strong>Détection précoce</strong> : Surveiller les signaux faibles</li>
          <li><strong>Évaluation</strong> : Mesurer l'ampleur et l'impact potentiel</li>
          <li><strong>Réponse</strong> : Communiquer rapidement et de manière appropriée</li>
          <li><strong>Résolution</strong> : Mettre en place des actions correctives</li>
          <li><strong>Apprentissage</strong> : Tirer les leçons pour l'avenir</li>
        </ol>

        <h2>Communication en situation de crise</h2>
        <p>La communication est l'élément central de toute gestion de crise. Elle doit être rapide, transparente et empathique. Le silence ou la dissimulation ne font qu'aggraver la situation.</p>

        <p>Il est essentiel de désigner un porte-parole officiel, de préparer des messages clés et de maintenir une communication cohérente sur tous les canaux.</p>

        <h2>Sortir renforcé de la crise</h2>
        <p>Une crise bien gérée peut paradoxalement renforcer la réputation d'une organisation. En démontrant sa capacité à gérer des situations difficiles avec professionnalisme et transparence, une institution peut gagner en crédibilité et en confiance.</p>
      `
    },
    {
      slug: "art-storytelling-personnalites-publiques",
      category: "Digital",
      title: "L'art du storytelling pour les personnalités publiques",
      excerpt: "Comment construire un récit authentique et engageant qui résonne avec votre audience.",
      date: "5 Mars 2024",
      readTime: "10 min",
      author: "Sophie N'Guessan",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
      content: `
        <p>Le storytelling est devenu un outil indispensable pour les personnalités publiques souhaitant créer une connexion authentique avec leur audience. Dans un monde saturé d'information, seules les histoires vraies et engageantes parviennent à captiver l'attention.</p>

        <h2>Les fondamentaux du storytelling personnel</h2>
        <p>Un bon récit personnel repose sur plusieurs éléments essentiels : l'authenticité, la cohérence et l'émotion. Il ne s'agit pas de créer une fiction, mais de mettre en lumière les aspects de votre parcours qui résonnent avec votre audience.</p>

        <h2>Structurer votre récit</h2>
        <p>Tout bon récit suit une structure narrative claire :</p>
        <ul>
          <li><strong>Le point de départ</strong> : Où vous étiez au début</li>
          <li><strong>Le défi</strong> : Les obstacles que vous avez rencontrés</li>
          <li><strong>La transformation</strong> : Comment vous avez évolué</li>
          <li><strong>Le message</strong> : Ce que votre audience peut en retirer</li>
        </ul>

        <h2>Choisir les bons canaux</h2>
        <p>Différentes plateformes permettent de raconter votre histoire de manières différentes. Instagram favorise le visuel, LinkedIn le professionnel, Twitter la concision. Adaptez votre récit à chaque canal tout en maintenant une cohérence globale.</p>

        <h2>Créer de l'engagement</h2>
        <p>Un storytelling efficace ne se contente pas d'informer, il crée de l'engagement. Posez des questions, encouragez les commentaires, partagez des moments vulnérables qui humanisent votre image publique.</p>

        <h2>Conclusion</h2>
        <p>Le storytelling est un art qui se perfectionne avec le temps. Soyez patient, restez authentique et n'ayez pas peur de montrer votre humanité. C'est ainsi que vous construirez une connexion durable avec votre audience.</p>
      `
    }
  ];

  const article = articles.find(a => a.slug === slug) || articles[0];

  const categories = ["Tous les articles", "Stratégie", "Gestion de crise", "Digital", "Relations publiques", "Leadership", "Tendances"];

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
              style={{ backgroundImage: `url(${article.image})` }}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.filter(a => a.slug !== slug).slice(0, 3).map((relatedArticle, index) => (
                <Card
                  key={index}
                  onClick={() => navigate(`/blog/${relatedArticle.slug}`)}
                  className="overflow-hidden border-border cursor-pointer hover-lift group"
                >
                  <div
                    className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${relatedArticle.image})` }}
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
