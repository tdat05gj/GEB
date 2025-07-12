const { useState, useEffect } = React;

const App = () => {
    // State management
    const [isDark, setIsDark] = useState(true);
    const [walletAddress, setWalletAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [transactionData, setTransactionData] = useState(null);
    const [userRank, setUserRank] = useState(null);
    const [userPoints, setUserPoints] = useState(0);
    const [cryptoMemories, setCryptoMemories] = useState(null);

    // Theme toggle
    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    // Fetch wallet data
    const fetchWalletData = async () => {
        if (!walletAddress) {
            setError('Please enter a valid wallet address');
            return;
        }

        if (!Web3Utils.isValidAddress(walletAddress)) {
            setError('Invalid wallet address format');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Fetch transactions from both networks
            const [ethTransactions, bnbTransactions] = await Promise.all([
                Web3Utils.fetchEthereumTransactions(walletAddress),
                Web3Utils.fetchBNBTransactions(walletAddress)
            ]);

            const allTransactions = [...ethTransactions, ...bnbTransactions];
            setTransactionData(allTransactions);

            // Calculate points (1 point per transaction)
            const totalPoints = allTransactions.length;
            setUserPoints(totalPoints);

            // Calculate rank
            const rank = Web3Utils.calculateRank(totalPoints);
            setUserRank(rank);

            // Calculate crypto memories
            const memories = Web3Utils.calculateCryptoMemories(allTransactions, walletAddress);
            setCryptoMemories(memories);

            // Update leaderboard
            await FirebaseUtils.updateLeaderboard(walletAddress, totalPoints, rank.name);

        } catch (error) {
            console.error('Error fetching wallet data:', error);
            setError('Failed to fetch wallet data. Please check your wallet address and try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle wallet input change
    const handleWalletChange = (e) => {
        setWalletAddress(e.target.value);
        setError('');
    };

    // Handle enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchWalletData();
        }
    };

    // Clear data
    const clearData = () => {
        setWalletAddress('');
        setTransactionData(null);
        setUserRank(null);
        setUserPoints(0);
        setCryptoMemories(null);
        setError('');
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            isDark ? 'bg-black text-white' : 'bg-white text-gray-900'
        }`}>
            {/* Theme Toggle */}
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <SpinningLogo />
                </div>
            )}

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <header className="text-center mb-12 slide-in-up">
                    <div className="mb-8">
                        {/* Animated title with particles */}
                        <div className="relative">
                            <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${
                                isDark 
                                    ? 'from-yellow-400 via-orange-400 to-yellow-600' 
                                    : 'from-yellow-600 via-orange-500 to-yellow-800'
                            } bg-clip-text text-transparent neon-text`}>
                                ⚡ CRYPTO LEGENDS ⚡
                            </h1>
                            
                            {/* Floating particles around title */}
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-yellow-400 rounded-full particle-effect"
                                    style={{
                                        left: `${20 + Math.random() * 60}%`,
                                        top: `${20 + Math.random() * 60}%`,
                                        animationDelay: `${i * 0.5}s`
                                    }}
                                />
                            ))}
                        </div>
                        
                        <p className={`text-xl md:text-2xl mb-4 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                        } font-medium`}>
                            🌟 Discover Your Ultimate Crypto Power Level 🌟
                        </p>
                        
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl animate-bounce">🚀</span>
                                <span className={isDark ? 'text-yellow-400' : 'text-yellow-600'}>Real-time Analysis</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>⚡</span>
                                <span className={isDark ? 'text-yellow-400' : 'text-yellow-600'}>Live Leaderboard</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl animate-bounce" style={{animationDelay: '0.4s'}}>💎</span>
                                <span className={isDark ? 'text-yellow-400' : 'text-yellow-600'}>Epic Rankings</span>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Wallet Input */}
                    <div className="max-w-3xl mx-auto mb-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={walletAddress}
                                    onChange={handleWalletChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter your legendary wallet address (0x...)"
                                    className={`w-full px-8 py-5 rounded-2xl border-2 transition-all duration-500 focus:outline-none focus:ring-4 text-lg font-mono shadow-lg ${
                                        isDark 
                                            ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20 hover:border-yellow-500' 
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-yellow-600 focus:ring-yellow-600/20 hover:border-yellow-600'
                                    } hover-glow`}
                                />
                                {/* Input decoration */}
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <span className="text-2xl animate-pulse">🔍</span>
                                </div>
                            </div>
                            
                            <button
                                onClick={fetchWalletData}
                                disabled={loading || !walletAddress}
                                className={`px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-2xl ${
                                    isDark 
                                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 focus:ring-4 focus:ring-yellow-400/20' 
                                        : 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-700 hover:to-orange-700 focus:ring-4 focus:ring-yellow-600/20'
                                } glow-effect`}
                            >
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                        <span>Analyzing...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl">⚡</span>
                                        <span>SCAN POWER</span>
                                        <span className="text-xl">⚡</span>
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Clear button */}
                        {(transactionData || error) && (
                            <button
                                onClick={clearData}
                                className={`mt-4 px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                                    isDark 
                                        ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                Clear Results
                            </button>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className={`mt-4 p-4 rounded-lg border-l-4 ${
                                isDark 
                                    ? 'bg-red-900/20 border-red-400 text-red-400' 
                                    : 'bg-red-50 border-red-500 text-red-700'
                            }`}>
                                <div className="flex items-center">
                                    <span className="text-lg mr-2">⚠️</span>
                                    <span>{error}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Results Section */}
                {transactionData && !loading && (
                    <div className="space-y-8">
                        {/* Rank Display */}
                        <RankDisplay 
                            rank={userRank} 
                            points={userPoints} 
                            isDark={isDark} 
                        />

                        {/* Crypto Memories */}
                        <CryptoMemories 
                            memories={cryptoMemories} 
                            isDark={isDark} 
                        />
                    </div>
                )}

                {/* Leaderboard - Always visible */}
                <Leaderboard isDark={isDark} />

                {/* Simple Footer */}
                <footer className={`text-center py-8 border-t mt-16 ${
                    isDark 
                        ? 'border-gray-800 text-gray-400' 
                        : 'border-gray-200 text-gray-600'
                }`}>
                    <div className="space-y-4">
                        <div className={`text-lg font-bold bg-gradient-to-r ${
                            isDark 
                                ? 'from-purple-400 to-pink-400' 
                                : 'from-purple-600 to-pink-600'
                        } bg-clip-text text-transparent`}>
                            💎 CRYPTO LEGENDS
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            Real-time blockchain analytics & wallet insights
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
