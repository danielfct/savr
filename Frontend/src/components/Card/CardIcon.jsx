import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
    roseCardHeader
} from "assets/jss/savr.jsx";

function CardIcon({ ...props }) {
  const { classes, className, children, color, ...rest } = props;
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}

CardIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ])
};

const styles = {
    cardIcon: {
        "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
            borderRadius: "3px",
            backgroundColor: "#999",
            padding: "15px",
            marginTop: "-20px",
            marginRight: "15px",
            float: "left"
        }
    },
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
    roseCardHeader
};

export default cardIconStyle;

export default withStyles(styles)(CardIcon);
