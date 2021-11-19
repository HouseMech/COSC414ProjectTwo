class Sphere {
  constructor(sphere_divisions, radius, rgb) {
    this.divisions = sphere_divisions;
    this.radius = radius;
    this.rgb = rgb;
    this.vertices = [];
    this.indices = [];
    this.colors = [];

  }

  get SphereCalculation() {
    return this.calculateSphere();
  }

  calculateSphere() {
    var divisions = this.divisions;
    var radius = this.radius;
    for (var latNumber = 0; latNumber <= divisions; latNumber++) {
      var theta = latNumber * Math.PI / divisions;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);


      for (var longNumber = 0; longNumber <= divisions; longNumber++) {
        var phi = longNumber * 2 * Math.PI / divisions;
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);

        var x = cosPhi * sinTheta;
        var y = cosTheta;
        var z = sinPhi * sinTheta;

        this.vertices.push(radius*x, radius*y, radius*z);
        this.colors.push(this.rgb[0],this.rgb[1],this.rgb[2]);
      }
    }

    for(let i = 0; i<divisions; ++i) {
      for(let j = 0; j<divisions; ++j) {
          let first = (i * (divisions + 1)) + j;
          let second = first + divisions + 1;

          this.indices.push(first, second, first+1);
          this.indices.push(second, second+1, first+1);
      }
    }
  }
}
