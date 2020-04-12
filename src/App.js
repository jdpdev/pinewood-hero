import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { UIComponent } from "./ui/UI";
import { PhaserComponent } from "./ui/Phaser";

export class App extends Component {
    render() {
        return (<div>
            <UIComponent />
            <PhaserComponent />
        </div>)
    }
}

const Root = document.getElementById("root");

ReactDOM.render(<App />, Root);