const CryptoMemories = ({ memories, isDark }) => {
    if (!memories) return null;

    const formatNumber = (num) => {
        return Number(num).toFixed(6);
    };

    const formatAge = (age) => {
        const parts = [];
        if (age.years > 0) parts.push(`${age.years}y`);
        if (age.months > 0) parts.push(`${age.months}m`);
        if (age.days > 0) parts.push(`${age.days}d`);
        return parts.join(' ') || '0d';
    };

    return (
        <div className={`rounded-3xl shadow-2xl p-8 mb-8 transition-all duration-500 relative overflow-hidden ${
            isDark 
                ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-black border border-purple-400/30' 
                : 'bg-gradient-to-br from-white via-purple-50 to-gray-100 border border-purple-500/30'
        } hover:shadow-purple-400/30 hover:shadow-3xl`}>
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10">
                <div className="text-center mb-10">
                    <h3 className={`text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent`}>
                        💎 Wallet Journey
                    </h3>
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Your complete on-chain story
                    </p>
                </div>

                {/* Wallet Age - Special highlight */}
                <div className={`mb-8 p-6 rounded-2xl text-center ${
                    isDark 
                        ? 'bg-gradient-to-r from-purple-800/50 to-pink-800/50 border border-purple-400/50' 
                        : 'bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300'
                }`}>
                    <div className="flex items-center justify-center mb-4">
                        <div className="text-6xl mr-4">⏰</div>
                        <div>
                            <h4 className={`text-2xl font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                                Wallet Age
                            </h4>
                            <div className={`text-4xl font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {formatAge(memories.walletAge)}
                            </div>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Time since first transaction
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ethereum Section */}
                <div className="mb-8">
                    <div className="flex items-center mb-6">
                        <img 
                            src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/eth.svg" 
                            alt="Ethereum" 
                            className="w-8 h-8 mr-3"
                        />
                        <h4 className={`text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}>
                            Ethereum Network
                        </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ETH Sent */}
                        <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 group ${
                            isDark 
                                ? 'bg-gray-800/50 border border-blue-500/30 hover:border-blue-400' 
                                : 'bg-white/80 border border-blue-300 hover:border-blue-500'
                        }`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-4xl">📤</div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-600'
                                }`}>
                                    SENT
                                </div>
                            </div>
                            <div className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {formatNumber(memories.ethSent)}
                            </div>
                            <div className={`text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}>
                                ETH
                            </div>
                            <div className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Total outbound transfers
                            </div>
                        </div>

                        {/* ETH Received */}
                        <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 group ${
                            isDark 
                                ? 'bg-gray-800/50 border border-blue-500/30 hover:border-blue-400' 
                                : 'bg-white/80 border border-blue-300 hover:border-blue-500'
                        }`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-4xl">📥</div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'
                                }`}>
                                    RECEIVED
                                </div>
                            </div>
                            <div className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {formatNumber(memories.ethReceived)}
                            </div>
                            <div className={`text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}>
                                ETH
                            </div>
                            <div className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Total inbound transfers
                            </div>
                        </div>
                    </div>
                </div>

                {/* BNB Section */}
                <div className="mb-8">
                    <div className="flex items-center mb-6">
                        <img 
                            src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/bnb.svg" 
                            alt="BNB" 
                            className="w-8 h-8 mr-3"
                        />
                        <h4 className={`text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent`}>
                            BNB Smart Chain
                        </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* BNB Sent */}
                        <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 group ${
                            isDark 
                                ? 'bg-gray-800/50 border border-yellow-500/30 hover:border-yellow-400' 
                                : 'bg-white/80 border border-yellow-300 hover:border-yellow-500'
                        }`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-4xl">📤</div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-600'
                                }`}>
                                    SENT
                                </div>
                            </div>
                            <div className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {formatNumber(memories.bnbSent)}
                            </div>
                            <div className={`text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent`}>
                                BNB
                            </div>
                            <div className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Total outbound transfers
                            </div>
                        </div>

                        {/* BNB Received */}
                        <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 group ${
                            isDark 
                                ? 'bg-gray-800/50 border border-yellow-500/30 hover:border-yellow-400' 
                                : 'bg-white/80 border border-yellow-300 hover:border-yellow-500'
                        }`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-4xl">📥</div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'
                                }`}>
                                    RECEIVED
                                </div>
                            </div>
                            <div className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {formatNumber(memories.bnbReceived)}
                            </div>
                            <div className={`text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent`}>
                                BNB
                            </div>
                            <div className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Total inbound transfers
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gas Fees Section */}
                <div className="mb-8">
                    <div className="text-center mb-6">
                        <h4 className={`text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2`}>
                            🔥 Gas Burned
                        </h4>
                        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Network fees across blockchains
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ETH Gas */}
                        <div className={`p-8 rounded-3xl transition-all duration-300 hover:scale-105 group relative overflow-hidden ${
                            isDark 
                                ? 'bg-gradient-to-br from-blue-900/50 via-blue-800/30 to-purple-900/50 border-2 border-blue-500/40 hover:border-blue-400/60' 
                                : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-300 hover:border-blue-500'
                        }`}>
                            {/* Animated background */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl animate-pulse"></div>
                                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl animate-pulse delay-500"></div>
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        <img 
                                            src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/eth.svg" 
                                            alt="Ethereum" 
                                            className="w-12 h-12 mr-3"
                                        />
                                        <div className="text-6xl">⛽</div>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                                        isDark ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' : 'bg-blue-100 text-blue-700 border border-blue-300'
                                    }`}>
                                        ETHEREUM
                                    </div>
                                </div>
                                <div className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {formatNumber(memories.ethGasFees || 0)}
                                </div>
                                <div className={`text-xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}>
                                    ETH
                                </div>
                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Gas fees on Ethereum network
                                </div>
                                <div className={`mt-4 p-3 rounded-xl ${
                                    isDark ? 'bg-blue-500/10' : 'bg-blue-50'
                                }`}>
                                    <div className={`text-xs font-medium ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                                        Network Activity
                                    </div>
                                    <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Smart Contract Interactions
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BNB Gas */}
                        <div className={`p-8 rounded-3xl transition-all duration-300 hover:scale-105 group relative overflow-hidden ${
                            isDark 
                                ? 'bg-gradient-to-br from-yellow-900/50 via-orange-800/30 to-red-900/50 border-2 border-yellow-500/40 hover:border-yellow-400/60' 
                                : 'bg-gradient-to-br from-yellow-50 via-white to-orange-50 border-2 border-yellow-300 hover:border-yellow-500'
                        }`}>
                            {/* Animated background */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-2xl animate-pulse"></div>
                                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-xl animate-pulse delay-500"></div>
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        <img 
                                            src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/bnb.svg" 
                                            alt="BNB" 
                                            className="w-12 h-12 mr-3"
                                        />
                                        <div className="text-6xl">⛽</div>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                                        isDark ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                    }`}>
                                        BNB CHAIN
                                    </div>
                                </div>
                                <div className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {formatNumber(memories.bnbGasFees || 0)}
                                </div>
                                <div className={`text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent`}>
                                    BNB
                                </div>
                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Gas fees on BNB Smart Chain
                                </div>
                                <div className={`mt-4 p-3 rounded-xl ${
                                    isDark ? 'bg-yellow-500/10' : 'bg-yellow-50'
                                }`}>
                                    <div className={`text-xs font-medium ${isDark ? 'text-yellow-300' : 'text-yellow-600'}`}>
                                        Network Activity
                                    </div>
                                    <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        DeFi & DEX Transactions
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Portfolio Summary */}
                <div className={`mt-8 p-8 rounded-3xl relative overflow-hidden ${
                    isDark 
                        ? 'bg-gradient-to-br from-gray-800/80 via-gray-700/60 to-gray-800/80 border-2 border-gray-600/50' 
                        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 border-2 border-gray-200'
                }`}>
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-6 left-6 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl animate-pulse"></div>
                        <div className="absolute bottom-6 right-6 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <h4 className={`text-2xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent`}>
                                📊 Portfolio Analytics
                            </h4>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Complete blockchain activity overview
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div className={`p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${
                                isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
                            }`}>
                                <div className="text-3xl mb-2">Ξ</div>
                                <div className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                                    {formatNumber(memories.ethSent + memories.ethReceived)}
                                </div>
                                <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    ETH Volume
                                </div>
                            </div>
                            
                            <div className={`p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${
                                isDark ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'
                            }`}>
                                <div className="text-3xl mb-2">🔥</div>
                                <div className={`text-xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                    {formatNumber(memories.bnbSent + memories.bnbReceived)}
                                </div>
                                <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    BNB Volume
                                </div>
                            </div>
                            
                            <div className={`p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${
                                isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'
                            }`}>
                                <div className="text-3xl mb-2">💰</div>
                                <div className={`text-xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                                    {formatNumber((memories.ethReceived + memories.bnbReceived) - (memories.ethSent + memories.bnbSent))}
                                </div>
                                <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Net Flow
                                </div>
                            </div>
                            
                            <div className={`p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${
                                isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
                            }`}>
                                <div className="text-3xl mb-2">⛽</div>
                                <div className={`text-xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                                    {formatNumber(memories.totalGasFees)}
                                </div>
                                <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Total Gas
                                </div>
                            </div>
                            
                            <div className={`p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${
                                isDark ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'
                            }`}>
                                <div className="text-3xl mb-2">🚀</div>
                                <div className={`text-xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                                    {formatNumber(memories.ethSent + memories.ethReceived + memories.bnbSent + memories.bnbReceived)}
                                </div>
                                <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Total Volume
                                </div>
                            </div>
                        </div>
                        
                        {/* Performance metrics */}
                        <div className={`mt-6 p-4 rounded-xl ${
                            isDark ? 'bg-gray-700/30' : 'bg-gray-100/50'
                        }`}>
                            <div className="flex justify-between items-center text-sm">
                                <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="font-medium">Activity Score:</span> 
                                    <span className="ml-2 font-bold text-green-500">
                                        {((memories.ethSent + memories.ethReceived + memories.bnbSent + memories.bnbReceived) * 100).toFixed(0)}
                                    </span>
                                </div>
                                <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="font-medium">Gas Efficiency:</span> 
                                    <span className="ml-2 font-bold text-blue-500">
                                        {((memories.totalGasFees / (memories.ethSent + memories.ethReceived + memories.bnbSent + memories.bnbReceived + 0.001)) * 100).toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.CryptoMemories = CryptoMemories;
