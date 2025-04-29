# grayscale.frag
#version 430

in vec2 uv;
uniform sampler2D tex;
out vec4 color;

void main() {
    vec4 texColor = texture(tex, uv);
    float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    color = vec4(gray, gray, gray, 1.0);
}