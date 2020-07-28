<template>
  <div class="container">
    <ul>
      <li><nuxt-link to="/three/model">Model 模型加载</nuxt-link></li>
      <li><nuxt-link to="/three/Demo">Demo</nuxt-link></li>
      <li><nuxt-link to="/three/Gravity">重力</nuxt-link></li>
      <li><nuxt-link to="/three/morphTargets">变形动画</nuxt-link></li>
      <li><nuxt-link to="/three/sprite">帧动画</nuxt-link></li>
      <li><nuxt-link to="/three/Texture">纹理贴图</nuxt-link></li>
      <li><nuxt-link to="/three/test1">Three.js几何体对象、曲线、三维模型</nuxt-link></li>
      <li><nuxt-link to="/three/test">Test基础测试</nuxt-link></li>
      <li><nuxt-link to="/three/mechanic">机器人</nuxt-link></li>
      <li><nuxt-link to="/three/zhongdian">zhongdian 比赛</nuxt-link></li>
      <li><nuxt-link to="/three/quanjing">全景 桥</nuxt-link></li>
      <li><nuxt-link to="/three/quanjing">全景 桥</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
