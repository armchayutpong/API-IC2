import "dotenv/config"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { decode } from "punycode";

const ACCESS_TOKEN_SECRET:any = process.env.ACCESS_TOKEN_SECRET;

const isAuthenticated = (req:Request, res:Response, next:NextFunction) => {
    try {
        
        if (!req.headers.authorization) return res.status(401).json({error: "error", message: "Invalid authorization"});
        
        const token = req.headers.authorization.replace("Bearer ", "")
        if(!token) return res.status(401).json({error: "error", message: "Invalid access token"});

        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET, (err:any, decoded:any) => {
            if(err) return res.status(401).json({error: "error", message: "Invalid access token"});
            next()
        })
    } catch (error) {
        res.status(500).json(error).end();
    }
}

export {
    isAuthenticated
}