<template>
  <div class="my-Main">
    <div class="my-top">
      <div class="ih-left">
        <div>
          <span class="raduis"></span>
          <span>可用积分: </span>
          <span class="color-red"> {{scoreDetail.score}}</span>
        </div>
        <p class="valid" v-if="scoreDetail.count>0">{{scoreDetail.validDate | time('yyyy.MM.dd')}}过期积分 {{scoreDetail.count}}
          <router-link to="/problems">
            <span class="toProblem"></span>
          </router-link>
        </p>
      </div>
      <router-link to="/mall_home">
        <div class="my-right fr color-blue">
          兑换商品>
        </div>
      </router-link>
    </div>
    <div class="my-padding"></div>
    <div class="my-bottom">
      <div class="ib-rule">
        <span class="ibr-title">兑换积分</span>
        <span class="ibr-des">(1T币 = 1积分)</span>
      </div>
      <div class="ib-main">
        <div class="ibm-border">
          <span class="ibmb-left">T币</span>
          <input type="number" v-model="scoreVal" :placeholder="text" onkeyup="this.value=this.value.replace(/\D/gi,'')">
          <span class="color-blue"  @click="exchange">兑换积分</span>
        </div>
      </div>
      <div class="ib-buttonList">
        <span :class="{ active: scoreType == 1 }" class="ibb-single" @click="scoreCount(1)">全部T币</span>
        <span :class="{ active: scoreType == 2 }" class="ibb-single" @click="scoreCount(2)">1/2 T币</span>
        <span :class="{ active: scoreType == 3 }" class="ibb-single" @click="scoreCount(3)">1/3 T币</span>
      </div>
    </div>
    <div class="modal" v-if="modalShow">
      <div class="popup">
        <div class="main">
          <div class="pop-icon"><img class="question" src="../../assets/images/mall_home/qusetion.png" alt=""></div>
          <span class="close" @click="close"></span>
          <p class="content">
            是否确认用{{param.amount}}T币兑换 <span class="color-red">{{param.score}}</span>积分
          </p>
          <span class="confirm" @click="confirm">确定</span>
        </div>
      </div>
      <div class="mask"></div>
    </div>
    <v-fixside :share="false" :home="true" :height="300"></v-fixside>
  </div>
