const { sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');


const checkTaiKhoan = async () => {
    const procCheckTK = `EXEC proc_check_taikhoan 'KT001','NV004'`;

    try {
        const taikhoan = await sequelize.query(procCheckTK, {
            type: QueryTypes.EXEC,
        });
        return taikhoan;
    } catch (err) {
        return console.log(err.message);
    }
}

const login =  async (req, res) => {
    const username = req.body.username

    if(user) {
        if(user.password !== req.body.password) {
            return res.status(200).json({
                code: 200,
                elements: {	
                    msg: 'password invalid',
                },
            });
        }
        return res.status(200).json({
            code: 200,
            elements: {	
                msg: 'success',
                username: user.username,
                accessToken: await signAccessToken()
            },
        });
    } else {
        return res.status(200).json({
            code: 200,
            elements: {	
                msg: 'username invalid',
            },
        });
    }
}





const getAllAccount = async () => {
    const sqlSelectAll = 'SELECT * FROM PHONGBAN';

    try {
        const phongbans = await sequelize.query(sqlSelectAll, {
            type: QueryTypes.SELECT,
        });
        return phongbans;
    } catch (err) {
        return console.log(err.message);
    }
}

module.exports = { 
    getAllAccount
    ,checkTaiKhoan 
}