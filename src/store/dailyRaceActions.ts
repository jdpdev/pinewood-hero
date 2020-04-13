export enum DailyRaceActions {
    SetCurrentRace = 'daily-race-set-current',
    AddRace = 'daily-race-add-race'
}

export function setCurrentDailyRace(race: number) {
    return {
        type: DailyRaceActions.SetCurrentRace,
        payload: race
    }
}

export function addDailyRace(race: any) {
    return {
        type: DailyRaceActions.AddRace,
        payload: race
    }
}