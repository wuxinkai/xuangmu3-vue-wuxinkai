 <template>
  <div>
    <h1>methods，</h1>
    <p>按钮的点击事件</p>
    <p>鼠标移动事件</p>
    <p>事件的相应方法</p>
    <br>
    <div>
      {{ a }}
      <p>
        <button @click="add(2,$event)">add</button>
      </p>
    </div>
    <p>native 给组件绑定构造器里的原生事件。</p>
    <p>
      <btns @click.native="add(3)"></btns>
    </p>
  </div>
</template>
<script>


var btn={
    template:`<button>组件Add</button>`
}
export default {
  data() {
    return {
      a: 0
    };
  },
  //在构造器里声明
  components: {
    btns: btn
  },
  methods: {
    add(a, event) {
      console.log(a, event);
      this.a++;
    }
  }
};
</script>

<style>
.red {
  color: red;
}
.left {
  float: left;
  margin-left: 10px;
}
</style>
