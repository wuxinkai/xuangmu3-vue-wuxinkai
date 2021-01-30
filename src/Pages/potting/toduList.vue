<template>
  <div>
    <div>
      <el-card class="box-card">
        <div class="clearfix">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
              <el-input v-model="formInline.user" @keyup.enter.native="doAdd" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <h2>进行中</h2>
        <div v-for="(o,index) in list" :key="index" v-if="!o.checked" @change="saveList()" class="text item"><el-checkbox v-model="o.checked"></el-checkbox> --- {{ o.title }} ----- <el-button type="primary" @click="deleteClick(index)">查询</el-button></div>
        <h2>已完成</h2>
         <div v-for="(o,index) in list" :key="index" v-if="o.checked" @change="saveList()" class="text item"><el-checkbox v-model="o.checked"></el-checkbox> @@@@@@@{{ o.title }} </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Storage from '@/utils/storage'  //存储
console.log(Storage);
export default {
  components: {
    Storage
  },
  data() {
    return {
        ok: true,
        list:[
        ],
      formInline: {
        user: ""
      }
    };
  },
  methods: {  //事件
      //提交
    onSubmit() {
        this.list.push({
            checked:false,
            title:this.formInline.user,
        })
        //清空input框 todo
        this.formInline.user =''
        //存储内容
        Storage.set("list",this.list)
        // localStorage.setItem("list",JSON.stringify(this.list))
    },
    //删除
    deleteClick(number){
        this.list.splice(number,1) 
        Storage.set("list",this.list)
        // localStorage.setItem("list",JSON.stringify(this.list))
    },
    //键盘事件
    doAdd(e){
      this.onSubmit()
    },
    //页面刷新  已完成里的内容，的就会消失，执行saveList事件
    saveList(){
         Storage.set("list",this.list)
        // localStorage.setItem("list",JSON.stringify(this.list))
    }
  },
  mounted(){ //声明周期  vue页面刷新就会触发的时候
  let list =Storage.get("list")
    // let list = JSON.parse(localStorage.getItem('list'))
    if(list){
        this.list=list
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.text{
    margin-top: 10px;
}
</style>

