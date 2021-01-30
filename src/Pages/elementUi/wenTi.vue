<template>
  <div>
    <p>
      （1）表格不能全部显示，怎么解决 body .el-table th.gutter { display: table-cell !important; } .el-table__header { width: 100% !important; } .el-table__body { width: 100% !important; }
    </p>
    <br>
    <br>
    <br>
    <p>
      (2)设置外层盒子的宽度，14px的时候 的状态
    </p>
    <div>
      <div :style="styleObject" class="textWidth">ABCDEFGHIGW</div>
      <br>
      <div :style="styleObject2" class="textWidth2">这是一个文字</div>
    </div>
    <br>
    <p>
      （3）轮播图切换
    </p>
    <div>
      <span class="el-icon-delete" v-if="entity.length>1" style="color:red;margin-right:30px;" @click="deleteEach">删除</span>
      <span class="el-icon-circle-plus-outline" @click="addCaus" style="color:blue">新增内容</span>
    </div>
    <div class="box">
      <el-carousel indicator-position="outside" trigger="click" :autoplay="false" @change="getIndex">
        <el-carousel-item v-for="(it, index) in entity" :key="it.index">
          <h3>{{ it.name }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <br>
    <br>
    <br>
    <h2>在没有数据的情况下elLoading页面加载</h2>
    <div>
        <el-button type="success" @click="upload">elLoading页面加载</el-button>
    </div>
  </div>
</template>
<script>
import { elLoading } from '@/utils/loading'
export default {
  data() {
    return {
      a: 1,
      //通过文字长度获取宽度
      styleObject: {
        width: null,
        background: 'pink',
        display: 'inline - block',
        fontSize: '14px',
        border: '1px solid red'
      },
      styleObject2: {
        width: null,
        background: 'pink',
        display: 'inline - block',
        fontSize: '14px',
        border: '1px solid red'
      },
      //轮播图手动
      indexNum: 1,
      entity: [
        { name: 1 },
      ]
    }
  },
  mounted() {

    //获取长度
    let textLength = document.querySelector('.textWidth').innerHTML.toString();
    let textLength2 = document.querySelector('.textWidth2').innerHTML.toString();
    //赋值
    this.styleObject.width = this.getTextWidth(textLength) + 'px'
    this.styleObject2.width = this.getTextWidth(textLength2) + 'px'
  },
  methods: {
    getTextWidth(text) {
      let i = text.length
      let width = 0
      while (i) {
        let char = text.charAt(i - 1)
        if (char.charCodeAt() > 126) {
          width += 14
        } else {
          width += 10
        }
        i--
      }
      return width
    },
    //获取某一个对象的索引
    getIndex(index) {
      this.selectIndex = index
    },
    //把当前项删除删除
    deleteEach(index) {
      this.entity.splice(this.selectIndex, 1)
    },
    //增加跑马灯
    addCaus() {
      this.indexNum++;
      let entity = {
        index: this.indexNum,
        name: `新增的额${this.indexNum}`
      }
      this.entity.push(entity)
    },

    //页面加载
    upload(){
       elLoading.show('拼命上传中','loadingClass','el-icon-loading','rgba(255, 255, 255, 0.7)')
      //  elLoading.show('拼命上传中')
      setTimeout(() => {
         elLoading.close();
      }, 3000);
     
    }
  }
}
</script>
<style>
.box {
  width: 300px;
  background: #f0a6da;
  border: 1px solid #ccc;
}
.box {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  /* line-height: 200px; */
  margin: 0;
}
.el-carousel__container {
  height: 120px;
}
h3 {
  line-height: 120px;
  text-align: center;
  font-size: 30px;
}
.el-carousel__indicators--outside button {
  width: 13px;
  height: 13px;
  border-radius: 100%;
  background: red;
}
.loadingClass .el-icon-picture {
 font-size: 30px;
}
.loadingClass .el-loading-text{
  font-size: 30px;
  color: blue
}
</style>

