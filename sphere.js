var vertices = [], indices = [], colors = [];
var radius = 0.5;
var SPHERE_DIVISIONS = 12;
var latitudeBands = SPHERE_DIVISIONS;
var longitudeBands = SPHERE_DIVISIONS;

createSphere = function(){
    for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
      var theta = latNumber * Math.PI / latitudeBands;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);


      for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
        var phi = longNumber * 2 * Math.PI / longitudeBands;
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);

        var x = cosPhi * sinTheta;
        var y = cosTheta;
        var z = sinPhi * sinTheta;

        vertices.push(radius*x);
        vertices.push(radius*y);
        vertices.push(radius*z);

        colors.push(1,0,0);
      }
    }

    for(let i = 0; i<latitudeBands; ++i) {
      for(let j = 0; j<longitudeBands; ++j) {
          let first = (i * (longitudeBands + 1)) + j;
          let second = first + longitudeBands + 1;

          indices.push(first);
          indices.push(second);
          indices.push(first+1);

          indices.push(second);
          indices.push(second+1);
          indices.push(first+1);
      }
  }
    var infoArray = [];
    infoArray.push(vertices, indices, colors);
    return infoArray;
}
