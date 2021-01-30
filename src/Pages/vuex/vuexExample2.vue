<template>
  <div>
    <h2>vuexExample从vuex里获取的值，实现数据共享</h2>
    <p style="font-size:30px;color:red">第{{count}}个</p>
    <br>
    <br>
    <br>
    <h1>查看Network里面就会请求一次数据</h1>
    <ul>
      <li v-for="(item, index) in items" :key="index">{{item.title}}</li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      msg: "1234",
      items: []
    };
  },
  created() {

    let list = this.$store.state.example.listData
    if (list.length > 0) {
      this.items = list
    } else {
      //存到vuex里实现资源共享，防止页面重复调用
      this.http.get('https://www.easy-mock.com/mock/5bbab3f329a4d80bbccbcb81/example/menuData').then((data) => {
        if (data.status == 200) {
          this.items = data.data.data;
          //将值传到vuex里的listdata中，保存起来
          //example在src\store\index.js里注册,addList是src\store\example\vuexExample.js里的方法，this.items是参数
          this.$store.commit("example/addList", this.items);
        }
      }).catch(function (err) {
        console.log('获取菜单失败' + err.message)
      })
    }
  },
  computed: {
    //example在src\store\index.js
    ...mapState("example", ["count"]), //获取表格数据 和总条数
  },

};
</script>

