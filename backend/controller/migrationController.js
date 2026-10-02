import Product from "../model/productModel.js";

export const updateExistingProductsStock = async (req, res) => {
    try {
        const result = await Product.updateMany(
            { stock: { $exists: false } },
            { $set: { stock: 50 } }
        );
        
        res.json({ 
            success: true, 
            message: `Updated ${result.modifiedCount} products with default stock of 50`,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};