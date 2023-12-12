import { Router } from "express";

const routeRestInfo = Router();

// Controllers
import { getRestInfo } from "../controllers/restInfo.controllers";

routeRestInfo.get("/", getRestInfo);

export default routeRestInfo;