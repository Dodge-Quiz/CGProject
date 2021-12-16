import * as THREE from '../three.js/build/three.module.js'
import { candle } from './candle.js'
import { camera, scene } from '../index.js'

const raycast = new THREE.Raycaster()
const mouse = new THREE.Vector2()
var world_point = new THREE.Vector3()
var raycast_object, faceindex, candle_count = 0

export const check_raycast = () =>{
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onMouseClick)

    raycast.setFromCamera(mouse, camera)
    const intersects = raycast.intersectObjects(scene.children)

    for(let i = 0; i < intersects.length; i++){
        world_point = intersects[0].point
        raycast_object = intersects[0].object
        faceindex = intersects[0].faceIndex
    }
}

const onMouseClick = () =>{
    if(raycast_object.name === 'top_cake' && candle_count < 5 && inRange(faceindex, 128, 190)) {
        add_candle()
        candle_count++
    }
}

const inRange = (x, min, max) =>{
    return x>= min && x<= max
}

const add_candle = () =>{
    let clone_candle

    clone_candle = candle().clone()
    clone_candle.traverse((node) =>{
        if(node.isMesh){
            node.material = node.material.clone()
        }
    })
    clone_candle.position.set(world_point.x, world_point.y + 0.5, world_point.z)
    scene.add(clone_candle)
}

const onMouseMove = (event) =>{
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}