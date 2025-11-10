# Environment Configuration Setup

This project uses environment variables for configuration management. Here's how to set it up:

## Environment Files

### `.env.local` (Recommended for local development)

- **Purpose**: Local development overrides
- **Priority**: Highest (overrides other .env files)
- **Git**: Ignored (not committed to version control)
- **Use case**: Your personal local development settings

### `.env` (Fallback)

- **Purpose**: Default environment variables
- **Priority**: Medium
- **Git**: Ignored
- **Use case**: Default configuration for the project

### `.env.example` (Template)

- **Purpose**: Template for other developers
- **Priority**: None (just for reference)
- **Git**: Committed
- **Use case**: Shows what environment variables are needed

## Setup Instructions

1. **Copy the example file**:

   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your actual values** in `.env.local`:

   ```bash
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your_actual_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   # ... etc
   ```

3. **Restart your development server**:
   ```bash
   npm start
   ```

## Environment Variable Priority

React loads environment variables in this order (later ones override earlier ones):

1. `.env`
2. `.env.local`
3. `.env.development` (when NODE_ENV=development)
4. `.env.development.local`
5. `.env.production` (when NODE_ENV=production)
6. `.env.production.local`

## Available Environment Variables

### Firebase Configuration

- `REACT_APP_FIREBASE_API_KEY` - Your Firebase API key
- `REACT_APP_FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain
- `REACT_APP_FIREBASE_PROJECT_ID` - Your Firebase project ID
- `REACT_APP_FIREBASE_STORAGE_BUCKET` - Your Firebase storage bucket
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` - Your Firebase messaging sender ID
- `REACT_APP_FIREBASE_APP_ID` - Your Firebase app ID

### App Configuration

- `REACT_APP_ENV` - Environment name (local, development, production)
- `REACT_APP_API_URL` - API base URL

## Configuration Utility

The project includes a configuration utility at `src/utils/config/env.config.js` that:

- Validates required environment variables
- Provides helper methods for environment detection
- Centralizes configuration management

## Usage in Code

```javascript
import config from "../utils/config/env.config.js";

// Check environment
if (config.isDevelopment()) {
  console.log("Running in development mode");
}

// Get Firebase config
const firebaseConfig = config.getFirebaseConfig();
```

## Troubleshooting

If you get "invalid-api-key" errors:

1. Check that your `.env.local` file exists
2. Verify all Firebase variables are set correctly
3. Restart your development server
4. Check the browser console for validation errors

## Security Notes

- Never commit `.env.local` files to version control
- Use different Firebase projects for development and production
- Keep your API keys secure and rotate them regularly
