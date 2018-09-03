	//接口base路径
const scoreapi ='/credit/';
const serverapi='/server/credit/';
const accountapi='/account/';

/*======用户中心接口=======*/
//登录
export const LOGIN = accountapi+ 'user/login';
//登出
export const LOGOUT = accountapi+ 'user/logout';
//个人信息
export const PROFILE = accountapi+'user/profile';

/*======积分服务接口=======*/
//个人积分查询
export const SCOREDETAIL = serverapi+'home/user/score';
//兑换积分
export const  EXCHANGEIN= serverapi+'trade/exchange/in/jr';
//兑换规则
export const  RULE= serverapi+'rule/query';
//积分兑换流水
export const  FLOW= serverapi+'bill/user/query/';

/*======积分商城接口=======*/
//首页轮播图
export const BANNER = scoreapi+ 'mall/bannerList';
//热门商品
export const HOTGOODS = scoreapi+'goods/hot';
//热门商品
export const NEW = scoreapi+'goods/new';
//超值商品
export const SUPERVALUE = scoreapi+'goods/value';
//商品列表
export const GOODSLIST = scoreapi+'goods/category';
//商品详情
export const GOODSDETAIL = scoreapi+'goods/detail';
//结账
export const BALANCE = scoreapi+'order/create';
//查询t币
export const  TCOIN= scoreapi+'home/user/tcion';
//兑换商品
export const  EXCHANGEGOODS= scoreapi+'order/create';
//地址
export const  ADDRESSLIST= scoreapi+'address';
//所有地区
export const  AREA= scoreapi+'area';
//添加地址
export const  ADDADDRESS= scoreapi+'address/add';
//订单列表
export const  ORDERLIST= scoreapi+'order/list';
//确认收货
export const  TAKEOVER= scoreapi+'order/updateState';
//订单详情
export const  ORDERDETAIL= scoreapi+'order';
//物流查询
export const  LOGISTICS= scoreapi+'order/pull';
//抽奖
export const  LUCKYDRAW= scoreapi+'luckyDraw/appSlyderAdventures';
//抽奖活动详情
export const  PRIZEDETAIL= scoreapi+'luckyDraw';
//中奖名单
export const  WINNERLIST= scoreapi+'luckyDraw/winningRecord/list';
//免费抽奖次数
export const  FREETIME= scoreapi+'luckyDraw/freeLotteryTimes';
//发送中奖信息
export const  SENDLUCKY= scoreapi+'luckyDraw/createOrder';
//个人中奖信息
export const  MYRECORD= scoreapi+'luckyDraw/myWinningRecord/list';
//展示分类列表
export const  SHOWLIST= scoreapi+'goods/classcification';
//首页入口
export const  INLETLIST = scoreapi+'entryModule/list';
//公告
export const  NOTICE = scoreapi+'notice/list';
//活动列表
export const  ACTIVITY = scoreapi+'activityPage/list';
//积分筛选区间
export const  SCREEN = scoreapi+'scoreSection/list';
//积分筛选设置
export const  SCREENSET = scoreapi+'scoreSection/listSet';
