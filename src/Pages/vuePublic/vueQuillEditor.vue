<template>
<div>
  <div>
    <quill-editor class="quill" v-model="progs"  @change="change"> </quill-editor>
   <div v-html="progs"></div>
  </div>
  
  <!-- <div>
      <quill-editor 
      v-model="content" 
      ref="myQuillEditor" 
      :options="editorOption" 
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
   
  </div> -->
  <p>背景颜色 - background 
加粗- bold 
颜色 - color 
字体 - font 
内联代码 - code 
斜体 - italic 
链接 - link 
大小 - size 
删除线 - strike 
上标/下标 - script 
下划线 - underline 
引用- blockquote 
标题 - header 
缩进 - indent 
列表 - list 
文本对齐 - align 
文本方向 - direction 
代码块 - code-block 
公式 - formula 
图片 - image 
视频 - video 
清除字体样式- clean</p>
</div>
</template>

<script>
export default {
  name: "vueQuillEditor",
  data() {
    return {
      progs: null,
      content: null,
      // editorOption: {
      //   modules: {
      //     toolbar: [
      //       ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      //       ['blockquote', 'code-block']
      //     ]
      //   }
      // }
    }
  },
  methods: {
    change: function () {
      console.log(this.progs)
    },
    // onEditorBlur() {//失去焦点事件
    //  console.log(this.content)
    // },
    // onEditorFocus() {//获得焦点事件
    //  console.log(this.content)
    // },
    // onEditorChange() {//内容改变事件
    //  console.log(this.content)
    // }
  },
  // components: {
  //   'v-vueQuillEditor': vueQuillEditor
  // }
}
</script>

<style scoped>
.box {
  width: 70%;
  height: 450px;
  background: #fff;
  margin: 0 auto;
  color: #333;
  padding: 20px;
}
ul {
  list-style: none;
}
</style>
