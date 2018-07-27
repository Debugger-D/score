<template>
  <div class="activity" :style="{ background: data.appBackColour }">
    <div class="hasapp" v-if="!hasapp">
      <p>1.微信等暂不支持打开第三方应用，进行兑换将跳转到下载界面，请根据引导操作。</p>
      <p>2.若您已安装本应用，请进入浏览器后根据提示进入应用</p>
    </div>
    <!--banner-->
    <div class="f-banner">
      <img :src="JSON.parse(data.appBackground)[0].fileUrl+'?imageView2/2/w/750'" alt="">
    </div>
    <div class="f-title">
      <div class="ft-main">
        <img class="ftm-gift" src="./../../assets/images/activity/gift.png" alt="">
        <p class="ftm-text">
          <span v-if="freeTime.freeLotteryTimes!==0">免费次数 <span class="c-9E240D">{{freeTime.freeLotteryTimes}}</span> ,</span>
          剩余积分 <span class="c-9E240D">{{score}}</span>个
          <span v-if="freeTime.freeLotteryTimes===0&&freeTime.participationLimitTimes!==-1">, 剩余次数 <span class="c-9E240D">{{freeTime.participationLimitTimes}}</span></span>
        </p>
      </div>
    </div>
    <div class="f-tv">
      <div class="ft-table">
        <div class="single" :class="{active:activityId===data.activityPrizesList[0].id}">
          <img class="goods" :src="data.activityPrizesList[0].prizeUrl+'?imageView2/1/w/200/h/200/q/200'" alt="">
          <p class="g-name">{{data.activityPrizesList[0].name}}</p>
        </div>
        <div class="single" :class="{active:activityId==data.activityPrizesList[1].id}">
          <img class="goods" :src="data.activityPrizesList[1].prizeUrl+'?imageView2/1/w/200/h/200/q/200'" alt="">
          <p class="g-name">{{data.activityPrizesList[1].name}}</p>
        </div>
        <div class="single" :class="{active:activityId==data.activityPrizesList[2].id}">
          <img class="goods" :src="data.activityPrizesList[2].prizeUrl+'?imageView2/1/w/200/h/200/q/200'" alt="">
          <p class="g-name">{{data.activityPrizesList[2].name}}</p>
        </div>
        <div class="single" :class="{active:activityId==data.activityPrizesList[7].id}">
          <img class="goods" :src="data.activityPrizesList[7].prizeUrl+'?imageView2/1/w/200/h/200/q/200'" alt="">
          <p class="g-name">{{data.activityPrizesList[7].name}}</p>
        </div>
        <div class="single routeNow" :class="{isFree:freeTime.freeLotteryTimes>0}" @click="routeNow">
          <span class="count" v-if="freeTime.freeLotteryTimes<=0">{{data.expenditure}}积分/次</span>
        </div>
        <div class="single" :class="{active:activityId==data.activityPrizesList[3].id}">
          <img class="goods" :src="data.activityPrizesList[3].prizeUrl+'?imageView2/1/w/200/h/200/q/200'" alt="">
          <p class="g-name">{{data.activityPrizesList[3].name}}</p>
        </div>
        <div class="single" :class="{active:activityId==data.activityPrizesList[6].id}">
          <img class="goods" :src="data.activityPrizesList[6].prizeUrl+'?imageView2/1/w/200/h/200/q/200'" alt="">
          <p class="g-name">{{data.activityPrizesList[6].name}}</p>
        </div>
        <div class="single" :class="{active:activityId==data.activityPrizesList[5].id}">
          <img class="goods" :src="data.activityPrizesList[5].prizeUrl+'?imageView2/1/w/200/h/200/q/200'" alt="">
          <p class="g-name">{{data.activityPrizesList[5].name}}</p>
        </div>
        <div class="single" :class="{active:activityId==data.activityPrizesList[4].id}">
          <img class="goods" :src="data.activityPrizesList[4].prizeUrl+'?imageView2/1/w/200/h/200/q/200'" alt="">
          <p class="g-name">{{data.activityPrizesList[4].name}}</p>
        </div>
      </div>
    </div>
    <div class="f-btns">
      <div class="fb-rules fb-b"  @click="rulesShow">
        <img src="./../../assets/images/activity/problem.png" alt="">
        <span>活动规则</span>
      </div>
      <div class="fb-mine fb-b" @click="personalShow">
        <img src="./../../assets/images/activity/b-gift.png" alt="">
        <span>我的奖品</span>
      </div>
    </div>
    <div class="f-list">
      <div class="fl-mine">
        <div class="flm-hid">
          <ul :style="{marginTop: marginTop+'px'}" class="sliderUp" ref="abc">
            <li v-for="item in winList" :key="item.id">
              <span>{{item.lotteryPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</span>
              <span class="pr-mr">{{item.prizeName}}</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <div class="f-super" v-if="goodsList.length>0">
      <h2 class="fs-title c-B91A1F">超值换购</h2>
      <ul class="fs-list">
        <li v-for="item in goodsList" :key="item.id">
          <router-link :to="{ path: '/goods_detail', query: { id: item.id}}">
            <div class="fsl-img">
              <img :src="item.mediumImg" alt="">
            </div>
            <div class="fsl-text">
              <p class="c-FF705F">花{{item.priceScore}}积分&nbsp; 兑换</p>
              <p class="goods-name">{{item.goodsName}}</p>
            </div>
          </router-link>
        </li>
      </ul>
      <p class="fs-bot">*图片仅供参考</p>
    </div>
    <div class="f-modal" v-show="prizeDetail!=''">
      <div class="fm-mask"></div>
      <!--实物奖品-->
      <div class="p-pop" v-if="prizeDetail.prizeType==='GOODS'&&prizeDetail.goodsType=='MATERIAL'">
        <div class="p-box p-goods">
          <div class="pb-top">
            <img src="./../../assets/images/activity/zcjb.png" alt="">
            <div class="pbt-text">
              <p class="discri">恭喜您! 抽中</p>
              <p class="discri c-FC3439">{{prizeDetail.prizeName}}</p>
            </div>
          </div>
          <div class="y-milk">
            <div class="ym-center">
              <div class="ymc-address">
                <span class="ymca-label">详细地址</span>
                <div class="ymca-ar">
                  <div v-if="addressDetail">
                    {{addressDetail.receiverName}}
                    {{addressDetail.phone}}
                    {{addressDetail.province}}
                    {{addressDetail.city}}
                    {{addressDetail.area}}
                    {{addressDetail.address}}
                  </div>
                  <div v-else>
                    暂无收货地址
                  </div>
                </div>
              </div>
              <div class="add-address" >
                <span @click="toAddress">管理地址</span>
              </div>
            </div>
            <a class="p-btn" @click="submit" v-if="addressDetail">确定</a>
            <a class="p-btn" @click="toAddress" v-else>去添加地址</a>
          </div>
        </div>
      </div>
      <!--异常错误-->
      <div class="p-pop" v-else-if="prizeDetail.prizeType==='ERROR'">
        <div class="p-box">
          <span class="close" @click="closeModal"></span>
          <img class="cartoon" src="./../../assets/images/activity/meng.png" alt="">
          <p class="discri">{{errorData}}</p>
          <button class="p-btn" @click="closeModal">好的</button>
        </div>
      </div>
      <!--积分不足-->
      <div class="p-pop" v-else-if="prizeDetail.prizeType==='logFalse'">
        <div class="p-box">
          <span class="close" @click="closeModal"></span>
          <img class="cartoon" src="./../../assets/images/activity/meng.png" alt="">
          <p class="discri">{{errorData}}</p>
          <router-link to="/personal">
            <button class="p-btn">去兑换积分</button>
          </router-link>
        </div>
      </div>
      <!--没抽中-->
      <div class="p-pop" v-else-if="prizeDetail.prizeType==='TKY_FOR_PARTICIPATING'">
        <div class="p-box">
          <span class="close" @click="closeModal"></span>
          <img class="cartoon" src="./../../assets/images/activity/kuqi.png" alt="">
          <p class="discri">没抽中~再来一次吧！</p>
          <button class="p-btn" @click="closeModal">好的</button>
        </div>
      </div>
      <!--虚拟奖品-->
      <div class="p-pop" v-else>
        <div class="p-box">
          <span class="close" @click="closeModal"></span>
          <img class="cartoon" src="./../../assets/images/activity/haha.png" alt="">
          <p class="discri">恭喜您抽中 <span class="c-FC3439">{{prizeDetail.prizeName}}</span></p>
          <button class="p-btn" @click="closeModal">好的</button>
        </div>
      </div>
    </div>
    <!--抽奖规则-->
    <div class="f-rules" v-show="fixType===1">
      <p class="fr-tilte">抽奖规则</p>
      <div class="fr-content" v-html="data.activityRules">

      </div>
      <div class="fr-fix">
        <span class="frf-close" @click="closeRules"></span>
      </div>
    </div>
    <!--我的奖品-->
    <div class="f-rules" v-show="fixType===2">
      <p class="fr-tilte">获得的奖品</p>
      <div class="fr-table">
        <ul>
          <li class="frt-head">
            <span class="frth-name">获得的奖品</span>
            <span class="frth-date">获得日期</span>
          </li>
          <li class="frt-body" v-for="item in myRecord" :key="item.id">
            <span class="t-name">{{item.prizeName}}
              <span class="tn-setAdd" v-if="item.code">卡密：{{item.code}}</span>
              <span class="tn-setAdd" v-if="item.prizeType==='GOODS' && item.goodsType==='MATERIAL' && !item.address" @click="addAddress(item)">添加地址></span>
            </span>
            <span class="t-date">{{item.drawTime |  time('yyyy.MM.dd')}}</span>
          </li>
        </ul>
      </div>
      <div class="fr-fix">
        <span class="frf-close" @click="closeRules"></span>
      </div>
    </div>
    <v-fixside :share="false" :home="true" :height="100"></v-fixside>
  </div>
</template>
<script>
  import * as types from '@/services/types';
  import * as methods from '@/util/common'
  import axios from 'axios';
  import qs from 'qs';
  import { Toast } from 'mint-ui';
  //import TrcActivity from '../../assets/common';
  import store from '@/vuex/store'
  import { mapGetters ,mapState } from 'vuex'
  import vFixside from '@/components/fixside/fixside'
  import lodash from 'lodash'
  export default{
    data(){
      return{
        data:'',
        goodsList:'',
        id:'',
        hasapp:true,
        freeTime:'',
        score:'',
        winList:'',
        myRecord:'',
        fixType:'',
        prizeDetail:'',
        addressDetail:'',
        marginTop:0,
        errorData:'',
        liIndex:-1,
        activityId:'',
        canClick:true,
        speed: 100,
        prizeArr: [],
      }
    },
    components:{vFixside},
    computed: {
      ...mapGetters([
        'getState'
      ]),
      ...mapState(['isLogin']),
    },
    mounted:function () {
    	let this_=this;
      this.id=this.$route.query.id;
      if(this.$route.query.orderNum){
      	this_.fromAddress();
      }
			store.commit('SET_LOGINSTATE',false);
			let app = methods.getCookie('platform');
			if(app === 'finance' || app === 'mall'){
        this_.hasapp=true;
      }else{
        this_.hasapp=false;
      }
      store.commit('SET_ACTIVITYID',this.id);
    	//活动详情
      axios.get(types.PRIZEDETAIL+'/'+this_.id).then(function (data) {
      	this_.data=data.data;
      	data.data.activityPrizesList.forEach(function (val) {
          this_.prizeArr.push(val.id)
        });
        //分享
        var image = 'https://jfimg.tairanmall.com/FilxIH_5Czv_WvgHATMwZna7rhIo';
        location.href = 'jsbridge://configToolbarBtns?params=' +
          methods.base64encode(methods.utf16to8(JSON.stringify([
            {
              "title": "",
              "icon": image,
              "badge": "",
              "action": "trmall://share?params=" + methods.base64encode(methods.utf16to8(JSON.stringify({
                  "title":'幸运大转盘 豪礼抱回家',
                  "content": '惊喜免费送，轻轻一转，超级大奖，等你来抽！',
                  "badge": "",
                  "link": window.location.href,
                  "platforms": ["qq", "qzone", "weibo", "wxFriend", "wxTimeline", "clipboard"],
                  "icon":'https://jfimg.tairanmall.com/FvahHKyDsvUkFEsyxvN8GrwJIIJm' ,
                  "shareBoardTitle": "",
                  "shareBoardContent": ""
                })
                )
              ),
              "backgroundColor": ""
            }])
          ));
      });
      //商品列表
      axios.get(types.SUPERVALUE,{ params: {pageSize:8, limit: 8}}).then(function (data) {
        this_.goodsList=data.data.infos;
        this_.goodsList.map(function (item) {
          item.mediumImg = JSON.parse(item.mediumImg)[0].fileUrl+'?imageView2/1/w/200/h/200/q/200'
        });
      });
      this.personal();
      this.winnerList();
    },
    methods : {
      personal:function () {
        let this_ = this;
        //积分数量
        axios.get(types.SCOREDETAIL).then(function (data) {
          this_.score = data.data.score;
        });
        //获取免费次数
        axios.get(types.FREETIME+'/'+this_.id).then(function (data) {
          this_.freeTime=data.data;
        });
      },
      //获取用户积分
      getScore:function () {
        let this_ = this;
        //积分数量
        axios.get(types.SCOREDETAIL).then(function (data) {
          this_.score = data.data.score;
        });
      },
      //中奖列表
      winnerList:function () {
      	let this_=this;
        //中奖名单
        axios.get(types.WINNERLIST,{params:{platform:'',luckyDrawId:this_.id,pageSize:300}}).then((data) =>{
        	let arr = data.data.infos;
          /*let union = {};
          let newD = arr.filter( (item, i)=>{
            if( item.lotteryPhone in union ){
              if( item.goodsType === "MATERIAL" ){
                return false;
              }else{
                union[item.lotteryPhone] = 1;
                return true;
              }
            }else{
              union[item.lotteryPhone] = 1;
              return false;
            }
          });*/
          console.log(arr);
          this_.winList = arr;
          if(this_.winList.length>=11){
            var inter;
            clearInterval(inter);
            setTimeout(() => {
            	var ele=document.getElementsByClassName('sliderUp')[0];
              let dataList=[];
              dataList.push(...this_.winList);
              this_.winList.push(...dataList);
              if(ele){
                inter=setInterval(function () {
                  if(this_.marginTop<=-ele.offsetHeight/2){
                    this_.marginTop=0
                  }else{
                    this_.marginTop-=1;
                  }
                },80);
              }
            });
          }
        });
      },
      //抽奖
      routeNow:function () {
      	let this_=this;
      	//跑马灯转动顺序
      	if(this_.canClick){
      		this_.canClick=false;
          let routeBefore = setInterval(function () {
            this_.liIndex+=1;
            if(this_.liIndex===8){this_.liIndex=-1;}
            this_.activityId=this_.prizeArr[this_.liIndex];
          },80);
          axios.post(types.LUCKYDRAW,qs.stringify({id:this_.id}),{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then(function(data){
          	this_.speed=80;//初始速度
          	if(this_.freeTime.freeLotteryTimes>0){
//          		this_.personal()
            }else{this_.getScore()}
            //动画
            let routeFun=function () {
              this_.liIndex+=1;
              this_.activityId=this_.prizeArr[this_.liIndex];
              this_.speed+=2;
              clearInterval(route);
              clearInterval(routeBefore);
              route=setInterval(routeFun,this_.speed);
              if(this_.liIndex===8){this_.liIndex=-1;}
              if(data.data.activityPrizeId===this_.activityId && this_.speed>=150){
                clearInterval(route);
                //如果是实物商品
                if(data.data.prizeType==='GOODS'&&data.data.goodsType==='MATERIAL'){
                  //地址
                  axios.get(types.ADDRESSLIST).then(function (data11) {
                    if(data11.data.infos.length>0){
                      this_.addressDetail=data11.data.infos[0];
                    }else{
                      this_.addressDetail=''
                    }
                    setTimeout(function () {
                      this_.prizeDetail=data.data;
                      this_.personal()
                    },800)
                  });
                }else{
                  setTimeout(function () {
                    this_.prizeDetail=data.data;
                    this_.personal()
                  },800)
                }
                this_.liIndex=-1;
                this_.canClick=true;
              };
            };
            let route=setInterval(routeFun,this_.speed);
          },function(data){
            clearInterval(routeBefore);
            this_.activityId='';
          	this_.canClick=true;
          	let code=data.code;
          	if(code==="300501" || code==="300500"){
              this_.prizeDetail={prizeType:'logFalse'};
            }else {
              this_.prizeDetail={prizeType:'ERROR'};
            }

          	this_.errorData=data.description;
          })
        }
      },
      //关闭弹窗
      closeModal:function () {
        this.prizeDetail='';
        this.activityId=''
      },
      //提交实物中奖信息
      submit:function () {
      	if(this.canClick){
      		this.canClick=false;
          let this_=this;
          let postData={addressId:this.addressDetail.id,orderNum:this_.prizeDetail.orderNum};
          axios.post(types.SENDLUCKY,qs.stringify(postData),{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then(data=>{
            this_.closeModal();
            this.canClick=true;
            this_.$router.replace({path:'/activity',query:{id:this.id}})
          },data=>{
            this_.closeModal();
            Toast(data.description);
            this.canClick=true;
          })
        }

      },
      //管理收货地址
      toAddress:function () {
        store.commit('SET_PRIZEDETAIL',this.prizeDetail);
        this.$router.push({path:'/address_list',query:{orderNum:this.prizeDetail.orderNum}})
      },
      //添加地址
      addAddress:function (item) {
        store.commit('SET_PRIZEDETAIL',item);
        this.$router.push({path:'/address_list',query:{orderNum:item.orderNum}})
      },
      //从地址选择页跳转过来
      fromAddress: function () {
      	let this_=this;
        this.prizeDetail=this.getState.prizeDetai11;
        console.log(this.prizeDetail);
        axios.get(types.ADDRESSLIST+'/'+this.$route.query.addressId).then((data) =>{
            this_.addressDetail=data.data;
        });
      },
      //打开抽奖规则
      rulesShow: function () {
        this.fixType=1;
      },
      personalShow: function () {
      	let this_=this;
        axios.get(types.MYRECORD, { params: {platform:'', pageSize:1000}}).then((data) =>{
          this_.myRecord=data.data.infos;
        });
        console.log(118)
        this.fixType=2;
      },
      closeRules: function () {
        this.fixType=0;
        document.body.scrollTop=0;
      },
      loginApp:function () {
        window.location.href='https://m.trc.com/guide?redirect='+window.location.href;
      }
    },
    destroyed:function () {
      this.prizeDetail='';
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .activity{
    background: #FFB80D;
    position: relative;
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
    .f-banner{
      /*padding-top: p2r(20);*/
      img{
        width: 100%;
      }
    }
    .f-title{
      text-align:center;
      padding: p2r(30);
      .ft-main{
        display: inline-block;
        height: p2r(72);
        line-height: p2r(72);
        color: #fff;
        border-radius: p2r(36);
        padding: 0 p2r(40);
        /*padding: p2r(5) p2r(10) p2r(5) p2r(35);*/
        background-color:#ed9f07; ;
        font-size: p2r(34);
        position: relative;
        .ftm-gift{
          width: p2r(120);
          position: absolute;
          top:p2r(-30);
          left: p2r(-40);
        }
        .ftm-text{
          margin-left: p2r(60);
        }
      }
    }
    .f-tv{
      .ft-table{
        margin: 0 auto;
        width: p2r(690);
        height: p2r(750);
        padding: p2r(40);
        background: url('./../../assets/images/activity/BJ.png') no-repeat;
        box-sizing: border-box;
        background-size: p2r(690) p2r(750);
        .single{
          float: left;
          width: p2r(188);
          height: p2r(190);
          border: 2px solid #561614;
          margin-right: p2r(5);
          margin-bottom:p2r(5);
          border-radius: p2r(5);
          background-color: #fff;
          text-align: center;
          .goods{
            margin: p2r(5);
            width: p2r(120);
            height: p2r(120);
          }
          .g-name{
            font-size: p2r(24);
            color:#470e05 ;
            width: p2r(150);
            margin: 0 auto;
            line-height: p2r(30);
          }
        }
        .active{
          opacity: .5;
        }
        .routeNow{
          background: url('./../../assets/images/activity/routeNow.png') no-repeat;
          background-color: #f13100;
          background-position:  center p2r(20);
          background-size: p2r(120);
          text-align: center;
          .count{
            margin-top:p2r(145);
            display: inline-block;
            /*width: p2r(100);*/
            background: #CA2C03;
            font-size: p2r(24);
            padding: 0 p2r(30);
            border-radius: p2r(25);
            line-height: p2r(40);
            color: #F9CE00;
          }
        }
        .isFree{
          background: url('./../../assets/images/activity/freeRoute.png') no-repeat;
          background-color: #f13100;
          background-position:  center;
          background-size: p2r(120);
        }
      }

    }
    .f-btns{
      padding: p2r(40) p2r(50);
      .fb-b{
        width: p2r(310);
        height: p2r(86);
        border-radius: p2r(6);
        display: inline-block;
        font-size: p2r(40);
        color: #fff;
        font-weight: bold;
        line-height: p2r(83);
        span{
          display: inline-block;
          /*margin-left: p2r(100);*/
        }
        img{
          width:p2r(58) ;
          vertical-align: middle;
          margin-left: p2r(40);
        }
      }
      .fb-rules{
        background-image: linear-gradient(to bottom, #f13a1a, #d80017);
      }
      .fb-mine{
        margin-left: p2r(20);
        background-image: linear-gradient(to bottom, #f13a1a, #d80017);
      }
    }
    .f-list{
      padding:  p2r(30);
      /*display: none;*/
      .fl-mine{
        height: p2r(715);
        text-align: center;
        background: url('./../../assets/images/activity/winnerList.png') no-repeat center;
        background-size: p2r(687) p2r(715);
        padding-top: p2r(180);
        box-sizing: border-box;
        .flm-hid{
          height: p2r(460);
          overflow: hidden;
          li{
            height: p2r(30);
            padding-bottom: p2r(22);
            span{
              text-align: center;
            }
            .pr-mr{
              display: inline-block;
              width: p2r(200);
              margin-left: p2r(65);
            }
          }
        }
      }
    }
    .f-super{
      .fs-title{
        padding: 0 p2r(100);
        font-size: p2r(45);
        line-height: p2r(150);
        background: url('./../../assets/images/activity/t-gift.png') no-repeat p2r(45) p2r(45);
        background-size: p2r(46);
      }
      .fs-list{
        overflow: hidden;
        margin-top: p2r(-50);
        li{
          margin-top: p2r(30);
          width: p2r(328);
          height: p2r(386);
          background-color: #fff;
          border-radius: p2r(5);
          float: left;
          margin-left: p2r(30);
          .fsl-img{
            text-align: center;
            width: p2r(290);
            margin: 0 auto;
            margin-top: p2r(20);
            background: url(../../assets/images/mall_home/loading1.gif) no-repeat center;
            img{
              width: p2r(290);
            }
          }
          .fsl-text{
            width: p2r(250);
            margin: 0 auto;
            text-align: center;
            .goods-name{
              margin-top: p2r(8);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .fs-bot{
        text-align: right;
        color: #fff;
        padding: 0 p2r(30);
        line-height: p2r(80);
        padding-bottom: p2r(40);

      }
    }
    .f-modal{
      .fm-mask{
        filter: alpha(opacity=60);
        background-color: rgba(0, 0, 0, 0.7);
        position: fixed;
        left: 0px;
        top: 0px;
        z-index: 9998;
        width: 100%;
        height: p2r(4637);
      }
      .p-pop{
        width: 100%;
        position: fixed;
        z-index: 9999;
        top: 0;
        .p-box{
          width: p2r(630);
          margin: p2r(300) auto;
          background: #fff;
          position: relative;
          border-radius: p2r(5);
          text-align: center;
          font-size: p2r(36);
          .close{
            position: absolute;
            right: p2r(20);
            top: p2r(20);
            width: p2r(50);
            height: p2r(50);
            display: block;
            background: url('./../../assets/images/activity/close.png') no-repeat;
            background-size: p2r(50);
          }
          .cartoon{
            display: block;
            margin: 0 auto;
            padding-top: p2r(50);
            width: p2r(188);
          }
          .discri{
            line-height: p2r(50);
            padding: p2r(30) 0;
            font-weight: bold;
            font-family: SimHei;
            /*color: #292828;*/
            width: p2r(400);
            margin: 0 auto;
          }
          .p-btn{
            display: inline-block;
            width: p2r(513);
            height: p2r(80);
            border: none;
            line-height:p2r(80);
            color: #fff;
            border-radius:p2r(40);
            background-image:-webkit-linear-gradient(to right, #fc3238, #ffce7b);
            background-image:linear-gradient(to right,#fc3238,#ffce7b);
            font-family: SimHei;
            font-size: p2r(40);
            margin-bottom: p2r(60);
          }
        }
        .p-goods{
          .pb-top{
            height: p2r(230);
            padding: p2r(40);
            color: #441505;
            padding-bottom: 0;
            img{
              float: left;
              width: p2r(187);
              height: p2r(200);
            }
            .pbt-text{
              float: left;
              margin: p2r(60) p2r(40);
            }
            .discri{
              vertical-align: middle;
              line-height: p2r(50);
              font-weight: bold;
              font-family: SimHei;
              font-size: p2r(40);
              width: auto;
              padding: 0;
            }
          }
          .y-milk{
            background-color: #fdf8e8;
            padding: p2r(25) p2r(30) p2r(10) p2r(30);
            border-radius: p2r(5);
            .ym-center{
              .ymc-address{
                font-size: p2r(24);
                color: #525252;
                position: relative;
                span{
                  display: inline-block;
                }
                .ymca-ar{
                  display: inline-block;
                  position: relative;
                  cursor: pointer;
                  width: p2r(438);
                  text-align: left;
                  background-color: #fff;
                  box-sizing: border-box;
                  padding: p2r(14) p2r(14) p2r(14) p2r(14);
                  border:1px solid #E4E4E4;
                  line-height: p2r(30);
                  .addList{
                    position: absolute;
                    top: 43px;
                    left: 0px;
                  }
                }
                .ymca-label{
                  vertical-align: super;
                  margin-right: p2r(5);
                }
              }
              .add-address{
                font-size: p2r(24);
                color: #fc3438;
                text-align: right;
                line-height: p2r(50);
                padding: p2r(15);
                font-family: SimHei;
              }
            }

          }
        }
      }
    }
    .f-rules{
      background-color: #fff;
      z-index: 123;
      box-sizing: border-box;
      position: fixed;
      top:0;
      left: 0;
      bottom:0;
      right: 0;
      font-family: SimHei;
      .fr-none{
        text-align: center;
      }
      .fr-table{
        font-size: p2r(28);
        overflow-y: auto;
        position: absolute;
        top: p2r(220);
        bottom: 0;
        left:0;
        right:0;
        padding:0 p2r(60) ;
        margin-bottom: p2r(150);

        .frt-head{
          padding:0 p2r(50);
          background-color:#f3f3f3 ;
          line-height: p2r(50);
          text-align: center;
          overflow: hidden;
          color: #353535;
          .frth-name{
            display: inline-block;
            width: p2r(250);
            text-align: left;
          }
          .frth-date{
            display: inline-block;
            width: p2r(150);
          }
        }
        .frt-body{
          line-height: p2r(80);
          padding:0 p2r(50) 0 p2r(20) ;
          .tn-setAdd{
            color: #e60a30;
          }
          .t-date{
            display: inline-block;
            width: p2r(150);
            text-align: center;
          }
        }
      }
      .fr-tilte{
        line-height: p2r(200);
        font-size: p2r(36);
        color:#353535;
        text-align: center;
      }
      .fr-content{
        line-height: p2r(70);
        font-size: p2r(28);
        height: p2r(900);
        overflow-y: scroll;
        padding: 0 p2r(30);
      }
      .fr-fix{
        position: fixed;
        bottom: 0;
        left: 0;
        height: p2r(90);
        width: 100%;
        text-align: center;
        background: #fff;
        padding-top: p2r(20);
        /*opacity: .5;*/
        .frf-close{
          display: inline-block;
          width: p2r(45);
          height: p2r(45);
          background:url('./../../assets/images/activity/r-close.png') no-repeat;
          background-size: p2r(45);
        }
      }
    }
  }
</style>
