<template>
  <div>
    <p>儿子页面接收 -- {{childrenDemo}}</p>
    <childtwo></childtwo>
  </div>
</template>

<script>
  import childtwo from './ChildTwo'
  export default {
    name: "333",
    inject: ['for'],
    data() {
      return {
        childrenDemo: this.for
      }
    },
    components: {
      childtwo
    }
  }
</script>