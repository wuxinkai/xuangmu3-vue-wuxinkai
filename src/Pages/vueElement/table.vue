<template>
  <div>
    <div>
      <el-button type="info" @click="customColumn">定制可见列</el-button>
      <el-button type="info" @click="delAllSelection">批量删除</el-button>
      <el-table :data="getTableListData" style="width: 100%" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
        <!-- 多选 -->
        <el-table-column type="selection" width="55">
        </el-table-column>
         <el-table-column prop="id"  width="80" label="id">
        </el-table-column>
        <el-table-column prop="date" label="日期">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="WORK_TITLE" label="办事标题">
          <template slot-scope="scope">
            <span class="link-type">{{scope.row.WORK_TITLE}}</span>
          </template>
        </el-table-column>
        <!-- 定制可见列 -->
        <el-table-column prop="CREATE_USERnow" v-if="customObjColumns.CREATE_USERnow" label="发布人">
        </el-table-column>
        <el-table-column prop="USER_TYPEnow" v-if="customObjColumns.USER_TYPEnow" label="发布人类型">
        </el-table-column>
        <el-table-column prop="CREATE_TIMEnow" v-if="customObjColumns.CREATE_TIMEnow" label="发布时间">
        </el-table-column>
      </el-table>

    </div>
    <visible-col ref='prop' @setCustomCols="finishCustom" :Content='customArrColumns' :showModel="visibleColShow"></visible-col>
  </div>
</template>

  <script>
import { mapGetters, mapActions } from "vuex";
import visibleCol from '&/common/visibleCol'
export default {
  data() {
    return {
      getTableListData:[],
      multipleSelection: [], //选中内容
      delList: [],//被删除的内容
      visibleColShow: { show: false }, //定制可见列的显示和隐藏
      customArrColumns: [ //定制可见列的数组
        { property: 'CREATE_USERnow', label: '发布人' },
        { property: 'USER_TYPEnow', label: '发布人类型' },
        { property: 'CREATE_TIMEnow', label: '发布时间' }
      ],
      customObjColumns: {  //定制可见列的显示隐藏对象
        CREATE_USERnow: false,
        USER_TYPEnow: true,
        CREATE_TIMEnow: false
      },
    }
  },
  methods: {
    //页面请求数据
    ...mapActions("tableVisible", ["getData"]), //（五）

    //弹出定制可见列
    customColumn() {
      let _this = this
      if (_this.customArrColumns.length > 0) {
        //判断哪些默认被勾选，如果有勾选的把值传给模态框
        for (var i = 0; i < _this.customArrColumns.length; i++) {
          const element = _this.customArrColumns[i];
          element.isChecked = _this.customObjColumns[element['property']];
          this.$set(_this.customArrColumns, i, element) //给data对象新增属性，并触发视图更新
        }
      } else { //自动生成自定义可见列的项，目前未生效
        // this.$refs.tables.columns.forEach(item => {
        //   if (item.type.toUpperCase() == 'FILTER') {
        //     item.isChecked = root.customObjColumns[item['property']]
        //     root.customArrColumns.push(item)
        //   }
        // })
      }
      this.visibleColShow.show = true
    },
    //定制可见列关闭生效
    finishCustom(arr) {
      let _this = this;
      for (var i = 0; i < arr.length; i++) {
        const item = arr[i]; //获取数组中的每一个对象
        _this.customObjColumns[arr[i]['property']] = item.isChecked
      }
      this.visibleColShow.show = false; //关闭
    },
    //选中的表格内容
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      let _this = this
      const length = _this.multipleSelection.length;
      if (length == 0) return _this.$message.error(`请选择删除内容`);
      let str = '';
      //报错被删除的内容
      console.log( _this.getTableListData)
      _this.delList = _this.delList.concat(_this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' ';
        _this.getTableListData.splice(_this.getTableListData.findIndex(v => v.id === _this.multipleSelection[i].id), 1);
      }
      _this.$message.error(`删除了${str}`);
      _this.multipleSelection = []; //清空选中内容，
    },
  },
  mounted() {
    // 直接操作dom报错  做这个拷贝  在进行操作  数组拷贝

    this.getTableListData = this.getTableList.slice()
    this.getData() //异步请求第一步
  },
  computed: {
    ...mapGetters("tableVisible", ["getTableList"]),
    ...mapActions("tableVisible", ["getAsynData"]),
  },
  components: {
    visibleCol
  },
}
</script>