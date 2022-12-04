'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChucVu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChucVu.init({
    MaCV: {
      type: 'VARCHAR(10)',
      primaryKey: true,
    },
    TenCV: 'NVARCHAR(25)',
    HeSoLuong: 'INT',
  }, {
    sequelize,
    modelName: 'CHUCVU',
  });
  return ChucVu;
};