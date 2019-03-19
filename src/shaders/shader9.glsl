const float tmax = 100.0;

float orb;
float de(vec3 p) {

  p.x = mod(p.x + 1.2, 2.4) - 1.2;
  vec4 q = vec4(p, 1);
  orb = 10000.0;
  for(int i = 0; i < 15; i++) {
    // 3D Kaliset formula
    q = 5.0*abs(q)/dot(q.xyz, q.xyz) - vec4(2.4, 0.9, 2.4, 0);

    // some random orbit trap.  Based on sqaure cosine.
    orb = min(orb, sin(abs(q.x*q.y)));
  }

  return (length(q.xyz))/q.w - 0.01;
}

void mainImage(out vec4 fragColor, vec2 fragCoord ) {
  float tt = 1. + abs(sin(phase*PI + PI/2.));

  // frag coords
  vec2 uv = -1.0 + 2.0*(fragCoord.xy/iResolution.xy);
  uv.x *= iResolution.x/iResolution.y;

  // camera.
  vec3 ro = vec3(iTime, 0, -3);
  vec3 ww = normalize(vec3(iTime - 3.0*sin(iTime), 2.0*smoothstep(-0.5, 0.5, cos(iTime))*sign(cos(iTime*0.5)), 0) - ro);
  vec3 uu = normalize(cross(vec3(0, 1, 0), ww));
  vec3 vv = normalize(cross(ww, uu));
  vec3 rd = normalize(uu*uv.x + vv*uv.y + ww*tt);

  // ray march and glow.
  float t = 0.0;
  float g = 0.0;
  for(int i = 0; i < 200; i++) {
    float d = de(ro + rd*t);

    if(d < 0.0001*(1.0 + 80.0*t) || t >= 10.0) break;
    t += d*(0.1 + 0.01*t);

    g += 0.05*(1.0 - d);
  }

  g = clamp(g, 0.0, 1.0);


  vec3 col = vec3(0);
  vec3 mat = vec3(0);

  if(t < 10.0) {
    // geometry
    vec3 pos = ro + rd*t;
    vec2 h = vec2(0.001, 0.0);
    vec3 nor =  normalize(vec3(
    de(pos + h.xyy) - de(pos - h.xyy),
    de(pos + h.yxy) - de(pos - h.yxy),
    de(pos + h.yyx) - de(pos - h.yyx)));

    // two lights, key and ground light.
    vec3 key = normalize(vec3(0.8, 0.7, -0.6));
    vec3 gro = vec3(0, -1, 0);

    // apply lighting (ambient, key diffuse, bac diffuse, gr diffuse)
    col = 0.2*vec3(1);
    col += 0.7*clamp(dot(key, nor), 0.0, 1.0);
    col += 0.5*clamp(0.2 + 0.8*dot(-key, nor), 0.0, 1.0);
    col += 0.3*clamp(dot(gro, nor), 0.0, 1.0);

    // material based on orbit trap.
    mat = mix(vec3(0, 0.3, 1), vec3(1, 0.2, 0.2), 4.0*orb);
    col *= mat;
  }

  col += g*mat; // glow.
  col = mix(col, vec3(1), 1.0 - exp(-0.1*t)); // distance fog.
  col = sqrt(col); // gamma correction.

  fragColor = vec4(col, 1);
}
