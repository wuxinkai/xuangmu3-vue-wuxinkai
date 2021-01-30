 <template>
  <div>
    <div>
      <h3>进入动画</h3>
      <p>*-enter{ } 进入过渡的开始状态，元素被插入时生效，只应用一帧后立即删除；(运动的初始状态)</p>
      <p>*-enter-active{ }进入过渡的结束状态，元素被插入时就生效，在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数</p>
      <p>*-enter-to{ } 进入过渡的开始状态，元素被插入时生效，只应用一帧后立即删除；(运动的初始状态)</p>

      <h3>离开动画</h3>
      <p>*-leave 离开过渡的开始状态，元素被删除时触发，只应用一帧后立即删除</p>
      <p>*-leave-active 离开过渡的结束状态，元素被删除时生效，在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数</p>
      <p>*slide-leave-to 结束后</p>
      <h3>分组</h3>
      <p>transition 一个动画用</p>
      <p>transition-group 多个动画用</p>
      <h3>钩子函数</h3>
      <p>@before-enter="benter" </p>
      <p>@enter="enter"
      </p>
      <p> @after-enter="afterEnter"
      </p>
      <p> @before-leave="beforeLeave"
      </p>
      <p> @leave="leave"
      </p>
      <p>@after-leave="afterLeave" </p>
    </div>
    <div id="div1">
      <input
        type="button"
        value="显示隐藏"
        @click="fn"
      >
      <transition name="slide">
        <div
          class="box"
          v-if="show"
        ></div>
      </transition>
    </div>
    <br>
    <br>
    <br>
    <div id="div2">
      <input
        v-for="(json,index) in arr2"
        :key="index"
        type="button"
        :value="'显示隐藏'+index"
        @click="fn2(index)"
      >
      <transition-group
        name="slide2"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div
          v-for="(json,index) in arr2"
          :key="json.id"
          class="box2"
          v-if="json.show"
        >{{index}}</div>
      </transition-group>
    </div>


      <br>
      <br>
      <br>
      <h1>vue2-animate 动画</h1>
      <input v-for="(json,index) in arr2" :key="index" type="button" :value="'显示隐藏'+index"  @click="fn2(index)">
    <transition-group name="bounce">
      <div class="box2" v-for="(json,index) in arr2" :key="json.id" v-if="json.show">{{index}}</div>
    </transition-group>

  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      arr2: [
        { id:1,show: true },
        { id:2,show: true },
        { id:3,show: true },
        { id:4,show: true },
      ]
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    fn() {
      this.show = !this.show;
    },
    fn2(index) {
      this.arr2[index].show = !this.arr2[index].show;
    },
    //进入动画 钩子
    beforeEnter(el) {
      console.log('1动画enter之前');
    },
    enter(el) {
      console.log('2动画enter进入');
    },
    afterEnter(el) {
      console.log('3动画进入之后');

      el.style.background = "blue";
     
    },
    // 离开动画 钩子
    beforeLeave(el) {
      console.log('4动画leave之前');
    },
    leave(el) {
      console.log('5动画leave');
    },
    afterLeave(el) {
      console.log('6动画leave之后');
      el.style.background = "red";
    }
  },
}
</script>
<style media="screen">
.box {
  width: 300px;
  height: 300px;
  background: #ccc;
  border: 1px solid black;
}
/*进入过渡  初始化 transition 上定义了名字slide 所以以slide开头*/
.slide-enter {
  height: 0;
  opacity: 0;
}
/*进入过渡 过度 */
.slide-enter-active {
  transition: 0.3s all ease;
}
/*进入过渡 结束 */
.slide-enter-to {
  height: 300px;
  opacity: 1;
}

/* 离开过渡  初始化*/
.slide-leave {
  height: 300px;
  opacity: 1;
}
/* 离开过渡  过度*/
.slide-leave-active {
  transition: 0.3s all ease;
}
/* 离开过渡  结束*/
.slide-leave-to {
  height: 0;
  opacity: 0;
}

/* ------------------------- */
.box2{
  width: 300px;
  height: 100px;
  background: #ccc;
  border: 1px solid black;
}

.slide2-enter {
  height: 0;
  opacity: 0;
}
.slide2-enter-active {
  transition: 0.3s all ease;
}
.slide2-enter-to {
  height: 100px;
  opacity: 1;
}

.slide2-leave {
  height: 100px;
  opacity: 1;
}
.slide2-leave-active {
  transition: 0.3s all ease;
}
.slide2-leave-to {
  height: 0;
  opacity: 0;
}

.animated{
  width: 200px;
  height: 200px;
  background: pink
}
</style>
