in vec3 v_position;

out vec4 fragColor;

void main() {

    float radius = 0.5;
    float smoothing = 0.005;

    float inCircle = 1.0 - smoothstep(radius, radius + smoothing, length(v_position.xy));

    vec3 color = vec3(1.0, 1.0, 0.0) * inCircle;

    fragColor = vec4(color, 1.0);
}