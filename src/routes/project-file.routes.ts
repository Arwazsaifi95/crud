import express from "express";
import { upload } from "../utils/uploadImage.util";
import { verifyFirebaseToken, verifyUser } from "../middlewares/verifyUser";
import { createProjectFile, deleteProjectFile, getAllProjectFile, getProjectFile, updateProjectFile } from "../controllers/project-file.controller";

const router = express.Router();

router.post("/create", verifyUser,upload.single("image"),createProjectFile);
router.delete("/:id",verifyUser, deleteProjectFile);

router.get("/:id", verifyUser, getAllProjectFile);
router.get("/:id", verifyUser, getProjectFile);
router.put(
  "/:id",
  verifyUser,
  upload.single("image"),
  updateProjectFile
);

export default router;
