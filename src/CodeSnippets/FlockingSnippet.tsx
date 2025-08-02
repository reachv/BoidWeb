 export const FlockingCode =  `
      for (let other of nearbyBoids) {
          let dx = this.position.x - other.position.x
          let dy = this.position.y - other.position.y
          let dz = this.position.z - other.position.z
          let distSq = dx * dx + dy * dy + dz * dz

          if (distSq < 10000) {
              this.alignmentSum.add(other.velocity)
              alignmentCount++

              this.cohesionSum.add(other.position)
              cohesionCount++

              if(distSq < 1500){
                  let dist = Math.sqrt(distSq)
                  this.tempVector.set(dx, dy, dz)
                  this.tempVector.div(dist)
                  this.separationSum.add(this.tempVector)
                  separationCount++
              }
          }
      }
    `