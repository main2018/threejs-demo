<template>
  <div class=''>
  </div>
</template>

<script>
  import * as THREE from 'three'
  export default {
    data() {
      return {
      }
    },
    mounted() {
      const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls.js');
      /**
       * 创建场景对象Scene
       */
      var scene = new THREE.Scene();
      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      var axisHelper = new THREE.AxisHelper(250);
      scene.add(axisHelper);
      var geometry = new THREE.BoxGeometry(20, 20, 20, 5, 5, 5);
      var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
      });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(15, 10, 0);//设置立方体的坐标
      // mesh.position.set(0,0,0)
      scene.add(mesh);

      // 设置产生投影的网格模型
      mesh.castShadow = true;


      //创建一个平面几何体作为投影面
      var planeGeometry = new THREE.PlaneGeometry(300, 200);
      var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xFFFFFF
      });
      // 平面网格模型作为投影面
      var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
      scene.add(planeMesh); //网格模型添加到场景中
      planeMesh.rotateX(-0.5 * Math.PI); //旋转网格模型
      planeMesh.position.set(0, 0, -20)
      // 设置接收阴影的投影面
      planeMesh.receiveShadow = true;

      var spotLight = new THREE.SpotLight(0xffffff);
      //spotLight.position.set(-50, 60, 15);
      spotLight.position.set(-200, 160, 85);
      spotLight.castShadow = true;//允许投射阴影
      scene.add(spotLight);


      // //环境光
      var ambientLight = new THREE.AmbientLight( 0x0c0c0c );
      scene.add( ambientLight );
      // var ambient = new THREE.AmbientLight(0x444444);
      // scene.add(ambient);
      // console.log(scene)
      // console.log(scene.children)
      /**
       * 相机设置
       */
      var width = window.innerWidth; //窗口宽度
      var height = window.innerHeight; //窗口高度
      var k = width / height; //窗口宽高比
      var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      camera.position.set(200, 500, 500); //设置相机位置
      camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
      /**
       * 创建渲染器对象
       */
      var renderer = new THREE.WebGLRenderer({antialias:true});
      renderer.setSize(width, height);//设置渲染区域尺寸
      renderer.setClearColor(new THREE.Color(0x000000));//设置窗口背景颜色为黑
      renderer.shadowMapEnabled = true;//开启阴影，加上阴影渲染
      document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数
      // renderer.render(scene, camera);

      function render() {
        renderer.render(scene,camera);//执行渲染操作
        // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
        requestAnimationFrame(render);//请求再次执行渲染函数render
      }
      render();
      var controls = new OrbitControls(camera, renderer.domElement);//创建控件对象
      // 已经通过requestAnimationFrame(render);周期性执行render函数，没必要再通过监听鼠标事件执行render函数
      // controls.addEventListener('change', render)
    },
  }
</script>
<style lang='scss' scoped>
</style>