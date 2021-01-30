<template>
  <div>
    <div id="canvas-frame"></div>
  </div>
</template>
<script>
import * as THREE from 'three';
export default {
  data() {
    return {
      width: '',
      height: '',
    };
  },
  mounted() {
    var scene = new THREE.Scene();

    this.width = document.getElementById("canvas-frame").clientWidth;
    this.height = document.getElementById("canvas-frame").clientHeight;
 var camera = new THREE.PerspectiveCamera(75,  this.width /this.height, 0.1, 1000);
		
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor('#FFFFFF');


    renderer.setSize(this.width, this.height);

     document.getElementById("canvas-frame").appendChild(renderer.domElement);


    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    //整体旋转
    var objectTotal = new THREE.Object3D();

    var cube = new THREE.Mesh(geometry, material);

    //将盒子装到里面
    objectTotal.add(cube);


    camera.position.z = 5;
    camera.position.x = 5;

    var axisHelper = new THREE.AxisHelper(4);
    objectTotal.add(axisHelper);

    //嵌套
    scene.add(objectTotal);


    function render() {
      requestAnimationFrame(render);
      // cube.rotation.x += 0.1;
      objectTotal.rotation.y -= 0.01;
      console.log(objectTotal.rotation.y );
      renderer.render(scene, camera);
    }
    render();
  },
}
</script>
<style>
#canvas-frame {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 600px;
  background-color: #eeeeee;
}
</style>
