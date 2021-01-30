<template>
  <div>
    <cascade-loop :list="list" :cur-width="400" :all-width="800" :all-height="30" :cur-height="28" :scale="0.8"></cascade-loop>
  </div>
</template>

<script>
import cascadeLoop from "./cascadeLoop.vue";
export default {
  components: {
    cascadeLoop
  },
  name: "vueBanner",
  data() {
    return {
      list: [
        { content: 1, color: 'red' },
        { content: 2, color: 'green' },
        { content: 3, color: 'blue' },
        { content: 4, color: '#66CC66' },
        { content: 5, color: 'black' },
        { content: 6, color: 'blue' }
      ]
    }
  },
  methods: {

  },
}
</script>

<style scoped>
.cascade-list{
  width:800px;
  height:300px;
  position:relative;
  margin:0 auto;
}
.toggle{
	position:absolute;
	padding:.5em .8em;
	top:0;
	left:0;
}
.item{
	box-sizing:border-box;
	border:1px solid #fff;
  position:absolute;
  display:block;
  background-color:blue;
  /* color:#fff; */
  text-align:center;
  transition: all .8s ease;
}
.item span{
	transition:inherit;
	font-size:20px;
}
.cascade-list .item:nth-child(2n){
  /*
	background-color:red;
	*/
}
</style>
