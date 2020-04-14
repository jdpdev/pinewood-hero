import { Car } from "./Car.ts";
import { RaceWorld } from "./RaceWorld";
import Track from "./Track";
import { Racer } from "../../../game/data/Racer";

export enum RaceState {
    Formation,
    Countdown,
    Race,
    Finish
}

export class RaceManager {
    private _state: RaceState = RaceState.Formation;
    private _cars: Car[] = [];

    constructor(
        private _world: RaceWorld, 
        private _camera: Phaser.Cameras.Scene2D.Camera, 
        private _track: Track
    ) { }

    build(cars: Racer[]) {
        cars.forEach((racer, lane) => {
            const car = new Car(this._track, this._world, racer, lane);
            this._cars.push(car);
        });
    }

    update(delta: number) {
        switch (this._state) {
            case RaceState.Formation:
                this._state = RaceState.Race;
                break;

            case RaceState.Race:
                this._cars.forEach(car => car.update(delta, this._state));

                const leader = this.getLeader();
                const increment = leader.speed * delta;
                this._camera.setScroll(this._camera.scrollX + increment, this._camera.scrollY + increment);

                const finishers = this.checkForFinish();

                if (finishers) {
                    this._state = RaceState.Finish;
                }
                break;

            case RaceState.Finish:
                this._cars.forEach(car => car.update(delta, this._state));
                break;
        }
    }

    checkForFinish() {
        const distance = this._track.winningDistance;
        let leader = this._cars[0];
        const finishers = this._cars.filter(car => {
            if (car.distanceTraveled > leader.distanceTraveled) {
                leader = car;
            }

            return car.distanceTraveled >= distance;
        });

        if (finishers.length > 0) {
            return finishers;
        } else {
            return null;
        }
    }

    getLeader() {
        let leader = this._cars[0];

        this._cars.forEach(car => {
            if (car.distanceTraveled > leader.distanceTraveled) {
                leader = car;
            }
        })

        return leader;
    }
}