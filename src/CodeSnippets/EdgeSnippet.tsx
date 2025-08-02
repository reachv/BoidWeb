export const EdgeCode = 
`edge(){
  let TurningForce = .25
  let SteeringVector = p5.createVector()
  if(position.x < VisualRange.x || 
    position.x > p5.width - VisualRange.x) {
      if(position.x < VisualRange.x){
        SteeringVector.x += TurningForce
      }else{SteeringVector.x -= TurningForce}
  }
  if(position.y < VisualRange.y || 
    position.y > p5.height - VisualRange.y){
      if(position.y < VisualRange.y){
        SteeringVector.y += TurningForce
      }else{SteeringVector.y -= TurningForce}
  }
  velocity.add(SteeringVector)
  if(velocity.mag() > maxSpeed) {
          velocity.normalize()
          velocity.mult(this.maxSpeed)
  }
}`