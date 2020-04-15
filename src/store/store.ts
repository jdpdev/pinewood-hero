import { DailyRace } from "../game/data/DailyRace";
import { Racer } from "../game/data/Racer";
import { Driver } from "../game/data/Driver";
import { Body } from "../game/data/Body";
import { Wheels } from "../game/data/Wheels";
import { RunningOrder } from "../game/data/RunningOrder";
import { InRaceState } from "./actions/inRaceActions";
import {BodyList} from '../game/content/bodies'
import { WheelList } from "../game/content/wheels";

export type GameState = {
    day: number,
    dailyRaces: DailyRace[],
    currentRace: number,
    currentRaceState: InRaceState
    loadedRace: DailyRace,
    raceRunningOrder: RunningOrder[],
    
    racers: Racer[],
}

export const initialState: GameState = {
    day: 1,
    dailyRaces: [],
    currentRace: 0,
    loadedRace: null,
    currentRaceState: InRaceState.NotLoaded,
    raceRunningOrder: null,
    racers: [
        new Racer(
            'Oh Hi Mark', 
            '16',
            new Driver('Roll Fizzlebeef', 0),
            BodyList.get('wedgerator'),
            WheelList.get('thinnies')
        ),
        new Racer(
            'Lemon Soiree', 
            '69',
            new Driver('Stump Chunkman', 0),
            BodyList.get('wedgerator'),
            WheelList.get('rolleroos')
        ),
        new Racer(
            '2 Butts 1 Seat', 
            '420',
            new Driver('Bob Johnson', 0),
            BodyList.get('wedgerator'),
            WheelList.get('disco')
        ),
        new Racer(
            'My Staircase', 
            '00',
            new Driver('Crunch Buttsteak', 0),
            BodyList.get('wedgerator'),
            WheelList.get('chonkers')
        ),
    ]
}