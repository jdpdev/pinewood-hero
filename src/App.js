import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {createGameStore} from './store/index';

import GameLoop from "./components/GameLoop";

const store = createGameStore();

export class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <GameLoop />
                </Provider>
            </div>
        )
    }
}

const Root = document.getElementById("root");

ReactDOM.render(<App />, Root);