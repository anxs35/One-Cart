import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateChatResponse = async (message, context = "") => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const systemPrompt = `You are the AI assistant for OneCart, a premium e-commerce store. 
        Your goal is to help customers find products, answer questions about policies, and provide support.
        Be polite, concise, and helpful. 
        When recommending or mentioning products based on the context, ALWAYS provide a direct markdown link to the product using this exact relative URL format: [Product Name](/productdetail/PRODUCT_ID) (replace PRODUCT_ID with the exact _id from context). Do not use full absolute URLs.
        Context about the store/products: ${context}`;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to assist OneCart customers." }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        throw new Error("Failed to generate chat response");
    }
};

export const analyzeImageForSearch = async (imageBuffer, mimeType) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = "Analyze this image and provide a comma-separated list of 3-5 keywords that describe the main product in this image. These keywords will be used to search a product database. Output ONLY the keywords, nothing else. Example: 'red running shoes, sneakers, footwear'";

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageBuffer.toString("base64"),
                    mimeType: mimeType,
                },
            },
        ]);

        return result.response.text();
    } catch (error) {
        console.error("Gemini Vision Error:", error);
        throw new Error("Failed to analyze image");
    }
};

export const getAIRecommendations = async (productName, category, allProducts) => {
    // Note: For a large catalog, we wouldn't pass allProducts here. 
    // We would use vector embeddings. For this project size, passing a subset is fine.
    // However, to keep it fast and robust without sending huge context, 
    // we'll implement a simple content-based filtering here first,
    // and optionally enhance it with Gemini if needed for "creative" suggestions.

    // Content-Based Filtering (Local Logic - Faster & Free)
    const keywords = productName.toLowerCase().split(" ");

    // Filter recommendations
    let recommendations = allProducts.filter(p => {
        if (p.name === productName) return false; // Don't recommend itself

        // Check for category match
        if (p.category === category) return true;

        // Check for name similarity
        const pName = p.name.toLowerCase();
        return keywords.some(k => pName.includes(k) && k.length > 3);
    });

    // If we have too many, shuffle and slice
    if (recommendations.length > 4) {
        recommendations = recommendations.sort(() => 0.5 - Math.random()).slice(0, 4);
    }

    // Fallback if no specific matches found
    if (recommendations.length === 0) {
        recommendations = allProducts.slice(0, 4);
    }

    return recommendations;
};
