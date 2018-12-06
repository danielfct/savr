/*eslint-disable*/
import React from "react";
import {Link, Redirect} from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

import {ExitToApp} from "@material-ui/icons";

import tooltip from "assets/jss/components/tooltipsStyle.jsx";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import { defaultFont } from "assets/jss/savr.jsx";
import classNames from "classnames";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import profile from "../../assets/images/avatar.jpg";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import Divider from "@material-ui/core/Divider/Divider";
import {primaryColor} from "../../assets/jss/savr";

class SavrHeaderLinks extends React.Component {

    onUserLogout = () => {
        this.props.onUserLogout();
        this.redirectTo("/")
    };

    redirectTo = (path) => {
        this.props.history.push(path);
    };

    render() {
        const { classes, user, current, ...rest } = this.props;
        return (
            <div>
                <List className={classes.list}>
                    <ListItem className={classes.listItem}>
                        <Button
                            variant={current === "/chartsPage" ? "outlined" : null}
                            className={classes.navLink}
                            onClick={() => this.redirectTo("/chartsPage")}>
                            <Typography color="textPrimary" variant="button">
                                Gráficos
                            </Typography>
                        </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <Button
                            variant={current === "/historyPage" ? "outlined" : null}
                            className={classes.navLink}
                            onClick={() => this.redirectTo("/historyPage")}>
                            <Typography color="textPrimary" variant="button">
                                Histórico
                            </Typography>
                        </Button>
                    </ListItem>

                    <ListItem className={classes.iconListItem}>
                        <CustomDropdown
                            left
                            caret={false}
                            noLiPadding
                            dropdownHeader={(user.info.firstName === "" || user.info.lastName === "") ?
                                "Utilizador" :
                                (user.info.firstName + " " + user.info.lastName)}
                            buttonText={
                                <img
                                    src={user.image ? user.image : profile}
                                    className={classes.img}
                                    alt="profile"/>
                            }
                            buttonProps={{
                                className: classNames(classes.navLink, classes.imageDropdownButton),
                                color: "transparent"
                            }}
                            dropdownList={[
                                <Divider/>,
                                <Link to={"/profilePage"}
                                    className={classes.dropdownItem}>
                                    <Typography color="textPrimary">
                                        Perfil
                                    </Typography>
                                </Link>,
                                <Divider/>,
                                <Button
                                    disableRipple
                                    className={classes.dropdownItem}
                                    onClick={this.onUserLogout}>
                                    <Typography color="textPrimary">
                                        Sair
                                    </Typography>
                                    <ExitToApp className={classNames(classes.icons, classes.logoutButton)} />
                                </Button>
                            ]}
                        />
                    </ListItem>
                </List>
            </div>
        );
    }
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
        },
    },
    iconListItem: {
        float: "left",
        color: "inherit",
        position: "relative",
        display: "block",
        width: "auto",
        margin: "0",
        marginLeft: "20px",
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
        },
    },
    navLink: {
        color: "inherit",
        position: "relative",
        padding: "0.9375rem",
        fontSize: "11px",
        borderRadius: "3px",
        margin: "5px 0px 5px 0px",
        display: "inline-flex",
        "&:hover,&:focus": {
            color: "inherit",
            background: "rgba(75, 75, 75, 0.2)"
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
    dropdownItem: {
        color: "inherit",
        position: "relative",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "11px",
        borderRadius: "3px",
        lineHeight: "20px",
        margin: "5px",
        display: "inline-flex",
        textTransform: "capitalize",
        "&:hover,&:focus": {
            backgroundColor: "transparent",
            color: "#FFFFFF",
        }
    },
    icons: {
        width: "20px",
        height: "20px",
        marginRight: "3px",
        marginLeft: "3px",
        color: "red"
    },
    logoutButton: {
        paddingLeft: "5px"
    },
    imageDropdownButton: {
        padding: "0px",
        top: "4px",
        borderRadius: "50%",
        marginLeft: "5px",
    },
    img: {
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        margin: "5px"
    },
});


export default withStyles(styles)(SavrHeaderLinks);
