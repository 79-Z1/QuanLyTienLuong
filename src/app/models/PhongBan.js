'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhongBan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhongBan.init({
    MaPhong: {
      type: 'VARCHAR(10)',
      primaryKey: true,
    },
    TenPhong: 'NVARCHAR(50)',
  }, {
    sequelize,
    modelName: 'PHONGBAN',
  });
  return PhongBan;
};