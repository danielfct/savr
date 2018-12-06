import React from "react";
import CanvasJSReact from "../../utils/canvasjs.react";
import withStyles from "@material-ui/core/styles/withStyles";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Divider from "@material-ui/core/Divider/Divider";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import Slide from "@material-ui/core/Slide/Slide";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {Close} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography/Typography";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ViewChartDialog extends React.Component {

    render() {
        const CanvasJSChart = CanvasJSReact.CanvasJSChart;
        const {classes, open, handleClose} = this.props;
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullScreen
                TransitionComponent={Transition}>
                <DialogTitle id="form-dialog-title">
                    Visualização de gráfico
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <div className={classes.content}>
                        {this.props.chart && <CanvasJSChart options={this.props.chart.chart}/>}
                    </div>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button variant={"contained"}
                        color={"secondary"}
                            onClick={handleClose}
                            className={classes.dialogCloseButton}>
                        <div className={classes.buttonText}>Fechar</div>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const styles = theme => ({
    dialogCloseButton: {
        color: "#ff0000",
        margin: "20px",
        textColor: "#fff"
    },
    content: {
        margin: "auto",
        width: "100%",
        padding: "0 42px 0 42px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    title: {
        color: "#fff"
    },
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff !important"
    }
});

export default withStyles(styles)(ViewChartDialog);

