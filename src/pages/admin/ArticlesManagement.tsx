import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Archive, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image_url: string;
  read_time: string;
  featured: boolean;
  archived: boolean;
  created_at: string;
}

const ArticlesManagement = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    image_url: '',
    read_time: '',
    featured: false,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les articles',
        variant: 'destructive',
      });
    } else {
      setArticles(data || []);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingArticle) {
      const { error } = await supabase
        .from('articles')
        .update(formData)
        .eq('id', editingArticle.id);

      if (error) {
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Succès',
          description: 'Article modifié avec succès',
        });
        fetchArticles();
        handleCloseDialog();
      }
    } else {
      const { error } = await supabase.from('articles').insert([formData]);

      if (error) {
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Succès',
          description: 'Article créé avec succès',
        });
        fetchArticles();
        handleCloseDialog();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    const { error } = await supabase.from('articles').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Article supprimé avec succès',
      });
      fetchArticles();
    }
  };

  const handleArchive = async (article: Article) => {
    const { error } = await supabase
      .from('articles')
      .update({ archived: !article.archived })
      .eq('id', article.id);

    if (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Succès',
        description: article.archived ? 'Article désarchivé' : 'Article archivé',
      });
      fetchArticles();
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      image_url: article.image_url,
      read_time: article.read_time,
      featured: article.featured,
      meta_title: (article as any).meta_title || '',
      meta_description: (article as any).meta_description || '',
      meta_keywords: (article as any).meta_keywords || '',
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingArticle(null);
    setFormData({
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      category: '',
      author: '',
      image_url: '',
      read_time: '',
      featured: false,
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
    });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold">Gestion des Articles</h1>
            <p className="text-muted-foreground mt-1">
              Créer, modifier et gérer les articles du blog
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingArticle(null)}>
                <Plus className="mr-2" size={18} />
                Nouvel article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display">
                  {editingArticle ? 'Modifier l\'article' : 'Créer un article'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Contenu</TabsTrigger>
                    <TabsTrigger value="details">Détails</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre de l'article*</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          setFormData({ 
                            ...formData, 
                            title,
                            slug: title.toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/(^-|-$)/g, '')
                          });
                        }}
                        placeholder="Entrez le titre de votre article"
                        className="text-lg"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Extrait (pour les aperçus)*</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Un court résumé de votre article (150-200 caractères)"
                        required
                        rows={3}
                        maxLength={200}
                      />
                      <p className="text-xs text-muted-foreground">{formData.excerpt.length}/200 caractères</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Contenu de l'article*</Label>
                      <RichTextEditor
                        content={formData.content}
                        onChange={(content) => setFormData({ ...formData, content })}
                        placeholder="Rédigez votre article avec l'éditeur enrichi..."
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="slug">Slug (URL)*</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          placeholder="titre-de-votre-article"
                          required
                        />
                        <p className="text-xs text-muted-foreground">URL: /blog/{formData.slug || 'slug'}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Catégorie*</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="Stratégie, Digital, etc."
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="author">Auteur*</Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          placeholder="Nom de l'auteur"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="read_time">Temps de lecture*</Label>
                        <Input
                          id="read_time"
                          value={formData.read_time}
                          onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                          placeholder="8 min"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image_url">URL de l'image de couverture*</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                      {formData.image_url && (
                        <img 
                          src={formData.image_url} 
                          alt="Aperçu" 
                          className="w-full h-48 object-cover rounded-lg mt-2"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                    </div>

                    <div className="flex items-center space-x-2 p-4 bg-secondary/20 rounded-lg">
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, featured: checked })
                        }
                      />
                      <Label htmlFor="featured" className="cursor-pointer">
                        Article à la une (affiché en priorité sur la page blog)
                      </Label>
                    </div>
                  </TabsContent>

                  <TabsContent value="seo" className="space-y-4 mt-4">
                    <div className="bg-secondary/10 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold mb-2">Optimisation pour les moteurs de recherche</h4>
                      <p className="text-sm text-muted-foreground">
                        Améliorez la visibilité de votre article sur Google et les réseaux sociaux
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meta_title">Titre SEO (Meta Title)</Label>
                      <Input
                        id="meta_title"
                        value={formData.meta_title}
                        onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                        placeholder={formData.title || "Titre optimisé pour les moteurs de recherche"}
                        maxLength={60}
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.meta_title.length || formData.title.length}/60 caractères - 
                        Apparaît dans les résultats Google
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Textarea
                        id="meta_description"
                        value={formData.meta_description}
                        onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                        placeholder={formData.excerpt || "Description détaillée pour les moteurs de recherche"}
                        rows={3}
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.meta_description.length || formData.excerpt.length}/160 caractères - 
                        Description affichée dans les résultats de recherche
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meta_keywords">Mots-clés (séparés par des virgules)</Label>
                      <Input
                        id="meta_keywords"
                        value={formData.meta_keywords}
                        onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                        placeholder="communication, stratégie, digital, marketing"
                      />
                      <p className="text-xs text-muted-foreground">
                        Mots-clés principaux pour améliorer le référencement
                      </p>
                    </div>

                    <div className="border border-border rounded-lg p-4 bg-card">
                      <h5 className="font-semibold mb-3">Aperçu dans les résultats Google</h5>
                      <div className="space-y-1">
                        <div className="text-primary text-lg">
                          {formData.meta_title || formData.title || 'Titre de votre article'}
                        </div>
                        <div className="text-xs text-green-600">
                          sifec.com › blog › {formData.slug || 'slug'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formData.meta_description || formData.excerpt || 'Description de votre article qui apparaîtra dans les résultats de recherche...'}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-2 justify-end pt-4 border-t">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    {editingArticle ? 'Mettre à jour l\'article' : 'Publier l\'article'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Chargement...</div>
        ) : (
          <div className="bg-card rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Auteur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.category}</TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {article.featured && <Badge variant="default">À la une</Badge>}
                        {article.archived && <Badge variant="secondary">Archivé</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(article)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleArchive(article)}
                        >
                          <Archive size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(article.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ArticlesManagement;
