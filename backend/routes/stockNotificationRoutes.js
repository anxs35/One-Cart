import express from "express";
import { getNotifications, markAsRead, getUnreadCount } from "../controller/stockNotificationController.js";
import adminAuth from "../middleware/adminAuth.js";

const stockNotificationRouter = express.Router();

stockNotificationRouter.get('/get', adminAuth, getNotifications);
stockNotificationRouter.post('/mark-read', adminAuth, markAsRead);
stockNotificationRouter.get('/unread-count', adminAuth, getUnreadCount);

export default stockNotificationRouter;