/*eslint-disable*/
import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import {VpnKey, Web} from "@material-ui/icons";
import tooltip from "assets/jss/components/tooltipsStyle.jsx";
import Button from "../CustomButtons/Button";
import {defaultFont} from "assets/jss/savr.jsx";

function LandingHeaderLinks(props) {
    const {classes, onUserLogin} = props;

    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button
                    target="_blank"
                    color={"transparent"}
                    className={classes.navLink}
                    onClick={() => onUserLogin()}>
                    <VpnKey className={classes.icons}/> Entrar
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Tooltip
                    id="repository-github"
                    title="Repositório no GitHub"
                    placement={window.innerWidth > 959 ? "top" : "left"}
                    classes={{tooltip: classes.tooltip}}>
                    <Button
                        href="https://github.com/danielfct/ipm"
                        target="_blank"
                        color={"transparent"}
                        className={classes.navLink}>
                        <i className={classes.socialIcons + " fab fa-github"}/>
                    </Button>
                </Tooltip>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Tooltip
                    title="Website da cadeira"
                    placement={window.innerWidth > 959 ? "top" : "left"}
                    classes={{tooltip: classes.tooltip}}>
                    <Button
                        href="http://ctp.di.fct.unl.pt/miei/ipm/"
                        target="_blank"
                        color={"transparent"}
                        className={classes.navLink}>
                        <Web className={classes.icons}/>
                    </Button>
                </Tooltip>
            </ListItem>
        </List>
    );
}

const styles = theme => ({
    list: {
        ...defaultFont,
        fontSize: "14px",
        margin: 0,
        paddingLeft: "0",
        listStyle: "none",
        paddingTop: "0",
        paddingBottom: "0",
        color: "inherit"
    },
    listItem: {
        float: "left",
        color: "inherit",
        position: "relative",
        display: "block",
        width: "auto",
        margin: "0",
        padding: "0",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            "&:after": {
                width: "calc(100% - 30px)",
                content: '""',
                display: "block",
                height: "1px",
                marginLeft: "15px",
                backgroundColor: "#e5e5e5"
            }
        }
    },
    navLink: {
        color: "inherit",
        position: "relative",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "12px",
        borderRadius: "3px",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        "&:hover,&:focus": {
            color: "inherit",
            background: "rgba(200, 200, 200, 0.2)"
        },
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 30px)",
            marginLeft: "15px",
            marginBottom: "8px",
            marginTop: "8px",
            textAlign: "left",
            "& > span:first-child": {
                justifyContent: "flex-start"
            }
        }
    },
    socialIcons: {
        position: "relative",
        fontSize: "20px !important",
        marginRight: "4px"
    },
    ...tooltip
});

export default withStyles(styles)(LandingHeaderLinks);
