import alertModel from "../model/alertModel.js";

const createAlert = async (req, res) => {
    try {
        const { productId, email } = req.body;
        const userId = req.userId;
        
        const existingAlert = await alertModel.findOne({ userId, productId });
        if (existingAlert) {
            return res.json({ success: false, message: "Alert already exists" });
        }
        
        const alert = new alertModel({ userId, productId, email });
        await alert.save();
        res.json({ success: true, message: "Alert created successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const getUserAlerts = async (req, res) => {
    try {
        const userId = req.userId;
        const alerts = await alertModel.find({ userId, isActive: true });
        res.json({ success: true, alerts });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { createAlert, getUserAlerts };