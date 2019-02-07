// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' + 
  'uniform mat4 u_NormalMatrix;\n' + 
  'uniform bool u_isTexture;\n' +
  'uniform float u_scale;\n' +
  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
  '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '  if(u_isTexture)\n' + 
  '  {\n' +
  '    v_TexCoord = a_TexCoord*u_scale;\n' +
  '  }\n' +
  '  else\n' +
  '  {\n' +
  '    v_Color = a_Color;\n' +
  '  }\n' +
  '}\n';

  export default VSHADER_SOURCE