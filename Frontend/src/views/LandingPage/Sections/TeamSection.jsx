import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import avatar from "assets/images/avatar.jpg";
import { cardTitle, title } from "assets/jss/savr.jsx";
import imagesStyle from "assets/jss/components/imagesStyles.jsx";

class TeamSection extends React.Component {

    render() {
        const {classes} = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );

        return (
            <div className={classes.section}>
                <h2 className={classes.title}>Grupo</h2>
                <div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card plain>
                                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                                    <img src={avatar} alt="..." className={imageClasses}/>
                                </GridItem>
                                <h4 className={classes.cardTitle}>
                                    João Miguel Gago Gonçalves
                                    <br/>
                                    <small className={classes.smallTitle}>44361</small>
                                </h4>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card plain>
                                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                                    <img src={avatar} alt="..." className={imageClasses}/>
                                </GridItem>
                                <h4 className={classes.cardTitle}>
                                    Filipe Joel Fernandes de Almeida
                                    <br/>
                                    <small className={classes.smallTitle}>45047</small>
                                </h4>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card plain>
                                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                                    <img src={avatar} alt="..." className={imageClasses}/>
                                </GridItem>
                                <h4 className={classes.cardTitle}>
                                    Daniel Filipe Santos Pimenta
                                    <br/>
                                    <small className={classes.smallTitle}>45404</small>
                                </h4>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        );
    }
}


const style = {
    section: {
        padding: "70px 0",
        textAlign: "center"
    },
    title: {
        ...title,
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none",
        color: "#000"
    },
    ...imagesStyle,
    itemGrid: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    cardTitle,
    smallTitle: {
        color: "#6c757d"
    },
    description: {
        color: "#999"
    },
    justifyCenter: {
        justifyContent: "center !important"
    },
    socials: {
        marginTop: "0",
        width: "100%",
        transform: "none",
        left: "0",
        top: "0",
        height: "100%",
        lineHeight: "41px",
        fontSize: "20px",
        color: "#999"
    },
    margin5: {
        margin: "5px"
    }
};

export default withStyles(style)(TeamSection);
