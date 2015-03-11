/*========================= SHADERS ========================= */
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
  'uniform mat4 u_NormalMatrix;\n' +   // Transformation matrix of the normal
  'uniform bool u_isTexture;\n' +
  'uniform float u_scale;\n' +
  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
     // Calculate the vertex position in the world coordinate
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
// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform vec3 u_LightColor;\n' +     // Light color
  'uniform vec3 u_LightColor2;\n' +   
  'uniform vec3 u_LightColor3;\n' +   
  'uniform vec3 u_LightColor4;\n' +   
  'uniform vec3 u_LightColor5;\n' +
  'uniform vec3 u_LightColor6;\n' +   
  'uniform vec3 u_LightColor7;\n' +
  'uniform vec3 u_LightColor8;\n' +
  'uniform vec3 u_LightColor9;\n' +
  'uniform vec3 u_LightColor10;\n' +
  'uniform vec3 u_LightColor11;\n' +
  'uniform vec3 u_LightColor12;\n' + 
  'uniform vec3 u_LightColor13;\n' + 
  'uniform vec3 u_LightColor14;\n' + 
  'uniform vec3 u_LightColor15;\n' + 
  'uniform vec3 u_LightColor16;\n' + 
  'uniform vec3 u_LightColor17;\n' + 
  'uniform vec3 u_LightColor18;\n' + 
  'uniform vec3 u_LightColor19;\n' + 
  'uniform vec3 u_LightColor20;\n' +    
  'uniform vec3 u_LightPosition;\n' +  // Position of the light source
  'uniform vec3 u_LightPosition2;\n' +
  'uniform vec3 u_LightPosition3;\n' +
  'uniform vec3 u_LightPosition4;\n' +
  'uniform vec3 u_LightPosition5;\n' +
  'uniform vec3 u_LightPosition6;\n' +
  'uniform vec3 u_LightPosition7;\n' +
  'uniform vec3 u_LightPosition8;\n' +
  'uniform vec3 u_LightPosition9;\n' +
  'uniform vec3 u_LightPosition10;\n' +
  'uniform vec3 u_LightPosition11;\n' +
  'uniform vec3 u_LightPosition12;\n' +
  'uniform vec3 u_LightPosition13;\n' +
  'uniform vec3 u_LightPosition14;\n' +
  'uniform vec3 u_LightPosition15;\n' +
  'uniform vec3 u_LightPosition16;\n' +
  'uniform vec3 u_LightPosition17;\n' +
  'uniform vec3 u_LightPosition18;\n' +
  'uniform vec3 u_LightPosition19;\n' +
  'uniform vec3 u_LightPosition20;\n' +
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
  'uniform bool u_isTexture;\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec4 v_Color;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
     // Normalize the normal because it is interpolated and not 1.0 in length any more
  '  vec3 normal = normalize(v_Normal);\n' +
     // Calculate the light direction and make its length 1.
  '  vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
  '  vec3 lightDirection2 = normalize(u_LightPosition2 - v_Position);\n' +
  '  vec3 lightDirection3 = normalize(u_LightPosition3 - v_Position);\n' +
  '  vec3 lightDirection4 = normalize(u_LightPosition4 - v_Position);\n' +
  '  vec3 lightDirection5 = normalize(u_LightPosition5 - v_Position);\n' +
  '  vec3 lightDirection6 = normalize(u_LightPosition6 - v_Position);\n' +
  '  vec3 lightDirection7 = normalize(u_LightPosition7 - v_Position);\n' +
  '  vec3 lightDirection8 = normalize(u_LightPosition8 - v_Position);\n' +
  '  vec3 lightDirection9 = normalize(u_LightPosition9 - v_Position);\n' +
  '  vec3 lightDirection10 = normalize(u_LightPosition10 - v_Position);\n' +
  '  vec3 lightDirection11 = normalize(u_LightPosition11 - v_Position);\n' +
  '  vec3 lightDirection12 = normalize(u_LightPosition12 - v_Position);\n' +
  '  vec3 lightDirection13 = normalize(u_LightPosition13 - v_Position);\n' +
  '  vec3 lightDirection14 = normalize(u_LightPosition14 - v_Position);\n' +
  '  vec3 lightDirection15 = normalize(u_LightPosition15 - v_Position);\n' +
  '  vec3 lightDirection16 = normalize(u_LightPosition16 - v_Position);\n' +
  '  vec3 lightDirection17 = normalize(u_LightPosition17 - v_Position);\n' +
  '  vec3 lightDirection18 = normalize(u_LightPosition18 - v_Position);\n' +
  '  vec3 lightDirection19 = normalize(u_LightPosition19 - v_Position);\n' +
  '  vec3 lightDirection20 = normalize(u_LightPosition20 - v_Position);\n' +
     // The dot product of the light direction and the orientation of a surface (the normal)
  '  float nDotL = 200.0*max(dot(lightDirection, normal), 0.0) / dot(u_LightPosition - v_Position, u_LightPosition - v_Position);\n' +
  '  float nDotL2 = 200.0*max(dot(lightDirection2, normal), 0.0) / dot(u_LightPosition2 - v_Position, u_LightPosition2 - v_Position);\n' +
  '  float nDotL3 = 200.0*max(dot(lightDirection3, normal), 0.0) / dot(u_LightPosition3 - v_Position, u_LightPosition3 - v_Position);\n' +
  '  float nDotL4 = 200.0*max(dot(lightDirection4, normal), 0.0) / dot(u_LightPosition4 - v_Position, u_LightPosition4 - v_Position);\n' +
  '  float nDotL5 = 200.0*max(dot(lightDirection5, normal), 0.0) / dot(u_LightPosition5 - v_Position, u_LightPosition5 - v_Position);\n' +
  '  float nDotL6 = 200.0*max(dot(lightDirection6, normal), 0.0) / dot(u_LightPosition6 - v_Position, u_LightPosition6 - v_Position);\n' +
  '  float nDotL7 = 200.0*max(dot(lightDirection7, normal), 0.0) / dot(u_LightPosition7 - v_Position, u_LightPosition7 - v_Position);\n' +
  '  float nDotL8 = 200.0*max(dot(lightDirection8, normal), 0.0) / dot(u_LightPosition8 - v_Position, u_LightPosition8 - v_Position);\n' +
  '  float nDotL9 = 200.0*max(dot(lightDirection9, normal), 0.0) / dot(u_LightPosition9 - v_Position, u_LightPosition9 - v_Position);\n' +
  '  float nDotL10 = 200.0*max(dot(lightDirection10, normal), 0.0) / dot(u_LightPosition10 - v_Position, u_LightPosition10 - v_Position);\n' +
  '  float nDotL11 = 200.0*max(dot(lightDirection11, normal), 0.0) / dot(u_LightPosition11 - v_Position, u_LightPosition11 - v_Position);\n' +
  '  float nDotL12 = 200.0*max(dot(lightDirection12, normal), 0.0) / dot(u_LightPosition12 - v_Position, u_LightPosition12 - v_Position);\n' +
  '  float nDotL13 = 200.0*max(dot(lightDirection13, normal), 0.0) / dot(u_LightPosition13 - v_Position, u_LightPosition13 - v_Position);\n' +
  '  float nDotL14 = 200.0*max(dot(lightDirection14, normal), 0.0) / dot(u_LightPosition14 - v_Position, u_LightPosition14 - v_Position);\n' +
  '  float nDotL15 = 200.0*max(dot(lightDirection15, normal), 0.0) / dot(u_LightPosition15 - v_Position, u_LightPosition15 - v_Position);\n' +
  '  float nDotL16 = 200.0*max(dot(lightDirection16, normal), 0.0) / dot(u_LightPosition16 - v_Position, u_LightPosition16 - v_Position);\n' +
  '  float nDotL17 = 200.0*max(dot(lightDirection17, normal), 0.0) / dot(u_LightPosition17 - v_Position, u_LightPosition17 - v_Position);\n' +
  '  float nDotL18 = 200.0*max(dot(lightDirection18, normal), 0.0) / dot(u_LightPosition18 - v_Position, u_LightPosition18 - v_Position);\n' +
  '  float nDotL19 = 200.0*max(dot(lightDirection19, normal), 0.0) / dot(u_LightPosition19 - v_Position, u_LightPosition19 - v_Position);\n' +
  '  float nDotL20 = 200.0*max(dot(lightDirection20, normal), 0.0) / dot(u_LightPosition20 - v_Position, u_LightPosition20 - v_Position);\n' +
     // Calculate the final color from diffuse reflection and ambient reflection
  '  vec4 actualColor;\n' +  
  '  if(u_isTexture)\n' + 
  '  {\n' +
  '    actualColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '  }\n' +
  '  else\n' +
  '  {\n' +
  '    actualColor = v_Color;\n' +
  '  }\n' + 
  '  vec3 diffuse = actualColor.rgb * (u_LightColor * nDotL + u_LightColor2 * nDotL2 + u_LightColor3 * nDotL3 + u_LightColor4 * nDotL4 + u_LightColor5 * nDotL5 + u_LightColor6 * nDotL6 + u_LightColor7 * nDotL7 + u_LightColor8 * nDotL8 + u_LightColor9 * nDotL9 + u_LightColor10 * nDotL10 + u_LightColor11 * nDotL11 + u_LightColor12 * nDotL12 + u_LightColor13 * nDotL13 + u_LightColor14 * nDotL14 + u_LightColor15 * nDotL15 + u_LightColor16 * nDotL16 + u_LightColor17 * nDotL17 + u_LightColor18 * nDotL18 + u_LightColor19 * nDotL19 + u_LightColor20 * nDotL20);\n' +
  '  vec3 ambient = u_AmbientLight * actualColor.rgb;\n' +
  '  gl_FragColor = vec4(diffuse + ambient, actualColor.a);\n' +
  '}\n';

