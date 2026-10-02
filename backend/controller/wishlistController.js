import wishlistModel from "../model/wishlistModel.js";

const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;
        
        let wishlist = await wishlistModel.findOne({ userId });
        if (!wishlist) {
            wishlist = new wishlistModel({ userId, products: [productId] });
        } else {
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId);
            }
        }
        await wishlist.save();
        res.json({ success: true, message: "Added to wishlist" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const getWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        const wishlist = await wishlistModel.findOne({ userId });
        res.json({ success: true, wishlist: wishlist?.products || [] });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const shareWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        let wishlist = await wishlistModel.findOne({ userId });
        if (!wishlist.shareId) {
            wishlist.shareId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
            wishlist.isPublic = true;
            await wishlist.save();
        }
        res.json({ success: true, shareId: wishlist.shareId });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { addToWishlist, getWishlist, shareWishlist };