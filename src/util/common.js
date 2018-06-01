/**
 * Created by hzjiazhenshan on 2017/3/14.
 */

//设置cookie
export const setCookie=function (c_name,value,expiredays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};
//删除cookie
export const delCookie=function (name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
};
//获取cookie
export const getCookie=function(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};

//分享编码
export const utf16to8 = function (str) {
  var out, i, len, c;

  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out;
};
export const base64encode = function (str) {
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out, i, len;
  var c1, c2, c3;

  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
};
//查找数组
/**
 *
 * 查找数组，返回匹配到的第一个index
 *
 * @param array 被查找的数组
 * @param feature 查找特征 或者为一个具体值，用于匹配数组遍历的值，或者为一个对象，表明所有希望被匹配的key-value
 * @param or boolean 希望命中feature全部特征或者只需命中一个特征，默认true
 *
 * @return 数组下标  查找不到返回-1
 *
 * //单个特征查找
 * var index = findArray(arr, {id: '1'});
 * //多个特征全满足查找
 * var index = findArray(arr, {id: '1', name: 'cmx'});
 * 多个特征单个满足查找(只需满足其中一个)
 *var index = findArray(arr, {id: '1', name: '习大大'}, false);
 *
 *
 */
export const findArray=function(array, feature, all = true) {
  for(let index in array){
    let cur = array[index];
    if(feature instanceof Object){
      let allRight = true;
      for(let key in feature){
        let value = feature[key];
        if(cur[key] == value && !all) return index;
        if(all && cur[key] != value){
          allRight = false;
          break;
        }
      }
      if(allRight) return index;
    }else{
      if(cur == feature){
        return index;
      }
    }
  }
  return -1;
}
