// MultiJointModel.js (c) 2012 matsuda and itami
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
  'uniform mat4 u_NormalMatrix;\n' +   // Transformation matrix of the normal
  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
     // Calculate the vertex position in the world coordinate
  '  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
  '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '  v_Color = a_Color;\n' + 
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
  'uniform vec3 u_LightPosition;\n' +  // Position of the light source
  'uniform vec3 u_LightPosition2;\n' +
  'uniform vec3 u_LightPosition3;\n' +
  'uniform vec3 u_LightPosition4;\n' +
  'uniform vec3 u_LightPosition5;\n' +
  'uniform vec3 u_LightPosition6;\n' +
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec4 v_Color;\n' +
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
     // The dot product of the light direction and the orientation of a surface (the normal)
  '  float nDotL = 200.0*max(dot(lightDirection, normal), 0.0) / dot(u_LightPosition - v_Position, u_LightPosition - v_Position);\n' +
  '  float nDotL2 = 200.0*max(dot(lightDirection2, normal), 0.0) / dot(u_LightPosition2 - v_Position, u_LightPosition2 - v_Position);\n' +
  '  float nDotL3 = 200.0*max(dot(lightDirection3, normal), 0.0) / dot(u_LightPosition3 - v_Position, u_LightPosition3 - v_Position);\n' +
  '  float nDotL4 = 200.0*max(dot(lightDirection4, normal), 0.0) / dot(u_LightPosition4 - v_Position, u_LightPosition4 - v_Position);\n' +
  '  float nDotL5 = 200.0*max(dot(lightDirection5, normal), 0.0) / dot(u_LightPosition5 - v_Position, u_LightPosition5 - v_Position);\n' +
  '  float nDotL6 = 200.0*max(dot(lightDirection6, normal), 0.0) / dot(u_LightPosition6 - v_Position, u_LightPosition6 - v_Position);\n' +
     // Calculate the final color from diffuse reflection and ambient reflection
  '  vec3 diffuse = v_Color.rgb * (u_LightColor * nDotL + u_LightColor2 * nDotL2 + u_LightColor3 * nDotL3 + u_LightColor4 * nDotL4 + u_LightColor5 * nDotL5 + u_LightColor6 * nDotL6);\n' +
  '  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
  '  gl_FragColor = vec4(diffuse + ambient, v_Color.a);\n' +
  '}\n';

