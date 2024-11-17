import express from "express";
import {
  getUserInfoById,
  getSavedPicturesByUserId,
  getCreatedPicturesByUserId,
  deleteCreatedPictureById,
} from "../controller/home.controller.js";

const adminRouter = express.Router();

// Lấy thông tin người dùng theo ID
adminRouter.get("/user/:nguoi_dung_id", getUserInfoById);

// Lấy danh sách ảnh đã lưu của người dùng theo ID
adminRouter.get(
  "/user/:nguoi_dung_id/saved-pictures",
  getSavedPicturesByUserId
);

// Lấy danh sách ảnh đã tạo của người dùng theo ID
adminRouter.get(
  "/user/:nguoi_dung_id/created-pictures",
  getCreatedPicturesByUserId
);

// Xóa ảnh đã tạo theo ID
adminRouter.delete("/picture/:hinh_id", deleteCreatedPictureById);

export default adminRouter;
