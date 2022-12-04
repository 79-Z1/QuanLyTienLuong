'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChamCong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChamCong.init({
    MaCong: {
      type: 'VARCHAR(10)',
      primaryKey: true,
    },
    MaNV: 'VARCHAR(10)',
    TrangThai: 'BIT',
    Ngay: 'DATETIME',
    NghiHL: 'BIT'
  }, {
    sequelize,
    modelName: 'CHAMCONG',
  });
  return ChamCong;
};