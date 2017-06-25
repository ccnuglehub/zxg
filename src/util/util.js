const checkPhone = val => {
    var patrn= /^1(3|4|5|6|7|8|9)\d{9}$/;   
    if (!patrn.exec(val)) {
        return false
    }
    return true
}
const checkName = val => {
    var patrn= /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/
    if (!patrn.exec(val)) {
        return false
    }
    return true
}
const checkEmpty = val => {
    if (val == '' || val == ' ' || val == undefined || val == null) {
        return true
    }
    return false
}
export {
	checkPhone,
    checkName,
    checkEmpty
}
