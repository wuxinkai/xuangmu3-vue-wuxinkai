<template>
  <div>
    <p>(1)引入 js</p>
    <p>(2)在index.html中引入</p>
    <p>(3)拷贝文件components下Tinymce</p>
    <p>(4) 在需要的文件引入tinymce</p>
    <br>
    <tinymce :height="300" :readonly=readOnly v-model="newEntity"></tinymce>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
export default {
  data() {
    return {
      newEntity: '',
      readOnly: false //是否可以输入
    }
  },
  components: {
    Tinymce
  }
}
</script>
<style scoped>
</style>