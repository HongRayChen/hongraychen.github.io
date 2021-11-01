import * as THREE from "../../assets/THREE/src/Three.js";
import { OrbitControls } from "../../assets/THREE/examples/jsm/controls/OrbitControls.js";

import { GCodeLoader } from '../../assets/THREE/examples/jsm/loaders/GCodeLoader.js';

let camera, scene, renderer;

init();
render();

function init() {

    // const container = document.createElement('div');
    // document.body.appendChild(container);

        /** @type{number} */
        let wid = 700; // window.innerWidth;
        /** @type{number} */
        let ht = 500; // window.innerHeight;
    camera = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
    camera.position.set(20, 40, 40);

    scene = new THREE.Scene();
    
    const loader = new GCodeLoader();
    loader.load('/assets/demo.gcode', function (object) {

        object.position.set(0, 0, 0);
        scene.add(object);

        render();

    });

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(wid, ht);
    //container.appendChild(renderer.domElement);
    document.getElementById("gcode").appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 1;
    controls.maxDistance = 100;
    
    window.addEventListener('resize', resize);

}

function resize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();

}

function render() {

    renderer.render(scene, camera);
}
