import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Eye, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string | null;
  read: boolean;
  created_at: string;
}

const ContactsManagement = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setContacts(data || []);
  };

  const markAsRead = async (id: string) => {
    await supabase.from('contact_messages').update({ read: true }).eq('id', id);
    fetchContacts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce message ?')) return;
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (!error) {
      toast({ title: 'Message supprimé' });
      fetchContacts();
    }
  };

  const viewMessage = (contact: Contact) => {
    setSelectedContact(contact);
    setDialogOpen(true);
    if (!contact.read) markAsRead(contact.id);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-display font-bold mb-6">Messages de Contact</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Sujet</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id} className={!contact.read ? 'bg-primary/5' : ''}>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.subject}</TableCell>
              <TableCell>{new Date(contact.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                {!contact.read && <Badge>Non lu</Badge>}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => viewMessage(contact)}>
                    <Eye size={16} />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(contact.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message de {selectedContact?.name}</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div><strong>Email:</strong> {selectedContact.email}</div>
              <div><strong>Sujet:</strong> {selectedContact.subject}</div>
              {selectedContact.phone && <div><strong>Tél:</strong> {selectedContact.phone}</div>}
              <div><strong>Message:</strong><p className="mt-2">{selectedContact.message}</p></div>
              <Button onClick={() => window.location.href = `mailto:${selectedContact.email}`}>
                <Mail className="mr-2" size={16} />
                Répondre par email
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ContactsManagement;
