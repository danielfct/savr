import {
    defaultFont,
    primaryColor,
    primaryBoxShadow,
    infoColor,
    infoBoxShadow,
    successColor,
    successBoxShadow,
    warningColor,
    warningBoxShadow,
    dangerColor,
    dangerBoxShadow,
    roseColor,
    roseBoxShadow
} from "../../assets/jss/savr.jsx";
import profile from "../../assets/images/avatar.jpg";

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import Popper from "@material-ui/core/Popper";

// core components
import Button from "components/CustomButtons/Button.jsx";

class CustomDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClick() {
        this.setState(state => ({ open: !state.open }));
    }
    handleClose(param) {
        this.setState({ open: false });
        if(this.props && this.props.onClick){
            this.props.onClick(param);
        }
    }
    handleCloseAway = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ open: false });
    }
    render() {
        const { open } = this.state;
        const {
            classes,
            buttonText,
            buttonIcon,
            dropdownList,
            buttonProps,
            dropup,
            dropdownHeader,
            caret,
            hoverColor,
            left,
            rtlActive,
            noLiPadding
        } = this.props;
        const caretClasses = classNames({
            [classes.caret]: true,
            [classes.caretActive]: open,
            [classes.caretRTL]: rtlActive
        });
        const dropdownItem = classNames({
            [classes.dropdownItem]: true,
            [classes[hoverColor + "Hover"]]: true,
            [classes.noLiPadding]: noLiPadding,
            [classes.dropdownItemRTL]: rtlActive
        });
        let icon = null;
        switch (typeof buttonIcon) {
            case "function":
                icon = <this.props.buttonIcon className={classes.buttonIcon} />;
                break;
            case "string":
                icon = (
                    <Icon className={classes.buttonIcon}>{this.props.buttonIcon}</Icon>
                );
                break;
            default:
                icon = null;
                break;
        }
        return (
            <div>
                <div>
                    <Button
                        aria-label="Notifications"
                        aria-owns={open ? "menu-list" : null}
                        aria-haspopup="true"
                        {...buttonProps}
                        buttonRef={node => {
                            this.anchorEl = node;
                        }}
                        onClick={this.handleClick}
                    >
                        {icon}
                        {buttonText !== undefined ? buttonText : null}
                        {caret ? <b className={caretClasses} /> : null}
                    </Button>
                </div>
                <Popper
                    open={open}
                    anchorEl={this.anchorEl}
                    transition
                    disablePortal
                    placement={
                        dropup
                            ? left ? "top-start" : "top"
                            : left ? "bottom-start" : "bottom"
                    }
                    className={classNames({
                        [classes.popperClose]: !open,
                        [classes.pooperResponsive]: true
                    })}
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            in={open}
                            id="menu-list"
                            style={
                                dropup
                                    ? { transformOrigin: "0 100% 0" }
                                    : { transformOrigin: "0 0 0" }
                            }
                        >
                            <Paper className={classes.dropdown}>
                                <ClickAwayListener onClickAway={this.handleCloseAway}>
                                    <MenuList role="menu" className={classes.menuList}>
                                        {dropdownHeader !== undefined ? (
                                            <MenuItem disableRipple onClick={this.handleClose} className={classes.dropdownHeader}>
                                                {dropdownHeader}
                                            </MenuItem>
                                        ) : null}
                                        {dropdownList.map((prop, key) => {
                                            if (prop.type === Divider) {
                                                return (
                                                    <Divider key={key} className={classes.dropdownDividerItem}/>
                                                );
                                            }
                                            return (
                                                <MenuItem
                                                    key={key}
                                                    onClick={this.handleClose}
                                                    className={dropdownItem}
                                                >
                                                    {prop}
                                                </MenuItem>
                                            );
                                        })}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        );
    }
}

CustomDropdown.defaultProps = {
    caret: true,
    hoverColor: "transparent"
};

