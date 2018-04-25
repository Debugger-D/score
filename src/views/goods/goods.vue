<template>
  <div class="goods" id="goods">
    <ul class="header">
      <li :class="{active: getState.goodsState.urlType == 'hot'}" class="item" @click="changeUrl('hot')">热兑排行</li>
      <li :class="{active: getState.goodsState.urlType == 'new'}" class="item" @click="changeUrl('new')">上新优先</li>
      <li :class="{active: getState.goodsState.urlType == 'all'}" class="item" @click="changeUrl()">
        积分 <img src="../../assets/images/goods/screen-s.png" alt="" v-if="getState.goodsState.urlType == 'all'">
        <img src="../../assets/images/goods/screen.png" alt="" v-else>
      </li>
    </ul>
    <div class="mask-screen" v-if="getState.isScreen">
      <v-screen :screenOne="getState.goodsState.screenOne" :callback="scoreScreen"></v-screen>
    </div>
    <div class="g-main">
      <div class="gm-left">
        <ul class="gml-types">
          <li :class="{active: getState.goodsState.categoryType.classificationId == ''}"  @click="selectType()">全部</li>
          <li :class="{active: getState.goodsState.categoryType.classificationId == item.id}" v-for="item in getState.goodsState.classcification" @click="selectType(item.id)">
            {{item.classificationName}}
          </li>
        </ul>
      </div>
      <div class="gm-right">
        <mt-loadmore :bottom-method="loadBottom"  :bottom-all-loaded="getState.goodsState.allLoaded" :auto-fill="false"  ref="loadmore">
          <ul class="gmr-main">
            <li class="clearBoth" v-for="(item,index) in getState.goodsState.goodsList">
              <router-link  :to="{ path: '/goods_detail', query: { id: item.id}}">
                <div class="pull-left">
                  <a href="javascript:;">
                    <img :src="JSON.parse(item.mediumImg)[0].fileUrl+'?imageView2/2/h/300'" alt="" :title="item.goodsName" class="imglazyload" >
                  </a>
                </div>
                <div class="pull-center fl">
                  <div class="tt">
                    <p class="name">{{item.goodsName}}</p>
                    <p class="count">已兑换{{item.exchangeQuantity}}</p>
                  </div>
                  <div class="pp">
                    <p class="price">
                      <span class="num">{{item.priceScore  | number}} 积分</span>
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
        <div class="none"  v-if="getState.goodsState.noData">
          <img src="../../assets/images/mall_home/none.png" alt="">
          <p>暂无商品哦</p>
        </div>
        <p class="bot-line" v-if="getState.goodsState.allLoaded && getState.goodsState.goodsList.length>5">
          <span class="bl-border"></span>
          我是有底线的
          <span class="bl-border"></span>
        </p>
      </div>
    </div>
    <v-fixside :share="false" :home="true" :height="300"></v-fixside>
  </div>
