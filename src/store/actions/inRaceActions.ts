import { DailyRace } from "../../game/data/DailyRace";
import { RunningOrder } from "../../game/data/RunningOrder";

export enum InRaceState {
    NotLoaded = 'not-loaded',
    Loaded = 'loaded',
    Running = 'running',
    Finished = 'finished'
}

export enum InRaceActions {
    Load = 'inrace-load',
    Start = 'inrace-start',
    OrderChange = 'inrace-order-change',
    Finish = 'inrace-finish'
}

export function loadRace(race: DailyRace) {
    return {
        type: InRaceActions.Load,
        payload: race
    }
}

export function startRace() {
    return {
        type: InRaceActions.Start
    }
}

export function orderChange(order: RunningOrder[]) {
    return {
        type: InRaceActions.OrderChange,
        payload: order
    }
}

export function finishRace(winner: RunningOrder) {
    return {
        type: InRaceActions.Finish,
        payload: winner
    }
}