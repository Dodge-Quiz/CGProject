import * as THREE from '../three.js/build/three.module.js'
import { candle } from './candle.js'
import { scene, currCamera, controls, camera1, camera2, setCamera } from '../index.js'
import { cake_group } from './cake.js'

const raycast = new THREE.Raycaster()
const mouse = new THREE.Vector2()
var world_point = new THREE.Vector3()
var raycast_object, faceindex, candle_count = 0, cake_rotation = 0
let lights_visible = true
let Iscamera1 = true
let spotlightOn = true

export const check_raycast = () =>{
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onMouseClick)
    window.addEventListener('keypress', onKeyUp)

    raycast.setFromCamera(mouse, currCamera)
    const intersects = raycast.intersectObjects(scene.children)

    for(let i = 0; i < intersects.length; i++){
        world_point = intersects[0].point
        raycast_object = intersects[0].object
        faceindex = intersects[0].faceIndex
    }
}

const onMouseClick = () =>{
    if(raycast_object.name === 'top_cake' && candle_count < 5 && inRange(faceindex, 128, 190) && cake_rotation === 0) {
        add_candle()
        candle_count++
    }
}

const onKeyUp = (event) =>{
    switch(event.code){
        case 'KeyS':
            turnOnOffCandle()
            break
        case 'KeyD':
            turnRight()
            break
        case 'KeyA':
            turnLeft()
            break
        case 'Space':
            resetRotation()
            break
        case 'KeyW':
            changetoFPS()
            break
        case 'KeyQ':
            turnOnOffSpotLight()
            break
    }
}

const turnOnOffSpotLight = () =>{
    scene.traverse((object) =>{
        if(object.name === 'spotlight' && spotlightOn) {
            object.visible = false
            spotlightOn = false
        }
        else if(object.name === 'spotlight' && !spotlightOn) {
            object.visible = true
            spotlightOn = true
        }
    })
}

const changetoFPS = () =>{
    if(Iscamera1) {
        setCamera(camera2)
        Iscamera1 = false
        controls.enabled = true
    }
    else {
        setCamera(camera1)
        Iscamera1 = true
        controls.enabled = true
    }
}

const inRange = (x, min, max) =>{
    return x>= min && x<= max
}

const resetRotation = () =>{
    scene.traverse((object) =>{
        if(object.name === 'cake') object.rotation.y = 0
    })
    cake_rotation = 0
}

const turnRight = () =>{
    scene.traverse((object) =>{
        if(object.name === 'cake') object.rotation.y = object.rotation.y + Math.PI/200
    })
    cake_rotation += 200
}

const turnLeft = () =>{
    scene.traverse((object) =>{
        if(object.name === 'cake') object.rotation.y = object.rotation.y + (-Math.PI/200)
    })
    cake_rotation -= 200
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
    clone_candle.name = 'candle'
    cake_group.add(clone_candle)
}

const turnOnOffCandle = () =>{
    if(lights_visible){
        scene.traverse((object) => {
            if(object.name === 'candle_light'){
                object.visible = false
            }
        })
        lights_visible = false
    }
    else{
        scene.traverse((object) => {
            if(object.name === 'candle_light' && !lights_visible){
                object.visible = true 
            }
        })
        lights_visible = true
    }
}

const onMouseMove = (event) =>{
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}