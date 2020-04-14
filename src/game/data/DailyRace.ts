import { Racer } from "./Racer";

export class DailyRace {
    private _winner: Racer;
    private _id: string;

    constructor(
        private _racers: Racer[],
        private _length: number,
        private _dailyNumber: number
    ) {
        this._id = Phaser.Math.RND.uuid();
    }

    get id() {
        return this._id;
    }

    get racers() {
        return this._racers;
    }

    get length() {
        return this._length;
    }

    get winner() {
        return this._winner;
    }

    set winner(winner: Racer) {
        this._winner = winner;
    }

    get dailyNumber() {
        return this._dailyNumber;
    }
}