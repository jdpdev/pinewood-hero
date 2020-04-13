import {Body} from '../data/Body'
import {Wheels} from '../data/Wheels'
import {Driver} from '../data/Driver'

export class Racer {
    constructor(
        private _name: string,
        private _number: string,
        private _driver: Driver,
        private _body: Body,
        private _wheels: Wheels
    ) { }

    get name() {
        return this._name;
    }

    get number() {
        return this._number;
    }

    get driver() {
        return this._driver;
    }

    get body() {
        return this._body;
    }

    get wheels() {
        return this._wheels;
    }
}