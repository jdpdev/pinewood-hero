import { DailyRace } from "../game/data/DailyRace";

export type GameState = {
    day: number,
    dailyRaces: DailyRace[],
    currentRace: number
}

export const initialState: GameState = {
    day: 0,
    dailyRaces: [],
    currentRace: 0
}