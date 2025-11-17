import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-3xl font-serif font-bold">
              <span className="text-primary-foreground">SI</span>
              <span className="text-accent">FEC</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Intelligence communicationnelle pour clients institutionnels et personnalités publiques.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {["Accueil", "À propos", "Expertise", "Portfolio", "Blog"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s/g, "-").replace("à-", "")}`}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Stratégie de communication",
                "Relations publiques",
                "Gestion de crise",
                "Médias sociaux",
                "Conseil en image",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-primary-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-accent" />
                <a href="mailto:contact@sifec.com" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  contact@sifec.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-accent" />
                <a href="tel:+33123456789" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-accent mt-1" />
                <span className="text-sm text-primary-foreground/80">
                  Paris, France
                </span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} SIFEC. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
