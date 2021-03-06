class Particle {
    constructor(sphere_divisions, radius, life_time, rgb, angles) {
      this.divisions = sphere_divisions;
      this.radius = radius;
      this.rgb = rgb;
      this.vertices = [];
      this.indices = [];
      this.colors = [];
      this.life_time = life_time;
      this.angles = angles
      this.speed = Math.random() * (3 - 0.5) + 0.5;
    }

    subtract_life_counter() {
      this.life_time = this.life_time - 1;
    }

    calculateParticle(originX, originY, originZ) {
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

          this.vertices.push(originX + radius*x, originY + radius*y, originZ + radius*z);
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

    moveParticle() {
    //Liam's note:
    //So translation matrices were out of the question since I'm like half certain that the game world itself is
    //rotating which screws with the vertex values. In the end, a simple modification to Joel's code is what we needed.

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
      this.vertices[i] =   newverts[0] + 0.025 * this.speed;
      this.vertices[i+1] = newverts[1] + 0.025 * this.speed;
      this.vertices[i+2] = newverts[2] + 0.025 * this.speed;;
  }

  }

}