</template>
<script>
  import qs from 'qs';
  import axios from 'axios';
  import {Toast} from 'mint-ui';
  import * as types from '@/services/types'
  import vFixside from '@/components/fixside/fixside'
  export default{
    components: {vFixside},
    data () {
      return {
        text: '',
        scoreDetail: {},
        tcoin: 0,
        param: {},
        scoreVal: '',
        scoreType: '',
        ruleScore: '',
        ruleAmount: '',
        canClick: true,
        modalShow: false,
      }
    },
    mounted() {
      this.personal()
    },
    methods: {
      //关闭弹窗
      close:function () {
        this.modalShow=false;
      },
      //点击兑换
    	exchange() {
        let this_=this;
        if (this.scoreVal == '') {
          Toast('请先输入兑换数量');
        } else if (this.scoreVal == 0) {
          Toast('T币数量不足');
        }else if(this.scoreVal>this.tcoin){
          Toast('T币数量不足');
        } else {
          if(this_.canClick){
            this_.canClick=false;
            this_.param = {
              exchangeCurrency: 'TB',
              score: this_.scoreVal, //Math.floor(this_.scoreVal  / this_.ruleAmount)* this_.ruleScore,
              amount: this_.scoreVal, //Math.floor(this_.scoreVal  / this_.ruleAmount)*this_.ruleAmount
            };
            this_.modalShow = true;
            this_.canClick = true;
          }
        }
      },
      //积分t币接口请求
      personal () {
        let this_ = this;
				//积分数量
        axios.get(types.SCOREDETAIL).then(function (data) {
          this_.scoreDetail = data.data;
          //T币  兑换规则
          axios.get(types.TCOIN).then(function (data) {
            this_.tcoin = data.data.tcoin;
						this_.text='最多可兑换'+this_.tcoin+'个';
						//后端代码兑换规则查询接口有点问题，目前暂时是1:1 下面代码暂时用不到！
            /*let params = {currency: 'TB', pageSize: 1, pointer: 'IN', targetObject: 'USER'}
            axios.get(types.RULE, {params: params}).then(function (data) {
              this_.ruleAmount=data.data.infos[0].amount;
              this_.ruleScore=data.data.infos[0].score;
            });*/
          });
				});
			},
	//确认兑换
      confirm () {
        let this_=this;
        if(this_.canClick){
          this_.canClick=false;
          axios.post(types.EXCHANGEIN,qs.stringify(this.param), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then(function(data){
            this_.close();
            Toast('兑换成功');
            this_.scoreVal='';
            this_.personal();
            this_.canClick=true;
          },function (err) {
						this_.modalShow = false;
            this_.canClick = true;
            Toast(err.description)
          });
        }

      },
      //选择积分类型
      scoreCount(type) {
      	this.scoreType = type;
        this.scoreVal = Math.ceil(this.tcoin/type);
      }
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .iMain{
    font-size: p2r(26);
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
  .my-bottom{
    .ib-rule{
      height:p2r(90);
      display: flex;
      align-items: center;
      padding: 0 p2r(25);
      border-bottom: 1px solid #f4f4f4;
      .ibr-title{
        color:#000000;
        font-weight: bold;
        margin-right: p2r(25);
      }
      .ibr-des{
        color:#999999;
      }
    }
    .ib-main{
      padding: 0 p2r(25);
      .ibm-border{
        height:p2r(90);
        display: flex;
        color: #353535;
        font-size: p2r(28);
        align-items: center;
        border-bottom: 1px solid #f4f4f4;
        input{
          font-size: p2r(28);
        }
        .ibmb-left{
          width: p2r(80);
        }
        input{
          /*margin-left: p2r(30);*/
          border: none;
          width:p2r(470);
        }
      }
    }
    .ib-buttonList{
      padding: p2r(35) p2r(25);
      display: flex;
      justify-content:space-around;
      .ibb-single{
        color: #27a1e5;
        display: flex;
        align-items: center;
        justify-content: center;
        width: p2r(214);
        height:p2r(76);
        font-size: p2r(28);
        border:1px solid #27a1e5;
        -webkit-border-radius:3px;
        -moz-border-radius:3px;
        border-radius:3px;
      }
      .active{
        background: #27a1e5;
        color: #fff;
      }
    }
  }
  .modal{
    position: fixed;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 99;
    .mask{
      background-color: rgba(0, 0, 0, 0.7);
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
    }
    .main{
      position: relative;
      border-radius: p2r(8);
      .pop-icon{
        position: relative;
        text-align: center;
        height: p2r(150);
        top: p2r(-100);
        img{width:  46%;}
      }
      .close{
        display: block;
        width: p2r(36);
        height: p2r(36);
        background: url('../../assets/images/mall_home/close.png') no-repeat;
        background-size: p2r(36);
        position: absolute;
        top:8px;
        right: 8px;
        margin: p2r(13);
      }
      .blank{
        padding-bottom: 200px;
      }
      .content{
        width: p2r(250);
        margin:0 auto;
        font-size: p2r(28);
        color:#222;
        line-height: p2r(36);
      }
      .confirm{
        display: inline-block;
        width: p2r(287);
        height: p2r(70);
        text-align: center;
        line-height: p2r(70);
        color: #fff;
        font-size: p2r(28);
        border-radius: p2r(35);
        background: -moz-linear-gradient(left, #E60A30, #ff8888);
        background-image:-webkit-gradient(linear,0% 0%, 100% 100%, from(#E60A30), to(#ff8888));
        margin-top: p2r(52);
        box-shadow:0 0 13px 3px #fbd5db;
      }
    }
    .popup{
      position: relative;
      height: 220px;
      margin-left: 10%;
      margin-right: 10%;
      z-index: 2;
      top: 50%;
      margin-top: -110px;
      background-color: #fff;
      border-radius: 8px;
    }
  }
</style>
