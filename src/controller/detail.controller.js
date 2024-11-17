import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

// Initialize models
const model = initModels(sequelize);
export const getInfoPictureById = async (req, res) => {
  
    try {
      const { hinh_id} = req.params;
      const picture = await model.hinh_anh.findByPk(hinh_id);
      if (!picture) {
        return res.status(404).json({
          message: "Khong tim thay hinh anh",
          data: null,
        });
      }
      return res.status(200).json({
        message: "Lay thong tin hinh anh thanh cong",
        data: picture,
      });
    } catch (error) {
      console.error("Loi khi lay thong tin hinh anh: ", error);
      return res.status(500).json({
        message: "Co loi xay ra khi lay thong tin hinh anh",
        data: null,
      });
    }
    
};
export const getInfoUserById = async (req, res) => {
  try {
    const { nguoi_dung_id } = req.params;
    const user = await model.nguoi_dung.findByPk(nguoi_dung_id);
    if (!user) {
      return res.status(404).json({
        message: "Khong tim thay nguoi dung",
        data: null,
      });
    }
    return res.status(200).json({
      message: "Lay thong tin nguoi dung thanh cong",
      data: user,
    });
  } catch (error) {
    console.error("Loi khi lay thong tin nguoi dung: ", error);
    return res.status(500).json({
      message: "Co loi xay ra khi lay thong tin nguoi dung",
      data: null,
    });
  }
};

export const checkImageSavedById = async (req, res) => {
  try {
    const { hinh_id } = req.params;
    
    // Kiểm tra xem hình ảnh đã tồn tại trong cơ sở dữ liệu hay chưa
    const picture = await model.hinh_anh.findByPk(hinh_id);
    
    // Nếu không tìm thấy ảnh, trả về thông báo là ảnh chưa được lưu
    if (!picture) {
      return res.status(404).json({
        message: "Hình ảnh chưa được lưu.",
        data: null,
      });
    }
    
    // Nếu hình ảnh đã được lưu, trả về thông tin ảnh
    return res.status(200).json({
      message: "Hình ảnh đã được lưu.",
      data: picture,
    });
  } catch (error) {
    console.error("Lỗi khi kiểm tra tình trạng hình ảnh: ", error);
    return res.status(500).json({
      message: "Có lỗi xảy ra khi kiểm tra tình trạng hình ảnh.",
      data: null,
    });
  }
};

export const saveCommentForImage = async (req, res) => {
  try {
    const { hinh_id } = req.params; 
    const { nguoi_dung_id, noi_dung, ngay_binh_luan } = req.body; // Lấy thông tin bình luận từ body
    
    // Kiểm tra nếu thiếu thông tin cần thiết
    if (!nguoi_dung_id || !noi_dung ||ngay_binh_luan === undefined) {
      return res.status(400).json({
        message: "Thiếu thông tin yêu cầu: người dùng, nội dung bình luận hoặc sao bình luận",
        data: null,
      });
    }
    
    // Kiểm tra xem hình ảnh có tồn tại hay không
    const picture = await model.hinh_anh.findByPk(hinh_id);
    if (!picture) {
      return res.status(404).json({
        message: "Hình ảnh không tồn tại.",
        data: null,
      });
    }
    
    // Tạo mới một bình luận và lưu vào cơ sở dữ liệu
    const newComment = await model.binh_luan.create({
      hinh_anh_id: hinh_id,
      nguoi_dung_id: nguoi_dung_id,
      noi_dung: noi_dung,
      ngay_binh_luan: ngay_binh_luan,
    });
    
    return res.status(201).json({
      message: "Lưu bình luận thành công.",
      data: newComment,
    });
  } catch (error) {
    console.error("Lỗi khi lưu bình luận: ", error);
    return res.status(500).json({
      message: "Có lỗi xảy ra khi lưu bình luận.",
      data: null,
    });
  }
};

