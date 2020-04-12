import Phaser from 'phaser'

const TILE_WIDTH = 100;
const TILE_HEIGHT = 50;
const X_STEP = TILE_WIDTH / 2;
const Y_STEP = TILE_HEIGHT / 2;
const H_STEP = 25;

export class RaceWorld extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
    }

    placeTile(sprite, x, y, height) {
        const tileX = (x - y) * X_STEP;
        const tileY = ((x + y) * Y_STEP) - (height * H_STEP);
        const tile = this.scene.add.image(tileX, tileY, sprite);

        tile.setDisplaySize(TILE_WIDTH, TILE_WIDTH);

        return tile;
    }
}