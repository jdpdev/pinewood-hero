import Phaser from 'phaser'
import { RaceScene, RACE_SCENE } from '../race/RaceScene.ts';
import { StartRaceEvent, START_RACE_EVENT } from '../../events/StartRaceEvent';
import { registerListener, removeListener } from '../../events/core';
import { store } from '../../store';
import { Scenes } from '../sceneTypes';

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super(Scenes.Loading)
    }

    init() {
        console.log('[Loading Scene] init')
    }

    create() {
        const callback = (event) => this.scene.start(Scenes.Race, event);
        registerListener(START_RACE_EVENT, callback);
    }
}