import { store } from "../store";
import { setCurrentDay, setCurrentDailyRace } from "../store/dailyRaceActions";

export function generateDailyRaces() {
    const {day, dailyRaces, currentRace} = store.getState();
    
    store.dispatch(setCurrentDay(day + 1));
    store.dispatch(setCurrentDailyRace(0));
}