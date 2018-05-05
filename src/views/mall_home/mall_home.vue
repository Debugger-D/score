<template>
  <div class="mallHome" id="mallHome"  :style="{'-webkit-overflow-scrolling': scrollMode}">
    <div class="header">
      <div class="h-top">
        <router-link to="/problems">
          <div class="problem">
            <span class="icon-problem"></span>
          </div>
        </router-link>
        <div class="ht-rec">
          <img src="../../assets/images/mall_home/m-trc.png" alt="">
          <router-link to="/con_record">
            <div class="flex-right">
              <p class="score">{{score | number}}</p>
              <p class="r-myscore">我的积分></p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="inlet-banner">
      <div class="bannerList">
        <div class="inletList">
          <ul>
            <li v-for="item in showList">
              <a :href="item.targetUrl">
                <img :src="item.imgUrl" alt="">
                <span>{{item.title}}</span>
              </a>
            </li>
          </ul>
        </div>
        <vSlider :banner="getState.mallHomeState.bannerList"></vSlider>
      </div>
    </div>
    <div class="notice" v-if="notice.length>0">
      <div class="fl">
        <img src="../../assets/images/mall_home/notice.png" alt="">
        <span class="border"></span>
      </div>
      <v-notice :notice = "notice"></v-notice>
    </div>
    <div class="activity" v-if="getState.mallHomeState.activityList">
      <ul :class="getState.mallHomeState.activityList.style == 2 ? 'act_three': 'act_two'">
        <li>
          <a :href="getState.mallHomeState.activityList.targetUrlOne">
            <img :src="getState.mallHomeState.activityList.imgUrlOne" alt="">
          </a>
        </li>
        <li>
          <a :href="getState.mallHomeState.activityList.targetUrlTwo">
            <img :src="getState.mallHomeState.activityList.imgUrlTwo" alt="">
          </a>
        </li>
        <li v-if="getState.mallHomeState.activityList.style == 2">
          <a :href="getState.mallHomeState.activityList.targetUrlThree">
            <img :src="getState.mallHomeState.activityList.imgUrlThree" alt="">
          </a>
        </li>
      </ul>
    </div>
    <div class="padding"></div>
    <div class="goodsList" id="goodsList">
      <div class="g-screen">
        <ul class="g-title">
          <li @click="changeUrl('hot')" :class="{active: getState.mallHomeState.urlType == 'hot'}">
            <img src="../../assets/images/mall_home/hot.png" alt="">
            <span>热兑排行</span>
          </li>
          <li  @click="changeUrl('new')" class="gt-center" :class="{active: getState.mallHomeState.urlType == 'new'}">
            <img src="../../assets/images/mall_home/new.png" alt="">
            <span>上新优先</span>
          </li>
          <li  @click="changeUrl()" :class="{active: getState.mallHomeState.urlType == 'all'}">
            <img src="../../assets/images/mall_home/screen.png" alt="">
            <span>积分筛选</span>
          </li>
        </ul>
        <div class="mask-screen" v-if="getState.isScreen">
          <v-screen :screenOne="getState.mallHomeState.screenOne" :callback="scoreScreen"></v-screen>
        </div>
      </div>
      <mt-loadmore :bottom-method="loadBottom"  :bottom-all-loaded="getState.mallHomeState.allLoaded" :auto-fill="false"  ref="loadmore">
        <ul class="g-main">
          <li class="clearBoth" v-for="(item,index) in getState.mallHomeState.goodsList">
            <router-link  :to="{ path: '/goods_detail', query: { id: item.id}}">
              <div class="pull-left">
                <a href="javascript:;">
                  <img :src="JSON.parse(item.mediumImg)[0].fileUrl+'?imageView2/2/h/300'" alt="" :title="item.goodsName" class="imglazyload">
                </a>
              </div>
              <div class="pull-center fl">
                <div class="tt">
                  <p class="name">{{item.goodsName}}</p>
                  <p class="count">已兑换{{item.exchangeQuantity}}</p>
                </div>
                <div class="pp">
                  <p class="price">
                    <span class="num">{{item.priceScore  | number}}</span>
                    <del v-if="item.priceMarket">¥{{item.priceMarket/100}}</del>
                  </p>
                </div>
              </div>
              <div class="buy fl">
                <a href="javascript:;">兑换</a>
              </div>
            </router-link>
          </li>
        </ul>
      </mt-loadmore>
      <div class="none"  v-if="getState.mallHomeState.noData">
        <img src="../../assets/images/mall_home/none.png" alt="">
        <p>暂无商品哦！</p>
      </div>
      <p class="bot-line" v-if="getState.mallHomeState.allLoaded && getState.mallHomeState.goodsList.length>4">
        <span class="bl-border"></span>
        我是有底线的
        <span class="bl-border"></span>
      </p>
    </div>
    <v-fixside :share="false" :home="false" :height="300"></v-fixside>
  </div>
