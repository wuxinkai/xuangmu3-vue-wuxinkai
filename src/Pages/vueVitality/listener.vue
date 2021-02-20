<template>
  <div>
    <h3>当我们有三个组件。A。B。C。A是父组件。B是子组件。C孙子组件。当我们A向C传值的时候我们有两种方式</h3>
    <br>
    <h4>，一般都是通过先传给B再由B传给C。这一种通过props和$emit的方式，使得组件之间的业务逻辑臃肿不堪，B组件在其中仅仅充当的是一个中转站的作用。</h4>
    <br>
    <h4>把值放在vuex里面作为共享的。</h4>
    <br>
    <h4>通过$attrs传父组件传来的</h4>
    <br>
    <p>最外层页面接收 --- {{ p1}}</p>
    <br>
    <p>最外层页面接收 --- {{ p2}}</p>
    <parentA class="666" @test1="listenerDest1" @test2="listenerDest2"></parentA>
  </div>
</template>

<script>
import parentA from "./listenersCtrl/parentA";
export default {
  name: '',
  props: {
  },
  components: {
    parentA,

  },
  data() {
    return {
      p1: '',
      p2: '',
    }
  },
  methods: {
    listenerDest1(data) {
      this.p1 = data
    },
    listenerDest2(data) {
      this.p2 = data
    }
  },
  mounted() {

  },
  watch: {

  },
  computed: {

  },
  filters: {

  }
}
</script>

