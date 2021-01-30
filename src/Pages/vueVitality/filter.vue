<template>
  <div>
    <h3>需要在main页面中引入filter中</h3>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>字符串翻转</span>
      </div>
      <div>原字符串:{{testStr}},</div>
      <div>反转后字符串：{{testStr | reverseStr }}</div>
      <div>反转并转成小写{{testStr | reverseStr | toLower }}</div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数组去重</span>
      </div>
      <div>原数组：{{testArray}}</div>
      <div>去重后{{testArray | unique}}</div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      testStr: "ABCDEFG",
      testArray: [1, 2, 3, 5, 6, 1, 2, 3]
    }
  },
  mounted(){
   
  }
}
</script>
