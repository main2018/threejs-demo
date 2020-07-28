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
      var axisHelper = new THREE.AxesHelper(250);
      scene.add(axisHelper);
      //////////////////////////
      var group = new THREE.Group()
      var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
      var material = new THREE.MeshLambertMaterial({
        color: 0xff00ff
      })
      var mesh1 = new THREE.Mesh(geometry, material)
      /**
       * 创建两个网格模型并设置一个父对象group
       */
      mesh1.name = "Box"; //网格模型1命名
      group.add(mesh1); //网格模型添加到组中
      var geometry = new THREE.BoxGeometry(50, 20, 20); //立方体
      var material = new THREE.MeshStandardMaterial({
        color: 0xff00ff
      })
      var mesh2 = new THREE.Mesh(geometry, material)
      mesh2.name = "Sphere"; //网格模型2命名
      mesh2.position.set(200,0,0)
      group.add(mesh2); //网格模型添加到组中
      scene.add(group)

      /**
       * 编辑group子对象网格模型mesh1和mesh2的帧动画数据
       */
      // 创建名为Box对象的关键帧数据
      var times = [0, 10]; //关键帧时间数组，离散的时间点序列
      var values = [0, 0, 0, 150, 0, 0]; //与时间点对应的值组成的数组
      // 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
      var posTrack = new THREE.KeyframeTrack('Box.position', times, values);
      // 创建颜色关键帧对象：10时刻对应颜色1, 0, 0   20时刻对应颜色0, 0, 1
      var colorKF = new THREE.KeyframeTrack('Box.material.color', [10, 20], [1, 0, 0, 0, 0, 1]);
      // 创建名为Sphere对象的关键帧数据  从0~20时间段，尺寸scale缩放3倍
      var scaleTrack = new THREE.KeyframeTrack('Sphere.scale', [0, 20], [1, 1, 1, 3, 3, 3]);

      // duration决定了默认的播放时间，一般取所有帧动画的最大时间
      // duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
      var duration = 20;
      // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
      var clip = new THREE.AnimationClip("default", duration, [posTrack, colorKF, scaleTrack]);
      /**
       * 播放编辑好的关键帧数据
       */
      // group作为混合器的参数，可以播放group中所有子对象的帧动画
      var mixer = new THREE.AnimationMixer(group);
      // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
      var AnimationAction = mixer.clipAction(clip);
      //通过操作Action设置播放方式
      AnimationAction.timeScale = 20;//默认1，可以调节播放速度
      // AnimationAction.loop = THREE.LoopOnce; //不循环播放
      AnimationAction.play();//开始播放


      var spotLight = new THREE.SpotLight(0xffffff);
      //spotLight.position.set(-50, 60, 15);
      spotLight.position.set(200, 160, 85);
      spotLight.castShadow = true;//允许投射阴影
      scene.add(spotLight);
      // //环境光
      var ambientLight = new THREE.AmbientLight( 0xffffff );
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
      var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      camera.position.set(200, 500, 500); //设置相机位置
      camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
      /**
       * 创建渲染器对象
       */
      var renderer = new THREE.WebGLRenderer({antialias:true});
      renderer.setSize(width, height);//设置渲染区域尺寸
      renderer.setClearColor(new THREE.Color(0xffffff));//设置窗口背景颜色为黑
      // renderer.shadowMapEnabled = true;//开启阴影，加上阴影渲染
      document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数
      // renderer.render(scene, camera);
      // 创建一个时钟对象Clock
      var clock = new THREE.Clock();
      function render() {
        renderer.render(scene,camera);//执行渲染操作
        // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
        requestAnimationFrame(render);//请求再次执行渲染函数render
        mixer.update(clock.getDelta());
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