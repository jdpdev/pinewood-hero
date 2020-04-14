import React, { useEffect } from "react";
import {setCurrentDay, setCurrentDailyRace, addDailyRace} from '../store/actions/dailyRaceActions'
import {loadRace} from '../store/actions/inRaceActions'

import {connect} from "react-redux";
import { generateDailyRaces } from "../game/dailyRaces";
import { PhaserComponent } from "./Phaser";
import DailyRaceList from "./DailyRaceList";

import './style/GameLoop.scss'
import CurrentRace from "./CurrentRace";

function GameLoop({day, currentRace, dailyRaces, racers, loadRace}) {
    useEffect(() => {
        generateDailyRaces();
    }, [day]);

    return (
        <div className='game-loop'>
            <div className='race-view'>
                <PhaserComponent />
            </div>
            <div className='race-outline'>
                <CurrentRace />
            </div>
            <div className='daily-race-list'>
                <DailyRaceList
                    day={day}
                    dailyRaces={dailyRaces}
                    currentRace={currentRace}
                />
            </div>
        </div>
    )
}

function loadNextRace(loadRace, race) {
    loadRace(race);
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
    addDailyRace,
    loadRace
}

export default connect(mapStateToProps, mapDispatchToProps)(GameLoop);