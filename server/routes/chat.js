import express from 'express';
import { GoogleGenAI } from '@google/genai';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Per IP — Short Window (Spam Protection)
const shortWindowLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { error: "You're sending messages too fast. Please slow down! 😊" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Per IP — Hourly Window (Credit Protection)
const hourlyWindowLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 requests per windowMs
  message: { error: "You've reached the maximum number of chat messages for this hour. Please book a free call if you'd like to speak with our team directly!" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', shortWindowLimiter, hourlyWindowLimiter, async (req, res) => {
  try {
    const { history } = req.body;
    
    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ error: 'History array is required' });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(500).json({ error: 'Gemini API key is missing or invalid on the server.' });
    }

    // Initialize the Gemini client
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Format history for Gemini SDK (roles: "user" and "model")
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));
    
    // Generate content using the new SDK
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: "You are a helpful, professional, and friendly AI assistant for UPEX LABS, a digital agency. UPEX LABS builds premium websites, AI receptionists, and automated booking systems for local businesses, law firms, and dental clinics. Your goal is to answer questions about our services, pricing plans (Launchpad, Growth Engine, Full Stack AI), and help users book a free call. Keep your answers concise and helpful.",
      }
    });

    return res.json({ text: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to generate response from AI' });
  }
});

export default router;
