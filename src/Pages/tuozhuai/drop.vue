<template>
  <div class="contentIn" @mousemove="mousemove" @mouseup="cardMouseUp">
    <div class="box1" :style="{height:!bottomCard.show?'100%':'calc(100% - '+(mouseObj.cardDefault.height+mouseObj.moveValue)+'px)'}">
      <el-button type="success" @click="btnOnOff">切换按钮</el-button>
    </div>
    <div class="box2" @mousedown="cardMouseDown" v-show="bottomCard.show"></div>
    <div class="box3" v-show="bottomCard.show" :style="{height: (mouseObj.cardDefault.height+mouseObj.moveValue)+'px'}">
      <template>
        <el-table :data="tableData" style="width: 100%" :height="mouseObj.cardDefault.height-30">
          <el-table-column prop="date" label="日期">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //表格数据
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      //空时底部的显示隐藏
      bottomCard: { show: false },
      //设置高度
      mouseObj: {
        cardDefault: {
          height: 300,
          default: 300,
          windowHeight: document.documentElement.clientHeight
        },
        moveValue: 0
      },
    }
  },
  methods: {
    //按钮切换是否关闭底部 table
    btnOnOff() {
      this.bottomCard.show = !this.bottomCard.show
    },
    //点击拖拽事件
    cardMouseDown(event) {
      this.mouseObj.startDrag = true;
      this.mouseObj.startEvent = event;
    },
    //拖动   
    mousemove(event) {
      if (this.mouseObj.startDrag) {
        this.mouseObj.moveValue = this.mouseObj.startEvent.clientY - event.clientY;
        //判断向下滑动最多只能到，底部不能再往下滑动 ,活动高度和默认高度
        if ((this.mouseObj.cardDefault.height + this.mouseObj.moveValue) < this.mouseObj.cardDefault.default) {
          this.mouseObj.moveValue = 0;
          this.mouseObj.cardDefault.height = this.mouseObj.cardDefault.default;
        }
      }

    },
    //拖拽结束
    cardMouseUp(event) {
      if (this.mouseObj.startDrag) {
        this.mouseObj.moveValue = this.mouseObj.startEvent.clientY - event.clientY;
        if ((this.mouseObj.cardDefault.height + this.mouseObj.moveValue) < this.mouseObj.cardDefault.default) {
          this.mouseObj.moveValue = 0;
          this.mouseObj.cardDefault.height = this.mouseObj.cardDefault.default;
        }
        this.mouseObj.cardDefault.height = this.mouseObj.cardDefault.height + this.mouseObj.moveValue;
        this.mouseObj.moveValue = 0;
        this.mouseObj.startDrag = false;
        this.mouseObj.startEvent = null;
      }
    }
  }
}
</script>
<style>
.contentIn {
  height: 100%;
}
.box1 {
  height: 100%;
  background: #fff;
  position: relative;
}
.box2 {
  height: 3px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 8px;
}
.box2:hover {
  cursor: n-resize;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.box3 {
  background: #fff;
}
</style>

