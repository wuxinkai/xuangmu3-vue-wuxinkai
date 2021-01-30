 <template>
  <div>
    <p>插槽的作用：将父组件中间夹着的部分，插入到子组件中， </p>
    <slot-a class="slotwary">
      <p>我是父组件里的文字，但是我要被放到子组件里</p>
    </slot-a>
    <slot-b class="slotwary">
      <p slot="content">（1）父组件里的文字，子组件B里面出现</p>
      <p slot="title">（2）双插槽 通过slot里的name来区分，</p>
    </slot-b>
    <slot-c class="slotwary">
      <p slot="titleC">事件写在父组件中才会起作用</p>
      <p slot="click3">
        <button @click="fn">写在父组件的点击事件</button>
      </p>
    </slot-c>
    <!-- 父组件获取子组件的内容 -->
    <slot-d class="slotwary">
      <!-- 父页面反向接受插槽的值 -->
      <template slot-scope="slot">
        <span v-for="item in slot.data">{{item}} ---- </span>
      </template>
    </slot-d>

  </div>
</template>
<script>
import slotA from "./slot/slotA"; //1引入子组件
import slotB from "./slot/slotB"; //
import slotC from "./slot/slotC"; //
import slotD from "./slot/slotD"; //
export default {
  data() {
    return {
      a: 1,

    }
  },
  methods: {
    fn() {
      alert('父组件')
    }
  },
  components: {
    slotA,
    slotB,
    slotC,
    slotD
  }
}
</script>
<style>
.slotwary {
  height: 300px;
  width: 100%;
  margin-top: 10px;
  background: #fff;
}
</style>
