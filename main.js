import * as THREE from 'three';

import vshader from './src/shaders/projection.vert?raw';
import fshader from './src/shaders/mouse_position.frag?raw';

// scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

camera.position.z = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// uniforms
const uniforms = {
    u_time: { value: 0.0 },
    u_mouse: { value: { x: 0.0, y: 0.0 } },
    u_resolution: { value: { x: 0.0, y: 0.0 } },
    u_color: { value: new THREE.Color(0xFF0000) }
};

// geometry
const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
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

function onWindowResize( event ) {

    const aspectRatio = window.innerWidth/window.innerHeight;
    let width, height;

    if (aspectRatio>=1){
        width = 1;
        height = (window.innerHeight/window.innerWidth) * width;
    }else{
        width = aspectRatio;
        height = 1;
    }

    camera.left = -width;
    camera.right = width;
    camera.top = height;
    camera.bottom = -height;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

    if (uniforms.u_resolution !== undefined) {

        uniforms.u_resolution.value.x = window.innerWidth;
        uniforms.u_resolution.value.y = window.innerHeight;
    }
}

if ('ontouchstart' in window) {
    document.addEventListener('touchmove', move);
} else {
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', move);
}

// render loop
function animate() {
	renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );

onWindowResize(null);