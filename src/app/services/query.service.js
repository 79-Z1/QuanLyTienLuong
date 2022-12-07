const { sequelize } = require('../models/index');
const { QueryTypes, JSON } = require('sequelize');
const common = require('../services/common.service');

const procTinhLuongTheoNV = (manv) => {
	return `EXEC pr_TinhLuongTheoNhanVien 12, 2022, '${manv}'`;
};

const procTinhLuongTheoPhong = (maphong) => {
	return `EXEC pr_TinhLuongTheoPhong 12, 2022, '${maphong}'`;
};

const procTinhLuongCaCongTy = () => {
	return `exec pr_TinhLuongCaCongTy 12,202`;
};

const insertNhanVien = async ({sdt,machucvu,maphong,holot,ten,gioitinh,ngaysinh,diachi,stk,cmnd}) => {
	const manv = `NV${common.random100To999()}`;
	const insertNhanVien = `insert into NHANVIEN values('${manv}','${machucvu}','${maphong}',N'${holot}',N'${ten}',${gioitinh},'${ngaysinh}',N'${diachi}','${stk}','${cmnd}','${sdt}');`

	try {
		await sequelize.query(insertNhanVien, {
			type: QueryTypes.INSERT,
		});
		
		const nhanviens = await sequelize.query(selectAllNhanVien(), {
			type: QueryTypes.SELECT,	
		});
		return nhanviens;
	} catch (error) {
		console.error(error)
	}

}

const selectAllNhanVien = async () => {
	const queryGetAllNV = 
	`SELECT MaNV, concat(HoLot,+' '+TenNV)  as HoTen, cv.TenChucVu, pb.TenPhong, nv.GioiTinh, nv.SDT, nv.NgaySinh, nv.DiaChi, nv.CMND, nv.STK
	FROM NHANVIEN nv
	JOIN CHUCVU cv ON nv.MaChucVu = cv.MaChucVu
	JOIN PHONG pb ON nv.MaPhong = pb.MaPhong`

	const nhanviens = await sequelize.query(queryGetAllNV, {
		type: QueryTypes.SELECT,
	});

	//check giới tính
	for(let nv of nhanviens) {
		nv.GioiTinh = await common.checkGioiTinh(nv.GioiTinh);
	}

	return nhanviens;
}

module.exports = { procTinhLuongTheoNV, procTinhLuongTheoPhong,procTinhLuongCaCongTy,selectAllNhanVien,insertNhanVien };
