'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BaoHiem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BaoHiem.init({
    MaBH: {
      type: 'VARCHAR(10)',
      primaryKey: true,
    },
    MaNV: 'VARCHAR(10)',
    SoThe: 'VARCHAR(12)',
    NgayCapNhat: 'DATE',
    NgayHetHan: 'DATE',
    NoiCap: 'NVARCHAR(50)'
  }, {
    sequelize,
    modelName: 'BAOHIEM',
  });
  return BaoHiem;
};