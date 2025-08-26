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

  // Validation
  validate() {
    // Debug: Log all environment variables
    console.log("Environment variables check:");
    console.log(
      "REACT_APP_FIREBASE_API_KEY:",
      process.env.REACT_APP_FIREBASE_API_KEY ? "✓ Set" : "✗ Missing"
    );
    console.log(
      "REACT_APP_FIREBASE_AUTH_DOMAIN:",
      process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? "✓ Set" : "✗ Missing"
    );
    console.log(
      "REACT_APP_FIREBASE_PROJECT_ID:",
      process.env.REACT_APP_FIREBASE_PROJECT_ID ? "✓ Set" : "✗ Missing"
    );
    console.log(
      "REACT_APP_FIREBASE_STORAGE_BUCKET:",
      process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ? "✓ Set" : "✗ Missing"
    );
    console.log(
      "REACT_APP_FIREBASE_MESSAGING_SENDER_ID:",
      process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ? "✓ Set" : "✗ Missing"
    );
    console.log(
      "REACT_APP_FIREBASE_APP_ID:",
      process.env.REACT_APP_FIREBASE_APP_ID ? "✓ Set" : "✗ Missing"
    );
    console.log(
      "REACT_APP_MEASUREMENT_ID:",
      process.env.REACT_APP_MEASUREMENT_ID ? "✓ Set" : "✗ Missing"
    );
    console.log(
      "REACT_APP_STRIPE_PUBLISHABLE_KEY:",
      process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ? "✓ Set" : "✗ Missing"
    );

    const requiredFirebaseVars = [
      "apiKey",
      "authDomain",
      "projectId",
      "storageBucket",
      "messagingSenderId",
      "appId",
      "measurementId",
    ];

    const missingVars = requiredFirebaseVars.filter(
      (varName) => !this.firebase[varName]
    );

    if (missingVars.length > 0) {
      console.error(
        "Missing required Firebase environment variables:",
        missingVars
      );
      console.error("Please check your .env.local file");
      console.error(
        "Make sure to restart your development server after creating .env files"
      );
      return false;
    }

    return true;
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

// Only validate in production or if explicitly requested
const shouldValidate =
  process.env.NODE_ENV === "production" ||
  process.env.REACT_APP_VALIDATE_CONFIG === "true";

if (shouldValidate && !config.validate()) {
  throw new Error("Invalid environment configuration");
} else if (!shouldValidate) {
  // In development, just log the validation result without throwing
  config.validate();
}

export default config;
