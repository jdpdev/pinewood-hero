import { DailyRaceActions } from "./actions/dailyRaceActions"
import { initialState } from "./store";

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

        default:
            return state;
    }
}