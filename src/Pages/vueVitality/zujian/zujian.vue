<template>
    <div class="hezi">
      {{msg}}
    </div>
</template>
<script>
export default {
    data(){
        
        return {
            msg:'组件创建成功'
        }
    },
      beforeDestroy: function () {
        console.group("在组件页面触发，销毁事件");
    },
    destroyed: function () {
        console.group("在组件页面触发，销毁事件");
    }
}
</script>
<style>
.hezi{
    width: 100%;
    height: 100px;
    color: #fff;
    background: red !important
}
</style>

