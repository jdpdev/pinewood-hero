import { DailyRaceActions } from "./actions/dailyRaceActions"
import { initialState, GameState } from "./store";
import { InRaceActions, InRaceState } from "./actions/inRaceActions";
import { StartRaceEvent } from "../events/StartRaceEvent";
import { RunningOrder } from "../game/data/RunningOrder";
import { DailyRace } from "../game/data/DailyRace";
import { NextRaceEvent } from "../events/NextRaceEvent";

type ActionParams = {
    type: string,
    payload?: any
}

export function raceReducer(state: GameState = initialState, action: ActionParams) {
    switch (action.type) {
        case DailyRaceActions.SetDay:
            const updatedDayState = {...state};
            updatedDayState.day = action.payload;
            return updatedDayState;

        case DailyRaceActions.SetCurrentRace:
            const updatedRaceAction = {...state};
            updatedRaceAction.currentRace = action.payload;
            return updatedRaceAction;

        case DailyRaceActions.NextDailyRace:
            new NextRaceEvent().dispatch();

            return {
                ...state, 
                currentRace: state.currentRace + 1,
                loadedRace: state.dailyRaces[state.currentRace + 1],
                currentRaceState: InRaceState.Loaded
            }

        case DailyRaceActions.PrimeRace:
            return {
                ...state, 
                loadedRace: action.payload, 
                currentRaceState: InRaceState.Loaded
            };

        case DailyRaceActions.AddRace:
            const raceList = [...state.dailyRaces];
            raceList.push(action.payload);
            return {...state, dailyRaces: raceList};

        case DailyRaceActions.ClearRaces:
            return {...state, dailyRaces: []};

        case DailyRaceActions.SetWinner:
            const races = [...state.dailyRaces];

            for (let i = 0; i < races.length; i++) {
                if (races[i].id == action.payload.race) {
                    races[i].winner = action.payload.winner;
                    break;
                }
            }

            return {...state, dailyRaces: races};

        case InRaceActions.Load:
            const event = new StartRaceEvent(action.payload);
            event.dispatch();

            return state; 

        case InRaceActions.Start:
            return {
                ...state, 
                currentRaceState: InRaceState.Running
            };

        case InRaceActions.OrderChange:
            return {...state, raceRunningOrder: action.payload};

        case InRaceActions.Finish:
            return {
                ...state, 
                currentRaceState: InRaceState.Finished,
                dailyRaces: updateRaceWinner(state, state.loadedRace, action.payload)
            };

        default:
            return state;
    }
}

function updateRaceWinner(state: GameState, race: DailyRace, winner: RunningOrder) {
    const races = [...state.dailyRaces];

    for (let i = 0; i < races.length; i++) {
        if (races[i].id == race.id) {
            races[i].winner = winner.racer;
            break;
        }
    }

    return races;
}