<template>
  <div>
    <p>解决遮罩层覆盖问题   :append-to-body="true"</p>
    <el-button size="small" @click="dialogFormVisible = true">弹出层</el-button>
    <div class="waiceng">
      <el-dialog title="收货地址"  :append-to-body="true" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    </div>
    <br>

  </div>
</template>
<script>
export default {
  data() {
    return {
      form:{},
      dialogFormVisible:false,
      formLabelWidth:'200px'
    }
  }
}
</script>
<style>
.waiceng{border: 1px solid red}

</style>
