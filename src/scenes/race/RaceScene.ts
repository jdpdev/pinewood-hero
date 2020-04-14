import Phaser from 'phaser'
import Track from './components/Track';
import { RaceManager } from './components/RaceManager.ts';
import { StartRaceEvent } from '../../events/StartRaceEvent';
import { RaceWorld } from './components/RaceWorld';
import { DailyRace } from '../../game/data/DailyRace';

export const RACE_SCENE = 'ready-set-race';

export class RaceScene extends Phaser.Scene {
    private world: RaceWorld;
    private track: Track;
    private manager: RaceManager;
    private race: DailyRace;

    constructor() {
        super({
            key: RACE_SCENE,
            cameras: {
                name: 'main',
                x: 0,
                y: 0,
                scrollX: 0,
                scrollY: 0,
                width: 600,
                height: 400,
                zoom: 1,
                rotation: 0,
                backgroundColor: '#000',
                roundPixels: false
            }
        });
    }

    /**
     * 
     * @param {StartRaceEvent} event 
     */
    init(event: StartRaceEvent) {
        console.log('[RaceScene] init')
        this.race = event.race;
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
        //@ts-ignore
        this.world = this.add.raceWorld();

        this.track = new Track(this.world);
        const target = this.track.build(this.race.racers.length, this.race.length);

        const camera = this.cameras.main;
        const scroll = camera.getScroll(target.x, target.y);
        camera.setScroll(scroll.x, scroll.y);

        this.manager = new RaceManager(this.world, camera, this.track);
        this.manager.build(this.race.racers);
    }

    update(time, delta) {
        this.manager.update(delta);    
    }
}