import Phaser from 'phaser'
import Track from './components/Track';
// @ts-ignore
import { RaceManager } from './components/RaceManager.ts';
import { StartRaceEvent, START_RACE_EVENT } from '../../events/StartRaceEvent';
import { RaceWorld } from './components/RaceWorld';
import { DailyRace } from '../../game/data/DailyRace';
import { registerListener } from '../../events/core';
import { NEXT_RACE_EVENT } from '../../events/NextRaceEvent';
import { Scenes } from '../sceneTypes';

export class RaceScene extends Phaser.Scene {
    private world: RaceWorld;
    private track: Track;
    private manager: RaceManager;
    private race: DailyRace;

    constructor() {
        super({
            key: Scenes.Race,
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
        this.load.image('thinnies', 'images/thinnies.png');
        this.load.image('chonkers', 'images/chonkers.png');
        this.load.image('disco', 'images/disco.png');
        this.load.image('rolleroos', 'images/rolleroos.png');
    }

    create() {
        const callback = () => this.scene.start(Scenes.Loading);
        registerListener(NEXT_RACE_EVENT, callback);

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