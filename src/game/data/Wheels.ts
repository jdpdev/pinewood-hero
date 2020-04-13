export class Wheels {
    constructor(
        private _weight: number,
        private _radius: number
    ) { }

    get weight() {
        return this._weight;
    }

    get radius() {
        return this._radius;
    }
}