import { DailyRace } from "../../game/data/DailyRace"

export enum DailyRaceActions {
    SetDay = 'set-game-day',
    SetCurrentRace = 'daily-race-set-current',
    AddRace = 'daily-race-add-race'
}

export function setCurrentDay(day: number) {
    return {
        type: DailyRaceActions.SetDay,
        payload: day
    }
}

export function setCurrentDailyRace(race: number) {
    return {
        type: DailyRaceActions.SetCurrentRace,
        payload: race
    }
}

export function addDailyRace(race: DailyRace) {
    return {
        type: DailyRaceActions.AddRace,
        payload: race
    }
}