//Colour variable definitions
var theta = -Math.PI;
var phi = Math.PI/2;
var camera_pos = [100.0, 30.0, -75.0];
var look_at = [0.0, 0.0, 0.0];
var speed = 5;
var doorAngle = 0;
var red = [1, 0, 0];
var green = [0, 1, 0];
var blue = [0, 0, 1];
var grey = [0.5, 0.5, 0.5];
var black = [0, 0,0];
var dullOrange = [0.9, 0.5, 0.2];
var cream = [1, 0.92, 0.77];
var babyBlue = [0.6, 0.8, 1];
var brown = [0.8, 0.6, 0.43];
var goldBrown = [0.66, 0.5, 0.2];
var greyGreen = [0.23, 0.6, 0.4];
var sky = [0.4, 0.8, 0.85];
var lightOn = true;
var lightOn2 = true;
var lightOn3 = true;
var lightOn4 = true;
var lightOn5 = true;
var lightOn6 = true;
var light_color = [0.7, 0.7, 0.7];
var light_color2 = [0.7, 0.7, 0.7];
var light_color3 = [0.7, 0.7, 0.7];
var light_color4 = [0.7, 0.7, 0.7];
var light_color5 = [0.7, 0.7, 0.7];
var light_color6 = [0.7, 0.7, 0.7];

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Set the clear color and enable the depth test
  gl.clearColor(sky[0], sky[1], sky[2], 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Get the storage locations of uniform variables
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  var u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
  var u_LightColor2 = gl.getUniformLocation(gl.program, 'u_LightColor2');
  var u_LightColor3 = gl.getUniformLocation(gl.program, 'u_LightColor3');
  var u_LightColor4 = gl.getUniformLocation(gl.program, 'u_LightColor4');
  var u_LightColor5 = gl.getUniformLocation(gl.program, 'u_LightColor5');
  var u_LightColor6 = gl.getUniformLocation(gl.program, 'u_LightColor6');
  var u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
  var u_LightPosition2 = gl.getUniformLocation(gl.program, 'u_LightPosition2');
  var u_LightPosition3 = gl.getUniformLocation(gl.program, 'u_LightPosition3');
  var u_LightPosition4 = gl.getUniformLocation(gl.program, 'u_LightPosition4');
  var u_LightPosition5 = gl.getUniformLocation(gl.program, 'u_LightPosition5');
  var u_LightPosition6 = gl.getUniformLocation(gl.program, 'u_LightPosition6');
  var u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');
  a_Color = gl.getAttribLocation(gl.program, 'a_Color')
  if (!u_ModelMatrix || !u_MvpMatrix || !u_NormalMatrix || !u_LightColor || !u_LightPosition || !u_LightPosition2 || !u_LightPosition3 || !u_LightPosition4 || !u_LightPosition5 || !u_LightPosition6 || !u_AmbientLight) { 
    console.log('Failed to get the storage location');
    return;
  }

  function update_lights(){
  gl.uniform3f(u_LightColor, light_color[0]*lightOn, light_color[1]*lightOn, light_color[2]*lightOn);
  gl.uniform3f(u_LightColor2, light_color2[0]*lightOn2, light_color2[1]*lightOn2, light_color2[2]*lightOn2);
  gl.uniform3f(u_LightColor3, light_color3[0]*lightOn3, light_color3[1]*lightOn3, light_color3[2]*lightOn3);
  gl.uniform3f(u_LightColor4, light_color4[0]*lightOn4, light_color4[1]*lightOn4, light_color4[2]*lightOn4);
  gl.uniform3f(u_LightColor5, light_color5[0]*lightOn5, light_color5[1]*lightOn5, light_color5[2]*lightOn5);
  gl.uniform3f(u_LightColor6, light_color6[0]*lightOn6, light_color6[1]*lightOn6, light_color6[2]*lightOn6);
  } 
  // Set the light direction (in the world coordinate)
  gl.uniform3f(u_LightPosition, -30, 45, -37.5);
  gl.uniform3f(u_LightPosition2, -30, 45.0, -112.5);
  gl.uniform3f(u_LightPosition3, -100, 45.0, -37.5);
  gl.uniform3f(u_LightPosition4, -100.5, 45.0, -112.5);
  gl.uniform3f(u_LightPosition5, -170, 45.0, -37.5);
  gl.uniform3f(u_LightPosition6, -170, 45.0, -112.5);
  // Set the ambient light
  gl.uniform3f(u_AmbientLight, 0.2, 0.2, 0.2);

  n = initVertexBuffers(gl);
    if (n < 0) {
      console.log('Failed to set the vertex information');
      return;
    }

  // Calculate the view projection matrix  
  var viewProjMatrix = new Matrix4();
  // Register the event handler to be called on key press
  document.onkeydown = function(ev){ keydown(ev, gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, canvas.width, canvas.height); };

  var tick = function() {    // Start drawing
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    update_look_at(); // Initially set camera
    update_lights();
    viewProjMatrix.setPerspective(50.0, canvas.width / canvas.height, 1.0, 700.0);
    viewProjMatrix.lookAt(camera_pos[0], camera_pos[1], [camera_pos[2]], camera_pos[0] + look_at[0], camera_pos[1] + look_at[1], camera_pos[2] + look_at[2], 0.0, 1.0, 0.0);
    draw(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw
    requestAnimationFrame(tick, canvas);
  };
  tick(); 
}

function update_look_at(){
  look_at = [Math.cos(theta)*Math.sin(phi), Math.cos(phi), Math.sin(theta)*Math.sin(phi)];
}

function keydown(ev, gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, canvas_width, canvas_height) {
  switch (ev.keyCode) {
    case 40: // Up arrow key -> the positive rotation of joint1 around the z-axis
      phi += 0.05 * speed;
      break;
    case 38: // Down arrow key -> the negative rotation of joint1 around the z-axis
      phi -= 0.05 * speed;
      break;
    case 39: // Right arrow key -> the positive rotation of arm1 around the y-axis
      theta += 0.05 * speed;
      break;
    case 37: // Left arrow key -> the negative rotation of arm1 around the y-axis
      theta -= 0.05 * speed;
      break;
    case 87: // 'w'key -> the positive rotation of joint2
      camera_pos[0] += look_at[0]*speed;
      camera_pos[1] += look_at[1]*speed;
      camera_pos[2] += look_at[2]*speed;
      break; 
    case 83: // 's'key -> the negative rotation of joint2
      camera_pos[0] -= look_at[0]*speed;
      camera_pos[1] -= look_at[1]*speed;
      camera_pos[2] -= look_at[2]*speed;
      break;
    case 68: // 'd'key -> the negative rotation of joint2
      camera_pos[0] -= look_at[2]*speed;
      camera_pos[2] += look_at[0]*speed;
      break;
    case 65: // 'a'key -> the negative rotation of joint2
      camera_pos[0] += look_at[2]*speed;
      camera_pos[2] -= look_at[0]*speed;
      break;
    case 81: // 'q'key -> Drop camera height
      camera_pos[1] -= speed; 
      break;
    case 69: // 'e'key -> Increase camera height
      camera_pos[1] += speed;
      break;
    case 90: // 'z'key -> Decrease camera sensitivity
      if(speed > 1){ speed -= 1; };
      break;
    case 88: // 'x'key -> Increase camera sensitivity
      break;
    case 79: // 'o'key -> Open door
      if(doorAngle < 3*Math.PI/4 - 0.1){ 
        doorAngle += 0.1; 
      }else{
        doorAngle = 3*Math.PI/4;
      };
      break;
    case 80: // 'p'key -> Close door
      if(doorAngle > 0.1){ 
        doorAngle -= 0.1; 
      }else{
        doorAngle = 0
      };
      break;
    case 49: // '1'key -> Toggle Light 1
      lightOn = !lightOn;
      break;
    case 50: // '2'key -> Toggle Light 2
      lightOn2 = !lightOn2;
      break;
    case 51: // '3'key -> Toggle Light 3
      lightOn3 = !lightOn3;
      break;
    case 52: // '4'key -> Toggle Light 4
      lightOn4 = !lightOn4;
      break;
    case 53: // '5'key -> Toggle Light 5
      lightOn5 = !lightOn5;
      break;
    case 54: // '6'key -> Toggle Light 6
      lightOn6 = !lightOn6;
      break;
    default: return; // Skip drawing at no effective action
  }
}

function initVertexBuffers(gl) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3

  // Coordinates（Cube which length of one side is 1 with the origin on the center of the bottom)
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

  // Write the vertex property to buffers (coordinates and normals)
  if (!initArrayBuffer(gl, 'a_Position', vertices, gl.FLOAT, 3)) return -1;
  if (!initArrayBuffer(gl, 'a_Normal', normals, gl.FLOAT, 3)) return -1;


  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Write the indices to the buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
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

function draw(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix) {
  pushMatrix(g_modelMatrix);
    drawFloor(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawWalls(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawStage(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawDoor(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, doorAngle);
    drawSliders(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawBoards(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    drawLights(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();
  
  // TABLES
  gl.vertexAttrib3f(a_Color, brown[0], brown[1], brown[2]);

  pushMatrix(g_modelMatrix);
    for (var k = 0; k < 6; k++) {
      drawTable(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, -14 + k*-15, 0, -37.5);
    };
  g_modelMatrix = popMatrix();

  pushMatrix(g_modelMatrix);
    for (var k = 0; k < 6; k++) {
      drawTable(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, -14 + k*-15, 0, -112.5);
    };
  g_modelMatrix = popMatrix();

   
  // CHAIRS
  gl.vertexAttrib3f(a_Color, babyBlue[0], babyBlue[1], babyBlue[2]);

  pushMatrix(g_modelMatrix);
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) 
      {
        drawChair(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, -10 + i*-15, 0, -12.5 + j*-10, n);
      };
    };
  g_modelMatrix = popMatrix();

  pushMatrix(g_modelMatrix);
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) 
      {
        drawChair(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, -10 + i*-15, 0, -87.5 + j*-10, n);
      };
    };
  g_modelMatrix = popMatrix();

  document.getElementById("speed").innerHTML = "Speed (Camera Sensitivity): " + speed;
  document.getElementById("camera_coords").innerHTML = "Camera Coordinates: " + camera_pos[0].toFixed(2) + ", " + camera_pos[1].toFixed(2) + ", " + camera_pos[2].toFixed(2);
}

function drawChair(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, x, y, z) {
  g_modelMatrix.setTranslate(x, y, z);

  // Draw Leg 1
  pushMatrix(g_modelMatrix);
    g_modelMatrix.translate(2.5, 0.0, 2.5);
    drawBox(gl, n, 1.0, 5.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();

  // Draw Leg 2
  pushMatrix(g_modelMatrix);
    g_modelMatrix.translate(-2.5, 0.0, 2.5);
    drawBox(gl, n, 1.0, 5.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();

  // Draw Leg 3
  pushMatrix(g_modelMatrix);
    g_modelMatrix.translate(-2.5, 0.0, -2.5);
    drawBox(gl, n, 1.0, 5.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();

  // Draw Leg 4
  pushMatrix(g_modelMatrix);
    g_modelMatrix.translate(2.5, 0.0, -2.5);
    drawBox(gl, n, 1.0, 5.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();

  // Move to the center of chair
  g_modelMatrix.translate(0.0, 5.0, 0.0);

  // Draw Seat
  pushMatrix(g_modelMatrix);
    drawBox(gl, n, 6.0, 1.0, 6.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix = popMatrix();

  // Move back of chair
  g_modelMatrix.translate(2.5, 1.0, 0.0);

  // Draw back of chair
  pushMatrix(g_modelMatrix);
    g_modelMatrix.rotate(90.0, 0.0, 1.0, 0.0);  // Rotate around the y-axis
    drawBox(gl, n, 6.0, 7.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();
}

function drawTable(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, x, y, z) {
  g_modelMatrix.setTranslate(x, y, z);

  // Draw Leg 1
  pushMatrix(g_modelMatrix);
    g_modelMatrix.translate(3.5, 0.0, 30.5);
    drawBox(gl, n, 1.0, 9.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();

  // Draw Leg 2
  pushMatrix(g_modelMatrix);
    g_modelMatrix.translate(-3.5, 0.0, 30.5);
    drawBox(gl, n, 1.0, 9.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();

  // Draw Leg 3
  pushMatrix(g_modelMatrix);
    g_modelMatrix.translate(-3.5, 0.0, -30.5);
    drawBox(gl, n, 1.0, 9.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();

  // Draw Leg 4
  pushMatrix(g_modelMatrix);
    g_modelMatrix.translate(3.5, 0.0, -30.5);
    drawBox(gl, n, 1.0, 9.0, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();

  // Move to the center of table
  g_modelMatrix.translate(0.0, 9.0, 0.0);

  // Draw top
  pushMatrix(g_modelMatrix);
    drawBox(gl, n, 8.0, 1.0, 62.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix = popMatrix();
}

function drawFloor(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  gl.vertexAttrib3f(a_Color, grey[0], grey[1], grey[2]);

  g_modelMatrix.setTranslate(-100, -1, -75);
  drawBox(gl, n, 200.0, 1.0, 150.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);

  gl.vertexAttrib3f(a_Color, green[0], green[1], green[2]);

  g_modelMatrix.setTranslate(-100, -2, -75);
  drawBox(gl, n, 500.0, 1.0, 500.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);

}

function drawWalls(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  gl.vertexAttrib3f(a_Color, cream[0], cream[1], cream[2]);

  g_modelMatrix.setTranslate(-55, 0, -0.5);
  drawBox(gl, n, 110.0, 30, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix.setTranslate(-100, 30, -0.5);
  drawBox(gl, n, 200.0, 20, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix.setTranslate(-165, 0, -0.5);
  drawBox(gl, n, 70.0, 30, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix.setTranslate(-100, 0, -149.5);
  drawBox(gl, n, 200.0, 50, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix.setTranslate(-199.5, 0, -75);
  g_modelMatrix.rotate(90.0, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  drawBox(gl, n, 148.0, 50, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix.setTranslate(-100, 50, -75);
  drawBox(gl, n, 200.0, 1, 150, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
}

function drawDoor(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix, doorAngle){
  gl.vertexAttrib3f(a_Color, grey[0], grey[1], grey[2]);

  g_modelMatrix.setTranslate(0, 0, 0);
  g_modelMatrix.translate(-110 -Math.cos(doorAngle)*10, 0, -0.5 -Math.sin(doorAngle)*10);
  g_modelMatrix.rotate(-doorAngle*360/(2*Math.PI), 0, 1, 0);
  drawBox(gl, n, 20.0, 30, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
}

function drawStage(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  gl.vertexAttrib3f(a_Color, 1, 1, 1);

  g_modelMatrix.setTranslate(-174.5, 0, -75);
  drawBox(gl, n, 49.0, 3, 148, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
}


function drawSliders(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  gl.vertexAttrib3f(a_Color, greyGreen[0], greyGreen[1], greyGreen[2]);

  g_modelMatrix.setTranslate(-198, 10, -75);
  drawBox(gl, n, 2, 38, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix.translate(0, 0, -69.5)
  drawBox(gl, n, 2, 38, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix.translate(0, 0, 139)
  drawBox(gl, n, 2, 38, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
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
    gl.vertexAttrib3f(a_Color, black[0], black[1], black[2]);
    drawBox(gl, n, 1, 15.5, 66.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  
    gl.vertexAttrib3f(a_Color, grey[0], grey[1], grey[2]);

    g_modelMatrix.translate(0, -1, 0);
    drawBox(gl, n, 1, 1, 68.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix.translate(0, 16.5, 0);
    drawBox(gl, n, 1, 1, 68.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix.translate(0, -15.5, 33.75);
    drawBox(gl, n, 1, 15.5, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix.translate(0, 0, -67.5);
    drawBox(gl, n, 1, 15.5, 1, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
  g_modelMatrix = popMatrix();
}

function drawLights(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix){
  pushMatrix(g_modelMatrix);
    gl.vertexAttrib3f(a_Color, 1, 1, 1);

    g_modelMatrix.setTranslate(-30, 49.5, -37.5);
    drawBox(gl, n, 10, 0.5, 10, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix.translate(-70, 0, 0);
    drawBox(gl, n, 10, 0.5, 10, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix.translate(-70, 0, 0);
    drawBox(gl, n, 10, 0.5, 10, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix.translate(0, 0, -75);
    drawBox(gl, n, 10, 0.5, 10, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix.translate(70, 0, 0);
    drawBox(gl, n, 10, 0.5, 10, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
    g_modelMatrix.translate(70, 0, 0);
    drawBox(gl, n, 10, 0.5, 10, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);   
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
    // Draw
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
  g_modelMatrix = popMatrix();   // Retrieve the model matrix
}