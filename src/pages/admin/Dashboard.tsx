import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, MessageSquare, Mail } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    projects: 0,
    testimonials: 0,
    messages: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [articles, projects, testimonials, messages, unreadMessages] = await Promise.all([
      supabase.from('articles').select('id', { count: 'exact', head: true }),
      supabase.from('portfolio_projects').select('id', { count: 'exact', head: true }),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('read', false),
    ]);

    setStats({
      articles: articles.count || 0,
      projects: projects.count || 0,
      testimonials: testimonials.count || 0,
      messages: messages.count || 0,
      unreadMessages: unreadMessages.count || 0,
    });
  };

  const statCards = [
    {
      title: 'Articles',
      value: stats.articles,
      icon: FileText,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Projets Portfolio',
      value: stats.projects,
      icon: Briefcase,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Témoignages',
      value: stats.testimonials,
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      subtitle: `${stats.unreadMessages} non lus`,
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Bienvenue dans l'espace d'administration SIFEC
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.subtitle && (
                  <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Accès rapide</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/admin/articles"
                className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                <FileText className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-semibold">Gérer les articles</h3>
                <p className="text-sm text-muted-foreground">Créer, modifier ou supprimer des articles</p>
              </a>
              <a
                href="/admin/portfolio"
                className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                <Briefcase className="h-6 w-6 text-accent mb-2" />
                <h3 className="font-semibold">Gérer le portfolio</h3>
                <p className="text-sm text-muted-foreground">Ajouter ou modifier des projets</p>
              </a>
              <a
                href="/admin/contacts"
                className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                <Mail className="h-6 w-6 text-blue-600 mb-2" />
                <h3 className="font-semibold">Voir les messages</h3>
                <p className="text-sm text-muted-foreground">Consulter les messages de contact</p>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
