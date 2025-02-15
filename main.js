import * as THREE from 'three';

import App from './src/app';

import vshader from './src/shaders/projection.vert?raw';
import fshader from './src/shaders/varyings.frag?raw';

// scene, camera, renderer
const canvasWidth = 800;
const canvasHeight = 600;

const app = new App(canvasWidth, canvasHeight);

app.currentScene = new THREE.Scene();

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

app.currentScene.add(plane);

// event-handlers
app.events.on('mouseMove', (e) => {

    uniforms.u_mouse.value.x = (e.touches) ? 
        e.touches[0].clientX : e.clientX;

    uniforms.u_mouse.value.y = (e.touches) ?
        e.touches[0].clientY : e.clientY;
});

// render loop
app.events.on('update', () => {

    uniforms.u_time.value = clock.getElapsedTime();
});