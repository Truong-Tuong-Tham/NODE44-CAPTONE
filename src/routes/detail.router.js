import express from "express";
import {
  getInfoPictureById,
  getInfoUserById,
  checkImageSavedById,
  saveCommentForImage,
} from "../controller/detail.controller.js";

const detailRouter = express.Router();

detailRouter.get("/picture/:hinh_id", getInfoPictureById);

detailRouter.get("/user/:nguoi_dung_id", getInfoUserById);

detailRouter.get("/check-image/:hinh_id", checkImageSavedById);

detailRouter.post("/comment/:hinh_id", saveCommentForImage);

export default detailRouter;
