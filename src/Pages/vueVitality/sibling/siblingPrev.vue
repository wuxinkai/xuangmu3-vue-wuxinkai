<template>
    <div class="box">
        <div class="hezi" v-show="changingOver"></div>
        <br>    
        <el-button type="" @click="changingChage">点击事件传递给兄弟组件</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            changingOver:true
        }
    },
    methods:{
        changingChage(){
            this.changingOver = !this.changingOver;
            //发送事件
            this.$root.bus.$emit('changingOver', this.changingOver)
        }
    }
}
</script>
<style>
.hezi{
    width: 500px;
    height: 100px;
    background: red !important
}
</style>

