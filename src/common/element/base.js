//验证类
const validatorBase = {
    message: null,
    rules:{
        integer: [/^\d+$/, "请填写数字"]
        ,letter: [/^[a-z]+$/i, "请填写字母"]
        ,date: [/^\d{4}-\d{2}-\d{2}$/, "请填写有效的日期，格式:yyyy-mm-dd"]
        ,dateTime: [/^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/, "请填写有效的日期时间，格式:yyyy-mm-dd hh:mm:ss"]
        ,time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请填写有效的时间，00:00到23:59之间"]
        ,email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "请填写有效的邮箱"]
        ,url: [/^(https?|s?ftp):\/\/\S+$/i, "请填写有效的网址"]
        ,idcard: [/^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, "请填写正确的身份证号码"]
        ,simpleIdcard:[/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/, "请填写正确的身份证号码"]
        ,tel: [/^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/, "请填写有效的电话号码"]
        ,mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"]
        ,zipcode: [/^\d{6}$/, "请检查邮政编码格式"]
        ,chinese: [/^[\u0391-\uFFE5]+$/, "请填写中文字符"]
        ,password: [/^[\S]{6,16}$/, "请填写6-16位字符，不能包含空格"]
        ,float: [/^[-\+]?\d+(\.\d+)?$/, '只能包含数字、小数点等字符']
        ,number: [/(^[-\+]?\d+$) | (^[-\+]?\d+(\.\d+)?$)/, '请填写数字']
        ,money: [/(^\-\d+$)|(^\-\d+\.\d{1,2}$)|(^\d+$)|(^\d+\.\d{1,2}$)/, '请填有效金额']
        ,bankno: [/^\d{19}$/, '请填写有效的银行卡号']
    },
    match(value, array){
        let regx = array[0]
        let re = eval(regx)
        if(!re.exec(value)){
            validatorBase.message = array[1]
            return false
        }
        return true
    },
    getMessage(){
        return validatorBase.message
    }
}
export default validatorBase