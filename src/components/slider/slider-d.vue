<template>
  <div class="banner-slider">
    <swiper :options="swiperOption">
      <!-- 幻灯内容 -->
      <swiper-slide v-for="banner in banner" :key="banner.id">
        <!--<a :href="banner.targetUrl" target="_blank">-->
          <img :src="banner.fileUrl+'?imageView2/2/h/500'"  alt="">
        <!--</a>-->
      </swiper-slide>
      <!-- 以下配置均为可选（使用具名slot来确定并应用一些操作控件元素） -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default{
    components:{swiper,swiperSlide},
    //props:['banner'],
    data(){
      return{
        //必须先把参数写进去 要不然刷新加载贼慢
        banner:[{fileUrl:"https://jfimg.tairanmall.com/FhQc2jGHtSfjyL4s3fM0xydFdug9"}],
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
          effect:'fade',
          // if you need use plugins in the swiper, you can config in here like this
          debugger: true,
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .swiper-container{
    background-color: #fff;
    box-sizing: border-box;
    padding-top: p2r(61);
    height: p2r(730);
    border:1px solid #E4E4E4;
    width: p2r(750);
    overflow: hidden;
    z-index: 0;
    .swiper-wrapper{
      overflow: hidden;
    }
  }
  .swiper-slide{
    width: p2r(750);
    text-align: center;
    img{
      width: p2r(560);
      height: p2r(560);
    }
  }
  .swiper-pagination{
    bottom: p2r(40);
  }
</style>
