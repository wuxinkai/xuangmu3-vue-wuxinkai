<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="red">{{mag}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="item in items" :key="item.title" class="text item">
        {{item.title}}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mag: '',
      items: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    //请求本地数据
    getData() {
      this.http.get('../../../static/json/data.json').then(response => {
        console.log(response.data);
        debugger
      }, response => {
        console.log("error");
      });
    }
  },
  created() {
    //（1）去localStorage 获取内容
    var localMenus = localStorage.getItem("localMenus")
    // （2）判断是否获取到内容
    if (localMenus) { //获取到就用localMenus的内容
      this.mag = '走了缓存'
      // this.items = eval("(" + localMenus + ")");
      this.items = JSON.parse(localMenus)
    } else { //获取不到就 走请求
      this.http.get('https://www.easy-mock.com/mock/5bbab3f329a4d80bbccbcb81/example/localStorage').then((data) => {
        if (data.status == 200) {
          //（3）将请求的的内容存储到localStorage里面
          this.items = data.data.data
          localStorage.setItem("localMenus", JSON.stringify(this.items))
          this.mag = '没有走缓存'
        }
      }).catch(function (err) {
        console.log('获取菜单失败' + err.message)
      })
    }
  }
}
</script>

<style scoped>
.bar {
  width: 100%;
  height: 200px;
  background: #ccc;
  margin-top: 50px;
}
.red {
  font-size: 30px;
  font-weight: bold;
  color: red;
}
.text {
  font-size: 14px;
}

.item {
  padding-bottom: 18px;
}
</style>
