import * as THREE from 'three';

import App from './src/app';

import vshader from './src/shaders/box_sphere.vert?raw';
import fshader from './src/shaders/box_sphere.frag?raw';

import textureUrl from './assets/textures/kollie-logo-v2.png';

// scene, camera, renderer
const canvasWidth = 600;
const canvasHeight = 600;

const app = new App(canvasWidth, canvasHeight, { isPerspective: true, useOrbitControls: true });

app.currentScene = new THREE.Scene();

const clock = new THREE.Clock();

// uniforms
const uniforms = {
    u_tex: {
        value: new THREE.TextureLoader().load(textureUrl)
    },
    u_time: { value: 0.0 },
    u_mouse: { value: { x: 0.0, y: 0.0 } },
    u_resolution: { value: { x: canvasWidth, y: canvasHeight } },
    u_color: { value: new THREE.Color(0xFF0000) },
    u_radius: { value: 20.0 }
};

// geometry
// const geometry = new THREE.PlaneGeometry(2, 2);

const geometry = new THREE.BoxGeometry(30, 30, 30, 10, 10, 10);

const material = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    uniforms: uniforms,
    vertexShader: vshader,
    fragmentShader: fshader,
    wireframe: true
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