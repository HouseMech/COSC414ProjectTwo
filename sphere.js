createSphere = function(){
    var vertices = [], indices = [], colours = [];
    var radius = 0.5;
    var SPHERE_DIVISIONS = 12;
    var latitudeBands = SPHERE_DIVISIONS;
    var longitudeBands = SPHERE_DIVISIONS;

    for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
      var theta = latnumber * Math.PI / latitudeBands;
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

        colours.push((x+1)/2*255);
        colours.push((y+1)/2*255);
        colours.push((z+1)/2*255);
        colours.push(255);


      }
    }
    return vertices;
}
