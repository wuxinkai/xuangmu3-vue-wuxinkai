<template>
  <div>
    <childOne></childOne>
  </div>
</template>

<script>

import childOne from "./provide/ChildOne";
export default {
  name: "555",
  provide: {
    for: "父页面的内容传递"
  },
  components: {
    childOne
  }
}
</script>