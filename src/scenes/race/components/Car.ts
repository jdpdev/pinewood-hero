import Track from "./Track";
import { RaceWorld } from "./RaceWorld";
import { Racer } from "../../../game/data/Racer";

const SQRT_2 = 1.414;

export class Car {
    private _wheelSpeed = 0;
    private _distanceTraveled = 0;
    private _weight = 0;

    private _vehicle: Phaser.GameObjects.Container;
    private _shadowImage: any;
    private _bodyImage: any;

    constructor(
        private track: Track, 
        private world: RaceWorld, 
        private _racer: Racer,
        private lane: number

    ) {

        this.buildCar();
    }

    buildCar() {
        const x = 0;
        const y = this.lane;
        const height = this.track.length;
        const body = this._racer.body;
        const wheels = this._racer.wheels;

        this._vehicle = this.world.placeVehicle(x, y, height);

        //this._shadowImage = this.world.placeTile(body.shadowIcon, x, y, height);
        this._shadowImage = this.world.makeSprite(body.shadowIcon, this._vehicle);
        this._bodyImage = this.world.makeSprite(body.icon, this._vehicle);

        const frwheel = this.world.makeSprite(wheels.icon, this._vehicle);
        frwheel.setPosition(
            body.wheelOffsets.frontRight.x * frwheel.scaleX, 
            body.wheelOffsets.frontRight.y * frwheel.scaleX
        );

        const flwheel = this.world.makeSprite(wheels.icon, this._vehicle);
        flwheel.setPosition(
            body.wheelOffsets.frontLeft.x * frwheel.scaleX, 
            body.wheelOffsets.frontLeft.y * frwheel.scaleX
        );

        const blwheel = this.world.makeSprite(wheels.icon, this._vehicle);
        blwheel.setPosition(
            body.wheelOffsets.backLeft.x * frwheel.scaleX, 
            body.wheelOffsets.backLeft.y * frwheel.scaleX
        );

        const brwheel = this.world.makeSprite(wheels.icon, this._vehicle);
        brwheel.setPosition(
            body.wheelOffsets.backRight.x * frwheel.scaleX, 
            body.wheelOffsets.backRight.y * frwheel.scaleX
        );

        this._vehicle.moveTo(this._shadowImage, 0);
        this._vehicle.moveTo(blwheel, 1);
        this._vehicle.moveTo(flwheel, 2);
        this._vehicle.moveTo(this._bodyImage, 3);
        this._vehicle.moveTo(frwheel, 4);
        this._vehicle.moveTo(brwheel, 5);
        
        this._weight = this.calculateWeight();
    }

    move(x, y) {
        const parts = [this._vehicle];
        parts.forEach(part => {
            part.x += x;
            part.y += y;
        });
    }

    update(delta, state) {
        const acceleration = this.calculateAcceleration();
        this._wheelSpeed += (acceleration * delta) / Math.pow(this.wheelRadius, 1.25);

        if (this._wheelSpeed > this.maxWheelSpeed) {
            this._wheelSpeed = this.maxWheelSpeed;
        }
        
        const increment = this.speed * delta;
        this._distanceTraveled += increment * SQRT_2;

        if (this._distanceTraveled >= this.track.endDistance) {
            this.move(increment, increment / 2);
        } else {
            this.move(increment, increment);
        }
    }

    calculateAcceleration() {
        return this._weight / this.getDragForce();
    }

    getDragForce() {
        return 50;
    }

    get distanceTraveled() {
        return this._distanceTraveled;
    }

    get speed() {
        return this._wheelSpeed * this.wheelRadius;
    }

    get racer() {
        return this._racer;
    }

    private calculateWeight(): number {
        const components = [
            this.racer.body.weight,
            this.racer.wheels.weight,
            this.racer.driver.weight
        ]

        return components.reduce((sum, value) => sum + value);
    }

    private get wheelRadius(): number {
        return this.racer.wheels.radius;
    }

    private get maxWheelSpeed(): number {
        return this.racer.wheels.maxSpeed;
    }
}