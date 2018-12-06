import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Person from "@material-ui/icons/Person";
import VpnKey from "@material-ui/icons/VpnKey";
import Email from "@material-ui/icons/Email";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "../../components/CustomButtons/Button";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import MySnackbarContent from '../../components/Snackbar/MySnackBarContent'
import CloseIcon from '@material-ui/icons/Close';
import Fade from "@material-ui/core/Fade/Fade";
import {timedFetch} from "../../utils/Utils";


class SignUp extends React.Component {
    state = {
        firstnameError: false,
        lastnameError: false,
        emailError: false,
        passwordError: false,
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        showPassword: false,
        linearProgress: false,
        registerError: false,
        registerErrorMsg: "",
    };

    registerUser = event => {
        let invalid = false;
        if (!this.state.firstname) {
            this.setState({firstnameError: true});
            invalid = true;
        } else {
            this.setState({firstnameError: false});
        }
        if (!this.state.lastname) {
            this.setState({lastnameError: true});
            invalid = true;
        } else {
            this.setState({lastnameError: false});
        }
        if (!this.state.email || !(/\S+@\S+\.\S+/.test(this.state.email))) {
            this.setState({emailError: true});
            invalid = true;
        } else {
            this.setState({emailError: false});
        }
        if (!this.state.password || this.state.password.length < 8) {
            this.setState({passwordError: true});
            invalid = true;
        } else {
            this.setState({passwordError: false});
        }
        if (invalid) {
            return;
        }
        const {onRegister} = this.props;
        event.preventDefault();
        this.setState({linearProgress: true});
        timedFetch('https://calm-basin-62001.herokuapp.com/savrUsers', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                email: this.state.email,
                password: this.state.password
            })
        }, 30000).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(body => {
            this.setState({linearProgress: false});
            this.setState({firstnameError: false});
            this.setState({lastnameError: false});
            this.setState({emailError: false});
            this.setState({passwordError: false});
            onRegister();
        }).catch(error => {
            console.error('Error:', error.message);
            this.setState({linearProgress: false});
            this.setState({registerError: true});
            this.setState({registerErrorMsg: error.message.includes("Failed to fetch") ? "Erro de rede." : error.message})
        });
    };

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    handleChange = name => event => {
        if (name === "firstname") {
            this.setState({firstnameError: false});
        } else if (name === "lastname") {
            this.setState({lastnameError: false});
        } else if (name === "email") {
            this.setState({emailError: false});
        } else if (name === "password") {
            this.setState({passwordError: false});
        }
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({registerError: false});
    };

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.registerUser(event);
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.margin}>
                {this.state.registerError &&
                <Snackbar
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    open={true}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                    TransitionComponent={Fade}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>,
                    ]}>
                    <MySnackbarContent
                        onClose={this.handleClose}
                        variant="error"
                        message={"Ocorreu um erro ao executar o registo da conta: " + this.state.registerErrorMsg}/>
                </Snackbar>}
                <form onKeyPress={this.handleKeyPress}>
                    <Typography className={classes.margin} variant="title">
                        Cria a tua conta
                    </Typography>
                    <Paper elevation={1}>
                        <div className={classes.margin}>
                            <Grid container padding={4} spacing={8} alignItems="center">
                                <Grid item xs={1}>
                                    <Person/>
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        id="outlined-firstname"
                                        required
                                        error={this.state.firstnameError}
                                        label="Primeiro Nome"
                                        className={classes.textField}
                                        margin="dense"
                                        onChange={this.handleChange('firstname')}
                                        variant="outlined"/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="outlined-lastname"
                                        required
                                        error={this.state.lastnameError}
                                        label="Último Nome"
                                        className={classes.textField}
                                        margin="dense"
                                        fullWidth
                                        onChange={this.handleChange('lastname')}
                                        variant="outlined"/>
                                </Grid>

                                <Grid item xs={1}>
                                    <Email/>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        id="outlined-email-input"
                                        required
                                        error={this.state.emailError}
                                        label="Email"
                                        className={classes.textField}
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        margin="dense"
                                        fullWidth
                                        variant="outlined"
                                        onChange={this.handleChange('email')}
                                        helperText="Introduza um email válido."/>
                                </Grid>

                                <Grid item xs={1}>
                                    <VpnKey/>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        id="outlined-password"
                                        required
                                        error={this.state.passwordError}
                                        label="Palavra-passe"
                                        className={classes.textField}
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        margin="dense"
                                        fullWidth
                                        variant="outlined"
                                        onChange={this.handleChange('password')}
                                        helperText="A palavra-passe deverá conter pelo menos 8 caracteres alfa-númericos."
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Esconder/mostrar a password"
                                                        onClick={this.handleClickShowPassword}>
                                                        {this.state.showPassword ? <VisibilityOff/> :
                                                            <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                    <Button
                        className={classes.button}
                        fullWidth
                        variant="contained"
                        onClick={this.registerUser}>
                        Registar
                    </Button>
                    <Typography variant="caption">
                        Ao prosseguir está a aceitar os
                        <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"> Termos de Uso </a>
                        e
                        <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"> Políticas de Privacidade </a>
                        da savr.
                    </Typography>
                </form>
                {this.state.linearProgress && <LinearProgress/>}
            </div>
        );
    };

}

const styles = theme => ({
    textField: {
        flexBasis: 200,
    },
    margin: {
        margin: 20,
    }
});

export default withStyles(styles)(SignUp);
