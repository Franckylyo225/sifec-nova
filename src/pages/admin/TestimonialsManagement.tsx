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
import { Plus, Pencil, Trash2, Archive, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  client_position: string;
  client_company: string;
  testimonial_text: string;
  rating: number;
  image_url: string | null;
  archived: boolean;
}

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    client_name: '',
    client_position: '',
    client_company: '',
    testimonial_text: '',
    rating: 5,
    image_url: '',
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les témoignages',
        variant: 'destructive',
      });
    } else {
      setTestimonials(data || []);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      image_url: formData.image_url || null,
    };

    if (editingTestimonial) {
      const { error } = await supabase
        .from('testimonials')
        .update(dataToSubmit)
        .eq('id', editingTestimonial.id);

      if (error) {
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Succès',
          description: 'Témoignage modifié avec succès',
        });
        fetchTestimonials();
        handleCloseDialog();
      }
    } else {
      const { error } = await supabase.from('testimonials').insert([dataToSubmit]);

      if (error) {
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Succès',
          description: 'Témoignage créé avec succès',
        });
        fetchTestimonials();
        handleCloseDialog();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return;

    const { error } = await supabase.from('testimonials').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Témoignage supprimé avec succès',
      });
      fetchTestimonials();
    }
  };

  const handleArchive = async (testimonial: Testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ archived: !testimonial.archived })
      .eq('id', testimonial.id);

    if (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Succès',
        description: testimonial.archived ? 'Témoignage désarchivé' : 'Témoignage archivé',
      });
      fetchTestimonials();
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      client_name: testimonial.client_name,
      client_position: testimonial.client_position,
      client_company: testimonial.client_company,
      testimonial_text: testimonial.testimonial_text,
      rating: testimonial.rating,
      image_url: testimonial.image_url || '',
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTestimonial(null);
    setFormData({
      client_name: '',
      client_position: '',
      client_company: '',
      testimonial_text: '',
      rating: 5,
      image_url: '',
    });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold">Gestion des Témoignages</h1>
            <p className="text-muted-foreground mt-1">
              Ajouter et gérer les témoignages clients
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingTestimonial(null)}>
                <Plus className="mr-2" size={18} />
                Nouveau témoignage
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingTestimonial ? 'Modifier le témoignage' : 'Créer un témoignage'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client_name">Nom du client*</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client_position">Poste*</Label>
                    <Input
                      id="client_position"
                      value={formData.client_position}
                      onChange={(e) => setFormData({ ...formData, client_position: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client_company">Entreprise*</Label>
                    <Input
                      id="client_company"
                      value={formData.client_company}
                      onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testimonial_text">Témoignage*</Label>
                  <Textarea
                    id="testimonial_text"
                    value={formData.testimonial_text}
                    onChange={(e) => setFormData({ ...formData, testimonial_text: e.target.value })}
                    required
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Note (1-5)*</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL de l'image</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingTestimonial ? 'Mettre à jour' : 'Créer'}
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
                  <TableHead>Client</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell className="font-medium">{testimonial.client_name}</TableCell>
                    <TableCell>{testimonial.client_company}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {testimonial.archived && <Badge variant="secondary">Archivé</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(testimonial)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleArchive(testimonial)}
                        >
                          <Archive size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(testimonial.id)}
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

export default TestimonialsManagement;
