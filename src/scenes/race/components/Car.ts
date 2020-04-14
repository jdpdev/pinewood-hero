import Track from "./Track";
import { RaceWorld } from "./RaceWorld";
import { Racer } from "../../../game/data/Racer";

const SQRT_2 = 1.414;

export class Car {
    private _wheelSpeed = 0;
    private _distanceTraveled = 0;
    private _weight = 0;

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

        this._shadowImage = this.world.placeTile('car-shadow', x, y, height);
        this._bodyImage = this.world.placeTile('car', x, y, height);

        this._weight = this.calculateWeight();
    }

    move(x, y) {
        const parts = [this._shadowImage, this._bodyImage];
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