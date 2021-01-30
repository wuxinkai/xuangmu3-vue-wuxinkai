export default {
  data() {
    return {
      msg: "mixin是混入将项目名称的对象进行合并，你現在调用的是mixin中的hello方法"
    }
  },
  methods: {
    helloMixin() {
      this.$message({
        message: `hello, ${this.msg}`,
        center: true
      });
    }
  },
  mounted() {
    console.log(this.msg)
  }
}
