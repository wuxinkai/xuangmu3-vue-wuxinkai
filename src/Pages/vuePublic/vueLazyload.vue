<template>
  <div class="FU">
    <h2>操作步骤</h2>
    <p>1,在min.js中引入</p>
    <div>
      <p>import VueLazyload from 'vue-lazyload'</p>
      <br>
      <p>Vue.use(VueLazyload)</p>
    </div>
    <p>2,在preview.vue中</p>
    <div class="item2">
      <img v-lazy="'static/images/head_icon.jpg'">
      <img v-lazy="'static/images/秋田犬.jpg'">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
    this.$Lazyload.$on('loaded', function ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error }, formCache) {
      console.log(`图片懒加载信息`,el, src,naturalHeight, naturalWidth, $parent, src, loading, error)
    })
  }
}
</script>
<style scoped>
.item2 img {
  width: 44%;
  margin: 2%;
}
</style>
