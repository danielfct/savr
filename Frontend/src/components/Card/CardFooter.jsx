import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

function CardFooter({ ...props }) {
    const {
        classes,
        className,
        children,
        plain,
        profile,
        stats,
        chart,
        ...rest
    } = props;
    const cardFooterClasses = classNames({
        [classes.cardFooter]: true,
        [classes.cardFooterPlain]: plain,
        [classes.cardFooterProfile]: profile,
        [classes.cardFooterStats]: stats,
        [classes.cardFooterChart]: chart,
        [className]: className !== undefined
    });
    return (
        <div className={cardFooterClasses} {...rest}>
            {children}
        </div>
    );
}

CardFooter.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    stats: PropTypes.bool,
    chart: PropTypes.bool
};

const cardFooterStyle = {
    cardFooter: {
        padding: "0",
        paddingTop: "10px",
        margin: "0 15px 10px",
        borderRadius: "0",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        backgroundColor: "transparent",
        border: "0"
    },
    cardFooterProfile: {
        marginTop: "-15px"
    },
    cardFooterPlain: {
        paddingLeft: "5px",
        paddingRight: "5px",
        backgroundColor: "transparent"
    },
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
        },
        background: "#646464",
    },
    cardFooterStats: {
        borderTop: "1px solid #eee",
        marginTop: "20px",
        "& svg": {
            position: "relative",
            top: "4px",
            marginRight: "3px",
            marginLeft: "3px",
            width: "16px",
            height: "16px"
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            fontSize: "16px",
            position: "relative",
            top: "4px",
            marginRight: "3px",
            marginLeft: "3px"
        }
    },
    cardFooterChart: {
        borderTop: "1px solid #eee"
    }
};

export default withStyles(cardFooterStyle)(CardFooter);

