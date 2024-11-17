import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

// Initialize models
const model = initModels(sequelize);

export const getUserInfoById = async (req, res) => {
    try {
      const { nguoi_dung_id } = req.params;
      const user = await model.nguoi_dung.findByPk(nguoi_dung_id);
      if (!user) {
        return res.status(404).json({
          message: "Không tìm thấy người dùng.",
          data: null,
        });
      }
      return res.status(200).json({
        message: "Lấy thông tin người dùng thành công.",
        data: user,
      });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng: ", error);
      return res.status(500).json({
        message: "Có lỗi xảy ra khi lấy thông tin người dùng.",
        data: null,
      });
    }
  };

  export const getSavedPicturesByUserId = async (req, res) => {
    try {
      const { nguoi_dung_id } = req.params;
      
      // Lấy danh sách ảnh đã lưu theo user_id
      const savedPictures = await model.hinh_anh.findAll({
        where: {
          nguoi_dung_id: nguoi_dung_id,
          isSaved: true, // Giả sử có trường `isSaved` để xác định ảnh đã lưu
        },
      });
  
      if (savedPictures.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy ảnh đã lưu.",
          data: null,
        });
      }
  
      return res.status(200).json({
        message: "Lấy danh sách ảnh đã lưu thành công.",
        data: savedPictures,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách ảnh đã lưu: ", error);
      return res.status(500).json({
        message: "Có lỗi xảy ra khi lấy danh sách ảnh đã lưu.",
        data: null,
      });
    }
  };
  export const getCreatedPicturesByUserId = async (req, res) => {
    try {
      const { nguoi_dung_id } = req.params;
  
      // Lấy danh sách ảnh đã tạo theo user_id
      const createdPictures = await model.hinh_anh.findAll({
        where: {
          nguoi_dung_id: nguoi_dung_id,
          isCreated: true, // Giả sử có trường `isCreated` để xác định ảnh đã tạo
        },
      });
  
      if (createdPictures.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy ảnh đã tạo.",
          data: null,
        });
      }
  
      return res.status(200).json({
        message: "Lấy danh sách ảnh đã tạo thành công.",
        data: createdPictures,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách ảnh đã tạo: ", error);
      return res.status(500).json({
        message: "Có lỗi xảy ra khi lấy danh sách ảnh đã tạo.",
        data: null,
      });
    }
  };
  export const deleteCreatedPictureById = async (req, res) => {
    try {
      const { hinh_id } = req.params;
  
      // Kiểm tra xem ảnh có tồn tại không
      const picture = await model.hinh_anh.findByPk(hinh_id);
      if (!picture) {
        return res.status(404).json({
          message: "Hình ảnh không tồn tại.",
          data: null,
        });
      }
  
      // Kiểm tra nếu ảnh là của người dùng và đã được tạo bởi họ
      if (picture.isCreated === false) {
        return res.status(403).json({
          message: "Không thể xóa ảnh này vì nó không phải là ảnh do bạn tạo.",
          data: null,
        });
      }
  
      // Xóa ảnh
      await picture.destroy();
  
      return res.status(200).json({
        message: "Xóa ảnh thành công.",
        data: null,
      });
    } catch (error) {
      console.error("Lỗi khi xóa ảnh: ", error);
      return res.status(500).json({
        message: "Có lỗi xảy ra khi xóa ảnh.",
        data: null,
      });
    }
  };
  