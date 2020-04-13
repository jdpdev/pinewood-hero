import Phaser from 'phaser'
import { RaceScene, RACE_SCENE } from '../race/RaceScene';
import { StartRaceEvent, START_RACE_EVENT } from '../../events/StartRaceEvent';
import { registerListener, removeListener } from '../../events/core';

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super('loading-scene')
    }

    create() {
        const callback = (event) => this.scene.start(RACE_SCENE, event);
        registerListener(START_RACE_EVENT, callback);
    }
}