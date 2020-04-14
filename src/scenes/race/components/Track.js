import Phaser from 'phaser'
import WorldObject from './WorldObject';

export default class Track {
    constructor(world) {
        this.world = world;    
        this.tiles = [];
    }

    build(lanes, length) {
        this.lanes = lanes;
        this.length = length;
        const extendLength = length + 10;

        for (let x = 0; x < extendLength; x++) {
            this.tiles.push([]);
        }

        // track tiles
        for (let x = 0; x < extendLength; x++) {
            for (let y = 0; y < lanes; y++) {
                const tile = this.getTrackTile(x, y, length);
                const height = Math.max(length - x, 1);
                this.tiles[x].push(this.world.placeTile(tile, x, y, height));
            }  
        }

        // distance markers
        for (let x = 4; x < length; x += 5) {
            this.world.placeDistanceMarker(x + 1, x, lanes, length - x);
        }

        this._winningDistance = (this.length - 2) * (709.94 * this.tiles[0][0].scaleX);
        this._endDistance = (this.length - 1) * (709.94 * this.tiles[0][0].scaleX);

        // return position to center on
        if (lanes % 2) {
            const tile = this.tiles[0][Math.ceil(lanes / 2)];
            return {x: tile.x, y: tile.y};
        } else {
            const tileA = this.tiles[0][lanes / 2];
            const tileB = this.tiles[0][lanes / 2 - 1];
            return {x: (tileA.x + tileB.x) / 2, y: (tileA.y + tileB.y) / 2}
        }
    }

    getTrackTile(x, y, length) {
        if (x === 0) {
            return 'launch-zone';
        } else if (x === length - 1) {
            return 'finish-zone';
        } else if (x >= length) {
            return 'flat';
        } else {
            return 'track';
        }
    }

    get winningDistance() {
        return this._winningDistance;
    }

    get endDistance() {
        return this._endDistance;
    }
}