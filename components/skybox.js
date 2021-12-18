import * as THREE from '../three.js/build/three.module.js'

function addSkyBox(scene) {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './assets/skyboxes/Vasa/px.jpg',
        './assets/skyboxes/Vasa/nx.jpg',
        './assets/skyboxes/Vasa/py.jpg',
        './assets/skyboxes/Vasa/ny.jpg',
        './assets/skyboxes/Vasa/pz.jpg',
        './assets/skyboxes/Vasa/nz.jpg',
    ]);
    scene.background = texture;
}

export { addSkyBox }