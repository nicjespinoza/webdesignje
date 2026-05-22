import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
console.log('OPENAI_API_KEY:', !!process.env.OPENAI_API_KEY);
console.log('GEMINI_API_KEY:', !!process.env.GEMINI_API_KEY);
