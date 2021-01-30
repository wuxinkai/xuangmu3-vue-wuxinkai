<template>
    <div>
      <p>home组件接收query传的参数：{{$route.query}}</p>
      <ul>
        <li>{{$route.query.name}}</li>
        <li>{{$route.query.age}}</li>
        <li>{{$route.query.sex}}</li>
      </ul>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          msg: ''
        }
      }
    }
</script>

<style scoped>
  .home {
    width: 100%;
    border: 1px solid #ccc;
    margin-top: 10px;
    background: rgba(64, 158, 255, 0.35);
    padding: 20px;
  }
  ul{
    list-style: none;
  }
  li{height: 30px;line-height: 30px;background: pink;margin-bottom: 2px}
</style>
