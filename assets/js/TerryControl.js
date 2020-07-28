import * as THREE from 'three'

import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

export default class TerryControl {
	constructor(camera, dom, floor) {
	    this.camera = camera
		this.dom = dom
		this.floor = floor
		this.moveState = {
			w:false,
			s:false,
			a:false,
			d:false,
			" ":false //空格
		}
		
		this.fallState = false
		//不许跳跃
		this.canJmp = false
		this.cameraState = {
			y:20,
			vy:0, //速度
			g: -0.08 //加速度
		}
		
		this.tinit()
	}
	
	tinit(){
		this.pointLockControls = new PointerLockControls(this.camera,this.dom)
		this.dom.addEventListener('click', () => {
			this.pointLockControls.lock()
		})
		
		this.pointLockControls.addEventListener('lock', () => {
			console.log('game start');
			if(!this.animate){
				// this.animation()
			}
			this.fallState = true
		})
		
		this.pointLockControls.addEventListener('unlock', () => {
			console.log('game end');
			this.fallState = false
			cancelAnimationFrame(this.animate)
			this.animate = null
		})
		
		//wasd
		window.addEventListener('keydown', (e) => {
			
			let key = e.key.toLocaleLowerCase()
			if(this.moveState[key] === false){
				this.moveState[key] = true
			}
			
		})
		
		window.addEventListener('keyup', (e) => {
			
			let key = e.key.toLocaleLowerCase()
			if(this.moveState[key] === true){
				this.moveState[key] = false
			}
			
		})
	}
	
	reset(){
		this.cameraState = {
			y:20,
			vy:0, //速度
			g: -0.08 //加速度
		}
		this.camera.position.set(0,0,0)
	}
	
	update(){
		const speed = 1
		if(this.moveState.w){
			this.camera.translateZ(-speed)
		}
		if(this.moveState.s){
			this.camera.translateZ(speed)
		}
		if(this.moveState.d){
			this.camera.translateX(speed)
		}
		if(this.moveState.a){
			this.camera.translateX(-speed)
		}
		if(this.moveState[" "]){
			if(this.canJump){
				this.canJump = true
				this.cameraState.vy = 2
				this.fallState = true
			}
		}
		
		this.falling()
		this.checkCube()
	}
	
	falling() {
		if(this.fallState){
			this.cameraState.vy += this.cameraState.g 
			this.cameraState.y += this.cameraState.vy
			this.camera.position.y = this.cameraState.y
		}else {
			this.canJump = true
			this.cameraState.vy = 0
		}
	}
	
	checkCube(){
		
		this.raycst = new THREE.Raycaster(
			this.camera.position,
			new THREE.Vector3(0,-1,0)
		)
		let arr = this.raycst.intersectObjects(this.floor)
		// console.log(arr);
		if(arr[0] && arr[0].distance < 20){
			this.fallState = false
			this.camera.position.y = arr[0].object.position.y + 20
			this.cameraState.vy = 0
		}
	}
}