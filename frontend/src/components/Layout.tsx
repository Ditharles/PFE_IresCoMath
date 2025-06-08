import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="bg-card text-card-foreground shadow-sm sticky top-0 z-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <NavLink to="/accueil" className="flex items-center hover:opacity-80 transition-opacity">
                <FileText className="h-8 w-8 text-primary" />
                <span className="ml-2 font-bold text-xl text-foreground">RequestFlow</span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <NavLink
                to="/accueil"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-primary'
                  }`
                }
              >
                Accueil
              </NavLink>
              <NavLink
                to="/demande/stage"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-primary'
                  }`
                }
              >
                Nouvelle Demande
              </NavLink>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-card shadow-lg border-t border-border">
            <NavLink
              to="/accueil"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted'
                }`
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/demande/stage"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted'
                }`
              }
            >
              Nouvelle Demande
            </NavLink>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card text-card-foreground shadow-inner border-t border-border">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground">
            © 2025 RequestFlow. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;