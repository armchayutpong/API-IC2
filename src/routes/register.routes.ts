import { Router } from "express";

const routerRegister = Router();

// Controllers
import registerControllers from "../controllers/register.controllers";

// Middlewares
import { validationRestInfo } from "../middlewares/restInfo";

// Router API path
routerRegister.post("/", validationRestInfo, registerControllers.postRegister);

export default routerRegister;