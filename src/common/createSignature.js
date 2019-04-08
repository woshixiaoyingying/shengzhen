import md5 from 'md5';

const authKey = '3Zni474GQd4JeUh4IeuLeuKNx4LFJCwVwCRoYkMX4so4dQgZhCVI3w8B5Km7yOwH';

function objKeySort(obj) {//排序的函数
    var newkey = Object.keys(obj).sort();
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
}
function createSignature(obj){
    if(typeof obj['itimestamp'] === 'undefined'){
        let timestamp = new Date().getTime() / 1000;
        obj['itimestamp'] = timestamp.toString().split('.')[0];
    }
    let params = objKeySort(obj);
    let str = '';
    for(let i in params){
        str += i + '=' + params[i].toString() + '&';
    }

    str = str.substr(0, str.length - 1);
    if(obj.itimestamp){
      delete obj.itimestamp
    }
    return md5(str + authKey);
}

export default createSignature