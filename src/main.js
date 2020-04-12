import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import { PinewoodPlugin } from './scenes/race/plugin/PinewoodPlugin'
import { RaceScene } from './scenes/race/RaceScene'
import { LoadingScene } from './scenes/loading/LoadingScene'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [LoadingScene, RaceScene],
	plugins: {
        global: [
            { key: 'PinewoodPlugin', plugin: PinewoodPlugin, start: true }
        ]
    },
}

export default new Phaser.Game(config)
