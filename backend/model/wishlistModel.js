import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{ type: String, required: true }],
    isPublic: { type: Boolean, default: false },
    shareId: { type: String, unique: true }
}, { timestamps: true });

const wishlistModel = mongoose.models.wishlist || mongoose.model("wishlist", wishlistSchema);
export default wishlistModel;