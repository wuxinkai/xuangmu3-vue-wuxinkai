<template>
  <div>
    <div style="width:500px;margin: 100px auto">
      <el-button @click.stop="hadleSearch()" icon="el-icon-search" circle></el-button>
      <div v-show="shopDetail" @click.stop="hadleSearch()">
        <el-input v-model="input" placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shopDetail: false,
      input: ''
    }
  },
  created() {
    let _this = this
    document.body.onclick = function (e) {
      _this.shopDetail = false
    };
  },
  mounted() {
    // let list = ["aaaassss", "bbbbffff", "cccciiii","cc2","c3", "ddddVVvv"]
    let list = [{
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

    let str = "23"
    
    let filterList = list.filter(item => {
      let keys = Object.keys(item);
      let index = 0;
      for (let i = 0; i < keys.length; i++) {
        if (index <= 0) {
          item[keys[i]].indexOf(str) != -1 ? index += 1 : index = 0;
        }
      }
      if (index > 0) { return item }
    })
    console.log(filterList)

  },
  methods: {
    hadleSearch() {
      this.shopDetail = true
    }
  }
};
</script>
<style scoped>
#shopDetail {
  display: none;
}

.radius-btn-search .iconfont {
  font-size: 22px;
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  background: red;
}

.radius-btn-search-in ::-webkit-input-placeholder {
  opacity: 0.8;
  color: #fff;
}

.radius-btn-search-in ::-moz-placeholder {
  opacity: 0.8;
  color: #fff;
}

.radius-btn-search-in :-ms-input-placeholder {
  opacity: 0.8;
  color: #fff;
}

.radius-btn-search-in :-moz-placeholder {
  opacity: 0.8;
  color: #fff;
}

.radius-btn-search-in .inner-search-input {
  display: inline-block;
  width: 180px;
  padding-right: 50px;
}
</style>

