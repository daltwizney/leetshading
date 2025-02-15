uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_color;

out vec4 fragColor;

void main() {

    vec3 color = vec3(u_mouse.x/u_resolution.x, 0.0, 
        u_mouse.y/u_resolution.y);

    fragColor = vec4(color, 1.0);
}