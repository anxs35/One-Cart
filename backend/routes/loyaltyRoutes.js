import express from "express";
import { getLoyaltyPoints } from "../controller/loyaltyController.js";
import isAuth from "../middleware/isAuth.js";

const loyaltyRouter = express.Router();

loyaltyRouter.post('/get', isAuth, getLoyaltyPoints);

export default loyaltyRouter;