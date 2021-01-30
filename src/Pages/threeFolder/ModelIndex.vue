<template>
    <div class="Test2">
        <div class="canvasWrapper" id="container">
            <div id="labels">
                <div class="state_identifying labelItem" v-for="(item,index) in newcheckpoint" :data-pos='item.icon_id'
                     :key="index">
                         <div class="title" @click="jumpWaringDetails(item.name)" >
                         <div class="icon-conten" :style="{backgroundImage: `url(${item.styleType == 3 ? item.icon_url1 : item.styleType == 3 ? item.icon_url2 : item.icon_url3})`,backgroundPosition:'center', backgorundRepeat: 'no-repeat', backgroundSize:'150% 150%'}"
                         >
                         </div>
                         <div class="warning-text-style" style="z-index:99999;" @click.stop="handleTextClick">{{item.count}}</div>
                    </div>
                    <span :class="[item.styleType == 1 ? 'afterTop-blue' : 'afterTop']" style="bottom: 50px"></span>
                </div>
                <div class="state_identifying labelItem" v-for="(item,index) in newcheckpoint" :data-pos='item.icon_id' :key="item+index">
                    <div class="color-warning-content">
                        <div :class="[item.styleType == 1 ? 'pulse' : 'pulseblue']"></div>
                        <div :class="[item.styleType == 1 ? 'pulse-big' : 'pulse-big-blue']"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {
    BACK,
    COLOR_TYPE,
    DOUBLE,
    FONT,
    GRADIENT_TYPE,
    IMG_TYPE,
    Linear,
    MILKY_WAY,
    NONE_TYPE,
    SKY_BOX,
    SKY_BOX_SUN_25_DEG,
    SKY_BOX_TYPE
  } from "../../three_3D/defaultConfig";
  import PGL from "../../three_3D/PUnits.js";
  import { mapActions } from "vuex";
  import config from "../../assets/controlCente/config";
  import modelConfig from "../../assets/controlCente/modelConfig";
  // import LightBeam from "../../utils/sys_utils/option";

  


  export default {
    name: "ModelComp",
    data() {
      return {
        labelList:[],
        configJson:null,
        modelConfig:null,
        areaCount: [],
        newcheckpoint: [
                {
                    name: "物流车间",
                    count: "物流车间：0",
                    id: "-14.588720430944313,5.717266791181352,-13.841938351440032",
                    icon_id: "-11.758754064845998,5.164268251989965,-9.175292638929848",
                 
                    icon_url1: require("../../assets/images/warningIcon/wuliu-run.png"),
                    icon_url2: require("../../assets/images/warningIcon/wuliu-warning.png"),
                    icon_url3: require("../../assets/images/warningIcon/wuliu-error.png"),
                    styleType: 3,
                },
                {
                    name: "卷包车间",
                    count: "卷包车间：0",
                    id: "2.9985239013602047,0.08875031714913995,-22.52135818482514",
                    icon_id: "14.53910524317348,3.8107119965436715,-9.452768392927217",
                    icon_url1: require("../../assets/images/warningIcon/chejian-run.png"),
                    icon_url2: require("../../assets/images/warningIcon/chejian-warning.png"),
                    icon_url3: require("../../assets/images/warningIcon/chejian-error.png"),
                    styleType: 3,
                },
                {
                    name: "动能车间",
                    count: "动能车间：0",
                    id: "-29.679968978754864,2.3308972573528512,7.079405404726783",
                    icon_id: "-30.3094670166534,2.649030777104739,9.89450625742177",
                    icon_url1: require("../../assets/images/warningIcon/chejian-run.png"),
                    icon_url2: require("../../assets/images/warningIcon/chejian-warning.png"),
                    icon_url3: require("../../assets/images/warningIcon/chejian-error.png"),
                    styleType: 3,
                },
                {
                    name: "制丝车间",
                    count: "制丝车间：0",
                    id: "1.898527168193741,3.839331628619358,14.863407564013752",
                    icon_id: "1.898527168193741,3.839331628619358,14.863407564013752",
                    icon_url1: require("../../assets/images/warningIcon/chejian-run.png"),
                    icon_url2: require("../../assets/images/warningIcon/chejian-warning.png"),
                    icon_url3: require("../../assets/images/warningIcon/chejian-error.png"),
                    styleType: 1,
                },
                {
                    name: "仓储车间",
                    count: "仓储车间：0",
                    id: "--58.59708175334429,8.277917413653178,1.204564050357682",
                    icon_id: "-58.59708175334429,8.277917413653178,1.204564050357682",
                    icon_url1: require("../../assets/images/warningIcon/cangchu-run.png"),
                    icon_url2: require("../../assets/images/warningIcon/cangchu-warning.png"),
                    icon_url3: require("../../assets/images/warningIcon/cangchu-error.png"),
                    styleType: 3,
                }
            ],
      };
    },
    methods: {
      // ...mapActions(['queryJsonStrFromFile','warnInfo_data']),

      jumpWaringDetails(type) {
        if(type == '制丝车间') this.$router.push({ path: "/ChildrenWarning/SilkWorkshop" });
        if(type == '卷包车间') this.$router.push({ path: "/ChildrenWarning/ProductPackage" });
        if(type == '动能车间') this.$router.push({ path: "/ChildrenWarning/QualityfilatureNew" });
      },
      handleTextClick() {
        this.$router.push({path:'/EarlyWarningList'})
      },


      // getWarnInfo_data() {
      //   this.warnInfo_data({}).then(res=> {
      //     console.log(res)
      //       this.areaCount = res.data.areaCount
      //       for(let i=0;i<this.newcheckpoint.length;i++) {
      //         for(let j=0;j<this.areaCount.length;j++) {
      //           if(this.newcheckpoint[i].name == this.areaCount[j].name) {
      //             this.newcheckpoint[i].count = `${this.areaCount[j].name}: ` + this.areaCount[j].count
      //           }
      //         }
      //       }
      //       console.log(this.newcheckpoint);
      //   }).catch(err => {
      //       this.$Message.error('暂无数据')
      //   })
      // },
      queryJson() {
        console.log(123)
        let _this = this
        _this.queryJsonStrFromFile({ ins_id: "0000001290", fileName: "config.json" }).then(res => {
          if(res.jsonStr){
            _this.configJson = JSON.parse(res.jsonStr)
            _this.queryJsonStrFromFile({ ins_id: "0000001290", fileName: "modelConfig.json" }).then(res => {
              console.log(res)
              if(res.jsonStr){
                _this.modelConfig = JSON.parse(res.jsonStr)
                this.Scene3D.changeModel(_this.configJson, _this.modelConfig);
              }
            })
          }
        })
        

      }
    },
    mounted() {
      this.getWarnInfo_data()
      this.$nextTick(() => {
        var scope = this;
        this.Scene3D.updateContainer(document.getElementById("container"));
        //  this.Scene3D.changeModel(config, modelConfig);
        this.queryJson()
        this.Scene3D.selectFirstObjectCallBack = function(obj) {
          if (obj.object && obj.object.name == "touming_001_Material_#22287_0") {
            scope.$router.push({ path: "/ChildrenWarning/ProductPackage" });
          }
          if (obj.object && obj.object.name == "HF_37_Material_#21954_0" || obj.object.name == "HF_41_Material_#21954_0") {
            scope.$router.push({ path: "/ChildrenWarning/QualityfilatureNew" });
          }
          if (obj.object && obj.object.name == "touming_002_Material_#22287_0") {
              scope.$router.push({ path: "/ChildrenWarning/SilkWorkshop" });
          }
        };
      });
    }
  };
