/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import {List, ListItem, withStyles} from "@material-ui/core";
import { container } from "assets/jss/savr.jsx";

function Footer({...props}) {
    const {classes} = props;
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                target="_blank"
                                href="https://github.com/danielfct/savr.github.io"
                                className={classes.block}
                            >
                                Repositório GitHub
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                target="_blank"
                                href="http://ctp.di.fct.unl.pt/miei/ipm/page4/page4.html"
                                className={classes.block}
                            >
                                IPM Website
                            </a>
                        </ListItem>
                    </List>
                </div>
                <p className={classes.right}>
          <span className={classes.copyright}>
            &copy; {1900 + new Date().getYear()}
              {" "} &bull;
              <a target="_blank" href="https://github.com/jmggoncalves" className={classes.a}>
              João Gonçalves
            </a>
              {" "} &bull;
            <a target="_blank" href="https://github.com/filipeamda" className={classes.a}>
              Filipe Almeida
            </a>
              {" "} &bull;
            <a target="_blank" href="https://github.com/danielfct" className={classes.a}>
              Daniel Pimenta
            </a>
          </span>
                </p>
            </div>
        </footer>
    );
}


const footerStyle = {
    block: {
        color: "#ffffff",
        padding: "0.9375rem",
        fontWeight: "500",
        fontSize: "12px",
        borderRadius: "3px",
        textDecoration: "none",
        position: "relative",
        display: "block"
    },
    left: {
        float: "left!important",
        display: "block"
    },
    right: {
        padding: "15px 0",
        margin: "0",
        float: "right!important"
    },
    footer: {
        padding: "0.9375rem 0",
        textAlign: "center",
        display: "flex",
        zIndex: "2",
        position: "relative",
        "&,&:hover,&:focus": {
            color: "#FFFFFF"
        }
    },
    a: {
        textDecoration: "none",
        color: "#FFFFFF",
        marginLeft: "5px"
    },
    container,
    list: {
        marginBottom: "0",
        padding: "0",
        marginTop: "0"
    },
    inlineBlock: {
        display: "inline-block",
        padding: "0px",
        width: "auto"
    },
    icon: {
        width: "18px",
        height: "18px",
        position: "relative",
        top: "3px"
    },
    copyright: {
        color: "#fff"
    }
};

export default withStyles(footerStyle)(Footer);
