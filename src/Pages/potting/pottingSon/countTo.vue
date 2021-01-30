<template>
  <div>
    <slot name="left"></slot>
    <span
    class="numberStyle"
      :id="eleId"
      ref="Number"
    ></span>
    <slot name="right"></slot>
  </div>
</template>

<script>
import CountUp from 'countup'
export default {
  props: {
    // startVal 起始值
    startVal: {
      type: Number,
      default: 0
    },
    //endVal 终止值
    endVal: {
      type: Number,
      default: 0
    },
    //  decimals 小数点后保留几位小数  默认为0
    decimals: {
      type: Number,
      default: 0
    },
    //  duration 动画时长  默认为1s
    duration: {
      type: Number,
      default: 1
    },
    //useEasing 动画效果 如果为ture则是先慢后快 否则是匀速  默认为false
    useEasing: {
      type: Boolean,
      default: false
    },
    //   useGrouping 是否有分组效果  默认为false
    useGrouping: {
      type: Boolean,
      default: false
    },
    //separator 分组用什么符号隔开  默认为，
    separator: {
      type: String,
      default: ','
    },
    // decimal 整数和小数分组符号  默认为 .
    decimal: {
      type: String,
      default: '.'
    },
    //  delay 动画延时  默认为 0 ms
    delay: {
      type: Number,
      default: 0
    },
    //前缀
    prefix: {
      type: String,
      default: ''
    },
    //后缀
    suffix: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      counter: {}
    };
  },
  computed: {
    eleId() {
      //每一个组件  vue都默认带有这个_uid属性  this._uid 可以获取这个属性，拼接一个id付给内容
      return `count_up_${this._uid}`
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.counter = new CountUp(this.eleId, this.startVal, this.endVal, this.decimals, this.duration, {
        useEasing: this.useEasing,
        useGrouping: this.useGrouping,
        separator: this.separator,
        decimal: this.decimal,
        prefix: this.prefix,
        suffix: this.suffix,
      })
      setTimeout(() => {
        this.counter.start()
      }, this.delay)
    })
  },
  watch: {
    //监听数据变化,从新赋值
    endVal(newVal, oldVal) {
      this.counter.update(newVal)
    }
  },
};
</script>

<style lang="scss" type="text/scss" scoped>
.numberStyle{
  font-size: 30px;
  color: red;
  font-weight: bold 
}
</style>

