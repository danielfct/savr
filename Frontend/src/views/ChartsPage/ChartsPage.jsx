import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import AccessTime from "@material-ui/icons/AccessTime";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";

import NewChartDialog from "./NewChartDialog";

import SavrHeaderLinks from "../../components/Header/SavrHeaderLinks";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CardBody from "../../components/Card/CardBody";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import CanvasJSReact from "../../utils/canvasjs.react";
import classNames from "classnames";
import { successColor, container, title } from "assets/jss/savr.jsx";
import ViewChartDialog from "./ViewChartDialog";
import {Fullscreen} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import Grid from "@material-ui/core/Grid/Grid";

class ChartsPage extends React.Component {
    state = {
        newChartDialog: false,
        openChart: null,
    };

    handleNewChartOpen = () => {
        this.setState({newChartDialog: true});
    };

    handleNewChartCancel = () => {
        this.setState({newChartDialog: false});
    };

    handleNewChartConfirm = (title, chartType, categoryType, category,
                             firstInitialDate, firstFinalDate,
                             secondInitialDate, secondFinalDate) => {
        this.setState({newChartDialog: false});
        this.props.onAddChart(title, chartType, categoryType, category,
            firstInitialDate, firstFinalDate,
            secondInitialDate, secondFinalDate)
    };

    handleViewChartOpen = (index) => {
        this.setState({openChart: this.props.charts[index]});
    };

    handleViewChartClose = () => {
        this.setState({openChart: null});
    }

    render() {
        const {classes, user, onUserLogout, charts, onAddChart, ...rest} = this.props;
        const CanvasJSChart = CanvasJSReact.CanvasJSChart;
        return (
            <div>
                <Header
                    dark
                    fixed
                    href
                    user={user}
                    rightLinks={<SavrHeaderLinks {...rest} current={this.props.location.pathname} user={user} onUserLogout={onUserLogout}/>}
                    {...rest}
                />
                <div className={classes.content}>
                    <div className={classes.container}>
                        <Paper>
                            {this.state.newChartDialog &&
                            <NewChartDialog handleCancel={this.handleNewChartCancel}
                                            handleConfirm={this.handleNewChartConfirm}/>}
                            <ViewChartDialog open={this.state.openChart != null}
                                             chart={this.state.openChart}
                                             handleClose={this.handleViewChartClose}/>
                            <div className={classes.chartsContainer}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color={"primary"}
                                    onClick={this.handleNewChartOpen}>
                                    Novo Gráfico
                                </Button>
                                <Grid container spacing={16}>
                                    {charts.map((chart, index) =>
                                        <Grid item key={index} xs={6} sm={6} md={3}>
                                            <Paper>
                                                <div>
                                                    <Typography variant={"subtitle1"} className={classes.title}>
                                                        {chart.title}
                                                    </Typography>
                                                    <Divider/>
                                                    <div className={classes.chart}>
                                                        <CanvasJSChart options={chart.thumbnail} className={classes.chart}/>
                                                    </div>
                                                    <Divider/>
                                                    <div className={classes.chartInformation}>
                                                        <div className={classes.stats}>
                                                            <AccessTime className={classes.icon}/>{chart.date}
                                                        </div>
                                                        <IconButton
                                                            key="fullscreen"
                                                            aria-label="Fullscreen"
                                                            color="inherit"
                                                            onClick={() => this.handleViewChartOpen(index)}>
                                                            <Fullscreen className={classes.icon}/>
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </Paper>
                                        </Grid>)}
                                </Grid>
                            </div>
                        </Paper>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

const styles = theme => ({
    stats: {
        color: "#999999",
        display: "inline-flex",
        fontSize: "12px",
        lineHeight: "22px",
        "& svg": {
            top: "4px",
            width: "16px",
            height: "16px",
            position: "relative",
            marginRight: "3px",
            marginLeft: "3px"
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            top: "4px",
            fontSize: "16px",
            position: "relative",
            marginRight: "3px",
            marginLeft: "3px"
        }
    },
    container,
    content: {
        marginTop: "60px",
        padding: "30px"
    },
    title: {
        textAlign: "center",
        padding: "10px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    chartInformation: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px"
    },
    icon: {
        color: "#888888"
    },
    chartsContainer: {
        margin: "20px",
    },
    chart: {
        margin: "auto",
        width: "100%",
        padding: "5px"
    },
    button: {
        margin: "10px 0 20px 0"
    }
});

export default withStyles(styles)(ChartsPage);