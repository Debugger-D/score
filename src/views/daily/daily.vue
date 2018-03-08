<template>
    <div class="daily">
      <!--<div>
        <img src="https://jfimg.tairanmall.com/Fkhf1osv68FlE9RBaU37LVcggC33" alt="">
        <img src="https://testimg.trc.com/FjiI247gaXfV5Fun9VpPU5wUMEE2" alt="">
        <img src="https://testimg.trc.com/Fnf2_klxTmy737u3GOYV0kOgciii" alt="">
        <img src="https://testimg.trc.com/FhcuxxoOQXPOfVonT_Pm48LFdeAQ" alt="">
        <img src="https://testimg.trc.com/FiO0xBPqPSA0pV8O2ue_KLtWInZg" alt="">
        <img src="https://testimg.trc.com/FoTmVxk6OxFyJh7o8aNwvcYT0_IY" alt="">
        <img src="https://testimg.trc.com/FrXsLbzsYC4ifsFgkXfZXlX7FKYP" alt="">
        <img src="https://testimg.trc.com/FpQ8WnweLp3a8oOsgHAhdMMUKiTD" alt="">
      </div>
      <div class="confirm">
        <router-link to="/address_list">
          <img src="https://testimg.trc.com/FgHf_kOUtWVzEED7vHkCoDMiwacB" alt="" class="btn">
        </router-link>
      </div>-->
    </div>
</template>
<script>
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .daily{
    overflow: hidden;
  }
  img{
    width: 100%;
    float: left;
    padding: 0;
  }
  div{
    /*background: black;*/
  }
  .video{
    padding: 0;
    margin: 0;
    background: black;
  }
  .confirm{
    height: p2r(166);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: url("https://testimg.trc.com/FmNcu9R1ac0gN0xiNyprta0u1HCg") 0 0 / 100% no-repeat;
    /*background-size: 100%;*/
    .btn{
      width: p2r(340);
    }
  }
</style>
