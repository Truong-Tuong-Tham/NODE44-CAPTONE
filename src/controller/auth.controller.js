import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Thêm thư viện để tạo JWT
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

// Đăng ký người dùng mới
export const register = async (req, res) => {
  try {
    let { ho_ten, email, mat_khau } = req.body;

    // Kiểm tra dữ liệu đầu vào (email, mật khẩu, tên)
    if (!email || !mat_khau || !ho_ten) {
      return res.status(400).json({
        message: "Thiếu thông tin đăng ký",
        data: null,
      });
    }

    // Kiểm tra xem email đã tồn tại chưa
    let userExist = await model.nguoi_dung.findOne({
      where: { email },
    });

    if (userExist) {
      return res.status(400).json({
        message: "Tài khoản đã tồn tại",
        data: null,
      });
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    let hashedPassword = bcrypt.hashSync(mat_khau, 10);

    // Tạo tài khoản mới
    let userNew = await model.nguoi_dung.create({
      ho_ten: ho_ten,
      email: email,
      mat_khau: hashedPassword,
    });

    return res.status(201).json({
      message: "Tạo tài khoản thành công",
      data: userNew,
    });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);

    return res.status(500).json({
      message: "Lỗi đăng ký, vui lòng thử lại sau.",
      data: null,
    });
  }
};

// Đăng nhập người dùng
export const login = async (req, res) => {
  try {
    let { email, mat_khau } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !mat_khau) {
      return res.status(400).json({
        message: "Thiếu thông tin đăng nhập",
        data: null,
      });
    }

    // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
    let user = await model.nguoi_dung.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "Tài khoản không tồn tại",
        data: null,
      });
    }

    // So sánh mật khẩu người dùng nhập với mật khẩu trong cơ sở dữ liệu
    let isMatch = bcrypt.compareSync(mat_khau, user.mat_khau);

    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không chính xác",
        data: null,
      });
    }

    // Tạo JWT nếu đăng nhập thành công
    let token = jwt.sign(
      { nguoi_dung_id: user.nguoi_dung_id, email: user.email },
      "CAPTONE",
      { algorithm: "HS256",
        expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Đăng nhập thành công",
      data: {
        user: {
          nguoi_dung_id: user.nguoi_dung_id,
          ho_ten: user.ho_ten,
          email: user.email,
        },
        token: token,
      },
    });
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);

    return res.status(500).json({
      message: "Lỗi đăng nhập, vui lòng thử lại sau.",
      data: null,
    });
  }
};
