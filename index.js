import * as THREE from './three.js/build/three.module.js'
import { light } from './components/light.js'

export var scene, camera, renderer

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

    /*Code Here*/

    scene.add(light())
}

var doRender = () => {
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


