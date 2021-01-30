<template>
  <div>
    <el-table :data="listData" style="width: 100%" fit>
      <el-table-column v-for="(item, index) in listLabel" :key="index" :prop="item.prop" :label="item.label">
      </el-table-column>
    </el-table>
    <el-button @click="exportExcel">导出数据excel</el-button>
    <el-button @click="onUpdateExcel">导入数据excel</el-button>
    <el-button @click="exportExcel2">导出Excel加数据</el-button>
    <updateExcel ref="updateExcel" @readExcel="onReadExcel"></updateExcel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";  //获取vuex的方法

import updateExcel from "./components/updateExcel";

export default {
  components: {
    updateExcel
  },
  data() {
    return {
      currentPage: 1, //当前是第几页
      pageSize: 3,//总共多少页
      // getCount 显示有多少条数据
      listData: [
        {
          carEntrustId: "122334",
          name: "122334",
          carRewardId: "122334",
          carFundProvider: "122334",
          carFrameNo: "122334",
          carNo: "122334",
          assetsType: "122334",
          acreage: "122334",
          incomePrice: "122334",
          rewardStatus: "122334",
          addTime: "122334",
          addManagerName: "122334",
        }
      ],
      listLabel: [
        { label: '车牌号', prop: 'carEntrustId' },
        { label: '名称', prop: 'name' },
        { label: '值', width: '', prop: 'carRewardId' },
        { label: '价格', prop: 'carFundProvider' },
        { label: '利润', prop: 'carFrameNo' },
        { label: '大类', prop: 'carNo' },
        { label: '固定资产编号', prop: 'acreage' },
        { label: '到货日期', prop: 'assetsType' },
        { label: '极好价格', prop: 'incomePrice' },
        { label: '调入日期', prop: 'rewardStatus' },
        { label: '出厂编号', prop: 'addTime' },
        { label: '出厂日期', prop: 'addManagerName' },
      ],
      //Excel
      excelCol: [], //Excel表头
      excelData: [],// Eccel数据
      newExcelListData: [],//编译后的 Excel编译后的 转成 listData数据格式
    }
  },

  computed: {
    ...mapGetters("vuexTestIndex", ["getTableList", "getCount"]), //获取表格数据 和总条数
    //获取分页属性
    getTableList() {
      let _data = []

    }
  },
  methods: {
    ...mapActions("vuexTestIndex", ["getTableData"]), //请求数据的方法
    //要导出的数据
    exportExcel2() {
      this.$refs.updateExcel.exportData()
    },
    //按照列名下载模板
    exportExcel() {
      let item = ['出厂日期', '出厂编号', '调入日期', '到货日期', '固定资产编号']
      //列的名字 
      this.$refs.updateExcel.downLoad(item, "资产导入模板");
    },
    //导入Excel
    onUpdateExcel() {
      this.$refs.updateExcel.select();
    },
    //获取导入数据
    async onReadExcel(excelBody, excelHeader) {
      this.excelCol = excelHeader;  //Excel表头
      this.excelData = excelBody; // Eccel数据
      this.newExcelListData = await this.setAttrExcel(excelBody) //编译后的新数据
      this.listData = [...this.listData, ...this.newExcelListData]
    },
    //编译后的新数据
    setAttrExcel(excelBody) {
      let curAry = []
      excelBody.map((excelItem, idx) => {
        let curRow = {}
        this.listLabel.map((tableItem, index) => {
          Object.keys(excelItem).map((attrName, i) => {
            if (tableItem.label == attrName) {
              Object.assign(curRow, {
                [tableItem.prop]: excelItem[attrName]
              });

            }
          })
        })
        curAry.push(curRow)
      })

      return curAry
    }
  },
  //监听数据
  watch() {

  },
  mounted() {
    //事件发起请求
    // this.getTableData({
    //   carentPage: this.currentPage,
    //   pageSize: this.pageSize
    // });
    // this.$nextTick().then(function () {
    // })
  }
}
</script>