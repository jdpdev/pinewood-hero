import { DailyRace } from "../../game/data/DailyRace"
import { Racer } from "../../game/data/Racer"

export enum DailyRaceActions {
    SetDay = 'set-game-day',
    SetCurrentRace = 'daily-race-set-current',
    AddRace = 'daily-race-add-race',
    ClearRaces = 'daily-race-clear',
    SetWinner = 'daily-race-set-winner'
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

export function clearDailyRaces() {
    return {
        type: DailyRaceActions.ClearRaces
    }
}

export function setDailyRaceWinner(race: DailyRace, winner: Racer) {
    return {
        type: DailyRaceActions.SetWinner,
        payload: {
            race, winner
        }
    }
}