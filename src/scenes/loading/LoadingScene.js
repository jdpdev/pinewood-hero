import Phaser from 'phaser'
import { RaceScene, RACE_SCENE } from '../race/RaceScene';

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super('loading-scene')
    }

    preload() {

    }

    create() {
        this.scene.start(RACE_SCENE);
    }
}