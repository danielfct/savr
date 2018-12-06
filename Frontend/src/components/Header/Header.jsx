import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/icons/Menu";

import Typography from "@material-ui/core/Typography/Typography";
import {Redirect} from "react-router-dom";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase/InputBase";

import {
    boxShadow,
    container,
    dangerColor,
    defaultFont,
    drawerWidth,
    infoColor,
    primaryColor,
    roseColor,
    successColor,
    transition,
    warningColor
} from "assets/jss/savr.jsx";
import {fade} from "@material-ui/core/styles/colorManipulator";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.headerColorChange = this.headerColorChange.bind(this);
    }
    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }
    componentDidMount() {
        if (this.props.changeColorOnScroll) {
            window.addEventListener("scroll", this.headerColorChange);
        }
    }
    headerColorChange() {
        const { classes, color, changeColorOnScroll } = this.props;
        const windowsScrollTop = window.pageYOffset;
        if (windowsScrollTop > changeColorOnScroll.height) {
            document.body
                .getElementsByTagName("header")[0]
                .classList.remove(classes[color]);
            document.body
                .getElementsByTagName("header")[0]
                .classList.add(classes[changeColorOnScroll.color]);
        } else {
            document.body
                .getElementsByTagName("header")[0]
                .classList.add(classes[color]);
            document.body
                .getElementsByTagName("header")[0]
                .classList.remove(classes[changeColorOnScroll.color]);
        }
    }
    componentWillUnmount() {
        if (this.props.changeColorOnScroll) {
            window.removeEventListener("scroll", this.headerColorChange);
        }
    }

    redirectTo = (path) => {
        this.props.history.push(path);
    };

    handleChange = name => event => {
        if (name === "search") {
            this.props.onSearchUpdate(event.target.value.toLowerCase());
        }
    };

    makeBrand = () => {
        const {classes, href, user} = this.props;
        if (href) {
            return (
                <GridContainer spacing={8}>
                    <GridItem xs={4} sm={4} md={4}>
                        <div className={classes.brand}>
                            <Button onClick={() => this.redirectTo("/mainPage")} className={classes.title}>
                                <Typography className={classes.appBarTitle} variant={"h4"}>savr</Typography>
                            </Button>
                            <div className={classes.userName}>
                                <Typography variant={"caption"}>{user.info.firstName + " " + user.info.lastName}</Typography>
                            </div>
                        </div>
                    </GridItem>
                </GridContainer>
            )
        } else {
            return <Typography className={this.props.classes.landingAppBarTitle} variant={"h4"}>savr</Typography>;
        }
    };

    render() {
        const {
            classes,
            color,
            rightLinks,
            leftLinks,
            fixed,
            absolute,
            titleColor,
            href,
            titleClassName,
            searchBar,
            onSearchUpdate,
            user
        } = this.props;
        const appBarClasses = classNames({
            [classes.appBar]: true,
            [classes[color]]: color,
            [classes.absolute]: absolute,
            [classes.fixed]: fixed
        });
        const brandComponent = this.makeBrand();
        return (
            <AppBar className={appBarClasses}>
                <Toolbar className={classes.container}>
                    {leftLinks !== undefined ? brandComponent : null}
                    <div className={classes.flex}>
                        {leftLinks !== undefined ? (
                            <Hidden smDown implementation="css">
                                {leftLinks}
                            </Hidden>
                        ) : (
                            brandComponent
                        )}
                    </div>
                    {searchBar ?
                        <div className={classes.searchBar}>
                            <div className={classes.grow} />
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Pesquisa…"
                                    onChange={this.handleChange("search")}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}/>
                            </div>
                        </div> :
                        undefined}
                    <Hidden smDown implementation="css">
                        {rightLinks}
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}>
                            <Menu />
                        </IconButton>
                    </Hidden>
                </Toolbar>
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={"right"}
                        open={this.state.mobileOpen}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        onClose={this.handleDrawerToggle}
                    >
                        <div className={classes.appResponsive}>
                            {leftLinks}
                            {rightLinks}
                        </div>
                    </Drawer>
                </Hidden>
            </AppBar>
        );
    }
}


