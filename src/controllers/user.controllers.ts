import { Request, Response } from "express";
import { sendEmailWithOTP } from "../utils/mailer.util"; // Ensure this path is correct
import { generateToken, verifyToken } from "../utils/jwt.util"; // Ensure this path is correct
import { Otp } from "../entity/otp.model"; // Ensure this path is correct
import AppDataSource from "../config/database.config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../entity/user.model";
import { v4 as uuidv4 } from "uuid"; //For unique id
import passport from "passport";
import {
  loginGoogleService,
  loginService,
  registerService,
  updateProfileService,
} from "../services/user.services";

const otpRepository = AppDataSource.getRepository(Otp);
const userRepository = AppDataSource.getRepository(User);

//SignUp User
export const registerCtrl = async (req: Request, res: Response) => {
  try {
    const { username, email, password, locations } = req.body;
    const fileName = req.file?.filename || "";
    const response = await registerService(
      username,
      email,
      password,
      locations,
      fileName
    );
    res.status(200).json({
      message: "User",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//Login with Google
export const loginGoogleCtrl = async (req: Request, res: Response) => {
  try {
    await loginGoogleService(req, res);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//Login User
export const loginCtrl = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await loginService(email, password);
    res.status(200).json({
      message: "Access Token",
      data: response,
    });
    
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//Get All User
export const getAllCtrl = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.user;
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      return res.status(400).send({ message: "Not found" });
    }

    user.profileImage = `${user.profileImage}`;
    user.password = "";
    res.status(200).send({
      user: user,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Update user profile route
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, newPassword, locations } = req.body;
    const file = req.file; 
    const user = await updateProfileService(id,username, password, newPassword, locations,file); 
    res.status(200).json({
      message: "User profile updated successfully",
      user: user 
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};
//Send Otp
export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10); // OTP expiry set to 10 minutes from now

    // Save OTP to database
    const otp = new Otp();

    otp.id = uuidv4();
    otp.email = email;
    otp.otp = newOtp;
    otp.expiry = expiry;
    await otpRepository.save(otp);

    // Optionally send OTP via email
    await sendEmailWithOTP(email, newOtp);

    // Generate a token for response (optional based on your requirement)
    const token = generateToken({ email, newOtp });

    res.json({ message: "OTP sent successfully", token });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//Verify Otp
export const verifyOTP = (req: Request, res: Response) => {
  const { otp } = req.body;
  const token = req.headers.authorization?.split(" ")[1] || "";

  try {
    const decoded = verifyToken(token) as JwtPayload;
    if (!decoded) {
    }
    if (decoded.newOtp === otp) {
      res.json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const signUpGoogle = async () => {
  passport.authenticate("google", { scope: ["profile", "email"] });
};

export const redirect = async () => {
  passport.authenticate("google", { failureRedirect: "/login" }),
    (_req: Request, res: Response) => {
      // Successful authentication, redirect to success route or send response
      res.redirect("/success");
    };
};
