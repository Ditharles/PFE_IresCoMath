import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { ArrowRight, Share2, Mail } from "lucide-react"
import logoIres from "../../assets/logo-ires.png"

export default function Footer() {

    const socialLinks = [
        {
            href: "#",
            icon: <Share2 className="h-5 w-5" />,
        },
        {
            href: "#",
            icon: <Mail className="h-5 w-5" />,
        },
    ]

    const quickLinks = [
        { href: "/", text: "Accueil" },
        { href: "#features", text: "Fonctionnalités" },
        { href: "#about", text: "À propos" },
        { href: "#contact", text: "Contact" },
    ]

    return (
        <footer id="contact" className="relative z-10 py-16 bg-slate-900 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo et description */}
                    <div className="animate-on-scroll">
                        <div className="flex items-center space-x-3 mb-6">
                            <img
                                src={logoIres}
                                alt="logo"
                                className="h-10 object-contain rounded-lg"
                            />
                        </div>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Plateforme PFE – Gestion administrative et matérielle du laboratoire IreSCoMath.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <SocialLink key={index} href={link.href} icon={link.icon} />
                            ))}
                        </div>
                    </div>

                    {/* Liens rapides */}
                    <div className="animate-on-scroll">
                        <h3 className="font-bold text-lg mb-6 text-blue-400">Liens rapides</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <QuickLink key={index} href={link.href} text={link.text} />
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="my-12 bg-slate-800" />

                <div className="text-center">
                    <p className="text-slate-400">© 2024 IreSCoMath. Projet de Fin d'Études - Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
    return (
        <Button
            variant="ghost"
            size="icon"
            asChild
            className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110"
        >
            <a href={href}>{icon}</a>
        </Button>
    )
}

function QuickLink({ href, text }: { href: string, text: string }) {
    return (
        <li>
            <Button
                variant="ghost"
                asChild
                className="p-0 h-auto text-slate-400 hover:text-white transition-colors duration-300 justify-start"
            >
                <a href={href} className="flex items-center group">
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {text}
                </a>
            </Button>
        </li>
    )
}