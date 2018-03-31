<template>
  <div class="goods_detail">
    <div class="hasapp" v-if="!hasapp">
      <p>1.微信等暂不支持打开第三方应用，进行兑换将跳转到下载界面，请根据引导操作。</p>
      <p>2.若您已安装本应用，请进入浏览器后根据提示进入应用。。</p>
    </div>
    <vSlider11  ref="bannerSlider11"></vSlider11>
    <div class="goodsContent">
      <p class="goodsName">{{goodsDe.goodsName}}</p>
      <p class="alert">商品一经兑换，不可退换21213</p>
      <div class="bot-all clearBoth">
        <div class="c-bo">
          <span class="price">{{goodsDe.priceScore | number}} 积分 </span>
          <del class="oldprice" v-if="goodsDe.priceMarket"> 原价 ¥{{goodsDe.priceMarket/100}}</del>
        </div>
        <div class="c-cal">
          <span class="iconCount reduce" @click="reduce"></span>
          <span class="count">{{count}}</span>
          <span class="iconCount add" @click="add"></span>
        </div>
      </div>
    </div>
    <div class="description" v-if="goodsDe.remark">
      说明：{{goodsDe.remark}}
    </div>
    <div class="goodsInfo">
      <p v-for="(item,key) in goodsContent">
        <img :src="item.fileUrl+'?imageView2/2/w/500'">
      </p>
    </div>
    <div class="fixBot" v-if="hasapp">
      <div class="button canBuy" v-if="status===1" @click="exchangeGoods">
        <span>{{goodsDe.priceScore*count | number}} 积分立即兑换</span>
      </div>
      <div class="button default" v-if="status===2">
        <span>积分不足</span>
      </div>
      <div class="button default" v-if="status===3">
        <span>已下架</span>
      </div>
      <div class="button default" v-if="status===4">
        <span>暂时无货</span>
      </div>
    </div>
    <div class="fixBot" v-else>
      <div class="button canBuy" @click="goApp">
        <a href="javascript:;" style="color: white">
          <span> 立即兑换</span>
        </a>
      </div>
    </div>
    <div class="confirmModal" v-if="virtualBuy">
      <div class="mask"></div>
      <div class="con-main">
        <div class="cm-con">
          <div class="c-top">
            <p class="cc-bold">
              确定使用{{count*goodsDe.priceScore}}积分兑换？
            </p>
            <p class="payDe" v-if="payTcoin>0">（使用{{payScore}}积分 + {{payTcoin}}T币兑入）</p>
            <p class="cc-des">
              商品一经兑换，不可退换!
            </p>
          </div>
          <div class="cc-btns">
            <span class="ccb-sin ccb-1" @click="virtualClose">取消</span>
            <span class="ccb-sin ccb-2" @click="confirm">确定</span>
          </div>
        </div>
      </div>
    </div>
    <v-fixside :share="false" :home="true" :height="100"></v-fixside>
  </div>
</template>

