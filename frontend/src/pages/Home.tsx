import { ArrowRightIcon } from "lucide-react";
import { isAuthenticated } from "../utils/tokens.utils";
import { Navigate } from "react-router-dom";

const Home = () => {
    if (isAuthenticated()) {
        return <Navigate to={'/accueil'} replace />
    }
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="border-b border-border bg-card text-card-foreground">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xl">AD</span>
                        </div>
                        <span className="text-xl font-bold">IresCoMath</span>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <a href="/" className="font-medium text-foreground hover:text-primary transition-colors">
                            Accueil
                        </a>
                        <a href="#features" className="font-medium text-muted-foreground hover:text-primary transition-colors">
                            Fonctionnalités
                        </a>
                        <a href="#about" className="font-medium text-muted-foreground hover:text-primary transition-colors">
                            À propos
                        </a>
                        <a href="#contact" className="font-medium text-muted-foreground hover:text-primary transition-colors">
                            Contact
                        </a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <a href="/login" className="font-medium text-muted-foreground hover:text-primary transition-colors">
                            Connexion
                        </a>
                        <a href="/inscription" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded">
                            Inscription
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                Bienvenue sur Admin IresCoMath
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                Votre plateforme de gestion des demandes administratives et de matériels. Simplifiez vos processus et optimisez votre gestion.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <a href="/inscription" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded flex items-center">
                                    Commencer maintenant
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </a>
                                <a href="#features" className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium py-2 px-4 rounded">
                                    En savoir plus
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-card text-card-foreground">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Nos fonctionnalités</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Découvrez les outils et services que nous proposons pour simplifier la gestion de vos demandes administratives et de matériels.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-background rounded-lg p-8 transition-all hover:shadow-md hover:transform hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 bg-muted text-muted-foreground">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                            <h2 className="text-3xl font-bold text-foreground mb-4">À propos d'Admin IresCoMath</h2>
                            <p className="text-muted-foreground mb-6">
                                Admin IresCoMath est une plateforme conçue pour simplifier la gestion des demandes administratives et de matériels. Notre mission est de vous aider à optimiser vos processus et à améliorer votre efficacité.
                            </p>
                            <p className="text-muted-foreground mb-6">
                                Que vous soyez une entreprise, une institution ou une organisation, Admin IresCoMath vous offre des solutions adaptées à vos besoins.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-primary"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-foreground">{feature.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="/placeholder.svg?height=400&width=500"
                                alt="À propos d'Admin IresCoMath"
                                className="rounded-lg shadow-lg max-w-full h-auto"
                                width={500}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Prêt à simplifier votre gestion ?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Inscrivez-vous dès aujourd'hui et commencez à optimiser vos processus administratifs et de gestion des matériels.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <a href="/inscription" className="bg-background text-primary hover:bg-background/90 font-medium py-2 px-4 rounded">
                            S'inscrire maintenant
                        </a>
                        <a href="/login" className="border border-primary-foreground text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded">
                            Se connecter
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="py-12 bg-card text-card-foreground">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-xl">AD</span>
                                </div>
                                <span className="text-xl font-bold">Admin IresCoMath</span>
                            </div>
                            <p className="text-muted-foreground mb-4">Votre plateforme de gestion des demandes administratives et de matériels.</p>
                            <div className="flex space-x-4">
                                {socialLinks.map((link, index) => (
                                    <a key={index} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
                            <ul className="space-y-2">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Données des fonctionnalités
const features = [
    {
        title: "Gestion des demandes",
        description:
            "Centralisez et suivez toutes vos demandes administratives en un seul endroit. Gagnez du temps et réduisez les erreurs.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
            </svg>
        ),
    },
    {
        title: "Suivi des matériels",
        description:
            "Gérez votre inventaire de matériels et suivez leur état en temps réel. Optimisez l'utilisation de vos ressources.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7h16M4 13h16M4 19h16"
                />
            </svg>
        ),
    },
    {
        title: "Rapports et analyses",
        description:
            "Générez des rapports détaillés et analysez vos données pour prendre des décisions éclairées.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 4v-2a2 2 0 012-2h2a2 2 0 012 2v2m-8-4a2 2 0 100-4 2 2 0 000 4zm0 0v-2a2 2 0 114 0v2m-4 0a2 2 0 110-4 2 2 0 010 4z"
                />
            </svg>
        ),
    },
];

const socialLinks = [
    {
        href: "#",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
            </svg>
        ),
    },
    {
        href: "#",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
            </svg>
        ),
    },
];

const quickLinks = [
    { href: "/", text: "Accueil" },
    { href: "#features", text: "Fonctionnalités" },
    { href: "#about", text: "À propos" },
    { href: "#contact", text: "Contact" },
];

export default Home;
