import Router from "express";
import { UserManagementController } from "./user-management.controller";

const userManagementRouter = Router();

//userManagementRouter.get("/get-users", UserManagementController.getUsers);

userManagementRouter.get("/get-users", UserManagementController.getUsers);

export { userManagementRouter };
