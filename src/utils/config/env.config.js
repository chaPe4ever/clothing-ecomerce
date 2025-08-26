// Environment configuration utility
const config = {
  // Firebase Configuration
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  },

  // App Configuration
  app: {
    env: process.env.REACT_APP_ENV || "development",
    apiUrl: process.env.REACT_APP_API_URL || "http://localhost:3000",
  },

  stripe: {
    publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  },

  // Helper methods
  isDevelopment() {
    return this.app.env === "development" || this.app.env === "local";
  },

  isProduction() {
    return this.app.env === "production";
  },

  getFirebaseConfig() {
    return this.firebase;
  },

  getStripe() {
    return this.stripe;
  },
};

export default config;
