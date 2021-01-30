<template>
  <el-card class="box-card">
    <chil :tree="item" v-for="(item ,index) in tree" :key="index"></chil>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      tree: [
        {
          label: "递归组件",
          test: 1,
          path: "/home",
          children: [
            {
              label: "自身调用自身",
              test: 2,
              path: "/home",
              children: [
                {
                  label: "递归组件",
                  test: 3,
                  path: "/home",
                  children: [
                    {
                      label: "自身调用自身",
                      test: 4,
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
  },
  components: {
    chil: {
      name: 'chil', //递归组件是指组件自身调用自身
      data: function () {
        return {
          count: 0
        }
      },
      props: ['tree'],
      template: `<li>
        <router-link :to=tree.path>{{tree.label}}</router-link>
        <chil v-if="tree.children" :tree="item" v-for="(item,index) in tree.children" :key="index"></chil>
      </li>`
    }
  }
}
</script>
<style>
li {
  margin-left: 30px;
}
</style>
