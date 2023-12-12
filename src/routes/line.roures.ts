import { Router } from "express";

const routerLine = Router();

// Controllers
import lineControllers from "../controllers/line.controllers";

// Middlewares
import { validationRestInfo } from "../middlewares/restInfo";

// Router API path
routerLine.post("/authenticate", validationRestInfo, lineControllers.postAuthenticate);

export default routerLine;



