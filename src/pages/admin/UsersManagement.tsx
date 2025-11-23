import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, Trash2 } from 'lucide-react';

const UsersManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*, user_roles(role)')
      .order('created_at', { ascending: false });
    setUsers(data || []);
  };

  const toggleAdmin = async (userId: string, hasAdminRole: boolean) => {
    if (hasAdminRole) {
      await supabase.from('user_roles').delete().eq('user_id', userId).eq('role', 'admin');
      toast({ title: 'Rôle admin retiré' });
    } else {
      await supabase.from('user_roles').insert({ user_id: userId, role: 'admin' });
      toast({ title: 'Rôle admin accordé' });
    }
    fetchUsers();
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-display font-bold mb-6">Gestion des Utilisateurs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const hasAdminRole = user.user_roles?.some((r: any) => r.role === 'admin');
            return (
              <TableRow key={user.id}>
                <TableCell>{user.full_name || '-'}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {hasAdminRole ? <Badge>Admin</Badge> : <Badge variant="secondary">User</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant={hasAdminRole ? 'destructive' : 'default'}
                    onClick={() => toggleAdmin(user.id, hasAdminRole)}
                  >
                    <Shield size={16} className="mr-2" />
                    {hasAdminRole ? 'Retirer admin' : 'Promouvoir admin'}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default UsersManagement;
