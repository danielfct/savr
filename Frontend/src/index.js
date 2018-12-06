import React from "react";
import ReactDOM from "react-dom";
import {Route, Router, Switch, withRouter} from "react-router-dom";
import "assets/scss/savr.css?v=1.3.0";
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import App from "./views/App";
import { Provider } from 'react-redux'
import {createBrowserHistory} from "history";
import MainPage from "./views/MainPage/MainPage";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {main: '#1b5e20'},
        secondary: {main: '#b71c1c'},
        textPrimary: {main: '#ffffff'}
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <App/>
        </MuiPickersUtilsProvider>
    </MuiThemeProvider>,
    document.getElementById("root")
);
