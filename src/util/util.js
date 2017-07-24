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
        Y = date.getFullYear() + '.';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
        D = date.getDate() + ' ';
        return Y+M+D
    }else{
        var date = new Date();
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
        D = date.getDate() + ' ';
        return Y+M+D
    }
}

const changeType = val => {
    // console.log(typeof type)
    //4油漆工 5泥瓦工 6水电工 7木工
    switch(val){
        case "4":
            return "油漆工";
            break;
        case "5":
            return "泥瓦工";
            break;
        case "6":
            return "水电工";
            break;
        case "7":
            return "木工";
            break;
    }
}
const getScrollPosition = val => {
    const scroll_height = document.body.scrollTop
    const doc_height = document.body.scrollHeight
    console.log(scroll_height)
    // if (height == doc_height && this.fetch_flag == true) {
    // 	// doSomething
    // }
    // if (scroll_height == 0 && this.fetch_flag == true) {
    // 	// doSomething
    // }
}
// const timer = (val, fn) => {
//     if()
//     var clock = setTimeout(fn, val)
//     return clock
// }

export {
	checkPhone,
    checkName,
    checkEmpty,
    changeDate,
    changeType,
    getScrollPosition
}
