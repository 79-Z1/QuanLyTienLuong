'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonKhieuNai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DonKhieuNai.init({
    MaDon: {
      type: 'VARCHAR(10)',
      primaryKey: true,
    },
    MaNV: 'VARCHAR(10)',
    ThoiGian: 'DATE',
    LyDo: 'NVARCHAR(MAX)',
    GiaiQuyet: 'BIT'
  }, {
    sequelize,
    modelName: 'DONKHIEUNAI',
  });
  return DonKhieuNai;
};