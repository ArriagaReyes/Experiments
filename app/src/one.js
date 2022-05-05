import * as THREE from 'three';
import * as dat from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const gui = new dat.GUI();
const canvas = document.getElementById('root');

const parameters = {
    distance: 1,
    materialColor: 0xfe9e70,
    particleColor: 0xc05c43
};

gui.add(parameters, 'distance').min(1).max(100).step(1);
gui.addColor(parameters, 'materialColor').onChange(() => {
    coneMaterial.color.set(parameters.materialColor);
});
gui.addColor(parameters, 'particleColor').onChange(() => {
    particleMaterial.color.set(parameters.particleColor);
});

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const cursor = new THREE.Vector2();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 3);
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xfffd98, 0.3);
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(3, 3, 3);
scene.add(directionalLight);

const count = 500;
const vertices = new Float32Array(count * 3);
for(let i = 0; i < count; i++) {
    vertices[i * 3    ] = (Math.random() - 0.5) * 20;
    vertices[i * 3 + 1] = (Math.random() - 0.5) * 2;
    vertices[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: 0.03,
    sizeAttenuation: true,
    color: parameters.materialColor
});

const particles = new THREE.Points(particleGeometry, particleMaterial);

const coneMaterial = new THREE.MeshStandardMaterial({ color: parameters.materialColor });

const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1, 3, 4, 1),
    coneMaterial
);
cone.rotation.x = Math.PI;

scene.add(cone, particles);

//const controls = new OrbitControls(camera, canvas);
//controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//const clock = new THREE.Clock();
let lastTime = 0;

const animate = (timeStamp = 0) => {
    //const elapsedTime = clock.getElapsedTime();
    //const deltaTime = elapsedTime - lastTime;
    //lastTime = elapsedTime;
    const deltaTime = (timeStamp - lastTime) / 1000;
    lastTime = timeStamp;

    cone.rotation.y += deltaTime * deltaTime;
    cone.rotation.z += deltaTime * deltaTime;

    camera.position.x += (cursor.x * parameters.distance - camera.position.x) * deltaTime;
    camera.position.y += (cursor.y * parameters.distance - camera.position.y) * deltaTime;
    camera.lookAt(cone.position);
    //controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('mousemove', e => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = -(e.clientY / sizes.height - 0.5);
});

export default animate;