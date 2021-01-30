<template>
  <div>
    <el-table :data="getTableList" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" border show-summary style="width: 100%">
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="amount1" sortable label="数值 1">
      </el-table-column>
      <el-table-column prop="amount2" sortable label="数值 2">
      </el-table-column>
      <el-table-column prop="amount3" sortable label="数值 3">
      </el-table-column>
    </el-table>
    <el-pagination 
    :page-size="pageSize"
     :current-page="currentPage"
      prev-text="上一页" next-text="下一页" 
      layout="total, prev, pager, next"
       @current-change="handleCurrentChange"
       :total="getCount">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";  //获取vuex的方法
export default {
  data() {
    return {
      currentPage: 1, //当前是第几页
      pageSize: 3,//总共多少页
      // getCount 显示有多少条数据
    }
  },

  computed: {
    ...mapGetters("vuexTestIndex", ["getTableList","getCount"]), //获取表格数据 和总条数
  },
  methods: {
    ...mapActions("vuexTestIndex", ["getTableData"]), //请求数据的方法
    // 跳转到多少页
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.currentPage = 1;
    //   this.getTableData({ carentPage: this.currentPage, pageSize: val });
    // },
    // 点击页码按钮
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData({ carentPage: this.currentPage, pageSize: val });
    },
    //初始化序号列
    indexFun(index) {
      return index + 1 + this.pageSize * (this.currentPage - 1);
    },
    // 鼠标进入
    handleMouseEnter: function (row, column, cell, event) {
      cell.children[0].style.color = "red";
    },
    // 鼠标离开
    handleMouseOut: function (row, column, cell, event) {
      cell.children[0].style.color = "black";
    }
  },
  mounted() {
    //事件发起请求
    this.getTableData({
      carentPage: this.currentPage,
      pageSize: this.pageSize
    });
    this.$nextTick().then(function () {
    })
  }
}
</script>