import express from "express";

import { upload } from "../utils/uploadImage.util";
import { verifyFirebaseToken, verifyUser } from "../middlewares/verifyUser";
import { createFolder, deleteFolder, getAllFavouriteFolder, getAllFolderByUserId, getAllSharedFolder, getFolder, updateFolder } from "../controllers/folder.controller";

const router = express.Router();

router.post("/create",verifyUser, createFolder);
router.delete("/:id",verifyUser, deleteFolder);
router.put("/",verifyUser, deleteFolder);

router.get("/shared/:id", verifyUser, getAllSharedFolder);
router.get("/favourite/:id", verifyUser, getAllFavouriteFolder);
router.get("/all/:id", verifyUser, getAllFolderByUserId);
router.get("/:id", verifyUser, getFolder);
router.put(
  "/:id",
  verifyUser,
//   upload.single("image"),
  updateFolder
);

export default router;
