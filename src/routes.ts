import { Router } from "express";
import { userManagementRouter } from "./features/user-management/user-management.routes";
import generateOTPRouter from "./features/auth/otp/generate-otp.routes";

const router = Router();

router.use("/user-management", userManagementRouter);
router.use("/auth-user", generateOTPRouter);

export default router;
