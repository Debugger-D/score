<template>
  <div class="order_detail">
    <div class="orderNum">
      <span>订单号: {{order.orderNum}}</span>
      <span class="status">{{order.orderState | orderState}}</span>
    </div>
    <div class="padding"></div>
    <div v-if="order.orderType==1">
      <router-link :to="{path:'/logistics',query:{id:order.id}}">
        <div class="logistics" v-if="order.orderState == 2 || order.orderState == 3 || order.orderState == 4">
          <div class="left">
            {{order.orderState | logiState}}
          </div>
        </div>
      </router-link>

      <div class="address">
        <div class="left">
          <div class="left-t">
            <span class="receiverName">收货人： {{order.receiverName}}</span>
            <span class="phone">{{order.receiverPhone}}</span>
          </div>
          <div class="left-b">
            <p>收货地址: {{order.province}}{{order.city}}{{order.area}}{{order.address}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="order.orderType==3">
      <div class="card">
        <div class="left">
          电子码：<span class="color-blue">{{order.couponCode}}</span>
        </div>
      </div>
      <div class="address style">
        <div class="left">
          <div class="left-b">
            <p>配送方式: 自动发放</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="order.orderType==2">
      <div class="address style linkTo" @click="toCardList">
        <div class="left">
          <div class="left-b">
            <p>配送方式: 自动发放至金融资产 <span class="color-blue"> 我的卡券</span></p>
          </div>
        </div>
      </div>
      <!--<div class="address style">
        <div class="left">
          <div class="left-b">
            <p>配送方式: 自动发放至金融资产我的卡券</p>
          </div>
        </div>
      </div>-->
    </div>
    <div v-if="order.orderType==4">
      <div class="address style linkTo" @click="toShopList">
        <div class="left">
          <div class="left-b">
            <p>配送方式: 自动发放&nbsp;&nbsp;&nbsp; <span class="color-blue"> 查看我的优惠券</span></p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="order.orderType == 5 || order.orderType == 6 || order.orderType == 7">
      <div class="address style">
        <div class="rechargePhone">
          <div class="left-b">
            <p>手机号码: {{order.rechargePhone}}</p>
          </div>
        </div>
      </div>
      <div class="address style type">
        <div class="rechargePhone">
          <div class="left-b">
            <p>充值方式: 3个工作日内（节假日顺延）</p>
          </div>
        </div>
      </div>
    </div>
    <div class="padding"></div>
    <div class="goodsInfo">
      <router-link  :to="{ path: '/goods_detail', query: { id: order.goodsId}}">
        <div class="content clearBoth">
        <div class="pull-left">

            <a href="javascript:;">
              <img :src="fileUrl" alt="" :title="order.goodsName" class="imglazyload" >
            </a>

        </div>
        <div class="pull-center fl">
          <div class="tt">
            <p class="name">{{order.goodsName}}</p>
          </div>
          <div class="pp">
            <p class="price"> <span class="num">{{order.payment}}</span> 积分</p>
            <p class="oldp" v-if="order.priceMarket"><del>原价¥{{order.priceMarket/100}}</del></p>
            <p class="oldp count">x {{order.goodsCount}}</p>
          </div>
        </div>
      </div>
      </router-link>
    </div>
    <div class="bb1">
      <p>
        <span>商品总额</span>
        <span class="payment">{{order.payment}} 积分</span>
      </p>
      <p class="bott" v-if="order.orderType==1">
        <span>运费</span>
        <span class="payment">￥0.00</span>
      </p>
    </div>
    <div class="bb2 clearBoth">
      <div class="bbbt clearBoth">
        <p>实付：<span class="payment">{{order.payment}}积分</span></p>
      </div>
      <div class="bbbb clearBoth">
        <p>下单时间：<span>{{order.createTime | time('yyyy.MM.dd  hh:mm:ss')}}</span></p>
      </div>
    </div>
    <v-fixside :share="false" :home="true" :height="100"></v-fixside>
  </div>
</template>
<script>
  import * as types from '@/services/types'
  import * as methods from '@/util/common'
  import axios from 'axios';
  import qs from 'qs';
  import { Toast } from 'mint-ui';
  import vFixside from '@/components/fixside/fixside'
  export default{
    components:{vFixside},
    data(){
      return{
        order:'',
        fileUrl:'',
      }
    },
    mounted:function () {
    	let this_=this;
      let id=this.$route.query.id;
      axios.get(types.ORDERDETAIL+'/'+id).then(function (data) {
        this_.order=data.data
        this_.fileUrl=JSON.parse(data.data.minImg).fileUrl
      })
    },
    methods:{
      toCardList:function () {
        window.location.href="https://jrwx.trc.com/my/tool/coupon"
      },
      toShopList:function () {
				let app = methods.getCookie('platform');
				if(app === 'finance'){
					window.location.href="https://jr-m.tairanmall.com/couponList"
				}else{
					window.location.href='https://m.tairanmall.com/couponList';
				}

      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .order_detail{
    background-color: #f4f4f4;
    .orderNum{
      height: p2r(100);
      line-height: p2r(100);
      padding: 0 p2r(30);background-color: #fff;
      font-size: p2r(26);
      .status{
        float: right;
        color: #E60A30;
      }
    }
    .logistics{
      /*margin-top: p2r(20);*/
      background-color: #fff;
      height: p2r(100);
      padding:0 p2r(30);
      border-bottom:1px solid #f4f4f4;
      background-image: url("../../assets/images/order/next.png");
      background-repeat: no-repeat;
      background-position: p2r(700);
      background-size:p2r(17) p2r(30) ;
      .left{
        font-size: p2r(28);
        padding-left: p2r(50);
        color: #27a1e5;
        background: url('../../assets/images/order_detail/car.png') no-repeat ;
        background-position: left;
        background-size: p2r(39) p2r(36);
        line-height: p2r(100);
      }
    }
    .card{
      background-color: #fff;
      height: p2r(100);
      padding:0 p2r(30);
      border-bottom: 1px solid #f4f4f4;
      .left{
        font-size: p2r(28);
        padding-left: p2r(50);
        background: url('../../assets/images/order_detail/ecode.png') no-repeat ;
        background-position: left;
        background-size: p2r(39) p2r(36);
        line-height: p2r(100);
        color:#353535;
      }
    }
    .address{
      padding: p2r(35) p2r(30);
      box-sizing: border-box;
      color: #353535;
      background-color: #fff;
      padding-right: 0;
      .left{
        padding:0 p2r(50);
        height: p2r(120);
        background-image: url("../../assets/images/order/address.png");
        background-repeat: no-repeat;
        background-position: p2r(0) p2r(55);
        background-size:p2r(34) p2r(44) ;
        .left-t{
          .phone{
            display: inline-block;
            float: right;
          }
        }
        .left-b{
          margin-top: p2r(30);
          line-height: p2r(35);
        }
      }
      .rechargePhone{
        padding: p2r(30) 0;
      }
    }
    .style{
      padding: 0 p2r(30);
      font-size: p2r(28);
      .left{
        background-position: p2r(0) p2r(40);
        .left-b{
          line-height: p2r(120);
          margin-top: 0;
        }
      }
    }
    .type{
      border-top: 1px solid #f4f4f4;
    }
    .linkTo{
      background-image: url("../../assets/images/order/next.png");
      background-repeat: no-repeat;
      background-position: p2r(700);
      background-size:p2r(17) p2r(30) ;
    }
    .padding{
      height: p2r(17);
      background-color: #f4f4f4;
    }
    .goodsInfo{
      padding: p2r(23) p2r(30);
      background-color: #fff;
      .content{
        background-color: #f4f4f4;
        height: p2r(160);
        padding: p2r(10);
        box-sizing: border-box;
        width: 100%;
        /*border-bottom: p2r(2) solid #E4E4E4;*/
        .pull-left{
          float: left;
          img{
            width: p2r(150);
            height: p2r(150);
          }
        }
        .pull-center{
          width: p2r(470);
          margin-top: p2r(10);
          margin-left: p2r(20);
          .tt{
            .name{
              font-size: p2r(24);
              color: #353535;
              line-height: p2r(30);
            }
            .count{
              margin-top: p2r(10);
              color: #999;
            }
          }
          .pp{
            margin-top: p2r(50);
            p{
              float: left;
            }
            .oldp{
              color: #999;
              margin-left: p2r(40);
            }
            .price{
              font-size: p2r(24);
              color: #353535;
              font-weight: bold;
              .num{
                font-size: p2r(24);
                font-family: ArialMT;
              }
            }
            .count{
              float: right;
            }
          }
        }
      }
    }
    .bb1{
      margin-top: p2r(10);
      padding:p2r(30);
      background-color: #fff;
      font-size: p2r(28);
      color: #808080;
      .bott{
        margin-top: p2r(25);
      }
      .payment{
        float:right;
        color: #e60a30;
      }
    }
    .bb2{
      background-color: #fff;
      margin-top: p2r(10);
      padding: p2r(30);
      width: p2r(750);
      box-sizing: border-box;
      .bbbb,.bbbt{
        box-sizing: border-box;
        width: p2r(690);
      }
      .bbbt{
        font-size: p2r(28);
        .payment{
          font-size: p2r(34);
          color: #e60a30;
        }
      }
      .bbbb{
        font-size: p2r(24);
        color: #808080;
        margin-top: p2r(15);
      }
      p{
        float: right;
      }
    }
  }
</style>
