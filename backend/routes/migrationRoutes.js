import express from "express";
import { updateExistingProductsStock } from "../controller/migrationController.js";
import adminAuth from "../middleware/adminAuth.js";

const migrationRouter = express.Router();

migrationRouter.post('/update-stock', adminAuth, updateExistingProductsStock);

export default migrationRouter;