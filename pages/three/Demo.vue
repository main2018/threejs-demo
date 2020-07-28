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
    async mounted() {
      
      const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls.js');
      /**
       * 创建场景对象Scene
       */
      var scene = new THREE.Scene();
      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      var AxesHelper = new THREE.AxesHelper(250);
      scene.add(AxesHelper);
      ////////////////////////////
      var geometryPlane = new THREE.PlaneGeometry(993, 717)
      var texture = new THREE.TextureLoader().load('/images/plane.png')
      
      var material = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.DoubleSide,
        // opacity: 1,
        transparent: true,
      })
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      // texture.center.set(0.5, 0.5)
      var mesh = new THREE.Mesh(geometryPlane, material)
      const scale = .5
      mesh.scale.set(scale, scale, scale)
      mesh.rotateX(-0.45 * Math.PI); //旋转网格模型
      // mesh.rotateY(0.2 * Math.PI); //旋转网格模型
      scene.add(mesh)
      

      const groupYuanzhus = new THREE.Group()
      for (let i = 0;i < 6; i++) {
        const groupYunazhu = await this.generateYuanzhu()
        groupYuanzhus.nema = 'groupYuanzhus0'
        groupYuanzhus.add(groupYunazhu)
        groupYunazhu.position.set(60 * i, 0, 0)
        
      }
      groupYuanzhus.rotateY(Math.PI * 0.2)
      groupYuanzhus.translateX(-300)
      groupYuanzhus.translateY(150)
      scene.add(groupYuanzhus);
      console.log('groupYuanzhus', groupYuanzhus);
      
      var box = new THREE.BoxGeometry(50, 50, 50);

      // 立方体几何体box作为EdgesGeometry参数创建一个新的几何体
      var edges = new THREE.EdgesGeometry(box);
      // 立方体线框，不显示中间的斜线
      var edgesMaterial = new THREE.LineBasicMaterial({
        color: '#29c0cb',
      })
      var line = new THREE.LineSegments(edges,edgesMaterial);

      var box1 = new THREE.BoxGeometry(30, 30, 30);
      var material = new THREE.MeshLambertMaterial({
        color: '#29c0cb',
        opacity: 0.6,
        transparent: true,
      })
      var meshBox1 = new THREE.Mesh(box1,material);
      var group = new THREE.Group()
      group.add(line, meshBox1)
      group.rotateY(Math.PI * 0.25)
      group.translateY(25)
      scene.add(group)


      var plane = new THREE.PlaneGeometry(32,256)
      var textureLoader = new THREE.TextureLoader()
      var material = new THREE.MeshPhongMaterial({
        //设置矩形网格模型的纹理贴图(光柱特效、树或草等你想要表达效果对应背景透明纹理贴图)
          map: textureLoader.load('/images/light.jpg'),
          // 双面显示
          side: THREE.DoubleSide,
          // 开启透明效果，否则颜色贴图map的透明不起作用
          transparent: true,
      });
      // 矩形网格1
      var mesh1 = new THREE.Mesh(plane, material);
      // 克隆网格模型mesh1，并旋转90度
      var mesh2 = mesh1.clone().rotateY(Math.PI/2)
      var groupMesh= new THREE.Group()
      groupMesh.add(mesh1,mesh2)
      scene.add(groupMesh)
      groupMesh.rotateY(Math.PI * 0.75)
      groupMesh.rotateX(Math.PI)
      groupMesh.translateY(128 + 25)

      var geometry = new THREE.BoxGeometry(10, 10, 10, 10, 10, 10); 
      var material = new THREE.MeshNormalMaterial({ wireframe: true }); 
      const cube = new THREE.Mesh(geometry, material);
      scene.add( cube );
      
      

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
      // var camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
      var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 10000);
      camera.position.set(0, 300, 500); //设置相机位置
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
      // var controls = new OrbitControls(camera, renderer.domElement);//创建控件对象
      // 已经通过requestAnimationFrame(render);周期性执行render函数，没必要再通过监听鼠标事件执行render函数
      // controls.addEventListener('change', render)
    },
    methods: {
      async generateYuanzhu() {
        var geometry = new THREE.CylinderGeometry(8, 8, 50, 100, 100, true);
        const canvas = this.generateCvs()
        var texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true
        // texture.anisotropy  = 10
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        // uv两个方向纹理重复数量
        // texture.repeat.set(10, 1);
        texture.offset = new THREE.Vector2(0, -0.02)
        var material = new THREE.MeshLambertMaterial({
          map: texture, // 设置纹理贴图
          opacity: 1,
          transparent: true,
        });
        var material1 = new THREE.MeshBasicMaterial({map: texture, transparent: true, opacity: 1,});
        var material2 = new THREE.MeshBasicMaterial({color:'#0000ff'});
        var material3 = new THREE.MeshBasicMaterial({color:'#0000ff'});
        var materialList = [material1, material2, material3];
        var meshT = new THREE.Mesh(geometry, materialList);
        var geometry = new THREE.CylinderGeometry(10, 10, 3, 100, 100, false);
        var material = new THREE.MeshLambertMaterial({
          color: '#29c0cb',
        });
        var meshC = new THREE.Mesh(geometry, material);
        meshC.translateY(-25)
        var geometry = new THREE.CircleGeometry( 15, 32 );
        var material = new THREE.MeshLambertMaterial({
          color: '#29c0cb',
          transparent: true,
          opacity: .6,
          side: THREE.DoubleSide
        });
        var meshB = new THREE.Mesh(geometry, material);
        geometry.rotateX(Math.PI * 0.5)
        geometry.translate(0,-28, 0)
        var loader = new THREE.FontLoader();

        const font = await loader.loadAsync( '/fonts/helvetiker_regular.typeface.json');
        var geometry = new THREE.TextGeometry( 'ThreeJS!', {
          font: font,
          size: 10,
          height: 1,
          curveSegments: 12,
          bevelEnabled: false,
          bevelThickness: 10,
          bevelSize: 8,
          bevelSegments: 5
        } );
        var material = new THREE.MeshLambertMaterial({
          color: '#29c0cb',
        });
        var meshText = new THREE.Mesh(geometry, material);
        
        const groupYuanzhu = new THREE.Group()
        groupYuanzhu.add(meshT, meshC, meshB, meshText)
        return groupYuanzhu
      },
      generateCvs() {
        var canvas=document.createElement('canvas')
        canvas.width = Math.PI * 2 * 25
        canvas.height = 100
        var ctx=canvas.getContext("2d");
        var grad=ctx.createLinearGradient(0,0,0,100); //创建一个渐变色线性对象
        grad.addColorStop(0,"rgba(0,0,0,0)");                  //定义渐变色颜色
        grad.addColorStop(1,"#29c0cb");
        ctx.fillStyle=grad;                         //设置fillStyle为当前的渐变对象
        ctx.fillRect(0,0,Math.PI * 2 * 25,100);
        // document.body.appendChild(canvas)
        return canvas
      }
    },
  }
</script>
<style lang='scss' scoped>
</style>