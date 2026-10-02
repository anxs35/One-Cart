import mongoose from "mongoose";

const stockNotificationSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    type: { type: String, default: "OUT_OF_STOCK" }
}, { timestamps: true });

const stockNotificationModel = mongoose.models.stockNotification || mongoose.model("stockNotification", stockNotificationSchema);
export default stockNotificationModel;