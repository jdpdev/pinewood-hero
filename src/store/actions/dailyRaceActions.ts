import { DailyRace } from "../../game/data/DailyRace"
import { Racer } from "../../game/data/Racer"

export enum DailyRaceActions {
    SetDay = 'set-game-day',
    SetCurrentRace = 'daily-race-set-current',
    NextDailyRace = 'daily-race-next',
    AddRace = 'daily-race-add-race',
    ClearRaces = 'daily-race-clear',
    SetWinner = 'daily-race-set-winner',
    PrimeRace = 'daily-race-prime-race'
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

export function nextDailyRace() {
    return {
        type: DailyRaceActions.NextDailyRace
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

export function primeDailyRace(race: DailyRace) {
    return {
        type: DailyRaceActions.PrimeRace,
        payload: race
    }
}