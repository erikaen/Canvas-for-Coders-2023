import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { MapControls } from "three/addons/controls/MapControls";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper";

// app
const app = document.querySelector("#app");

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.FogExp2(0x000000, 0.001);

// perspective camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
// orthographic camera
// const camera = new THREE.OrthographicCamera(
//   window.innerWidth / -2,
//   window.innerWidth / 2,
//   window.innerHeight / 2,
//   window.innerHeight / -2,
//   0,
//   3000
// );
camera.position.set(200, 100, 400);
camera.lookAt(0, 0, 0);
scene.add(camera);

// axis helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(50);
axesHelper.position.y = 0.01; // above the ground slightly
scene.add(axesHelper);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// directional light
const dirLight = new THREE.DirectionalLight("#ffffff");
dirLight.position.set(300, 100, 0);
scene.add(dirLight);
const dirLighthelper = new THREE.DirectionalLightHelper(dirLight, 10);
scene.add(dirLighthelper);

// point light
const pointLight = new THREE.PointLight(0xff00ff, 2, 300);
pointLight.position.set(0, 100, 0);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
scene.add(pointLightHelper);

// area light
const rectLight = new THREE.RectAreaLight(0x800080, 3, 50, 100);
rectLight.position.set(100, 40, 40);
scene.add(rectLight);
const rectLightHelper = new RectAreaLightHelper(rectLight);
scene.add(rectLightHelper);

// spot light
const spotLight = new THREE.SpotLight(0xffff00, 3);
spotLight.angle = Math.PI * 0.5;
spotLight.penumbra = 0.3;
spotLight.decay = 1;
spotLight.distance = 300;
spotLight.position.set(100, 150, 100);
spotLight.target.position.set(0, 0, -200);
scene.add(spotLight, spotLight.target);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// hemisphere light
const hemiLight = new THREE.HemisphereLight(0x000000, 0x00ffff, 1);
hemiLight.position.set(0, 500, 0);
scene.add(hemiLight);
const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
scene.add(hemiLightHelper);

// control
const controls = new OrbitControls(camera, renderer.domElement); // orbit control
// const controls = new MapControls(camera, renderer.domElement); // map control
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.enableRotate = true;
controls.rotateSpeed = 0.3;
controls.enableZoom = true;
controls.zoomSpeed = 0.5;
controls.minDistance = 10;
controls.maxDistance = 1000;

// first person control
// const controls = new FirstPersonControls(camera, renderer.domElement);
// controls.movementSpeed = 100;
// controls.lookSpeed = 0.02;
// const clock = new THREE.Clock(); // requires delta time value in update()

/*
////////////////////////////////////////////////////////////////////////////////
objects, you don't need to modify for week2 
*/

// ground
const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.8,
  metalness: 0.2,
  side: THREE.DoubleSide,
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI * 0.5;
scene.add(groundMesh);




// Create a Christmas tree layer
const treeGeometry = new THREE.ConeGeometry(30, 60, 80);
const treeMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 }); // Green color for the tree
const christmasTree = new THREE.Mesh(treeGeometry, treeMaterial);
christmasTree.position.set(0, 120, 0);
scene.add(christmasTree);

// Create the second layer
const treeGeometry2 = new THREE.ConeGeometry(50, 80, 80);
const treeMaterial2 = new THREE.MeshBasicMaterial({ color: 0x228B30 });
const christmasTree2 = new THREE.Mesh(treeGeometry2, treeMaterial2);
christmasTree2.position.set(0, 70, 0); // Adjust the position to stack on top of the first layer
scene.add(christmasTree2);



// Add decorations (spheres as ornaments)
const ornamentGeometry = new THREE.SphereGeometry(2, 16, 16); 
const ornamentMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 }); // Gold color for the ornaments

for (let i = 0; i < 50; i++) {
  const ornament = new THREE.Mesh(ornamentGeometry, ornamentMaterial);
  const radius = 30; // Radius of the imaginary sphere where ornaments are placed
  const theta = (Math.PI * 2 * i) / 20; // Distribute ornaments evenly around the tree
  const x = radius * Math.cos(theta);
  const z = radius * Math.sin(theta);
  ornament.position.set(x, 90, z); // Adjust the height to place ornaments on the tree
  scene.add(ornament);
}

