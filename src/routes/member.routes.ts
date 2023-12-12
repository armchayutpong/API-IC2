import { Router } from "express";

const routerMember = Router();

// Controllers
import { getMember } from "../controllers/member.controllers";

// Middlewares
import { isAuthenticated } from "../middlewares/auth";
import { validationRestInfo } from "../middlewares/restInfo";

routerMember.get("/:id", [isAuthenticated, validationRestInfo], getMember)

export default routerMember;