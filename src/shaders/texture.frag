#define PI 3.14159

in vec2 v_uv;

uniform sampler2D u_tex;

out vec4 fragColor;

void main() {
    vec3 color = texture2D(u_tex, v_uv).rgb;
    fragColor = vec4(color, 1.0);
}