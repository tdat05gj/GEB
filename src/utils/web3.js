// Web3 utilities for fetching transaction data
window.Web3Utils = {
    // API keys from environment
    ETHERSCAN_API_KEY: window.ENV?.ETHERSCAN_API_KEY || 'SJZFPVABWQFXJ9TC42FJK96T89VJRGJQU9',
    BSCSCAN_API_KEY: window.ENV?.BSCSCAN_API_KEY || '13WE3YP5VZZGK1HHTSUWBZWBDT51359ZTZ',

    // Calculate rank based on points
    calculateRank(points) {
        if (points >= 11111) return { 
            name: 'BTC', 
            points: 11111, 
            logo: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/btc.svg'
        };
        if (points >= 3333) return { 
            name: 'ETH', 
            points: 3333, 
            logo: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/eth.svg'
        };
        if (points >= 2222) return { 
            name: 'XRP', 
            points: 2222, 
            logo: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/xrp.svg'
        };
        if (points >= 444) return { 
            name: 'BNB', 
            points: 444, 
            logo: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/bnb.svg'
        };
        if (points >= 222) return { 
            name: 'SOLANA', 
            points: 222, 
            logo: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sol.svg'
        };
        return { 
            name: 'DOGE', 
            points: 66, 
            logo: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/doge.svg'
        };
    },

    // Fetch Ethereum transactions
    async fetchEthereumTransactions(address) {
        try {
            // Fetch normal transactions
            const normalTxResponse = await fetch(
                `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${this.ETHERSCAN_API_KEY}`
            );
            const normalTxData = await normalTxResponse.json();
            
            // Fetch internal transactions
            const internalTxResponse = await fetch(
                `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${this.ETHERSCAN_API_KEY}`
            );
            const internalTxData = await internalTxResponse.json();

            const transactions = [];
            
            // Process normal transactions
            if (normalTxData.status === '1' && normalTxData.result) {
                transactions.push(...normalTxData.result.map(tx => ({
                    ...tx,
                    network: 'ethereum',
                    type: 'normal',
                    value: Web3.utils.fromWei(tx.value, 'ether'),
                    gasUsed: tx.gasUsed,
                    gasPrice: tx.gasPrice
                })));
            }

            // Process internal transactions
            if (internalTxData.status === '1' && internalTxData.result) {
                transactions.push(...internalTxData.result.map(tx => ({
                    ...tx,
                    network: 'ethereum',
                    type: 'internal',
                    value: Web3.utils.fromWei(tx.value, 'ether'),
                    gasUsed: tx.gasUsed || '0',
                    gasPrice: tx.gasPrice || '0'
                })));
            }

            return transactions;
        } catch (error) {
            console.error('Error fetching Ethereum transactions:', error);
            return [];
        }
    },

    // Fetch BNB Smart Chain transactions
    async fetchBNBTransactions(address) {
        try {
            // Fetch normal transactions
            const normalTxResponse = await fetch(
                `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${this.BSCSCAN_API_KEY}`
            );
            const normalTxData = await normalTxResponse.json();
            
            // Fetch internal transactions
            const internalTxResponse = await fetch(
                `https://api.bscscan.com/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${this.BSCSCAN_API_KEY}`
            );
            const internalTxData = await internalTxResponse.json();

            const transactions = [];
            
            // Process normal transactions
            if (normalTxData.status === '1' && normalTxData.result) {
                transactions.push(...normalTxData.result.map(tx => ({
                    ...tx,
                    network: 'bnb',
                    type: 'normal',
                    value: Web3.utils.fromWei(tx.value, 'ether'),
                    gasUsed: tx.gasUsed,
                    gasPrice: tx.gasPrice
                })));
            }

            // Process internal transactions
            if (internalTxData.status === '1' && internalTxData.result) {
                transactions.push(...internalTxData.result.map(tx => ({
                    ...tx,
                    network: 'bnb',
                    type: 'internal',
                    value: Web3.utils.fromWei(tx.value, 'ether'),
                    gasUsed: tx.gasUsed || '0',
                    gasPrice: tx.gasPrice || '0'
                })));
            }

            return transactions;
        } catch (error) {
            console.error('Error fetching BNB transactions:', error);
            return [];
        }
    },

    // Calculate crypto memories from transactions
    calculateCryptoMemories(transactions, address) {
        const memories = {
            walletAge: { years: 0, months: 0, days: 0 },
            ethSent: 0,
            ethReceived: 0,
            bnbSent: 0,
            bnbReceived: 0,
            totalGasFees: 0
        };

        if (transactions.length === 0) return memories;

        // Calculate wallet age from first transaction
        const firstTx = transactions.sort((a, b) => parseInt(a.timeStamp) - parseInt(b.timeStamp))[0];
        const firstTxDate = new Date(parseInt(firstTx.timeStamp) * 1000);
        const now = new Date();
        const diffTime = Math.abs(now - firstTxDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        memories.walletAge.years = Math.floor(diffDays / 365);
        memories.walletAge.months = Math.floor((diffDays % 365) / 30);
        memories.walletAge.days = diffDays % 30;

        // Calculate sent/received amounts and gas fees
        transactions.forEach(tx => {
            const value = parseFloat(tx.value);
            const gasUsed = parseFloat(tx.gasUsed || 0);
            const gasPrice = parseFloat(tx.gasPrice || 0);
            const gasFee = (gasUsed * gasPrice) / 1e18; // Convert to ETH/BNB

            memories.totalGasFees += gasFee;

            // Track gas fees by network
            if (tx.network === 'ethereum') {
                memories.ethGasFees = (memories.ethGasFees || 0) + gasFee;
            } else if (tx.network === 'bnb') {
                memories.bnbGasFees = (memories.bnbGasFees || 0) + gasFee;
            }

            if (tx.from.toLowerCase() === address.toLowerCase()) {
                // Sent transaction
                if (tx.network === 'ethereum') {
                    memories.ethSent += value;
                } else if (tx.network === 'bnb') {
                    memories.bnbSent += value;
                }
            }

            if (tx.to.toLowerCase() === address.toLowerCase()) {
                // Received transaction
                if (tx.network === 'ethereum') {
                    memories.ethReceived += value;
                } else if (tx.network === 'bnb') {
                    memories.bnbReceived += value;
                }
            }
        });

        return memories;
    },

    // Validate Ethereum address
    isValidAddress(address) {
        return Web3.utils.isAddress(address);
    }
};
