'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NhanVien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NhanVien.init({
    MaNV: {
      type: 'VARCHAR(10)',
      primaryKey: true,
    },
    MaChucVu: 'VARCHAR(10)',
    MaPhong: 'VARCHAR(10)',
    HoLot: 'NVARCHAR(50)',
    TenNV: 'NVARCHAR(50)',
    GioiTinh: 'BIT',
    NgaySinh: 'DATE',
    DiaChi: 'NVARCHAR(100)',
    STK: 'VARCHAR(20)',
    CMND: 'VARCHAR(20)',
    SoBH: 'VARCHAR(20)',
    SDT: 'VARCHAR(20)',
  }, {
    sequelize,
    modelName: 'NHANVIEN',
  });
  return NhanVien;
};