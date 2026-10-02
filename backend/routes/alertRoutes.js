import express from "express";
import { createAlert, getUserAlerts } from "../controller/alertController.js";
import isAuth from "../middleware/isAuth.js";

const alertRouter = express.Router();

alertRouter.post('/create', isAuth, createAlert);
alertRouter.post('/get', isAuth, getUserAlerts);

export default alertRouter;