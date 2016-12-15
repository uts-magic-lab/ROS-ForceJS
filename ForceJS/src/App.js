import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar.jsx'
import ControllerContainer from './ControllerContainer.jsx'
import {TileAdderHandler} from './TileAdderHandler.jsx'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TileSettingsDialog from './TileSettings'

class App extends Component {

    tileAdder = new TileAdderHandler(this, 80)

    exportController = () => {
        console.log("Exporting")
        let jsonArray = []
        for (let instance of this.state.tileInstances) {
            jsonArray.push(instance.exported())
        }
        console.log("\n\n\n Exported:")
        console.log(jsonArray)

        // TODO: Don't hardcode the dimensions of the controller
        let exportDict = {
            dimensions:{
                width:1280,
                height:720
            },
            tiles:jsonArray
        }

        /*
        var file = new File("/tmp/exportedController.json","write")
        let str = JSON.stringify(exportDict)
        file.writeln(str)
        file.close()
        */
        var str = JSON.stringify(exportDict)
        var dataStr = "data:application/octet-stream;charset=utf-8," + encodeURIComponent(str);
        window.open(dataStr)
    }

    addTileInstance = (instance) => {
        this.state.tileInstances.push(instance)
    }

    addTile = function (tileToAdd, tileInstance) {
        /* TODO:
         -[ ] Show the TileSettingsDialog here, use a state change and pass a show:Bool and a params:Dict
         -[ ] On the save button click, get the data and set it to the tile
         -[ ] Add a delete tile button to the TSDialog
         */
        this.state.tiles.push(tileToAdd)
        this.forceUpdate()
    }

    printLine = () => {
        console.log("--------------------")
    }

    showSettingsDialog = (settingsDialog) => {
        this.setState({
            settingsDialog: settingsDialog,
        })
        this.forceUpdate()
    }

    settingsDialog = () => {
        if (this.state.settingsDialog !== null) {
            return this.state.settingsDialog
        }
    }

    removeCurrentSettingsDialog = () => {
        this.setState({
            settingsDialog: null
        })
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    constructor(props) {
        super(props);
        this.state = {
            tiles: [],
            tileInstances: [],
            settingsDialog: null,
        }
    }

    render() {
        return (
            <div className="App">
                <NavBar pointers={{
                    app: this,
                    tileAdderHandler: this.tileAdder
                }} />
                <ControllerContainer adderHandler={this.tileAdder} tiles={this.state.tiles} />
                {this.settingsDialog()}
            </div>
        );
    }
}

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default App;
