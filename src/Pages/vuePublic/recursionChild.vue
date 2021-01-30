<template>
  <ul>
    <li>
      <router-link :to="tree.path">{{tree.label}}</router-link>
      <digui v-if="tree.children" :tree="item" v-for="(item,index) in tree.children" :key="index"></digui>
    </li>
  </ul>
</template>
<script>
export default {
  name: "digui",//递归组件是指组件自身调用自身
  props: ["tree"]
}
</script>