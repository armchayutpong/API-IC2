import "dotenv/config";
import express, { Application, NextFunction, Request, Response } from "express";
import session from "express-session";
import swaggerUi from "swagger-ui-express";

// API Route
import routeRestInfo from "./routes/restInfo.routes";
import routerLine from "./routes/line.roures";
import routerRegister from "./routes/register.routes";
import routeCRM from "./routes/crm.routes";
import routerMember from "./routes/member.routes";
import routerShop from "./routes/shop.routes";
import routerOTP from "./routes/otp.routes";
import routerTel from "./routes/tel.routes";

// Docs
import swaggerDocs from "./docs";

// .env
const BASE_PATH_ROOT = process.env.BASE_PATH_ROOT;
const PORT = process.env.PORT;
const EXPRESS_SESSION_SECRET:any = process.env.EXPRESS_SESSION_SECRET;

// App setting
export const app:Application = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))
app.use((req:Request, res:Response, next:NextFunction)=>{
    next();
})

// App Route
app.use(BASE_PATH_ROOT+"/rest-info", routeRestInfo)
app.use(BASE_PATH_ROOT+"/line", routerLine);
app.use(BASE_PATH_ROOT+"/register", routerRegister);
app.use(BASE_PATH_ROOT+"/crm", routeCRM)
app.use(BASE_PATH_ROOT+"/member", routerMember);
app.use(BASE_PATH_ROOT+"/shop", routerShop);
app.use(BASE_PATH_ROOT+"/otp", routerOTP);
app.use(BASE_PATH_ROOT+"/tel", routerTel);
app.use(BASE_PATH_ROOT+"/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs.swaggerV1))
app.use((req:Request, res:Response) => {
    res.status(404);
    res.end();
})

// App Port
app.listen(PORT, ()=> console.info("App is running on port " + PORT) )