<script>
  import * as types from '@/services/types'
  import * as methods from '@/util/common'
  import axios from 'axios';
  import store from '@/vuex/store';
  import { Toast } from 'mint-ui';

  import vSlider11 from '@/components/slider/slider-d'
  import vFixside from '@/components/fixside/fixside'
  export default {
    name: 'goods_detail',
    components: {vSlider11, vFixside},
    data (){
      return {
        count          : 1,
        score          : 0,
        tcoin          : 0,
        hasapp         : true,
        status         : 1,
        sendVal        : 0,
        appHref        : "/trc_app_open?jumpUrl=",
        goodsDe        : '',
        payScore       : 0,
        payTcoin       : 0,
        shareImg       : '',
        virtualBuy     : false,
        goodsContent   : '',
      }
    },
    mounted:function(){
      document.body.scrollTop=0;
      let this_ = this;
      let goodsId=this.$route.query.id;
			let app = methods.getCookie('platform');
			if(app === 'finance' || app === 'mall'){
      	this_.hasapp=true;
      }else{
        this_.hasapp=false;
      }
      this_.hasapp=true;
      //banner
      axios.get(types.GOODSDETAIL,{ params: {goodsId:goodsId}}).then(function (data) {
        this_.goodsDe = data.data;
        this_.goodsContent=JSON.parse(data.data.content);
        this_.$refs.bannerSlider11.banner=JSON.parse(data.data.mediumImg);
        this_.shareImg=JSON.parse(data.data.mediumImg)[0].fileUrl;
        if(this_.goodsDe.isUp===0){
        	this_.status=3
        }else if(this_.goodsDe.stock===0){
        	this_.status=4
        }
        //积分数量
        axios.get(types.SCOREDETAIL).then(function (data) {
          this_.score = data.data.score;
          axios.get(types.TCOIN).then(data1 => {
          	this_.tcoin = data1.data.tcoin;
            if(this_.count*this_.goodsDe.priceScore>(this_.score + this_.tcoin)){
              this_.status=2
            }
          })
        });
      });
    },
    updated:function () {
    	//分享
    	var image = 'https://jfimg.tairanmall.com/FilxIH_5Czv_WvgHATMwZna7rhIo';
      location.href = 'jsbridge://configToolbarBtns?params=' +
        methods.base64encode(methods.utf16to8(JSON.stringify([
          {
            "title": "",
            "icon": image,
            "badge": "",
            "action": "trmall://share?params=" + methods.base64encode(methods.utf16to8(JSON.stringify({
                "title": this.goodsDe.goodsName,
                "content": "我在泰然城积分商城发现了一个不错的商品，快来看看吧。",
                "badge": "",
                "link": window.location.href,
                "platforms": ["qq", "qzone", "weibo", "wxFriend", "wxTimeline", "clipboard"],
                "icon": this.shareImg,
                "shareBoardTitle": "",
                "shareBoardContent": ""
              })
              )
            ),
            "backgroundColor": ""
          }])
        ));
    },
    methods:{
    	reduce:function () {
    		if(this.status===1 || this.status===2){
          if(this.count>1){
            this.count--;
            if(this.count*this.goodsDe.priceScore>(this.score + this.tcoin)){
              this.status=2
            }else{
              this.status=1
            }
          }
        }
      },
      add:function () {
    		if(this.goodsDe.limitQuantity === 0){
          Toast('商品已达到兑换限制')
        }else if(this.goodsDe.category===1 ||this.goodsDe.category===10 ||this.goodsDe.category===50){
          Toast('该商品暂只支持单个兑换')
        }else{
          let limit;
          if(this.goodsDe.limitQuantity === -1){
            limit=this.goodsDe.stock
          }else {
            limit=Math.min(this.goodsDe.limitQuantity,this.goodsDe.stock)
          }
          if(this.count<limit){
            this.count++;
            if(this.count*this.goodsDe.priceScore>(this.score + this.tcoin)){
              this.status=2
            }else{
            	if (this.count*this.goodsDe.priceScore <= this.score){
            		this.payScore = this.count*this.goodsDe.priceScore
              }else{
            		this.payScore = this.score;
            		this.payTcoin = this.count*this.goodsDe.priceScore - this.score;
              }
            }
          }else{
            Toast('此商品最多可够买数量为'+limit)
          }
        }
      },
      virtualClose:function () {
        this.virtualBuy=false;
      },
      exchangeGoods:function () {
        if(this.goodsDe.limitQuantity === 0){
          Toast('商品已达到兑换限制')
        }else{
          if(this.count*this.goodsDe.priceScore>(this.score + this.tcoin)){
            this.status=2
          }else{
           //应付款小于积分
            if (this.count*this.goodsDe.priceScore <= this.score){
              this.payScore = this.count*this.goodsDe.priceScore;
              this.payTcoin = 0;
            }else{
              this.payScore = this.score;
              this.payTcoin = this.count*this.goodsDe.priceScore - this.score;
            }
          }
          this.virtualBuy=true;
        }
      },
      goApp:function () {
        window.location.href='https://m.trc.com/guide?redirect='+window.location.href;
      },
      confirm: function () {
        let data={
          price           : this.goodsDe.priceScore,
          goodsId         : this.goodsDe.id,
          payment         : this.count*this.goodsDe.priceScore,
          goodsCount      : this.count,
          isPhoneCard     : false,
          exchangeCurrency: ''
        };
        if (this.payTcoin>0){data.exchangeCurrency = 'TCOIN'}
        if (this.goodsDe.categoryCode){//虚拟卡
          if(this.goodsDe.categoryCode === 'FINANCIAL_CARD' ||this.goodsDe.categoryCode === 'EXTERNAL_CARD' || this.goodsDe.categoryCode === 'TAIRAN_CARD'){
            data.isPhoneCard = false;
            this.$router.push({path:'/order_end', query:data})
          }else {//充值卡
          	data.isPhoneCard = true;
            this.$router.push({path:'/order',query:data})
          }
        }else {
          this.$router.push({path:'/order',query:data})
        }

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .goods_detail{
    background-color: #f4f4f4;
    padding-bottom: p2r(167);
    .description{
      margin: p2r(15) 0;
      height: p2r(80);
      border:1px solid #E4E4E4;
      background-color: #fff;
      font-size: p2r(26);
      color: #353535;
      display: flex;
      align-items: center;
      padding: 0% p2r(30);
    }
    .hasapp{
      padding: p2r(15);
      line-height: p2r(30);
      background-color: #111;
      opacity: .6;
      color: #fff;
      position: fixed;
      top:0;
      z-index: 3;
    }
    .goodsContent{
      background-color: #fff;
      margin-top: p2r(10);
      box-sizing: border-box;
      border:1px solid #E4E4E4;
      padding: p2r(36) p2r(30) p2r(30) p2r(30);
      .goodsName{
        font-size: p2r(30);
        color: #353535;
        line-height: p2r(40);
        font-family: Microsoft YaHei, STHeiti, sans-serif;
      }
      .alert{
        color: #888;
        line-height: p2r(40);
      }
      .bot-all{
        height: p2r(35);
        width: 100%;
        margin-top: p2r(33);
        .c-bo{
          float: left;
          .price{
            color: #E60A30;
            font-size: p2r(36);
          }
          .oldprice{
            color: #999;
          }
        }
        .c-cal{
          float: right;
          span{
            display: inline-block;
          }
          .iconCount{
            width: p2r(48);
            height: p2r(48);
            background-repeat: no-repeat;
            background-size: p2r(46);
          }
          .reduce{
            background-image: url('../../assets/images/goods_detail/reduce.png');
            background-size:  100%;
          }
          .add{
            background-image: url('../../assets/images/goods_detail/add.png');
          }
          .count{
            width: p2r(85);
            height: p2r(45);
            text-align: center;
            font-size: p2r(30);
            color: #353535;
            vertical-align: text-bottom;
          }
        }
      }
    }
    .goodsInfo{
      margin-top: p2r(10);
      background-color: #fff;
      text-align: center;
      width: p2r(750);
      padding-top: p2r(20);
      overflow: hidden;
      p{
        padding: 0px p2r(15);
      }
      img{
        width: p2r(720);
        float: left;
      }
    }
    .fixBot{
      position: fixed;
      bottom: 0;
      z-index: 333;
      padding: p2r(28) p2r(32) p2r(30) p2r(32);
      background-color: #fff;
      border: 1px solid #e4e4e4;
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
      .default{
        background-color: #c9c9c9;
      }
    }
    .confirmModal{
      .con-main{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        width: 100%;
        text-align: center;
        .cm-con{
          font-family:SimHei;
          width: p2r(550);
          /*height: p2r(294);*/
          background: #fff;
          border-radius: p2r(6);
          margin: p2r(400) auto;
          .c-top{
            padding: p2r(10) 0 p2r(15) 0;
            /*height: p2r(211);*/
          }
          .cc-bold{
            padding-top: p2r(30);
            line-height: p2r(54);
            font-size: p2r(36);
            color: #353535;
            font-weight: bold;
          }
          .payDe{
            font-size: p2r(30);
            line-height: p2r(34);
            color: #666;
          }
          .cc-des{
            margin-top: p2r(30);
            font-family: SimHei;
            line-height: p2r(50);
            font-size: p2r(30);
            color: #c9c9c9;
            color: #c9c9c9;
          }
          .cc-btns{
            display: flex;
            align-items: stretch;
            .ccb-sin,a{
              flex: 1;
              border: 1px solid #E4E4E4;
              /*width: p2r(265);*/
              font-size: p2r(30);
              line-height: p2r(80);
            }
            a{
              border-left: none;
            }
            .ccb-2{
              /*border: none;*/
              color: #E60A30;
            }
          }
        }
      }
    }
  }
</style>
