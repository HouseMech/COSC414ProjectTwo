class Bacteria {
    constructor(sphere_divisions, radius, rgb, angles, fullyGrown) {
      this.divisions = sphere_divisions;
      this.radius = radius;
      this.rgb = rgb;
      this.vertices = [];
      this.indices = [];
      this.colors = [];
      this.angles = angles;
      this.fullyGrown = fullyGrown;
      this.size = 49;
      this.collisionSize = 99999;
    }

    grown(grown) {
      this.fullyGrown = grown;
    }

    checkDistances(bactList){
      var distances = [];
      for (let i = 0; i < bactList.length; i++) {
        if(bactList[i] == this){
          distances[i] = 0;
        }else{
          var a = [this.vertices[0], this.vertices[1], this.vertices[2]];
          var b = [bactList[i].vertices[0], bactList[i].vertices[1], bactList[i].vertices[2]];
          var r = this.radius;
          var adotb = vec3.dot(a,b);
          var distance = r*Math.acos(adotb/(r^2))
          distances[i] = distance;
        }
      }

      return distances;
    }

    calculateBacteria() {
      var divisions = this.divisions;
      var radius = this.radius;
      for (var latNumber = this.size; latNumber <= divisions; latNumber++) {
        var theta = latNumber * Math.PI / divisions;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);


        for (var longNumber = 0; longNumber <= divisions; longNumber++) {
          var phi = longNumber * 2 * Math.PI / divisions;
          var sinPhi = Math.sin(phi);
          var cosPhi = Math.cos(phi);

          var x = cosPhi * sinTheta;
          var y = 1.005*cosTheta;
          var z = sinPhi * sinTheta;

          this.vertices.push(radius*x, radius*y, radius*z);
          this.colors.push(this.rgb[0],this.rgb[1],this.rgb[2]);
        }
      }

      var newverts = new Float32Array(3);
      var rotMat = new Float32Array(9);
      var rotThetaX = this.angles[0] * Math.PI/180;
      const rotMatX = [1,0,0,
                        0, Math.cos(rotThetaX), -Math.sin(rotThetaX),
                        0, Math.sin(rotThetaX), Math.cos(rotThetaX)]
      var rotThetaY = this.angles[1] * Math.PI/180;
      const rotMatY = [Math.cos(rotThetaY),0,Math.sin(rotThetaY),
                        0, 1, 0,
                        -Math.sin(rotThetaY), 0, Math.cos(rotThetaY)]
      var rotThetaZ = this.angles[2] * Math.PI/180;
      const rotMatZ = [Math.cos(rotThetaZ),-Math.sin(rotThetaZ),0,
                        Math.sin(rotThetaZ), Math.cos(rotThetaZ), 0,
                        0, 0, 1]
      mat3.multiply(rotMat, rotMatX, rotMatZ);
      mat3.multiply(rotMat, rotMat, rotMatY);

      for (let i = 0; i < this.vertices.length; i+=3) {
        mat3.multiply(newverts, rotMat, [this.vertices[i], this.vertices[i+1], this.vertices[i+2]])
        this.vertices[i] = newverts[0];
        this.vertices[i+1] = newverts[1];
        this.vertices[i+2] = newverts[2];
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

  growBacteria() {
    //Grow bacteria by increasing the number of vertices that are drawn.
    //clear vertices and colours
    this.vertices = [];
    this.colors = [];

    var divisions = this.divisions;
    var radius = this.radius;
    for (var latNumber = this.size; latNumber <= divisions; latNumber++) {
      var theta = latNumber * Math.PI / divisions;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);


        for (var longNumber = 0; longNumber <= divisions; longNumber++) {
          var phi = longNumber * 2 * Math.PI / divisions;
          var sinPhi = Math.sin(phi);
          var cosPhi = Math.cos(phi);

          var x = cosPhi * sinTheta;
          var y = 1.005*cosTheta;
          var z = sinPhi * sinTheta;

          this.vertices.push(radius*x, radius*y, radius*z);
          this.colors.push(this.rgb[0],this.rgb[1],this.rgb[2]);
        }
      }


      var newverts = new Float32Array(3);
      var rotMat = new Float32Array(9);
      var rotThetaX = this.angles[0] * Math.PI/180;
      const rotMatX = [1,0,0,
                        0, Math.cos(rotThetaX), -Math.sin(rotThetaX),
                        0, Math.sin(rotThetaX), Math.cos(rotThetaX)]
      var rotThetaY = this.angles[1] * Math.PI/180;
      const rotMatY = [Math.cos(rotThetaY),0,Math.sin(rotThetaY),
                        0, 1, 0,
                        -Math.sin(rotThetaY), 0, Math.cos(rotThetaY)]
      var rotThetaZ = this.angles[2] * Math.PI/180;
      const rotMatZ = [Math.cos(rotThetaZ),-Math.sin(rotThetaZ),0,
                        Math.sin(rotThetaZ), Math.cos(rotThetaZ), 0,
                        0, 0, 1]
      mat3.multiply(rotMat, rotMatX, rotMatZ);
      mat3.multiply(rotMat, rotMat, rotMatY);

      for (let i = 0; i < this.vertices.length; i+=3) {
        mat3.multiply(newverts, rotMat, [this.vertices[i], this.vertices[i+1], this.vertices[i+2]])
        this.vertices[i] = newverts[0];
        this.vertices[i+1] = newverts[1];
        this.vertices[i+2] = newverts[2];
    }
  }
  
}
