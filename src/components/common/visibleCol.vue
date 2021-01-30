<template>
  <div class="mobile">
    <el-dialog title="" :visible.sync="showModel.show" @close="cancle" :modal-append-to-body='false' custom-class="model_box" width='377px'>
      <div class="table-box">
        <h3 class="title">自定义可见列</h3>
        <div>
          <el-checkbox-group ref="colsCheck" v-model="checkList" class="table-label">
            <el-checkbox v-for="item in this.datas" :checked="item.isChecked" :label="item.property" :key="item.property">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="text-center">
          <el-button class="btn-big" @click="cancle">取消</el-button>
          <el-button class="btn-big el-button--blue" @click="closeDialog">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['Content', 'showModel'],
  data() {
    return {
      checkList: [],
      datas: this.Content
    }
  },
  methods: {
    closeDialog: function () {
      //对列表的定制可见列赋值
      this.Content.forEach(item => {
        //拿当前的和修改的做对比
        if (this.checkList.indexOf(item.property) >= 0) { //判断里面是否有数据如果有就是，改成true，没有就是false
          item.isChecked = true //增加自定义属性
        } else {
          item.isChecked = false
        }
      })
      //返回给父组件 finishCustom 事件，
      this.$emit('setCustomCols', this.Content);
    },
    cancle: function () {
      //取消 则恢复定制可见列的选项
      this.Content.forEach(item => {
        if (item.isChecked == false) {
          let index = this.checkList.indexOf(item.property)
          if (index >= 0) {
            this.checkList.splice(index, 1)
          }
        } else {
          let index = this.checkList.indexOf(item.property)
          if (index < 0) {
            this.checkList.push(item.property)
          }
        }
      })
      this.showModel.show = false
    }
  },
};
</script>
<style scoped>
.text-center {
  text-align: center;
  padding: 20px 0;
}
.title {
  padding: 5px;
  font-size: 16px;
}
.iphone-box {
  height: 454px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
}
.table-box .title {
  text-align: center;
  height: 42px;
  font-size: 30px;
  font-weight: 500;
  color: rgba(29, 46, 89, 1);
  line-height: 42px;
}
.table-label label {
  display: block;
  margin: 12px 0 0 80px;
}
</style>