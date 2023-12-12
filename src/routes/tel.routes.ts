import { Router } from "express";

const routerTel = Router();

// Controllers
import telControllers from "../controllers/tel.controllers";

// Middlewares
import { validationRestInfo } from "../middlewares/restInfo";

// Router API path
routerTel.post("/authenticate", validationRestInfo, telControllers.postTelAuthen);

export default routerTel;



