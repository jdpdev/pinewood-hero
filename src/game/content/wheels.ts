import { Wheels } from "../data/Wheels";

export const WheelList = new Map<string, Wheels>();

WheelList.set(
    'thinnies',
    new Wheels(
        'Thinnies', 0, 1, 'thinnies', 'Some really tiny, thin wheels.'
    )
);

WheelList.set(
    'rolleroos',
    new Wheels('RolleRoos', 0, 2, 'rolleroos', 'Small wheels made for roll roll rollin\'.')
);

WheelList.set(
    'disco',
    new Wheels('DiscoRoto', 0, 3, 'disco', 'Ah ah ah ah, rollin\' around, rollin\' around.')
);

WheelList.set(
    'chonkers',
    new Wheels('Chonkers', 0, 4, 'chonkers', 'As tall as an elephant\'s eye.')
);