/*========================= VARS ========================= */
//..
var theta = -Math.PI;
var phi = Math.PI/2;

//Door position
var doorAngle = 0;
var ambLight = 0;
var lightIntensity = 0.5;

//Colour variable definitions
var red = [1, 0, 0];
var green = [0, 1, 0];
var blue = [0, 0, 1];
var grey = [0.5, 0.5, 0.5];
var black = [0, 0,0];
var dullOrange = [0.9, 0.5, 0.2];
var cream = [0.95, 0.9, 0.95];
var purple = [0.6, 0.3, 0.6];
var brown = [0.8, 0.6, 0.43];
var goldBrown = [0.66, 0.5, 0.2];
var greyGreen = [0.23, 0.6, 0.4];
var sky = [0.4, 0.9, 0.95];

//Lights
var lightOn = false;
var lightOn2 = false;
var lightOn3 = false;
var lightOn4 = false;
var lightOn5 = false;
var lightOn6 = false;
var lightOn7 = false;
var lightOn8 = false;
var lightOn9 = false;
var lightOn10 = false;
var lightOn11 = false;
var lightOn12 = false;
var lightOn13 = false;
var lightOn14 = false;
var lightOn15 = false;
var lightOn16 = false;
var lightOn17 = false;
var lightOn18 = false;
var lightOn19 = false;
var lightOn20 = false;

//Colour modifiers
redMod = 0.05;
greenMod = 0;
blueMod = -0.1;

var light_color = [lightIntensity, lightIntensity, lightIntensity];
var light_color2 = [lightIntensity, lightIntensity, lightIntensity];
var light_color3 = [lightIntensity, lightIntensity, lightIntensity];
var light_color4 = [lightIntensity, lightIntensity, lightIntensity];
var light_color5 = [lightIntensity, lightIntensity, lightIntensity];
var light_color6 = [lightIntensity, lightIntensity, lightIntensity];
var light_color7 = [lightIntensity, lightIntensity, lightIntensity];
var light_color8 = [lightIntensity, lightIntensity, lightIntensity];
var light_color9 = [lightIntensity, lightIntensity, lightIntensity];
var light_color10 = [lightIntensity, lightIntensity, lightIntensity];
var light_color11 = [lightIntensity, lightIntensity, lightIntensity];
var light_color12 = [lightIntensity, lightIntensity, lightIntensity];
var light_color13 = [lightIntensity, lightIntensity, lightIntensity];
var light_color14 = [lightIntensity, lightIntensity, lightIntensity];
var light_color15 = [lightIntensity, lightIntensity, lightIntensity];
var light_color16 = [lightIntensity, lightIntensity, lightIntensity];
var light_color17 = [lightIntensity, lightIntensity, lightIntensity];
var light_color18 = [lightIntensity, lightIntensity, lightIntensity];
var light_color19 = [lightIntensity, lightIntensity, lightIntensity];
var light_color20 = [lightIntensity, lightIntensity, lightIntensity];


var canvas = document.getElementById('webgl');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

