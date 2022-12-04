'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhieuungLuong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhieuungLuong.init({
    MaPhieu: {
      type: 'VARCHAR(10)',
      primaryKey: true,
    },
    MaNV: 'VARCHAR(10)',
    NgayUng: 'DATETIME',
    LyDo: 'NVARCHAR(MAX)',
    SoTien: 'DECIMAL',
    Duyet: 'BIT'
  }, {
    sequelize,
    modelName: 'PHIEUUNGLUONG',
  });
  return PhieuungLuong;
};