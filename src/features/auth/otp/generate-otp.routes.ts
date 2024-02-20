import { Router } from "express";
import { GenerateOTPController } from "./generate-otp.controller";

const generateOTPRouter = Router();

generateOTPRouter.get("/generate-otp", GenerateOTPController.generateOTP);
generateOTPRouter.post("/verify-otp", GenerateOTPController.verifyOTP);
generateOTPRouter.post("/send-otp", GenerateOTPController.sendOTP);

export default generateOTPRouter;
