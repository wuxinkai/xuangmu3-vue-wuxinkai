<template>
  <div>
    <el-card class="box-card">
      <digui :tree="item" v-for="(item,index) in tree" :key="index"></digui>
    </el-card>
  </div>
</template>
<script>
import digui from "./recursionChild.vue";
export default {
  data() {
    return {
      tree: [
        {
          label: '一级菜单',
          test: 1,
          path: '/home',
          children: [
            {
              label: "二级菜单",
              test: 2,
              path: "/home",
              children: [
                {
                  label: "三级菜单",
                  test: 3,
                  path: "/home",
                  children: [
                    {
                      label: "四级菜单",
                      test: 4,
                      path: "/home",
                      children: [
                        {
                          label: "五级菜单",
                          test: 5,
                          path: "/home",
                          children: [
                            {
                              label: "六级菜单",
                              test: 6,
                              path: "/home"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  components: {
    digui
  }
}
</script>
<style>
li {
  padding-left: 30px;
}
</style>
