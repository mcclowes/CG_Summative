//Lecture theatre
//Vertex Shader
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
  'uniform mat4 u_NormalMatrix;\n' +   // Transformation matrix of the normal
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec2 v_TexCoord;\n'+
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
     // Calculate the vertex position in the world coordinate
  '  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
  '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';
  
  // Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform vec3 u_LightColor[16];\n' +     // Light color
  'uniform vec3 u_LightPosition[16];\n' +  // Position of the light source
  'uniform float u_LightStrength[16];\n' +
  'uniform float u_LightRange[16];\n' +
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
  'uniform sampler2D u_sampler;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
     // Normalize the normal because it is interpolated and not 1.0 in length any more
  '  vec3 normal = normalize(v_Normal);\n' +
	'vec3 diffuse;\n' +
	'for(int x = 0; x < 16; x++){\n'+
	// Calculate the light direction and make its length 1.
	' 	float distance = length(u_LightPosition[x] - v_Position);\n' + 
	'  	vec3 lightDirection = normalize(u_LightPosition[x] - v_Position);\n' +
	'	float attenuation = u_LightStrength[x]/(1.0 + ((1.0/u_LightRange[x]) * distance * distance));\n' +
     // The dot product of the light direction and the orientation of a surface (the normal)
	'  	float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
     // Calculate the final color from diffuse reflection and ambient reflection
	'  	diffuse = diffuse + (u_LightColor[x] * nDotL * attenuation);\n' +
  '}\n' +
  '	vec3 ambient = u_AmbientLight;\n' +
  '	gl_FragColor = vec4(diffuse + ambient, 1.0) * texture2D(u_sampler, v_TexCoord);\n ' +//* texture2D(u_Sampler, v_TexCoord);\n' +
  '}\n';
  
	var models = {};
	var attribute = {};
	var uniform = {};
	var light = {};
	var deskClutter = [[]];
	var cameraMatrix = new Matrix4();
	var deskNo = 10;
	var camera = {};
	var canvas = document.getElementById('webgl');
	
	delay = 1;
    
  function startProgram(meshes)
  {
	console.log('Models loaded, starting program');

	var gl = getWebGLContext(canvas);

	//Has Webgl started successfully
	if(!gl)
	{
		console.log('Failed to start WebGL context');
		return;
	}
	
	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log('Failed to intialize shaders.');
		return;
	}
  	
	//Set clear colour and enable depth test
	gl.clearColor(0.0, 1.0, 1.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	
	// Get the storage locations of uniform variables
	uniform.LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
	uniform.LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
	uniform.LightStrength = gl.getUniformLocation(gl.program, 'u_LightStrength');
	uniform.LightRange = gl.getUniformLocation(gl.program, 'u_LightRange');
	
	uniform.AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');
	
	uniform.ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	uniform.MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
	uniform.NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
	uniform.sampler = gl.getUniformLocation(gl.program, 'u_sampler');
	
	// Get the storage locations of attribute variables
	attribute.Position  = gl.getAttribLocation(gl.program, 'a_Position');
	attribute.Normal = gl.getAttribLocation(gl.program, 'a_Normal');
	attribute.TexCoord  = gl.getAttribLocation(gl.program, 'a_TexCoord');

	if (!uniform.LightColor || !uniform.LightPosition || !uniform.AmbientLight) { 
		console.log('Failed to get the storage location');
		return;
	}
	light.position = [];
	light.color = [];
	light.strength = [];
	light.range = [];
	
	//Initialise lighting positions
	light.position[0] = [25.0, 9.0, 20.0];
	light.position[1] = [10.0, 30.0, 20.0];
	light.position[2] = [-20.0, 30.0,20.0];
	light.position[3] = [-40.0, 30.0, 20.0];
	light.position[4] = [10.0, 30.0, -20.0];
	light.position[5] = [-20.0, 30.0,-20.0];
	light.position[6] = [-40.0, 30.0, -20.0];
	light.color[0] = [0.2, 0.2, 1.0];
	light.color[1] = [1.0, 1.0, 0.9];
	light.color[2] = [1.0, 1.0, 0.9];
	light.color[3] = [1.0, 1.0, 0.9];
	light.color[4] = [1.0, 1.0, 0.9];
	light.color[5] = [1.0, 1.0, 0.9];
	light.color[6] = [1.0, 1.0, 0.9];
	light.strength[0] = 1.0;
	light.strength[1] = 10.0;
	light.strength[2] = 10.0;
	light.strength[3] = 10.0;
	light.strength[4] = 10.0;
	light.strength[5] = 10.0;
	light.strength[6] = 10.0;
	light.range[0] = 6.0;
	light.range[1] = 25.0;
	light.range[2] = 25.0;
	light.range[3] = 25.0;
	light.range[4] = 25.0;
	light.range[5] = 25.0;
	light.range[6] = 25.0;

	light.ambient = [0.1, 0.1, 0.1];
	
	reloadLights(gl);
	
	//Initialise camera location
	camera.location = [30.0, 13.0, 0.0];
	camera.lookat = [0.0, 13.0, 0.0];
	camera.up = [0.0, 0.0, 0.0]
	camera.LRangle = 0;
	camera.UDangle = 0;
	
	setCamera();
		
	//Initialise model buffers
	models.apple = {};
	createModel(gl, meshes.apple, models.apple, 'appletexture.png');
	models.book = {};
	createModel(gl, meshes.book, models.book, 'booktexture.png');
	models.chairs = {};
	createModel(gl, meshes.chairs, models.chairs, 'chairstexture.png');
	models.desk = {};
	createModel(gl, meshes.desk, models.desk, 'desktexture.png');
	models.fan = {};
	createModel(gl, meshes.fan, models.fan, 'fantexture.png');
	models.laptop = {};
	createModel(gl, meshes.laptop, models.laptop, 'laptoptexture.png');
	models.stand = {};
	createModel(gl, meshes.stand, models.stand, 'standtexture.png');
	models.whiteboard = {};
	createModel(gl, meshes.whiteboard, models.whiteboard, 'whiteboardtexture.png');
	
	generateDeskClutter(1);
		
	document.onkeydown = function(ev){ keydown(ev, gl); };
	var delay = 1;
	/*
	while(true)
	{
		var start = new Date().getMilliseconds();
		
		var time = new Date().getMilliseconds();
		delay = time - start;
	}	
	*/
	drawScene(gl, delay);
  }
  
