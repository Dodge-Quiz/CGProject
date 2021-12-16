import * as THREE from '../three.js/build/three.module.js'
import { FontLoader } from '../three.js/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from '../three.js/examples/jsm/geometries/TextGeometry.js'

const cake_group = new THREE.Group()

export const cake = () =>{
    let geometry, material, texture, normal_texture

    texture = new THREE.TextureLoader().load('../assets/textures/frosting_texture.jpg')
    normal_texture = new THREE.TextureLoader().load('../assets/textures/frosting_normal.png')

    geometry = new THREE.CylinderGeometry(7, 7, 0.5, 64)
    material = new THREE.MeshPhongMaterial({
        shininess: 64,
        reflectivity: 1
    })
    let plate = new THREE.Mesh(geometry, material)
    plate.castShadow = true
    plate.receiveShadow = true
    plate.position.set(0, 0.8, 0)

    geometry = new THREE.CylinderGeometry(5, 5, 4, 64)
    material = new THREE.MeshPhongMaterial({
        map: texture,
        normalMap: normal_texture
    })
    let bottom_cake = new THREE.Mesh(geometry, material)
    bottom_cake.castShadow = true
    bottom_cake.receiveShadow = true
    bottom_cake.position.set(0, 3.1, 0)

    geometry = new THREE.CylinderGeometry(3, 3, 4, 64)
    material = new THREE.MeshPhongMaterial({
        map: texture,
        normalMap: normal_texture
    })
    let top_cake = new THREE.Mesh(geometry, material)
    top_cake.castShadow = true
    top_cake.receiveShadow = true
    top_cake.name = 'top_cake'
    top_cake.position.set(0, 6.8, 0)

    text()

    for (let i = 0; i < 10; i++){
        let cream_tmp1 = cream()
        let chocolate_ball_tmp1 = chocolate_ball()
        let cream_tmp2 = cream()
        let chocolate_ball_tmp2 = chocolate_ball()

        cream_tmp1.position.set(x(3, 0.3, i+1, 10), 8.8, z(3, 0.3, i+1, 10))
        chocolate_ball_tmp1.position.set(x(3, 0.3, i+1, 10), 9.6, z(3, 0.3, i+1, 10))

        cake_group.add(cream_tmp1)
        cake_group.add(chocolate_ball_tmp1)

        cream_tmp2.position.set(x(5, 0.3, i+1, 10), 5.4, z(5, 0.3, i+1, 10))
        chocolate_ball_tmp2.position.set(x(5, 0.3, i+1, 10), 6.2, z(5, 0.3, i+1, 10))

        cake_group.add(cream_tmp2)
        cake_group.add(chocolate_ball_tmp2)
    }

    cake_group.add(plate)
    cake_group.add(bottom_cake)
    cake_group.add(top_cake)

    return cake_group
}

export const chocolate_ball = () =>{
    let geometry = new THREE.SphereGeometry(0.3, 32, 32)
    let material = new THREE.MeshPhongMaterial({
        color: 0x5E350C
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.receiveShadow = true
    mesh.castShadow = true

    return mesh
}

export const cream = () =>{
    let geometry = new THREE.TorusGeometry(0.3, 0.3, 30, 64)
    let material = new THREE.MeshPhongMaterial()
    let mesh = new THREE.Mesh(geometry, material)

    mesh.rotation.set(0, Math.PI/2, 0)

    mesh.receiveShadow = true
    mesh.castShadow = true

    return mesh
}

const text = () =>{
    let words = 'Happy Birthday'
    let text = new FontLoader().load(
        '../three.js/examples/fonts/helvetiker_bold.typeface.json', (font) =>{
            let geometry = new TextGeometry(words, {
                font: font,
                size: 0.4,
                height: 0.1
            })
            let material = new THREE.MeshBasicMaterial({
                color: 0xD65645
            })
            let mesh = new THREE.Mesh(geometry, material)
            mesh.rotation.set(-Math.PI/8, Math.PI/2, 0)
            mesh.position.set(0, 10, 2)
            mesh.castShadow = true
            mesh.receiveShadow = true

            cake_group.add(mesh)
        }
    )
}

const x = (cake_radius, decoration_size, n, total_decoration) =>{
    let x = (cake_radius - decoration_size * 2 - 0.1) * Math.sin(n * 360 / total_decoration)
    return x
}

const z = (cake_radius, decoration_size, n, total_decoration) =>{
    let z = (cake_radius - decoration_size * 2 - 0.1) * Math.cos(n * 360 / total_decoration)
    return z
}