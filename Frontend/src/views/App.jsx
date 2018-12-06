import React from "react";

import {history} from "variables/history.jsx";
import {charts} from "variables/charts.jsx";
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import {getCurrentDate} from "../utils/Utils";
import MainPage from "./MainPage/MainPage";
import ChartsPage from "./ChartsPage/ChartsPage";
import HistoryPage from "./HistoryPage/HistoryPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import LandingPage from "./LandingPage/LandingPage";
import {DESPESA, RECEITA} from "../variables/history";
import {
    categoriesOnTimeIntervalChartTemplate,
    categoryThroughTimeChartTemplate,
    distinctTimeIntervalChartTemplate,
    progressThroughTimeChartTemplate
} from "../variables/charts";
import withStyles from "@material-ui/core/styles/withStyles";

const EMPTY_USER = {info: {firstName: "", lastName: "", email:"", password: ""}, image: null};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: EMPTY_USER,
            userHistory: history,
            charts: charts,
            mainChart: charts[0],
        };
    }

    onUserLogout = () => {
        this.setState({currentUser: EMPTY_USER});
    };

    onUserUpdate = (user) => {
        this.setState({currentUser: user});
    };

    addHistory = (type, icon, category, amount, message, description) => {
        this.state.userHistory.unshift({
            id: this.state.userHistory.length+1,
            type: type,
            icon: icon,
            category: category,
            amount: amount,
            message: message,
            date: new Date(),
            description: description
        });
        this.setState({userHistory: this.state.userHistory});
        if (type === DESPESA) {
            this.setState({spentValue: parseFloat((this.state.spentValue + amount).toFixed(2))});
        } else if (type === RECEITA) {
            this.setState({earnedValue: parseFloat((this.state.earnedValue + amount).toFixed(2))});
        }
    };

    updateHistory = (userHistory) => {
        this.setState({userHistory: userHistory});
    };

    generateNewProgressThroughTimeChart = (title, categoryType, initialDate, finalDate, dataAggregation) => {
        return progressThroughTimeChartTemplate(title, categoryType, initialDate, finalDate, dataAggregation);
    };

    generateNewDistinctTimeIntervalChart = (title, categoryType, firstInitialDate, firstFinalDate,
                                            secondInitialDate, secondFinalDate, dataAggregation) => {
        return distinctTimeIntervalChartTemplate(title, categoryType,
            firstInitialDate, firstFinalDate,
            secondInitialDate, secondFinalDate,
            dataAggregation);
    };

    generateNewCategoriesOnTimeIntervalChart = (title, categoryType, initialDate, finalDate, dataAggregation) => {
        return categoriesOnTimeIntervalChartTemplate(title, categoryType, initialDate, finalDate, dataAggregation);
    };

    generateNewCategoryThroughTimeChart = (title, categoryType, category, initialDate, finalDate, dataAggregation) => {
        return categoryThroughTimeChartTemplate(title, categoryType, category, initialDate, finalDate, dataAggregation);
    };

    generateNewChart = (title, chartType, categoryType, category,
                        firstInitialDate, firstFinalDate,
                        secondInitialDate, secondFinalDate,
                        dataAggregation) => {
        let chart;
        if (chartType === "Receita ao longo do tempo" || chartType === "Despesa ao longo do tempo") {
            chart = this.generateNewProgressThroughTimeChart(title, categoryType, firstInitialDate, firstFinalDate, dataAggregation);
        } else if (chartType === "Comparação em intervalos de tempo distintos") {
            chart = this.generateNewDistinctTimeIntervalChart(title, categoryType, firstInitialDate, firstFinalDate,
                secondInitialDate, secondFinalDate, dataAggregation);
        } else if (chartType === "Comparação de categorias num intervalo de tempo") {
            chart = this.generateNewCategoriesOnTimeIntervalChart(title, categoryType, firstInitialDate, firstFinalDate, dataAggregation);
        } else if (chartType === "Uma categoria ao longo do tempo") {
            chart = this.generateNewCategoryThroughTimeChart(title, categoryType, category, firstInitialDate, firstFinalDate, dataAggregation);
        }
        return chart;
    };

    addChart = (title, chartType, categoryType, category,
                firstInitialDate, firstFinalDate,
                secondInitialDate, secondFinalDate,
                dataAggregation) => {
        let newChart = this.generateNewChart(title, chartType, categoryType, category,
            firstInitialDate, firstFinalDate,
            secondInitialDate, secondFinalDate,
            dataAggregation);
        this.setState(state => ({charts: [{id: state.charts.length+1, ...newChart}, ...state.charts]}));
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.wrapper}>
                <div className={classes.main}>
                    <BrowserRouter basename={"/savr"}>
                        <Switch>
                            <Route path={"/mainPage"} render={routerProps =>
                                <MainPage {...routerProps}
                                          user={this.state.currentUser}
                                          onUserLogout={this.onUserLogout}
                                          chart={this.state.mainChart}
                                          userHistory={this.state.userHistory}
                                          onAddHistory={this.addHistory}/>}/>
                            <Route path={"/chartsPage"} render={routerProps =>
                                <ChartsPage {...routerProps}
                                            user={this.state.currentUser}
                                            onUserLogout={this.onUserLogout}
                                            charts={this.state.charts}
                                            onAddChart={this.addChart}/>}/>
                            <Route path={"/historyPage"} render={routerProps =>
                                <HistoryPage {...routerProps}
                                             user={this.state.currentUser}
                                             onUserLogout={this.onUserLogout}
                                             userHistory={this.state.userHistory}
                                             onUpdateHistory={this.updateHistory}/>}/>
                            <Route path={"/profilePage"} render={routerProps =>
                                <ProfilePage {...routerProps}
                                             user={this.state.currentUser}
                                             onUserLogout={this.onUserLogout}
                                             onUserUpdate={this.onUserUpdate}/>}/>
                            <Route exact path={"/"} render={routerProps =>
                                <LandingPage {...routerProps}
                                             onUserLogin={this.onUserUpdate}/>}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

const style = {
    wrapper: {
        position: "relative",
        top: "0",
        height: "100vh"
    },
    main: {
        zIndex: 75,
        overflow: "auto",
        position: "relative",
        maxHeight: "100%",
        width: "100%",
        overflowScrolling: "touch"
    },
};

export default withStyles(style)(App);

