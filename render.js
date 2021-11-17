function renderVertices(program, gl, vertices, colours, indices){
  // Create and store data into vertex buffer
  var vertex_buffer = gl.createBuffer ();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Create and store data into color buffer
  var color_buffer = gl.createBuffer ();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colours), gl.STATIC_DRAW);

  // Create and store data into index buffer
  var index_buffer = gl.createBuffer ();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  //////////////////////////////////
  //    create triangle buffer    //
  //////////////////////////////////

  //all arrays in JS is Float64 by default


  var positionAttribLocation = gl.getAttribLocation(program,'position');
  var colorAttribLocation = gl.getAttribLocation(program,'color');
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.vertexAttribPointer(
  positionAttribLocation, //attribute location
  3, //number of elements per attribute
  gl.FLOAT,
  gl.FALSE,
  0,
  0
  );
  gl.enableVertexAttribArray(positionAttribLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  gl.vertexAttribPointer(
  colorAttribLocation, //attribute location
  3, //number of elements per attribute
  gl.FLOAT,
  gl.FALSE,
  0,
  0
  );
  gl.enableVertexAttribArray(colorAttribLocation);

  gl.useProgram(program);

  gl.enable(gl.DEPTH_TEST);
  return [vertex_buffer, color_buffer, index_buffer];
}
