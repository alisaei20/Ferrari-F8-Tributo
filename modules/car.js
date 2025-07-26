import * as THREE from '../vender/three.module.js';
import { GLTFLoader } from '../vender/GLTFLoader.js';
import { OrbitControls } from '../vender/OrbitControls.js';




// export function loadCarModel() {
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);

//   const light = new THREE.HemisphereLight(0xffffff, 0x444444);
//   scene.add(light);

//   const loader = new GLTFLoader();
//   loader.load('assets/ferrarif8tributo.glb', (gltf) => {
//     scene.add(gltf.scene);
//     camera.position.z = 5;
//     animate();
//   }, undefined, (error) => {
//     console.error("GLTF load error:", error);
//   });

//   function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//   }
// }





















