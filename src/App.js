import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {store} from './store/index';
import GameLoop from "./components/GameLoop";


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