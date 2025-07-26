
import * as THREE from './vender/three.module.js';
import { GLTFLoader } from './vender/GLTFLoader.js';
import { OrbitControls } from './vender/OrbitControls.js';
// import ferrariModelUrl from './assets/ferrarif8tributo.glb';


const scene = new THREE.Scene();
scene.background = new THREE.Color('#000528');
const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });





// Find the .view-3d element and append the renderer's DOM element
const view3d = document.querySelector('.view-3d');
if (view3d) {
    // Get parent container dimensions and subtract 10 pixels from each dimension
    const containerRect = view3d.getBoundingClientRect();
    renderer.setSize(containerRect.width - 10, containerRect.height - 10);
    
    // Update camera aspect ratio
    camera.aspect = (containerRect.width - 10) / (containerRect.height - 10);
    camera.updateProjectionMatrix();
    
    view3d.appendChild(renderer.domElement);
    
    // Make renderer responsive to container size changes
    const resizeObserver = new ResizeObserver(() => {
        const newRect = view3d.getBoundingClientRect();
        renderer.setSize(newRect.width - 10, newRect.height - 10);
        camera.aspect = (newRect.width - 10) / (newRect.height - 10);
        camera.updateProjectionMatrix();
    });
    resizeObserver.observe(view3d);
}




// نور اضافه کن تا مدل بهتر دیده شود
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

let model = null;
let bodyPaintMesh = null; // مش مورد نظر برای تغییر رنگ










// اضافه کردن OrbitControls
let controls = null;
if (view3d) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false; // اگر فقط چرخش و زوم می‌خواهید
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







// بارگذاری مدل GLB جدید Ferrari
const gltfLoader = new GLTFLoader();
gltfLoader.load('./assets/ferrarif8tributo.glb', function(gltf) {
    const object = gltf.scene;
    object.scale.set(150, 150,150);
    object.position.set(-1, -1, -1);
    object.rotation.y = 0.85; // مدل رو به دوربین باشد
    scene.add(object);
    model = object;

    // پیمایش همه آبجکت‌ها برای پیدا کردن مش مورد نظر
    object.traverse(function(child) {
        if (child.isMesh) {
            if (child.name === "bodyPaint_Geo_lodA_Ferrari_F8TributoRewardRecycled_2020Paint_Material_0") {
                bodyPaintMesh = child; // ذخیره مش مورد نظر
            }
        }
    });
});

// تابع تغییر رنگ مش
function changeBodyPaintColor(hexColor) {
    if (bodyPaintMesh) {
        bodyPaintMesh.material.color.set(hexColor);
        bodyPaintMesh.material.needsUpdate = true;
    }
}

// اضافه کردن event listener به دکمه‌های رنگ
// این کد را بعد از بارگذاری مدل قرار بده

document.querySelectorAll('[data-color]').forEach(btn => {
    btn.addEventListener('click', function() {
        const color = this.getAttribute('data-color');
        changeBodyPaintColor(color);
    });
});

// موقعیت دوربین را مثل قبل نگه دار
camera.position.set(8, 6, 7);







view3d.addEventListener('wheel', function(event) {
    event.preventDefault();
    // فاصله فعلی دوربین تا مرکز صحنه
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    const cameraPos = camera.position.clone();
    const target = new THREE.Vector3(0, 0, 0); // فرض بر این است که مدل در مرکز صحنه است
    const distance = cameraPos.distanceTo(target);
    // مقدار تغییر فاصله
    let delta = event.deltaY * 0.06; // حساسیت زوم
    let newDistance = distance + delta;
    // محدودیت فاصله دوربین
    newDistance = Math.max(2, Math.min(20, newDistance));
    // موقعیت جدید دوربین را روی خط نگاه به مرکز تنظیم کن
    const dir = camera.position.clone().sub(target).normalize();
    camera.position.copy(dir.multiplyScalar(newDistance).add(target));
    camera.lookAt(target);
}, { passive: false });





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
    }, 300 + i * 400); // هر المان با تاخیر وارد شود
  });
});














