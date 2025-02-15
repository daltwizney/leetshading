out vec2 v_uv;
out vec3 v_position;

void main() {

    v_uv = uv;
    v_position = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}