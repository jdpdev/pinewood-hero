import { store } from "../store";
import { setCurrentDay, setCurrentDailyRace, addDailyRace, setDailyRaceWinner, primeDailyRace } from "../store/actions/dailyRaceActions";
import { DailyRace } from "./data/DailyRace";
import { loadRace } from "../store/actions/inRaceActions";

export function generateDailyRaces() {
    const {day, dailyRaces, currentRace, racers} = store.getState();
    
    const races = [
        new DailyRace(racers, 30, 1),
        new DailyRace(racers, 20, 2),
        new DailyRace(racers, 40, 3),
        new DailyRace(racers, 30, 4)
    ]

    store.dispatch(addDailyRace(races[0]));
    store.dispatch(addDailyRace(races[1]));
    store.dispatch(addDailyRace(races[2]));
    store.dispatch(addDailyRace(races[3]));

    store.dispatch(primeDailyRace(races[0]));
    store.dispatch(setCurrentDailyRace(0));
}