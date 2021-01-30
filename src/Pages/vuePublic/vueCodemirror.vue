<template>
  <div>
    <el-row>
      <el-col :offset="6" :span="14" v-for="(item,index) in codeData" :key="index" style="margin-top:20px;overflow: hidden;">
        <div>
          <codemirror ref="myCm" style="height:100px" v-model="item.text"  :options="cmOptions" @ready="onCmReady" @focus="onCmFocus" @input="onCmCodeChange"></codemirror>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/base16-dark.css'
export default {
  name: "vueQuillEditor",
  data() {
    return {
      codeData: [
        { id: 1, text: "" },
        { id: 2, text: "222222222222222222222" },
        { id: 3, text: "3333333333333333333" },
        { id: 4, text: "444444444444444444444444" },
        { id: 5, text: "555555555555555555555555" }
      ],
      code: 'const a = 10',
      cmOptions: {
        // codemirror options
        tabSize: 4,
        // disabled:true,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        readonly: false, //判断是否只读
        line: true,

        styleActiveLine: true,
        foldGutter: true,
        styleSelectedText: true,
        // keyMap: "sublime",

        matchBrackets: true,
        showCursorWhenSelecting: true,
        extraKeys: { "Ctrl": "autocomplete" },
        hintOptions: {
          completeSingle: false
        }
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  mounted() {
    console.log('监听页面变化', this.codemirror)
  },
  methods: {
    onCmReady(cm) {
      console.log('加载完成!', cm)
    },
    onCmFocus(cm) {
      console.log('页面进入!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('页面换行', newCode)
      this.code = newCode
    }
  },
}
</script>

<style scoped>
</style>
