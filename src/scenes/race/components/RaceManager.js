import { Car } from "./Car";

export const RaceState = {
    Formation: 1,
    Countdown: 2,
    Race: 3,
    Finish: 4
}

export class RaceManager {
    constructor(world, camera, track) {
        this.world = world;
        this.camera = camera;
        this.track = track;

        this.state = RaceState.Formation;
        this.cars = [];
    }

    build(cars) {
        for (let i = 0; i < cars; i++) {
            const car = new Car(this.track, this.world, i);
            this.cars.push(car);
        }
    }

    update(delta) {
        switch (this.state) {
            case RaceState.Formation:
                this.state = RaceState.Race;
                break;

            case RaceState.Race:
                this.cars.forEach(car => car.update(delta, this.state));

                const leader = this.getLeader();
                const increment = leader.speed * delta;
                this.camera.setScroll(this.camera.scrollX + increment, this.camera.scrollY + increment);

                const finishers = this.checkForFinish();

                if (finishers) {
                    this.state = RaceState.Finish;
                }
                break;

            case RaceState.Finish:
                this.cars.forEach(car => car.update(delta, this.state));
                break;
        }
    }

    checkForFinish() {
        const distance = this.track.winningDistance;
        let leader = this.cars[0];
        const finishers = this.cars.filter(car => {
            if (car.distanceTraveled > leader.distanceTraveled) {
                leader = car;
            }

            return car.distanceTraveled >= distance;
        });

        if (finishers.length > 0) {
            return finishers;
        } else {
            return null;
        }
    }

    getLeader() {
        let leader = this.cars[0];

        this.cars.forEach(car => {
            if (car.distanceTraveled > leader.distanceTraveled) {
                leader = car;
            }
        })

        return leader;
    }
}