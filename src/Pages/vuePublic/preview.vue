<template>
    <div class="FU">
      <h2>操作步骤</h2>
      <p>1,在min.js中引入</p>
      <div>
        <pre>
        import preview from 'vue-photo-preview'
        import 'vue-photo-preview/dist/skin.css'
        var options = {
          fullscreenEl: false //关闭全屏按钮
        }
        Vue.use(preview, options)
        </pre>
      </div>
      <p>2,在preview.vue中</p>
    <div class="item2">
					<img src="static/images/head_icon.jpg" preview="2" preview-text="描述文字">
					<img src="static/images/秋田犬.jpg" preview="2" preview-text="描述文字2">
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

  }
}
</script>
<style scoped>
.item2 img{
				width: 44%;
				margin: 2%;
			}
</style>
