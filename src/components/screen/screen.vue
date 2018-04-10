<template>
  <div>
    <ul class="gs-screen">
      <li :class="{active: screenOne == 'all'}" @click="screen('all')">全部商品</li>
      <li :class="{active: screenOne == 'low'}" @click="screen('low')">从低到高</li>
      <li :class="{active: screenOne == 'high'}" @click="screen('high')">从高到低</li>
      <li :class="{active: screenOne == 'can'}" @click="screen('can')" v-if="getState.totalCount">我能兑换</li>
      <li :class="{active: screenOne == item.id}" v-for="item in getState.screenList" @click="screen(item)">
        <span v-if="item.scoreMax">{{item.scoreMin}}-{{item.scoreMax}}</span>
        <span v-else>{{item.scoreMin}}以上</span>
      </li>
    </ul>
    <div class="mask" @click="screen('close')"></div>
  </div>
</template>
<script>
  import store from '@/vuex/store'
  import { mapGetters, mapState, mapActions} from 'vuex'
  export default{
  	props: {
  		screenOne: '',
  		callback: {},
    },
    computed: {
      ...mapGetters([
        'getState'
      ])
    },
    methods :{
      //筛选调用父级方法
      screen(type) {
        this.callback(type);
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .mask{
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .gs-screen{
    background-color:#fff ;
    position: absolute;
    z-index: 10086;
    padding: p2r(20) 0;
    display: flex;
    /*justify-content: space-around;*/
    flex-wrap: wrap;
    li{
      background-color: #f4f4f4;
      margin: p2r(20) p2r(35);
      width: p2r(180);
      height: p2r(60);
      align-items: center;
      display: flex;
      justify-content: center;
    }
    .active{
      background-color: #e60a30;
      color: #fff;
    }
  }
</style>
