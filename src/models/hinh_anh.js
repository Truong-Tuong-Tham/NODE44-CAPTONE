import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class hinh_anh extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    hinh_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_hinh: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    duong_dan: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    mo_ta: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'hinh_anh',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hinh_id" },
        ]
      },
    ]
  });
  }
}
