import * as THREE from 'three';

import EventEmitter from 'events';

export default class App {

    get currentScene() {
        return this._currentScene;
    }

    set currentScene(value) {
        this._currentScene = value;
    }

    constructor(canvasWidth = 800, canvasHeight = 600) {

        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;

        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize( canvasWidth, canvasHeight );
        document.body.appendChild( this._renderer.domElement );
        
        this._renderer.setAnimationLoop( this.update.bind(this) );

        this._camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        this._camera.position.z = 1;

        this.events = new EventEmitter();

        this._currentScene = null;

        // setup input events
        if ('ontouchstart' in window) {
            document.addEventListener('touchmove', this.handleMouseMove.bind(this));
        } else {
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        }
    }

    handleMouseMove(e) {
        this.events.emit('mouseMove', e);
    }

    update() {

        if (this._currentScene)
        {
            this._renderer.render(this._currentScene, this._camera);

            this.events.emit('update');
        }
    }
}