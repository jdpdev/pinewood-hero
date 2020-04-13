import { DailyRace } from "../game/data/DailyRace";
import { Racer } from "../game/data/Racer";

export type GameState = {
    day: number,
    dailyRaces: DailyRace[],
    currentRace: number,
    racers: Racer[]
}

export const initialState: GameState = {
    day: 0,
    dailyRaces: [],
    currentRace: 0,
    racers: []
}