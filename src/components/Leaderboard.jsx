const Leaderboard = ({ isDark }) => {
    const [leaderboardData, setLeaderboardData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Initial load
        loadLeaderboard();
        
        // Set up real-time listener
        const unsubscribe = FirebaseUtils.onLeaderboardChange((data) => {
            setLeaderboardData(data);
            setLoading(false);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    const loadLeaderboard = async () => {
        try {
            const data = await FirebaseUtils.getLeaderboard();
            setLeaderboardData(data);
        } catch (error) {
            console.error('Error loading leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRankInfo = (points) => {
        return Web3Utils.calculateRank(points);
    };

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

    const getRankPosition = (index) => {
        const positions = ['🥇', '🥈', '🥉'];
        return positions[index] || `${index + 1}`;
    };

    if (loading) {
        return (
            <div className={`rounded-xl shadow-2xl p-8 mb-8 transition-all duration-300 ${
                isDark 
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-yellow-400' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-2 border-yellow-600'
            }`}>
                <h3 className={`text-2xl font-bold mb-6 text-center ${
                    isDark ? 'text-yellow-400' : 'text-yellow-600'
                }`}>
                    🏆 Leaderboard
                </h3>
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`rounded-3xl shadow-2xl p-8 mb-8 transition-all duration-500 ${
            isDark 
                ? 'bg-gradient-to-br from-gray-900 to-black border border-green-400/30' 
                : 'bg-gradient-to-br from-white to-gray-100 border border-green-500/30'
        } hover:shadow-green-400/20 hover:shadow-3xl`}>
            <h3 className={`text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent`}>
                🏆 Global Leaderboard
            </h3>

            {leaderboardData.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-8xl mb-6">📊</div>
                    <p className={`text-xl ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        Be the first crypto legend!
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {leaderboardData.map((entry, index) => {
                        const rankInfo = getRankInfo(entry.points);
                        const isTop3 = index < 3;
                        return (
                            <div 
                                key={entry.id}
                                className={`flex items-center p-6 rounded-2xl transition-all duration-300 hover:scale-102 ${
                                    isDark 
                                        ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-green-400/50' 
                                        : 'bg-white/50 hover:bg-white border border-gray-200 hover:border-green-500/50'
                                } ${isTop3 ? 'shadow-lg' : 'shadow-md'} hover:shadow-xl`}
                            >
                                {/* Rank Position */}
                                <div className="flex items-center justify-center w-16 h-16 mr-6">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                                        isTop3 
                                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' 
                                            : isDark 
                                                ? 'bg-gray-700 text-gray-300' 
                                                : 'bg-gray-200 text-gray-700'
                                    }`}>
                                        {getRankPosition(index)}
                                    </div>
                                </div>

                                {/* Crypto Logo */}
                                <div className="mr-6">
                                    <img 
                                        src={rankInfo.logo} 
                                        alt={`${rankInfo.name} logo`}
                                        className="w-12 h-12 rounded-full border-2 border-gray-300 bg-white p-1 shadow-md"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div 
                                        className="w-12 h-12 rounded-full border-2 border-gray-300 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-sm font-bold text-white shadow-md"
                                        style={{display: 'none'}}
                                    >
                                        {rankInfo.name.charAt(0)}
                                    </div>
                                </div>

                                {/* Wallet Info */}
                                <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                        <code className={`text-lg font-mono font-bold mr-3 ${
                                            isDark ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            {entry.walletAddress}
                                        </code>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${
                                            getRankStyle(rankInfo.name)} text-white shadow-sm`}>
                                            {rankInfo.name}
                                        </span>
                                    </div>
                                    <div className={`text-sm ${
                                        isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                        {entry.points.toLocaleString()} transactions
                                    </div>
                                </div>

                                {/* Points Display */}
                                <div className="text-right">
                                    <div className={`text-2xl font-bold bg-gradient-to-r ${getRankStyle(rankInfo.name)} bg-clip-text text-transparent`}>
                                        {entry.points.toLocaleString()}
                                    </div>
                                    <div className={`text-sm ${
                                        isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                        TX Power
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Footer Stats */}
            <div className={`mt-8 p-6 rounded-2xl text-center ${
                isDark 
                    ? 'bg-gray-800/30 border border-gray-700' 
                    : 'bg-gray-100/50 border border-gray-200'
            }`}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                    <div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                            {leaderboardData.length}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Active Wallets
                        </div>
                    </div>
                    <div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                            {leaderboardData.reduce((sum, entry) => sum + entry.points, 0).toLocaleString()}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Total TX Analyzed
                        </div>
                    </div>
                    <div className="md:block hidden">
                        <div className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                            Live
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Real-time Updates
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Leaderboard = Leaderboard;
