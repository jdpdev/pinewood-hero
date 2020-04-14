import Phaser from 'phaser'

const TILE_WIDTH = 100;
const TILE_HEIGHT = 50;
const X_STEP = TILE_WIDTH / 2;
const Y_STEP = TILE_HEIGHT / 2;
const H_STEP = 25;

const distanceMarkerStyle = {
    fontFamily: '"Noto Sans", Futura, sans-serif',
    color: '#aaa',
    align: 'right',
    fixedWidth: 30
}

export class RaceWorld extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
    }

    placeTile(sprite, tileX, tileY, height) {
        const {x, y} = this.getRealCoordinate(tileX, tileY, height);
        const tile = this.scene.add.image(x, y, sprite);

        tile.setDisplaySize(TILE_WIDTH, TILE_WIDTH);

        return tile;
    }

    placeDistanceMarker(label, tileX, tileY, height) {
        const {x, y} = this.getRealCoordinate(tileX, tileY, height);
        const text = this.scene.add.text(x - 30, y - 10, label, distanceMarkerStyle);
        text.angle = -30;

        return text;
    }

    getRealCoordinate(tileX, tileY, height) {
        const x = (tileX - tileY) * X_STEP;
        const y = ((tileX + tileY) * Y_STEP) - (height * H_STEP);

        return {x , y};
    }
}