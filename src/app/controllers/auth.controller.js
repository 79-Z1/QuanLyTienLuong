const { sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');

class AuthController {
	index(req, res) {
		res.render('pages/auth/login', {
			style: '/pages/auth/login.css',
			layout: false,
		});
	}

	async login(req, res) {
		const username = req.body.username;
		const password = req.body.password;

		const queryGetTaiKhoan = `SELECT * FROM TAIKHOAN WHERE TenTaiKhoan = '${username}' and MatKhau = '${password}'`
		try {
			const user = await sequelize.query(queryGetTaiKhoan, {
				type: QueryTypes.SELECT,
			});
            
			if(user.length !== 0) {
				return res.status(200).json({
					code: 200,
					elements: {	
						msg: 'success',
						taikhoan: user[0].TenTaiKhoan,
                        loai: user[0].LoaiTK
					},
				});
			} else {
				return res.status(200).json({
					code: 200,
					elements: {	
						msg: 'username or password invalid',
					},
				});
			}

		} catch (err) {
			return console.log(err.message);
		}
	}
}

module.exports = new AuthController();
