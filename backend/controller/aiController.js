import { generateChatResponse, analyzeImageForSearch, getAIRecommendations } from '../utils/aiService.js';
import productModel from '../model/productModel.js';
import fs from 'fs';

// Chatbot Endpoint
const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;
        // Fetch up to 50 active products and pass their core info (name, id, price, category, etc.) as context
        const products = await productModel.find({}).select('_id name price category subCategory description').limit(50); 
        const context = JSON.stringify(products);

        const response = await generateChatResponse(message, context); // Pass context
        res.json({ success: true, response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "AI Chat failed" });
    }
};

// Visual Search Endpoint
const visualSearch = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        const filePath = req.file.path;
        const mimeType = req.file.mimetype;

        // Read file from disk
        const imageBuffer = fs.readFileSync(filePath);

        // 1. Analyze image to get keywords
        const keywordsText = await analyzeImageForSearch(imageBuffer, mimeType);
        const keywords = keywordsText.split(',').map(k => k.trim());

        console.log("Visual Search Keywords:", keywords);

        // Clean up: delete the uploaded file
        fs.unlinkSync(filePath);

        // 2. Search database using regex for these keywords
        // Construct a regex that matches any of the keywords
        const regexQueries = keywords.map(k => ({
            $or: [
                { name: { $regex: k, $options: 'i' } },
                { description: { $regex: k, $options: 'i' } },
                { category: { $regex: k, $options: 'i' } },
                { subCategory: { $regex: k, $options: 'i' } }
            ]
        }));

        const products = await productModel.find({ $or: regexQueries }).limit(10);

        res.json({ success: true, keywords, products });
    } catch (error) {
        // Try to clean up if error occurred
        if (req.file && req.file.path) {
            try { fs.unlinkSync(req.file.path); } catch (e) { console.error("Failed to delete temp file", e); }
        }
        console.error(error);
        res.status(500).json({ success: false, message: "Visual Search failed" });
    }
};

// Recommendations Endpoint
const getRecommendations = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentProduct = await productModel.findById(productId);

        if (!currentProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const allProducts = await productModel.find({});
        const recommendations = await getAIRecommendations(currentProduct.name, currentProduct.category, allProducts);

        res.json({ success: true, recommendations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Recommendation failed" });
    }
};

export { chatWithAI, visualSearch, getRecommendations };
