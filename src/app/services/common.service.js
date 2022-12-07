const checkGioiTinh = async (gioitinh) => {
    if (gioitinh && gioitinh == true) {
        return 'Nam'
    } else return 'Nữ'
}

const random100To999 = () => {
    return Math.floor(Math.random() * 999) + 100;
}


module.exports = { checkGioiTinh,random100To999 }