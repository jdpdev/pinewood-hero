import { DailyRace } from "../../game/data/DailyRace";
import { Racer } from "../../game/data/Racer";

export enum InRaceActions {
    Load = 'inrace-load',
    Start = 'inrace-start',
    LeadChange = 'inrace-lead-change',
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

export function leadChange(leader: Racer) {
    return {
        type: InRaceActions.LeadChange,
        payload: leader
    }
}

export function finishRace(winner: Racer) {
    return {
        type: InRaceActions.Finish,
        payload: winner
    }
}