CustomDropdown.propTypes = {
    classes: PropTypes.object.isRequired,
    hoverColor: PropTypes.oneOf([
        "black",
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "rose",
        "transparent"
    ]),
    buttonText: PropTypes.node,
    buttonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    dropdownList: PropTypes.array,
    buttonProps: PropTypes.object,
    dropup: PropTypes.bool,
    dropdownHeader: PropTypes.node,
    rtlActive: PropTypes.bool,
    caret: PropTypes.bool,
    left: PropTypes.bool,
    noLiPadding: PropTypes.bool,
    // function that retuns the selected item
    onClick: PropTypes.func
};

const styles = theme => ({
    popperClose: {
        pointerEvents: "none"
    },
    dropdown: {
        borderRadius: "3px",
        border: "0",
        top: "100%",
        zIndex: "1000",
        fontSize: "14px",
        textAlign: "left",
        listStyle: "none",
        backgroundClip: "padding-box"
    },
    menuList: {
        padding: "0"
    },
    pooperResponsive: {
        zIndex: "1200",
        [theme.breakpoints.down("sm")]: {
            zIndex: "1640",
            position: "static",
            float: "none",
            width: "auto",
            marginTop: "0",
            backgroundColor: "transparent",
            border: "0",
            boxShadow: "none",
            color: "black"
        }
    },
    dropdownItem: {
        ...defaultFont,
        fontSize: "12px",
        borderRadius: "2px",
        position: "relative",
        transition: "all 150ms linear",
        display: "block",
        clear: "both",
        fontWeight: "400",
        height: "fit-content",
        color: "#333",
        whiteSpace: "nowrap"
    },
    blackHover: {
        "&:hover,&:focus": {
            boxShadow:
                "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)",
            backgroundColor: "#212121",
            color: "#fff"
        }
    },
    primaryHover: {
        "&:hover,&:focus": {
            backgroundColor: primaryColor,
            color: "#FFFFFF",
        }
    },
    infoHover: {
        "&:hover,&:focus": {
            backgroundColor: infoColor,
            color: "#FFFFFF",
        }
    },
    transparentHover: {
        "&:hover,&:focus": {
            backgroundColor: "transparent",
            color: "#FFFFFF",
        }
    },
    successHover: {
        "&:hover,&:focus": {
            backgroundColor: successColor,
            color: "#FFFFFF",
        }
    },
    warningHover: {
        "&:hover,&:focus": {
            backgroundColor: warningColor,
            color: "#FFFFFF",
        }
    },
    dangerHover: {
        "&:hover,&:focus": {
            backgroundColor: dangerColor,
            color: "#FFFFFF",
            ...dangerBoxShadow
        }
    },
    roseHover: {
        "&:hover,&:focus": {
            backgroundColor: roseColor,
            color: "#FFFFFF",
        }
    },
    dropdownItemRTL: {
        textAlign: "right"
    },
    dropdownDividerItem: {
        margin: "5px 0",
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        height: "1px",
        overflow: "hidden",
    },
    buttonIcon: {
        width: "20px",
        height: "20px"
    },
    caret: {
        transition: "all 150ms ease-in",
        display: "inline-block",
        width: "0",
        height: "0",
        marginLeft: "4px",
        verticalAlign: "middle",
        borderTop: "4px solid",
        borderRight: "4px solid transparent",
        borderLeft: "4px solid transparent"
    },
    caretActive: {
        transform: "rotate(180deg)"
    },
    caretRTL: {
        marginRight: "4px"
    },
    dropdownHeader: {
        display: "block",
        fontSize: "0.75rem",
        lineHeight: "1.428571",
        color: "#777",
        whiteSpace: "nowrap",
        fontWeight: "inherit",
        marginTop: "10px",
        "&:hover,&:focus": {
            backgroundColor: "transparent",
            cursor: "auto"
        }
    },
    noLiPadding: {
        padding: "0"
    }
});

export default withStyles(styles)(CustomDropdown);
