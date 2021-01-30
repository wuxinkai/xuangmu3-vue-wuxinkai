 <template>
  <div>
    <p>
      <span class="red width">v-if</span>：操作dom v-else
      <span class="red">注意</span> ：v-if必须连着写，中间不能插入别的标签</p>
    <p>
      <span class="red width">v-show：</span>操作的是样式</p>
    <p>
      <span class="red width">template</span>标签是vue提供我们没有任何意义，主要是用来包裹元素
      <span class="red">注意</span>对v-show没有作用</p>
    <p>
      <span class="red width">key</span> 默认在切换dom相同的结构会被复用，如果不想被复用加key</p>
    <p>
      <span class="red width">v-bing</span>简写</p>
    <p>
      <span class="red width">:class</span> 对象或者数组两种绑定方式，</p>
    <p>
      <span class="red width"> v-pre </span> 页面显示花括号
      <span v-pre>{{msg}}</span>
    </p>
    <br>
    <div>
      <b style="color:red">v-once</b> :只绑定一次，当数据再次发生变化，也不会导致页面刷新</div>
    <div v-once>
      {{msg}} === {{msg}}
    </div>
    <div>
      <b style="color:red">v-html</b> : 把标签转译</div>
    <br>
    <div>
      <b style="color:red">v-text</b> : 防止{}出现颤抖</div>
    <br>
    <div>
      <b style="color:red">v-clock</b> : 页面刷新会出现{}闪烁，加v-clock就不会闪烁，第二步需要加个[v-cloak] { display: none }</div>
    <br>

    <h2 style="color:green">（2）响应式的数据变化 reactivity</h2>
    <p>使用变量先要
      <span style="color:blue">初始化</span> ，否则新加入的属性不会导致页面刷新，</p>
    <p>//此方法可以给对象 添加响应式数据变化 </p>
    <p>// bus.$set(bus.a,'123')</p>
    <p>
      <span class="red width">this.$set</span>修改对象(data)属性</p>
    <br>
    <div>取数组方法, 改变数组的某一项是监听不到的,改变数组的内置方法：pop push shift unshift sort reserve splice</div>

    <el-card class="box-card">
      <ul>
        <li v-for="(fruit,index) in fruits" :key="index">
          {{index+1}} {{fruit.name}}
          <ul style="margin-left:20px">
            <li v-for="(c,childIndex) in fruit.color" :key="childIndex">
              {{childIndex+1}} {{c}}
            </li>
          </ul>
        </li>
      </ul>
    </el-card>
    <br>
    <el-card class="box-card">
      <h2 style="color:green">(3)事件</h2>
      <button @click="btnClick($event,1)">@click点击事件</button>
    </el-card>
    <br>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>键盘事件 点击回车增加内容</span>
        <input type="text" v-model="val" @keyup="add">
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div>
        <ul>
          <li v-for="(a,index) in arr3" :key="index">
            {{a}}
            <button @click="remove(index)">删除</button>
          </li>
        </ul>
      </div>
    </el-card>

    <br>
    <br>
    <p>事件修饰符；</p>
    <p>.prevent : 阻止事件的默认行为；</p>
    <p>.stop : 阻止事件的冒泡传播（儿子向父亲传播）</p>
    <p>.capture : 事件行为在捕获阶段执行；(从父亲向儿子传播)</p>
    <p>.once : 只执行一次；</p>
    <p>.self :只有触发自己的事件行为才会执行</p>
    <div @click="parent" style="font-size: 40px;color:red; cursor: pointer;">
      <span>parent元素 </span>
      <div @click.self="child">
        child点击事件
        <div @click="grandChild">
          grandChild
        </div>
      </div>
    </div>
    <br>
    <a href="https://www.baidu.com" @click.prevent="fn">请点击页面跳转百度</a>
    <br>
    <el-card class="box-card">
      <p>vue 中提供一个行间属性： ref</p>
      <p>this.$refs : 获取到所有的元素带有行间属性ref的属性</p>
      <p>this.$set :</p>
      <p>this.$mount : 挂载</p>
      <p>this.$el : 挂载的元素</p>
      <p>this.$data:</p>
      <p>this.$options</p>
      <p>this.$nextTick</p>
      <p>this.$emit </p>
      <p>this.$on: 订阅</p>
    </el-card>
    <br>
    <p>在原数组的上面追加一个页面会检查不到，所以我们用$nextTick</p>
    <el-card class="box-card">
      <ul>
        <li v-for="arr in arrs" :key="arr" ref="wrap">{{arr}}</li>
      </ul>
      <div style="font-size:29px">
        上面数组总长度错误结果：{{arrsLength}}
      </div>
      <div style="font-size:29px">
        上面数组总长度正确结果：{{arrsLength2}}
      </div>
      <div style="font-size:29px">
        在updated中获取正确结果：{{arrsLength3}}
      </div>
    </el-card>
    <br>
    <h3>鼠标划过的效果</h3>
    <el-card class="box-card">
      <ul class="list-group">
        <li class="list-group-item" v-for="(item,index) in fruits" :key="index" @mouseenter.stop="handleMouseIn(index)" @mouseleave.stop="handleMouseOut(index)" :class="rowClasses(index)">
          {{item.name}}
        </li>
      </ul>
    </el-card>
    <br>
    <h3>鼠标划过的效果</h3>
    <el-card class="box-card">
      <ul class="list-group">
        <li class="list-group-item" v-for="(item,index) in activityCopy" :key="index" :class="{active:index == toggleIndex}" @click='toggle(index)'>
          {{item.name}}
        </li>
      </ul>
    </el-card>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      arr3: [],
      val: '',
      toggleIndex:0,
      msg: '这是默认数据v-once',
      arrs: [1, 2, 3, 4, 5],
      arrsLength3: 0,
      arrsLength2: 0,
      arrsLength: 0,
      a: '1',
      fruits: [
        { name: '香蕉', color: ['green', 'red', 'pink'] },
        { name: '苹果', color: ['green', 'red'] },
        { name: '鸭梨', color: ['green', 'blue', 'pink'] },
      ],
      products: [], //created 初始化
      activityCopy: {}, //赋值相同的内容
    }
  },
  filters: { //过滤器
    toFixed(input, paraml) { //
      return '$' + input.toFixed(paraml)
    }
  },
  computed: { //计算属性，也是放在vm实例上，不能和methods和data属性相同
    checkAll: {
      get() {
        return false
      },
      set() {

      }
    }
  },
  mounted() {
    // this.arrs = [1, 2, 3, 4, 5, 6, 7],
    this.arrs.push('6')
      this.arrsLength = this.$refs.wrap.length;//错误结果
    this.$nextTick(() => {
      // 这个回调函数会等待DOM异步渲染完成执行；
      this.arrsLength2 = this.$refs.wrap.length
    });
  },
  //专门发送ajax用
  created() { //数据被初始化后被调用，调用数据的地方 (也叫钩子函数)
    axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    console.log(this.products)

    //赋值一份数据
    this.activityCopy = JSON.parse(JSON.stringify(this.fruits));
  },
  //把事件都写到methods上
  methods: { // ， methods 和data数据都放到 vue的实例上 而且名字不能冲突，冲突会报错，methods的this指向的都是实例
    btnClick(event, b) {
      console.log(this.a, event, b)
    },
    add(e) {
      if (e.keyCode === 13) {
        this.arr3.unshift(this.val)
      }
    },
    remove(i) { //如果相等就删除，
      this.arr3 = this.arr3.filter((item, index) => index !== i)
    },
    //----------事件修饰符-----------------------------------------
    fn() {
      console.log(1);
    },
    parent() {
      console.log('parent')
    },
    child() {
      console.log("child");
    },
    grandChild() {
      console.log("grandChild")
    },
    //给移入移出增加class
    rowClasses(index) {
      return [
        {
          [`bgColor`]: this.$data.fruits[index] && this.$data.fruits[index]._isHover
        }
      ]
    },
    //鼠标移入移出效果
    handleMouseIn(index) {
      if (this.$data.fruits._isHover) {//如果当前元素有这个属性就不改变
        return
      }
      //当生成vue实例后，当再次给数据赋值时，有时候并不会自动更新到视图上去；
      //如果在实例创建之后添加新的属性到实例上，它不会触发视图更新,
      this.$set(this.$data.fruits[index], '_isHover', true) //进入
    },
    handleMouseOut(index) {
      this.$set(this.$data.fruits[index], '_isHover', false) //离开
    },
    toggle(index){
      this.toggleIndex =index
      console.log(index);
    }
  },
  updated() {
    //只有事先设置好的data变量如下arrData改变并且要在页面重新渲染{{ arrData }}完成之后,才会进updated方法，光改变arrData但不渲染页面是不会进的.
    this.arrsLength3 = this.$refs.wrap.length
  }
}
</script>
<style>
.red {
  color: red;
}
.width {
  width: 70px;
  display: inline-block;
  margin-top: 4px;
}
.bgColor {
  background: red;
  color: #fff;
}
.list-group-item.active{
  background: green;color: #fff
}
</style>
