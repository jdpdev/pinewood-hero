import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';

import { UIComponent } from "./ui/UI";
import { PhaserComponent } from "./ui/Phaser";

export class App extends Component {
    render() {
        return (<div>
            <Provider store={store}>
                <UIComponent />
                <PhaserComponent />
            </Provider>
        </div>)
    }
}

const Root = document.getElementById("root");

ReactDOM.render(<App />, Root);