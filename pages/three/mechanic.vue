<template>
  <div class=''>
  </div>
</template>

<script>
  import * as THREE from 'three'
import { log } from 'three';
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
      var AxesHelper = new THREE.AxesHelper(250);
      scene.add(AxesHelper);
      //////////////////////////////
      // 头部网格模型和组
      var headMesh = sphereMesh(10, 0, 0, 0);
      headMesh.name = "脑壳"
      var leftEyeMesh = sphereMesh(1, 8, 5, 4);
      leftEyeMesh.name = "左眼"
      var rightEyeMesh = sphereMesh(1, 8, 5, -4);
      rightEyeMesh.name = "右眼"
      var headGroup = new THREE.Group();
      headGroup.name = "头部"
      headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
      // 身体网格模型和组
      var neckMesh = cylinderMesh(3, 10, 0, -15, 0);
      neckMesh.name = "脖子"
      var bodyMesh = cylinderMesh(14, 30, 0, -35, 0);
      bodyMesh.name = "腹部"
      var leftLegMesh = cylinderMesh(4, 60, 0, -80, -7);
      leftLegMesh.name = "左腿"
      var rightLegMesh = cylinderMesh(4, 60, 0, -80, 7);
      rightLegMesh.name = "右腿"
      var legGroup = new THREE.Group();
      legGroup.name = "腿"
      legGroup.add(leftLegMesh, rightLegMesh);

      var leftArmMesh = cylinderMesh(2, 40, 0, -80, 0);
      leftArmMesh.name = "左胳膊"
      leftArmMesh.position.set(0,-35,20);
      leftArmMesh.rotateX(Math.PI * 0.75)
      var rightArmMesh = cylinderMesh(2, 40, 0, -80, 7);
      rightArmMesh.name = "右胳膊"
      rightArmMesh.position.set(0,-35,-20);
      rightArmMesh.rotateX(Math.PI * 0.25)
      var ArmGroup = new THREE.Group();
      ArmGroup.name = "胳膊"
      ArmGroup.add(leftArmMesh, rightArmMesh);

      var navelMesh = sphereMesh(1, 14, -40, 0);
      navelMesh.name = "肚脐"
      
      var bodyGroup = new THREE.Group();
      bodyGroup.name = "身体"
      bodyGroup.add(neckMesh, bodyMesh, legGroup, ArmGroup, navelMesh);
      // 人Group
      var personGroup = new THREE.Group();
      personGroup.name = "人"
      personGroup.add(headGroup, bodyGroup)
      personGroup.translateY(50)
      scene.add(personGroup); 

      // 球体网格模型创建函数
      function sphereMesh(R, x, y, z) {
        var geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
        var material = new THREE.MeshPhongMaterial({
          color: 0x0000ff
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
        mesh.position.set(x, y, z);
        return mesh;
      }
      // 圆柱体网格模型创建函数
      function cylinderMesh(R, h, x, y, z) {
        var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //球体几何体
        var material = new THREE.MeshPhongMaterial({
          color: 0x0000ff
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
        mesh.position.set(x, y, z);
        return mesh;
      }
      
      scene.traverse(function(obj) {
        if (obj.type === "Group") {
          // console.log(obj.name);
        }
        if (obj.type === "Mesh") {
          // console.log('  ' + obj.name);
          obj.material.color.set(0xffff00);
        }
        if (obj.name === "左眼" | obj.name === "右眼") {
          obj.material.color.set(0x000000)
        }
        // 打印id属性
        // console.log(obj.id);
        // 打印该对象的父对象
        // console.log(obj.parent);
        // 打印该对象的子对象
        // console.log(obj.children);
      })
      var nameNode = scene.getObjectByName ( "左腿" );
      nameNode.material.color.set(0x00ff00);
      console.log('nameNode', nameNode);


      // //创建一个平面几何体作为投影面
      // var planeGeometry = new THREE.PlaneGeometry(300, 200);
      // var planeMaterial = new THREE.MeshLambertMaterial({
      //   color: 0xFFFFFF,
      //   side: THREE.DoubleSide,
      // });
      // // 平面网格模型作为投影面
      // var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
      // scene.add(planeMesh); //网格模型添加到场景中
      // planeMesh.rotateX(-0.5 * Math.PI); //旋转网格模型
      // planeMesh.position.set(0, 0, -20)
      // // 设置接收阴影的投影面
      // planeMesh.receiveShadow = true;

      var spotLight = new THREE.SpotLight(0xffffff);
      //spotLight.position.set(-50, 60, 15);
      spotLight.position.set(200, 160, 85);
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
      camera.position.set(500, 500, 500); //设置相机位置
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