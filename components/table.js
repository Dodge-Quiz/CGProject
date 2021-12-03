import * as THREE from '../three.js/build/three.module.js'

export const table = () =>{

    const table = new THREE.Group()

    let geometry = new THREE.CylinderGeometry(12, 12, 1.2, 8)
    let texture = new THREE.TextureLoader().load('../assets/textures/wood_texture.jpg')
    let normal_texture = new THREE.TextureLoader().load('../assets/textures/wood_normal.png')
    let material = new THREE.MeshPhongMaterial({
        map : texture,
        normalMap : normal_texture
    })
    let top_part = new THREE.Mesh(geometry, material)
    top_part.receiveShadow = true
    top_part.castShadow = true

    geometry = new THREE.CylinderGeometry(1, 1, 16, 64)
    texture = new THREE.TextureLoader().load('../assets/textures/wood_texture.jpg')
    normal_texture = new THREE.TextureLoader().load('../assets/textures/wood_normal.png')
    material = new THREE.MeshPhongMaterial({
        map : texture,
        normalMap : normal_texture
    })
    let leg_part = new THREE.Mesh(geometry, material)
    leg_part.receiveShadow = true
    leg_part.castShadow = true

    geometry = new THREE.CylinderGeometry(5, 5, 1, 8)
    texture = new THREE.TextureLoader().load('../assets/textures/wood_texture.jpg')
    normal_texture = new THREE.TextureLoader().load('../assets/textures/wood_normal.png')
    material = new THREE.MeshPhongMaterial({
        map : texture,
        normalMap : normal_texture
    })
    let bottom_part = new THREE.Mesh(geometry, material)
    bottom_part.receiveShadow = true
    bottom_part.castShadow = true

    top_part.position.set(0, 0, 0)
    leg_part.position.set(0, -8.5, 0)
    bottom_part.position.set(0, -15, 0)

    table.add(top_part)
    table.add(leg_part)
    table.add(bottom_part)

    return table
}