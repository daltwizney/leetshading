uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_color;

uniform float u_time;

void main() {

    vec3 color = vec3((sin(u_time) + 1.0) / 2.0, 0.0, 
        (cos(u_time) + 1.0) / 2.0);

    gl_FragColor = vec4(color, 1.0);
}