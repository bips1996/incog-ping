import { GenerateOTPService } from "./generate-otp.service";
import { Request, Response } from "express";
export class GenerateOTPController {
  public static async generateOTP(req: Request, res: Response): Promise<any> {
    try {
      const response = await new GenerateOTPService().generateOTP();
      res.send({
        statusCode: 200,
        message: response.message,
      });
    } catch (err: any) {
      res.send({
        status: 500,
        err: err.message,
      });
    }
  }

  public static async verifyOTP(req: Request, res: Response): Promise<any> {
    try {
      const { token } = req.body;
      console.log(token);
      const response = await new GenerateOTPService().verifyOTP(token);

      res.send({
        statusCode: 200,
        message: response.message,
      });
    } catch (err: any) {
      res.send({
        status: 500,
        err: err.message,
      });
    }
  }

  public static async sendOTP(req: Request, res: Response): Promise<any> {
    try {
      const { mobile_number } = req.body;
      console.log(mobile_number);
      const response = await new GenerateOTPService().sendOTP(mobile_number);

      res.send({
        statusCode: 200,
        message: response.message,
      });
    } catch (err: any) {
      res.send({
        status: 500,
        err: err.message,
      });
    }
  }
}
