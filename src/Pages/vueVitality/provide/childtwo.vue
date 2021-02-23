<template>
  <div>
   孙子页面接收 {{svnDemo}}
  </div>
</template>

<script>
  export default {
    name: "",
    inject: ['for'],
    data() {
      return {
        svnDemo: this.for
      }
    }
  }
</script>