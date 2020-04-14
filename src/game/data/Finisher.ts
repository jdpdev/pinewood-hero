import { Racer } from "./Racer";

export class Finisher {
    constructor(
        private _racer: Racer,
        private _time: number
    ) {}

    get racer() {
        return this._racer;
    }

    get time() {
        return this._time;
    }
}