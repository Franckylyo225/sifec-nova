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

interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  main_image_url: string;
  secondary_image_url: string;
  completion_date: string;
  archived: boolean;
}

const PortfolioManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isUploadingMainImage, setIsUploadingMainImage] = useState(false);
  const [isUploadingSecondaryImage, setIsUploadingSecondaryImage] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    client: '',
    category: '',
    description: '',
    main_image_url: '',
    secondary_image_url: '',
    completion_date: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les projets',
        variant: 'destructive',
      });
    } else {
      setProjects(data || []);
    }
    setIsLoading(false);
  };

  const handleImageUpload = async (file: File, imageType: 'main' | 'secondary') => {
    const setUploading = imageType === 'main' ? setIsUploadingMainImage : setIsUploadingSecondaryImage;
    setUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      if (imageType === 'main') {
        setFormData({ ...formData, main_image_url: publicUrl });
      } else {
        setFormData({ ...formData, secondary_image_url: publicUrl });
      }
      
      toast({
        title: 'Image téléchargée',
        description: `L'image ${imageType === 'main' ? 'principale' : 'secondaire'} a été téléchargée avec succès`,
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: 'Impossible de télécharger l\'image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProject) {
      const { error } = await supabase
        .from('portfolio_projects')
        .update(formData)
        .eq('id', editingProject.id);

      if (error) {
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Succès',
          description: 'Projet modifié avec succès',
        });
        fetchProjects();
        handleCloseDialog();
      }
    } else {
      const { error } = await supabase.from('portfolio_projects').insert([formData]);

      if (error) {
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Succès',
          description: 'Projet créé avec succès',
        });
        fetchProjects();
        handleCloseDialog();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Projet supprimé avec succès',
      });
      fetchProjects();
    }
  };

  const handleArchive = async (project: Project) => {
    const { error } = await supabase
      .from('portfolio_projects')
      .update({ archived: !project.archived })
      .eq('id', project.id);

    if (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Succès',
        description: project.archived ? 'Projet désarchivé' : 'Projet archivé',
      });
      fetchProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      slug: project.slug,
      title: project.title,
      client: project.client,
      category: project.category,
      description: project.description,
      main_image_url: project.main_image_url,
      secondary_image_url: project.secondary_image_url || '',
      completion_date: project.completion_date,
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProject(null);
    setFormData({
      slug: '',
      title: '',
      client: '',
      category: '',
      description: '',
      main_image_url: '',
      secondary_image_url: '',
      completion_date: '',
    });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold">Gestion du Portfolio</h1>
            <p className="text-muted-foreground mt-1">
              Ajouter et gérer les projets du portfolio
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProject(null)}>
                <Plus className="mr-2" size={18} />
                Nouveau projet
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? 'Modifier le projet' : 'Créer un projet'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre*</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug*</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client*</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie*</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description*</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    placeholder="Décrivez le projet et ses objectifs..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="main_image_url">Image principale*</Label>
                  <div className="flex gap-2">
                    <Input
                      id="main_image_url"
                      value={formData.main_image_url}
                      onChange={(e) => setFormData({ ...formData, main_image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('main-image-upload')?.click()}
                      disabled={isUploadingMainImage}
                    >
                      {isUploadingMainImage ? 'Upload...' : 'Upload'}
                    </Button>
                  </div>
                  <input
                    id="main-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'main');
                    }}
                  />
                  {formData.main_image_url && (
                    <img 
                      src={formData.main_image_url} 
                      alt="Aperçu principale" 
                      className="w-full h-48 object-cover rounded-lg mt-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary_image_url">Image secondaire (optionnelle)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary_image_url"
                      value={formData.secondary_image_url}
                      onChange={(e) => setFormData({ ...formData, secondary_image_url: e.target.value })}
                      placeholder="https://example.com/image2.jpg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('secondary-image-upload')?.click()}
                      disabled={isUploadingSecondaryImage}
                    >
                      {isUploadingSecondaryImage ? 'Upload...' : 'Upload'}
                    </Button>
                  </div>
                  <input
                    id="secondary-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'secondary');
                    }}
                  />
                  {formData.secondary_image_url && (
                    <img 
                      src={formData.secondary_image_url} 
                      alt="Aperçu secondaire" 
                      className="w-full h-48 object-cover rounded-lg mt-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="completion_date">Date de réalisation*</Label>
                  <Input
                    id="completion_date"
                    value={formData.completion_date}
                    onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                    placeholder="Janvier 2024"
                    required
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingProject ? 'Mettre à jour' : 'Créer'}
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
                  <TableHead>Client</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>
                      {project.archived && <Badge variant="secondary">Archivé</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open('/portfolio', '_blank')}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(project)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleArchive(project)}
                        >
                          <Archive size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(project.id)}
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

export default PortfolioManagement;
