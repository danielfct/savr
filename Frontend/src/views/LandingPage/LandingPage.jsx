import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import LandingHeaderLinks from "components/Header/LandingHeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import TeamSection from "./Sections/TeamSection.jsx";
import LoginSignUpDialog from "views/UserAuthentication/LoginSignUpDialog";
import {container, title} from "assets/jss/savr.jsx";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

class LandingPage extends React.Component {
    state = {
        showUserAuthDialog: false
    };

    handleUserAuthDialogOpen = () => {
        this.setState({showUserAuthDialog: true});
    };

    handleUserAuthDialogClose = () => {
        this.setState({showUserAuthDialog: false});
    };

    render() {
        const {classes, onUserLogin, ...rest} = this.props;
        const theme = createMuiTheme({
            palette: {
                primary: {main: '#1b5e20'},
                secondary: {main: '#b71c1c'},
                textPrimary: {main: '#ffffff'}
            },
        });
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.content}>
                    <Header
                        color="transparent"
                        rightLinks={<LandingHeaderLinks onUserLogin={this.handleUserAuthDialogOpen}/>}
                        fixed
                        changeColorOnScroll={{
                            height: 300,
                            color: "white",
                            titleColor: "primary"
                        }}
                        {...rest}
                    />
                    {this.state.showUserAuthDialog && <LoginSignUpDialog {...rest} onUserLogin={onUserLogin} onClose={this.handleUserAuthDialogClose}/>}
                    <Parallax filter image={require("assets/images/landing-bg.jpg")}>
                        <div className={classes.container}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <h1 className={classes.title}>Plataforma para gestão de dinheiro.</h1>
                                    <h4>
                                        Esta plataforma destina-se a utilizadores que procurem gerir as suas poupanças
                                        através de uma interface simples e elegante.
                                    </h4>
                                    <br/>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </Parallax>
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div className={classes.container}>
                            <TeamSection/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
}

const styles = {
    content: {
        background: "#9b9b9b"
    },
    container: {
        zIndex: "12",
        color: "#FFFFFF",
        ...container
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
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3"
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    }
};

export default withStyles(styles)(LandingPage);
