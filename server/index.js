import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import wiseRoutes from './routes/wise.js';
import questionnaireRoutes from './routes/questionnaire.js';
import chatRoutes from './routes/chat.js';
import connectDB from './config/db.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/wise', wiseRoutes);
app.use('/api/questionnaire', questionnaireRoutes);
app.use('/api/chat', chatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong on the server' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
