import { Body } from "../data/Body";

export const BodyList = new Map<string, Body>();

BodyList.set(
    'wedgerator', 
    new Body(
        'Wedgerator', 2000, 0, 'car', 'car-shadow', 'It\'s a wedge',
        {
            frontLeft: {x: 231, y: 186},
            frontRight: {x: 51, y: 274},
            backLeft: {x: 1, y: -161},
            backRight: {x: -349, y: 10}
        }
    )
);