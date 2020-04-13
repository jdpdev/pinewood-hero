import { createStore } from "redux";
import { raceReducer } from "./reducers";

function createGameStore() {
    const store = createStore(raceReducer);
    return store;
}

export const store = createGameStore();