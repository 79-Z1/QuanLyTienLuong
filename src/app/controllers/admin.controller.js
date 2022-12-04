const { sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');
const common = require('../services/common.service');

class AdminController {
    async indexKT(req, res) {
        const queryGetAllNV = 
        `SELECT MaNV, concat(HoLot,+' '+TenNV)  as HoTen, cv.TenCV, pb.TenPhong, nv.GioiTinh, nv.SDT
        FROM NHANVIEN nv
        JOIN CHUCVU cv ON nv.MaChucVu = cv.MaCV
        JOIN PHONGBAN pb ON nv.MaPhong = pb.MaPhong`
        
		try {
			const nhanviens = await sequelize.query(queryGetAllNV, {
				type: QueryTypes.SELECT,
			});
            
            //check giới tính
            for(let nv of nhanviens) {
                nv.GioiTinh = await common.checkGioiTinh(nv.GioiTinh);
            }

            res.render('pages/admin/ketoan', { 
                style: '/pages/admin/ketoan.css',
                nhanviens: nhanviens
            });
		} catch (err) {
			return console.log(err.message);
		}
    }

    async indexQL(req, res) {
        res.render('pages/admin/quanly', { 
            style: '/pages/admin/quanly.css',
        });
    }

    async showLapBangLuong(req, res) {
        res.render('pages/admin/lap-bangluong', { 
            style: '/pages/admin/lap-bangluong.css',
        });
    }

    async getAllNhanVien(req, res) {
        const queryGetAllNV = `SELECT * FROM NHANVIEN`
		try {
			const nhanvien = await sequelize.query(queryGetAllNV, {
				type: QueryTypes.SELECT,
			});
            
			return res.status(200).json({
                code: 200,
                elements: {	
                    nhanvien
                },
            });

		} catch (err) {
			return console.log(err.message);
		}
    }
}

module.exports = new AdminController;
