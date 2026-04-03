// Mock process.env to avoid build errors from undefined API keys in missing .env files
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = "mock_key";
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "mock_domain";
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = "mock_project_id";
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "mock_bucket";
process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "mock_sender";
process.env.NEXT_PUBLIC_FIREBASE_APP_ID = "mock_app_id";
