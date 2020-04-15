import { dispatchEvent } from "./core";

export const NEXT_RACE_EVENT = 'next-race-event';

export class NextRaceEvent extends Event {
    constructor() {
        super(NEXT_RACE_EVENT);
    }

    dispatch() {
        dispatchEvent(this);
    }
}