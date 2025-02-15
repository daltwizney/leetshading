uniform vec2 u_resolution;

out vec4 fragColor;

void main() {

    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), uv.y);
    fragColor = vec4(color, 1.0);
}