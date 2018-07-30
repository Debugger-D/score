<template>
  <div class="fixside">
    <ul>
      <li class="ba1" v-if="share" @click="shareMe"></li>
      <li class="ba2" v-if="home" @click="goHome"></li>
      <li class="ba3" v-if="topShow" @click="goTop"></li>
    </ul>
  </div>
</template>
<script>
  export default{
  	props:{
  		share:false,
      home:true,
      height:'',
    },
    data(){
      return{
        topShow:false,
      }
    },
    methods:{
    	isShow:function () {
        if(document.body.scrollTop>=this.height){
        	this.topShow=true
        }else{
          this.topShow=false
        }
      },
      goTop:function () {
        let speed = document.body.scrollTop/10;
        let anim=setInterval(function () {
    			if(document.body.scrollTop>0){
            document.body.scrollTop -= speed
          }else{
    				clearInterval(anim)
          }
        },50);
      },
      goHome:function () {
        this.$router.push({path:'/mall_home'})
      },
      shareMe(){
        let image = 'https://jf.trc.com/credit_front/img/share.png';
        let href = 'trc://share?params=' +
          methods.base64encode(methods.utf16to8(JSON.stringify([{
              "title": "",
              "content": "我在泰然城积分商城发现了一个不错的商品，快来看看吧。",
              'link':window.location.href,
              "icon": image,
            }])
          ));
        console.log(href)
        window.location.href = href
      }
    },
    mounted() {
      window.addEventListener('scroll', this.isShow)
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .fixside{
    position: fixed;
    bottom: p2r(160);
    right: p2r(30);
    z-index: 8;
    ul{
      li{
        width: p2r(80);
        height: p2r(80);
        border-radius: 50%;
        opacity: 0.6;
        background-color: #000000;
        background-position:center ;
        background-repeat: no-repeat;
        margin-top: p2r(20);
      }
      .ba1{
        background-image: url('../../assets/images/goods_detail/trcShare.png');
        background-size: p2r(30);
      }
      .ba2{
        background-image: url('../../assets/images/goods_detail/home.png');
        background-size: p2r(43);
      }
      .ba3{
        background-image: url('../../assets/images/goods_detail/TOP.png');
        background-size: p2r(54) p2r(24);
      }
    }
  }
</style>
