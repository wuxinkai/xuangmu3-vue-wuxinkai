<template>
  <div>
    <h1>按照 省=>市=>县 顺序执行</h1>
    <h1>{{sheng}}</h1>
    <h1>{{shi}}</h1>
    <h1>{{xian}}</h1>
  </div>
</template>
<script>
export default {
  name: 'AsyncAwait',
  data() {
    return {
      sheng: "",
      shi: "",
      xian: "",
    }
  },
  created() {
    // this.getProvinces()
    this.getTick()
  },
  methods: {
    //await 只能用在async标注的函数中
    province() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('省')
          console.log('省')
        }, 4000);
      })

    },
    city() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('市')
          console.log('市')
        }, 2000);
      })

    },
    country() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('县')
          console.log('县')
        }, 3000);
      })

    },
    async getProvinces() {
      this.sheng = await this.province()
      this.shi = await this.city()
      this.xian = await this.country()

    },
    //在函数里可以利用
    getTick() {
      this.$nextTick(async _ => { //必须加下划线
        this.sheng = await this.province()
        this.shi = await this.city()
        this.xian = await this.country()
      })
    },

  }
}
</script>

