import { Router } from "express";
import { userManagementRouter } from "./features/user-management/user-management.routes";

const router = Router();

router.use("/user-management", userManagementRouter);

export default router;
