import App from '../App'
import axios from 'axios';
//import TrcActivity from '../assets/common';
import * as methods from '@/util/common'
import store from '@/vuex/store'
export default [
  {
    path: '/',
    name: '积分商城',
    meta: { keepAlive: true },
    component: App.components.mall_home
  },
  {
    path: '/goods_detail',
    name: '积分商城',
    component: App.components.goods_detail
  },
  {
    path: '/con_record',
    name: '通兑记录',
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: App.components.con_record
  },
  {
    path: '/address_list',
    name: '管理收货地址',
    meta: {
      requireAuth: true,
    },
    component: App.components.address_list
  },
  {
    path: '/address_add',
    name: '添加新地址',
    meta: {
      requireAuth: true,
    },
    component: App.components.address_add
  },
  {
    path: '/address_edit',
    name: '编辑地址',
    meta: {
      requireAuth: true,
    },
    component: App.components.address_edit
  },
  {
    path: '/order_list',
    name: '全部订单',
    meta: {
      requireAuth: true,
    },
    component: App.components.order_list
  },
  {
    path: '/mall_home',
    name: '积分商城',
    component: App.components.mall_home
  },
  {
    path: '/problems',
    name: '常见问题',
    component: App.components.problems
  },
  {
    path: '/order_end',
    name: '积分商城',
    meta: {
      requireAuth: true,
    },
    component: App.components.order_end
  },
  {
    path: '/order_detail',
    name: '订单详情',
    meta: {
      requireAuth: true,
    },
    component: App.components.order_detail
  },
  {
    path: '/logistics',
    name: '查看物流',
    meta: {
      requireAuth: true,
    },
    component: App.components.logistics
  },
  {
    path: '/order',
    name: '订单确认',
    meta: {
      requireAuth: true,
    },
    component: App.components.order
  },
  {
    path: '/activity',
    name: '幸运抽奖',
    component: App.components.activity
  },
  {
    path: '/goods',
    name: '所有商品',
    component: App.components.goods
  },
  {
    path: '/personal',
    name: '个人中心',
    component: App.components.personal
  },
  {
    path: '/daily',
    name: '活动',
    component: App.components.daily
  },
  {
    path: '/login',
    name: 'login',
    component: App.components.login
  },
]

axios.interceptors.response.use(function(response){
  return response;
},function(error){
  if(error.response && error.response.status==401){
    console.log('未登录');
    store.commit('SET_LOGINSTATE',false);
		let app = methods.getCookie('platform');
		if(app === 'finance'){
      window.location.href='taihe://to_login';
    }else if (app === 'mall'){
			window.location.href='trmall://to_login';
		}else{
      window.location.href='trmall://open_link_in_new_window?url=aHR0cHM6Ly9qZi50cmMuY29tL2NyZWRpdF9oNS9pbmRleC5odG1sIy8=';
    }
    return Promise.reject(error.response.data.error);
  }else{
    return Promise.reject(error.response.data.error);
  }
});