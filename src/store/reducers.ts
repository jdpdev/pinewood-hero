import { DailyRaceActions } from "./dailyRaceActions"
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
            const newState = {...state};
            newState.dailyRaces.push(action.payload);
            return newState;

        default:
            return state;
    }
}