in vec2 uvCoords;

out vec4 fragColor;

void main() {

    vec3 color = vec3(uvCoords.x, uvCoords.y, 0.0);
    fragColor = vec4(color, 1.0);
}