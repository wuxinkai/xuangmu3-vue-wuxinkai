<template>
  <div>
    <p>（1）computed 默认调用 get方法，必须的有return，</p>
    <p>（2）不支持异步逻辑 ，假设注册用户，进行用户校验，需要向后台请求，就变成异步的了。需要watch实现</p>
    <p>（3）computed 支持缓存，只有依赖数据发生改变，才会重新进行计算</p>
    <p>（4） computed 中的属性同样不能和data中重名，也不能和methods中的属性重名</p>
    <p>（5） 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一；一般用computed</p>
    <br>
    <p>常用语表单，校验</p>
    （1）全选 <input type="checkbox" v-model="chekAll">
    <div>
      <input class="checkboxs" type="checkbox" v-for="(product,index) in products" :key="index" v-model="product.isSelected">
    </div>
    <br>
    <p>（2）错误的写法</p>
    <input type="text" v-model="a">
    <div>{{msg}}</div>
    <br>
    <p>（3）常用方法</p>
    <input type="text" v-model="b">
    <div>{{contend}}</div>
    <br>
    <p>（4）计算属性缓存 vs 方法:方法不会自动推送给页面响应 ,计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时它们才会重新求值</p>
    <!-- <div class="t5">{{now}}</div> -->
    <div class="t5">{{nowData}}</div>
    <br>
    <h1>倒序排列</h1>
    <ul class="list-group">
        <li class="list-group-item" v-for="(item,index) in reversNews" :key="index">{{item.title}}{{item.date}}</li>
    </ul>
    <br>
    <div><h1>增加修饰符：{{newPrice}}</h1></div>
    <br>
  </div>
</template>
<script>
// Vue.directive('wuxinkai',function(el,binding,vnode){
//         el.style='color:'+binding.value;
// });
export default {
  data() {
    return {
      products: [{ isSelected: true }, { isSelected: true }],
      msg: '',
      color:'red',
      b: '', //先声明
      nowData: '', //在不改变原始数据的情况下改变数据
       price:100 ,//原始数据
      newsList: [
        { title: '1 倒序排列', date: '2017/3/10' },
        { title: '2 倒序排列', date: '2017/3/12' },
        { title: '3 倒序排列', date: '2017/3/13' },
        { title: '4 倒序排列', date: '2017/3/23' },
      ]
    };
  },
  computed: {
    chekAll: { //只要有一个是false，chekAll的值就会变成false
      get() {
        //返回什么就赋予checkAll属性
        return this.products.every(item => item.isSelected);
      },
      set(val) { //val 是给chekAll 赋予值的时候传递过来的
        this.products.forEach(item => item.isSelected = val)
      }
    },
    a: {
      get() {
        return ''  //this.msg 
      },
      set(val) { //如果谢老 set方法再给 a赋值，并且val 给力别人， a就不会被赋值
        this.msg = val;
      }
    },
    contend() { //监听的是数据
      if (this.b.length < 3) {
        return '小于3'
      }
      if (this.b.length > 6) {
        return '大于6'
      }
      return '正好'
    },
    // now: function () {
    //   return Date.now()
    // }
    reversNews(){
      return this.newsList.reverse() //倒序排列
    },
    newPrice(){
      return `￥`+this.price+`元钱`
    }
  },
};
</script >
<style scoped>
.checkboxs {
  margin-left: 6px;
}
.t5 {
  margin-top: 5px;
}
</style>