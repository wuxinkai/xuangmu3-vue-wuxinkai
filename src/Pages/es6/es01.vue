<template>
  <div>
    <el-row>
      <el-col :offset="4" :span="20" v-for="(item,index) in codeData" :key="index" style="margin-top:20px;overflow: hidden;">
        <div>
          <h1>{{item.title}}</h1>
          <p style="color:red">{{item.result}}</p>
          <codemirror ref="myCm" :style="{'height':item.height}" v-model="item.text" :options="cmOptions" @ready="onCmReady" @focus="onCmFocus" @input="onCmCodeChange"></codemirror>
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
      codeData: [],
      code: 'const a = 10',
      cmOptions: {
        // codemirror options
        tabSize: 8,
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
        },

        lineWrapping: true, //自定换行


      },


      // -------------------------
      showBlock: {},

    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  mounted() {
    this.codeData[0] = {      height: '560px', id: 0, title: '数组对象分类，把id相同的打包成一类，利用属性不能相同', text: `
    var arr = [
            {"id":"1001","name":"值1","value":"111"},
            {"id":"1001","name":"值1","value":"11111"},
            {"id":"1002","name":"值2","value":"25462"},
            {"id":"1002","name":"值2","value":"23131"},
            {"id":"1002","name":"值2","value":"2315432"},
            {"id":"1003","name":"值3","value":"333333"}
        ];\n

           let obj = {}
    let array = []
    for (var i = 0; i < arr.length; i++) {
        let cur = arr[i]
        //进行对象的去重应用obj 存储是array
        if (!obj[cur.id]) { //利用属性不能相同的原理添加内容
            array.push({
                id: cur.id,
                name: cur.name,
                data: [cur],
            })
            //作为一种去重方式
            obj[cur.id] =cur //  {1001: {id: "1001", name: "值1", value: "111"},1002: {id: "1002", name: "值2", value: "25462"}}
        } else {
            for (var j = 0; j < array.length; j++) { //对id相同但内容不同的属性，进行存储
                dj = array[j]
                if (dj.id == cur.id) {
                    dj.data.push(cur)
                    break;
                }
            }
        }
    }
     console.log(array) //{id: "1001", name: "值1", data:  [{id: "1001", name: "值1", value: "111"}]}
    `}
    this.codeData[1] = {  height: '150px',id: 1, title: 'find查询', text: "block: [ \n { name: '小明', title: '001',  id: 1}, \n  {name: '小花', title: '002',id: 2}, \n  {name: '小蓝', title: '003',id: 3}, \n  {name: '小黄',title: '004',id: 4} \n ] \n\n  this.showBlock = (this.block.find(item => item.name === `小花`))", result: '小花 002  2' }
    this.$forceUpdate()


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

<style lang="scss"  scoped>
/deep/ .CodeMirror{
  height: 100%;
}
</style>
