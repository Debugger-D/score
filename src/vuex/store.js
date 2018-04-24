/**
 * Created by hzjiazhenshan on 2017/8/12.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as types from '@/services/types'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isLogin:            true,
    isScreen:           false,
    screenList:         '',
    totalCount:         0,
    activityId:         '',
    prizeDetai11:       {},
    goodsState:         {
      noData: false,
      urlType: 'all',
      allLoaded: false,
      pageIndex: 1,
      totalPage: 1,
      goodsList: [],
      screenOne: '',
      categoryType: {classificationId: ''},
      offsetHeight: 0,
      classcification: '',
      params: {scoreMin: '',scoreMax: '', orderByType: ''},
      screenUrl: {
        'hot': types.HOTGOODS,
        'new':types.NEW,
        'all': types.GOODSLIST
      },
    },
    mallHomeState:      {
      noData: false,
      urlType: 'all',
      allLoaded: false,
      pageIndex: 1,
      totalPage: 1,
      goodsList: [],
      screenOne: '',
      bannerList: '',
      activityList: '',
      offsetHeight: 0,
      params: {scoreMin: '',scoreMax: '', orderByType: ''},
      screenUrl: {
        'hot': types.HOTGOODS,
        'new':types.NEW,
        'all': types.GOODSLIST
      },
    },
  },
  mutations: {
    SET_PRIZEDETAIL: (state, list) => {
      state.prizeDetai11 = list
    },
    SET_ACTIVITYID (state, id) {
      state.activityId = id;
    },
    SET_LOGINSTATE (state, el) {
      state.isLogin = el;
    },
    //个人资产总值
    SET_TOTALCOUNT (state, el) {
      state.totalCount = el;
    },
    //是否出现筛选框
    SET_ISSCREEN (state, el) {
      state.isScreen = el;
    },
    /*=======首页=======*/
    //商品列表请求参数
    SET_SCORESCREENHOME (state, el) {
      state.mallHomeState.params = el;
    },
    //积分筛选区间
    SET_ONESCREENHOME (state, el) {
      state.mallHomeState.screenOne = el;
    },
    //商品列表加载类型
    SET_URLTYPEHOME (state, el) {
      state.mallHomeState.urlType = el;
    },
    //浏览器高度
    SET_OFFSETHEIGHTHOME (state, el) {
      state.mallHomeState.offsetHeight = el;
    },
    //分页页码
    SET_PAGEINDEXHOME (state, el) {
      if (el){
        if (state.mallHomeState.pageIndex<state.mallHomeState.totalPage ){
          state.mallHomeState.pageIndex += 1;
        }
      }else {
        state.mallHomeState.pageIndex = 1;
        state.mallHomeState.goodsList = [];
      }
    },
    /*=======所有商品======*/
    //商品列表加载类型
    SET_CATEGROYTYPE (state, el) {
      state.goodsState.categoryType.classificationId = el;
      console.log(state.goodsState.categoryType, el)
    },
    //商品列表请求参数
    SET_SCORESCREENGOODS (state, el) {
      state.goodsState.params = el;
    },
    //积分筛选区间
    SET_ONESCREENGOODS (state, el) {
      state.goodsState.screenOne = el;
    },
    //商品列表加载类型
    SET_URLTYPEGOODS (state, el) {
      state.goodsState.urlType = el;
      console.log(1212, state.goodsState.urlType)
    },
    //浏览器高度
    SET_OFFSETHEIGHTGOODS (state, el) {
      state.goodsState.offsetHeight = el;
    },
    //分页页码
    SET_PAGEINDEXGOODS (state, el) {
      if (el){
        if (state.goodsState.pageIndex<state.goodsState.totalPage ){
          state.goodsState.pageIndex += 1;
        }
      }else {
        state.goodsState.pageIndex = 1;
        state.goodsState.goodsList = [];
      }
    },
  },
  actions: {
    //积分筛选区间
    async getScreenList({state}, data) {
      await axios.get(types.SCREEN,{params: {type:'APP'}}).then(function (data) {
        state.screenList = data.data.infos;
      });
    },
    /*=======首页======*/
    //商品列表
    async getGoodsListHome({state}) {
      let params, url;
      params = Object.assign(state.mallHomeState.params, {pageIndex: state.mallHomeState.pageIndex, pageSize: 10});
      url = state.mallHomeState.screenUrl[state.mallHomeState.urlType];
      await axios.get(url, { params: params}).then(function (data) {
        state.mallHomeState.totalPage = data.data.totalPage;
        state.mallHomeState.goodsList = state.mallHomeState.goodsList.concat( data.data.infos);
        state.mallHomeState.noData = (state.mallHomeState.goodsList.length>0)? false: true;
        if (state.mallHomeState.totalPage == state.mallHomeState.pageIndex) {
          state.mallHomeState.allLoaded = true
        }else {state.mallHomeState.allLoaded = false}
        console.log(123, state.mallHomeState.allLoaded)
      });
    },
    //banner
    async getBannerListHome({state}) {
      await axios.get(types.BANNER,{params: {type:'APP'}}).then(function (data) {
        state.mallHomeState.bannerList = data.data;
      });
      console.log('store banner', state.mallHomeState.bannerList)
    },
    //活动
    async getActivityListHome({state}) {
      await axios.get(types.ACTIVITY,{params: {type:'APP'}}).then(function (data) {
        state.mallHomeState.activityList = data.data.infos[0];
      });
      console.log('store activityList', state.mallHomeState.activityList)
    },
    /*======所有商品页=====*/
    // 商品列表
    async getGoodsListGoods({state}) {
    	console.log('in out')
      let params, url;
      params = Object.assign(state.goodsState.params,  {pageIndex: state.goodsState.pageIndex, pageSize: 10}, state.goodsState.categoryType) ;
      url = state.goodsState.screenUrl[state.goodsState.urlType];
      await axios.get(url, { params: params}).then(function (data) {
				console.log('in in')
        state.goodsState.goodsList = state.goodsState.goodsList.concat( data.data.infos);
        state.goodsState.totalPage = data.data.totalPage;
        state.goodsState.noData = (state.goodsState.goodsList.length>0)? false: true;
        if (state.goodsState.totalPage == state.goodsState.pageIndex) {
          state.goodsState.allLoaded = true
        }else {state.goodsState.allLoaded = false}
      });
    },
    //展示分类
    async getclasscification({state}) {
      await axios.get(types.SHOWLIST,{}).then(function (data) {
        state.goodsState.classcification = data.data;
        console.log(state.goodsState.classcification, 'class')
      });
    },
  },
  getters: {
    getState:state=>{
      return state;
    },
  }
});
export default store;
