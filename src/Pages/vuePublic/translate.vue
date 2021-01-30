<template>
  <div>
    <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
    <div>
      <i class="icon el-icon-circle-check"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
     {{$t('dashboard')}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      language() {
      return Cookies.get('language') || 'en'
    }
    }
  },
  methods:{
    handleSetLanguage(lang){
      
      console.log(lang)
    }
  }
}
</script>

<style>
.icon {
  font-size: 50px;
}
</style>

