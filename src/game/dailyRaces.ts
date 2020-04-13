import { store } from "../store";
import { setCurrentDay, setCurrentDailyRace } from "../store/actions/dailyRaceActions";

export function generateDailyRaces() {
    const {day, dailyRaces, currentRace} = store.getState();
    
    store.dispatch(setCurrentDailyRace(0));
}