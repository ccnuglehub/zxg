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
//把时间从秒转换为年月日
const changeDate = val => {
    if(val){
        // console.log(typeof val)
        var val = parseInt(val)
        // console.log(typeof val)

        var date = new Date(val),Y,M,D;
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        return Y+M+D
    }else{
        var date = new Date();
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        return Y+M+D
    }
}

export {
	checkPhone,
    checkName,
    checkEmpty,
    changeDate
}
