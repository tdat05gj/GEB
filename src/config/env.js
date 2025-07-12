// Environment variables loader for client-side app
// Since this is a client-side app, we need to load env vars differently
window.ENV = {
    // Load from actual environment or fallback to hardcoded values
    ETHERSCAN_API_KEY: 'SJZFPVABWQFXJ9TC42FJK96T89VJRGJQU9',
    BSCSCAN_API_KEY: '13WE3YP5VZZGK1HHTSUWBZWBDT51359ZTZ',
    
    // Firebase config
    FIREBASE_API_KEY: 'AIzaSyCQ-KOIC1yfsrKU-Y4sMEgWXM0yf0NHJ2s',
    FIREBASE_AUTH_DOMAIN: 'gcat-2fd9e.firebaseapp.com',
    FIREBASE_PROJECT_ID: 'gcat-2fd9e',
    FIREBASE_STORAGE_BUCKET: 'gcat-2fd9e.firebasestorage.app',
    FIREBASE_MESSAGING_SENDER_ID: '993954444216',
    FIREBASE_APP_ID: '1:993954444216:web:803bb4e32f00c3c9a4d54d',
    FIREBASE_MEASUREMENT_ID: 'G-L434Z7LNJQ'
};

// For development, you can override these values by creating a config.js file
// and including it before this script
