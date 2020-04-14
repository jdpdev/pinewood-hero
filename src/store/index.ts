import { createStore } from "redux";
import { raceReducer } from "./reducers";

function createGameStore() {
    //@ts-ignore
    const store = createStore(raceReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;
}

export const store = createGameStore();