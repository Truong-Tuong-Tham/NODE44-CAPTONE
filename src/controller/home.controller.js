import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

// Initialize models
const model = initModels(sequelize);

// Lấy tất cả ảnh
export const getListPicture = async (req, res) => {
  try {
    // Lấy tất cả các bản ghi từ bảng "hinh_anh"
    let listPicture = await model.hinh_anh.findAll();

    // Serialize model data to plain JSON objects
    listPicture = listPicture.map((item) => item.get({ plain: true }));

    return res.status(200).json({
      message: "Lấy danh sách ảnh thành công",
      data: listPicture,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách ảnh: ", error);
    return res.status(500).json({
      message: "Có lỗi xảy ra khi lấy danh sách ảnh",
      data: null,
    });
  }
};

// Lấy ảnh theo tên
export const getListPictureByName = async (req, res) => {
  try {
    const { ten_hinh } = req.query;

    // Kiểm tra xem tham số 'ten_hinh' có tồn tại không
    if (!ten_hinh) {
      return res.status(400).json({
        message: "Thiếu tham số 'ten_hinh' trong query",
        data: null,
      });
    }

    // Lấy các bản ghi theo tên ảnh
    let listPicture = await model.hinh_anh.findAll({
      where: { ten_hinh },
    });

    // Nếu không tìm thấy ảnh
    if (listPicture.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy ảnh với tên đã cung cấp",
        data: null,
      });
    }

    // Serialize model data to plain JSON objects
    listPicture = listPicture.map((item) => item.get({ plain: true }));

    return res.status(200).json({
      message: `Lấy danh sách ảnh theo tên '${ten_hinh}' thành công`,
      data: listPicture,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách ảnh theo tên: ", error);
    return res.status(500).json({
      message: "Có lỗi xảy ra khi lấy danh sách ảnh theo tên",
      data: null,
    });
  }
};
