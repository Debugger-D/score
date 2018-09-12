<template>
  <div>
    <div class="line"></div>
    <div class="banner-slider" v-if="banner.length>0">
      <swiper :options="swiperOption">
        <!-- 幻灯内容 -->
        <swiper-slide v-for="banner in banner" :key="banner.id">
          <a :href="banner.targetUrl">
            <img :src="banner.imgUrl"  alt="">
          </a>
        </swiper-slide>
        <!-- ... -->
        <!-- 以下配置均为可选（使用具名slot来确定并应用一些操作控件元素） -->
        <div class="swiper-pagination"  slot="pagination" v-if="banner.length>1">
          <!--动态插入下面-->
          <!--<span class="swiper-pagination-bullet"><span>-->
        </div>
      </swiper>
  </div>

  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  export default{
    components:{swiper,swiperSlide},
    //props:['banner'],
    data(){
      return{
        //必须先把参数写进去 要不然刷新加载贼慢
        //banner:[{imgUrl:"",targetUrl:'https://jf.trc.com/credit_h5'}],
        swiperOption: {
          // 如果你后续需要找到当前实例化后的swiper对象以对其进行一些操作的话，可以自定义配置一个名字
          name: 'currentSwiper',
          // 所有配置均为可选（同Swiper配置）
          autoplay: 3000,
          loop:true,//无限循环
          direction : 'horizontal',//滑动方向vertical（上下）
          paginationType : 'bullets',//分页样式
          autoplayDisableOnInteraction:false,//鼠标操作后是否影响自动轮播
          grabCursor : false,//该选项给Swiper用户提供小小的贴心应用，值为true时，光标在Swiper上时成手掌状。
          setWrapperSize :true,
          autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : false,
          observeParents:true,
          effect:'fade',
          // if you need use plugins in the swiper, you can config in here like this
          debugger: true,
        }
      }
    },
    mounted (){

    },
    props: ['banner']
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .swiper-pagination{
    color: #fff;
    .swiper-pagination-bullet {
      background: #000;
    }
  }
  .swiper-container{
    background-color: #fff;
  }
  .swiper-slide{
    text-align: center;
    a{
      display: block;
    }
    img{
      width:100%;
      height: p2r(173);
      border: none;
    }
  }
  .line{
    width: p2r(660);
    padding: p2r(0) p2r(4);
    height: 1px;
    background-color: #e4e4e4;
    margin:0 auto;
  }

</style>
