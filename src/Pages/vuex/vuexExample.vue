<template>
    <div>
      <h2>vuex的作用</h2>
        <p>（1）不同组件的数据共享，不同页面之间的数据传值</p>
        <p>（2）数据持久化</p>
        <p>（3）小项目我们用Localstrage或者SessionStorge解决 大项目用vuex</p>
        <p>（4）将值存到vuex中，页面多次跳转之后，页面不会多次发起ajax请求</p>
        <div>计数器 <el-button @click="minus">-</el-button></div>
        <div>
            当前：{{count}}
        <br> 
        </div>
        <div>计数器 <el-button @click="addCounts">+</el-button></div>
        {{msg}}
        <br>
        <br>
        <br>
        <ul>
          <li v-for="(item, index) in listData" :key="index">{{item.title}}</li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      msg: "1234"
    };
  },
  created() {
  },
  computed: {
    //count获取表格数据 和总条数
    //list 获取vuexExample2中的内容，
    ...mapState("example", ["count","listData"]),
  },
  methods: {
    ...mapMutations("example", ["addCounts","minus"])
  },
  mounted() {
      //页面执行加载执行一次
    this.addCounts();
  }
};
</script>

