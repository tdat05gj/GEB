// Firebase configuration and utilities
const firebaseConfig = {
    apiKey: window.ENV?.FIREBASE_API_KEY || "AIzaSyCQ-KOIC1yfsrKU-Y4sMEgWXM0yf0NHJ2s",
    authDomain: window.ENV?.FIREBASE_AUTH_DOMAIN || "gcat-2fd9e.firebaseapp.com",
    projectId: window.ENV?.FIREBASE_PROJECT_ID || "gcat-2fd9e",
    storageBucket: window.ENV?.FIREBASE_STORAGE_BUCKET || "gcat-2fd9e.firebasestorage.app",
    messagingSenderId: window.ENV?.FIREBASE_MESSAGING_SENDER_ID || "993954444216",
    appId: window.ENV?.FIREBASE_APP_ID || "1:993954444216:web:803bb4e32f00c3c9a4d54d",
    measurementId: window.ENV?.FIREBASE_MEASUREMENT_ID || "G-L434Z7LNJQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Firestore utilities
window.FirebaseUtils = {
    // Add or update user in leaderboard
    async updateLeaderboard(walletAddress, points, rank) {
        try {
            const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
            await db.collection('leaderboard').doc(walletAddress).set({
                walletAddress: shortAddress,
                fullAddress: walletAddress,
                points: points,
                rank: rank,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('Leaderboard updated successfully');
        } catch (error) {
            console.error('Error updating leaderboard:', error);
        }
    },

    // Get top 10 users from leaderboard
    async getLeaderboard() {
        try {
            const snapshot = await db.collection('leaderboard')
                .orderBy('points', 'desc')
                .limit(10)
                .get();
            
            const leaderboardData = [];
            snapshot.forEach(doc => {
                leaderboardData.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return leaderboardData;
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            return [];
        }
    },

    // Listen to real-time leaderboard updates
    onLeaderboardChange(callback) {
        return db.collection('leaderboard')
            .orderBy('points', 'desc')
            .limit(10)
            .onSnapshot(snapshot => {
                const leaderboardData = [];
                snapshot.forEach(doc => {
                    leaderboardData.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback(leaderboardData);
            });
    }
};
