import * as THREE from '../three.js/build/three.module.js'

export const candle = () =>{

    let candle = new THREE.Group()

    let geometry = new THREE.ConeGeometry(0.05, 0.1, 64)
    let texture = new THREE.TextureLoader().load('../assets/textures/candle_texture.jpg')
    let material = new THREE.MeshPhongMaterial({
        map : texture
    })
    let object = new THREE.Mesh(geometry, material)
    object.receiveShadow = true
    object.castShadow = true
    object.name = 'candle'

    candle.add(object)

    geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 64)
    texture = new THREE.TextureLoader().load('../assets/textures/candle_texture.jpg')
    material = new THREE.MeshPhongMaterial({
        map : texture
    })
    object = new THREE.Mesh(geometry, material)
    object.receiveShadow = true
    object.castShadow = true
    object.position.set(0, -0.3, 0)
    object.name = 'candle'

    candle.add(object)

    let light = new THREE.PointLight(0xE65C2C, 1, 8)
    light.position.set(0, 0.1, 0)
    light.name = 'candle_light'

    candle.add(light)

    return candle
}