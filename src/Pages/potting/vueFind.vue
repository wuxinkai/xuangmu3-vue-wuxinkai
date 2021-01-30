<template>
  <div>
    <p>{{showBlock.id}}</p>
    <p>{{showBlock.name}}</p>
    <p>{{showBlock.title}}</p>
  </div>
</template>

<script>
  console.log(Storage);
  export default {
    components: {
      Storage
    },
    data() {
      return {
        showBlock:{},
        block: [{
          name: '小明',
          title: '001',
          id:1
        },{
          name: '小花',
          title: '002',
          id:2
        },{
          name: '小蓝',
          title: '003',
          id:3
        },{
          name: '小黄',
          title: '004',
          id:4
        }]
      };
    },
    methods: {

    },
    mounted() {
      this.showBlock = (this.block.find(item => item.name === '小花')); //通过查询某一个属性，获取这个对象
      console.log (this.showBlock)
    }
  };

</script>

<style lang="scss" type="text/scss" scoped>

</style>
