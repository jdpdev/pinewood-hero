import { createStore } from "redux";
import { raceReducer } from "./reducers";
import { initialState } from "./store";

export function createGameStore() {
    const store = createStore(raceReducer, {
        day: 0,
        dailyRaces: [],
        currentRace: 0
    });
    return store;
}