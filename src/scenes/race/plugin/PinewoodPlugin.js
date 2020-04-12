import Phaser from 'phaser'
import { RaceWorld } from '../components/RaceWorld';

export class PinewoodPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        pluginManager.registerGameObject('raceWorld', this.createWorld);
    }

    createWorld() {
        return this.displayList.add(new RaceWorld(this.scene));
    }
}