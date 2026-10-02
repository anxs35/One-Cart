import loyaltyModel from "../model/loyaltyModel.js";

const addPoints = async (userId, points) => {
    try {
        console.log(`Adding points - userId: ${userId}, points: ${points}`);
        let loyalty = await loyaltyModel.findOne({ userId });
        console.log('Existing loyalty record:', loyalty);
        
        if (!loyalty) {
            loyalty = new loyaltyModel({ userId, points, totalEarned: points });
            console.log('Creating new loyalty record');
        } else {
            loyalty.points += points;
            loyalty.totalEarned += points;
            console.log('Updating existing loyalty record');
        }
        
        // Update level based on total points
        if (loyalty.totalEarned >= 1000) loyalty.level = "Gold";
        else if (loyalty.totalEarned >= 500) loyalty.level = "Silver";
        else loyalty.level = "Bronze";
        
        const savedLoyalty = await loyalty.save();
        console.log('Saved loyalty record:', savedLoyalty);
        return savedLoyalty;
    } catch (error) {
        console.log('Error in addPoints:', error);
        return null;
    }
};

const getLoyaltyPoints = async (req, res) => {
    try {
        const userId = req.userId;
        console.log('Getting loyalty points for user:', userId);
        const loyalty = await loyaltyModel.findOne({ userId });
        console.log('Found loyalty record:', loyalty);
        res.json({ success: true, loyalty: loyalty || { points: 0, level: "Bronze", totalEarned: 0 } });
    } catch (error) {
        console.log('Error in getLoyaltyPoints:', error);
        res.json({ success: false, message: error.message });
    }
};

export { addPoints, getLoyaltyPoints };