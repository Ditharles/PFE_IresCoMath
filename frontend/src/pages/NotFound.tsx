import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Page non trouvée</h2>
            <p className="text-muted-foreground mb-8 text-center">
                Cette page n'existe pas ou a été déplacée
            </p>
            <Link
                to="/accueil"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
                Retourner à l'accueil
            </Link>
        </div>
    );
}
