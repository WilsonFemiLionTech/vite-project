import * as THREE from 'three';
import './style.css';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"


const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
   color: '#00ff83'
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// sizes
const sizes = {
   width: window.innerWidth,
   height: window.innerHeight
};

// light
const light = new THREE.PointLight(0xffffff, 200, 100);
light.position.set(0, 10, 10);
scene.add(light);
 
//

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);




// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2)





///controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 20












// resize
window.addEventListener("resize", () => {
   // Update sizes
   sizes.width = window.innerWidth;
   sizes.height = window.innerHeight;

   // Update camera
   camera.aspect = sizes.width / sizes.height;
   camera.updateProjectionMatrix();


   // Update renderer
   renderer.setSize(sizes.width, sizes.height);
});

// animation loop
const loop = () => {
   
   controls.update()
   renderer.render(scene, camera);
   window.requestAnimationFrame(loop);
};

loop(); // Start the animation loop

//Timeline
const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo("nav", {y:"-100%"}, { y:"0%"})