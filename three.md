# 下载

拷贝到 package 中，执行 npm install

```
 "three": "^0.99.0",
```

# 引入连接

```
import * as THREE from 'three';

import TrackballControls from "three/examples/js/controls/TrackballControls.js"

import OBJLoader from "three/examples/js/loaders/OBJLoader.js"

import MTLLoader from "three/examples/js/loaders/MTLLoader.js"
```

# 初始化代码

```
mounted() {
  let scene = new THREE.Scene();
  //（1）设置相机， 角度75， 近平面和远屏面的大小，和浏览器一样大， 最近看到1厘米，最远看到1000厘米
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  //（2）渲染器
  var renderer = new THREE.WebGLRenderer();
  //设置 画布的颜色 ，默认是黑色
  renderer.setClearColor('#FFFFFF');
  //渲染器的大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  //把这个元素插入到 canvasBox中
  var canvasBox = document.querySelector("#canvas-frame")
  canvasBox.appendChild(renderer.domElement);

  //（3）几何体 CubeGeometry(长度,宽度,高度);
  var geometry = new THREE.CubeGeometry(1, 1, 1);

  // 材质赋颜色 或者赋纹理
  var material = new THREE.MeshBasicMaterial({ color: 0xff6600 });
  //（4）将内容添加到纹理中
  var cube = new THREE.Mesh(geometry, material); scene.add(cube);

  //(5)纹理或者颜色加到场景里面
  scene.add(cube)

  // 设置相机，把物体 推到 3米的距离
  camera.position.z = 3;

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
```

# 四大组件

### (1)场景:把任何要显示的东西，放在场景中的任何位置。THREE.Scene = function (){}

### (2)相机:我们最终能够在浏览器中看到的景象, THREE.PerspectiveCamera = function ( fov, aspect, near, far )

- fov: 视角的角度参数
- aspect ：纵横比
- near: 近平面
- far ： 远平面
- ![Alt text](/static/images/xiangji.png)
- var camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 ); 夹角 45 度， 宽/高 最近可以看到 1 米，最远可以看到 1000 厘米

- 2.1 透视相机远程的物体很小，近出的物体很大，
- 2.2 正投影相机，远处和进处一样大

### (3)渲染器： 决定了画家怎么将眼前的场景画到屏幕上。

- THREE.WebGLRenderer()

### (4)几何体：就是要显示在场景中的对象。网格模型
