import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, Trash2, Plus, UserPlus } from 'lucide-react';
import { z } from 'zod';

const adminSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  full_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  role: z.enum(['admin', 'user']),
});

const UsersManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'user' as 'admin' | 'user',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*, user_roles(role)')
      .order('created_at', { ascending: false });
    setUsers(data || []);
    setIsLoading(false);
  };

  const handleApproveUser = async (userId: string, userName: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('profiles')
        .update({ 
          approved: true, 
          approved_at: new Date().toISOString(),
          approved_by: user?.id 
        })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Compte approuvé',
        description: `Le compte de ${userName} a été approuvé`,
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible d\'approuver le compte',
        variant: 'destructive',
      });
    }
  };

  const handleRejectUser = async (userId: string, userName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir rejeter le compte de ${userName} ?`)) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ approved: false })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Compte rejeté',
        description: `Le compte de ${userName} a été rejeté`,
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de rejeter le compte',
        variant: 'destructive',
      });
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const validation = adminSchema.safeParse(formData);
      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        setIsLoading(false);
        return;
      }

      // Create user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.full_name,
          },
        },
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Impossible de créer l\'utilisateur');
      }

      // Add role to user_roles table if admin
      if (formData.role === 'admin') {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ user_id: authData.user.id, role: 'admin' });

        if (roleError) throw roleError;
      }

      // Approve the account automatically if created by an admin
      const { error: approveError } = await supabase
        .from('profiles')
        .update({ 
          approved: true, 
          approved_at: new Date().toISOString() 
        })
        .eq('id', authData.user.id);

      if (approveError) console.error('Error approving user:', approveError);

      toast({
        title: 'Utilisateur créé',
        description: `${formData.full_name} a été ajouté avec le rôle ${formData.role}`,
      });

      setFormData({ email: '', password: '', full_name: '', role: 'user' });
      setDialogOpen(false);
      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de créer l\'utilisateur',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAdmin = async (userId: string, hasAdminRole: boolean) => {
    try {
      if (hasAdminRole) {
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');

        if (error) throw error;

        toast({ 
          title: 'Rôle modifié',
          description: 'Le rôle admin a été retiré'
        });
      } else {
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });

        if (error) throw error;

        toast({ 
          title: 'Rôle modifié',
          description: 'Le rôle admin a été accordé'
        });
      }
      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de modifier le rôle',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${userName} ?`)) return;

    try {
      // Note: In production, you would need a server-side function to delete auth users
      // For now, we just remove from profiles and user_roles
      const { error: roleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (roleError || profileError) {
        throw roleError || profileError;
      }

      toast({
        title: 'Utilisateur supprimé',
        description: `${userName} a été supprimé`,
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de supprimer l\'utilisateur',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold">Gestion des Administrateurs</h1>
            <p className="text-muted-foreground mt-1">
              Gérer les utilisateurs et leurs rôles d'accès
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2" size={18} />
                Nouvel utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateAdmin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nom complet*</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Jean Dupont"
                    required
                  />
                  {errors.full_name && (
                    <p className="text-sm text-destructive">{errors.full_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jean.dupont@example.com"
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe*</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Minimum 8 caractères
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Rôle*</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: 'admin' | 'user') =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Utilisateur</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-sm text-destructive">{errors.role}</p>
                  )}
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setDialogOpen(false);
                      setFormData({ email: '', password: '', full_name: '', role: 'user' });
                      setErrors({});
                    }}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Création...' : 'Créer l\'utilisateur'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Date de création</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => {
                  const hasAdminRole = user.user_roles?.some((r: any) => r.role === 'admin');
                  const isApproved = user.approved;
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.full_name || '-'}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {isApproved ? (
                          <Badge variant="default" className="bg-green-600">
                            Approuvé
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            En attente
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {hasAdminRole ? (
                          <Badge className="bg-primary">
                            <Shield size={12} className="mr-1" />
                            Admin
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Utilisateur</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!isApproved && (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleApproveUser(user.id, user.full_name || user.email)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approuver
                            </Button>
                          )}
                          {isApproved && (
                            <>
                              <Button
                                size="sm"
                                variant={hasAdminRole ? 'outline' : 'default'}
                                onClick={() => toggleAdmin(user.id, hasAdminRole)}
                              >
                                <Shield size={16} className="mr-1" />
                                {hasAdminRole ? 'Retirer admin' : 'Promouvoir'}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRejectUser(user.id, user.full_name || user.email)}
                              >
                                Rejeter
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteUser(user.id, user.full_name || user.email)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersManagement;
