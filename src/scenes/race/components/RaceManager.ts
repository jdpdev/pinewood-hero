import { Car } from "./Car";
import { RaceWorld } from "./RaceWorld";
import Track from "./Track";
import { Racer } from "../../../game/data/Racer";
import { RunningOrder } from "../../../game/data/RunningOrder";
import { store } from "../../../store";
import { startRace, orderChange, finishRace } from "../../../store/actions/inRaceActions";

export enum RaceState {
    Formation,
    Countdown,
    Race,
    Finish,
    Over
}

export class RaceManager {
    private _state: RaceState = RaceState.Formation;
    private _cars: Car[] = [];

    /** elapsed race time in ms */
    private _raceTime: number = 0;

    private _runningOrder: RunningOrder[] = [];

    private _finishers: RunningOrder[] = [];

    constructor(
        private _world: RaceWorld, 
        private _camera: Phaser.Cameras.Scene2D.Camera, 
        private _track: Track
    ) { }

    build(cars: Racer[]) {
        cars.forEach((racer, lane) => {
            const car = new Car(this._track, this._world, racer, lane);
            this._cars.push(car);

            this._runningOrder.push(new RunningOrder(racer, 0));
        });
    }

    update(delta: number) {
        switch (this._state) {
            case RaceState.Formation:
                this.beginRace();
                break;

            case RaceState.Race:
                this.stepRace(delta);

                const leader = this.getLeader();
                const increment = leader.speed * (delta / 1000);
                this._camera.setScroll(this._camera.scrollX + increment, this._camera.scrollY + increment);
                break;

            case RaceState.Finish:
                this.stepRace(delta);
                break;

            case RaceState.Over:
                this.updateCars(delta);
                break;
        }
    }

    private beginRace() {
        store.dispatch(startRace());
        this._state = RaceState.Race;
    }

    private stepRace(delta) {
        this.updateCars(delta);
        this.updateTimer(delta);

        this.updateRunningOrder();
        this.checkForFinish();
    }

    private updateCars(delta) {
        this._cars.forEach(car => car.update(delta / 1000, this._state));
    }

    private updateTimer(delta) {
        this._raceTime += delta;
    }

    private updateRunningOrder() {
        const endDistance = this._track.winningDistance;
        const newOrder = [...this._runningOrder];

        newOrder.forEach(runner => {
            const car = this.getCarForRacer(runner.racer);

            if (!runner.isFinished) {
                runner.updateDistance(car.distanceTraveled);

                if (car.distanceTraveled >= endDistance) {
                    runner.setFinishTime(this._raceTime);
                }
            }
        });

        newOrder.sort((a, b) => {
            if (a.isFinished && !b.isFinished) {
                return -1;
            } else if (b.isFinished && !a.isFinished) {
                return 1;
            } else if (a.isFinished && b.isFinished) {
                return a.finishTime - b.finishTime;
            } else {
                return a.distance - b.distance;
            }
        });

        // compare and update
        let needsUpdate = false;

        for (let i = 0; i < this._runningOrder.length; i++) {
            if (this._runningOrder[i].isDifferent(newOrder[i])) {
                needsUpdate = true;
                break;
            }
        }

        if (needsUpdate) {
            this._runningOrder = newOrder;
            store.dispatch(orderChange(newOrder));
        }
    }

    private getCarForRacer(racer: Racer): Car {
        return this._cars.find(car => car.racer.id === racer.id);
    }

    checkForFinish() {
        const finishes = this._runningOrder.map(runner => runner.isFinished);

        const isSomeoneFinished = finishes.reduce(
            (result, value) => result || value, 
            false
        );
        const isEveryoneFinished = finishes.reduce(
            (result, value) => result && value, 
            true
        );

        if (isSomeoneFinished && this._state != RaceState.Finish) {
            this._state = RaceState.Finish;
            console.log('[RaceManager] Race Won')
        }

        if (isEveryoneFinished) {
            this.completeRace();
            console.log('[RaceManager] Race Over')
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

    private completeRace() {
        this._state = RaceState.Over;
        store.dispatch(finishRace());
    }
}