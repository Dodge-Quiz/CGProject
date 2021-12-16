import { light } from './components/light.js'
import { table } from './components/table.js'
import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import { cake } from './components/cake.js'
import { camera_model } from './components/camera_model.js'
import { check_raycast } from './components/raycast.js'

export var scene, camera, renderer

var controls

var doInit = () => {
    scene = new THREE.Scene()

    const FOV = 75
    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight
    const ASPECT =  WIDTH / HEIGHT

    camera = new THREE.PerspectiveCamera(FOV, ASPECT)  
    camera.position.set(16, 12, -8)
    camera.lookAt(0, 0, 0)
    
    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(WIDTH, HEIGHT)
    renderer.setClearColor(0x303030)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = 2

    document.body.appendChild(renderer.domElement)

    controls = new OrbitControls(camera, renderer.domElement)
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
    renderer.render(scene, camera)
}

window.onload = () => {
    doInit()
    doRender()
}

window.onresize = () => {
    const newW = innerWidth
    const newH = innerHeight

    renderer.setSize(newW, newH)

    camera.aspect = newW / newH
    camera.updateProjectionMatrix()
}