</template>
<script>
  import qs from 'qs';
  import axios from 'axios';
  import store from '@/vuex/store';
  import * as types from '@/services/types';
  import { Indicator } from 'mint-ui';
  import { mapGetters, mapState, mapActions} from 'vuex';
  import { Loadmore } from 'mint-ui';
  import vScreen from '@/components/screen/screen';
  import vFixside from '@/components/fixside/fixside';
  export default{
    components:{vScreen, vFixside, 'mt-loadmore': Loadmore},
  	computed: {
      ...mapGetters([
        'getState'
      ])
    },
    data () {
      return {
        activeType: '',
        scrollMode:       "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      }
    },
    mounted(){
      let routerId = this.$route.query.id;
      if (routerId){
      	this.selectType(routerId)
      }else{
				if (this.getState.goodsState.goodsList.length == 0){this.getGoodsListGoods();}
			}
      //积分筛选区间
      if (!this.getState.screenList){this.getScreenList()}
      //个人资产
      if (!this.getState.totalCount){this.personal()}
      //展示分类
      if (!this.getState.goodsState.classcification){
      	console.log('setclasscification')
      	this.getclasscification();
      }
    },
    methods: {
      //全部商品
      goods() {
        store.commit('SET_PAGEINDEXGOODS', false);
        this.getGoodsListGoods();
        store.commit('SET_ISSCREEN', false);
        this.modalType();
      },
    	//商品类目选择
      selectType(id) {
      	id = id || '';
        store.commit('SET_CATEGROYTYPE', id);
        this.goods()
      },
      //商品列表类型·
      changeUrl(type) {
        if (type){
          store.commit('SET_URLTYPEGOODS', type);
          store.commit('SET_ONESCREENGOODS', '');
          store.commit('SET_SCORESCREENGOODS', {});
          this.goods();
        }else {
          store.commit('SET_ISSCREEN', !this.getState.isScreen);
          this.modalType();
        }
      },
      //积分值筛选
      scoreScreen(type) {
        store.commit('SET_ONESCREENGOODS', type);
        switch (type){
          case 'all':
            store.commit('SET_URLTYPEGOODS', type);
            store.commit('SET_SCORESCREENGOODS', {});
            break;
          case 'low':
            store.commit('SET_SCORESCREENGOODS', {orderByType: 1});
            break;
          case 'high':
            store.commit('SET_SCORESCREENGOODS', {orderByType: 0});
            break;
          case 'can':
            store.commit('SET_SCORESCREENGOODS',{scoreMin: '',scoreMax: this.getState.totalCount});
            break;
          default:
            let params = {};
            store.commit('SET_ONESCREENGOODS', type.id);
            params.scoreMin = type.scoreMin || '';
            params.scoreMax = type.scoreMax || '';
            store.commit('SET_SCORESCREENGOODS', params);
        }
        this.goods();
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
      //禁止滑动公共函数
      fun (event) {
        event.preventDefault&&event.preventDefault();
      },
      //下拉加载
      loadBottom() {
        //是否加载完毕
        if (this.getState.goodsState.pageIndex < this.getState.goodsState.totalPage){
          store.commit('SET_PAGEINDEXGOODS', true);
          this.getGoodsListGoods();
          this.$nextTick(function () {
            // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
            // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
            // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
            this.scrollMode = "touch";
          });
          this.$refs.loadmore.onBottomLoaded();
        }
      },
      ...mapActions(['getScreenList', 'getGoodsListGoods', 'getclasscification'])
    },
    beforeDestroy() {
      //记录高度
      store.commit('SET_OFFSETHEIGHTGOODS', document.body.scrollTop);
      store.commit('SET_ISSCREEN', false);
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .goods{
    font-family: HiraginoSansGB W3;
    color:#353535;
    .header{
      background-color: #fff;
      position: fixed;
      width: 100%;
      height: p2r(70);
      display: flex;
      display: -webkit-box;
      display: -webkit-flex;
      z-index: 3;
      align-items: center;
      -webkit-align-items: center;
      justify-content: space-around;
      -webkit-justify-content: space-around;
      font-size: p2r(26);
      border-bottom:1px solid #f4f4f4 ;
      .item{
        width:p2r(166);
        text-align: center;
        align-items: center;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        justify-content:center;
        -webkit-justify-content: center;
        img{
          margin-left: p2r(12);
          width: p2r(24);
          height: p2r(26);
        }
      }
      .active{
        color: #e60a30;
      }
      .screen{
        background:url("../../assets/images/goods/screen.png") p2r(130) center no-repeat ;
        background-size:p2r(25) ;
      }
    }
    .mask-screen{
      position: fixed;
      width: 100%;
      left: 0;
      top: .92rem;
      bottom: 0;
      height: 100%;
      z-index: 100;
    }
    .g-main{
      padding-top: p2r(70);
      .gm-right{padding-left: p2r(174);}
      .gm-left{
        margin-top:1px;
        ul{
          overflow-y: scroll;
          width: p2r(173);
          top: p2r(70);
          bottom: 0;
          position: fixed;
          background: #f4f4f4;
          li{
            box-sizing: border-box;
            width: p2r(173);
            height: p2r(105);
            display: flex;
            font-size: p2r(26);
            align-items: center;
            justify-content: center;
          }
          .active{
            border-left: p2r(6) solid #e60a30;
            background-color: #fff;
          }
        }
      }
    }
  }
  .gmr-main{
    li{
      position: relative;
      height: p2r(210);
      width: 100%;
      box-sizing: border-box;
      padding: p2r(20) p2r(28);
      border-bottom: 1px solid #f4f4f4;
      background: #fff;
      .pull-left{
        float: left;
        background: url(../../assets/images/mall_home/loading1.gif) no-repeat center;
        img{
          width: p2r(166);
          height: p2r(166);
        }
      }
      .buy{
        margin-left: p2r(10);
        position: absolute;
        top:p2r(80);
        right: p2r(20);
        background-color:#fff;
        a{
          width: p2r(96);
          height: p2r(54);
          border: 1px solid #E60A30;
          color: #E60A30;
          border-radius: p2r(6);
          justify-content: center;
          display: flex;
          align-items: center;
        }
      }
      .pull-center{
        width: p2r(230);
        margin-left: p2r(40);
        .tt{
          .name{
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
            font-size: p2r(32);
            line-height: p2r(43);
            color: #000;
            height: p2r(80);
          }
          .count{
            margin-top: p2r(10);
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
              margin-left: p2r(10);
              color: #999;
            }
            .num{
              display: inline-block;
              font-size: p2r(26);
              font-family: "Hiragino Sans GB";
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
  .none{
    background: #fff;
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
