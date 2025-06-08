
import { features } from "../../constants/home"
import { Badge } from "../ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card"






const FeaturesSection = () => {

   
    return (
        <section id="features" className="relative z-10 py-20 bg-white/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 animate-on-scroll">
                    <Badge
                        variant="secondary"
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-medium mb-4"
                    >
                        ✨ Fonctionnalités
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
                        Outils Modernes
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        IreSCoMath propose des solutions innovantes pour la gestion des demandes administratives, le suivi du
                        matériel, et la génération de rapports pour le laboratoire.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="group animate-on-scroll bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <CardHeader>
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-slate-600 leading-relaxed text-base">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default FeaturesSection