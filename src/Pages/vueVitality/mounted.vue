 <template>
  <div>
    <h1>页面刷新就执行这个事件，dom还没有加载</h1>
    <p>{{a}}</p>
    <p>this.$data 这是vm上的数据</p>
    <p>this.$watch 监控</p>
    <p>this.$el 当前el元素</p>
    <p>this.$set 后加的属性实现响应式</p>
    <p>this.$options 获取vm的所有属性</p>
    <p>this.$nextTick(()=>{})等待dom渲染完成后获取vm</p>
    <p>this.$root.bus 获取实例</p>
    <p>this.$root.bus.$emit('') 实例上增加方法 </p>
    <p ref="myp">{{msg}}</p>
    <br>
    错误的结果{{number}}
    <br>
    正确的结果{{number1}}
    <div ref="myDiv">
        <p class="left" v-for="a in arr" :key="a" ref="mysss">{{a}}</p>
    </div>
    <br>
  </div>
</template>
<script>

export default {
  wuxinkai:'用$options实现自定义属性',
  data() {
    return {
      a: "通过getElementsByTagName获取",
      msg: "$refs 获取内容, 一个值",
      arr:[1,2,3,],
      number:'',
      number1:''
    };
  },
  mounted() {
      //获取内容
      console.log(document.getElementsByTagName('p')[0].innerHTML)
      //$refs 获取内容
      console.log(this.$refs.myp)


      //利用for 循环 获取元素个数
      this.arr = [1,2,3,4,5]  // 数组从新赋值变成老5个 
      console.log(this.$refs.mysss)
      console.log(this.$refs.myDiv)
      this.number = this.$refs.myDiv.children.length
      console.log(this.$refs.myDiv.children.length) //结果是3，这不是我们的结果 dom渲染是异步的  
      //异步方法：等待dom渲染完成后获取vm，这样改变就实现了 5 个
      this.$nextTick(()=>{
          this.number1 = this.$refs.myDiv.children.length
          console.log(this.$refs.myDiv.children.length) //结果是五个
      })
  }
};
</script>

<style>
.red {
  color: red;
}
.left{float: left;margin-left: 10px;}
</style>
