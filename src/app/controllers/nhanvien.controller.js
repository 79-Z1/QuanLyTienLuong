const { sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');
const common = require('../services/common.service');
const query = require('../services/query.service');

class NhanVienController {
    async index(req, res, next) {
        const manv = req.params.manv;
        const procGetNhanVienByMaNV = `EXEC PROC_GET_ALL_NV_BY_MANV '${manv}'`;
        const procLuongTheoThanng = 
        `declare @HSL float 
        declare @THUE decimal
        declare @TU decimal
        declare @BH decimal
        declare @SONC int
        declare @LTL decimal
        declare @TTC decimal
        exec pr_LuongTheoThang 12,2022,'${manv}',@HSL output, @SONC output, @TU output, @TTC output,@BH output, @THUE output,@LTL output
        
        select @HSL as 'HeSoLuong',@SONC as 'SoNgayCong',@TU as 'TamUng',@TTC as 'TienTangCa',@BH as 'BaoHiem',@THUE as 'Thue',@LTL as 'TienThucLinh'`;
        try {
			const data = await sequelize.query(procGetNhanVienByMaNV, {
				type: QueryTypes.EXEC,
			});

            const dataLuong = await sequelize.query(procLuongTheoThanng, {
                type: QueryTypes.SELECT,
            })

            //check giới tính
            let nhanvien = data.flat();
            const gioitinh = await common.checkGioiTinh(nhanvien[0].GioiTinh);
            nhanvien = {...data.flat()[0], GioiTinh: gioitinh }

            res.render('pages/nhanvien/home', { 
                style: 'pages/nhanvien/home.css',
                layout: false,
                nhanvien: nhanvien,
                dataLuong: dataLuong[0]
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
        
        console.log({manv,lydo,maDon,today});
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
    // async taoNhanvien(req, res) {
    //     const nhanvien = req.body;
    //     const sqlGetNhanVienBymaNV = 
    //     `SELECT MaNV, concat(HoLot,+' '+TenNV)  as HoTen, cv.TenCV, pb.TenPhong, 
    //     nv.GioiTinh, nv.SDT, nv.NgaySinh, nv.DiaChi, nv.STK, nv.CMND, nv.SoBH
    //     FROM NHANVIEN nv
    //     JOIN CHUCVU cv ON nv.MaChucVu = cv.MaCV
    //     JOIN PHONGBAN pb ON nv.MaPhong = pb.MaPhong
    //     WHERE MaNV = '${manv}'`;

    //     try {
	// 		const nhanvien = await sequelize.query(sqlGetNhanVienBymaNV, {
	// 			type: QueryTypes.SELECT,
	// 		});

    //         //check giới tính
    //         nhanvien[0].GioiTinh = await common.checkGioiTinh(nhanvien[0].GioiTinh);

	// 		res.render('pages/nhanvien/home', { 
    //             style: 'pages/nhanvien/home.css',
    //             layout: false,
    //             nhanvien: nhanvien[0]
    //         });
	// 	} catch (err) {
	// 		return console.log(err.message);
	// 	}   
    // }
}

module.exports = new NhanVienController;