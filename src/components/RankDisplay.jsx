const RankDisplay = ({ rank, points, isDark }) => {
    const [animatedPoints, setAnimatedPoints] = React.useState(0);

    React.useEffect(() => {
        // Animate points counter
        const duration = 1500;
        const steps = 50;
        const increment = points / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= points) {
                setAnimatedPoints(points);
                clearInterval(timer);
            } else {
                setAnimatedPoints(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [points]);

    if (!rank) return null;

    const progressPercentage = (points / rank.points) * 100;
    const nextRank = Web3Utils.calculateRank(rank.points + 1);
    const pointsToNext = nextRank.points - points;

    // Crypto-specific rank colors
    const getRankStyle = (rankName) => {
        const styles = {
            'BTC': 'from-orange-500 to-orange-600',
            'ETH': 'from-blue-500 to-purple-600',
            'XRP': 'from-blue-400 to-cyan-500',
            'BNB': 'from-yellow-400 to-yellow-500',
            'SOLANA': 'from-purple-500 to-pink-500',
            'DOGE': 'from-yellow-300 to-yellow-400'
        };
        return styles[rankName] || 'from-gray-500 to-gray-600';
    };

    // Get rank emoji
    const getRankEmoji = (rankName) => {
        const emojis = {
            'BTC': '₿',
            'ETH': 'Ξ',
            'XRP': '⚡',
            'BNB': '🔥',
            'SOLANA': '☀️',
            'DOGE': '🐕'
        };
        return emojis[rankName] || '🪙';
    };

    return (
        <div className={`relative rounded-3xl shadow-2xl p-8 mb-8 transition-all duration-500 ${
            isDark 
                ? 'bg-gradient-to-br from-gray-900 to-black border border-yellow-400/30' 
                : 'bg-gradient-to-br from-white to-gray-100 border border-yellow-500/30'
        } hover:shadow-yellow-400/20 hover:shadow-3xl`}>
            
            {/* Crypto grid pattern background */}
            <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-12 gap-1 h-full">
                    {[...Array(144)].map((_, i) => (
                        <div key={i} className="bg-yellow-400 rounded-sm animate-pulse" 
                             style={{animationDelay: `${Math.random() * 3}s`}}></div>
                    ))}
                </div>
            </div>
            <div className="relative text-center z-10">
                {/* Main rank display */}
                <div className="mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                            <img 
                                src={rank.logo} 
                                alt={`${rank.name} logo`}
                                className="w-24 h-24 rounded-full shadow-lg border-3 border-yellow-400 bg-white p-2"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div 
                                className="w-24 h-24 rounded-full shadow-lg border-3 border-yellow-400 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl font-bold text-white"
                                style={{display: 'none'}}
                            >
                                {getRankEmoji(rank.name)}
                            </div>
                        </div>
                        <div className="ml-6 text-left">
                            <h2 className={`text-3xl font-bold bg-gradient-to-r ${getRankStyle(rank.name)} bg-clip-text text-transparent mb-2`}>
                                {rank.name} TIER
                            </h2>
                            <div className={`text-4xl font-mono font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                {animatedPoints.toLocaleString()}
                                <span className="text-lg ml-2 opacity-70">TX</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress to next tier */}
                {pointsToNext > 0 ? (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Next: {nextRank.name} Tier
                            </span>
                            <span className={`text-sm font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                {pointsToNext.toLocaleString()} TX needed
                            </span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${
                            isDark ? 'bg-gray-700' : 'bg-gray-300'
                        }`}>
                            <div 
                                className={`h-full bg-gradient-to-r ${getRankStyle(rank.name)} transition-all duration-1000 ease-out`}
                                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                            ></div>
                        </div>
                        <div className="text-center mt-2">
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                {Math.min(progressPercentage, 100).toFixed(1)}% to next tier
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="mb-8 text-center">
                        <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${getRankStyle(rank.name)} text-white font-bold`}>
                            👑 MAXIMUM TIER ACHIEVED 👑
                        </div>
                    </div>
                )}

                {/* Compact stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
                    }`}>
                        <div className="text-2xl mb-2">📊</div>
                        <div className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Tier Floor
                        </div>
                        <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {rank.points.toLocaleString()}
                        </div>
                    </div>
                    
                    <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
                    }`}>
                        <div className="text-2xl mb-2">⚡</div>
                        <div className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Your Power
                        </div>
                        <div className={`text-lg font-bold bg-gradient-to-r ${getRankStyle(rank.name)} bg-clip-text text-transparent`}>
                            {animatedPoints.toLocaleString()}
                        </div>
                    </div>
                    
                    <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
                    }`}>
                        <div className="text-2xl mb-2">🎯</div>
                        <div className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Rank Score
                        </div>
                        <div className={`text-lg font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                            {((points / rank.points) * 100).toFixed(1)}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.RankDisplay = RankDisplay;
