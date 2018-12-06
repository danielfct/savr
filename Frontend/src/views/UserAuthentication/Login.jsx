import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import VpnKey from "@material-ui/icons/VpnKey";
import Email from "@material-ui/icons/Email";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "../../components/CustomButtons/Button";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import withStyles from "@material-ui/core/styles/withStyles";
import halfred from "halfred";
import {Link, Redirect, withRouter} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Fade from "@material-ui/core/Fade/Fade";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import MySnackbarContent from "../../components/Snackbar/MySnackBarContent";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {timedFetch} from "../../utils/Utils";

class Login extends React.Component {
    state = {
        passwordError: false,
        emailError: false,
        showPassword: false,
        email: "",
        password: "",
        linearProgress: false,
        authenticationError: false,
        authenticationErrorMsg: "",
    };

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    handleChange = name => event => {
        if (name === "email") {
            this.setState({emailError: false});
        }
        if (name === "password") {
            this.setState({passwordError: false});
        }
        this.setState({
            [name]: event.target.value,
        });
    };

    authenticateUser = event => {
        let invalid = false;
        if (!this.state.email) {
            this.setState({emailError: true});
            invalid = true;
        } else {
            this.setState({emailError: false});
        }
        if (!this.state.password) {
            this.setState({passwordError: true});
            invalid = true;
        } else {
            this.setState({passwordError: false});
        }
        if (invalid) {
            return;
        }
        event.preventDefault();
        this.setState({linearProgress: true});
        timedFetch('https://calm-basin-62001.herokuapp.com/savrUsers/search/findByEmail?email=' + this.state.email, null, 30000
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then((json) => {
            this.setState({linearProgress: false});
            let users = halfred.parse(json).embeddedResourceArray("savrUsers");
            if (users.length < 1 || users[0].password !== this.state.password) {
                this.setState({passwordError: true});
                this.setState({emailError: true});
            } else {
                this.props.onUserLogin({info: users[0], image: ""});
                this.props.history.push('/mainPage')
            }
        }).catch(error => {
            console.error('Error:', error.message);
            this.setState({linearProgress: false});
            this.setState({authenticationError: true});
            this.setState({authenticationErrorMsg: error.message.includes("Failed to fetch") ? "Erro de rede. Verifique a sua ligação." : error.message})
        });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({authenticationError: false});
    };

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.authenticateUser(event);
        }
    };

    render() {
        const {classes, history} = this.props;
        return (
            <div className={classes.margin}>
                {this.state.authenticationError &&
                <Snackbar
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    open={true}
                    autoHideDuration={3000}
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
                        message={"Ocorreu um erro na autenticação dos dados: " + this.state.authenticationErrorMsg}/>
                </Snackbar>}
                <form className={classes.container} onKeyPress={this.handleKeyPress}>
                    <Typography className={classes.margin} variant="title">
                        Introduz as credenciais
                    </Typography>
                    <Paper elevation={1}>
                        <div className={classes.margin}>
                            <Grid container padding={4} spacing={8} alignItems="center">
                                <Grid item xs={1}>
                                    <Email/>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        id="outlined-email"
                                        required
                                        error={this.state.emailError}
                                        label="Email"
                                        className={classes.textField}
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        margin="dense"
                                        variant="outlined"
                                        onChange={this.handleChange('email')}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={1}>
                                    <VpnKey/>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        id="outlined-password"
                                        required
                                        error={this.state.passwordError}
                                        label="Password"
                                        className={classes.textField}
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        margin="dense"
                                        onChange={this.handleChange('password')}
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Esconder/mostrar a password"
                                                        onClick={this.handleClickShowPassword}>
                                                        {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
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
                        onClick={this.authenticateUser}>
                        Entrar
                    </Button>
                </form>
                {this.state.linearProgress && <LinearProgress/>}
            </div>
        );
    }
}



const styles = theme => ({
    textField: {
        flexBasis: 200,
    },
    margin: {
        margin: 20,
    },
});

export default withStyles(styles)(Login);
