import Phaser from 'phaser'
import Track from './components/Track';
import { RaceManager } from './components/RaceManager';

export const RACE_SCENE = 'ready-set-race';

export class RaceScene extends Phaser.Scene {
    constructor() {
        super({
            key: RACE_SCENE,
            cameras: {
                name: 'main',
                x: 0,
                y: 0,
                scrollX: 0,
                scrollY: 0
            }
        });
    }

    preload() {
        this.load.image('car', 'images/Car.png');
        this.load.image('car-shadow', 'images/car-shadow.png');
        this.load.image('track', 'images/track.png');
        this.load.image('flat', 'images/flat.png');
        this.load.image('launch-zone', 'images/launch-zone.png');
        this.load.image('finish-zone', 'images/finish-zone.png');
    }

    create() {
        this.world = this.add.raceWorld();

        this.track = new Track(this.world);
        const target = this.track.build(4, 40);

        const camera = this.cameras.main;
        const scroll = camera.getScroll(target.x, target.y);
        camera.setScroll(scroll.x, scroll.y);

        this.manager = new RaceManager(this.world, camera, this.track);
        this.manager.build(4);
    }

    update(time, delta) {
        this.manager.update(delta);    
    }
}