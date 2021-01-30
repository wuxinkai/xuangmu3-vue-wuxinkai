 <template>
  <div>
    <p>2 <span class="red">声明周期(还没有数据): </span> 出生前：beforeCreate， 出生后:create</p>
    <p>4 <span class="red">(有数据了): </span> 挂载之前还没有放到页面上：beforeMount， 放到了页面：mounted</p>
    <p>6 <span class="red">数据绑写到了页面: 需要刷新</span> 刷新前:beforeUpdate , 刷新后：updated</p>
    <p>8 <span class="red">最后灭绝</span> 灭绝前:beforeDestory , 灭绝后：destroyed</p>
    <p>10 <span class="red"></span></p>
  </div>
</template>
<script>
export default {
    data(){
        return {
            a:1111111111111111111111111111111
        }
    },
    beforeCreate(){
        // console.log('beforeCreate没有data属性')
        // console.log(this.$root.bus)
        // debugger
    },
    created(){ //用于ajax方法，初始化操作
        // console.log('有了data属性，有了get和set方法，获取ajax')
        // console.log(this.$root.bus)
        // debugger
    },
    beforemount(){
        // console.log('没有实际意义')
        // debugger
    },
    mounted(){
        // console.log('dom渲染完了，操作dom')
        // debugger
    },
    beforeUpdated(){ //方法不执行1
        console.log('更新数据前')
    },
    updated(){
        console.log('更新数据后')
    },
    beforeDestroy(){
        console.log('销毁前')
    },
    destroyed(){
        console.log('销毁后')
    },
    errorCaptured(){ //当捕获一个来自子孙组件的错误时被调用 ,此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串

    }
}
</script>

<style>
.red{color: red}
</style>