function main() {
  var gl = getWebGLContext(canvas,false); //Remove false to enable debug
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  var bgNoise = new Audio('audio/faintBuzz.mp3');
  bgNoise.loop = true;
  bgNoise.play();

  // Set the clear canvas color and enable the depth test
  gl.clearColor(sky[0], sky[1], sky[2], 0.7);
  gl.enable(gl.DEPTH_TEST);

  // Get the storage locations of uniform variables
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  //Light Colors
  var u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
  var u_LightColor2 = gl.getUniformLocation(gl.program, 'u_LightColor2');
  var u_LightColor3 = gl.getUniformLocation(gl.program, 'u_LightColor3');
  var u_LightColor4 = gl.getUniformLocation(gl.program, 'u_LightColor4');
  var u_LightColor5 = gl.getUniformLocation(gl.program, 'u_LightColor5');
  var u_LightColor6 = gl.getUniformLocation(gl.program, 'u_LightColor6');
  var u_LightColor7 = gl.getUniformLocation(gl.program, 'u_LightColor7');
  var u_LightColor8 = gl.getUniformLocation(gl.program, 'u_LightColor8');
  var u_LightColor9 = gl.getUniformLocation(gl.program, 'u_LightColor9');
  var u_LightColor10 = gl.getUniformLocation(gl.program, 'u_LightColor10');
  var u_LightColor11 = gl.getUniformLocation(gl.program, 'u_LightColor11');
  var u_LightColor12 = gl.getUniformLocation(gl.program, 'u_LightColor12');
  var u_LightColor13 = gl.getUniformLocation(gl.program, 'u_LightColor13');
  var u_LightColor14 = gl.getUniformLocation(gl.program, 'u_LightColor14');
  var u_LightColor15 = gl.getUniformLocation(gl.program, 'u_LightColor15');
  var u_LightColor16 = gl.getUniformLocation(gl.program, 'u_LightColor16');
  var u_LightColor17 = gl.getUniformLocation(gl.program, 'u_LightColor17');
  var u_LightColor18 = gl.getUniformLocation(gl.program, 'u_LightColor18');
  var u_LightColor19 = gl.getUniformLocation(gl.program, 'u_LightColor19');
  var u_LightColor20 = gl.getUniformLocation(gl.program, 'u_LightColor20');

  //Light Positions
  var u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
  var u_LightPosition2 = gl.getUniformLocation(gl.program, 'u_LightPosition2');
  var u_LightPosition3 = gl.getUniformLocation(gl.program, 'u_LightPosition3');
  var u_LightPosition4 = gl.getUniformLocation(gl.program, 'u_LightPosition4');
  var u_LightPosition5 = gl.getUniformLocation(gl.program, 'u_LightPosition5');
  var u_LightPosition6 = gl.getUniformLocation(gl.program, 'u_LightPosition6');
  var u_LightPosition7 = gl.getUniformLocation(gl.program, 'u_LightPosition7');
  var u_LightPosition8 = gl.getUniformLocation(gl.program, 'u_LightPosition8');
  var u_LightPosition9 = gl.getUniformLocation(gl.program, 'u_LightPosition9');
  var u_LightPosition10 = gl.getUniformLocation(gl.program, 'u_LightPosition10');
  var u_LightPosition11 = gl.getUniformLocation(gl.program, 'u_LightPosition11');
  var u_LightPosition12 = gl.getUniformLocation(gl.program, 'u_LightPosition12');
  var u_LightPosition13 = gl.getUniformLocation(gl.program, 'u_LightPosition13');
  var u_LightPosition14 = gl.getUniformLocation(gl.program, 'u_LightPosition14');
  var u_LightPosition15 = gl.getUniformLocation(gl.program, 'u_LightPosition15');
  var u_LightPosition16 = gl.getUniformLocation(gl.program, 'u_LightPosition16');
  var u_LightPosition17 = gl.getUniformLocation(gl.program, 'u_LightPosition17');
  var u_LightPosition18 = gl.getUniformLocation(gl.program, 'u_LightPosition18');
  var u_LightPosition19 = gl.getUniformLocation(gl.program, 'u_LightPosition19');
  var u_LightPosition20 = gl.getUniformLocation(gl.program, 'u_LightPosition20');
  var u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');

  u_isTexture = gl.getUniformLocation(gl.program, 'u_isTexture');
  //Check
  a_Color = gl.getAttribLocation(gl.program, 'a_Color')
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
  a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  u_scale = gl.getUniformLocation(gl.program, 'u_scale')

  gl.uniform1i(u_isTexture, false);
  gl.uniform1f(u_scale, 1.0);

  if (!u_ModelMatrix || !u_MvpMatrix || !u_NormalMatrix || !u_LightColor || !u_LightPosition || !u_LightPosition2 || !u_LightPosition3 || !u_LightPosition4 || !u_LightPosition5 || !u_LightPosition6 || !u_AmbientLight) { 
    console.log('Failed to get the storage location');
    return;
  }
  //Update lights
  function update_lights(){
    gl.uniform3f(u_LightColor, (light_color[0]+redMod)*lightOn, (light_color[1]+greenMod)*lightOn,(light_color[2]+blueMod)*lightOn);
    gl.uniform3f(u_LightColor2, (light_color2[0]+redMod)*lightOn2, (light_color2[1]+greenMod)*lightOn2, (light_color2[2]+blueMod)*lightOn2);
    gl.uniform3f(u_LightColor3, (light_color3[0]+redMod)*lightOn3, (light_color3[1]+greenMod)*lightOn3, (light_color3[2]+blueMod)*lightOn3);
    gl.uniform3f(u_LightColor4, (light_color4[0]+redMod)*lightOn4, (light_color4[1]+greenMod)*lightOn4, (light_color4[2]+blueMod)*lightOn4);
    gl.uniform3f(u_LightColor5, (light_color5[0]+redMod)*lightOn5, (light_color5[1]+greenMod)*lightOn5, (light_color5[2]+blueMod)*lightOn5);
    gl.uniform3f(u_LightColor6, (light_color6[0]+redMod)*lightOn6, (light_color6[1]+greenMod)*lightOn6, (light_color6[2]+blueMod)*lightOn6);
    gl.uniform3f(u_LightColor7, (light_color7[0]+redMod)*lightOn7, (light_color7[1]+greenMod)*lightOn7, (light_color7[2]+blueMod)*lightOn7);
    gl.uniform3f(u_LightColor8, (light_color8[0]+redMod)*lightOn8, (light_color8[1]+greenMod)*lightOn8, (light_color8[2]+blueMod)*lightOn8);
    gl.uniform3f(u_LightColor9, (light_color9[0]+redMod)*lightOn9, (light_color9[1]+greenMod)*lightOn9, (light_color9[2]+blueMod)*lightOn9);
    gl.uniform3f(u_LightColor10, (light_color10[0]+redMod)*lightOn10, (light_color10[1]+greenMod)*lightOn10, (light_color10[2]+blueMod)*lightOn10);
    gl.uniform3f(u_LightColor11, (light_color11[0]+redMod)*lightOn11, (light_color11[1]+greenMod)*lightOn11, (light_color11[2]+blueMod)*lightOn11);
    gl.uniform3f(u_LightColor12, (light_color12[0]+redMod)*lightOn12, (light_color12[1]+greenMod)*lightOn12, (light_color12[2]+blueMod)*lightOn12);
    gl.uniform3f(u_LightColor13, (light_color13[0]+redMod)*lightOn13, (light_color13[1]+greenMod)*lightOn13, (light_color13[2]+blueMod)*lightOn13);
    gl.uniform3f(u_LightColor14, (light_color14[0]+redMod)*lightOn14, (light_color14[1]+greenMod)*lightOn14, (light_color14[2]+blueMod)*lightOn14);
    gl.uniform3f(u_LightColor15, (light_color15[0]+redMod)*lightOn15, (light_color15[1]+greenMod)*lightOn15, (light_color15[2]+blueMod)*lightOn15);
    gl.uniform3f(u_LightColor16, (light_color16[0]+redMod)*lightOn16, (light_color16[1]+greenMod)*lightOn16, (light_color16[2]+blueMod)*lightOn16);
    gl.uniform3f(u_LightColor17, (light_color17[0]+redMod)*lightOn17, (light_color17[1]+greenMod)*lightOn17, (light_color17[2]+blueMod)*lightOn17);
    gl.uniform3f(u_LightColor18, (light_color18[0]+redMod)*lightOn18, (light_color18[1]+greenMod)*lightOn18, (light_color18[2]+blueMod)*lightOn18);
    gl.uniform3f(u_LightColor19, (light_color19[0]+redMod)*lightOn19, (light_color19[1]+greenMod)*lightOn19, (light_color19[2]+blueMod)*lightOn19);
    gl.uniform3f(u_LightColor20, (light_color20[0]+redMod)*lightOn20, (light_color20[1]+greenMod)*lightOn20, (light_color20[2]+blueMod)*lightOn20);
    gl.uniform3f(u_AmbientLight, ambLight, ambLight, ambLight);
    } 
    // Set the light direction (in the world coordinate)
    gl.uniform3f(u_LightPosition, -20, 45, -15);
    gl.uniform3f(u_LightPosition2, -20, 45, -55);
    gl.uniform3f(u_LightPosition3, -20, 45, -95);
    gl.uniform3f(u_LightPosition4, -20, 45, -135);
    gl.uniform3f(u_LightPosition5, -60, 45, -15);
    gl.uniform3f(u_LightPosition6, -60, 45, -55);
    gl.uniform3f(u_LightPosition7, -60, 45, -95);
    gl.uniform3f(u_LightPosition8, -60, 45, -135);
    gl.uniform3f(u_LightPosition9, -100, 45, -15);
    gl.uniform3f(u_LightPosition10, -100, 45, -55);
    gl.uniform3f(u_LightPosition11, -100, 45, -95);
    gl.uniform3f(u_LightPosition12, -100, 45, -135);
    gl.uniform3f(u_LightPosition13, -140, 45, -15);
    gl.uniform3f(u_LightPosition14, -140, 45, -55);
    gl.uniform3f(u_LightPosition15, -140, 45, -95);
    gl.uniform3f(u_LightPosition16, -140, 45, -135);
    gl.uniform3f(u_LightPosition17, -180, 45, -15);
    gl.uniform3f(u_LightPosition18, -180, 45, -55);
    gl.uniform3f(u_LightPosition19, -180, 45, -95);
    gl.uniform3f(u_LightPosition20, -180, 45, -135);
    // Set the ambient light
    console.log('Amb Light ' + ambLight);
    gl.uniform3f(u_AmbientLight, ambLight, ambLight, ambLight-0.2);

    n = makeCube(gl);
    texCube = texturedCube(gl, 'textures/durham.png');
    texCube2 = texturedCube(gl, 'textures/board.png');
    texCube3 = texturedCube(gl, 'textures/slender.jpeg');
    if (n < 0) {
      console.log('Failed to set the vertex information');
      return;
  }

  // Calculate the view projection matrix  
  var viewProjMatrix = new Matrix4();

 /* // event listener for key presses
  document.addEventListener('keydown', function(event) { 
    keydown(event, gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, canvas.width, canvas.height)
  }, false);*/

  var keys = {};
  
  document.onkeydown = function(ev){
    keys[ev.keyCode] = true;
  }

  document.onkeyup = function(ev){
    keys[ev.keyCode] = false;
  }

  introLights();
  //Update scene and draw every tick
  tick();
  function tick() {
    requestAnimFrame(tick);
    findFps();
    // Start drawing
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    update_look_at(); // Initially set camera
    update_lights();
    viewProjMatrix.setPerspective(50.0, canvas.width / canvas.height, 1.0, 700.0);
    viewProjMatrix.lookAt(camera_pos[0], camera_pos[1], [camera_pos[2]], camera_pos[0] + look_at[0], camera_pos[1] + look_at[1], camera_pos[2] + look_at[2], 0.0, 1.0, 0);
    draw(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw
    checkKeys(keys);
    checkSelnder()
  }
}

var fps = 30;
var timeNow=0;
var currentFps=0;
var timeLast=0;

function findFps() {
  timeNow = new Date().getTime();
  currentFps++;
  if (timeNow - timeLast >= 1000) {
      document.getElementById('fps_counter').innerHTML = "<b>FPS: </b>" + Number(currentFps * 1000.0 / (timeNow - timeLast)).toPrecision( 5 );
      //Reset for next calc
      timeLast = timeNow;
      currentFps = 0;
  }
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / fps);
          };
})();

