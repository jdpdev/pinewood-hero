import { DailyRaceActions } from "./dailyRaceActions"
import { GameState } from "./store";

const initialState: GameState = {
    day: 0,
    dailyRaces: [],
    currentRace: 0
}

type ActionParams = {
    type: string,
    payload?: any
}

export const RaceReducer = (state = initialState, action: ActionParams) => {
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
    }
}