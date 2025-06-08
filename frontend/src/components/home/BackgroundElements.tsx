export default function BackgroundElements() {
    return (
        <>
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-3xl animate-float-delayed"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>

            {/* Floating Particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <Particle key={i} index={i} />
                ))}
            </div>
        </>
    )
}

function Particle({ index }: { index: number }) {
    return (
        <div
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float-particle" key={index}
            style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
            }}
        ></div>
    )
}