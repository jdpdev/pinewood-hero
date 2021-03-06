import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

import './style/DailyRaceList.scss'

function DailyRaceList({day, dailyRaces, currentRace}) {
    return (
        <div className='daily-race-list'>
            <h4>Day {day} - Scheduled Races</h4>
            <div className='race-details'>
                <div className='racer-row header'>
                    <div className='race-number' />
                    <div className='racer-icon' />
                    <div className='racer-number'>
                        #
                    </div>
                    <div className='racer-odds'>
                        Odds
                    </div>
                    <div className='racer-name'>
                        Name
                    </div>
                </div>
            </div>
            {
                dailyRaces.map((race, index) => (
                    <RaceItem
                        race={race}
                        index={index}
                        currentRace={currentRace}
                        key={index}
                    />
                ))
            }
        </div>
    )
}

const mapStateToProps = state => ({
    day: state.day,
    dailyRaces: state.dailyRaces,
    currentRace: state.currentRace
})

export default connect(mapStateToProps)(DailyRaceList);

function RaceItem({race, index, currentRace}) {
    const classes = classnames(
        'race-list-item',
        {
            'is-past': index < currentRace,
            'is-current': index === currentRace,
            'is-next': index === currentRace + 1
        }
    )

    return (
        <div className={classes}>
            <div className='race-number'>
                {index + 1}
            </div>
            <div className='race-details'>
                {
                    index >= currentRace ?
                    <PendingRace race={race} /> :
                    <CompletedRace race={race} />
                }
            </div>
        </div>
    )
}

function PendingRace({race}) {
    return (
        <div className='pending-race'>
            {
                race.racers.map(racer => (
                    <div key={racer.name} className='racer-row'>
                        <div className='racer-icon' />
                        <div className='racer-number'>
                            {racer.number}
                        </div>
                        <div className='racer-odds'>
                            1-1
                        </div>
                        <div className='racer-name'>
                            {racer.name}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

function CompletedRace({race}) {
    return (
        <div className='completed-race'>
            <div className='racer-row'>
                <div className='racer-icon'>
                    <FontAwesomeIcon icon={faTrophy} />
                </div>
                <div className='racer-number'>
                    {race.winner.number}
                </div>
                <div className='racer-odds'>
                    1-1
                </div>
                <div className='racer-name'>
                    {race.winner.name}
                </div>
            </div>
        </div>
    )
}