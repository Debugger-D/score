<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import mall_home from './views/mall_home/mall_home'//商城首页
  import goods_detail from './views/goods_detail/goods_detail'//商品详情页
  import con_record from './views/con_record/con_record'//通兑记录
  import address_list from './views/address_list/address_list'//地址管理
  import address_add from './views/address_add/address_add'//添加新地址
  import address_edit from './views/address_edit/address_edit'//编辑地址
  import order_list from './views/order_list/order_list'//订单管理
  import problems from './views/problems/problems'//问题
  import order_end from './views/order_end/order_end'//订单管理
  import order_detail from './views/order_detail/order_detail'//订单详情
  import order from './views/order/order'//订单
  import logistics from './views/logistics/logistics'//订单
  import activity from './views/activity/activity'//抽奖
  import goods from './views/goods/goods'//抽奖
  import personal from './views/personal/personal'//个人中心
  /*双旦活动*/
  import daily from './views/daily/daily'//
  import login from './login'//登录页面
  export default {
    name: 'app',
    components: {
      mall_home,
      goods_detail,
      con_record,
      address_list,
      address_add,
      address_edit,
      order_list,
      order_detail,
      problems,
      logistics,
      order_end,
      order,
      activity,
      goods,
      personal,
			daily,
      login
    }
  }
</script>
<style lang="sass">
  @import "./assets/css/reset.css";
  @import "./assets/css/common.css";
</style>
