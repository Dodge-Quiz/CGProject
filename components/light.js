import { scene } from '../index.js'
import * as THREE from '../three.js/build/three.module.js'

export const light = () =>{
    let ambient_light = new THREE.AmbientLight(0xE8DC8B, 0.3)

    let spot_light = new THREE.SpotLight(0xE8DC8B, 1, 1000, Math.PI/8)
    spot_light.position.set(20, 30, 0)

    return ambient_light, spot_light
}