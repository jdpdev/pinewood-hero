import React, { Component } from "react";
import { StartRaceEvent, RaceEntrant } from "../events/StartRaceEvent";
import {setCurrentDay, setCurrentDailyRace, addDailyRace} from '../store/dailyRaceActions'

import {connect} from "react-redux";
import { generateDailyRaces } from "../game/dailyRaces";
import { PhaserComponent } from "./Phaser";

class GameLoop extends Component {
    componentDidMount() {
        const {day, setCurrentDay, setCurrentDailyRace, addDailyRace} = this.props;
        generateDailyRaces(day, setCurrentDay, addDailyRace, setCurrentDailyRace);
    }

    render() {
        return (
            <div>
                <div className='race-view'>
                    <PhaserComponent />
                </div>
                <div className='race-outline'>
                    <div onClick={this.startDemoRace}>
                        <h4>Day {this.props.day} - Race {this.props.currentRace + 1}</h4>
                        <button onClick={this.startDemoRace}>
                            Start Race {this.props.currentRace + 1}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    startDemoRace() {
        const racers = [];
        racers.push(new RaceEntrant('16', 'Oh Hi Mark', {weight: 2}, {radius: 1}, {name: 'Roll Fizzlebeef'}));
        racers.push(new RaceEntrant('69', 'Lemon Soiree', {weight: 2}, {radius: 2}, {name: 'Stump Chunkman'}));
        racers.push(new RaceEntrant('420', '2 Butts 1 Seat', {weight: 2}, {radius: 3}, {name: 'Bob Johnson'}));
        racers.push(new RaceEntrant('00', 'My Staircase', {weight: 2}, {radius: 4}, {name: 'Crunch Buttsteak'}));

        const event = new StartRaceEvent()
                        .setLength(30)
                        .addEntrant(racers[0])
                        .addEntrant(racers[1])
                        .addEntrant(racers[2])
                        .addEntrant(racers[3])
                        .dispatch();
    }
}

const mapStateToProps = state => {
    return {
        day: state.day,
        dailyRaces: state.dailyRaces,
        currentRace: state.currentRace
    }
}

const mapDispatchToProps = {
    setCurrentDay,
    setCurrentDailyRace,
    addDailyRace
}

export default connect(mapStateToProps, mapDispatchToProps)(GameLoop);