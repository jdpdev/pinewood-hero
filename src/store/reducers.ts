import { DailyRaceActions } from "./dailyRaceActions"

type InitialState = {
    day: number,
    dailyRaces: any[],
    currentRace: number
}

const initialState: InitialState = {
    day: 1,
    dailyRaces: [],
    currentRace: 0
}

type ActionParams = {
    type: string,
    payload?: any
}

export const RaceReducer = (state = initialState, action: ActionParams) => {
    switch (action.type) {
        case DailyRaceActions.SetCurrentRace:
            const newState = {...state};
            newState.currentRace = action.payload;
            return newState;

        case DailyRaceActions.AddRace:
            const newState = {...state};
            newState.dailyRaces.push(action.payload);
            return newState;
    }
}