/*========================= Camera Handling ========================= */
var lookSpeed = 1;
//Camera functionality
var camera_pos = [-10.0, 30.0, -10.0];
//var camera_pos = [100,30,-90];
var look_at = [0.0, 0.0, 0.0];

//Pointer lock methods
canvas.requestPointerLock = canvas.requestPointerLock ||
           canvas.mozRequestPointerLock ||
           canvas.webkitRequestPointerLock;
document.exitPointerLock = document.exitPointerLock ||
         document.mozExitPointerLock ||
         document.webkitExitPointerLock;
//document.exitPointerLock();
//Start pointer lock
canvas.onclick = function() {
  canvas.requestPointerLock();
}
// pointer c event listeners
// Hook pointer lock state change events for different browsers
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);
//Toggle mouse pointer lock
function lockChangeAlert() {
  if(document.pointerLockElement === canvas ||
  document.mozPointerLockElement === canvas ||
  document.webkitPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    document.addEventListener("mousemove", changeCameraView, false);
  } else {
    console.log('The pointer lock status is now unlocked');  
    document.removeEventListener("mousemove", changeCameraView, false);
  }
}
//Changes camera view based on mouse position changes
function changeCameraView(e) {
  var movementX = e.movementX ||
      e.mozMovementX          ||
      e.webkitMovementX       ||
      0;
  var movementY = e.movementY ||
      e.mozMovementY      ||
      e.webkitMovementY   ||
      0;
  theta += movementX * lookSpeed * 0.005;
  phi += movementY * lookSpeed * 0.005;
}
//Unpdates the camera's position + orientation
function update_look_at() {
  look_at = [Math.cos(theta)*Math.sin(phi), Math.cos(phi), Math.sin(theta)*Math.sin(phi)];
}

/*========================= Key Handling ========================= */

//Movement vars
var moveSpeed = 1;
var doorMove;
var blindMove;

//audio
var audio = new Audio('audio/lightOn.mp3');
var audio2 = new Audio('audio/lightOn2.mp3');
var audio3 = new Audio('audio/lightOn.mp3');

