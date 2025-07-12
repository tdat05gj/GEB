const SpinningLogo = () => {
    const [loadingText, setLoadingText] = React.useState("Initializing blockchain scanner...");
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const texts = [
            "Initializing blockchain scanner...",
            "Connecting to Ethereum network...",
            "Scanning BNB Smart Chain...",
            "Analyzing transaction patterns...",
            "Calculating crypto rankings...",
            "Finalizing your profile..."
        ];

        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            setLoadingText(texts[currentIndex]);
            setProgress((currentIndex + 1) * (100 / texts.length));
        }, 1800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent">
            <div className="text-center relative">
                {/* Enhanced beautiful spinner */}
                <div className="relative mb-12">
                    {/* Outer rotating rings */}
                    <div className="absolute inset-0 w-32 h-32 mx-auto">
                        <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400 border-r-orange-400 rounded-full animate-spin"></div>
                        <div className="absolute inset-2 border-3 border-transparent border-b-blue-400 border-l-purple-400 rounded-full animate-spin" style={{animationDuration: '2s', animationDirection: 'reverse'}}></div>
                        <div className="absolute inset-4 border-2 border-transparent border-t-green-400 border-r-cyan-400 rounded-full animate-spin" style={{animationDuration: '1.5s'}}></div>
                    </div>
                    
                    {/* Central glowing logo */}
                    <div className="relative z-10 w-32 h-32 mx-auto flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-2xl animate-pulse">
                            <span className="drop-shadow-lg">₿</span>
                        </div>
                        
                        {/* Glowing effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-red-500/30 rounded-full blur-xl animate-pulse"></div>
                    </div>
                    
                    {/* Floating crypto symbols */}
                    {['Ξ', '🔥', '⚡', '☀️', '💎', '🚀'].map((symbol, i) => (
                        <div
                            key={i}
                            className="absolute text-lg font-bold text-yellow-400 animate-bounce opacity-70"
                            style={{
                                left: `${50 + 30 * Math.cos((i * Math.PI) / 3)}%`,
                                top: `${50 + 30 * Math.sin((i * Math.PI) / 3)}%`,
                                animationDelay: `${i * 0.3}s`,
                                animationDuration: `${2 + Math.random()}s`
                            }}
                        >
                            {symbol}
                        </div>
                    ))}
                </div>

                {/* Beautiful loading content */}
                <div className="space-y-6">
                    <div className="relative">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                            🚀 CRYPTO LEGENDS
                        </h3>
                        <div className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Blockchain Analytics Suite
                        </div>
                    </div>
                    
                    <div className="relative">
                        <p className="text-md text-gray-300 min-h-[1.5rem] font-medium">
                            {loadingText}
                        </p>
                        
                        {/* Typing indicator */}
                        <span className="inline-block w-2 h-5 bg-yellow-400 ml-1 animate-pulse"></span>
                    </div>

                    {/* Enhanced progress bar */}
                    <div className="w-80 mx-auto">
                        <div className="flex justify-between text-sm text-gray-400 mb-3">
                            <span className="font-medium">Scanning Progress</span>
                            <span className="font-bold text-yellow-400">{Math.round(progress)}%</span>
                        </div>
                        <div className="relative w-full bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                            <div 
                                className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 transition-all duration-1000 ease-out relative"
                                style={{ width: `${progress}%` }}
                            >
                                {/* Animated shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-pulse"></div>
                            </div>
                            
                            {/* Progress glow */}
                            <div 
                                className="absolute top-0 h-full bg-gradient-to-r from-yellow-400/50 to-orange-400/50 transition-all duration-1000 ease-out blur-sm"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Beautiful animated dots */}
                    <div className="flex justify-center space-x-3 mt-8">
                        {[...Array(4)].map((_, i) => (
                            <div 
                                key={i}
                                className="w-3 h-3 rounded-full animate-bounce"
                                style={{
                                    background: `linear-gradient(45deg, ${
                                        ['#fbbf24', '#f97316', '#3b82f6', '#8b5cf6'][i]
                                    }, ${['#f59e0b', '#ea580c', '#1d4ed8', '#7c3aed'][i]})`,
                                    animationDelay: `${i * 0.15}s`,
                                    animationDuration: '1.2s'
                                }}
                            />
                        ))}
                    </div>

                    {/* Network status indicators */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-blue-400/30 backdrop-blur-sm">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                Ξ
                            </div>
                            <span className="text-blue-400 font-semibold">Ethereum</span>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-yellow-400/30 backdrop-blur-sm">
                            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                🔥
                            </div>
                            <span className="text-yellow-400 font-semibold">BNB Chain</span>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.SpinningLogo = SpinningLogo;
