import { Router } from "express";

const routerShop = Router();

// Middlewares
import { isAuthenticated } from "../middlewares/auth";
import { validationRestInfo } from "../middlewares/restInfo";

// controllers
import { getShop, getShopCode } from "../controllers/shop.controllers";

routerShop.get("/", [isAuthenticated, validationRestInfo], getShop)
routerShop.get("/:ShopCode", [isAuthenticated, validationRestInfo], getShopCode)

export default routerShop;
