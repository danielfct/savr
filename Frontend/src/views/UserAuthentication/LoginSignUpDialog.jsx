import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from "../../views/UserAuthentication/Login"
import SignUp from "../../views/UserAuthentication/SignUp"
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

class LoginSignUpDialog extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    onRegister = () => {
        this.setState({value: 0})
    };

    render() {
        const {onClose, onUserLogin} = this.props;
        const {value} = this.state;
        return (
            <Dialog
                open={true}
                onClose={() => onClose()}>
                <DialogContent>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        fullWidth>
                        <Tab label="Entrar"/>
                        <Tab label="Registar"/>
                    </Tabs>
                    {value === 0 && <Login history={this.props.history} onUserLogin={onUserLogin}/>}
                    {value === 1 && <SignUp onRegister={this.onRegister}/>}
                </DialogContent>
            </Dialog>
        );
    }
}

const styles = {
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
};

export default withStyles(styles)(LoginSignUpDialog);
