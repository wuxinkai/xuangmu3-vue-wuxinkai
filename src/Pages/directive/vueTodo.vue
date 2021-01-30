 <template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>键盘事件 点击回车增加内容</span>
        <input type="text" v-model="val" @keyup="add">
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div>
        <ul>
          <li class="arritem" v-for="(a,index) in arr3" :key="index">
            {{a}}
            <button @click="remove(index)">删除</button>
          </li>
        </ul>
      </div>
    </el-card>
    <br>
    <el-card class="box-card">
      <div class="container">
        <table class="table table-bordered">
          <caption class="h2 text-center text-danger">购物车</caption>
          <tr>
            <td>全选<input type="checkbox" v-model="checkAll" @change="changeAll"></td>
            <td>商品</td>
            <td>单价</td>
            <td>数量</td>
            <td>小计</td>
            <td>操作</td>
          </tr>
          <tr v-for="(product, index) in  products" :key="index">
            <td><input type="checkbox" v-model="product.isSelected" @change="checkone"></td>
            <td>
              <img :src="product.productCover" :title="product.productName" alt=""> {{product.productInfo}}
            </td>
            <td>{{product.productPrice}}</td>
            <td> <input type="number" v-model="product.productCount" min="1"></td>
            <td> {{product.productPrice*product.productCount | toFixed(2)}}</td>
            <td>
              <button class="btn btn-danger" @click="productRemove(product)">删除</button>
            </td>
          </tr>
          <tr>
            <!--colspan:合并单元格-->
            <td colspan="6">总价格：{{sum() | toFixed(2)}}</td>
          </tr>
        </table>
      </div>
    </el-card>
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css';
export default {
  data() {
    return {
      val: '',
      products: [],
      arr3: [], //存储
      checkAll: true
    }
  },
  filters: {
    toFixed(num, n) {
      return "¥" + num.toFixed(n)
    }
  },
  created() {
    this.getData();// 发送请求；
  },
  methods: {
    // 案例1 内容添加到列表
    add(e) {
      if (e.keyCode == 13) {
        if (this.val == '') {
          alert('空内容不能添加')
        } else {
          this.arr3.unshift(this.val)
          this.val = ''
        }

      }
    },
    // 案例1 删除input框的内容
    remove(i) {
      this.arr3 = this.arr3.filter((item, index) => index !== i)
    },
    //案列2 获取数据
    getData() {
      this.http.get('https://www.easy-mock.com/mock/5bbab3f329a4d80bbccbcb81/example/carts').then((data) => {
        if (data.status == 200) {
          this.products = data.data.data
        }
      }).catch(function (err) {
        console.log('获取内容失败')
      })
    },
    //案例2 全部勾选
    changeAll() {
      //如果全选 true 就让所有的子复选框 变成true
      this.products.forEach((item, index) => {
        item.isSelected = this.checkAll
      })
    },
    //案例2 子复选框全选后父复选框，要为true
    checkone() {
      // every 方法用于检测数组所有元素是否都符合指定条件
      this.checkAll = this.products.every(item => item.isSelected)
    },
    //案例2 计算商品总价
    sum() {
      return this.products.reduce((prev, next) => { // 求和
        if (!next.isSelected) { return prev } //如果当前的商品是false，不需要进行求和计算；但是需要把以前进行求和结果传给下一次的计算求和；
        return prev + next.productPrice * next.productCount
      }, 0)
    },
    //删除内容
    productRemove(val) {
      this.products = this.products.filter(item => val !== item)
    }
  }
}
</script>
<style>
.arritem {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  list-style: nonemd;
}
</style>
