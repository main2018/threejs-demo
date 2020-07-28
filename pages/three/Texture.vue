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
      // 纹理贴图映射到一个矩形平面上
      // var geometry = new THREE.PlaneGeometry(204, 102, 4, 4); //矩形平面
      // // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
      // var textureLoader = new THREE.TextureLoader();
      // // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
      // textureLoader.load('/textures/planets/earth_atmos_2048.jpg', function(texture) {
      //   var material = new THREE.MeshLambertMaterial({
      //     // color: 0x0000ff,
      //     // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
      //     map: texture,//设置颜色贴图属性值
      //     wireframe: false,
      //   }); //材质对象Material

      //   /**
      //    * 局部三角面显示完整纹理贴图
      //    */
      //   var t0 = new THREE.Vector2(0, 1); //图片左下角
      //   var t1 = new THREE.Vector2(0, 0); //图片右下角
      //   var t2 = new THREE.Vector2(1, 0); //图片右上角
      //   var t3 = new THREE.Vector2(1, 1); //图片左上角
      //   var uv1 = [t0, t1, t3]; //选中图片一个三角区域像素——用于映射到一个三角面
      //   var uv2 = [t1, t2, t3]; //选中图片一个三角区域像素——用于映射到一个三角面
      //   // 设置第五、第六个三角形面对应的纹理坐标
      //   geometry.faceVertexUvs[0][4] = uv1
      //   geometry.faceVertexUvs[0][5] = uv2
      //   var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      //   scene.add(mesh); //网格模型添加到场景中

      //   //纹理贴图加载成功后，调用渲染函数执行渲染操作
      //   // render();
      // })


      // // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
      // var textureLoader = new THREE.TextureLoader();
      // // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
      // textureLoader.load('/textures/planets/earth_atmos_2048.jpg', function(texture) {
      //   var material = new THREE.MeshLambertMaterial({
      //     // color: 0x0000ff,
      //     // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
      //     map: texture,//设置颜色贴图属性值
      //     wireframe: false,
      //     side:THREE.DoubleSide,//两面可见
      //   }); //材质对象Material

      //   var geometry = new THREE.Geometry(); //创建一个空几何体对象
      //   /**顶点坐标(纹理映射位置)*/
      //   var p1 = new THREE.Vector3(0,90,0); //顶点1坐标
      //   var p2 = new THREE.Vector3(160,90,0); //顶点2坐标
      //   var p3 = new THREE.Vector3(160,170,0); //顶点3坐标
      //   var p4 = new THREE.Vector3(0,170,0); //顶点4坐标
      //   geometry.vertices.push(p1,p2,p3,p4); //顶点坐标添加到geometry对象
      //   /** 三角面1、三角面2*/
      //   var normal = new THREE.Vector3( 0, 0, 1 ); //三角面法向量
      //   var face0 = new THREE.Face3( 0, 1, 2, normal); //三角面1
      //   var face1 = new THREE.Face3( 0, 2, 3, normal); //三角面2
      //   geometry.faces.push( face0,face1 ); //三角面1、2添加到几何体
      //   /**纹理坐标*/
      //   var t0 = new THREE.Vector2(0,0);//图片左下角
      //   var t1 = new THREE.Vector2(1,0);//图片右下角
      //   var t2 = new THREE.Vector2(1,1);//图片右上角
      //   var t3 = new THREE.Vector2(0,1);//图片左上角
      //   var uv1 = [t0,t1,t2];//选中图片一个三角区域像素——映射到三角面1
      //   var uv2 = [t0,t2,t3];//选中图片一个三角区域像素——映射到三角面2
      //   geometry.faceVertexUvs[0].push(uv1,uv2);//纹理坐标传递给纹理三角面属性
      //   var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      //   scene.add(mesh); //网格模型添加到场景中

      //   //纹理贴图加载成功后，调用渲染函数执行渲染操作
      //   // render();
      // })

      var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体

      var loader = new THREE.CubeTextureLoader();
      // 所有贴图在同一目录下，可以使用该方法设置共用路径
      loader.setPath('/textures/cube/Park3Med/');
      var cubeTexture = loader.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

      scene.background = cubeTexture
      // scene.background = new THREE.Color( 0xff0000 );
      // 立方体纹理加载器返回立方体纹理对象CubeTexture
      //材质对象Material
      var material = new THREE.MeshPhongMaterial({
        //网格模型设置颜色，网格模型颜色和环境贴图会进行融合计算
        // color:0xff0000,
        // 环境贴图反射率   控制环境贴图对被渲染三维模型影响程度
        // reflectivity: 0.1,
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        envMap: cubeTexture, //设置环境贴图
        envMapIntensity: 1,
      });
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      scene.add(mesh); //网格模型添加到场景中


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