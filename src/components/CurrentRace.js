import React, { useEffect } from "react";
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faMedal, faAward } from '@fortawesome/free-solid-svg-icons'

import { InRaceState, loadRace } from "../store/actions/inRaceActions";

import './style/CurrentRace.scss'
import { nextDailyRace, startNextDay } from "../store/actions/dailyRaceActions";

function CurrentRace({day, dailyRaces, currentRace, currentRaceState, raceRunningOrder, loadedRace, loadRace, nextDailyRace, startNextDay}) {
    if (loadedRace == null) {
        return <div className='current-race-container' />
    }

    const gotoNextDay = dailyRaces.length - 1 === currentRace;

    return (
        <div className='current-race-container'>
            <div className='header'>
                <h4>
                { currentRaceState === InRaceState.Finished && 'Final Results - ' }
                    Race {loadedRace.dailyNumber}
                </h4>
                {
                    currentRaceState === InRaceState.Loaded && 
                    <button onClick={() => loadRace(loadedRace)}>
                        Start Race
                    </button>
                }
            </div>
            
            {
                currentRaceState === InRaceState.Loaded && 
                <NextRaceDisplay 
                    loadedRace={loadedRace}
                />
            }
            {
                (currentRaceState === InRaceState.Running || currentRaceState === InRaceState.Finished) &&
                <RaceStandings 
                    race={loadedRace}
                    raceRunningOrder={raceRunningOrder} 
                />
            }
            {
                currentRaceState === InRaceState.Finished &&
                gotoNextDay &&
                <button onClick={() => startNextDay()}>
                    Next Day
                </button>
            }
            {
                currentRaceState === InRaceState.Finished &&
                !gotoNextDay &&
                <button onClick={() => nextDailyRace()}>
                    Next Race
                </button>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    day: state.day,
    dailyRaces: state.dailyRaces,
    loadedRace: state.loadedRace,
    currentRace: state.currentRace,
    currentRaceState: state.currentRaceState,
    raceRunningOrder: state.raceRunningOrder
});

export default connect(mapStateToProps, {loadRace, nextDailyRace, startNextDay})(CurrentRace);

function NextRaceDisplay({loadedRace}) {
    return (
        <div className='next-race-display'>
            <RaceEntryHeader isFinished={false} />
            {
                loadedRace.racers.map((racer, index) => (
                    <RaceEntryRow
                        key={index}
                        lane={index + 1}
                        racer={racer}
                    />
                ))
            }
        </div>
    )
}

function RaceStandings({raceRunningOrder, race}) {
    return (
        <div className='race-running-display'>
            <RaceEntryHeader 
                isFinished={raceRunningOrder && raceRunningOrder[0].isFinished} 
            />
            {
                raceRunningOrder && raceRunningOrder.map((runner, index) => (
                    <RaceEntryRow
                        key={index}
                        lane={getRacerLane(runner.racer, race)}
                        racer={runner.racer}
                        result={runner}
                    />
                ))
            }
        </div>
    )
}

function RaceEntryHeader({isFinished}) {
    return (
        <div className='race-entry-row'>
            <div className='icon'></div>
            <div className='lane'>
                Lane
            </div>
            <div className='number'>
                #
            </div>
            <div className='name'>
                Name
            </div>
            <div className='finish-time'>
                {isFinished && 'Time'}
            </div>
        </div>
    )
}

function RaceEntryRow({lane, racer, result}) {
    return (
        <div className='race-entry-row'>
            <div className='icon'>
                {
                    result && result.isFinished && <ResultIcon result={result} />
                }
            </div>
            <div className='lane'>
                {lane}
            </div>
            <div className='number'>
                {racer.number}
            </div>
            <div className='name'>
                {racer.name}
            </div>
            <div className='finish-time'>
                {result && result.isFinished && formatFinishTime(result.finishTime)}
            </div>
        </div>
    )
}

function formatFinishTime(time) {
    const seconds = time / 1000;
    const mils = Math.floor((seconds % 1) * 1000);

    return `${Math.floor(seconds)}.${mils}`
}

function ResultIcon({result}) {
    if (!result.isFinished) {
        return null;
    }

    switch (result.finishPlace) {
        case 1:
            return <FontAwesomeIcon icon={faTrophy} className='icon-win' />
        
        case 2:
            return <FontAwesomeIcon icon={faMedal} className='icon-place' />
        
        case 3:
            return <FontAwesomeIcon icon={faAward} className='icon-show' />

        default: return null;
    }
}

function getRacerLane(racer, race) {
    const lane = race.racers.findIndex(lane => lane.id === racer.id);
    return lane + 1;
}