/**
 * Created by hzjiazhenshan on 2017/3/30.
 */

import Vue from 'vue'
//毫秒转时间
Vue.filter( 'time' , function(date,format) {
	date = new Date(date);
	var map = {
		"M": date.getMonth() + 1, //月份
		"d": date.getDate(), //日
		"h": date.getHours(), //小时
		"m": date.getMinutes(), //分
		"s": date.getSeconds(), //秒
		"q": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};
	format = format.replace(/([yMdhmsqS])+/g, function(all, t){
		var v = map[t];
		if(v !== undefined){
			if(all.length > 1){
				v = '0' + v;
				v = v.substr(v.length-2);
			}
			return v;
		}
		else if(t === 'y'){
			return (date.getFullYear() + '').substr(4 - all.length);
		}
		return all;
	});
	return format;
});
//订单状态
Vue.filter( 'orderState' , function(data) {
  switch (data){
    case 1:
      data='待发货';
      break;
    case 2:
      data='待收货';
      break;
    case 3:
      data='交易成功';
      break;
    case 4:
      data='交易成功';
      break;
    case 5:
      data='退货';
      break;
  }
  return data
});
//物流状态
Vue.filter( 'logiState' , function(data) {
  switch (data){
    case 1:
      data='待发货';
      break;
    case 2:
      data='运输中';
      break;
    case 3:
      data='已确认收货';
      break;
    case 4:
      data='系统确认收货';
      break;
    case 5:
      data='退货';
      break;
  }
  return data
});
//快递状态
Vue.filter( 'trackState' , function(data) {
  switch (data){
    case 2:
      data='运输中';
      break;
    case 3:
      data='已签收';
      break;
    case 4:
      data='问题件';
      break;
  }
  return data
});
//快递商家
Vue.filter( 'track' , function(data) {
  switch (data){
    case 'HHTT':
      data = '天天快递';
      break;
    case "YD":
      data = '韵达快递';
      break;
    case "STO":
      data = '申通快递';
      break;
    case "YTO":
      data = '圆通速递';
      break;
    case "ZTO":
      data = '中通速递';
      break;
    case "RFD":
      data = '如风达';
      break;
    case "EMS":
      data = 'EMS';
      break;
    case "jd":
      data = '京东物流';
      break;
    case "shunfeng":
      data = '顺丰';
      break;
    case "huitongkuaidi":
      data = '百世汇通';
      break;
  }
  return data
});
//快递商家手机号
Vue.filter( 'phone' , function(data) {
  switch (data){
    case 'HHTT':
      data='400-188-8888';
      break;
    case "YD":
      data='95546';
      break;
    case "STO":
      data='95543';
      break;
    case "YTO":
      data='95554';
      break;
    case "ZTO":
      data='95311';
      break;
    case "RFD":
      data='400-010-6660';
      break;
    case "EMS":
      data='11183';
      break;
    case "shunfeng":
      data='95338';
      break;
    case "huitongkuaidi":
      data='95320';
      break;
    case "jd":
      data="400-603-360";
  }
  return data
});
//数字三位加逗号
Vue.filter('number' , function formatNum(str){
  let newStr = "";
  let count = 0;
  if(str){
    if(typeof str=='number'){
      str=str.toString();
    }

    if(str.indexOf(".")==-1){
      for(let i=str.length-1;i>=0;i--){
        if(count % 3 == 0 && count != 0){
          newStr = str.charAt(i) + "," + newStr;
        }else{
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      str = newStr; //自动补小数点后两位
    }
    else
    {
      for(let i = str.indexOf(".")-1;i>=0;i--){
        if(count % 3 == 0 && count != 0){
          newStr = str.charAt(i) + "," + newStr;
        }else{
          newStr = str.charAt(i) + newStr; //逐个字符相接起来
        }
        count++;
      }
      str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
    }
  }

  return str
})
