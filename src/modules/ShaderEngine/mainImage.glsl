
// mainImage code suffix
// https://github.com/beautypi/shadertoy-iOS-v2/blob/master/shadertoy/shaders/fragment_main_image.glsl

void main() {

  iTime = time;
  iResolution = resolution;
  iMouse = mouse;

  mainImage(gl_FragColor, gl_FragCoord.xy);
}
