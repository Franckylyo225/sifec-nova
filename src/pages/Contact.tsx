import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import contactHeroImage from "@/assets/contact-hero.jpg";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  subject: z.string().trim().min(3, "Le sujet doit contenir au moins 3 caractères").max(200),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000),
  phone: z.string().trim().max(20).optional(),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const validation = contactSchema.safeParse(formData);
      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.from('contact_messages').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message,
      }]);

      if (error) throw error;

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${contactHeroImage})` }}
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in-up text-primary-foreground">
              Contactez-<span className="text-accent">nous</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Discutons de votre projet et de vos ambitions
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[450px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.2134445!2d-3.9617!3d5.3599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjEnMzUuNiJOIDPCsDU3JzQyLjEiVw!5e0!3m2!1sfr!2sci!4v1234567890!5m2!1sfr!2sci&q=Cocody+Riviéra+Faya,+Pharmacie+Ephrata,+Abidjan"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation SIFEC - Cocody Riviéra Faya, Abidjan"
        />
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Contact Info Card */}
              <div className="lg:col-span-2">
                <Card className="h-full border-none shadow-2xl bg-gradient-to-br from-primary via-primary to-primary-light overflow-hidden relative">
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary-light/20 rounded-full blur-3xl" />
                  <CardContent className="p-8 space-y-8 relative z-10">
                    <div>
                      <h2 className="text-3xl font-display font-bold mb-4 text-primary-foreground">
                        Informations de contact
                      </h2>
                      <p className="text-primary-foreground/90 leading-relaxed">
                        Notre équipe est à votre disposition pour échanger sur vos besoins en communication.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary-foreground/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="text-primary-foreground" size={20} />
                        </div>
                        <div>
                          <a href="tel:+225272220292" className="text-primary-foreground hover:text-accent transition-colors text-lg">
                            +225 27 22 20 29 21
                          </a>
                          <a href="tel:+225075816094" className="block text-primary-foreground/80 hover:text-accent transition-colors text-sm mt-1">
                            +225 07 58 16 09 04
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary-foreground/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="text-primary-foreground" size={20} />
                        </div>
                        <div>
                          <a href="mailto:contact@sifec.com" className="text-primary-foreground hover:text-accent transition-colors">
                            contact@sifec.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary-foreground/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="text-primary-foreground" size={20} />
                        </div>
                        <div>
                          <p className="text-primary-foreground/90">
                            Cocody Riviéra Faya<br />
                            Pharmacie Ephrata<br />
                            Abidjan, Côte d'Ivoire
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-primary-foreground/20">
                      <h3 className="font-display font-semibold mb-3 text-primary-foreground">Horaires d'ouverture</h3>
                      <div className="space-y-1 text-sm text-primary-foreground/80">
                        <p>Lundi - Vendredi : 9h - 18h</p>
                        <p>Samedi - Dimanche : Fermé</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <Card className="h-full border-border shadow-xl">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                            Nom complet
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Jean Dupont"
                            className="border-border h-12 bg-background"
                          />
                          {errors.name && (
                            <p className="text-sm text-destructive mt-1">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                            Votre Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="jean.dupont@example.com"
                            className="border-border h-12 bg-background"
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">
                          Votre Sujet
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="Demande de devis"
                          className="border-border h-12 bg-background"
                        />
                        {errors.subject && (
                          <p className="text-sm text-destructive mt-1">{errors.subject}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Écrivez votre message..."
                          rows={8}
                          className="border-border resize-none bg-background"
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive mt-1">{errors.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="bg-accent hover:bg-accent-light text-accent-foreground h-12 px-8 rounded-lg font-medium transition-all hover:shadow-lg"
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                        <Send className="ml-2" size={18} />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
