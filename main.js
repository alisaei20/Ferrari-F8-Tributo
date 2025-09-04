
import * as THREE from './vender/three.module.js';
import { GLTFLoader } from './vender/GLTFLoader.js';
import { OrbitControls } from './vender/OrbitControls.js';



const scene = new THREE.Scene();
scene.background = new THREE.Color('#000528');
const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 1000);
camera.position.set(8, 6, 7);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

let model = null;
let bodyPaintMesh = null; 








// responsive


const view3d = document.querySelector('.view-3d');
if (view3d) {
   
    const containerRect = view3d.getBoundingClientRect();
    renderer.setSize(containerRect.width - 10, containerRect.height - 10);
    
  
    camera.aspect = (containerRect.width - 10) / (containerRect.height - 10);
    camera.updateProjectionMatrix();
    
    view3d.appendChild(renderer.domElement);
    

    const resizeObserver = new ResizeObserver(() => {
        const newRect = view3d.getBoundingClientRect();
        renderer.setSize(newRect.width - 10, newRect.height - 10);
        camera.aspect = (newRect.width - 10) / (newRect.height - 10);
        camera.updateProjectionMatrix();
    });
    resizeObserver.observe(view3d);
}


 




// upload model


const gltfLoader = new GLTFLoader();
gltfLoader.load('./assets/ferrarif8tributo.glb', function(gltf) {
    const object = gltf.scene;
    object.scale.set(150, 150,150);
    object.position.set(-1, -1, -1);
    object.rotation.y = 0.85  
    scene.add(object);
    model = object;

   // find body mesh
    object.traverse(function(child) {
        if (child.isMesh) {
            if (child.name === "bodyPaint_Geo_lodA_Ferrari_F8TributoRewardRecycled_2020Paint_Material_0") {
                bodyPaintMesh = child; 
            }
        }
    });
});



// change body paint color

function changeBodyPaintColor(hexColor) {
    if (bodyPaintMesh) {
        bodyPaintMesh.material.color.set(hexColor);
        bodyPaintMesh.material.needsUpdate = true;
    }
}

document.querySelectorAll('[data-color]').forEach(btn => {
    btn.addEventListener('click', function() {
        const color = this.getAttribute('data-color');
        changeBodyPaintColor(color);
    });
});





// controls


//   OrbitControls
let controls = null;
if (view3d) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false; 
    controls.minDistance = 2;
    controls.maxDistance = 20;
    controls.target.set(-1, -1, -1);
}

function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update();
    renderer.render(scene, camera);
}
animate();








// load animation , header //


document.querySelector('.under-the-hood').addEventListener('click', function(e) {
    e.preventDefault()

    const orderSection = document.querySelector('.specification')
    orderSection.scrollIntoView({ 
        behavior: 'smooth', block: 'start'    
    })
})




document.querySelector('.threeD-view').addEventListener('click', function(e) {
    e.preventDefault()

    const orderSection = document.querySelector('.view-3d')
    orderSection.scrollIntoView({ 
        behavior: 'smooth', block: 'center'    
    
    })
})




document.addEventListener('DOMContentLoaded', function() {
  const elements = [
    document.querySelector('.Ferrari-Sf90'),
    document.querySelector('.Ferrari-car'),
    document.querySelector('.description')
  ];

  elements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('show');
    }, 300 + i * 400); 
  });
});
