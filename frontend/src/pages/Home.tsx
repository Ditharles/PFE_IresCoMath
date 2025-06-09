
import { Check } from "lucide-react"
import { useEffect } from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Button } from "../components/ui/button"

import Header from "../components/home/Header"
import Footer from "../components/home/Footer"
import HeroSection from "../components/home/HeroSection"
import directeurPage from "../assets/directeur.png"
import othersPage from "../assets/autres.png"
import adminPage from "../assets/admin.png"
import additionnel from "../assets/additionnel.png"
import BackgroundElements from "../components/home/BackgroundElements"
import { features } from "../constants/home"
import FeaturesSection from "../components/home/FeaturesSection"

export default function Home() {


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up")
                    }
                })
            },
            { threshold: 0.1 },
        )

        const elements = document.querySelectorAll(".animate-on-scroll")
        elements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <BackgroundElements />

            {/* Header */}
            <Header />
            {/* Hero Section */}
            <HeroSection />
            {/* Features Section */}
            <FeaturesSection />
            {/* Interface Showcase Section */}
            <section id="interfaces" className="relative z-10 py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 animate-on-scroll">
                        <Badge
                            variant="secondary"
                            className="px-4 py-2 bg-gradient-to-r from-cyan-100 to-teal-100 text-teal-700 font-medium mb-4"
                        >
                            🖥️ Interfaces
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-teal-800 bg-clip-text text-transparent">
                            Découvrez l'Application
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Une interface intuitive et adaptée à chaque type d'utilisateur pour une expérience optimale.
                        </p>
                    </div>

                    <div className="animate-on-scroll">
                        <Tabs defaultValue="directeur" className="w-full">
                            <div className="flex justify-center mb-8">
                                <TabsList className="grid grid-cols-3 w-full max-w-2xl bg-slate-100/80 backdrop-blur-sm p-1 rounded-xl">
                                    <TabsTrigger
                                        value="directeur"
                                        className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                                    >
                                        Directeur
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="admin"
                                        className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                                    >
                                        Admin
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="utilisateur"
                                        className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                                    >
                                        Utilisateur
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="directeur" className="mt-0">
                                <Card className="relative group bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                                    <CardContent className="relative p-6">
                                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                                            <div className="lg:w-2/3">
                                                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200">
                                                    <img
                                                        src={directeurPage}
                                                        alt="Interface Directeur"
                                                        width={800}
                                                        height={600}
                                                        className="w-full h-auto"
                                                    />
                                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-900/70 to-transparent flex items-end">
                                                        <div className="p-6">
                                                            <Badge className="bg-blue-600 text-white">Dashboard Directeur</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="lg:w-1/3">
                                                <CardHeader className="px-0">
                                                    <CardTitle className="text-2xl font-bold text-slate-900">Dashboard Directeur</CardTitle>
                                                    <CardDescription className="text-slate-600 text-base">
                                                        Vue complète des activités du laboratoire avec tableaux de bord analytiques, validation des
                                                        demandes importantes et accès aux rapports stratégiques.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="px-0">
                                                    <ul className="space-y-3">
                                                        <li className="flex items-center text-slate-700">
                                                            <Check className="h-5 w-5 text-green-600 mr-2" />
                                                            <span>Validation des demandes</span>
                                                        </li>
                                                        <li className="flex items-center text-slate-700">
                                                            <Check className="h-5 w-5 text-green-600 mr-2" />
                                                            <span>Statistiques globales</span>
                                                        </li>
                                                        <li className="flex items-center text-slate-700">
                                                            <Check className="h-5 w-5 text-green-600 mr-2" />
                                                            <span>Gestion des budgets</span>
                                                        </li>
                                                    </ul>
                                                </CardContent>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="admin" className="mt-0">
                                <Card className="relative group bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                                    <CardContent className="relative p-6">
                                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                                            <div className="lg:w-2/3">
                                                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200">
                                                    <img
                                                        src={adminPage}
                                                        alt="Interface Admin"
                                                        width={800}
                                                        height={600}
                                                        className="w-full h-auto"
                                                    />
                                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-900/70 to-transparent flex items-end">
                                                        <div className="p-6">
                                                            <Badge className="bg-purple-600 text-white">Console Admin</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="lg:w-1/3">
                                                <CardHeader className="px-0">
                                                    <CardTitle className="text-2xl font-bold text-slate-900">Console Administrateur</CardTitle>
                                                    <CardDescription className="text-slate-600 text-base">
                                                        Gestion complète des utilisateurs, des ressources et des configurations système. Outils
                                                        avancés pour maintenir et optimiser la plateforme.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="px-0">
                                                    <ul className="space-y-3">
                                                        <li className="flex items-center text-slate-700">
                                                            <Check className="h-5 w-5 text-green-600 mr-2" />
                                                            <span>Gestion des utilisateurs</span>
                                                        </li>
                                                        <li className="flex items-center text-slate-700">
                                                            <Check className="h-5 w-5 text-green-600 mr-2" />
                                                            <span>Configuration système</span>
                                                        </li>
                                                        <li className="flex items-center text-slate-700">
                                                            <Check className="h-5 w-5 text-green-600 mr-2" />
                                                            <span>Logs et surveillance</span>
                                                        </li>
                                                    </ul>
                                                </CardContent>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="utilisateur" className="mt-0">
                                <Card className="relative group bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                                    <CardContent className="relative p-6">
                                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                                            <div className="lg:w-2/3">
                                                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200">
                                                    <img
                                                        src={othersPage}
                                                        alt="Interface Utilisateur"
                                                        width={800}
                                                        height={600}
                                                        className="w-full h-auto"
                                                    />
                                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-900/70 to-transparent flex items-end">
                                                        <div className="p-6">
                                                            <Badge className="bg-teal-600 text-white">Espace Utilisateur</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="lg:w-1/3">
                                                <CardHeader className="px-0">
                                                    <CardTitle className="text-2xl font-bold text-slate-900">Espace Utilisateur</CardTitle>
                                                    <CardDescription className="text-slate-600 text-base">
                                                        Interface intuitive permettant aux chercheurs et au personnel de soumettre des demandes,
                                                        suivre leur progression et accéder aux ressources du laboratoire.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="px-0">
                                                    <ul className="space-y-3">
                                                        <li className="flex items-center text-slate-700">
                                                            <Check className="h-5 w-5 text-green-600 mr-2" />
                                                            <span>Soumission de demandes</span>
                                                        </li>
                                                        <li className="flex items-center text-slate-700">
                                                            <Check className="h-5 w-5 text-green-600 mr-2" />
                                                            <span>Suivi des demandes</span>
                                                        </li>
                                                        <li className="flex items-center text-slate-700">
                                                            <Check className="h-5 w-5 text-green-600 mr-2" />
                                                            <span>Réservation de matériel</span>
                                                        </li>
                                                    </ul>
                                                </CardContent>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative z-10 py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12 animate-on-scroll">
                            <Badge
                                variant="secondary"
                                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-medium mb-6"
                            >
                                🎯 À propos
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-purple-800 bg-clip-text text-transparent">
                                Innovation & Excellence
                            </h2>
                            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                                Ce projet de fin d'études a été développé pour répondre aux besoins spécifiques du laboratoire
                                IreSCoMath en matière de gestion administrative et logistique.
                            </p>
                            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                                Il permet de centraliser les demandes, d'automatiser les validations, de suivre l'inventaire du matériel
                                et de générer des rapports statistiques pour une meilleure prise de décision.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center group">
                                        <Avatar className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            <AvatarFallback className="bg-transparent">
                                                <Check className="h-6 w-6 text-white" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-slate-700 font-medium group-hover:text-green-600 transition-colors duration-300">
                                            {feature.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:w-1/2 animate-on-scroll">
                            <Card className="relative group bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 transform group-hover:scale-105 transition-all duration-300">
                                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                                <CardContent className="relative p-8">
                                    <img
                                        src={additionnel}
                                        alt="Présentation IreSCoMath"
                                        width={500}
                                        height={400}
                                        className="rounded-xl"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-20 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Prêt à découvrir IreSCoMath ?</h2>
                        <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed opacity-90">
                            Inscrivez-vous et profitez d'une gestion moderne et efficace pour votre laboratoire.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <Button
                                size="lg"
                                asChild
                                className="group bg-white text-blue-700 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <a href="/inscription">S'inscrire maintenant</a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="group border-2 border-white text-white hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105"
                            >
                                <a href="/login">Se connecter</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    )
}


