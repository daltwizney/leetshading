import * as THREE from 'three';

import vshader from './src/shaders/projection.vert?raw';
import fshader from './src/shaders/varyings.frag?raw';

// scene, camera, renderer
const canvasWidth = 800;
const canvasHeight = 600;

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

camera.position.z = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( canvasWidth, canvasHeight );
document.body.appendChild( renderer.domElement );

const clock = new THREE.Clock();

// uniforms
const uniforms = {
    u_time: { value: 0.0 },
    u_mouse: { value: { x: 0.0, y: 0.0 } },
    u_resolution: { value: { x: canvasWidth, y: canvasHeight } },
    u_color: { value: new THREE.Color(0xFF0000) }
};

// geometry
const geometry = new THREE.PlaneGeometry(4, 4);

const material = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    uniforms: uniforms,
    vertexShader: vshader,
    fragmentShader: fshader
});

const plane = new THREE.Mesh(geometry, material);

scene.add(plane);

// event-handlers
function move(e) {

    uniforms.u_mouse.value.x = (e.touches) ? 
        e.touches[0].clientX : e.clientX;

    uniforms.u_mouse.value.y = (e.touches) ?
        e.touches[0].clientY : e.clientY;
}

if ('ontouchstart' in window) {
    document.addEventListener('touchmove', move);
} else {
    document.addEventListener('mousemove', move);
}

// render loop
function animate() {

    uniforms.u_time.value = clock.getElapsedTime();

	renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );