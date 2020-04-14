import { Racer } from "./Racer";

export class RunningOrder {
    private _finishTime: number = 0;
    private _finishPlace: number = 0;
    private _isPhotoFinish: boolean = false;
    private _isFinished: boolean = false;

    constructor(
        private _racer: Racer,
        private _distance: number
    ) {}

    updateDistance(distance: number) {
        this._distance = distance;
    }

    setFinishTime(time: number) {
        this._finishTime = time;
        this._isFinished = true;
    }

    setFinishPlace(place: number) {
        this._finishPlace = place;
    }

    get racer() {
        return this._racer;
    }

    get distance() {
        return this._distance;
    }

    get finishTime() {
        return this._finishTime;
    }

    get finishPlace() {
        return this._finishPlace;
    }

    get isFinished() {
        return this._isFinished;
    }

    get isPhotoFinish() {
        return this._isPhotoFinish;
    }

    isDifferent(other: RunningOrder) {
        return this._racer.id !== other.racer.id ||
                this._distance !== other.distance ||
                this._finishTime !== other.finishTime ||
                this._isPhotoFinish != other.isPhotoFinish;
    }
}