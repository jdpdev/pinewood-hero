export class Body {
    constructor(
        private _weight: number,
        private _drag: number
    ) {}

    get weight() {
        return this._weight;
    }

    get drag() {
        return this._drag;
    }
}