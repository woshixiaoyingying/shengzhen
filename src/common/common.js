import settings from '@/settings'

//获取滚动条高度
function getScrollTop() {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}

//时间戳转化时间日期显示
//参数是时间 要转的格式 还有时间类别是秒还是毫秒
let parseTime = (sj, structure, type) => {

  function addZero(val) {
    if (val < 10) {
      return '0' + val
    }
    return val
  }

  var nowo
  if (type === 'ms') {
    nowo = new Date(sj);
  } else {
    nowo = new Date(sj * 1000);
  }

  var year = nowo.getFullYear();
  var month = addZero(nowo.getMonth() + 1);
  var date = addZero(nowo.getDate());
  var hour = addZero(nowo.getHours());
  var minute = addZero(nowo.getMinutes());
  var second = addZero(nowo.getSeconds());
  if (structure === 'YY-MM-DD') {
    return year + "-" + month + "-" + date
  } else if (structure === 'YY-MM') {
    return year + "-" + month
  }
  return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
}



//转化时间日期差显示
function getDateDiff(dateTimeStamp) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  var result
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else
    result = "刚刚";
  return result;
}

//时间戳转倒计时
let transCountDown = (date) => {
  let curDate = new Date().getTime()
  let diff = date * 1000 - curDate

  let day = Math.floor(diff / (24 * 3600 * 1000))
  let countDown = String(day > 0 ? day : 0)
  return countDown
}

//验证密码
let verificationPassword = (password) => {
  let reg = /^[0-9A-Za-z]{6,16}$/
  if (!reg.test(password)) {
    return "新密码必须为6-16位数字或字母"
  }
  return false
}


//验证是不是在一个月里
let inAMonth = (start, end) => {
  let startDate = new Date(start),
    endDate = new Date(end);
  let startMonth = parseInt(startDate.getMonth()) + 1,
    endMonth = parseInt(endDate.getMonth()) + 1;
  if (startMonth == endMonth) {
    return true;
  }
  return false;
}

//判断一个对象是空对象
const isEmptyObject = function (obj) {

  for (var key in obj) {
    return false
  };
  return true
};

//格式化数字
function number_format(number, decimals, dec_point, thousands_sep, roundtag) {
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
   * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  roundtag = roundtag || "ceil"; //"ceil","floor","round"
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {

      var k = Math.pow(10, prec);
      console.log();

      return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
// console.log(number_format(2, 2, ".", ","))//"2.00"
// console.log(number_format(3.7, 2, ".", ","))//"3.70"
// console.log(number_format(3, 0, ".", ",")) //"3"
// console.log(number_format(9.0312, 2, ".", ","))//"9.03"
// console.log(number_format(9.00, 2, ".", ","))//"9.00"
// console.log(number_format(39.715001, 2, ".", ",", "floor")) //"39.71"
// console.log(number_format(9.7, 2, ".", ","))//"9.70"
// console.log(number_format(39.7, 2, ".", ","))//"39.70"
// console.log(number_format(9.70001, 2, ".", ","))//"9.71"
// console.log(number_format(39.70001, 2, ".", ","))//"39.71"
// console.log(number_format(9996.03, 2, ".", ","))//"9996.03"
// console.log(number_format(1.797, 3, ".", ",", "floor"))//"1.797"

//去除对象中没有值得属性
function dealElement(obj) {
  var param = {};
  if (obj === null || obj === undefined || obj === "") return param;
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      param[key] = obj[key];
    }
  }
  return param;
}

//头像的url没有http的加上
function parseHeaderImgSrc(src) {
  if (typeof (src) !== 'string') {
    return ''
  }
  if (src.indexOf('http') !== -1) {
    return src
  }
  return `${settings.imgUrlCDN}/${src}`
}




//判断字符串是否包含url

function  isContainURL(str_url) { 
  let  strRegex  =  "((https|http|ftp|rtsp|mms)?://)"  +  "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"  //ftp的user@ 
       +  "(([0-9]{1,3}\\.){3}[0-9]{1,3}"  // IP形式的URL- 199.194.52.184 
       +  "|"  // 允许IP和DOMAIN（域名）
       +  "([0-9a-z_!~*'()-]+\\.)*"  // 域名- www. 
       +  "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\."  // 二级域名 
       +  "[a-z]{2,6})"  // first level domain- .com or .museum 
       +  "(:[0-9]{1,4})?"  // 端口- :80 
       +  "((/?)|"  // a slash isn't required if there is no file name 
       +  "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)";   
  let  re = new  RegExp(strRegex);   //re.test()
    
  if  (re.test(str_url)) {  
    return  (true);   
  } else {   
    return  (false);   
  } 
}


//根据身份证号判断年纪
function getAge(identityCard) {
  var len = (identityCard + "").length;
  if (len == 0) {
    return 0;
  } else {
    if ((len != 15) && (len != 18)) //身份证号码只能为15位或18位其它不合法
    {
      return 0;
    }
  }
  var strBirthday = "";
  if (len == 18) //处理18位的身份证号码从号码中得到生日和性别代码
  {
    strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
  }
  if (len == 15) {
    strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);
  var nowDateTime = new Date();
  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

//替换名字里的点
function replaceStr(str) {
  return str.replace(/[.。•、 ]/g, "·")
}

function paraseResData(res) {
  if (res.data && res.data.data && res.data.data.message) {
    return res.data.data.message
  }
  return false
}
//解析广告url
function parseAdvurl(URL) {
  let arr = URL.split(':')
  if (arr.length == 1) {
    return `/goods/goodsdetails/${URL}`
  } else {
    let type = arr[0]
    let id = arr[1]
    switch (type) {
      case 'goods':
        return `/goods/goodsdetails/${id}`
      case 'article':
        return `///newsdetails/${id}`
    }
  }
}

export {
  getScrollTop,
  parseTime,
  getDateDiff,
  verificationPassword,
  inAMonth,
  isEmptyObject,
  number_format,
  dealElement,
  parseHeaderImgSrc,
  isContainURL,
  getAge,
  replaceStr,
  paraseResData,
  parseAdvurl
}
