import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button/Button";
import {Link, Redirect} from "react-router-dom";
import Footer from "../../../components/Footer/Footer";

const styles = theme => ({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    heading: {
        flexBasis: '50%',
        flexShrink: 0,
        margin: "5px"
    },
    secondaryHeading: {
        color: theme.palette.text.secondary,
        margin: "5px"
    },
    button: {
        margin: "10px"
    },
    icon: {
        marginRight: "10px",
        color: "#888888"
    },
});

class HistorySection extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    redirectToHistory = () => {
        this.props.history.push("/historyPage");
    };

    render() {
        const {classes, userHistory} = this.props;
        const {expanded} = this.state;

        return (
            <div className={classes.root}>
                {userHistory.slice(0, 5).map(hist =>
                    <ExpansionPanel key={hist.id} expanded={expanded === 'panel' + hist.id}
                                    onChange={this.handleChange('panel' + hist.id)}>
                        <ExpansionPanelSummary expandIcon={(hist.description) ? <ExpandMoreIcon/> : null}>
                            <hist.icon className={classes.icon}/>
                            <Typography className={classes.heading}>{hist.message}</Typography>
                            <Typography className={classes.secondaryHeading}>{hist.date.toLocaleDateString("pt")}</Typography>
                        </ExpansionPanelSummary>
                        {(hist.description) &&
                        <ExpansionPanelDetails>
                            <Typography>
                                {hist.description}
                            </Typography>
                        </ExpansionPanelDetails>}
                    </ExpansionPanel>)}
                <Button onClick={this.redirectToHistory} className={classes.button}>
                    <Typography variant={"caption"}>Ver histórico completo</Typography>
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(HistorySection);
