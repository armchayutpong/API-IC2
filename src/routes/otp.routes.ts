import { Router } from "express";

const routerOTP = Router();

// Controllers
import otpControllers from "../controllers/otp.controllers";

// Middlewares
import { validationRestInfo } from "../middlewares/restInfo";

// Ants OTP
// routerOtp.post("/send", otpControllers.postOtpSend)
// routerOtp.post("/resend", otpControllers.postOtpResend)
// routerOtp.post("/verify", otpControllers.postOtpVerify)

// Ants SMS set from OTP
routerOTP.post("/sms/send", validationRestInfo, otpControllers.postOtpSmsSend)
routerOTP.post("/sms/verify", validationRestInfo, otpControllers.postOtpSmsVerify)


export default routerOTP