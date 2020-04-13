export class Driver {
    constructor(
        private _name: string,
        private _weight: number
    ) {}

    get name() {
        return this._name;
    }

    get weight() {
        return this._weight;
    }
}