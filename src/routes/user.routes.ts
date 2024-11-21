import express from "express";
import {
  getAllCtrl,
  loginCtrl,
  loginGoogleCtrl,
  redirect,
  registerCtrl,
  sendOTP,
  signUpGoogle,
  updateProfile,
  verifyOTP,
} from "../controllers/user.controllers";
import { upload } from "../utils/uploadImage.util";
import { verifyFirebaseToken, verifyUser } from "../middlewares/verifyUser";

const router = express.Router();

router.post("/signup",registerCtrl);
router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);
router.post("/signIn", loginCtrl);
router.post("/signInGoogle",upload.single("profile"), loginGoogleCtrl);
router.get("/get-user", verifyUser, getAllCtrl);
router.patch(
  "/update-profile/:id",
  verifyUser,
  upload.single("profile"),
  updateProfile
);

export default router;
