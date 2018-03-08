<template>
  <div class="address_add">
    <ul>
      <li class="common">
        <p>
          <span class="left">收货人</span>
          <input class="text" type="text" v-model="receiverName">
        </p>
      </li>
      <li class="common">
        <p>
          <span class="left">联系电话</span>
          <input class="text" type="text" maxlength="11" v-model="phone" onkeyup="this.value=this.value.replace(/\D/gi,'')">
        </p>
      </li>
      <li class="common area" @click="pickerShow">
        <p>
          <span class="left">所在地区</span>
          <span class="text">{{area}}</span>
        </p>
      </li>
      <li class="addressDetail">
        <textarea class="textarea" v-model="address" placeholder="请填写详细地址，不少于5个字"></textarea>
      </li>
      <li class="setDefault" @click="changeDefault">
        <span class="selectN" v-if="!isDefault"></span>
        <span class="selectY" v-else></span>
        <span class="text">设为默认地址</span>
      </li>
    </ul>
    <div class="fixBottom" >
      <div @click="add" class="add">
        <span href="javescript:;" class="button">保存</span>
      </div>
    </div>
  </div>
</template>
<script>
  import * as types from '@/services/types'
  import * as methods from '@/util/common'
  import axios from 'axios';
  import qs from 'qs';
  import { Toast } from 'mint-ui';
  import Picker from 'better-picker'

    export default{
    	//components:{Picker},
      data(){
        return{
          isDefault:true,//是否默认地址
          phone:'',//联系电话
          receiverName:'',//收货人
          provinceCode:'',//省
          cityCode:'',//市
          areaCode:'',//区
          address:'',//详细地址
          /*地区选择框*/
          picker:'',
          area:'',
          first:[],/* 省，直辖市 */
          second:[], /* 市 */
          third:[],/*县 区*/
          selectedIndex : [0, 0, 0],/* 默认选中的地区 */
          checked : [0, 0, 0],/* 已选选项 */
        }
      },
      mounted:function(){
        let this_=this;
      	axios.get(types.AREA).then(function (data) {
          this_.data=data.data.children;
          function creatList(obj, list){
            obj.forEach(function(item, index, arr){
              let temp = {};
              temp.text = item.areaName;
              temp.value = index;
              list.push(temp);
            })
          }
          if (this_.data[this_.selectedIndex[0]].hasOwnProperty('children')) {
            creatList(this_.data[this_.selectedIndex[0]].children, this_.second);
          } else {
            this_.second = [{text: '', value: 0}];
          }
          if (this_.data[this_.selectedIndex[0]].children[this_.selectedIndex[1]].hasOwnProperty('children')) {
            creatList(this_.data[this_.selectedIndex[0]].children[this_.selectedIndex[1]].children, this_.third);
          } else {
            this_.third = [{text: '', value: 0}];
          }
          creatList( this_.data, this_.first);
          this_.picker = new Picker({
            data: [this_.first, this_.second, this_.third],
            selectedIndex: this_.selectedIndex,
            title: ''
          });
          this_.picker.on('picker.change', function (index, selectedIndex) {
            if (index === 0){
              firstChange();
            } else if (index === 1) {
              secondChange();
            }
            function firstChange() {
              this_.second = [];
              this_.third = [];
              this_.checked[0] = selectedIndex;
              var firstCity = this_.data[selectedIndex];
              if (firstCity.hasOwnProperty('children')) {
                creatList(firstCity.children, this_.second);

                var secondCity = this_.data[selectedIndex].children[0]
                if (secondCity.hasOwnProperty('children')) {
                  creatList(secondCity.children, this_.third);
                } else {
                  this_.third = [{text: '', value: 0}];
                  this_.checked[2] = 0;
                }
              } else {
                this_.second = [{text: '', value: 0}];
                this_.third = [{text: '', value: 0}];
                this_.checked[1] = 0;
                this_.checked[2] = 0;
              }

              this_.picker.refillColumn(1, this_.second);
              this_.picker.refillColumn(2, this_.third);
              this_.picker.scrollColumn(1, 0)
              this_.picker.scrollColumn(2, 0)
            }
            function secondChange() {
              this_.third = [];
              this_.checked[1] = selectedIndex;
              var first_index = this_.checked[0];
              if (this_.data[first_index].children[selectedIndex].hasOwnProperty('children')) {
                var secondCity = this_.data[first_index].children[selectedIndex];
                creatList(secondCity.children, this_.third);
                this_.picker.refillColumn(2, this_.third);
                this_.picker.scrollColumn(2, 0)
              } else {
                this_.third = [{text: '', value: 0}];
                this_.checked[2] = 0;
                this_.picker.refillColumn(2, this_.third);
                this_.picker.scrollColumn(2, 0)
              }
            }

          });
          this_.picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
            let text1 = this_.first[selectedIndex[0]].text;
            let text2 = this_.second[selectedIndex[1]].text;
            let text3 = this_.third[selectedIndex[2]] ? this_.third[selectedIndex[2]].text : '';
            this_.area=text1 +text2 + text3;
            this_.provinceCode=this_.data[selectedIndex[0]].code;
            this_.cityCode=this_.data[selectedIndex[0]].children[selectedIndex[1]].code;
            if(this_.data[selectedIndex[0]].children[selectedIndex[1]].children){
            	this_.areaCode=this_.data[selectedIndex[0]].children[selectedIndex[1]].children[selectedIndex[2]].code
            }else{
              this_.areaCode=''
            };
          });
        })
      },
      methods: {
        changeDefault:function () {
          this.isDefault=!this.isDefault
        },
        pickerShow:function () {
          this.picker.show();
        },
        add:function () {
          let this_=this;
          let data={
            isDefault:this_.isDefault,//是否默认地址
            phone:this_.phone,//联系电话
            receiverName:this_.receiverName,//收货人
            provinceCode:this_.provinceCode,//省
            cityCode:this_.cityCode,//市
            areaCode:this_.areaCode,//区
            address:this_.address,//详细地址
          };
          if (this_.receiverName==''){
            Toast('收货人不能为空')
          } else if(this_.phone.length!=11 || this_.phone.match(/1[3456789]\d{9}$|^(0\d{2,3}-?)?[2-9]\d{5,7}(-\d{1,5})/g)==null){
            Toast('手机格式不正确')
          }else if(this_.provinceCode == ''||this_.cityCode==''){
            Toast('所在地区不能为空')
          } else if(this_.address==''){
            Toast('详细地址不能为空')
          }else{
            axios.post(types.ADDADDRESS,qs.stringify(data), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              }
            }).then((data) =>{
              Toast('添加成功');
              if(this_.$route.query){
                this_.$router.push({path:'/address_list',query:this.$route.query})
              }else{
                this_.$router.push({path:'/address_list'})
              }
            },(data) => {Toast(data.description)})
          }

        }
      },
      destroyed:function () {
        this.picker.hide();
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @function p2r ($px){
    @return $px/75 + rem;
  }
  .address_add{
    background-color: #f4f4f4;
    padding-top: p2r(20);
    height: p2r(1300);
    font-size: p2r(28);
    color: #353535;
    ul{
      li{
        padding: p2r(30);
        box-sizing: border-box;
        height: p2r(98);
        margin-top: p2r(2);
        background-color: #fff;
      }
      .area{
        background-image: url("../../assets/images/order/next.png");
        background-repeat: no-repeat;
        background-position: p2r(700);
        background-size:p2r(17) p2r(30)
      }
      .common{
        .left{
          display: inline-block;
          width: p2r(170);
          height: p2r(45);
          line-height: p2r(45);
        }
        .text{
          height: p2r(45);
          font-size: p2r(28);
          line-height: p2r(45);
          border: none;
        }

      }
      .addressDetail{
        height: p2r(130);
        .textarea{
          font-size: p2r(28);
          width: p2r(610);
          height: p2r(80);
          border: none;
          resize: none;
        }
      }
      .setDefault{
        line-height: p2r(30);
        span{
          vertical-align: middle;
        }
        .text{
          margin-left: p2r(25);
        }
        .selectN{
          display: inline-block;
          width: p2r(30);
          height: p2r(30);
          box-sizing: border-box;
          border: 1px solid #353535;
        }
        .selectY{
          display: inline-block;
          width: p2r(30);
          height: p2r(30);
          background-image: url("../../assets/images/address/select.png");
          background-repeat: no-repeat;
          background-size: p2r(30);
        }
      }
    }
    .picker{
      width: p2r(750);
      font-size: p2r(28);
      .picker-items{
        width: p2r(500) !important;
        .picker-selected{
          transform: scale(1.2);
        }
      }
    }
    .fixBottom{
      position: fixed;
      bottom: 0;
      z-index: 100;
      background-color: #fff;

      text-align: center;
      font-size: p2r(28);
      line-height: p2r(98);
      .add{
        background-color: #E60A30;
        color: #fff;
        .button{
          display: block;
          height: p2r(98);
          width: p2r(750);
          color: #fff;
        }
      }
    }
  }
</style>
