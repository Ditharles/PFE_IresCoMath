import { Button } from "../ui/button"
import logoIres from "../../assets/logo-ires.png"

export default function Header() {
    const navItems = ["Accueil", "Fonctionnalités", "À propos", "Contact"]

    return (
        <header className="relative z-10 border-b border-white/20 bg-white/80 backdrop-blur-lg shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-3 group">
                    <img
                        src={logoIres}
                        alt="logo"
                        className="h-10 object-contain rounded-lg"
                    />
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-8">
                    {navItems.map((item, index) => (
                        <NavItem key={item} item={item} index={index} />
                    ))}
                </nav>

                {/* Boutons */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" asChild className="font-medium text-slate-700 hover:text-blue-600">
                        <a href="/login">Connexion</a>
                    </Button>
                    <Button
                        asChild
                        className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        <a href="/inscription">Inscription</a>
                    </Button>
                </div>
            </div>
        </header>
    )
}

function NavItem({ item, index }: { item: string, index: number }) {
    return (
        <Button
            variant="ghost"
            asChild
            className="font-medium text-slate-700 hover:text-blue-600 transition-all duration-300 relative group"
        >
            <a href={index === 0 ? "/" : `#${item.toLowerCase().replace("à propos", "about").replace("é", "e")}`}>
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </a>
        </Button>
    )
}