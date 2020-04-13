import { DailyRace } from "../game/data/DailyRace";
import { Racer } from "../game/data/Racer";
import { Driver } from "../game/data/Driver";
import { Body } from "../game/data/Body";
import { Wheels } from "../game/data/Wheels";

export type GameState = {
    day: number,
    dailyRaces: DailyRace[],
    currentRace: number,
    racers: Racer[]
}

export const initialState: GameState = {
    day: 1,
    dailyRaces: [],
    currentRace: 0,
    racers: [
        new Racer(
            'Oh Hi Mark', 
            '16',
            new Driver('Roll Fizzlebeef', 0),
            new Body(2, 0),
            new Wheels(0, 1)
        ),
        new Racer(
            'Lemon Soiree', 
            '69',
            new Driver('Stump Chunkman', 0),
            new Body(2, 0),
            new Wheels(0, 2)
        ),
        new Racer(
            '2 Butts 1 Seat', 
            '420',
            new Driver('Bob Johnson', 0),
            new Body(2, 0),
            new Wheels(0, 3)
        ),
        new Racer(
            'My Staircase', 
            '00',
            new Driver('Crunch Buttsteak', 0),
            new Body(2, 0),
            new Wheels(0, 4)
        ),
    ]
}