<template>
  <div>
    <h1>模糊搜索：通过搜索数组 查询列表里有多少能匹配上的</h1>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input v-model="input" placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search" @click="getUserFn"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <ul class="infinite-list"  style="overflow:auto">
          <li v-for="item in list" class="infinite-list-item">{{ item.a }} -- {{ item.b }}-- {{ item.c }}</li>
        </ul>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <h2>显示结果</h2>
        <ul class="infinite-list" style="overflow:auto">
          <li v-for="item in count" class="infinite-list-item">{{ item.a }} -- {{ item.b }}-- {{ item.c }}</li>
        </ul>
      </el-col>

    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: [],
      shopDetail: false,
      input: '',
      list: [{
        a: "153",
        b: "234",
        c: "135",
      }, {
        a: "356",
        b: "675",
        c: "78",
      }, {
        a: "356",
        b: "275",
        c: "78",
      }]
    }
  },
  created() {
    let _this = this
    document.body.onclick = function (e) {
      _this.shopDetail = false
    };
  },
  mounted() {
  

  },
  methods: {
    getUserFn() {
      if (this.input == "") {
        this.$message({
          message: h('p', null, [
            h('span', null, '搜索不能为空 '),
          ])
        });
        return
      }
      let filterList = this.list.filter(item => {
        let keys = Object.keys(item);
        let index = 0;
        for (let i = 0; i < keys.length; i++) {
          if (index <= 0) {
           
            item[keys[i]].indexOf(this.input) != -1 ? index += 1 : index = 0;
          }
        }
        if (index > 0) { return item }
      })
      this.count = filterList
      console.log(filterList)

    }
  }
};
</script>
<style scoped>
</style>

