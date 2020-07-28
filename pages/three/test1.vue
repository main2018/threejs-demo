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
      // 方法1
      var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
      //参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
      var arc = new THREE.ArcCurve(0, 0, 100, 0, Math.PI);
      //getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
      var points = arc.getPoints(50);//分段数50，返回51个顶点
      // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
      geometry.setFromPoints(points);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0x000000
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      scene.add(line); //线条对象添加到场景中

      // 方法2
      var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
      var R = 50; //圆弧半径
      var N = 50; //分段数量
      // 批量生成圆弧上的顶点数据
      for (var i = 0; i < N; i++) {
        var angle = 2 * Math.PI / N * i;
        var x = R * Math.sin(angle);
        var y = R * Math.cos(angle);
        geometry.vertices.push(new THREE.Vector3(x, y, 0));
      }
      // 插入最后一个点，line渲染模式下，产生闭合效果
      // geometry.vertices.push(geometry.vertices[0])
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0x000000
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      scene.add(line); //线条对象添加到场景中

      // 绘制直线
      var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
      var p1 = new THREE.Vector3(50, 0, 0); //顶点1坐标
      var p2 = new THREE.Vector3(0, 70, 0); //顶点2坐标
      //顶点坐标添加到geometry对象
      geometry.vertices.push(p1, p2);
      var material = new THREE.LineBasicMaterial({
        color: 0xff00ff,
      });//材质对象
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      scene.add(line); //线条对象添加到场景中
      
      //绘制三维直线
      var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
      var p1 = new THREE.Vector3(50, 0, 0); //顶点1坐标
      var p2 = new THREE.Vector3(0, 80, 0); //顶点2坐标
      // 三维直线LineCurve3
      var LineCurve = new THREE.LineCurve3(p1, p2);
      // 二维直线LineCurve
      // var LineCurve = new THREE.LineCurve(new THREE.Vector2(50, 0), new THREE.Vector2(0, 80));
      var pointArr = LineCurve.getPoints(10);
      geometry.setFromPoints(pointArr);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0x000000
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      scene.add(line); //线条对象添加到场景中

      // 样条曲线
      var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
      // 三维样条曲线  Catmull-Rom算法
      var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-50, 20, 90),
        new THREE.Vector3(-10, 40, 40),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(60, -60, 0),
        new THREE.Vector3(70, 0, 80)
      ]);
      //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
      var points = curve.getPoints(100); //分段数100，返回101个顶点
      // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
      geometry.setFromPoints(points);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0x000000
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      scene.add(line); //线条对象添加到场景中

      // 贝塞尔曲线
      var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry

      // 三维二次贝赛尔曲线
      var p1 = new THREE.Vector3(-80, 0, 0);
      var p2 = new THREE.Vector3(20, 100, 0);
      var p3 = new THREE.Vector3(80, 0, 0);
      var curve = new THREE.QuadraticBezierCurve3(p1, p2, p3);
      //////////////////
      // // 三维三次贝赛尔曲线
      // var p1 = new THREE.Vector3(-80, 0, 0);
      // var p2 = new THREE.Vector3(-40, 100, 0);
      // var p3 = new THREE.Vector3(40, 100, 0);
      // var p4 = new THREE.Vector3(80, 0, 0);
      // var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
      ///////////////////

      //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
      var points = curve.getPoints(100); //分段数100，返回101个顶点
      // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
      geometry.setFromPoints(points);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0x0000ff
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      scene.add(line); //线条对象添加到场景中

      // !!组合曲线
      // 绘制一个U型轮廓
      var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
      var R = 80;//圆弧半径
      var arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
      // 半圆弧的一个端点作为直线的一个端点
      var line1 = new THREE.LineCurve(new THREE.Vector2(R, 200, 0), new THREE.Vector2(R, 0, 0));
      var line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0, 0), new THREE.Vector2(-R, 200, 0));
      // 创建组合曲线对象CurvePath
      var CurvePath = new THREE.CurvePath();
      // 把多个线条插入到CurvePath中
      CurvePath.curves.push(line1, arc, line2);
      //分段数200
      var points = CurvePath.getPoints(200);
      // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
      geometry.setFromPoints(points);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0x00ffff
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      scene.add(line); //线条对象添加到场景中

      //创建管道成型的路径(3D样条曲线)
      var path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-10, -50, -50),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(8, 50, 50),
        new THREE.Vector3(-5, 0, 100)
      ]);
      // path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
      var geometry = new THREE.TubeGeometry(path, 40, 2, 25);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0x0000ff
      });
      //线条模型对象
      var Mesh = new THREE.Mesh(geometry, material);
      scene.add(Mesh); //线条对象添加到场景中

      /**
       * 创建旋转网格模型
       */
      var points = [
          new THREE.Vector2(50,60),
          new THREE.Vector2(25,0),
          new THREE.Vector2(50,-60)
      ];
      var geometry = new THREE.LatheGeometry(points,30);

      // 样条曲线插值计算 得到一个光滑的旋转曲面。
      // var shape = new THREE.Shape();//创建Shape对象
      // var points = [//定位定点
      //     new THREE.Vector2(50,60),
      //     new THREE.Vector2(25,0),
      //     new THREE.Vector2(50,-60)
      // ];
      // shape.splineThru(points);//顶点带入样条插值计算函数
      // var splinePoints = shape.getPoints(20);//插值计算细分数20
      // var geometry = new THREE.LatheGeometry(splinePoints,30);//旋转造型

      var material=new THREE.MeshPhongMaterial({
          color:0x0000ff,//三角面颜色
          side:THREE.DoubleSide//两面可见
      });//材质对象
      material.wireframe = true;//线条模式渲染(查看细分数)
      var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
      scene.add(mesh);//旋转网格模型添加到场景中

      var points = [
        new THREE.Vector2(-50, -50),
        new THREE.Vector2(-60, 0),
        new THREE.Vector2(0, 50),
        new THREE.Vector2(60, 0),
        new THREE.Vector2(50, -50),
        new THREE.Vector2(-50, -50),
      ]
      // 通过顶点定义轮廓
      var shape = new THREE.Shape(points);

      // // 通过shpae基类path的方法绘制轮廓（本质也是生成顶点）
      // var shape = new THREE.Shape();
      // shape.absarc(0,0,100,0,2*Math.PI);//圆弧轮廓
      // console.log(shape.getPoints(15));//查看shape顶点数据

      // shape可以理解为一个需要填充轮廓
      // 所谓填充：ShapeGeometry算法利用顶点计算出三角面face3数据填充轮廓
      var geometry = new THREE.ShapeGeometry(shape, 25);
      var material=new THREE.MeshPhongMaterial({
          color:0x00ff00,//三角面颜色
          side:THREE.DoubleSide,//两面可见
          wireframe: true,
      });//材质对象
      var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
      scene.add(mesh);//旋转网格模型添加到场景中

      /**
       * 创建拉伸网格模型
       */
      var shape = new THREE.Shape();
      /**四条直线绘制一个矩形轮廓*/
      shape.moveTo(0,0);//起点
      shape.lineTo(0,100);//第2点
      shape.lineTo(100,100);//第3点
      shape.lineTo(100,0);//第4点
      shape.lineTo(0,0);//第5点
      var geometry = new THREE.ExtrudeGeometry(//拉伸造型
        shape,//二维轮廓
        //拉伸参数
        {
          amount:120,//拉伸长度
          bevelEnabled:false//无倒角
        }
      );

      /**
      * 创建扫描网格模型
      */
      var shape = new THREE.Shape();
      /**四条直线绘制一个矩形轮廓*/
      shape.moveTo(0,0);//起点
      shape.lineTo(0,10);//第2点
      shape.lineTo(10,10);//第3点
      shape.lineTo(10,0);//第4点
      shape.lineTo(0,0);//第5点
      /**创建轮廓的扫描轨迹(3D样条曲线)*/
      var curve = new THREE.SplineCurve3([
        new THREE.Vector3( -10, -50, -50 ),
        new THREE.Vector3( 10, 0, 0 ),
        new THREE.Vector3( 8, 50, 50 ),
        new THREE.Vector3( -5, 0, 100)
      ]);
      var geometry = new THREE.ExtrudeGeometry(//拉伸造型
        shape,//二维轮廓
        //拉伸参数
        {
            bevelEnabled:false,//无倒角
            extrudePath:curve,//选择扫描轨迹
            steps:50//扫描方向细分数
        }
      );
      geometry.scale(2, 2, 2)

      var material=new THREE.MeshPhongMaterial({
          color:0x00ff00,//三角面颜色
          side:THREE.DoubleSide,//两面可见
          wireframe: true,
      });//材质对象
      var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
      scene.add(mesh);//旋转网格模型添加到场景中

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