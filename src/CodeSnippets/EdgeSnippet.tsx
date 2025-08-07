export const EdgeCode = [
`
applyBoundaryForces(): void {
    // Use pooled vector instead of creating new one
    this.tempVector1.set(0, 0, 0);
    // Quick boundary check optimization - only calculate if near boundaries
    const margin = this.visualRange.x;
    const pos = this.position;
    if (pos.x > -this.p5.width + margin || pos.x < this.p5.width - margin ||
        pos.y > -this.p5.height + margin || pos.y < this.p5.height - margin ||
        pos.z > -this.p5.width + margin || pos.z < this.p5.width - margin) {
        // X boundaries with soft force scaling
        const leftBoundary = -this.p5.width + this.visualRange.x;
        const rightBoundary = this.p5.width - this.visualRange.x;
        if (this.position.x < leftBoundary) {
            const distance = leftBoundary - this.position.x;
            const forceStrength = Math.min(1, distance / CONFIG.BOID.BOUNDARY_SOFTNESS);
            this.tempVector1.x = CONFIG.BOID.TURNING_FORCE * forceStrength;
        } else if (this.position.x > rightBoundary) {
            const distance = this.position.x - rightBoundary;
            const forceStrength = Math.min(1, distance / CONFIG.BOID.BOUNDARY_SOFTNESS);
            this.tempVector1.x = -CONFIG.BOID.TURNING_FORCE * forceStrength;
        }
        // Y boundaries with soft force scaling
        const topBoundary = -this.p5.height + this.visualRange.y;
        const bottomBoundary = this.p5.height - this.visualRange.y;
        if (this.position.y < topBoundary) {
            const distance = topBoundary - this.position.y;
            const forceStrength = Math.min(1, distance / CONFIG.BOID.BOUNDARY_SOFTNESS);
            this.tempVector1.y = CONFIG.BOID.TURNING_FORCE * forceStrength;
        } else if (this.position.y > bottomBoundary) {
            const distance = this.position.y - bottomBoundary;
            const forceStrength = Math.min(1, distance / CONFIG.BOID.BOUNDARY_SOFTNESS);
            this.tempVector1.y = -CONFIG.BOID.TURNING_FORCE * forceStrength;
        }
        // Z boundaries with soft force scaling
        const frontBoundary = -this.p5.width + this.visualRange.z;
        const backBoundary = this.p5.width - this.visualRange.z;
        if (this.position.z < frontBoundary) {
            const distance = frontBoundary - this.position.z;
            const forceStrength = Math.min(1, distance / CONFIG.BOID.BOUNDARY_SOFTNESS);
            this.tempVector1.z = CONFIG.BOID.TURNING_FORCE * forceStrength;
        } else if (this.position.z > backBoundary) {
            const distance = this.position.z - backBoundary;
            const forceStrength = Math.min(1, distance / CONFIG.BOID.BOUNDARY_SOFTNESS);
            this.tempVector1.z = -CONFIG.BOID.TURNING_FORCE * forceStrength;
        }
        this.velocity.add(this.tempVector1);
    }
    VectorUtils.clampToSphere(this.velocity, CONFIG.BOID.MAX_SPEED);
}
`,
`
edge(){
  let TurningForce = .2
  let SteeringVector = p5.createVector()
  let boundarySmoothing = 30

  // Soft X boundaries
  if (this.position.x < this.VisualRange.x) {
      let distance = this.VisualRange.x - this.position.x
      let forceStrength = Math.min(1, distance / boundarySmoothing)
      SteeringVector.x += TurningForce * forceStrength
  } else if (this.position.x > p5.width - this.VisualRange.x) {
      let distance = this.position.x - (p5.width - this.VisualRange.x)
      let forceStrength = Math.min(1, distance / boundarySmoothing)
      SteeringVector.x -= TurningForce * forceStrength
  }

  // Soft Y boundaries
  if (this.position.y < this.VisualRange.y) {
      let distance = this.VisualRange.y - this.position.y
      let forceStrength = Math.min(1, distance / boundarySmoothing)
      SteeringVector.y += TurningForce * forceStrength
  } else if (this.position.y > p5.height - this.VisualRange.y) {
      let distance = this.position.y - (p5.height - this.VisualRange.y)
      let forceStrength = Math.min(1, distance / boundarySmoothing)
      SteeringVector.y -= TurningForce * forceStrength
  }

  this.velocity.add(SteeringVector)
  this.velocity.mult(0.98)
  if (this.velocity.mag() > this.maxSpeed) {
          this.velocity.normalize()
          this.velocity.mult(this.maxSpeed)
  }
}
`



]