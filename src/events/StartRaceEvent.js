import { dispatchEvent } from "./core";

export const START_RACE_EVENT = 'start-race-event';
const DEFAULT_LENGTH = 0;
const DEFAULT_ENTRANTS = 0;

export class StartRaceEvent extends Event {
    constructor() {
        super(START_RACE_EVENT);

        this._trackLength = DEFAULT_LENGTH;
        this._entrants = [];
    }

    setLength(length) {
        this._trackLength = length;
        return this;
    }

    /**
     * 
     * @param {RaceEntrant} entrant 
     */
    addEntrant(entrant) {
        this._entrants.push(entrant);
        return this;
    }

    dispatch() {
        if (this._trackLength === DEFAULT_LENGTH) {
            throw new Error('Must set a track length');
        }

        if (this._entrants.length === DEFAULT_ENTRANTS) {
            throw new Error('Must add entrants');
        }

        dispatchEvent(this);
    }
}

export class RaceEntrant {
    constructor(
        number,
        name,
        body,
        wheels,
        driver
    ) {
        this._number = number;
        this._name = name;
        this._body = body;
        this._wheels = wheels;
        this._driver = driver;
    }

    get number() { return this._number }
    get name() { return this._name }
    get body() { return this._body }
    get wheels() { return this._wheels }
    get driver() { return this._driver }
}