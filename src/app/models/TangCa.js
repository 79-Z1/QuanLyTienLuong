'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TangCa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TangCa.init({
    MaTC: {
      type: 'VARCHAR(10)',
      primaryKey: true,
    },
    MaNV: 'VARCHAR(10)',
    NgayTC: 'DATE',
  }, {
    sequelize,
    modelName: 'TANGCA',
  });
  return TangCa;
};