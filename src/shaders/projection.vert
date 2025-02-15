out vec2 uvCoords;

void main() {

    uvCoords = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 0.5, 1.0);
}