function checkKeys(keys) {
    if (keys[87]){ // 'w'key -> Move forward at camera direction
      camera_pos[0] += look_at[0]*moveSpeed;
      camera_pos[1] += look_at[1]*moveSpeed;
      camera_pos[2] += look_at[2]*moveSpeed;
    }
    if (keys[83]){ // 's'key -> Move backward at camera direction
      camera_pos[0] -= look_at[0]*moveSpeed;
      camera_pos[1] -= look_at[1]*moveSpeed;
      camera_pos[2] -= look_at[2]*moveSpeed;
   }
    if (keys[68]){ // 'd'key -> Move right relative to camera direction
      camera_pos[0] -= look_at[2]*moveSpeed;
      camera_pos[2] += look_at[0]*moveSpeed;
   }
    if (keys[65]){ // 'a'key -> Move left relative to camera direction
      camera_pos[0] += look_at[2]*moveSpeed;
      camera_pos[2] -= look_at[0]*moveSpeed;
   }
    if (keys[81]){ // 'q'key -> Drop camera height
      camera_pos[1] -= moveSpeed; 
   }
    if (keys[69]){ // 'e'key -> Increase camera height
      camera_pos[1] += moveSpeed;
   }
    if (keys[90]){ // 'z'key -> Decrease camera sensitivity
      if(lookSpeed > 1){ lookSpeed -= 1; };
   }
    if (keys[88]){ // 'x'key -> Increase camera sensitivity
   }
    if (keys[79]){ // 'o'key -> Open door
      clearInterval(doorMove);
      doorMove = setInterval(function () {openDoor()}, 50);
      keys[79]=false;
   }
    if (keys[80]){ // 'p'key -> Close door
      clearInterval(doorMove);
      doorMove = setInterval(function () {closeDoor()}, 50);
      keys[80]=false;
   }
    if (keys[78]){ // 'n'key -> Open blind
      clearInterval(blindMove);
      blindMove = setInterval(function () {openBlinds()}, 50);
      keys[78]=false;
    }
    if (keys[66]){ // 'b'key -> Close blind
      clearInterval(blindMove);
      blindMove = setInterval(function () {closeBlinds()}, 50);
      keys[66]=false;
    }
    if (keys[49]){ // '1'key -> Toggle Light 1+2
      lightOn = !lightOn;
      lightOn2 = !lightOn2;
      lightOn3 = !lightOn3;
      lightOn4 = !lightOn4;
      audio.play();
      keys[49]=false;
    }
    if (keys[50]){ // '2'key -> Toggle Light 3+4
      lightOn5 = !lightOn5;
      lightOn6 = !lightOn6;
      lightOn7 = !lightOn7;
      lightOn8 = !lightOn8;
      audio.play();
      keys[50]=false;
     }
    if (keys[51]){ // '3'key -> Toggle Light 5+6
      lightOn9 = !lightOn9;
      lightOn10 = !lightOn10;
      lightOn11 = !lightOn11;
      lightOn12 = !lightOn12;
      audio2.play();
      keys[51]=false;
    }
    if (keys[52]){ // '4'key -> Toggle Light 5+6
        lightOn13 = !lightOn13;
        lightOn14 = !lightOn14;
        lightOn15 = !lightOn15;
        lightOn16 = !lightOn16;
        audio2.play();
        keys[52]=false;
    }
    if (keys[53]){ // '5'key -> Toggle Light 5+6
      lightOn17 = !lightOn17;
      lightOn18 = !lightOn18;
      lightOn19 = !lightOn19;
      lightOn20 = !lightOn20;
      audio.play();
      keys[53]=false;
    }
    if (keys[77]){ // 'm'key -> Toggle Light 5+6
      discoLights();
    }
    if (keys[75]){ // 'n'key -> Toggle Light 5+6
      normalLights();
    }
}

/*========================= Dynamic Objects ========================= */

var blindSize = 20;
//Open/Close Doors
function openDoor(){
  doorAngle +=0.05
  if(doorAngle >= 3*Math.PI/4 + 0.1){ 
    clearInterval(doorMove);
  }
}
function closeDoor(){
  doorAngle -=0.05
  if(doorAngle <= 0.1){
    doorAngle = 0
    clearInterval(doorMove);
  };
}
//Open/Close blinds
function openBlinds(){
  blindSize -=0.1
  if(blindSize < 0.1){
    blindSize = 0
    clearInterval(blindMove);
  };
  ambLight +=0.003
  if (ambLight >= 0.4){
    ambLight = 0.4;
  };
}
function closeBlinds(){
  blindSize +=0.1
  if(blindSize > 20){
    blindSize = 20
    clearInterval(blindMove);
  };
  ambLight -=0.003
  if (ambLight <= 0){
    ambLight = 0;
  };
}

blindMove = setInterval(function () {closeBlinds()}, 50);

setInterval(function () {flickerLight()}, 13000);
setInterval(function () {flickerLight2()}, 19000);

function flickerLight(){
  audio2.play();
  if (lightOn7 = true){
    lightOn7 = !lightOn7;
    setTimeout(function(){
      lightOn7 = !lightOn7;
    },200);
  };
}

function flickerLight2(){
  audio.play();
  if (lightOn7 = true){
    lightOn13 = !lightOn13;
    setTimeout(function(){
      lightOn13 = !lightOn13;
    },200);
  };
}

function introLights(){
  theta+=0.4
  setTimeout(function(){
    lightOn = !lightOn;
    lightOn2 = !lightOn2;
    lightOn3 = !lightOn3;
    lightOn4 = !lightOn4; 
    audio.play(); 
  },5000); 
  setTimeout(function(){
    lightOn5 = !lightOn5;
    lightOn6 = !lightOn6;
    lightOn7 = !lightOn7;
    lightOn8 = !lightOn8;
    audio2.play();
  },4000); 
  setTimeout(function(){
    lightOn9 = !lightOn9;
    lightOn10 = !lightOn10;
    lightOn11 = !lightOn11;
    lightOn12 = !lightOn12;
    audio3.play();
  },3000); 
  setTimeout(function(){
    lightOn13 = !lightOn13;
    lightOn14 = !lightOn14;
    lightOn15 = !lightOn15;
    lightOn16 = !lightOn16;
    audio.play();
  },2000); 
  setTimeout(function(){
    lightOn17 = !lightOn17;
    lightOn18 = !lightOn18;
    lightOn19 = !lightOn19;
    lightOn20 = !lightOn20;
    audio2.play();
  },1000); 
  /*setTimeout(function(){
    clearInterval(blindMove);
    blindMove = setInterval(function () {openBlinds()}, 50);
  },6000);*/
}

function discoLights(){
  redMod =  Math.random() * (2 - 0) - 1;
  greenMod =  Math.random() * (2 - 0) - 1;
  blueMod =  Math.random() * (2 - 0) - 1;
}