</script>

<style scoped>
  .Test2 {
  width: 100%;
  height: 100%;
  position: relative;
}
.Test2 .canvasWrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.Test2 .canvasWrapper #labels {
  position: absolute;
  color: #fff;
  z-index: 2;
}
.Test2 .canvasWrapper #labels .labelItem {
  position: absolute;
  top: 0;
  width: 0px;
  height: 0px;
}
.Test2 .state_identifying {
  position: absolute;
  width: 30PX;
  height: 30PX;
  border-radius: 50%;
  background: #00FF5DFF;
}
.Test2 .state_identifying .state_content {
  background-color: #fff;
  background: -webkit-linear-gradient(left, #3fd3ff, rgba(30, 168, 255, 0));
  background: -o-linear-gradient(left, #3fd3ff, rgba(30, 168, 255, 0));
  background: -moz-linear-gradient(left, #3fd3ff, rgba(30, 168, 255, 0));
  background: linear-gradient(left, #3fd3ff, rgba(30, 168, 255, 0));
  position: absolute;
  top: -100px;
  left: 103px;
  padding: 10PX;
  border-left: 3PX solid #b1eafb;
  font-size: 20PX;
  color: #ffffff;
  white-space: nowrap;
}
.Test2 .state_identifying .title {
  width: 100px;
  height: 30px;
  position: absolute;
  width: max-content;
  height: 70px;
  font-size: 18px;
  display: inline-block;
  top: -95px;
  left: 60px;
  z-index: 99999;
  display: flex;
  cursor: pointer;
}
.Test2 .state_identifying .title .icon-conten {
  width: 60px;
  height: 60px;
  margin: auto 0;
  z-index: 9;
  cursor: pointer;
}
.Test2 .state_identifying .title .warning-text-style {
  min-width: 100px;
  height: 30px;
  line-height: 30px;
  margin: auto 0;
  z-index: 99999;
  cursor: pointer;
}
/* .Test2 .state_identifying .error {
  background: url(../../assets/images/zonglan-error.png) -20px no-repeat;
}
.Test2 .state_identifying .warn {
  background: url(../../assets/images/zonglan-warn.png) -20px no-repeat;
}
.Test2 .state_identifying .run {
  background: url(../../assets/images/zonglan-run.png) -20px no-repeat;
} */
.Test2 .state_identifying .afterBto {
  position: absolute;
  bottom: -66PX;
  left: 32PX;
  background: transparent;
  display: inline-block;
  width: 30PX;
  height: 70px;
  border-top: 3PX solid #49bbe9;
  border-left: 3PX solid #49bbe9;
  transform: rotate(-90deg) skew(-20deg, 0deg);
}
.Test2 .state_identifying .afterTop {
  position: absolute;
  background: transparent;
  display: inline-block;
  width: 70px;
  height: 30PX;
  top: 0;
  left: 0px;
  right: 0;
  margin: auto;
  border-bottom: 3PX solid #49bbe9;
  border-right: 3PX solid #49bbe9;
  transform: rotate(160deg) skew(-20deg, 0deg);
}
.Test2 .state_identifying .afterTop-blue {
  position: absolute;
  /*bottom: -5PX;*/
  /*left: -24PX;*/
  background: transparent;
  display: inline-block;
  width: 70px;
  height: 30PX;
  top: 0;
  left: 0px;
  right: 0;
  margin: auto;
  opacity: 0.7;
  border-bottom: 3PX solid #EF2D02;
  border-right: 3PX solid #EF2D02;
  transform: rotate(160deg) skew(-20deg, 0deg);
}
.com-shake {
  -webkit-animation: shake 1s 2s both infinite;
  -moz-animation: shake 1s 2s both infinite;
  -ms-animation: shake 1s 2s both infinite;
  animation: shake 1s 2s both infinite;
}
.color-warning-content {
  width: 70px;
  height: 70px;
  position: absolute;
  top: -35px;
  left: -35px;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  -webkit-transform: rotateX(47deg);
  -moz-transform: rotateX(47deg);
  -ms-transform: rotateX(47deg);
  -o-transform: rotateX(47deg);
  transform: rotateX(47deg);/*rotateX(27deg) rotateY(12deg)*/
}
@keyframes shake {
  0% {
    transform: scale(1);
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
  }
  10%,
  20% {
    transform: scale(0.9) rotate(-3deg);
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
  }
  30%,
  50%,
  70%,
  90% {
    transform: scale(1.1) rotate(3deg);
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
  }
  40%,
  60%,
  80% {
    transform: scale(1.1) rotate(-3deg);
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
  }
  100% {
    transform: scale(1) rotate(0);
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
  }
}
.pulse-big {
  /*transform: skew(90deg 90deg);*/
  border-radius: 50%;
  background: rgba(239, 45, 2, 0.6) !important;
  -webkit-animation: warn1 0.9s ease-out;
  -moz-animation: warn1 0.9s ease-out;
  animation: warn1 0.9s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  box-shadow: 1px 1px 30px #EF2D02;
}
.pulse {
  border-radius: 50%;
  background: rgba(239, 45, 2, 0.6) !important;
  -webkit-animation: warn 0.9s ease-out;
  -moz-animation: warn 0.9s ease-out;
  animation: warn 0.9s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  box-shadow: 1px 1px 30px #EF2D02;
  transform: translateZ(90deg);
}
.pulse-big-blue {
  /*transform: skew(90deg 90deg);*/
  border-radius: 50%;
  background: rgba(51, 124, 147, 0.6) !important;
  -webkit-animation: warn1 0.9s ease-out;
  -moz-animation: warn1 0.9s ease-out;
  animation: warn1 0.9s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  box-shadow: 1px 1px 30px #337C93;
}
.pulseblue {
  border-radius: 50%;
  background: rgba(66, 244, 245, 0.6) !important;
  -webkit-animation: warn 0.9s ease-out;
  -moz-animation: warn 0.9s ease-out;
  animation: warn 0.9s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  box-shadow: 1px 1px 30px #42F4F5;
  transform: translateZ(90deg);
}
.pulseblue,
.pulse-big-blue {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* width: 420px;
    height: 420px; */
  border: 2px solid #3CCBDA;
  background: rgba(239, 45, 2, 0.8);
  /* border-radius: 50%; */
  opacity: 0;
  transform: translateZ(90deg);
}
.pulse,
.pulse-big {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* width: 420px;
    height: 420px; */
  border: 2px solid #EF2D02;
  background: rgba(239, 45, 2, 0.8);
  /* border-radius: 50%; */
  opacity: 0;
  transform: translateZ(90deg);
}
@keyframes warn {
  0% {
    -moz-transform: scale(0);
    transform: scale(0);
    opacity: 1;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;/*-webkit-transform: scaleZ(5) rotateX(90deg);*/
    /*-moz-transform: scaleZ(5) rotateX(90deg);*/
    /*-ms-transform: scaleZ(5) rotateX(90deg);*/
    /*-o-transform: scaleZ(5) rotateX(90deg);*/
    /*transform: scaleZ(5) rotateX(90deg);*/
  }
  100% {
    -moz-transform: scale(1);
    transform: scale(1);
    opacity: 0;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;/*-webkit-transform: scaleZ(5) rotateX(90deg);*/
    /*-moz-transform: scaleZ(5) rotateX(90deg);*/
    /*-ms-transform: scaleZ(5) rotateX(90deg);*/
    /*-o-transform: scaleZ(5) rotateX(90deg);*/
    /*transform: scaleZ(5) rotateX(90deg);*/
    /*-webkit-transform: scaleZ(5) rotateX(45deg);*/
    /*-moz-transform: scaleZ(5) rotateX(45deg);*/
    /*-ms-transform: scaleZ(5) rotateX(45deg);*/
    /*-o-transform: scaleZ(5) rotateX(45deg);*/
    /*transform: scaleZ(5) rotateX(45deg);*/
  }
}
@keyframes warn1 {
  0% {
    -o-transform: scale(0);
    transform: scale(0);
    opacity: 1;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
  }
  100% {
    -o-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 0;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
  }
}

</style>