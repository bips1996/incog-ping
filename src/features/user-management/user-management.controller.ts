import { UserManagementService } from "./user-management.service";
import { Request, Response } from "express";
export class UserManagementController {
  public static async getUsers(req: Request, res: Response) {
    try {
      const users = await new UserManagementService().getUsers();
      console.log("Users =", users);
      res.send({
        status: 200,
        data: users,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
