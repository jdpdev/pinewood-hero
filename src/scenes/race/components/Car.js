import Phaser from 'phaser'
import { RaceState } from './RaceManager';

const SQRT_2 = 1.414;

export class Car {
    constructor(track, world, lane) { 
        this.world = world;
        this.track = track;
        this.lane = lane;

        this.buildCar();

        this._speed = 0;
        this._wheelSpeed = 0;
        this._maxWheelSpeed = 0.2;
        this._weight = 2; //lane + 1;
        this._wheelRadius = lane + 1;
        this._distanceTraveled = 0;
    }

    buildCar() {
        const x = 0;
        const y = this.lane;
        const height = this.track.length;

        this.shadow = this.world.placeTile('car-shadow', x, y, height);
        this.body = this.world.placeTile('car', x, y, height);
    }

    move(x, y) {
        const parts = [this.shadow, this.body];
        parts.forEach(part => {
            part.x += x;
            part.y += y;
        });
    }

    update(delta, state) {
        const acceleration = this.calculateAcceleration();
        this._wheelSpeed += (acceleration * delta) / Math.pow(this._wheelRadius, 1.25);

        if (this._wheelSpeed > this._maxWheelSpeed) {
            this._wheelSpeed = this._maxWheelSpeed;
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
        return 50000;
    }

    get distanceTraveled() {
        return this._distanceTraveled;
    }

    get speed() {
        return this._wheelSpeed * this._wheelRadius;
    }
}