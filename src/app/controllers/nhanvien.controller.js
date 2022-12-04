const { sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');
const common = require('../services/common.service');

class NhanVienController {
    async index(req, res) {
        const manv = req.params.manv;
        const sqlGetNhanVienBymaNV = 
        `SELECT MaNV, concat(HoLot,+' '+TenNV)  as HoTen, cv.TenCV, pb.TenPhong, 
        nv.GioiTinh, nv.SDT, nv.NgaySinh, nv.DiaChi, nv.STK, nv.CMND, nv.SoBH
        FROM NHANVIEN nv
        JOIN CHUCVU cv ON nv.MaChucVu = cv.MaCV
        JOIN PHONGBAN pb ON nv.MaPhong = pb.MaPhong
        WHERE MaNV = '${manv}'`;

        try {
			const nhanvien = await sequelize.query(sqlGetNhanVienBymaNV, {
				type: QueryTypes.SELECT,
			});

            //check giới tính
            nhanvien[0].GioiTinh = await common.checkGioiTinh(nhanvien[0].GioiTinh);

			res.render('pages/nhanvien/home', { 
                style: 'pages/nhanvien/home.css',
                layout: false,
                nhanvien: nhanvien[0]
            });
		} catch (err) {
			return console.log(err.message);
		}   
    }
}

module.exports = new NhanVienController;