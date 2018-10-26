<template>
  <div class="order">
    <div v-if="queryData.isPhoneCard">
      <div class="phoneCard">
        <div class="phoneText">充值手机号</div>
        <div class="p-right">
          <input type="number" v-model="cardPhone" onkeypress="this.value=this.value.replace(/\D/gi,'')" placeholder="请输入手机号"  maxlength="11">
        </div>
        <div class="pr-error" v-if="phoneFalse && cardPhone!==''">请输入正确的手机号</div>
        <div class="resetPhone" @click="resetPhone">
          <img src="../../assets/images/order/delete.png" alt="">
        </div>
      </div>
    </div>
    <div v-else>
      <router-link :to="{path:'/address_list',query:queryData}">
        <div class="address" v-if="address">
          <div class="left">
            <div class="left-t">
              <span class="receiverName">收货人:{{address.receiverName}}</span>
              <span class="phone">{{address.phone}}</span>
            </div>
            <div class="left-b">
              <p>收货地址: {{address.province}}{{address.city}}{{address.area}}{{address.address}}</p>
            </div>
          </div>
        </div>
        <div class="addAddress" v-else>
          添加新地址
        </div>
      </router-link>
    </div>
    <div class="padding"></div>
    <div class="goodsInfo">
      <div class="content clearBoth">
        <div class="pull-left">
          <router-link  :to="{ path: '/goods_detail', query: {id: item.id}}" replace>
            <img :src="img.fileUrl+'?imageView2/2/h/300'" :title="item.goodsName" class="imglazyload">
          </router-link>
        </div>
        <div class="pull-center fl">
          <div class="tt">
            <p class="name">{{item.goodsName}}</p>
          </div>
          <div class="pp">
            <p class="price"> <span class="num">{{item.priceScore}}</span> 积分</p>
            <p class="oldp" v-if="item.priceMarket"><del>原价¥{{item.priceMarket/100}}</del></p>
            <p class="oldp count">x {{queryData.goodsCount}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="fixBot">
      <div class="text">
        <p>运费:免运费</p>
        <p class="price">
          <span class="mar">共{{queryData.goodsCount}}件商品</span>
          <span>合计:</span>
          <span class="red">{{queryData.payment}}积分</span>
        </p>
      </div>
      <div class="button canBuy" @click="exchange">
        <span>积分立即兑换</span>
      </div>
    </div>
  </div>
</template>
<script>
  import * as types from '@/services/types'
  //import * as methods from '@/util/common'
	import { mapGetters, mapActions} from 'vuex';
  import axios from 'axios';
  import { Toast } from 'mint-ui';

  export default {
    name: 'order',
    data (){
      return {
        img:          '',
        item:         '',
        address:      {},
				queryData:    {},
				cardPhone:    '',
				phoneFalse:   true,
				terminalType: 'PC'
			}
    },
    computed: {
			...mapGetters([
				'getState'
			])
    },
    mounted:function(){
      let this_ = this;
      this_.queryData = this.$route.query;
      let goodsId = this.$route.query.goodsId;
      if(this_.queryData.addressId){//从地址编辑跳转过来
      	let id = this_.queryData.addressId;
        axios.get(types.ADDRESSLIST+'/'+id).then(function (data) {
          this_.address = data.data;
        });
      }else{
      	if (this.queryData.isPhoneCard){
          axios.get(types.PROFILE).then(function (data) {
            this_.cardPhone = data.data.phone;
          });
        }else {
          axios.get(types.ADDRESSLIST).then(function (data) {
            this_.address = data.data.infos[0];
          });
        }
      }
      //商品详情
      axios.get(types.GOODSDETAIL, {params: {goodsId: goodsId}}).then(function (data) {
        this_.item = data.data;
        this_.img = JSON.parse(data.data.mediumImg)[0];
      });
      if (!this.getState.goodsState.terminalType){
        var u = navigator.userAgent, app = navigator.appVersion;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){this_.terminalType = 'ANDROID'}
        if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){this_.terminalType = 'IOS'}
      }
    },
    methods:{
      exchange: function () {
      	//非充值  无地址
        if (!this.address && !this.queryData.isPhoneCard){
      		Toast('请先添加地址');
          return
      	}
      	//充值  无手机号
      	if (this.queryData.isPhoneCard && this.phoneFalse){
          Toast('请输入正确的充值手机号');
					this.phoneFalse = true;
          return
        }
        !this.address && (this.address = {id: ''});
        //正常情况
        let data = Object.assign(this.queryData, {addressId: this.address.id, rechargePhone: this.cardPhone, type: this.terminalType});
        this.$router.replace({path: '/order_end', query: data});
      },
			resetPhone: function () {
        this.cardPhone = '';
			},
      ...mapActions([''])
    },
    watch: {
      cardPhone: function () {
				var val = this.cardPhone = this.cardPhone.slice(0, 11).replace(/[^0-9-]+/,'');
        if(val.length != 11 || val.match(/1[3456789]\d{9}$|^(0\d{2,3}-?)?[2-9]\d{5,7}(-\d{1,5})/g) == null){
          this.phoneFalse = true;
        }else {this.phoneFalse = false;}
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .order{
    .phoneCard{
      height: p2r(150);
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: p2r(28);
      color: #353535;
      padding: 0 p2r(30);
      .p-right{
        padding-left: p2r(30);
        position: relative;
        input{
          height: p2r(50);
          width: p2r(430);
          border: none;
          font-size: p2r(46);
          line-height: p2r(60);
          font-family:'HiraginoSansGB', "Hiragino Sans GB", "Microsoft YaHei", 黑体, Helvetica, Arial, Tahoma, sans-serif;
        }
        ::-webkit-input-placeholder {
          font-size:p2r(30);
        }
      }
      .pr-error{
        float: left;
        position: absolute;
        top:p2r(105);
        left: p2r(230);
        font-size: p2r(24);
        color: #e60a30;
      }
      .resetPhone{
        img{
          width: p2r(30);
        }
      }
    }
    .address{
      padding: p2r(45) p2r(30);
      box-sizing: border-box;
      color: #353535;
      background-image: url("../../assets/images/order/next.png");
      background-repeat: no-repeat;
      background-position: p2r(700);
      background-size:p2r(17) p2r(30) ;
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
          }
        }
        .left-b{
          margin-top: p2r(30);
          line-height: p2r(35);
        }
      }
    }
    .addAddress{
      padding: p2r(35) p2r(30);
      font-size: p2r(28);
      background-image: url("../../assets/images/order/next.png");
      background-repeat: no-repeat;
      background-position: p2r(700);
      background-size:p2r(17) p2r(30) ;
    }
    .padding{
      height: 1px;
      background-color: #E6E6E6;
      width: 92%;
      margin: 0 auto;
    }
    .goodsInfo{
      padding: p2r(23) p2r(30);
      .content{
        background-color: #f4f4f4;
        height: p2r(160);
        padding: p2r(15);
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
    .fixBot{
      position: fixed;
      bottom: 0;
      z-index: 333;
      padding: p2r(28) p2r(32) p2r(20) p2r(32);
      background-color: #fff;
      border: 1px solid #e4e4e4;
      .text{
        text-align: right;
        /*.price*/
        padding-bottom: p2r(30);
        line-height: p2r(35);
        .price{
          .mar{
            margin-right: p2r(60);
          }
          .red{
            color: #E60A30;
            font-size: p2r(34);
          }
        }
      }
      .button{
        display: inline-block;
        margin: 0 auto;
        width: p2r(687);
        height: p2r(77);
        border-radius: p2r(6);
        color: #fff;
        font-size: p2r(36);
        line-height: p2r(75);
        text-align: center;
      }
      .canBuy{
        background-color: #E60A30;
      }
    }
  }
</style>
