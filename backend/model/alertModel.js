import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const alertModel = mongoose.models.alert || mongoose.model("alert", alertSchema);
export default alertModel;