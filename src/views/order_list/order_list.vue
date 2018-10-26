<template>
  <div class="orderList">
    <div class="header">
      <ul class="nav clearBoth">
        <li :class="{active:orderState==''}" @click="requestOrder('')">
          <p>全部</p>
        </li>
        <li :class="{active:orderState==1}"  @click="requestOrder(1)">
          <p>待发货
            <span v-if="typeCount.quantityToBeDelivered>0" class="count">{{typeCount.quantityToBeDelivered}}</span>
          </p>
        </li>
        <li :class="{active:orderState==2}"  @click="requestOrder(2)">
          <p>待收货<span v-if="typeCount.quantityToBeReceived >0" class="count">{{typeCount.quantityToBeReceived }}</span></p>
        </li>
        <li :class="{active:orderState ==3}"  @click="requestOrder(3)">
          <p>已完成</p>
        </li>
      </ul>
    </div>
    <div class="list">
      <ul  v-if="list.length>0">
        <li v-for="item in list" :key="item.id">
          <router-link  :to="{path:'/order_detail',query:{id:item.id}}">
            <div class="content clearfix">
              <div class="pull-left">
                <img :src='JSON.parse(item.minImg).fileUrl' alt="">
              </div>
              <div class="pull-right">
                <div class="pl-top">
                  <div class="plt-l">
                    <p>{{item.goodsName}}</p>
                    <p class="gary">数量：{{item.goodsCount}}</p>
                  </div>
                  <div class="plt-r">
                    <span>{{item.orderState | orderState}}</span>
                  </div>
                </div>
                <div class="pl-bottom">
                  <span>共{{item.goodsCount}}件商品 </span>
                  <span>实付款: {{item.payment}}积分</span>
                </div>
              </div>
            </div>
          </router-link>

          <div class="do clearfix" v-if="item.orderState==2">
            <router-link :to="{path:'/logistics',query:{id:item.id}}">
              <a class="default-btn">查看物流</a>
            </router-link>
            <a @click="confirm(item)" class="red-btn">确认收货</a>
          </div>
        </li>
      </ul>
      <div v-else class="noData">
        <div class="icon">
        </div>
        <p>您还没有相关订单</p>
      </div>
    </div>
    <v-fixside :share="false" :home="true" :height="100"></v-fixside>
  </div>
</template>
<script>
  import * as types from '@/services/types'
  //import * as methods from '@/util/common'
  import axios from 'axios';
  import qs from 'qs';
  import { Toast } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import vFixside from '@/components/fixside/fixside'
  export default{
  	components: {vFixside},
    name: 'order_list',
    data(){
      return{
        list:'',
        orderState:'',
        typeCount:'',
      }
    },
    mounted: function () {
      this.orderState = this.$route.query.type || '';
      this.requestOrder(this.orderState);
    },
    methods: {
      requestOrder:function (orderState) {
        Indicator.open('加载中...');
      	let this_=this;
        this_.orderState=orderState;
        axios.get(types.ORDERLIST,{params:{orderState:orderState,pageSize:1000}}).then(function (data) {
        	Indicator.close();
        	this_.typeCount=data.data;
          this_.list=data.data.infos;
        },function () {
          Indicator.close();
        })
      },
      confirm:function (item) {
      	let this_=this;
        MessageBox.confirm('是否确认收货?').then(function (action) {
          let data={
          	orderId:item.id,
            orderState:3
          };
          axios.post(types.TAKEOVER,qs.stringify(data)).then(function () {
            Toast('操作完成')
            this_.requestOrder()
          },function (data) {
            Toast(data.description)
          })
        });
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .orderList{
    .header{
      width: 100%;
      background-color: #fff;
      border:1px solid #e4e4e4;
      position: fixed;
      top: 0;
      z-index: 333;
      .nav{
        width:100%;
        display: flex;
        li{
          /*display: flex;*/
          flex:1;
          float: left;
          text-align: center;
          p{
            line-height: p2r(89);
            font-size: p2r(28);
            color: #353535;
            margin: 0 auto;
            width: p2r(100);
            height: p2r(79);
            position: relative;
            .count{
              position: absolute;
              top:p2r(13);
              right: p2r(-8);
              display: inline-block;
              padding:1px 5px;
              color: #fff;
              height: 11px;
              border-radius: 7px;
              background-color: #E60A30;
              font-size: 8px;
              line-height: 11px;
            }
          }
        }
        .active{
          p{
            color: #0086D1;
            border-bottom: 2px solid #0086D1;
          }
        }
      }
    }
    .list{
      padding-top: p2r(85);
      background-color: #f4f4f4;
      .noData{
        height: p2r(1000);
        text-align: center;
        color: #c9c9c9;
        font-size: p2r(28);
        .icon{
          margin-top: p2r(300);
          height: p2r(200);
          background:url('../../assets/images/order/nodata.png') no-repeat center ;
          background-size: p2r(100) p2r(82);
        }
      }
      li{
        background-color: #fff;
        font-size: p2r(24);
        color: #353535;
        margin-bottom: p2r(20);
        .content{
          height: p2r(210);
          box-sizing: border-box;
          padding: p2r(30);
          .pull-left{
            float: left;
            background: url('../../assets/images/mall_home/loading1.gif') no-repeat center;
            img{
              width: p2r(150);
              height: p2r(150);
            }
          }
          .pull-right{
            float: left;
            width: p2r(500);
            margin-left: p2r(30);
            .pl-top{
              height: p2r(120);
              line-height: p2r(30);
              .plt-l{
                float: left;
                width: p2r(390);
                .gary{
                  margin-top: p2r(10);
                  color: #C9C9C9;
                }
              }
              .plt-r{
                color: #E60A30;
                float: right;
                /*margin-left: p2r(25);*/
              }
            }
            .pl-bottom{
              float: right;
            }
          }
        }
        .do{
          height: p2r(80);
          border: 1px solid #f4f4f4;
          a{
            margin-top: p2r(15);
          }
          .default-btn{
            float: left;
            display: flex;
            width: p2r(150);
            height: p2r(50);
            border: 1px solid #E4E4E4;
            border-radius: p2r(30);
            justify-content: center;
            align-items: center;
            margin-left: p2r(378);
          }
          .red-btn{
            margin-left: p2r(20);
            float: left;
            display: flex;
            width: p2r(150);
            height: p2r(50);
            border: 1px solid #E60A30;
            color: #E60A30;
            border-radius: p2r(30);
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
</style>
