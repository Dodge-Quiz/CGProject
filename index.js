import { light } from './components/light.js'
import { table } from './components/table.js'
import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import { cake } from './components/cake.js'
import { camera_model } from './components/camera_model.js'
import { check_raycast } from './components/raycast.js'

export var scene, camera1, camera2, renderer, currCamera, controls

export const setCamera = (tocamera) =>{
    currCamera = tocamera
}

var doInit = () => {
    scene = new THREE.Scene()

    const FOV = 75
    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight
    const ASPECT =  WIDTH / HEIGHT

    camera1 = new THREE.PerspectiveCamera(FOV, ASPECT)  
    camera1.position.set(16, 12, -8)
    camera1.lookAt(0, 0, 0)

    camera2 = new THREE.PerspectiveCamera(FOV, ASPECT)
    camera2.position.set(20, 4, 0)
    camera2.lookAt(0, 0, 0)
    
    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(WIDTH, HEIGHT)
    renderer.setClearColor(0x303030)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = 2

    currCamera = camera1

    document.body.appendChild(renderer.domElement)

    controls = new OrbitControls(currCamera, renderer.domElement)
    camera_model()

    /*Code Here*/

    scene.add(table())
    scene.add(light())
    scene.add(cake())
}

var doRender = () => {
    controls.update()
    check_raycast()

    requestAnimationFrame(doRender)
    renderer.render(scene, currCamera)
}

window.onload = () => {
    doInit()
    doRender()
}

window.onresize = () => {
    const newW = innerWidth
    const newH = innerHeight

    renderer.setSize(newW, newH)

    currCamera.aspect = newW / newH
    currCamera.updateProjectionMatrix()
}