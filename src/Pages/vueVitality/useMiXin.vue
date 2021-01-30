<template>
  <div>
    <h1>1 在你已经写好了构造器后，需要增加方法或者临时的活动时使用的方法，这时用混入会减少源代码的污染。</h1>
    <p>电商促销：临时需要</p>
    <h1>2 很多地方都会用到的公用方法，用混入的方法可以减少代码量，实现代码重用。</h1>
    <el-button @click="helloMixin">helloMixin调用minxin中的方法</el-button>
    <el-button @click="callMixin">callMixin调用minxin中的方法</el-button>
    <br>
    <br>
    <br>
    <br>
    <br>
    <el-button type="primary" @click="goBack">返回上一页查询是否有缓存</el-button>
    <ul>
      <li>{{testData.name}}</li>
      <li>{{testData.region}}</li>
      <li>{{testData.date1}}</li>
      <li>{{testData.date2}}</li>
      <li>{{testData.delivery}}</li>
      <li>{{testData.type[0]}}</li>
      <li>{{testData.resource}}</li>
      <li>{{testData.desc}}</li>
    </ul>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
export default {
  mixins: [mixin], //引入方式
  filters: {
    toUpper(str) {

    },
    add(num1, num2) {
      return num1 + num2
    }
  },
  data() {
    return {
      a: '1',
      testData: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created() {
    //实现页面数据刷新不丢失问题

  },
  beforeDestroy() {
    localStorage.removeItem('tempData')
  },
  mounted() {
    const tempData = localStorage.getItem('tempData')
    if (tempData) {
      this.testData = JSON.parse(tempData)
    } else {
      if (Object.keys(this.$route.params).length !== 0) {
        this.testData = this.$route.params.formData
        localStorage.setItem('tempData', JSON.stringify(this.$route.params.formData))
      }
    }
  },
  methods: {
    callMixin() {
      this.helloMixin()
    },
    goBack() {
      this.$router.push({ path: '/vueRoute/keepAlives' })
    }
  },
}
</script>
