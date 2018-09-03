<template>
    <div class="daily">
      123
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
