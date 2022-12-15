const { sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');
const common = require('../services/common.service');
const query = require('../services/query.service');

class NhanVienController {
    async index(req, res, next) {
        const manv = req.params.manv;
        const month = new Date().getMonth() + 1;
        const procGetNhanVienByMaNV = `EXEC PROC_GET_ALL_NV_BY_MANV '${manv}'`;
        const procLuongTheoThanng = query.procLuongTheoThanng(manv);
        const getChamCongByMaNV = `SELECT TrangThai,Ngay,NghiHL FROM CHAMCONG WHERE MaNV = '${manv}' AND MONTH(Ngay) = ${month}`;

        try {
			const data = await sequelize.query(procGetNhanVienByMaNV, {
				type: QueryTypes.EXEC,
			});

            const dataLuong = await sequelize.query(procLuongTheoThanng, {
                type: QueryTypes.SELECT,
            })

            const chamCong = await sequelize.query(getChamCongByMaNV, {
                type: QueryTypes.SELECT,
            });

            //check giới tính
            let nhanvien = data.flat();
            const gioitinh = await common.checkGioiTinh(nhanvien[0].GioiTinh);
            nhanvien = {...data.flat()[0], GioiTinh: gioitinh }

            res.render('pages/nhanvien/home', { 
                style: 'pages/nhanvien/home.css',
                layout: false,
                nhanvien: nhanvien,
                dataLuong: dataLuong[0],
                chamCong
            });
		} catch (err) {
			return console.log(err.message);
		}   
    }

    async searchNhanVien(req, res) {
        const value = req.query.search;
        value.toLowerCase().trim();

        const sqlSearchNV = `EXEC PROC_SEARCH N'${value}'`
		try {
			const nhanviens = await sequelize.query(sqlSearchNV, {
				type: QueryTypes.EXEC,
			});
            console.log(nhanviens);
            //check giới tính
            for(let nv of nhanviens[0]) {
                nv.GioiTinh = await common.checkGioiTinh(nv.GioiTinh);
            }

            res.render('pages/admin/ketoan', { 
                style: '/pages/admin/ketoan.css',
                nhanviens: nhanviens[0],
                searchValue: value
            });

		} catch (err) {
			return console.log(err.message);
		}
    }

    async TaoUngLuong(req, res) {
        const manv = req.body.manv;
        const lydo = req.body.lydo;
        const sotien = parseInt(req.body.sotien);
        let maPhieu = `UL${common.random100To999()}`;
        const today = new Date().toLocaleDateString();
        
        const insertUngLuong = 
        `insert into PhieuUngLuong (MaPhieu,MaNV,NgayUng,LyDo,SoTien)
        values ('${maPhieu}','${manv}','${today}',N'${lydo}',${sotien})`

        try {
			await sequelize.query(insertUngLuong, {
				type: QueryTypes.INSERT,
			});

            return res.status(200).json({
                code: 200,
                elements: {	
                    msg: 'success'
                },
            });
		} catch (err) {
			return console.log(err.message);
		}
    }

    async TaoKhieuNai(req, res) {
        const manv = req.body.manv;
        const lydo = req.body.lydo;
        const maDon = `KN${common.random100To999()}`;
        const today = new Date().toLocaleDateString();
        
        const insertKhieuNai = 
        `insert into DONKHIEUNAI(MaDon,MaNV,ThoiGian,LyDo,GiaiQuyet)
		values ('${maDon}','${manv}','${today}',N'${lydo}',null)`

        try {
			await sequelize.query(insertKhieuNai, {
				type: QueryTypes.INSERT,
			});

            return res.status(200).json({
                code: 200,
                elements: {	
                    msg: 'success'
                },
            });
		} catch (err) {
			return console.log(err.message);
		}
    }
   
    // async showChamCong(req, res, next) {
    //     const manv = req.params.manv;
    //     const month = new Date().getMonth();

    //     const getChamCongByMaNV = `SELECT TrangThai,Ngay,NghiHL FROM CHAMCONG WHERE MaNV = '${manv}' AND MONTH(Ngay) = ${month}`;
    
    //     const chamCong = await sequelize.query(getChamCongByMaNV, {
    //         type: QueryTypes.SELECT,
    //     });
    //     try {

    //         res.render('pages/nhanvien/home', { 
    //             style: 'pages/nhanvien/home.css',
    //             layout: false,
    //             chamCong: chamCong
    //         });
	// 	} catch (err) {
	// 		return console.log(err.message);
	// 	}   
    // }
}

module.exports = new NhanVienController;