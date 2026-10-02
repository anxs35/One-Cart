import mongoose from "mongoose";

const loyaltySchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 },
    totalEarned: { type: Number, default: 0 },
    level: { type: String, default: "Bronze" }
}, { timestamps: true });

const loyaltyModel = mongoose.models.loyalty || mongoose.model("loyalty", loyaltySchema);
export default loyaltyModel;