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
      const { OBJLoader } = require('three/examples/jsm/loaders/OBJLoader.js');
      const { MTLLoader } = require('three/examples/jsm/loaders/MTLLoader.js');
      /**
       * 创建场景对象Scene
       */
      var scene = new THREE.Scene();
      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      var axisHelper = new THREE.AxisHelper(250);
      scene.add(axisHelper);
      ///////////////////////////////////
      /**
       * OBJ文件加载  只加载obj文件中的几何信息，不加载材质文件.mtl
       */
      // 没有材质文件，系统自动设置Phong网格材质
      ///models/obj/honoka.obj
      
      /**
       * OBJ和材质文件mtl加载
       */
      var obgLoader = new OBJLoader();//obj加载器
      var mtlLoader = new MTLLoader();//材质文件加载器
      mtlLoader.load('/models/obj/verify/verify.mtl', function(materials) {
        // 返回一个包含材质的对象MaterialCreator
        console.log(materials);
        //obj的模型会和MaterialCreator包含的材质对应起来
        obgLoader.setMaterials(materials);
        obgLoader.load('/models/obj/verify/verify.obj', function(obj) {
          console.log(obj);
          obj.scale.set(10, 10, 10); //放大obj组对象
          scene.add(obj);//返回的组对象插入场景中
        })
      })


      var spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(0, 320, 200);
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
      renderer.setClearColor(new THREE.Color(0xffffff));//设置窗口背景颜色为黑
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