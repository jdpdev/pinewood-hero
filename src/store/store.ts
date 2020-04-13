import { DailyRace } from "../game/data/DailyRace";

export type GameState = {
    day: number,
    dailyRaces: DailyRace[],
    currentRace: number
}