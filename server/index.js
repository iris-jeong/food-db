import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipeRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/history', historyRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
