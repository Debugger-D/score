<template>
  <div class="problems">
    <ul>
      <li>
        <p class="title">
          <span class="color-blue">Q1 </span>
          <span class="t-text">什么是泰然城积分？</span>
        </p>
        <p class="content">
          积分是泰然城对用户的一种奖励。用户可以通过使用T币兑换的形式获得积分。积分可以在积分商城兑换实物礼品或泰然金融卡券 （礼品将不断丰富）。
        </p>
      </li>
      <li>
        <p class="title">
          <span class="color-blue">Q2 </span>
          <span class="t-text">积分如何获取？</span>
        </p>
        <p class="content">
          目前仅限经过泰然金融实名认证过的用户可以使用T币可进行兑换，目前T币兑换积分的比例为1：1，即使用100T币可以兑换100积分。兑换为积分后不允许撤销，积分目前不支持转让和兑现。
        </p>
      </li>
      <li>
        <p class="title">
          <span class="color-blue">Q3 </span>
          <span class="t-text"> 如何查看我的积分详情？</span>
        </p>
        <p class="content">
          您可以在登录积分商城后，在“我的积分”栏目下查看所拥有的积分以及积分的使用详情。
        </p>
      </li>
      <li>
        <p class="title">
          <span class="color-blue">Q4 </span>
          <span class="t-text"> 如何查看我的兑换订单？</span>
        </p>
        <p class="content">
          您可以在登录积分商城后，在“我的订单”频道，查看兑换的订单。
        </p>
      </li>
      <li>
        <p class="title">
          <span class="color-blue">Q5 </span>
          <span class="t-text">积分的有效期限是多久？</span>
        </p>
        <p class="content">
          在2017年12月31日 23:59:59之前T币兑换成积分的有效期统一至2018年12月31日23:59:59过期;<br>
          在2018年1月1日00:00:00之后T币兑换成积分的有效期统一遵循6-12个月的有效规则:<br>
          a.1月至6月份T币兑换成积分的有效期至第二年1月1日00:00:00过期；<br>
          b.7月至12月份T币兑换成积分的有效期至第二年7月1日00:00:00过期。
        </p>
      </li>
      <li>
        <p class="title">
          <span class="color-blue">Q6 </span>
          <span class="t-text">兑换的礼品如何领取？</span>
        </p>
        <p class="content">
          目前可以通过积分商城兑换实物礼品和泰然金融卡券。兑换实物礼品后，泰然城将在7个工作日进行发货，发货后您可以在后台查看到订单及物流信息；兑换泰然金融卡券后，卡券将立刻到达您的泰然金融账户，请前往泰然金融后台查看。
        </p>
      </li>
      <li>
        <p class="title">
          <span class="color-blue">Q7 </span>
          <span class="t-text">兑换的实物礼品我可以选择指定快递吗？</span>
        </p>
        <p class="content">
          泰然城会根据您的收货地址选择合适的快递公司进行配送，不接受指定的快递。兑换的实物礼品均免费配送，仅限中国大陆地区（港澳台地区以及海外暂不配送）。
        </p>
      </li>
      <li>
        <p class="title">
          <span class="color-blue">Q8 </span>
          <span class="t-text">兑换的实物礼品有售后服务吗？</span>
        </p>
        <p class="content">
          通过积分商城兑换的实物礼品除产品质量问题外不享受退换货服务，如有其他售后问题可联系泰然城客服解决。
        </p>
      </li>
      <li>
        <p class="title">
          <span class="color-blue">Q9 </span>
          <span class="t-text">每日T币兑换积分有上限吗？</span>
        </p>
        <p class="content">
          试运营期间每个用户每日最多允许兑换1000000积分。平台每日有兑换上限，如超出会导致兑换失败，可次日再来兑换。
        </p>
      </li>
      <li>
        <p class="title">
          <span class="color-blue">Q10 </span>
          <span class="t-text">如何联系客服？</span>
        </p>
        <p class="content">
          若在积分商城使用中遇到其他问题，请咨询在线客服或拨打平台服务电话400-669-6610。
        </p>
      </li>
    </ul>
    <v-fixside :share="false" :home="true" :height="100"></v-fixside>
  </div>
</template>
<script>
  import vFixside from '@/components/fixside/fixside'
    export default{
    	name:'problems',
      components: {vFixside},
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .problems{
    margin-top: p2r(5);
    ul{
      padding: p2r(0) p2r(28);
      li{
        padding: p2r(40) p2r(0);
        border-bottom: 1px solid #e4e4e4;
        .title{
          font-size: p2r(28);
          color: #353535;
        }
        .content{
          margin-top: p2r(30);
          line-height: p2r(30);
        }
      }
    }
  }
</style>
