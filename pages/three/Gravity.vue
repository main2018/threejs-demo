<template>
  <div class=''>
  </div>
</template>

<script>
  import * as THREE from 'three'
  export default {
    data() {
      return {
        cubeList: []
      }
    },
    mounted() {
      const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls.js');
      const {default: TerryControl} = require('~/assets/js/TerryControl.js');
      this.TerryControl = TerryControl
      console.log('TerryControl', TerryControl);
      

      /**
       * 创建场景对象Scene
       */
      var scene = new THREE.Scene();
      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      var AxesHelper = new THREE.AxesHelper(250);
      scene.add(AxesHelper);
      this.scene = scene
      //////////////////////////////
  

      

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
      var camera = new THREE.PerspectiveCamera(75, k, 1, 1000);
      camera.position.set(500, 500, 500); //设置相机位置
      // camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
      this.camera = camera
      camera.lookAt(new THREE.Vector3(0,0,0))
      /**
       * 创建渲染器对象
       */
      var renderer = new THREE.WebGLRenderer({antialias:true});
      renderer.setSize(width, height);//设置渲染区域尺寸
      renderer.setClearColor(new THREE.Color(0xffffff));//设置窗口背景颜色为黑
      renderer.shadowMapEnabled = true;//开启阴影，加上阴影渲染
      this.renderer = renderer
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
      this.controls = controls
      // 已经通过requestAnimationFrame(render);周期性执行render函数，没必要再通过监听鼠标事件执行render函数
      // controls.addEventListener('change', render)
      this.init()
      window.onresize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
		    camera.updateProjectionMatrix()
		    renderer.setSize(window.innerWidth,window.innerHeight)
      }
    },
    methods: {
      laoderObj(){
        this.cubeList = []
        for(let i = 0;i<20;i++){
          
          for(let j = 0;j< 20;j++){
            const geometry = new THREE.BoxGeometry(10,10,10)
            const material = new THREE.MeshLambertMaterial({
              color: new THREE.Color(0xff0000 * Math.random())
            })
            
            const mesh = new THREE.Mesh(geometry,material)
            
            mesh.position.set(
              i * 10,
              -5,
              j * 10
            )
            // mesh.lookAt(0,0,0)
            this.cubeList.push(mesh)
          }
          
        }
        
        for(let l = 0;l< 20;l++){
          const geometrys = new THREE.BoxGeometry(10,10,10)
          const materials = new THREE.MeshLambertMaterial({
            color: new THREE.Color(0xff0000 * Math.random())
          })
          
          const meshs = new THREE.Mesh(geometrys,materials)
          
          meshs.position.set(
            90 + l * 10,
            5 + l * 10,
            90
          )
          this.cubeList.push(meshs)
        }
        
        
        
      },
      
      getBackgorund(){
        const loader = new THREE.CubeTextureLoader()
        const bgTexture = loader.setPath('/textures/cube/Bridge2/')
        .load([
          'posx.jpg',
          'negx.jpg',
          'posy.jpg',
          'negy.jpg',
          'posz.jpg',
          'negz.jpg',
        ])
        this.scene.background = bgTexture
      },
      animate(renderer,scene,camera,controls){
        renderer.render(scene,camera)
        controls.update()
        // this.degree += 0.01
        // this.hemisphereLight.position.set(Math.sin(this.degree),Math.cos(this.degree),0)
        
        this.animates = requestAnimationFrame(() => {
          this.animate(renderer,scene,camera,controls)
        })
      },
      
      
      addLight(){
        this.scene.add(new THREE.AmbientLight(0xffffff))
        
      },
      //半球光  日夜更替
      addHemisphereLight(){
        const hemisphere = new THREE.HemisphereLight(0xffffff, 0x000000, 1)
        this.scene.add(hemisphere)
        return hemisphere
      },
      
      addControls(){
        this.controls = new this.TerryControl(this.camera,this.renderer.domElement,this.cubeList)
        
      },
      init(){
        //this.getBackgorund()
        this.laoderObj()
        this.scene.add(...this.cubeList)
        this.addControls()
        this.addLight()
        this.camera.position.set(100,20,100)
        this.camera.lookAt(0,0,0)
        this.scene.background = new THREE.Color(0xeaeaea)
        // this.hemisphereLight = this.addHemisphereLight()
        // this.degree = 0
        this.animate(this.renderer,this.scene,this.camera,this.controls)
      }
    },
  }
</script>
<style lang='scss' scoped>
</style>