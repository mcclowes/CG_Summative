// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform vec3 u_LightColour;\n' +
  'uniform vec3 u_LightColour2;\n' +   
  'uniform vec3 u_LightColour3;\n' +   
  'uniform vec3 u_LightColour4;\n' +   
  'uniform vec3 u_LightColour5;\n' +
  'uniform vec3 u_LightColour6;\n' +   
  'uniform vec3 u_LightColour7;\n' +
  'uniform vec3 u_LightColour8;\n' +
  'uniform vec3 u_LightColour9;\n' +
  'uniform vec3 u_LightColour10;\n' +
  'uniform vec3 u_LightColour11;\n' +
  'uniform vec3 u_LightColour12;\n' + 
  'uniform vec3 u_LightColour13;\n' + 
  'uniform vec3 u_LightColour14;\n' + 
  'uniform vec3 u_LightColour15;\n' + 
  'uniform vec3 u_LightColour16;\n' + 
  'uniform vec3 u_LightColour17;\n' + 
  'uniform vec3 u_LightColour18;\n' + 
  'uniform vec3 u_LightColour19;\n' + 
  'uniform vec3 u_LightColour20;\n' +    
  'uniform vec3 u_LightPos;\n' + 
  'uniform vec3 u_LightPos2;\n' +
  'uniform vec3 u_LightPos3;\n' +
  'uniform vec3 u_LightPos4;\n' +
  'uniform vec3 u_LightPos5;\n' +
  'uniform vec3 u_LightPos6;\n' +
  'uniform vec3 u_LightPos7;\n' +
  'uniform vec3 u_LightPos8;\n' +
  'uniform vec3 u_LightPos9;\n' +
  'uniform vec3 u_LightPos10;\n' +
  'uniform vec3 u_LightPos11;\n' +
  'uniform vec3 u_LightPos12;\n' +
  'uniform vec3 u_LightPos13;\n' +
  'uniform vec3 u_LightPos14;\n' +
  'uniform vec3 u_LightPos15;\n' +
  'uniform vec3 u_LightPos16;\n' +
  'uniform vec3 u_LightPos17;\n' +
  'uniform vec3 u_LightPos18;\n' +
  'uniform vec3 u_LightPos19;\n' +
  'uniform vec3 u_LightPos20;\n' +
  'uniform vec3 u_AmbientLight;\n' +
  'uniform bool u_isTexture;\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec4 v_Color;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  vec3 normal = normalize(v_Normal);\n' +
  '  vec3 lightDir = normalize(u_LightPos - v_Position);\n' +
  '  vec3 lightDir2 = normalize(u_LightPos2 - v_Position);\n' +
  '  vec3 lightDir3 = normalize(u_LightPos3 - v_Position);\n' +
  '  vec3 lightDir4 = normalize(u_LightPos4 - v_Position);\n' +
  '  vec3 lightDir5 = normalize(u_LightPos5 - v_Position);\n' +
  '  vec3 lightDir6 = normalize(u_LightPos6 - v_Position);\n' +
  '  vec3 lightDir7 = normalize(u_LightPos7 - v_Position);\n' +
  '  vec3 lightDir8 = normalize(u_LightPos8 - v_Position);\n' +
  '  vec3 lightDir9 = normalize(u_LightPos9 - v_Position);\n' +
  '  vec3 lightDir10 = normalize(u_LightPos10 - v_Position);\n' +
  '  vec3 lightDir11 = normalize(u_LightPos11 - v_Position);\n' +
  '  vec3 lightDir12 = normalize(u_LightPos12 - v_Position);\n' +
  '  vec3 lightDir13 = normalize(u_LightPos13 - v_Position);\n' +
  '  vec3 lightDir14 = normalize(u_LightPos14 - v_Position);\n' +
  '  vec3 lightDir15 = normalize(u_LightPos15 - v_Position);\n' +
  '  vec3 lightDir16 = normalize(u_LightPos16 - v_Position);\n' +
  '  vec3 lightDir17 = normalize(u_LightPos17 - v_Position);\n' +
  '  vec3 lightDir18 = normalize(u_LightPos18 - v_Position);\n' +
  '  vec3 lightDir19 = normalize(u_LightPos19 - v_Position);\n' +
  '  vec3 lightDir20 = normalize(u_LightPos20 - v_Position);\n' +
  '  float nDotL = 200.0*max(dot(lightDir, normal), 0.0) / dot(u_LightPos - v_Position, u_LightPos - v_Position);\n' +
  '  float nDotL2 = 200.0*max(dot(lightDir2, normal), 0.0) / dot(u_LightPos2 - v_Position, u_LightPos2 - v_Position);\n' +
  '  float nDotL3 = 200.0*max(dot(lightDir3, normal), 0.0) / dot(u_LightPos3 - v_Position, u_LightPos3 - v_Position);\n' +
  '  float nDotL4 = 200.0*max(dot(lightDir4, normal), 0.0) / dot(u_LightPos4 - v_Position, u_LightPos4 - v_Position);\n' +
  '  float nDotL5 = 200.0*max(dot(lightDir5, normal), 0.0) / dot(u_LightPos5 - v_Position, u_LightPos5 - v_Position);\n' +
  '  float nDotL6 = 200.0*max(dot(lightDir6, normal), 0.0) / dot(u_LightPos6 - v_Position, u_LightPos6 - v_Position);\n' +
  '  float nDotL7 = 200.0*max(dot(lightDir7, normal), 0.0) / dot(u_LightPos7 - v_Position, u_LightPos7 - v_Position);\n' +
  '  float nDotL8 = 200.0*max(dot(lightDir8, normal), 0.0) / dot(u_LightPos8 - v_Position, u_LightPos8 - v_Position);\n' +
  '  float nDotL9 = 200.0*max(dot(lightDir9, normal), 0.0) / dot(u_LightPos9 - v_Position, u_LightPos9 - v_Position);\n' +
  '  float nDotL10 = 200.0*max(dot(lightDir10, normal), 0.0) / dot(u_LightPos10 - v_Position, u_LightPos10 - v_Position);\n' +
  '  float nDotL11 = 200.0*max(dot(lightDir11, normal), 0.0) / dot(u_LightPos11 - v_Position, u_LightPos11 - v_Position);\n' +
  '  float nDotL12 = 200.0*max(dot(lightDir12, normal), 0.0) / dot(u_LightPos12 - v_Position, u_LightPos12 - v_Position);\n' +
  '  float nDotL13 = 200.0*max(dot(lightDir13, normal), 0.0) / dot(u_LightPos13 - v_Position, u_LightPos13 - v_Position);\n' +
  '  float nDotL14 = 200.0*max(dot(lightDir14, normal), 0.0) / dot(u_LightPos14 - v_Position, u_LightPos14 - v_Position);\n' +
  '  float nDotL15 = 200.0*max(dot(lightDir15, normal), 0.0) / dot(u_LightPos15 - v_Position, u_LightPos15 - v_Position);\n' +
  '  float nDotL16 = 200.0*max(dot(lightDir16, normal), 0.0) / dot(u_LightPos16 - v_Position, u_LightPos16 - v_Position);\n' +
  '  float nDotL17 = 200.0*max(dot(lightDir17, normal), 0.0) / dot(u_LightPos17 - v_Position, u_LightPos17 - v_Position);\n' +
  '  float nDotL18 = 200.0*max(dot(lightDir18, normal), 0.0) / dot(u_LightPos18 - v_Position, u_LightPos18 - v_Position);\n' +
  '  float nDotL19 = 200.0*max(dot(lightDir19, normal), 0.0) / dot(u_LightPos19 - v_Position, u_LightPos19 - v_Position);\n' +
  '  float nDotL20 = 200.0*max(dot(lightDir20, normal), 0.0) / dot(u_LightPos20 - v_Position, u_LightPos20 - v_Position);\n' +
  '  vec4 visableColor;\n' +  
  '  if(u_isTexture)\n' + 
  '  {\n' +
  '    visableColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '  }\n' +
  '  else\n' +
  '  {\n' +
  '    visableColor = v_Color;\n' +
  '  }\n' + 
  '  vec3 diffuse = visableColor.rgb * (u_LightColour * nDotL + u_LightColour2 * nDotL2 + u_LightColour3 * nDotL3 + u_LightColour4 * nDotL4 + u_LightColour5 * nDotL5 + u_LightColour6 * nDotL6 + u_LightColour7 * nDotL7 + u_LightColour8 * nDotL8 + u_LightColour9 * nDotL9 + u_LightColour10 * nDotL10 + u_LightColour11 * nDotL11 + u_LightColour12 * nDotL12 + u_LightColour13 * nDotL13 + u_LightColour14 * nDotL14 + u_LightColour15 * nDotL15 + u_LightColour16 * nDotL16 + u_LightColour17 * nDotL17 + u_LightColour18 * nDotL18 + u_LightColour19 * nDotL19 + u_LightColour20 * nDotL20);\n' +
  '  vec3 ambient = u_AmbientLight * visableColor.rgb;\n' +
  '  gl_FragColor = vec4(diffuse + ambient, visableColor.a);\n' +
  '}\n';

export default FSHADER_SOURCE