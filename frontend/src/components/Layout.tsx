import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col bg-primary text-primary-foreground">
      {/* Header */}
      <header className="bg-background text-foreground-foreground shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <NavLink to="/accueil" className="flex items-center">
                <FileText className="h-8 w-8 text-accent" />
                <span className="ml-2 font-bold text-xl">RequestFlow</span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <NavLink
                to="/accueil"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive
                    ? 'text-accent font-semibold'
                    : 'text-muted-foreground hover:text-accent'
                  }`
                }
              >
                Accueil
              </NavLink>
              <NavLink
                to="/demande/stage"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive
                    ? 'text-accent font-semibold'
                    : 'text-muted-foreground hover:text-accent'
                  }`
                }
              >
                Nouvelle Demande
              </NavLink>
              {/* <ModeToggle /> */}
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-muted-foreground hover:text-accent"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-background shadow-lg">
            <NavLink
              to="/accueil"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-primary-foreground hover:bg-muted'
                }`
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/demande/stage"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-primary-foreground hover:bg-muted'
                }`
              }
            >
              Nouvelle Demande
            </NavLink>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet /> {/* Ici s'afficheront HomePage, NouvelleDemande, etc. */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background text-foreground-foreground shadow-inner">
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