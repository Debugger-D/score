<template>
  <div class="address_list">
    <router-link :to="{path:'/address_add',query:queryData}">
      <div class="addAddress">
        添加新地址
      </div>
    </router-link>

    <div class="address11">
      <ul>
        <li class="clearfix" v-for="address in addressList " :key="address.id">
          <div class="address" @click="selected(address.id)">
            <div class="left">
              <div class="left-t">
                <span class="receiverName">{{address.receiverName}}</span>
                <span class="phone">{{address.phone}}</span>
              </div>
              <div class="left-b">
                <p>
                  <span v-if="address.isDefault" class="color-or">[默认地址] </span>{{address.province}}{{address.city}}{{address.area}}{{address.address}}
                </p>
              </div>
            </div>
          </div>
          <div class="next" @click="goEdit(address.id)"></div>
        </li>
      </ul>
    </div>
    <v-fixside :share="false" :home="true" :height="100"></v-fixside>
  </div>
</template>
<script>
  import * as types from '@/services/types'
  import store from '@/vuex/store'
  import { mapGetters,mapState } from 'vuex'
  import axios from 'axios';
  import { Toast } from 'mint-ui';
  import vFixside from '@/components/fixside/fixside'
  export default{
    name:'address_list',
    components:{vFixside},
    computed:{
      ...mapState(['activityId']),
    },
    data(){
      return{
        addressList:'',
        queryData:'',
      }
    },
    mounted: function () {
      document.body.scrollTop=0;
    	let this_=this;
      this_.queryData=this.$route.query;
      //地址
      axios.get(types.ADDRESSLIST).then(function (data) {
        this_.addressList=data.data.infos;
      });
    },
    methods: {
      selected:function (id) {
        //从下单页跳转过来的
      	if(this.queryData.goodsId){
          let data=Object.assign(this.queryData,{addressId:id});
          this.$router.replace({path:'/order',query:data})
          //从活动页跳转过来的
        }else if(this.queryData.orderNum){
          let data=Object.assign(this.queryData,{addressId:id,id:this.activityId});
          this.$router.replace({path:'/activity',query:data})
        }else{
          this.$router.push({path:'/address_edit',query:{addressId:id}})
        }
      },
      goEdit:function (id) {
        let data=Object.assign(this.queryData,{addressId:id});
        this.$router.push({path:'/address_edit',query:data})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .address_list{
    min-height: p2r(1400);
    background-color: #F4F4F4;
    .address11{
      box-sizing: border-box;
      color: #353535;
      .left{
        /*padding-right:p2r(40);*/
        .left-t{
          font-size: p2r(28);
          .phone{
            display: inline-block;
            margin-left: p2r(50);
          }
        }
        .left-b{
          margin-top: p2r(20);
          line-height: p2r(35);
          .color-or{
            color: #FF5555;
          }
        }
      }
      ul{
        li{
          height: p2r(200);
          box-sizing: border-box;
          padding: p2r(0) 0 p2r(20) p2r(30);
          background-color: #fff;
          margin-top: p2r(20);
          position: relative;
          .address{
            width: p2r(640);
            /*float: left;*/
            padding-top: p2r(45);
            padding-right: p2r(10);
            box-sizing: border-box;
            height: p2r(200);
          }
          .next{
            background-image: url("../../assets/images/order/edit.png");
            background-repeat: no-repeat;
            background-position: p2r(23);
            background-size:p2r(30) p2r(30) ;
            width: p2r(80);
            /*float: right;*/
            /*height: p2r(200);*/
            position: absolute;
            top:0;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
    .addAddress{
      background-color: #fff;
      padding: p2r(35) p2r(30);
      font-size: p2r(28);
      background-image: url("../../assets/images/order/next.png");
      background-repeat: no-repeat;
      background-position: p2r(700);
      background-size:p2r(17) p2r(30) ;
    }
  }
</style>
