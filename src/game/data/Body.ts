type Point = {x: number, y: number}

type WheelOffsets = {
    frontLeft: Point,
    frontRight: Point,
    backLeft: Point,
    backRight: Point
}

export class Body {
    constructor(
        private _name: string,
        private _weight: number,
        private _drag: number,
        private _icon: string,
        private _shadowIcon: string,
        private _description: string,
        private _wheelOffsets: WheelOffsets
    ) {}

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get weight() {
        return this._weight;
    }

    get drag() {
        return this._drag;
    }

    get icon() {
        return this._icon;
    }

    get shadowIcon() {
        return this._shadowIcon;
    }

    get wheelOffsets() {
        return this._wheelOffsets;
    }
}