function normalLights(){
  console.log('norm');
  redMod = 0.05;
  greenMod = 0;
  blueMod = -0.1;
}

function checkSelnder(){
  if (camera_pos[0]>-168 && camera_pos[0]<-153){
    if (camera_pos[1]>7.5 && camera_pos[1]<17.5){
        if (camera_pos[2]>-43 && camera_pos[2]<-27){
          console.log('did');
          showSlender();
          return
      }
    }
  }
  hideSlender();
}

function showSlender(){
  document.getElementById('slenderNoteBG').style.position='absolute';
  document.getElementById('slenderNoteBG').style.top='0';
  document.getElementById('slenderNoteBG').style.left='0';
  document.getElementById('slenderNoteBG').style.display='block';
  document.getElementById('slenderNoteBG').style.paddingLeft='40%';
  document.getElementById('slenderNoteBG').style.paddingTop='20%';
  document.getElementById('slenderNoteBG').style.width='100%';
  document.getElementById('slenderNoteBG').style.height='100%';
  document.getElementById('slenderNoteBG').style.height='100%';
  document.getElementById('slenderNoteBG').style.backgroundColor='rgba(1,1,1,0.5)';
  document.getElementById('slenderNote').style.display='block';
  document.getElementById('slenderNote').style.width='181px';
  document.getElementById('slenderNote').style.height='257px';
  document.getElementById('slenderNote').style.backgroundImage='url("textures/slender2.jpeg")';
  document.getElementById('slenderNote').style.backgroundSize='100%';
}

function hideSlender(){
  document.getElementById('slenderNoteBG').style.display='none';
  document.getElementById('slenderNote').style.display='none';
}
/*========================= Buffers ========================= */
function makeCube(gl) {
  // Coordinates（Cube which length of one side is 1 with the origin on the center of the bottom)
  var c = new Object();
  var vertices = new Float32Array([
    0.5, 1.0, 0.5, -0.5, 1.0, 0.5, -0.5, 0.0, 0.5,  0.5, 0.0, 0.5, // v0-v1-v2-v3 front
    0.5, 1.0, 0.5,  0.5, 0.0, 0.5,  0.5, 0.0,-0.5,  0.5, 1.0,-0.5, // v0-v3-v4-v5 right
    0.5, 1.0, 0.5,  0.5, 1.0,-0.5, -0.5, 1.0,-0.5, -0.5, 1.0, 0.5, // v0-v5-v6-v1 up
   -0.5, 1.0, 0.5, -0.5, 1.0,-0.5, -0.5, 0.0,-0.5, -0.5, 0.0, 0.5, // v1-v6-v7-v2 left
   -0.5, 0.0,-0.5,  0.5, 0.0,-0.5,  0.5, 0.0, 0.5, -0.5, 0.0, 0.5, // v7-v4-v3-v2 down
    0.5, 0.0,-0.5, -0.5, 0.0,-0.5, -0.5, 1.0,-0.5,  0.5, 1.0,-0.5  // v4-v7-v6-v5 back
  ]);
  // Normal
  var normals = new Float32Array([
    0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0, // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0, // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0, // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0  // v4-v7-v6-v5 back
  ]);
  // Indices of the vertices
  var indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
  ]);
  c.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
  c.normalBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
  c.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
  c.numIndices = indices.length;
  c.isTextured = false;

  if (!c.vertexBuffer || !c.indexBuffer || !c.normalBuffer) return null; 
  return c;
}

function texturedCube(gl, imagePath) {
  var o = new Object();
  // Coordinatesï¼ˆCube which length of one side is 1 with the origin on the center of the bottom)
  var vertices = new Float32Array([
    0.5, 1.0, 0.5, -0.5, 1.0, 0.5, -0.5, 0.0, 0.5,  0.5, 0.0, 0.5, // v0-v1-v2-v3 front
    0.5, 1.0, 0.5,  0.5, 0.0, 0.5,  0.5, 0.0,-0.5,  0.5, 1.0,-0.5, // v0-v3-v4-v5 right
    0.5, 1.0, 0.5,  0.5, 1.0,-0.5, -0.5, 1.0,-0.5, -0.5, 1.0, 0.5, // v0-v5-v6-v1 up
   -0.5, 1.0, 0.5, -0.5, 1.0,-0.5, -0.5, 0.0,-0.5, -0.5, 0.0, 0.5, // v1-v6-v7-v2 left
   -0.5, 0.0,-0.5,  0.5, 0.0,-0.5,  0.5, 0.0, 0.5, -0.5, 0.0, 0.5, // v7-v4-v3-v2 down
    0.5, 0.0,-0.5, -0.5, 0.0,-0.5, -0.5, 1.0,-0.5,  0.5, 1.0,-0.5  // v4-v7-v6-v5 back
  ]);
  // Normal
  var normals = new Float32Array([
    0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0, // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0, // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0, // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0  // v4-v7-v6-v5 back
  ]);
  // Texture coordinates
  var texCoords = new Float32Array([
      1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v0-v1-v2-v3 front
      0.0, 1.0,   0.0, 0.0,   1.0, 0.0,   1.0, 1.0,    // v0-v3-v4-v5 right
      1.0, 0.0,   1.0, 1.0,   0.0, 1.0,   0.0, 0.0,    // v0-v5-v6-v1 up
      1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v1-v6-v7-v2 left
      0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,    // v7-v4-v3-v2 down
      0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0     // v4-v7-v6-v5 back
  ]);
  // Indices of the vertices
  var indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
  ]);

  o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
  o.normalBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
  o.texCoordBuffer = initArrayBufferForLaterUse(gl, texCoords, 2, gl.FLOAT);
  o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
  o.texture = initTextures(gl, imagePath)
  o.numIndices = indices.length;
  o.isTextured = true;

  if (!o.vertexBuffer || !o.texCoordBuffer || !o.indexBuffer || !o.normalBuffer) return null; 
  return o;
}

function initArrayBuffer(gl, attribute, data, type, num) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);
  return true;
}

// Coordinate transformation matrix
var g_modelMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();

/*========================= Textures ========================= */