</template>

<script>
  import qs from 'qs';
  import axios from 'axios';
  import store from '@/vuex/store'
  import * as types from '@/services/types'
  import * as methods from '@/util/common'
  import { mapGetters, mapActions} from 'vuex'
  import { Lazyload} from 'mint-ui';
  import { Loadmore} from 'mint-ui';

  import vSlider from '@/components/slider/slider'
  import vFixside from '@/components/fixside/fixside'
  import vNotice from '@/components/slider/slider-notice'
  import vScreen from '@/components/screen/screen'

  export default {
    name: 'mall_home',
    components:{vSlider, vFixside, vNotice, vScreen, 'mt-loadmore': Loadmore},
    data (){
      return {
        text:             '',
        score:            '',
        tcoin:            '',
        notice:           '',
        showList:         '',
        scrollMode:       'auto', //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        isScreen:         false,
      }
    },
    computed: {
      ...mapGetters([
        'getState'
      ])
    },
		/*beforeCreate: function () {
			let app = methods.getCookie('platform');
			if(app === 'mall'){
				window.location.href='http://passportm.trc.com/oauth/authorized/?appid=05540598FAB746DA83AC8C99AE7305C0&redirect_uri=http://passportm.tairanmall.com/oauth/isbind/?return_url=aHR0cDovL2pmLnRhaXJhbm1hbGwuY29tL2NyZWRpdF9oNQ==';
      }
    },*/
    mounted:function(){
      document.body.scrollTop = this.getState.mallHomeState.offsetHeight;
      let this_ = this;
      //入口管理
      axios.get(types.INLETLIST,{params: {type:'APP'}}).then(function (data) {
        this_.showList = data.data.infos.slice(0,5);
      });
      this_.personal();
      //公告
      axios.get(types.NOTICE,{params: {type:'APP'}}).then(function (data) {
        this_.notice = data.data.infos;
      });
      //积分筛选区间
      if (!this.getState.screenList){
      	//this.getScreenList('', {a: 11})
				// 以对象形式分发
				store.dispatch({
					type: 'getScreenList',
					amount: 10,
					heh: 10,
				})
      }
      //商品列表
      if (this.getState.mallHomeState.goodsList.length == 0){this.getGoodsListHome();}
      //banner
      if (!this.getState.mallHomeState.bannerList){this.getBannerListHome()}
      //活动入口
      if (!this.getState.mallHomeState.activityList){this.getActivityListHome()}
    },
    methods:{
    	//全部商品
      goods() {
        store.commit('SET_PAGEINDEXHOME', false);
        this.getGoodsListHome();
        store.commit('SET_ISSCREEN', false);
        this.modalType();
      },
      //积分接口请求
      personal () {
        let this_ = this;
        //积分数量
        axios.get(types.SCOREDETAIL).then(function (data) {
          this_.score = data.data.score;
          //T币
          axios.get(types.TCOIN).then(function (data) {
            this_.tcoin = data.data.tcoin;
            store.commit('SET_TOTALCOUNT', this_.score+this_.tcoin)
          });
        });
      },
      //点击单个商品兑换
      goDetail (item) {
        this.$router.push({path:'/goods_detail',query:{id:item.id}});
      },
      //积分筛选模态框
      jump () {
        let jump = document.querySelectorAll('#goodsList');
        // 获取需要滚动的距离
        let total = jump[0].offsetTop;
        if(document.body.scrollTop<total){
          document.body.scrollTop = total;
        }
      },
      //商品列表类型·
      changeUrl(type) {
        this.jump();
        if (type){
          store.commit('SET_URLTYPEHOME', type);
          store.commit('SET_ONESCREENHOME', '');
          store.commit('SET_SCORESCREENHOME', {});
          this.goods();
        }else {
          store.commit('SET_ISSCREEN', !this.getState.isScreen);
          this.modalType();
        }
      },
      //积分值筛选
      scoreScreen(type) {
      	let this_ = this;
        store.commit('SET_ONESCREENHOME', type);
        switch (type){
          case 'all':
            store.commit('SET_URLTYPEHOME', type);
            store.commit('SET_SCORESCREENHOME', {});
            break;
          case 'low':
            store.commit('SET_SCORESCREENHOME', {orderByType: 1});
            break;
          case 'high':
            store.commit('SET_SCORESCREENHOME', {orderByType: 0});
            break;
          case 'can':
            store.commit('SET_SCORESCREENHOME',{scoreMin: '',scoreMax: this.getState.totalCount});
            break;
          case 'close':
            this_.modalType();
            break;
          default:
            let params = {};
            store.commit('SET_ONESCREENHOME', type.id);
            params.scoreMin = type.scoreMin || '';
            params.scoreMax = type.scoreMax || '';
            store.commit('SET_SCORESCREENHOME', params);
        }
        this.goods();
      },
      //禁止滑动公共函数
      fun (event) {
        event.preventDefault && event.preventDefault();
      },
      //模态框、禁止滚动
      modalType() {
        if (this.getState.isScreen){
          document.getElementById('app').addEventListener('touchmove',this.fun, false);
          document.getElementById('app').style.overflow='hidden';
        }else{
          document.getElementById('app').removeEventListener('touchmove',this.fun, false);
          document.getElementById('app').style.overflow='auto';
        }
      },
      ...mapActions(['getGoodsListHome', 'getScreenList', 'getBannerListHome', 'getActivityListHome']),
      //下拉加载
      loadBottom() {
      	//是否加载完毕
      	if (this.getState.mallHomeState.pageIndex < this.getState.mallHomeState.totalPage){
          store.commit('SET_PAGEINDEXHOME', true);
          this.getGoodsListHome();
          this.$nextTick(function () {
            // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
            // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
            // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
            this.scrollMode = "touch";
          });
          this.$refs.loadmore.onBottomLoaded();
        }
      }
    },
    beforeDestroy() {
    	//记录高度
      store.commit('SET_OFFSETHEIGHTHOME', document.body.scrollTop);
      store.commit('SET_ISSCREEN', false);
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss" >
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .mallHome{
    font-size: p2r(24);
    width:100%;
    background: #fff;
    .header{
      height: p2r(270);
      background: url("../../assets/images/mall_home/indexTop1.png") no-repeat;
      background-size: cover;
      .h-top{
        .problem{
          position: relative;
          height: p2r(55);
          .icon-problem{
            display: inline-block;
            float: right;
            position: absolute;
            right: p2r(21);
            top:p2r(20);
            width: p2r(41);
            height: p2r(40);
            background: url("../../assets/images/mall_home/problem.png") no-repeat center;
            background-size: p2r(40);
          }
        }
        .ht-rec{
          height: p2r(100);
          padding: 0 p2r(50);
          display: flex;
          align-items: center;
          img{
            width: p2r(70);
            height: p2r(70);
          }
          .flex-right{
            margin-left: p2r(25);
          }
        }
        .score{
          display: inline-block;
          color: #fff;
          font-size:p2r(60);
        }
        .record {
          line-height: p2r(60);
          font-size: p2r(24);
          color: #fff;
        }
        .r-myscore{
          margin-top: p2r(10);
          color: #dbecfc;
        }
      }
    }
    .inlet-banner{
      border-radius: p2r(10);
      width: p2r(708);
      margin: 0 auto;
      /*height: p2r(250);*/
      display: flex;
      justify-content: center;
      -webkit-justify-content: center;
      box-shadow: -1px 1px 95px rgba(91,192,255,.2);
      .inletList{
        ul{
          display: flex;
          display: -webkit-box;
          display: -webkit-flex;
          height: p2r(136);
          justify-content: space-around;
          -webkit-justify-content: space-around;
          align-items: center;
          -webkit-align-items: center;
          li{
            color: #383633;
            a{
              display: flex;
              display: -webkit-box;
              display: -webkit-flex;
              -webkit-box-orient:vertical;
              -webkit-box-direction:normal;
              -moz-box-orient:vertical;
              -moz-box-direction:normal;
              flex-direction:column;
              -webkit-flex-direction:column;
              align-items: center;
              -webkit-align-items: center;
            }
            img{
              height: p2r(60);
            }
            span{
              margin-top: p2r(20);
            }
          }
        }
      }
    }
    .bannerList{
      width: p2r(708);
      /*height: p2r(310);*/
      background: #fff;
      margin-top: p2r(-60);
      border-radius: p2r(15);
    }
    .notice{
      padding: p2r(20) p2r(20) 0 p2r(20);
      .fl{
        display: flex;
        height: p2r(55);
        align-items: center;
        img{
          display: flex;
          height: p2r(50);
        }
        .border{
          height: p2r(40);
          width: 2px;
          background: #e4e4e4;
          display: flex;
          margin: 0 p2r(0) 0 p2r(15);
        }
      }
    }
    .activity{
      padding-top: p2r(20);
      ul {
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        padding: p2r(20) p2r(10);
        padding-top: 0;
      }
      .act_three{
        li{
          width: p2r(228);
          height: p2r(305);
          border:1px solid #e4e4e4;
          border-radius: p2r(15);
          img{
            border-radius: p2r(15);
            width: p2r(228);
            height: p2r(305);
          }
        }
      }
      .act_two{
        li{
          width: p2r(350);
          height: p2r(310);
          border:1px solid #e4e4e4;
          border-radius: p2r(15);
          img{
            border-radius: p2r(15);
            width: p2r(350);
            height: p2r(310);
          }
        }
      }
    }
    .padding{
      height: p2r(20);
      background: #f4f4f4;
    }
    .goodsList{
      background: #f4f4f4;
      min-height: p2r(1400);
      .mask-screen{
        position: fixed;
        width: 100%;
        left: 0;
        top: .92rem;
        bottom: 0;
        height: 100%;
        z-index: 100;
      }
      .g-screen{
        padding-top: p2r(10);
        background: #fff;
        .g-title{
          height: p2r(60);
          display: flex;
          display: -webkit-box;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          li{
            display: flex;
            display: -webkit-box;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: center;
            -webkit-justify-content: center;
            width: p2r(249);
            font-size: p2r(28);
            height:p2r(36);
            color: #000;
            img{
              width: p2r(48);
              height: p2r(48);
            }
            span{
              margin-left: p2r(12);
            }
          }
          .gt-center{
            border-left: 1px solid #e4e4e4;
            border-right: 1px solid #e4e4e4;
          }
          .active{
            color: #27a1e5;
          }
        }
      }
      .g-main{
        li{
          height: p2r(250);
          width: 100%;
          box-sizing: border-box;
          padding: p2r(35) p2r(28);
          border-bottom: 1px solid #f4f4f4;
          background: #fff;
          .pull-left{
            float: left;
            background: url(../../assets/images/mall_home/loading1.gif) no-repeat center;
            img{
              width: p2r(180);
              height: p2r(180);
            }
          }
          .buy{
            margin-top: p2r(60);
            margin-left: p2r(10);
            a{
              width: p2r(110);
              height: p2r(56);
              border: 1px solid #E60A30;
              color: #E60A30;
              border-radius: p2r(46);
              justify-content: center;
              -webkit-justify-content: center;
              display: flex;
              align-items: center;
            }
          }
          .pull-center{
            width: p2r(340);
            margin-left: p2r(40);
            .tt{
              height: p2r(130);
              .name{
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
                font-size: p2r(32);
                line-height: p2r(43);
                color: #000;
                max-height: p2r(80);
              }
              .count{
                margin-top: p2r(15);
                color: #999;
              }
            }
            .pp{
              margin-top: p2r(20);
              .price{
                margin-top: p2r(9);
                font-size: p2r(24);
                color: #E60A30;
                del{
                  margin-left: p2r(20);
                  color: #999;
                }
                .num{
                  display: inline-block;
                  background: url("../../assets/images/mall_home/scoreIcon.png") left no-repeat;
                  background-size:  p2r(28);
                  padding-left:  p2r(35);
                  font-size: p2r(32);
                  /*font-family: "Hiragino Sans GB";*/
                }
              }
            }
          }
        }
        .li-banner{
          padding: p2r(13) p2r(28);
          height: p2r(210);
        }
      }
      .bot-line{
        text-align: center;
        background-color: #f4f4f4;
        line-height: p2r(110);
        color: #c9c9c9;
        font-size: p2r(24);
        .bl-border{
          display: inline-block;
          border-top: 1px solid #c9c9c9;
          height: 0px;
          vertical-align: middle;
          width: p2r(38);
        }
      }
    }
  }
  .none{
    margin-top: p2r(125);
    text-align: center;
    img {
      width: p2r(175);
    }
    p{
      margin-top: p2r(30);
      color: #999;
      font-size: p2r(26);
    }
  }
</style>
