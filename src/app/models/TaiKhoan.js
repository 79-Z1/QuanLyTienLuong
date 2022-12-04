'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TaiKhoan extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	TaiKhoan.init(
		{
			TenTaiKhoan: {
				type: 'VARCHAR(20)',
				primaryKey: true,
			},
			MaNV: 'VARCHAR(10)',
			MatKhau: 'VARCHAR(20)',
			LoaiTK: 'VARCHAR(10)',
		},
		{
			sequelize,
			modelName: 'TAIKHOAN',
		},
	);
	return TaiKhoan;
};
