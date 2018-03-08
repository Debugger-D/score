<template>
  <div class="banner-slider">
    <swiper :options="swiperOption">
      <!-- 幻灯内容 -->
      <swiper-slide v-for="item in notice" :key="item.id" v-if="notice.length>1">
        <a :href="item.targetUrl">
          <p><img :src="item.imgUrl" v-if="item.imgUrl">{{item.title}}</p>
        </a>
      </swiper-slide>
      <a :href="notice[0].targetUrl" v-else>
        <p><img :src="notice[0].imgUrl" v-if="notice[0].imgUrl">{{notice[0].title}}</p>
      </a>
    </swiper>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default{
    components:{swiper,swiperSlide},
    props:['notice'],
    data(){
      return{
        swiperOption: {
          // 如果你后续需要找到当前实例化后的swiper对象以对其进行一些操作的话，可以自定义配置一个名字
          name: 'currentSwiper',
          // 所有配置均为可选（同Swiper配置）
          autoplay: 3000,
          loop:true,//无限循环
          direction : 'vertical',//滑动方向vertical（上下）
          paginationType : 'bullets',//分页样式
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : false,
          observeParents:true,
          effect:'slide',
          debugger: true,
        }
      }
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .swiper-container{
    height: p2r(50);
    width: p2r(570);
  }
  .swiper-slide{
    text-align: center;
    height: p2r(50);
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
  }
  a{
    display: block;
    p{
      line-height: p2r(50);
      text-align: left;
      font-size:p2r(24) ;
      overflow: hidden;
      text-overflow:ellipsis;
      width: p2r(500);
      white-space: nowrap;
      display: flex;
      display: -webkit-box;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
    }
    img{
      display: inline-block;
      height: p2r(35);
      margin-right: p2r(20);
    }
  }
</style>
