 <template>
  <div>
    <q>slot-C 组件：插槽事件</q>
    <slot name="titleC"></slot>       
    <slot name="click3">   <p>插槽中不写内容就是默认插槽</p></slot>
  </div>
</template>
<script>
export default {
    data(){
        return {
            a:1
        }
    },
    // methods:{
    //     fn(){
    //         alert('子组件')
    //     }
    // },
}
</script>