// Add decorations2 (spheres as ornaments)
const ornamentGeometry1 = new THREE.SphereGeometry(2, 16, 16); 
const ornamentMaterial1 = new THREE.MeshBasicMaterial({ color: 0xffd800 }); // Gold color for the ornaments

for (let i = 0; i < 80; i++) {
  const ornament1 = new THREE.Mesh(ornamentGeometry1, ornamentMaterial1);
  const radius1 = 50; // Radius of the imaginary sphere where ornaments are placed
  const theta1 = (Math.PI * 2 * i) / 30; // Distribute ornaments evenly around the tree
  const x = radius1 * Math.cos(theta1);
  const z = radius1 * Math.sin(theta1);
  ornament1.position.set(x, 30, z); // Adjust the height to place ornaments on the tree
  scene.add(ornament1);
}


// Create a tree trunk
const trunkGeometry = new THREE.CylinderGeometry(30, 20, 50);
const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // SaddleBrown color for the trunk
const treeTrunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
treeTrunk.position.set(0, 20, 0);
scene.add(treeTrunk);


// Create the snowman's body
const bodyGeometry1 = new THREE.SphereGeometry(20);
const bodyMaterial1 = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Snow color
const body1 = new THREE.Mesh(bodyGeometry1, bodyMaterial1);
body1.position.set(100, 10, 0);
scene.add(body1);

const bodyGeometry2 = new THREE.SphereGeometry(15);
const bodyMaterial2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const body2 = new THREE.Mesh(bodyGeometry2, bodyMaterial2);
body2.position.set(100, 10, 0); // Stack on top of the first body
scene.add(body2);

const bodyGeometry3 = new THREE.SphereGeometry(10);
const bodyMaterial3 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const body3 = new THREE.Mesh(bodyGeometry3, bodyMaterial3);
body3.position.set(100, 35, 0); // Stack on top of the second body
scene.add(body3);

// Create the snowman's head
const headGeometry = new THREE.SphereGeometry(8);
const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.set(100, 50, 0); // Stack on top of the third body
scene.add(head);

// Create the snowman's eyes
const eyeGeometry = new THREE.SphereGeometry(1);
const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Black color for eyes
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(98, 52, 7); // Adjust the position for the left eye
scene.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(102, 52, 7); // Adjust the position for the right eye
scene.add(rightEye);

// Create the snowman's nose
const noseGeometry = new THREE.ConeGeometry(2, 8, 8);
const noseMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 }); // Orange color for the nose
const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.rotation.x = Math.PI / 2; // Rotate the cone to point forward
nose.position.set(100, 49, 8); // Adjust the position for the nose
scene.add(nose);

// Create the snowman's arms
const armGeometry = new THREE.CylinderGeometry(1, 1, 20);
const armMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // SaddleBrown color for arms

const leftArm = new THREE.Mesh(armGeometry, armMaterial);
leftArm.rotation.z = Math.PI / 2; // Rotate the arm to point outward
leftArm.position.set(90, 30, 0); // Adjust the position for the left arm
scene.add(leftArm);

const rightArm = new THREE.Mesh(armGeometry, armMaterial);
rightArm.rotation.z = -Math.PI / 2; // Rotate the arm to point outward
rightArm.position.set(110, 30, 0); // Adjust the position for the right arm
scene.add(rightArm);


// Animation loop remains the same...


////////////////////////////////////////////////////////////////////////////////

// resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  // camera.left = window.innerWidth / -2;
  // camera.right = window.innerWidth / 2;
  // camera.top = window.innerHeight / 2;
  // camera.bottom = window.innerHeight / -2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);

// animate
const animate = () => {
  requestAnimationFrame(animate);

  controls.update();
  // controls.update(clock.getDelta());

  renderer.render(scene, camera);
};

animate();
