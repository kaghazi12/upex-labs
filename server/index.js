import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import wiseRoutes from './routes/wise.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/wise', wiseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong on the server' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
