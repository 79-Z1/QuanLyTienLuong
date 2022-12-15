const { sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');
const common = require('../services/common.service');
const query = require('../services/query.service');

class AdminController {
    async indexKT(req, res) {
		try {
			const nhanviens = await query.selectAllNhanVien();

            res.render('pages/admin/ketoan', { 
                style: '/pages/admin/ketoan.css',
                nhanviens: nhanviens,
            });
		} catch (err) {
			return console.log(err.message);
		}
    }

    async showBaoCao(req, res) {
        res.render('pages/admin/bao-cao-thong-ke', { 
            style: '/pages/admin/bao-cao-thong-ke.css',
        });
    }

    async showLapBangLuong(req, res) {
        try {
            res.render('pages/admin/lap-bangluong', { 
                style: '/pages/admin/lap-bangluong.css',
            });
        } catch (error) {
            return console.log(error.message);
        } 
    }

    async TaoBangLuong(req, res) {
        try {
            const procTinhLuongCongTy = query.procTinhLuongCaCongTy();
        
            const bangLuong = await sequelize.query(procTinhLuongCongTy, {
                type: QueryTypes.SELECT,
            });
    
            res.render('pages/admin/lap-bangluong', { 
                style: '/pages/admin/lap-bangluong.css',
                bangLuong: bangLuong
            });
        } catch (error) {
            return console.log(error.message);
        } 
    }

    async showUngLuong(req, res) {
        const queryGetAllPhieuUngLuong = `SELECT * FROM PHIEUUNGLUONG WHERE Duyet IS NULL`
		try {
			const phieuUngLuong = await sequelize.query(queryGetAllPhieuUngLuong, {
				type: QueryTypes.SELECT,
			});
            
			res.render('pages/admin/ung-luong', { 
                style: '/pages/admin/ung-luong.css',
                phieuUngLuong
            });

		} catch (err) {
			return console.log(err.message);
		}
        
    }

    async TinhLuong(req, res) {
        let bangTinhLuong = null;
        const type = req.query.type;
        const ma = req.query.ma.toLowerCase().trim();

        const procTinhLuongTheoNV = query.procTinhLuongTheoNV(ma);
        const procTinhLuongTheoPhong = query.procTinhLuongTheoPhong(ma);
        const procTinhLuongCongTy = query.procTinhLuongCaCongTy();

        try {
            switch(type) {
                case 'nhanvien':
                    bangTinhLuong = await sequelize.query(procTinhLuongTheoNV, {
                        type: QueryTypes.SELECT,
                    });

                    return res.render('pages/admin/tinh-luong', { 
                        style: '/pages/admin/tinh-luong.css',
                        bangTinhLuong: bangTinhLuong
                    });
                case 'phong':
                    bangTinhLuong = await sequelize.query(procTinhLuongTheoPhong, {
                        type: QueryTypes.SELECT,
                    });
                    
                    res.render('pages/admin/tinh-luong', { 
                        style: '/pages/admin/tinh-luong.css',
                        bangTinhLuong: bangTinhLuong
                    });
                    break;
                    case 'congty':
                        bangTinhLuong = await sequelize.query(procTinhLuongCongTy, {
                            type: QueryTypes.SELECT,
                        });
                        res.render('pages/admin/tinh-luong', { 
                            style: '/pages/admin/tinh-luong.css',
                            bangTinhLuong: bangTinhLuong
                        });
                        break;
            }
		} catch (err) {
			return res.json(err.message);
		}
    }

    async showKhieuNai(req, res) {
        const getAllDonKhieuNai = `SELECT * FROM DONKHIEUNAI WHERE GiaiQuyet IS NULL`
		try {
			const donKhieuNai = await sequelize.query(getAllDonKhieuNai, {
				type: QueryTypes.SELECT,
			});
            
			res.render('pages/admin/khieu-nai', { 
                style: '/pages/admin/khieu-nai.css',
                donKhieuNai
            });

		} catch (err) {
			return console.log(err.message);
		}
    }

    async showTinhLuong(req, res) {        
        return res.render('pages/admin/tinh-luong', { 
            style: '/pages/admin/tinh-luong.css',
        });
    }

    async updateUngLuong(req, res) {
        const maPhieu = req.body.maphieu;
        const duyet = req.body.duyet;
        
        const updatePhieuUngLuong = `UPDATE PHIEUUNGLUONG SET Duyet = ${duyet} WHERE MaPhieu = '${maPhieu}'`

		try {
			const phieuUngLuong = await sequelize.query(updatePhieuUngLuong, {
				type: QueryTypes.UPDATE,
			});
            
			res.render('pages/admin/ung-luong', { 
                style: '/pages/admin/ung-luong.css',
                phieuUngLuong
            });

		} catch (err) {
			return console.log(err.message);
		}
    }

    async updateKhieuNai(req, res) {
        const maDon = req.body.maDon;
        const duyet = req.body.duyet;
        
        const updatePhieuUngLuong = `UPDATE DONKHIEUNAI SET GiaiQuyet = ${duyet} WHERE MaDon = '${maDon}'`

		try {
			const donKhieuNai = await sequelize.query(updatePhieuUngLuong, {
				type: QueryTypes.UPDATE,
			});
            
			res.render('pages/admin/khieu-nai', { 
                style: '/pages/admin/khieu-nai.css',
                donKhieuNai
            });

		} catch (err) {
			return console.log(err.message);
		}
        
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

    async showCungCapTTNV(req, res) {
        try {
			const nhanviens = await query.selectAllNhanVien();

            res.render('pages/admin/cung-cap-thong-tin', { 
                style: '/pages/admin/cung-cap-thong-tin.css',
                layout: 'main2.hbs',
                nhanviens
            });
		} catch (err) {
			return console.log(err.message);
		}
    }

    async showLapBangChamCong(req, res) {
        res.render('pages/admin/lap-bang-cham-cong', { 
            style: '/pages/admin/lap-bang-cham-cong.css',
            layout: 'main2.hbs'
        });
    }

    async ThemNhanVien(req, res) {
        try {
            console.log(req.body);
			const nhanviens = await query.insertNhanVien(req.body);

            res.render('pages/admin/cung-cap-thong-tin', { 
                style: '/pages/admin/cung-cap-thong-tin.css',
                layout: 'main2.hbs',
                nhanviens
            });
		} catch (err) {
			return console.log(err.message);
		}
    }
}

module.exports = new AdminController;
