import { scene } from '../index.js'
import {GLTFLoader} from '../three.js/examples/jsm/loaders/GLTFLoader.js'

export const camera_model = () =>{

    const loader = new GLTFLoader()
    loader.load(
        '../assets/3dmodel/model.gltf',
        function (gltf){
            const camera_model = gltf.scene
            camera_model.scale.set(1, 1, 1)
            camera_model.position.set(20, -2, 0)
            camera_model.rotation.set(0, -Math.PI/2, 0)
            scene.add(camera_model)
        }
    )
}   