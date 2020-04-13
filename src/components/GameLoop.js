import React, { useEffect } from "react";
import { StartRaceEvent, RaceEntrant } from "../events/StartRaceEvent";
import {setCurrentDay, setCurrentDailyRace, addDailyRace} from '../store/actions/dailyRaceActions'

import {connect} from "react-redux";
import { generateDailyRaces } from "../game/dailyRaces";
import { PhaserComponent } from "./Phaser";

function GameLoop({day, currentRace, dailyRaces, racers}) {
    useEffect(() => {
        generateDailyRaces();
    }, [day]);

    return (
        <div>
            <div className='race-view'>
                <PhaserComponent />
            </div>
            <div className='race-outline'>
                <div>
                    <h4>Day {day} - Race {currentRace + 1}</h4>
                    <button onClick={startDemoRace}>
                        Start Race {currentRace + 1}
                    </button>
                </div>
            </div>
        </div>
    )
}

function startDemoRace(racers) {
    new StartRaceEvent()
        .setLength(30)
        .addEntrant(racers[0])
        .addEntrant(racers[1])
        .addEntrant(racers[2])
        .addEntrant(racers[3])
        .dispatch();
}

const mapStateToProps = state => {
    return {
        day: state.day,
        dailyRaces: state.dailyRaces,
        currentRace: state.currentRace,
        racers: state.racers
    }
}

const mapDispatchToProps = {
    setCurrentDay,
    setCurrentDailyRace,
    addDailyRace
}

export default connect(mapStateToProps, mapDispatchToProps)(GameLoop);