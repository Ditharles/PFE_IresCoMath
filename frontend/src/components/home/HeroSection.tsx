import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { ArrowRight } from "lucide-react"
import original from "../../assets/original.png"

export default function HeroSection() {
    return (
        <section className="relative z-10 py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-12 md:mb-0 animate-on-scroll">
                        <Badge
                            variant="secondary"
                            className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-medium mb-6 animate-bounce-subtle"
                        >
                            🎓 Projet de Fin d'Études
                        </Badge>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                                IreSCoMath
                            </span>
                            <br />
                            <span className="text-3xl md:text-4xl text-slate-700">Gestion Moderne</span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                            Plateforme web de gestion centralisée des demandes administratives et du matériel pour le laboratoire
                            IreSCoMath.
                            <br />
                            <span className="text-blue-600 font-medium">
                                Digitalisation et optimisation des processus internes.
                            </span>
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Button
                                size="lg"
                                asChild
                                className="group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <a href="/inscription">
                                    Commencer maintenant
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                            >
                                <a href="#features">En savoir plus</a>
                            </Button>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center animate-on-scroll">
                        <HeroCard />
                    </div>
                </div>
            </div>
        </section>
    )
}

function HeroCard() {
    return (
        <Card className="relative group bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 transform group-hover:scale-105 transition-all duration-300">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <CardContent className="relative p-8">
                <img
                    src={original}
                    alt="plateforme irescomath"
                    width={400}
                    height={300}
                    className="rounded-xl"
                />
            </CardContent>
        </Card>
    )
}