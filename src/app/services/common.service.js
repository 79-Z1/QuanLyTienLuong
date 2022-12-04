

const checkGioiTinh = async (gioitinh) => {
    if (gioitinh == true) {
        return 'Nam'
    } else return 'Nữ'
}

module.exports = { checkGioiTinh }