Header.defaultProp = {
    color: "white"
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "yellow",
        "dark"
    ]),
    rightLinks: PropTypes.node,
    leftLinks: PropTypes.node,
    brand: PropTypes.string,
    fixed: PropTypes.bool,
    absolute: PropTypes.bool,
    changeColorOnScroll: PropTypes.shape({
        height: PropTypes.number.isRequired,
        color: PropTypes.oneOf([
            "primary",
            "info",
            "success",
            "warning",
            "danger",
            "transparent",
            "white",
            "rose",
            "dark"
        ]).isRequired,
        titleColor: PropTypes.oneOf([
            "primary",
            "secondary",
            "inherit",
            "default"
        ])
    })
};

const styles = theme => ({
    appBar: {
        display: "flex",
        border: "0",
        borderRadius: "3px",
        padding: "0.100rem 0",
        marginBottom: "3px",
        color: "#ffffff",
        width: "100%",
        background: "#282828",
        boxShadow:
            "0 4px 18px 0px rgba(0, 0, 0, 0.5), 0 7px 10px -5px rgba(0, 0, 0, 0.5)",
        transition: "all 150ms ease 0s",
        alignItems: "center",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        position: "relative",
        zIndex: "unset"
    },
    absolute: {
        position: "absolute",
        zIndex: "1100"
    },
    fixed: {
        position: "fixed",
        zIndex: "1100"
    },
    container: {
        ...container,
        minHeight: "54px",
        flex: "1",
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        flexWrap: "nowrap"
    },
    flex: {
        flex: 1
    },
    title: {
        ...defaultFont,
        lineHeight: "30px",
        fontSize: "18px",
        fontWeight: "bold",
        borderRadius: "3px",
        textTransform: "none",
        color: "green",
        "&:hover,&:focus": {
            color: "inherit",
            background: "rgba(75, 75, 75, 0.2)"
        },
    },
    appResponsive: {
        margin: "20px 10px"
    },
    primary: {
        backgroundColor: primaryColor,
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(156, 39, 176, 0.46)"
    },
    info: {
        backgroundColor: infoColor,
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(0, 188, 212, 0.46)"
    },
    success: {
        backgroundColor: successColor,
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(76, 175, 80, 0.46)"
    },
    warning: {
        backgroundColor: warningColor,
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(255, 152, 0, 0.46)"
    },
    danger: {
        backgroundColor: dangerColor,
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(244, 67, 54, 0.46)"
    },
    rose: {
        backgroundColor: roseColor,
        color: "#FFFFFF",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)"
    },
    transparent: {
        backgroundColor: "transparent !important",
        boxShadow: "none",
        paddingTop: "25px",
        color: "#FFFFFF"
    },
    dark: {
        color: "#FFFFFF",
        backgroundColor: "#232323 !important",
        boxShadow:
            "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)"
    },
    drawerPaper: {
        border: "none",
        bottom: "0",
        transitionProperty: "top, bottom, width",
        transitionDuration: ".2s, .2s, .35s",
        transitionTimingFunction: "linear, linear, ease",
        width: drawerWidth,
        ...boxShadow,
        position: "fixed",
        display: "block",
        top: "0",
        height: "100vh",
        right: "0",
        left: "auto",
        visibility: "visible",
        overflowY: "visible",
        borderTop: "none",
        textAlign: "left",
        paddingRight: "0px",
        paddingLeft: "0",
        ...transition
    },
    landingAppBarTitle: {
        color: "white"
    },
    appBarTitle: {
        color: "#43a047"
    },
    brand: {
        display: "flex",
        alignItems: "center",
        flexFlow: "row nowrap",
    },
    userName: {
        marginLeft: "20px",
        color: "#ffffff"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    grow: {
        flexGrow: 1,
    },
    searchBar: {
        paddingRight: "15px"
    }
});

export default withStyles(styles)(Header);
