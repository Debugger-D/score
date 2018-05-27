<template>
  <div class="">
    <input type="text" placeholder="帐号" v-model="user.phone" > <br>
    <input type="text" placeholder="密码" v-model="user.password">
    <p>{{error}}</p>
    <button @click="link">登录test</button>
  </div>
</template>

<script>
  import * as types from '@/services/types'
  //import * as methods from '@/util/common'
  import axios from 'axios';
  import qs from 'qs';
  export default {
    name: 'login',
    data (){
      return {
        error: '',
        phone:'',
        user:{
          phone:'',
          password:''
        },
      }
    },
    methods:{
      link () {
        axios.post(types.LOGIN,qs.stringify(this.user), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((data) =>{
          let redirectUrl=this.$route.query.redirectUrl;
          if(redirectUrl){
            window.location.href= redirectUrl
          }else{ this.$router.push({path:'/mall_home'})}
        },(data) => {this.error=data.response.data})
        }
    }
  }

</script>

<style scoped lang="scss" >
    input{
      margin: 5px;
      width: 400px;
      height: 100px;
      font-size: 30px;
      padding: 20px;
    }
    button {
      margin-left: 10px;
      width: 100px;
      height: 50px;
      font-size: 30px;
    }
</style>
