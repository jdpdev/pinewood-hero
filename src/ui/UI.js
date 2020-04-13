import React, { Component } from "react";
import { StartRaceEvent, RaceEntrant } from "../events/StartRaceEvent";

export class UIComponent extends Component {
    render() {
        return <div onClick={this.startDemoRace}><h3>Start Race</h3></div>
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