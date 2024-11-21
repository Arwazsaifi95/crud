import express from "express";
import { upload } from "../utils/uploadImage.util";
import { verifyFirebaseToken, verifyUser } from "../middlewares/verifyUser";
import {
  createProject,
  deleteProject,
  getAllFavouriteProject,
  getAllProject,
  getAllSharedProject,
  getProject,
  updateProject,
} from "../controllers/project.controller";

const router = express.Router();

router.post("/create", verifyUser, upload.single("image"), createProject);
router.delete("/:id", verifyUser, deleteProject);

router.get("/shared/:id", verifyUser, getAllSharedProject);
router.get("/favourite/:id", verifyUser, getAllFavouriteProject);
router.get("/all/:id", verifyUser, getAllProject);
router.get("/:id", verifyUser, getProject);
router.put("/:id", verifyUser, upload.single("image"), updateProject);

export default router;
