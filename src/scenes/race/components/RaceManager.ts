import { Car } from "./Car.ts";
import { RaceWorld } from "./RaceWorld";
import Track from "./Track";
import { Racer } from "../../../game/data/Racer";
import { Finisher } from "../../../game/data/Finisher";

export enum RaceState {
    Formation,
    Countdown,
    Race,
    Finish
}

export class RaceManager {
    private _state: RaceState = RaceState.Formation;
    private _cars: Car[] = [];

    /** elapsed race time in ms */
    private _raceTime: number = 0;

    private _finishers: Finisher[] = [];

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
                this.updateCars(delta);
                this.updateTimer(delta);

                const leader = this.getLeader();
                const increment = leader.speed * (delta / 1000);
                this._camera.setScroll(this._camera.scrollX + increment, this._camera.scrollY + increment);

                this.checkForFinish();

                if (this._finishers.length > 0) {
                    this._state = RaceState.Finish;
                }
                break;

            case RaceState.Finish:
                this.updateCars(delta);
                this.updateTimer(delta);
                this.checkForFinish();

                if (this._finishers.length === this._cars.length) {
                    this.completeRace();
                }
                break;
        }
    }

    private updateCars(delta) {
        this._cars.forEach(car => car.update(delta / 1000, this._state));
    }

    private updateTimer(delta) {
        this._raceTime += delta;
    }

    checkForFinish() {
        const distance = this._track.winningDistance;
        this._cars.forEach(car => {
            if (car.distanceTraveled >= distance) {
                const finisher = this._finishers.find(finisher => finisher.racer === car.racer);

                if (!finisher) {
                    this._finishers.push(
                        new Finisher(car.racer, this._raceTime)
                    );
                }
            }
        })
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

    private completeRace() {

    }
}