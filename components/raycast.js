import * as THREE from '../three.js/build/three.module.js'
import { candle } from './candle.js'
import { camera } from '../index.js'

const raycast = new THREE.Raycaster()
const mouse = new THREE.Vector2()
var world_point = new THREE.Vector3()
var raycast_object, faceindex

export const check_raycast = () =>{
    const intersects = raycast.intersectObjects(scene.children)
    world_point = intersects[0].point 
    raycast_object = intersects[0].object
    faceindex = intersects[0].faceindex

    if(raycast_object.name === 'top_cake' && faceindex === 1){
        document.addEventListener('click', function(){
            add_candle()
        , false})
    }

    raycast.setFromCamera(mouse, camera)
}

const add_candle = () =>{
    let clone_candle

    clone_candle = candle().clone()
    clone_candle.traverse((node) =>{
        if(node.isMesh){
            node.material = node.material.clone()
        }
    })
    clone_candle.position.set(world_point.x, world_point.y, world_point.z)
}

function onMouseMOve(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 -1 
}