/*========================= DrawShapes ========================= */
function draw(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix) {
  pushMatrix(g_modelMatrix);
    drawFloor(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawWalls(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawBlinds(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawStage(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawDoor(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, doorAngle);
    drawSliders(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawBoards(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawLights(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawTables(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawChairs(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawDurham(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawNote(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();

  document.getElementById("speed").innerHTML = "<b>Speed (Camera Sensitivity): </b>" + lookSpeed;
  document.getElementById("camera_coords").innerHTML = "<b>Camera Coordinates: </b>" + camera_pos[0].toFixed(2) + ", " + camera_pos[1].toFixed(2) + ", " + camera_pos[2].toFixed(2);
}

// TABLES
function drawTables(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix) {
  pushMatrix(g_modelMatrix);
  for (var l = 0; l < 2; l++) {
    for (var k = 0; k < 6; k++) {
      drawTable(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, -14 + k*-15, 15-(3*k), -37.5 -(75*l));
    };
  };
  drawPodium(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, -160,2,-35);
  g_modelMatrix = popMatrix();
}

function drawTable(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, x, y, z) {
  g_modelMatrix.setTranslate(x, y, z);
  gl.vertexAttrib3f(a_Color, black[0], black[1], black[2]);
  //Legs
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
      pushMatrix(g_modelMatrix); // Draw Leg 1
      g_modelMatrix.translate(3.5 - (7 * i), 0.0, 30.5 - (61 * j));
      drawBox(gl, n, 0.5, 9.0, 0.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
      g_modelMatrix = popMatrix();
    };
  };
  gl.vertexAttrib3f(a_Color, brown[0], brown[1], brown[2]);
  // Top
  g_modelMatrix.translate(0.0, 9.0, 0.0); //move to table centre
  pushMatrix(g_modelMatrix);
  drawBox(gl, n, 8.0, 0.5, 62.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();

  // Front
  g_modelMatrix.rotate(90.0, 0.0, 0, 90.0); 
  g_modelMatrix.translate(-3.5, 3.0, 0.0);
  pushMatrix(g_modelMatrix);
  drawBox(gl, n, 8.0, 0.5, 62.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();
}

function drawPodium(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, x, y, z) {
  g_modelMatrix.setTranslate(x, y, z);
  // Top
  g_modelMatrix.translate(0.0, 10.0, 0.0); //move to table centre
  pushMatrix(g_modelMatrix);
  drawBox(gl, n, 14.0, 0.5, 62.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();

  // Front
  g_modelMatrix.rotate(90.0, 0.0, 0, 90.0); 
  g_modelMatrix.translate(-7, -7, 0.0);
  pushMatrix(g_modelMatrix);
  drawBox(gl, n, 14.0, 0.5, 62.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();

  // Sides
  g_modelMatrix.rotate(90.0, 9.0, 0, 0.0);
  g_modelMatrix.translate(0.0, 30.5, -7.0);
  for (var i = 0; i < 2; i++) {
    g_modelMatrix.translate(0.0, -(61.5*i), 0.0);
    pushMatrix(g_modelMatrix);
    drawBox(gl, n, 14.0, 0.5, 14.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix = popMatrix();
  };
}

// CHAIRS
function drawChairs(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix) {
  pushMatrix(g_modelMatrix);
  for (var h = 0; h < 2; h++) {
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 7; j++) {
        drawChair(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, -10 + i*-15, 15-(3*i), -12.5 - (h * 75) + (j * -8.5), 10*i);
      };
    };
  };
  g_modelMatrix = popMatrix();
}

function drawChair(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, x, y, z) {
  g_modelMatrix.setTranslate(x, y, z);
  gl.vertexAttrib3f(a_Color, black[0], black[1], black[2]);
  //Legs
  for (var l = 0; l < 2; l++) {
    for (var k = 0; k < 2; k++) {
      pushMatrix(g_modelMatrix); // Draw Leg 1
      g_modelMatrix.translate(2.5 - (5 * l), 0.0, 2.5 - (5 * k));
      drawBox(gl, n, 0.5, 5.0, 0.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
      g_modelMatrix = popMatrix();
    };
  };
  // Move to the center of chair
  g_modelMatrix.translate(0.0, 5.0, 0.0);
  gl.vertexAttrib3f(a_Color, purple[0], purple[1], purple[2]);
  // Draw Seat
  //gl.uniform1f(u_scale, 1.0);//change scale
  pushMatrix(g_modelMatrix);
  drawBox(gl, n, 6.0, 0.5, 6.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();
  //gl.uniform1f(u_scale, 1.0);//change back

  // Move back of chair
  g_modelMatrix.translate(2.5, 0.5, 0.0);

  // Draw back of chair
  pushMatrix(g_modelMatrix);
    g_modelMatrix.rotate(90.0, 0.0, 0.5, 0.0);  // Rotate around the y-axis
    drawBox(gl, n, 6.0, 7.0, 0.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();
}

function drawFloor(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  gl.vertexAttrib3f(a_Color, grey[0], grey[1], grey[2]);
  g_modelMatrix.setTranslate(-100, -1, -75);
  drawBox(gl, n, 200.0, 1.0, 150.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  gl.vertexAttrib3f(a_Color, green[0], green[1], green[2]);
  g_modelMatrix.setTranslate(-100, -2, -75);
  drawBox(gl, n, 500.0, 1.0, 500.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  drawSteps(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
}

function drawSteps(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix) {
  gl.vertexAttrib3f(a_Color, grey[0], grey[1], grey[2]);
  pushMatrix(g_modelMatrix);
    for (var p = 1; p < 6; p++) {
        drawStep(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, 3.95 + (p *-15), 13-(3*p), -77.5, n);
    };
  g_modelMatrix = popMatrix();
}

function drawStep(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, x, y, z){
  g_modelMatrix.setTranslate(x, y, z);
  pushMatrix(g_modelMatrix);// Draw Leg 1
  g_modelMatrix.translate(2.5, 0.0, 2.5);
  drawBox(gl, n, 19, 5.0, 149, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();
}

function drawWalls(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  gl.vertexAttrib3f(a_Color, cream[0], cream[1], cream[2]);
  //Back part of door wall
  g_modelMatrix.setTranslate(-56, 0, -149.5);
  drawBox(gl, n, 112.0, 26, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  //Door wall top panel
  g_modelMatrix.setTranslate(-100, 26, -149.5);
  drawBox(gl, n, 200.0, 24, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  //Door wall front panel
  g_modelMatrix.setTranslate(-164, 0, -149.5);
  drawBox(gl, n, 72.0, 26, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  
  //Not door wall
  g_modelMatrix.setTranslate(-10, 0, -0.5);
  for (var i = 0; i < 9; i++) {
    drawBox(gl, n, 20.0, 50, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    if (i==8){
      break;
    }
    for (var j = 0; j < 2; j++) {
      g_modelMatrix.setTranslate(-22.5 -(25* i), 0 + (j*35), -0.5);
      drawBox(gl, n, 5, 15, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    };
    g_modelMatrix.setTranslate(-10 -(25 * i), 0, -0.5);
  };
  //Front wall
  g_modelMatrix.setTranslate(-199.5, 0, -75);
  g_modelMatrix.rotate(90.0, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  drawBox(gl, n, 149.0, 50, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  //Back wall
  g_modelMatrix.setTranslate(0,0,-75);
  g_modelMatrix.rotate(90.0, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  drawBox(gl, n, 149.0, 50, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  //roof
  g_modelMatrix.setTranslate(-100, 50, -75);
  drawBox(gl, n, 200.0, 1, 150, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
}

function drawBlinds(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix) {
  gl.vertexAttrib3f(a_Color, grey[0], grey[1], grey[2]);
  for (var i = 0; i < 8; i++) {
  g_modelMatrix.setTranslate(-22.5 -(25* i), 35-(blindSize), -0.5);
  drawBox(gl, n, 5, blindSize, 0.3, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  };
};

function drawDoor(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, doorAngle){
  gl.vertexAttrib3f(a_Color, brown[0], brown[1], brown[2]);
  g_modelMatrix.setTranslate(0, 0, 0);
  g_modelMatrix.translate(-128 +Math.cos(doorAngle)*8, 0, -149.5 -Math.sin(doorAngle)*8);
  g_modelMatrix.rotate(doorAngle*360/(2*Math.PI), 0, 1, 0);
  drawBox(gl, n, 16.0, 26, 0.7, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
}

function drawStage(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  gl.vertexAttrib3f(a_Color, 1, 1, 1);
  g_modelMatrix.setTranslate(-174.5, 0, -75);
  drawBox(gl, n, 49.0, 2, 148, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
}

function drawSliders(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  gl.vertexAttrib3f(a_Color, goldBrown[0], goldBrown[1], goldBrown[2]);
  g_modelMatrix.setTranslate(-198, 10, -75);
  drawBox(gl, n, 2, 38, 0.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix.translate(0, 0, -69.5)
  drawBox(gl, n, 2, 38, 0.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix.translate(0, 0, 139)
  drawBox(gl, n, 2, 38, 0.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
}

function drawBoards(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  g_modelMatrix.setTranslate(-198.5, 11, -109.75);
  drawBoard(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix.translate(0, 0, 69.5)
  drawBoard(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix.translate(1, 19.5, 0);
  drawBoard(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix.translate(0, 0, -69.5)
  drawBoard(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
}

function drawBoard(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  pushMatrix(g_modelMatrix);
    gl.vertexAttrib3f(a_Color, greyGreen[0], greyGreen[1], greyGreen[2]);
    drawBox(gl, texCube2, 0.3, 16, 68, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  
    gl.vertexAttrib3f(a_Color, grey[0], grey[1], grey[2]);
    g_modelMatrix.translate(0, 0, 0);// Bottom frame
    drawBox(gl, n, 0.5, 0.5, 69, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix.translate(0, 16, 0);// Top frame
    drawBox(gl, n, 0.5, 0.5, 69, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix.translate(0, -16, 34); //Left frame
    drawBox(gl, n, 0.5, 16, 0.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix.translate(0, 0, -68); //Right frame
    drawBox(gl, n, 0.5, 16, 0.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();
}

function drawLights(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  pushMatrix(g_modelMatrix);
    gl.vertexAttrib3f(a_Color, 1, 1, 1);
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 4; j++) {
        g_modelMatrix.setTranslate(-20-(40*i), 49.5, -15-(40*j));
        drawBox(gl, n, 2.6, 0.4, 13, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
      };
    };
  g_modelMatrix = popMatrix();
}

function drawDurham(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  pushMatrix(g_modelMatrix);
    gl.vertexAttrib3f(a_Color, 1, 1, 1);
    g_modelMatrix.setTranslate(-200,-20,200);
    drawBox(gl, texCube, 16000, 400, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();
}

function drawNote(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  pushMatrix(g_modelMatrix);
    gl.vertexAttrib3f(a_Color, 1, 1, 1);
    g_modelMatrix.setTranslate(-160,12.5,-35);
    g_modelMatrix.rotate(90.0, 0.0, 0.5, 0.0);
    drawBox(gl, texCube3, 2.1, 0.05, 2.97, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();
}

var g_matrixStack = []; // Array for storing a matrix
function pushMatrix(m) { // Store the specified matrix to the array
  var m2 = new Matrix4(m);
  g_matrixStack.push(m2);
}

function popMatrix() { // Retrieve the matrix from the array
  return g_matrixStack.pop();
}

// Coordinate transformation matrix for normals
var g_normalMatrix = new Matrix4();  

// Draw rectangular solid
function drawBox(gl, n, width, height, depth, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix) {
  pushMatrix(g_modelMatrix);   // Save the model matrix
    initAttributeVariable(gl, a_Position, n.vertexBuffer);    // Vertex coordinates
    initAttributeVariable(gl, a_Normal, n.normalBuffer);  // Texture coordinates
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, n.indexBuffer);
    // Scale a cube and draw
    g_modelMatrix.scale(width, height, depth);
    // Pass the model matrix to u_ModelMatrix
    gl.uniformMatrix4fv(u_ModelMatrix, false, g_modelMatrix.elements);
    // Calculate the model view project matrix and pass it to u_MvpMatrix
    g_mvpMatrix.set(viewProjMatrix);
    g_mvpMatrix.multiply(g_modelMatrix);
    gl.uniformMatrix4fv(u_MvpMatrix, false, g_mvpMatrix.elements);
    // Calculate the normal transformation matrix and pass it to u_NormalMatrix
    g_normalMatrix.setInverseOf(g_modelMatrix);
    g_normalMatrix.transpose();
    gl.uniformMatrix4fv(u_NormalMatrix, false, g_normalMatrix.elements);

    if (n.isTextured != false){
      gl.uniform1i(u_isTexture, true);
      initAttributeVariable(gl, a_TexCoord, n.texCoordBuffer);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, n.texture);
      gl.drawElements(gl.TRIANGLES, n.numIndices, n.indexBuffer.type, 0);
      gl.uniform1i(u_isTexture, false);
    }
    else{
      gl.drawElements(gl.TRIANGLES, n.numIndices, n.indexBuffer.type, 0);
    }
  g_modelMatrix = popMatrix();   // Retrieve the model matrix
}

function initArrayBufferForLaterUse(gl, data, num, type) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return null;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // Store the necessary information to assign the object to the attribute variable later
  buffer.num = num;
  buffer.type = type;

  return buffer;
}

function initElementArrayBufferForLaterUse(gl, data, type) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return null;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

  buffer.type = type;

  return buffer;
}

function initAttributeVariable(gl, a_attribute, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(a_attribute, buffer.num, buffer.type, false, 0, 0);
  gl.enableVertexAttribArray(a_attribute);
}

function initTextures(gl, imagePath) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the Texture object');
    return null;
  }
  // if (!u_Sampler) {
  //   console.log('Failed to get the storage location of u_Sampler');
  //   return null;
  // }
  var image = new Image();  // Create image object
  if (!image) {
    console.log('Failed to create the Image object');
    return null;
  }
  // Register the event handler to be called when image loading is completed
  image.onload = function() {
    // Write image data to texture object
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image Y coordinate
    //gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    // Pass the texture unit 0 to u_Sampler
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.uniform1i(u_Sampler, 0);
    gl.bindTexture(gl.TEXTURE_2D, null); // Unbind the texture object
  };

  // Tell the browser to load an Image  
  image.src = imagePath;
  return texture;
}