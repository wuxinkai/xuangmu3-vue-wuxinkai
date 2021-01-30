<template>
  <div>

    <div id="canvas-frame"></div>
  </div>
</template>

<script>

import * as THREE from 'three';

// import TrackballControls from "three/examples/js/controls/TrackballControls.js"

// import OBJLoader from "three/examples/js/loaders/OBJLoader.js"

// import MTLLoader from "three/examples/js/loaders/MTLLoader.js"

export default {

  data() {
    return {

    };
  },
  mounted() {
    let scene = new THREE.Scene();
    //（1）设置相机， 角度75， 近平面和远屏面的大小，和浏览器一样大， 最近看到1厘米，最远看到1000厘米
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    //（2）渲染器
    var renderer = new THREE.WebGLRenderer();
    //设置 画布的颜色 ，默认是黑色
    renderer.setClearColor('#FFFFFF');
    //版本不同用的 用的属性不一样
    // renderer.setClearColorHex('#FFFFFF');
    //渲染器的大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    //把这个元素插入到 canvasBox中
    var canvasBox = document.querySelector("#canvas-frame")
    //插入
    canvasBox.appendChild(renderer.domElement);

    //（3）几何体 CubeGeometry(长度,宽度,高度);
    var geometry = new THREE.CubeGeometry(1, 1, 1);

    // 材质赋颜色 或者赋纹理
    var material = new THREE.MeshBasicMaterial({ color: 0xff6600 });
    //（4）将内容添加到纹理中
    var cube = new THREE.Mesh(geometry, material); 
    // scene.add(cube);

    //(5)纹理或者颜色加到场景里面
    scene.add(cube)

    // 设置相机，把物体 推到 3米的距离
    camera.position.z = 2;

    //
    function render() {
      // 自己调用自己这个函数
      requestAnimationFrame(render);
      //x轴不断旋转
      cube.rotation.x += 0.01;
      //y轴不断旋转
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    render();
  },


};
</script>

<style lang="scss" type="text/scss" scoped>
</style>

