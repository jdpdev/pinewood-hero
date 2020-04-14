import { dispatchEvent } from "./core";

export const START_RACE_EVENT = 'start-race-event';

export class StartRaceEvent extends Event {
    constructor(race) {
        super(START_RACE_EVENT);
        this._race = race;
    }

    dispatch() {
        if (this._race == null) {
            throw new Error('Must provide a race');
        }

        dispatchEvent(this);
    }

    get race() {
        return this._race;
    }
}