function main()
  {
  //Download the models off the server
	OBJ.downloadMeshes(
	{
	'apple':'/m.p.szuplewski/Webgl/lecture/Meshes/apple.obj',
	'book':'/m.p.szuplewski/Webgl/lecture/Meshes/book.obj',
	'chairs':'/m.p.szuplewski/Webgl/lecture/Meshes/chairs.obj',
	'desk':'/m.p.szuplewski/Webgl/lecture/Meshes/Desk.obj',
	'fan':'/m.p.szuplewski/Webgl/lecture/Meshes/fan.obj',
	'laptop':'/m.p.szuplewski/Webgl/lecture/Meshes/Laptop.obj',
	'stand':'/m.p.szuplewski/Webgl/lecture/Meshes/stand.obj',
	'whiteboard':'/m.p.szuplewski/Webgl/lecture/Meshes/whiteboard.obj'
	},startProgram);
  }
  
  function loadTexture(gl, texture, image)
  {
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);
  }
  
  function reloadLights(gl)
  {
	light.positionArray = [];
	light.colorArray = [];
	for(x = 0; x < light.position.length; x++)
	{
		light.positionArray = light.positionArray.concat(light.position[x]);
		light.colorArray = light.colorArray.concat(light.color[x]);
	}
	gl.uniform3fv(uniform.LightPosition, light.positionArray);
	gl.uniform3fv(uniform.LightColor, light.colorArray);
	gl.uniform1fv(uniform.LightStrength, light.strength);
	gl.uniform1fv(uniform.LightRange, light.range);
	gl.uniform3fv(uniform.AmbientLight, light.ambient);
  }
  
  function setCamera()
  {
	cameraMatrix.setPerspective(50.0, canvas.width / canvas.height, 1.0, 300.0);
	cameraMatrix.lookAt(camera.location[0], camera.location[1], camera.location[2],
						camera.lookat[0], camera.lookat[1], camera.lookat[2], 
						0.0, 1.0, 0.0);
  }
  
  function move(forward, side)
  {
	var tempAngle = camera.LRangle * (Math.PI / 180);
	if(forward == side){
		x = Math.cos(tempAngle) * forward;
		y = Math.sin(tempAngle) * side;
	} else {
		x = Math.sin(tempAngle) * forward;
		y = Math.cos(tempAngle) * side;
	}
	camera.location[0] += x;
	camera.lookat[0] += x;
	camera.location[2] += y;
	camera.lookat[2] += y;
  }
  
  function turnLR(change)
  {
	camera.LRangle = (camera.LRangle + change)%360;
	var tempAngle = camera.LRangle * (Math.PI / 180);
	x = Math.cos(tempAngle) * 30;
	y = Math.sin(tempAngle) * 30;
	camera.lookat[0] = camera.location[0] - x;
	camera.lookat[2] = camera.location[2] - y;
  }
  
  function turnUD(change)
  {
	console.log(camera.UDangle, change);
	if((camera.UDangle == 40) && (change > 0)) return;
	if((camera.UDangle == -40) && (change < 0)) return;
	camera.UDangle = (camera.UDangle + change);
	var tempAngle = camera.UDangle * (Math.PI / 180);
	z = Math.tan(tempAngle) * 30;
	camera.lookat[1] = camera.location[1] - z;
  }
  
  function createModel(gl, mesh, location, textureSrc)
  {
	location.buffers = {};
	location.buffers.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, location.buffers.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices), gl.STATIC_DRAW);
	
	location.buffers.vertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, location.buffers.vertexNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertexNormals), gl.STATIC_DRAW);
	
	location.buffers.vertexTexCoordsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, location.buffers.vertexTexCoordsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.textures), gl.STATIC_DRAW);
	
	location.buffers.indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, location.buffers.indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), gl.STATIC_DRAW);
	location.indexNum = mesh.indices.length;
	
	location.texture = gl.createTexture();
	location.image = new Image();
	location.image.onload = function(){loadTexture(gl, location.texture, location.image); };
	location.image.src = ('/m.p.szuplewski/Webgl/lecture/Textures/' +textureSrc);
  }
  
  function generateDeskClutter()
  {
	deskClutter = [];
	var temp = [];
	for(var x = 0; x < deskNo; x++)
	{
		for(var y = 0; y < 4; y++)
		{
			var rand = Math.floor(Math.random()*4 + 1);
			temp[y] = rand;
		}
		deskClutter[x] = temp;
		temp = [];
	}
  }
  
  function keydown(ev, gl)
  {
	switch(ev.keyCode) {
		case 65:
			move(-1, 1);
			setCamera();
			break;
			
		case 68:
			move(1, -1);
			setCamera();
			break;
		
		case 87:
			
			move(-1, -1);
			setCamera();
			break;
			
		case 83:
			move(1, 1);
			setCamera();
			break;
		
		case 39:
			turnLR(5);
			setCamera();
			break;
			
		case 37:
			turnLR(-5);
			setCamera();
			break;
			
		case 38:
			turnUD(-5);
			setCamera();
			break;
			
		case 40:
			turnUD(5);
			setCamera();
			break;
			
		default:
			break;
	}
		drawScene(gl, 1);
  }
  
	
	g_mvpMatrix = new Matrix4();
	g_normalMatrix = new Matrix4();
  
	var g_matrixStack = []; // Array for storing a matrix
	function pushMatrix(m) { // Store the specified matrix to the array
	var m2 = new Matrix4(m);
	g_matrixStack.push(m2);
}

	function popMatrix() { // Retrieve the matrix from the array
		return g_matrixStack.pop();
	}
  
  function drawScene(gl, delay)
  {
	console.log("Drawing scene");
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	g_modelMatrix = new Matrix4();
	g_modelMatrix.setTranslate(0.0, 0.0, 20.0);
	for(var x = 0; x < deskNo/2; x++)
	{
		pushMatrix(g_modelMatrix);
		drawDesk(gl, x, g_modelMatrix);
		g_modelMatrix = popMatrix();
		g_modelMatrix.translate(-15.0, 0.0, 0.0);
	}
	g_modelMatrix.setTranslate(0.0, 0.0, -20.0);
	for(var x = deskNo/2; x < deskNo; x++)
	{
		pushMatrix(g_modelMatrix);
		drawDesk(gl, x, g_modelMatrix);
		g_modelMatrix = popMatrix();
		g_modelMatrix.translate(-15.0, 0.0, 0.0);
	}
	g_modelMatrix.setTranslate(20.0, 0.0, 20.0);
	g_modelMatrix.rotate(160, 0.0, 1.0, 0.0);
	drawObject(gl, models.stand, g_modelMatrix);
	g_modelMatrix.translate(-3.5, 7.0, 0.0);
	drawObject(gl, models.laptop, g_modelMatrix);
	
	//requestAnimationFrame(drawScene(gl, 1));
  }
  
  function drawDesk(gl, deskID, g_modelMatrix)
  {
	drawObject(gl, models.desk, g_modelMatrix);
	drawObject(gl, models.chairs, g_modelMatrix);
	g_modelMatrix.translate(0.0, 7.4, 9.0);
	for(x = 0; x < 4; x++)
	{
		switch(deskClutter[deskID][x]){
			case 1:
				drawObject(gl, models.apple, g_modelMatrix);
				break;
			case 2:
				drawObject(gl, models.laptop, g_modelMatrix);
				break;
			case 3:
				drawObject(gl, models.book, g_modelMatrix);	
				break;
			case 4:
				break;
			default:
				break;
		}
		g_modelMatrix.translate(0.0, 0.0, -6.0);
	}
  }
  
  function drawObject(gl, object, g_modelMatrix)
  {
	gl.bindBuffer(gl.ARRAY_BUFFER, object.buffers.vertexBuffer);
	gl.vertexAttribPointer(attribute.Position, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(attribute.Position);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, object.buffers.vertexNormalBuffer);
	gl.vertexAttribPointer(attribute.Normal, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(attribute.Normal);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, object.buffers.vertexTexCoordsBuffer);
	gl.vertexAttribPointer(attribute.TexCoord, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(attribute.TexCoord);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.buffers.indexBuffer);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, object.texture);
	gl.uniform1i(uniform.u_sampler, 0);

	gl.uniformMatrix4fv(uniform.ModelMatrix, false, g_modelMatrix.elements);
	
	g_mvpMatrix.set(cameraMatrix);
	g_mvpMatrix.multiply(g_modelMatrix);
	gl.uniformMatrix4fv(uniform.MvpMatrix, false, g_mvpMatrix.elements);
	
	g_normalMatrix.setInverseOf(g_modelMatrix);
	g_normalMatrix.transpose();
	gl.uniformMatrix4fv(uniform.NormalMatrix, false, g_normalMatrix.elements);
	
	gl.drawElements(gl.TRIANGLES, object.indexNum, gl.UNSIGNED_SHORT, 0);
  }