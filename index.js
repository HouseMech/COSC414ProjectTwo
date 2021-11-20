const { vec2, vec3, mat3, mat4 } = glMatrix;
const numOfBacteria =5;
var vertexShaderText = [
'precision mediump float;',

'attribute vec3 position;',
'attribute vec3 color;',
'uniform mat4 world;',
'uniform mat4 view;',
'uniform mat4 proj;',
'varying vec3 fragColor;',

'void main()',
'{',
'   mat4 mvp = proj*view*world;',
'	fragColor = color;',
'	gl_Position = mvp*vec4(position,1.0);',
'	gl_PointSize = 10.0;',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',

'varying vec3 fragColor;',

'void main()',
'{',

'	gl_FragColor = vec4(fragColor,1.0);',
'}',
].join('\n')


var InitDemo = function() {


	//////////////////////////////////
	//       initialize WebGL       //
	//////////////////////////////////
	console.log('this is working');

	var canvas = document.getElementById('glcanvas');
	var gl = canvas.getContext('webgl');

	if (!gl){
		console.log('webgl not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}
	if (!gl){
		alert('your browser does not support webgl');
	}

	canvas.width = 800; //window.innerWidth;
	canvas.height = 800; //window.innerHeight;
	gl.viewport(0,0,canvas.width,canvas.height);

	gl.clearColor(0.5,0.8,0.8,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

	//////////////////////////////////
	// create/compile/link shaders  //
	//////////////////////////////////
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader,vertexShaderText);
	gl.shaderSource(fragmentShader,fragmentShaderText);

	gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS)){
		console.error('Error compiling vertex shader!', gl.getShaderInfoLog(vertexShader))
		return;
	}
	gl.compileShader(fragmentShader);
		if(!gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS)){
		console.error('Error compiling vertex shader!', gl.getShaderInfoLog(fragmentShader))
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program,vertexShader);
	gl.attachShader(program,fragmentShader);

	gl.linkProgram(program);
	if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
		console.error('Error linking program!', gl.getProgramInfo(program));
		return;
	}
  const testsphere = new Sphere(50,1,[1,1,1]);
	testsphere.SphereCalculation;
  var vertices = [], indices = [], colours = [];
	vertices = testsphere.vertices;
	indices = testsphere.indices;
	colours = testsphere.colors;


	var buffers = renderVertices(program, gl, vertices, colours, indices);
	var index_buffer = buffers[2]
	//////////////////////////////////
	//            matrics           //
	//////////////////////////////////

	var world = new Float32Array(16);
	mat4.identity(world);
	//var rot = new Float32Array(16);
	//var trans = new Float32Array(16);
	//mat4.identity(rot);
	//mat4.identity(trans);
	//var x = -2;
	//var angle = glMatrix.glMatrix.toRadian(45);
	//mat4.fromRotation(rot,angle,[0,0,1]);
	//mat4.fromTranslation(trans,[x,0,0]);
	//mat4.multiply(world,trans,rot);

	var view = new Float32Array(16);
	mat4.lookAt(view, [0,0,5], [0,0,0],[0,1,0])

	var proj = new Float32Array(16);
	mat4.perspective(proj,glMatrix.glMatrix.toRadian(45),canvas.width/canvas.height,0.1,100);

	//////////////////////////////////
	//    send to vertex shader     //
	//////////////////////////////////

	//get the address of each matrix in the vertex shader
	var matWorldUniformLocation = gl.getUniformLocation(program, 'world');
	var matViewUniformLocation = gl.getUniformLocation(program, 'view');
	var matProjUniformLocation = gl.getUniformLocation(program, 'proj');

	//send each matrix to the correct location in vertex shader
	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, world);
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, view);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, proj);

	var angle = 0;
	var rotz = new Float32Array(16);
	var rotx = new Float32Array(16);

	mat4.identity(rotx);
	mat4.identity(rotx);
	//////////////////////////////////
	//            Draw              //
	//////////////////////////////////
	var allBact = [];
	var allParticles=[];

	for (let i = 0; i < numOfBacteria; i++) {
		var xRot = Math.random()*360;
		var yRot = Math.random()*360;
		var zRot = Math.random()*360;
		var testBact = new Bacteria(50,1,[Math.random(),Math.random(),Math.random()],[xRot, yRot, zRot],false);
		testBact.calculateBacteria(49);
		allBact.push(testBact);
	}
	console.log(allBact)
	var buffersBact = []
	var index_bufferBact = []
	var bactSize = 49;
	var loop = function(time = 0){
		score(allBact,numOfBacteria);
		angle = performance.now() / 1000;
		mat4.fromRotation(rotx,angle,[1,0,0]);
		mat4.fromRotation(rotz,angle,[0,0,1]);
		mat4.multiply(world,rotz,rotx);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, world);
		gl.clearColor(0.5,0.8,0.8,1.0);
		gl.clear(gl.COLOR_BUFFER_BIT| gl.DEPTH_BUFFER_BIT);
		bactSize -= 0.01;
		for (let i = 0; i < allBact.length; i++) {
			buffersBact = renderVertices(program, gl, allBact[i].vertices, allBact[i].colors, allBact[i].indices);
			index_bufferBact = buffersBact[2];
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_bufferBact);
			gl.drawArrays(gl.POINTS, 0, allBact[i].vertices.length/3);
			//console.log(bactSize);
			if(bactSize > 42){
				allBact[i].growBacteria(bactSize);
				updateBacteriaScore(0.005);
			}else{
				allBact[i].grown(true);
				//bacteriaFullyGrown(allBact[i]);
				//console.log(allBact[i].fullyGrown);
			} 
			
		}

		for (var i = 0; i < allParticles.length; i++) {
			particle_buffer = renderVertices(program, gl, allParticles[i].vertices, allParticles[i].colors, allParticles[i].indices);
			particle_index_buffer = particle_buffer[2];
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, particle_index_buffer);
			gl.drawArrays(gl.LINES, 0, allParticles[i].vertices.length/3);
			if (allParticles[i].life_time > 0) {
				allParticles[i].moveParticle();
				allParticles[i].subtract_life_counter();
			}
			else {
				allParticles.splice(i,1);
				break;
			}
		}


		renderVertices(program, gl, vertices, colours, indices);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

	    requestAnimationFrame(loop);
	}
	requestAnimationFrame(loop);
	//file:///D:/courses/COSC414%20(Graphics)/Lab/index.html

	canvas.onmousedown = function(ev) {
		angle = performance.now() / 1000;
		mat4.fromRotation(rotx,angle,[1,0,0]);
		mat4.fromRotation(rotz,angle,[0,0,1]);
		mat4.multiply(world,rotz,rotx);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, world);
		gl.clearColor(0.5,0.8,0.8,1.0);
		gl.clear(gl.COLOR_BUFFER_BIT| gl.DEPTH_BUFFER_BIT);

		for (let i = 0; i < allBact.length; i++) {
			buffersBact = renderVertices(program, gl, allBact[i].vertices, allBact[i].colors, allBact[i].indices);
			index_bufferBact = buffersBact[2];
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_bufferBact);
			gl.drawArrays(gl.POINTS, 0, allBact[i].vertices.length/3);
		}

		renderVertices(program, gl, vertices, colours, indices);
	 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
		 gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

		var pixelValues = new Uint8Array(4);
		gl.readPixels(ev.clientX, canvas.clientHeight - ev.clientY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixelValues);
		console.log(pixelValues);
		console.log(ev.clientX);
		console.log(ev.clientY)
		var particleCount = Math.floor(Math.random() * (5 - 2) + 2);
		for (var i = 0; i < allBact.length; i++) {
			console.log("Bacteria " + i + " has: " + Math.round(allBact[i].rgb[0] * 255) + "," + Math.round(allBact[i].rgb[1] *255) + "," + Math.round(allBact[i].rgb[2] *255));
			if (pixelValues[0] == Math.round(allBact[i].rgb[0] * 255) && pixelValues[1] == Math.round(allBact[i].rgb[1] * 255) && pixelValues[2] == Math.round(allBact[i].rgb[2] * 255)) {
				for (var f = 0; f < particleCount; f++) {
					var testParticle = new Particle(50,0.10,100,[Math.random(),Math.random(),Math.random()], [Math.random(),Math.random(),Math.random()]);
					testParticle.calculateParticle(allBact[i].vertices[0],allBact[i].vertices[1],allBact[i].vertices[2]);
					allParticles.push(testParticle);
				}
				allBact.splice(i, 1);
				bacteriaPopped();
				break;
			}
		}
	}
};
