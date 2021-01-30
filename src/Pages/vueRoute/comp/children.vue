<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>弟弟组件</span>
    </div>
    <!-- <div v-for="item in menuItems" :key="item.NAMES" class="text item">
      <i :class="item.ICON"></i> {{item.PARENT_ID}}{{ item.NAMES }}
    </div> -->
    <el-menu :default-active="onRoutes" class="el-menu-demo" mode="horizontal" :collapse="collapse">
      <el-menu-item :index="item.ID"  v-for="item in menuItems" :key="item.NAMES"> {{item.PARENT_ID}}{{ item.NAMES }}</el-menu-item>
    </el-menu>
  </el-card>
</template>
<script>
export default {
  props: ['menuItems'],
  data() {
    return {
      collapse: false,
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    },
    className() {
      return this.$route.path
    }
  },
}
</script>