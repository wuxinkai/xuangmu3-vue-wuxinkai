<template>
  <div>
    <el-button
      class="el-button--fxMain"
      @click="dialogVisible = true"
      type="primary"
    >响应式按钮</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import './style/common.scss'
import './style/mixin.scss'
import './style/variables.scss'
import ellipsis from '@/utils/ellipsis'
export default {

  data() {
    return {
     dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
</style>

