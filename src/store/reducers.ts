import { DailyRaceActions } from "./actions/dailyRaceActions"
import { initialState } from "./store";
import { InRaceActions, InRaceState } from "./actions/inRaceActions";
import { StartRaceEvent } from "../events/StartRaceEvent";

type ActionParams = {
    type: string,
    payload?: any
}

export function raceReducer(state = initialState, action: ActionParams) {
    switch (action.type) {
        case DailyRaceActions.SetDay:
            const updatedDayState = {...state};
            updatedDayState.day = action.payload;
            return updatedDayState;

        case DailyRaceActions.SetCurrentRace:
            const updatedRaceAction = {...state};
            updatedRaceAction.currentRace = action.payload;
            return updatedRaceAction;

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

            return {
                ...state, 
                loadedRace: action.payload,
                currentRaceState: InRaceState.Loaded
            }; 

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
                currentRaceState: InRaceState.Finished
            };

        default:
            return state;
    }
}