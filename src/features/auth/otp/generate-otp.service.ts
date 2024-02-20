import axios from "axios";
import speakeasy from "speakeasy";
export class GenerateOTPService {
  public async generateOTP(): Promise<any> {
    const response = { success: false, message: "" };
    const secretKey = process.env.SECRET_KEY;
    try {
      const otp = speakeasy.totp({
        secret: process.env.base64,
        encoding: "base32",
      });
      const checkOtp = speakeasy.totp.verify({
        secret: secretKey,
        encoding: "base32",
        token: otp,
        window: 6,
      });
      response.message = `OTP : ${otp} generated succefully`;
      response.success = true;
      return response;
    } catch (err: any) {
      response.message = `Failed to generate OTP`;
      response.success = true;
      return response;
    }
  }

  public async verifyOTP(token: string): Promise<any> {
    const response = { success: false, message: "" };

    try {
      const verifyOtp = speakeasy.totp.verify({
        secret: process.env.SECRET_KEY,
        encoding: "base32",
        token: token,
        window: 2,
      });
      if (!verifyOtp) {
        response.message = `Incorrect otp : ${process.env.OTP} = ${token}`;
        return response;
      }

      response.message = "Verified OTP successfully";
      response.success = true;
      return response;
    } catch (err: any) {
      response.message = "Failed to verify otp";
      return response;
    }
  }

  public async sendOTP(mobileNumber: any): Promise<any> {
    const response = { success: false, message: "" };
    try {
      const otp = Math.floor(100000 + Math.random() * 900000);

      let config: any = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://www.fast2sms.com/dev/bulkV2",
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          variables_values: this.generateOTP(),
          route: "otp",
          number: mobileNumber,
          Cookie: process.env.COOKIE,
        },
      };
      response.message = "OTP sent successfully!";
      response.success = true;
      return response;
    } catch (err: any) {
      response.message = `Failed to send otp on mobile ${mobileNumber}: ${err.message}`;
      return response;
    }
  }
}
