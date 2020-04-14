import Phaser from 'phaser'
import React, { Component } from 'react';
import { LoadingScene } from '../scenes/loading/LoadingScene';
import { RaceScene } from '../scenes/race/RaceScene.ts';
import { PinewoodPlugin } from '../scenes/race/plugin/PinewoodPlugin';

const GAME_WIDTH = 500;
const GAME_HEIGHT = 400;

export class PhaserComponent extends Component {
    componentDidMount() {
        const config = {
          type: Phaser.AUTO,
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          parent: 'phaser-game',
          scene: [LoadingScene, RaceScene],
          plugins: {
              global: [
                  { key: 'PinewoodPlugin', plugin: PinewoodPlugin, start: true }
              ]
          }
        }
    
        new Phaser.Game(config)
    }
    
    shouldComponentUpdate() {
        return false;
    }
    
    render() {
        return <div id="phaser-game" />
    }
}