<template>
  <div class="logistics">
    <div class="header">
      <div class="left">
        <img :src="JSON.parse(detail.minImg).fileUrl" alt="">
      </div>
      <div class="right">
        <p class="text">
          <span>承运来源: </span>
          <span class="ma-left">{{detail.companyName}}</span>
        </p>
        <p class="text">
          <span>运单编号:</span>
          <span class="ma-left">{{detail.logisticsNum}}</span>
        </p>
        <p class="text">
          <span>官方电话:</span>
          <span class="ma-left">{{detail.shipperCode | phone}}</span>
        </p>
      </div>
    </div>
    <div class="content">
      <div class="title">
        订单跟踪
      </div>
      <div class="detail">
        <ul>
          <li v-for="(item,index) in message" :key="item.id" :class="{'color-blue':index==0}">
            <div class="logcon clearBoth">
              <div class="first" v-if="index==0">
                <span></span>
              </div>
              <div class="other" v-else="">
              </div>
              <div class="right">{{item.acceptStation}}</div>
            </div>
            <div class="time">
              {{item.acceptTime}}
            </div>
          </li>
          <li class="color-blue">
            <div class="logcon clearBoth">
              <div class="first" >
                <span></span>
              </div>
              <div class="right">包裹正在揽收</div>
            </div>
            <div class="time">
              &nbsp;
            </div>
          </li>
        </ul>
      </div>
    </div>
    <v-fixside :share="false" :home="true" :height="100"></v-fixside>
  </div>
</template>
<script>
  import * as types from '@/services/types'
  import axios from 'axios';
  import qs from 'qs';
  import { Toast ,Indicator} from 'mint-ui';
  import vFixside from '@/components/fixside/fixside'
  export default{
    components:{vFixside},
    data(){
      return{
        detail: {},
        message: '',
        state: '',
      }
    },
    mounted:function () {
      Indicator.open();
      let this_ = this;
      axios.get(types.ORDERDETAIL+'/'+this_.$route.query.id).then(function (data) {
        let params = {
          shipperCode: data.data.shipperCode,
          logisticsNum: data.data.logisticsNum,
        };
        this_.detail = data.data;
        axios.get(types.LOGISTICS,{params:params}).then(function (data) {
          this_.message = data.data.data.tracker;
          Indicator.close();
        },()=>{Indicator.close()});
      },()=>{Indicator.close()});
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .logistics{
    background-color: #f4f4f4;
    .header{
      background-color: #fff;
      padding: p2r(25) p2r(30);
      box-sizing: border-box;
      height: p2r(200);
      .left{
        float: left;
        img{
          width: p2r(150);
          height: p2r(150);
        }
      }
      .right{
        float: left;
        margin-left: p2r(60);
        margin-top: p2r(20);
        .text1{
          font-size: p2r(28);
          color:#353535;
          padding-bottom: p2r(23);
          .color-blue{
            margin-left: p2r(32);

          }
        }
        .text{
          color: #808080;
          line-height: p2r(40);
          .ma-left{
            margin-left: p2r(30);
          }
        }
      }
    }
    .content{
      margin-top: p2r(20);
      background-color: #fff;
      padding:0 p2r(30);
      font-size: p2r(28);
      color: #353535;
      .title{
        height: p2r(84);
        border-bottom: 1px solid #f4f4f4;
        line-height: p2r(84);
        font-weight: 500;
      }
      .detail{
        margin-top: p2r(30);
        li{
          margin-top: p2r(30);
          margin-left: p2r(20);
          font-size: p2r(24);
          border-left: 1px solid #e4e4e4;
          color: #808080;
          .logcon{
            position: relative;
            .first{
              position: absolute;
              top:p2r(-4);
              left: p2r(-16);
              display: inline-block;
              width: p2r(32);
              height: p2r(32);
              padding: p2r(4);
              box-sizing: border-box;
              background-color: #CAF0FF;
              border-radius: 50%;
              span{
                display: inline-block;
                width: p2r(24);
                height: p2r(24);
                background-color:#27A1E5;
                border-radius: 50%;
              }
            }
            .other{
              position: absolute;
              top:p2r(-22);
              left: p2r(-8);
              display: inline-block;
              width: p2r(16);
              height: p2r(16);
              box-sizing: border-box;
              background-color: #e4e4e4;
              border-radius: 50%;
            }
            .right{
              line-height: p2r(40);
              font-size: p2r(28);
              display: inline-block;
              padding-left: p2r(45);
              width: p2r(600);
            }
          }
          .time{
            line-height: p2r(80);
            margin-left: p2r(50);
            border-bottom: 1px solid #f4f4f4;
          }
        }
      }
    }
  }
</style>
