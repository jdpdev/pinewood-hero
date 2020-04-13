import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';

import GameLoop from "./components/GameLoop";
import { PhaserComponent } from "./components/Phaser";

export class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <GameLoop />
                    <PhaserComponent />
                </Provider>
            </div>
        )
    }
}

const Root = document.getElementById("root");

ReactDOM.render(<App />, Root);