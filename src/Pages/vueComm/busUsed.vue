<template>
    <div class="box">
      <bus-gege></bus-gege>
      <bus-didi></bus-didi>
    </div>
</template>

<script>
  /*引入实例*/
  import busDidi from './busUsed/busDidi'
  import busGege from './busUsed/busGege'
  export default {
    components:{
      busDidi,
      busGege,
    },
  }
</script>

<style scoped>
  .box{width: 100%;height: 100%;background: #fff;position: relative}
</style>
