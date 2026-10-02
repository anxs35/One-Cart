import express from 'express';
import { chatWithAI, visualSearch, getRecommendations } from '../controller/aiController.js';
import upload from '../middleware/multer.js'; // Assuming you have a multer middleware

const aiRouter = express.Router();

aiRouter.post('/chat', chatWithAI);
aiRouter.post('/visual-search', upload.single('image'), visualSearch);
aiRouter.post('/recommend', getRecommendations);

export default aiRouter;
