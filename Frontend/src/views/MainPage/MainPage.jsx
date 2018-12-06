import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "../../components/Header/Header";
import SavrHeaderLinks from "../../components/Header/SavrHeaderLinks";
import Paper from "@material-ui/core/Paper/Paper";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Footer from "../../components/Footer/Footer";
import classNames from "classnames";

import {History} from "@material-ui/icons";
import SvgBulb from "../../assets/icons/svgBulb.jsx";

import HistorySection from "./sections/HistorySection";
import SuggestionSection from "./sections/SuggestionSection";
import InfoSection from "./sections/InfoSection";
import ChartSection from "./sections/ChartSection";

import {Scrollbars} from 'react-custom-scrollbars';
import Divider from "@material-ui/core/Divider/Divider";
import {earnedCategories, spentCategories} from "variables/categories.jsx";
import {getCurrentDate} from "../../utils/Utils";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Fade from "@material-ui/core/Fade/Fade";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import MySnackbarContent from "../../components/Snackbar/MySnackBarContent";
import {container, title} from "assets/jss/savr.jsx";
import LoadingBar from 'react-redux-loading-bar'
import {Redirect} from "react-router-dom";
import {DESPESA, RECEITA} from "../../variables/history";

class MainPage extends React.Component {
    state = {
        newGain: false,
        newSpending: false,
    };

    onAddGain = (amount, category, description) => {
        let icon = earnedCategories.get(category).icon;
        this.props.onAddHistory(RECEITA, icon, category, amount, amount + " € recebidos", description);
        this.setState({newGain: true});
    };

    onAddSpending = (amount, category, description) => {
        let icon = spentCategories.get(category).icon;
        this.props.onAddHistory(DESPESA, icon, category, amount, amount + " € gastos", description);
        this.setState({newSpending: true});
    };

    handleClose = (event, reason) => {
        this.setState({newGain: false});
        this.setState({newSpending: false});
    };

    calculateAmounts = (userHistory) => {
        let totalGain = 0;
        let totalSpent = 0;
        userHistory.forEach(e => {
            if (e.type === RECEITA) {
                totalGain += e.amount;
            } else if (e.type === DESPESA) {
                totalSpent += e.amount;
            } else {
                console.error("History entry " + e + " has unexpected type")
            }
        });
        return {earnedValue: totalGain, spentValue: totalSpent};
    };

    render() {
        const {classes, user, onUserLogout, userHistory, chart, ...rest} = this.props;
        const {earnedValue, spentValue} = this.calculateAmounts(userHistory);
        return (
            <div>
                {this.state.newGain &&
                <Snackbar
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    open={true}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    TransitionComponent={Fade}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>,
                    ]}>
                    <MySnackbarContent
                        onClose={this.handleClose}
                        variant="success"
                        message={"Receita adicionada com sucesso."}/>
                </Snackbar>}

                {this.state.newSpending &&
                <Snackbar
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    open={true}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    TransitionComponent={Fade}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>,
                    ]}>
                    <MySnackbarContent
                        onClose={this.handleClose}
                        variant="success"
                        message={"Despesa adicionada com sucesso."}/>
                </Snackbar>}
                <Header
                    dark
                    fixed
                    href
                    user={user}
                    rightLinks={<SavrHeaderLinks {...rest} current={this.props.location.pathname} user={user} onUserLogout={onUserLogout}/>}
                    {...rest}
                >
                    <LoadingBar/>
                </Header>
                <div className={classes.content}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem xs={8} sm={8} md={8}>
                                <Paper className={classes.paper}>
                                    <InfoSection
                                        onAddGain={this.onAddGain}
                                        onAddSpending={this.onAddSpending}
                                        earnedValue={earnedValue}
                                        spentValue={spentValue}/>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <ChartSection chart={chart}/>
                                </Paper>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <Paper className={classNames(classes.paper, classes.history)}>
                                    <Scrollbars>
                                        <div className={classes.paperTitle}>
                                            <History className={classes.icon}/>
                                            <Typography variant={"subtitle1"}>
                                                Histórico
                                            </Typography>
                                        </div>
                                        <Divider color={"white"}/>
                                        <HistorySection {...rest} userHistory={userHistory}/>
                                    </Scrollbars>
                                </Paper>
                                <Paper className={classNames(classes.paper, classes.suggestion)}>
                                    <Scrollbars>
                                        <div className={classes.paperTitle}>
                                            <SvgBulb className={classes.icon}/>
                                            <Typography variant={"subtitle2"}>
                                                Sugestões
                                            </Typography>
                                        </div>
                                        <Divider/>
                                        <SuggestionSection/>
                                    </Scrollbars>
                                </Paper>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}


const mainPageStyle = {
    container: {
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        ...container
    },
    content: {
        marginTop: "70px",
        padding: "30px 15px"
    },
    title: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        color: "#FFFFFF",
        textDecoration: "none"
    },
    subtitle: {
        fontSize: "1.313rem",
        maxWidth: "500px",
        margin: "10px auto 0"
    },
    button: {
        margin: "20px"
    },
    gridContainer: {
        margin: "20px"
    },
    paper: {
        marginBottom: "20px",
        overflow: "hidden"
    },
    paperTitle: {
        display: "inline-flex",
        margin: "20px",
    },
    icon: {
        marginRight: "10px",
        color: "#888888"
    },
    history: {
        height: "325px",
        width: "100%"
    },
    suggestion: {
        height: "235px",
        width: "100%"
    }
};

export default withStyles(mainPageStyle)(MainPage);
