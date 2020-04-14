import { store } from "../store";
import { setCurrentDay, setCurrentDailyRace, addDailyRace, setDailyRaceWinner } from "../store/actions/dailyRaceActions";
import { DailyRace } from "./data/DailyRace";

export function generateDailyRaces() {
    const {day, dailyRaces, currentRace, racers} = store.getState();
    
    const races = [
        new DailyRace(racers, 30),
        new DailyRace(racers, 20),
        new DailyRace(racers, 40),
        new DailyRace(racers, 30)
    ]

    store.dispatch(addDailyRace(races[0]));
    store.dispatch(addDailyRace(races[1]));
    store.dispatch(addDailyRace(races[2]));
    store.dispatch(addDailyRace(races[3]));

    store.dispatch(setDailyRaceWinner(races[0], racers[0]))
    store.dispatch(setCurrentDailyRace(0));
}