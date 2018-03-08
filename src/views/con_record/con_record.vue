<template>
  <div>
    <div class="my-top">
      <div class="ih-left fl">
        <div>
          <span class="raduis"></span>
          <span>可用积分: </span>
          <span class="color-red"> {{scoreDetail.score}}</span>
        </div>
        <p class="valid"  v-if="scoreDetail.count>0">{{scoreDetail.validDate | time('yyyy.MM.dd')}}过期积分 {{scoreDetail.count}}
          <router-link to="/problems">
            <span class="toProblem"></span>
          </router-link>
        </p>
      </div>
      <router-link to="/address_list">
        <div class="my-right fr color-blue">
          地址管理>
        </div>
      </router-link>
    </div>
    <div class="my-padding"></div>
    <div class="con_record">
      <div class="c-title">
        <span class="ct-des">积分明细</span>
        <div class="ct-types" @click="">
          <div @click="beSelect">
            <span>{{recordType}}</span>
            <img :class="{slow: isSelect}" src="../../assets/images/personal/down.png" alt="">
          </div>
          <div class="ctt-list" v-show="isSelect">
            <ul>
              <li @click="getList()">全部明细</li>
              <li @click="getList('1')">通兑记录</li>
              <li @click="getList('2')">兑换商品</li>
              <li @click="getList('3')">积分抽奖</li>
              <!--<li @click="getList('lotteryIncome')">抽中积分</li>-->
              <li @click="getList('4')" style="border-bottom: none;">积分退款</li>
            </ul>
            <div class="tri"></div>
          </div>
        </div>
      </div>
      <ul class="record-list" v-if="list.length>0">
        <li class="clearBoth" v-for="item in list">
          <div class="left fl">
            <p class="title">{{item.tradeName}}</p>
            <p class="time">{{item.tradeTime | time('yyyy.MM.dd  hh:mm:ss')}}</p>
          </div>
          <div class="fr right gray"  v-if="item.tradeType=='EXCHANGE' || item.tradeType=='GRANT' || item.tradeType=='REFUND' || item.tradeSubType=='EXCHANGE_OUT_CORRECT'">
            +{{item.tradeAmount | number}}
          </div>
          <div class="fr right"  v-if="item.tradeType=='CONSUME'">
            -{{item.tradeAmount | number}}
          </div>
        </li>
        <li class="dataEnd" v-if="list.length>10">----已无更多数据----</li>
      </ul>
      <div v-else class="noData">
        <div class="icon">
        </div>
        <p>您还没有兑换记录</p>
      </div>
      <v-fixside :share="false" :home="true" :height="100"></v-fixside>
    </div>
  </div>
</template>
<script>
	import axios from 'axios';
	import * as types from '@/services/types';
  import vFixside from '@/components/fixside/fixside';
  export default{
    name:'con_record',
    components: {vFixside},
    data(){
      return{
        list: '',
        isSelect: false,
				recordType: '全部明细',
				scoreDetail: {},
				flowType: {
        	1: {
        		text: '通兑记录',
						tradeType: 'EXCHANGE',
						tradeSubType: 'EXCHANGE_IN',
          },
					2: {
						text: '兑换商品',
						tradeType: 'CONSUME',
						tradeSubType: 'GOODS_CONSUME',
					},
					3: {
						text: '积分抽奖',
						tradeType: 'CONSUME',
						tradeSubType: 'LUCK_DRAW_CONSUME',
					},
          4: {
						text: '积分退款',
						tradeType: 'REFUND',
						tradeSubType: '',
					},
        }
      }
    },
    mounted:function () {
    	let this_=this;
    	this_.getList();
      //积分数量
      axios.get(types.SCOREDETAIL).then(function (data) {
        this_.scoreDetail = data.data;
      });
    },
    methods: {
    	getList(type){
        let this_ = this;
				let pageData = {pageSize: 300, pageIndex: 1};
				this_.params = this_.flowType[type] || '';
				this_.recordType = this_.flowType[type]?this_.flowType[type].text: '全部明细'
				axios.get(types.FLOW, {params: Object.assign(pageData, this.params)}).then(function (data) {
          this_.list = data.data.list;
          this_.isSelect = false
        })
      },
      beSelect(){
    		this.isSelect = !this.isSelect;
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .my-top {
    height: p2r(147);
    display: flex;
    align-items: center;
    color: #353535;
    padding:0 p2r(35) 0 p2r(25);
    justify-content:space-between;
    .ih-left{
      font-size: p2r(32);
      .raduis{
        display: inline-block;
        width:p2r(15) ;
        height:p2r(15) ;
        border-radius: 50%;
        background-color:#27a1e5 ;
      }
      .valid{
        font-size: p2r(26);
        color: #353535;
        padding-left: p2r(25);
        margin-top: p2r(20);
        .toProblem{
          display: inline-block;
          width: p2r(28);
          height: p2r(28);
          background: url("../../assets/images/personal/toProblem.png") ;
          background-size: p2r(28);
        }
      }
    }
  }
  .my-right{
    font-size: p2r(26);
  }
  .my-padding{
    height: p2r(20);
    background-color: #f4f4f4;
  }
  .con_record{
    .c-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: p2r(90);
      font-size: p2r(26);
      color: #000;
      font-weight: bold;
      padding: 0 p2r(30);
      .ct-types{
        position: relative;
        padding-right: p2r(20);
        img{
          /*translat: ;*/
          margin-left: p2r(5);
          width: p2r(25);
          height: p2r(14);
        }
        .slow{
          transform: rotate(180deg);
        }
        .ctt-list{
          position:absolute;
          right: p2r(0);
          top:p2r(45);
          box-shadow: 0px 1px 5px rgba(97, 148, 207, 0.3);
          ul{
            width: p2r(135);
            border:1px solid #e6e6e6;
            color: #353535;
            font-size: p2r(28);
            font-weight: 100;
            background: #fff;
            padding: 0 p2r(15);
            li{
              border-bottom: 1px solid #e6e6e6;
              height: p2r(72);
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: Microsoft YaHei;
            }
          }

        }
      }
    }
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
    .record-list{
      li{
        width: p2r(750);
        box-sizing: border-box;
        padding:p2r(26) p2r(30) p2r(34) p2r(30) ;
        border-top: 1px solid #f4f4f4;
        .left{
          .title{
            font-size: p2r(32);
            color: #353535;
            font-weight: 500;
          }
          .time{
            font-size: p2r(24);
            color: #999;
            margin-top: p2r(20);
          }
        }
        .right{
          /*line-height: p2r(64);*/
          font-size: p2r(40);
          margin-top: p2r(20);
          color: #333;
        }
        .gray{
          color:  #e60a30;
        }
      }
    }
  }
  .dataEnd{
    text-align: center;
  }
</style>
