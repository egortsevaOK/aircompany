const assert = require('chai').assert;

const Plane = require('../Planes/Plane');
const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const Airport = require('../Airport');
const MilitaryType = require('../Models/MilitaryType');
const ExperimentalPlane = require('../Planes/ExperimentalPlane');
const ExperimentalType = require('../Models/ExperimentalType');
const ClassificationLevel = require('../Models/ClassificationLevel');


describe('Airport Test', () => {

    const planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryType.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryType.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryType.BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, MilitaryType.FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MilitaryType.FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryType.TRANSPORT),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, ExperimentalType.HIGH_ALTITUDE, ClassificationLevel.SECRET),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalType.VTOL, ClassificationLevel.TOP_SECRET)
    ];
    const planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

    it('should return at least one military plane with military type transport', () => {
        const airport = new Airport(planes);
        const transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        const isTransportType = transportMilitaryPlanes.some(militaryPlane => militaryPlane.getMilitaryType() === MilitaryType.TRANSPORT);
        assert.isTrue(isTransportType);
    });

    it('should get passenger plane with max capacity', () => {
        const airport = new Airport(planes);
        const expectedPlaneWithMaxPassengersCapacity = airport.getPlaneWithMaxPassengersCapacity();
        assert.isTrue(JSON.stringify(expectedPlaneWithMaxPassengersCapacity) === JSON.stringify(planeWithMaxPassengerCapacity));
    });

    it('should check the list of planes is sorted by max load capacity', () => {
        let airport = new Airport(planes);
        airport.sortByMaxLoadCapacity();
        let planesSortedByMaxLoadCapacity = airport.getPlanes();
        let isSorted = true;
        for (let i = 0; i < planesSortedByMaxLoadCapacity.length - 1; i++) {
            let currentPlane = planesSortedByMaxLoadCapacity[i];
            let nextPlane = planesSortedByMaxLoadCapacity[i + 1];
            if (currentPlane.getMaxLoadCapacity() > nextPlane.getMaxLoadCapacity()) {
                isSorted = false;
                break;
            }
        }
        assert.isTrue(isSorted);
    });

    it('should return at least one military plane wilitary type bomber', () => {

        const airport = new Airport(planes);
        const bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
        const isBomberType = bomberMilitaryPlanes.some(militaryPlane => militaryPlane.getMilitaryType() === MilitaryType.BOMBER);
        assert.isTrue(isBomberType);
    });

    it('should check that there is no experimental planes with unclassified classification level', () => {
        let airport = new Airport(planes);
        let experimentalPlanes = airport.getExperimentalPlanes();
        const hasUnclassifiedPlanes = experimentalPlanes.some(experimentalPlane => experimentalPlane.classificationLevel === ClassificationLevel.UNCLASSIFIED);
        assert.isFalse(hasUnclassifiedPlanes);
    });
});