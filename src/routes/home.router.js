import express from "express";
import { 
  getListPicture, 
  getListPictureByName, 

} from "../controller/home.controller.js";

const homeRouter = express.Router();

// Lấy danh sách hình ảnh
homeRouter.get('/getlist', getListPicture);

// Lấy danh sách hình ảnh theo tên
homeRouter.get("/getlistbyname", getListPictureByName);



export default homeRouter;
