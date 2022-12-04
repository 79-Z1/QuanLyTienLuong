const { sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');

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

module.exports = { getAllAccount }