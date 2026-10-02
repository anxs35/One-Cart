import express from "express";
import { addToWishlist, getWishlist, shareWishlist } from "../controller/wishlistController.js";
import isAuth from "../middleware/isAuth.js";

const wishlistRouter = express.Router();

wishlistRouter.post('/add', isAuth, addToWishlist);
wishlistRouter.post('/get', isAuth, getWishlist);
wishlistRouter.post('/share', isAuth, shareWishlist);

export default wishlistRouter;