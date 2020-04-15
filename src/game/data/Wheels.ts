export class Wheels {
    constructor(
        private _name: string,
        private _weight: number,
        private _radius: number,
        private _icon: string,
        private _description: string
    ) { }

    get weight() {
        return this._weight;
    }

    get radius() {
        return this._radius;
    }

    get maxSpeed() {
        return 200;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get icon() {
        return this._icon;
    }
}