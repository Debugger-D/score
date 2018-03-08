<template>
  <div class="order_end">
    <div v-if="status===1">
      <div class="or-top">
        <span class="success"></span>
        <p class="large">订单提交成功</p>
        <div class="orderNum">
          <p class="gray">订单编号:</p>
          <p class="gray">{{orderNum}}</p>
        </div>
      </div>
      <div class="or-mid">
        <p>使用积分: <span class="red">{{this.$route.query.payment}}个</span></p>
        <router-link to="/mall_home" replace>
          <a class="button red">继续兑换</a>
        </router-link>
        <router-link  :to="{ path: '/order_detail', query: { id: id}}" replace>
          <a class="button white">查看订单</a>
        </router-link>
      </div>
      <div class="or-bot">
        <p class="gray tips">安全提醒: 泰然城平台不会以订单异常、系统升级为又 要求您点击任何网址链接进行 退款操作</p>
      </div>
    </div>
    <div v-if="status===2">
      <div class="or-top">
        <span class="fail"></span>
        <p class="large">订单兑换失败</p>
        <p class="reason">失败原因:<span>{{error}}</span></p>
      </div>
      <div class="interval">
        <span class="red">{{timeOut}} </span><span>秒后，跳转至原页面</span>
      </div>
      <div class="or-mid">
        <router-link to="/mall_home">
          <a class="button white">完成</a>
        </router-link>
      </div>
    </div>
    <v-fixside :share="false" :home="true" :height="100"></v-fixside>
  </div>
</template>
<script>
  import * as types from '@/services/types'
  import axios from 'axios';
  import qs from 'qs';
  import vFixside from '@/components/fixside/fixside'
  export default{
  	  components:{vFixside},
      data(){
        return{
          orderNum:'',
          status:'',
          timeOut:5,
          id:'',
          back:'',
          error:''
        }
      },
      mounted:function () {
      	let this_=this;
        let postData=this.$route.query;
        axios.post(types.EXCHANGEGOODS,qs.stringify(postData), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((data) =>{
          this_.orderNum=data.data.orderNum;
          this_.id=data.data.id;
          this_.status=1
        },(data) => {
          this_.error=data.description;
        	this_.status=2;
          this_.back=setInterval(function () {
            this_.timeOut--;
            if(this_.timeOut<=0){
            	clearInterval(this_.back);
              this_.$router.replace({path:'/mall_home',query:data})
            }
          },1000)
        })
      },
      destroyed:function () {
        let this_=this;
        clearInterval(this_.back);
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .order_end{
    padding: p2r(80) p2r(140);
    text-align: center;
    .gray{
      font-size: p2r(24);
      color: #c9c9c9;
      line-height: p2r(40);
    }
    .or-top{
      .success{
        display: inline-block;
        width: p2r(82);
        height: p2r(82);
        background-image: url("../../assets/images/order_end/success.png");
        background-repeat: no-repeat;
        background-size: p2r(80);
      }
      .fail{
        display: inline-block;
        width: p2r(82);
        height: p2r(82);
        background-repeat: no-repeat;
        background-image: url("../../assets/images/order_end/fail.png");
        background-size: p2r(80);
      }
      .large{
        font-size: p2r(36);
        color: #353535;
        margin-top: p2r(20);
      }
      .reason{
        margin-top: p2r(10);
        line-height: p2r(35);
        color: #c9c9c9;
      }
      .orderNum{
        margin-top: p2r(10);
      }
    }
    .or-mid{
      p{
        font-size: p2r(28);
        color: #353535;
        margin-top: p2r(40);
        .red{
          font-size: p2r(40);
          color: #FF5555;
        }
      }
      .button{
        margin: 0 auto;
        display: block;
        width: p2r(300);
        height: p2r(70);
        border-radius: p2r(35);
        background-color: #E60A30;
        text-align: center;
        line-height: p2r(70);
        font-size: p2r(28);
      }
      .red{
        color: #fff;
        margin-top: p2r(45);
      }
      .white{
        border: 1px solid #C9C9C9;
        background-color: #fff;
        margin-top: p2r(30);
      }
    }
    .or-bot{
      margin-top: p2r(30);
      .tips{
        font-size: p2r(20);
      }
    }
    .interval{
      color: #c9c9c9;
      margin-top: p2r(50);
      .red{
        color: #ff5555;
      }
    }
  }
</style>
