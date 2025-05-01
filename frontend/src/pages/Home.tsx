import { ArrowRightIcon } from "lucide-react";
import { isAuthenticated } from "../utils/tokens.utils";
import { Navigate } from "react-router-dom";

const Home = () => {
    if (isAuthenticated()) {
        return <Navigate to={'/accueil'} replace />
    }
    return (
        <div className="flex flex-col min-h-screen">

            <header className="border-b bg-white">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">AD</span>
                        </div>
                        <span className="text-xl font-bold">IresCoMath</span>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <a href="/" className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                            Accueil
                        </a>
                        <a href="#features" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">
                            Fonctionnalités
                        </a>
                        <a href="#about" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">
                            À propos
                        </a>
                        <a href="#contact" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">
                            Contact
                        </a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <a href="/login" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">
                            Connexion
                        </a>
                        <a href="/inscription" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                            Inscription
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Bienvenue sur Admin IresCoMath
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Votre plateforme de gestion des demandes administratives et de matériels. Simplifiez vos processus et optimisez votre gestion.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <a href="/inscription" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center">
                                    Commencer maintenant
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </a>
                                <a href="#features" className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 px-4 rounded">
                                    En savoir plus
                                </a>
                            </div>
                        </div>
                  
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos fonctionnalités</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Découvrez les outils et services que nous proposons pour simplifier la gestion de vos demandes administratives et de matériels.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-lg p-8 transition-all hover:shadow-md hover:transform hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">À propos d'Admin IresCoMath</h2>
                            <p className="text-gray-600 mb-6">
                                Admin IresCoMath est une plateforme conçue pour simplifier la gestion des demandes administratives et de matériels. Notre mission est de vous aider à optimiser vos processus et à améliorer votre efficacité.
                            </p>
                            <p className="text-gray-600 mb-6">
                                Que vous soyez une entreprise, une institution ou une organisation, Admin IresCoMath vous offre des solutions adaptées à vos besoins.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Gestion des demandes</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Suivi des matériels</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Rapports et analyses</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Support client</span>
                                </div>
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
            <section className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Prêt à simplifier votre gestion ?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Inscrivez-vous dès aujourd'hui et commencez à optimiser vos processus administratifs et de gestion des matériels.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <a href="/inscription" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-2 px-4 rounded">
                            S'inscrire maintenant
                        </a>
                        <a href="/login" className="border border-white text-white hover:bg-blue-700 font-medium py-2 px-4 rounded">
                            Se connecter
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">AD</span>
                                </div>
                                <span className="text-xl font-bold text-white">Admin IresCoMath</span>
                            </div>
                            <p className="mb-4">Votre plateforme de gestion des demandes administratives et de matériels.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4">Liens rapides</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/" className="hover:text-white transition-colors">
                                        Accueil
                                    </a>
                                </li>
                                <li>
                                    <a href="#features" className="hover:text-white transition-colors">
                                        Fonctionnalités
                                    </a>
                                </li>
                                <li>
                                    <a href="#about" className="hover:text-white transition-colors">
                                        À propos
                                    </a>
                                </li>
                                <li>
                                    <a href="/login" className="hover:text-white transition-colors">
                                        Connexion
                                    </a>
                                </li>
                                <li>
                                    <a href="/inscription" className="hover:text-white transition-colors">
                                        Inscription
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4">Ressources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Tutoriels
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <svg
                                        className="h-6 w-6 mr-2 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>123 Avenue de la Gestion, 75000 Paris</span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-6 w-6 mr-2 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span>contact@Admin IresCoMath.com</span>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-6 w-6 mr-2 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <span>+33 1 23 45 67 89</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                        <p>&copy; {new Date().getFullYear()} Admin IresCoMath. Tous droits réservés.</p>
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
                className="h-6 w-6 text-blue-600"
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
                className="h-6 w-6 text-blue-600"
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
                className="h-6 w-6 text-blue-600"
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

export default Home;
