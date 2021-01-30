 <template>
  <div>
    <h1>数据类</h1>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>data:实例的数据对象</span>
      </div>
      <div>
        <p>给data添加新属性:　this.$set(this.student,"name", '黄晓明') 2.0的正确写法
          <a class="red">{{student.name}} {{student.age}}岁</a>
        </p>

      </div>
    </el-card>
    <br>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>components:实例配置局部注册组件</span>
      </div>
      <div>
        <p>data:</p>
      </div>
    </el-card>
    <br>
    <h1>方法类</h1>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>methods:Vue实例方法</span>
      </div>
      <div>
        <p>data:</p>
      </div>
    </el-card>
    <br>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>computed:计算属性</span>
        <p>{{newPrice}}</p>
      </div>
      <div>
        <p>data:</p>
      </div>
    </el-card>
    <br>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>watch:侦听属性</span>
      </div>
      <div>
        <p>data:</p>
      </div>
    </el-card>
    <br>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>filters:过滤器</span>
      </div>
      <div>
        <p>data:</p>
      </div>
    </el-card>
    <br>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>render:渲染函数，创建虚拟DOM</span>
      </div>
      <div>
        <p>data:</p>
      </div>
    </el-card>
    <br>
    <h1>生命周期</h1>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>created:在实例创建完成后被立即调用，完成初始化操作</span>
      </div>
      <div>
        <p>data:</p>
      </div>
    </el-card>
    <br>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>mounted:el挂载到Vue实例上了，开始业务逻辑操作</span>
      </div>
      <div>
        <p>data:</p>
      </div>
    </el-card>
    <br>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>beforeDestroy:实例销毁之前调用</span>
      </div>
      <div>
        <p>data:</p>
      </div>
    </el-card>
    <h1>Vue组件</h1>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>props:用于接收来自父组件的数据</span>
      </div>
      <div>
        <p>props , data 重复名称会出现错误:</p>
        <p>在props 中传入多个数据时，如果在父组件的模板类添加其他元素或者字符会给：每个元素都会添加</p>
      </div>
    </el-card>
    <br>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>template:组件模板</span>
      </div>
      <div>
        <p>data:</p>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      student: {
        name: '',
        sex: '',
      },
      price1: 20,
      price2: 30,
    }
  },
  //el挂载到Vue实例上了，开始业务逻辑操作
  mounted() {
    //新增属性
    this.$set(this.student, "name", '黄晓明')
    this.$set(this.student, "age", 33)
  },
  computed: {
    newPrice() {
      return this.price = '¥' + (this.price1 + this.price2) + '元'
    }
  }
}
</script>
<style>
.red {
  color: red;
}
</style>
