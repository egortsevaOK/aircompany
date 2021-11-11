const Plane = require('./Plane');

class ExperimentalPlane extends Plane {
  constructor(
    model,
    maxSpeed,
    maxFlightDistance,
    maxLoadCapacity,
    type,
    classificationLevel
  ) {
    super(model, maxSpeed, maxFlightDistance, maxLoadCapacity);
    this.type = type;
    this.classificationLevel = classificationLevel;
  }
}

module.exports = ExperimentalPlane;
