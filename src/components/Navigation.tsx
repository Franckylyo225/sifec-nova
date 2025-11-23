import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import logoWhite from "@/assets/logo-sifec-white.png";
import logoBlue from "@/assets/logo-sifec-blue.png";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/about", label: "À propos" },
    { path: "/expertise", label: "Expertise" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={isScrolled || !isHomePage ? logoBlue : logoWhite} 
              alt="SIFEC" 
              className="h-12 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[15px] font-medium tracking-tight transition-all duration-300 relative group ${
                    isScrolled || !isHomePage
                      ? location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground hover:text-primary hover:scale-105"
                      : location.pathname === link.path
                      ? "text-white"
                      : "text-white/80 hover:text-white hover:scale-105"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className={`absolute -bottom-2 left-0 w-full h-0.5 rounded-full transition-colors duration-300 ${
                      isScrolled || !isHomePage ? "bg-primary" : "bg-white"
                    }`} />
                  )}
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full ${
                    isScrolled || !isHomePage ? "bg-primary" : "bg-white"
                  }`} />
                </Link>
              ))}
            </div>
            <Link to="/contact">
              <Button 
                size="sm"
                className="bg-accent hover:bg-accent-light text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Commencer l'aventure
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-4 animate-fade-in-up">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium tracking-tight transition-all duration-300 hover:scale-105 hover:translate-x-2 ${
                    isScrolled || !isHomePage
                      ? location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                      : location.pathname === link.path
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  size="sm"
                  className="bg-accent hover:bg-accent-light text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 w-full justify-center"
                >
                  Commencer l'aventure
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
