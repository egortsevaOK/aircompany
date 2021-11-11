const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const MilitaryType = require('./Models/MilitaryType');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');

class Airport {

    constructor(planes) {
        this.planes = planes;
    }

    getPassengerPlanes() {
        return this.planes.filter(plane => plane instanceof PassengerPlane);
    }

    getMilitaryPlanes() {
        return this.planes.filter(plane => plane instanceof MilitaryPlane);
    }

    getPlaneWithMaxPassengersCapacity() {

        let passengerPlanes = this.getPassengerPlanes();
        return passengerPlanes.reduce((maxCapacity, plane) => maxCapacity.getPassengersCapacity() > plane.getPassengersCapacity() ? maxCapacity : plane);
    }

    getTransportMilitaryPlanes() {

        let militaryPlanes = this.getMilitaryPlanes();
        return militaryPlanes.filter(plane => plane.getMilitaryType() == MilitaryType.TRANSPORT);
    }

    getBomberMilitaryPlanes() {

        let militaryPlanes = this.getMilitaryPlanes();
        return militaryPlanes.filter(plane => plane.getMilitaryType() === MilitaryType.BOMBER);
    }

    getExperimentalPlanes() {
        return this.planes.filter(plane => plane instanceof ExperimentalPlane);
    }

    sortByMaxDistance() {
        this.planes.sort((a, b) => a.getMaxFlightDistance() - b.getMaxFlightDistance());
        return this;
    }

    sortByMaxSpeed() {
        this.planes.sort((a, b) => a.getMaxSpeed() - b.getMaxSpeed());
        return this;
    }

    sortByMaxLoadCapacity() {
        this.planes.sort((a, b) => a.getMaxLoadCapacity() - b.getMaxLoadCapacity());
        return this;
    }

    getPlanes() {
        return this.planes;
    }

    static print(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;