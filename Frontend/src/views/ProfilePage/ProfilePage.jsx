import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import profile from "../../assets/images/avatar.jpg";

import SavrHeaderLinks from "../../components/Header/SavrHeaderLinks";
import {container, title} from "assets/jss/savr.jsx";
import Grid from "@material-ui/core/Grid/Grid";
import Email from "@material-ui/icons/Email";
import TextField from "@material-ui/core/TextField/TextField";
import {timedFetch} from "../../utils/Utils";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Person from "@material-ui/icons/Person";
import VpnKey from "@material-ui/icons/VpnKey";
import Button from "../../components/CustomButtons/Button";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Fade from "@material-ui/core/Fade/Fade";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import MySnackbarContent from "../../components/Snackbar/MySnackBarContent";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import halfred from "halfred";
import Typography from "@material-ui/core/Typography/Typography";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstnameError: false,
            lastnameError: false,
            emailError: false,
            passwordError: false,
            email: props.user.info.email,
            firstname: props.user.info.firstName,
            lastname: props.user.info.lastName,
            imageUrl: props.user.image,
            password: "",
            showPassword: false,
            linearProgress: false,
            updateError: false,
            updateErrorMsg: "",
            userUpdated: false,
            image: '',
            imageInput: React.createRef()
        };
    }

    updateUser = event => {
        event.preventDefault();
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
        if (this.state.password && this.state.password.length < 8) {
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
        console.log(this.props.user.info)
        timedFetch(this.props.user.info.link("self").href, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                email: this.state.email,
                password: this.state.password.length > 7 ? this.state.password : this.props.user.info.password
            })
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(json => {
            this.props.user.info.email = this.state.email;
            this.props.user.info.firstName = this.state.firstname;
            this.props.user.info.lastName = this.state.lastname;
            if (this.state.password.length > 7)
                this.props.user.info.password =  this.state.password;
            this.props.onUserUpdate({info: this.props.user.info, image: this.state.imageUrl});
            this.setState({linearProgress: false});
            this.setState({firstnameError: false});
            this.setState({lastnameError: false});
            this.setState({emailError: false});
            this.setState({passwordError: false});
            this.setState({userUpdated: true});
        }).catch(error => {
            console.error('Error:', error.message);
            this.setState({linearProgress: false});
            this.setState({updateError: true});
            this.setState({updateErrorMsg: error.message.includes("Failed to fetch") ? "Erro de rede." : error.message})
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
        this.setState({updateError: false});
        this.setState({userUpdated: false});
    };

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                image: file,
                imageUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    render() {
        const {classes, user, onUserLogout, ...rest} = this.props;
        let url = this.state.imageUrl ? this.state.imageUrl : profile;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid,
            classes.pointer
        );
        const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
        return (
            <div className={classes.content}>
                <div className={classes.container}>
                    <Header
                        dark
                        fixed
                        href
                        user={user}
                        rightLinks={<SavrHeaderLinks {...rest} current={this.props.location.pathname} user={user}
                                                     onUserLogout={onUserLogout}/>}
                        {...rest}
                    />
                    {this.state.userUpdated &&
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
                            variant="success"
                            message={"Utilizador '" + this.state.email + "' atualizado com sucesso."}/>
                    </Snackbar>}
                    {this.state.updateError &&
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
                            message={"Ocorreu um erro ao atualiar a informação da conta: " + this.state.registerErrorMsg}/>
                    </Snackbar>}
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}>
                                <div className={classes.profile}>
                                    <div>
                                        <img src={url}
                                             alt="..."
                                             className={imageClasses}
                                             onClick={(e) => this.state.imageInput.click()}/>
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>{user.info.firstName + " " + user.info.lastName}</h3>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <form onSubmit={(e)=>this.updateUser(e)}>
                            <input className={classes.fileInput}
                                   type="file"
                                   onChange={(e) => this.handleImageChange(e)}
                                   ref={(input) => { this.state.imageInput = input }}/>
                            <GridContainer alignItems="center" direction="column" justify="center">
                                <GridItem xs={12} sm={12} md={8}>
                                    <GridContainer alignItems={"center"}>
                                        <GridItem xs={12} sm={12} md={1}>
                                            <Person className={classes.icon}/>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={11}>
                                            <TextField
                                                id="outlined-firstname"
                                                error={this.state.firstnameError}
                                                label="Primeiro Nome"
                                                className={classes.textField}
                                                margin="dense"
                                                onChange={this.handleChange('firstname')}
                                                fullWidth
                                                variant="outlined"
                                                value={this.state.firstname}
                                                InputLabelProps={{
                                                    className: classes.input
                                                }}
                                                InputProps={{
                                                    classes: {
                                                        root: classes.whiteOutlinedInput,
                                                        focused: classes.whiteFocused,
                                                        notchedOutline: classes.notchedOutline,
                                                        input: classes.whiteInput,
                                                    },
                                                }}/>
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={8}>
                                    <GridContainer alignItems={"center"}>
                                        <GridItem xs={12} sm={12} md={1}>
                                            <Person className={classes.icon}/>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={11}>
                                            <TextField
                                                id="outlined-lastname"
                                                error={this.state.lastnameError}
                                                label="Último Nome"
                                                className={classes.textField}
                                                margin="dense"
                                                onChange={this.handleChange('lastname')}
                                                fullWidth
                                                value={this.state.lastname}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    className: classes.input
                                                }}
                                                InputProps={{
                                                    classes: {
                                                        root: classes.whiteOutlinedInput,
                                                        focused: classes.whiteFocused,
                                                        notchedOutline: classes.notchedOutline,
                                                        input: classes.whiteInput,
                                                    },
                                                }}/>
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={8}>
                                    <GridContainer alignItems={"center"}>
                                        <GridItem xs={12} sm={12} md={1}>
                                            <Email className={classes.icon}/>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={11}>
                                            <TextField
                                                id="outlined-email"
                                                error={this.state.emailError}
                                                label="Email"
                                                className={classes.textField}
                                                type="email"
                                                name="email"
                                                autoComplete="email"
                                                margin="dense"
                                                variant="outlined"
                                                value={this.state.email}
                                                onChange={this.handleChange('email')}
                                                fullWidth
                                                InputLabelProps={{
                                                    className: classes.input
                                                }}
                                                InputProps={{
                                                    classes: {
                                                        root: classes.whiteOutlinedInput,
                                                        focused: classes.whiteFocused,
                                                        notchedOutline: classes.notchedOutline,
                                                        input: classes.whiteInput,
                                                    },
                                                }}/>
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={8}>
                                    <GridContainer alignItems={"center"}>
                                        <GridItem xs={12} sm={12} md={1}>
                                            <VpnKey className={classes.icon}/>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={11}>
                                            <TextField
                                                id="outlined-password"
                                                error={this.state.passwordError}
                                                label="Nova palavra-passe"
                                                className={classes.textField}
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                autoComplete="current-password"
                                                margin="dense"
                                                variant="outlined"
                                                fullWidth
                                                onChange={this.handleChange('password')}
                                                helperText="A nova palavra-passe deverá conter pelo menos 8 caracteres alfa-númericos."
                                                value={this.state.password}
                                                InputLabelProps={{
                                                    className: classes.input
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="Esconder/mostrar a password"
                                                                onClick={this.handleClickShowPassword}>
                                                                {this.state.showPassword ? <VisibilityOff className={classes.icon}/> :
                                                                    <Visibility className={classes.icon}/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    classes: {
                                                        root: classes.whiteOutlinedInput,
                                                        focused: classes.whiteFocused,
                                                        notchedOutline: classes.notchedOutline,
                                                        input: classes.whiteInput,
                                                    },
                                                }}/>
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <Button
                                        className={classes.button}
                                        fullWidth
                                        variant="outlined"
                                        onClick={(e) => this.updateUser(e)}>
                                        <Typography variant={"subtitle1"}>Atualizar</Typography>
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        </form>
                        {this.state.linearProgress && <LinearProgress/>}
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

const styles = {
    imgFluid: {
        maxWidth: "100%",
        height: "24"
    },
    imgRounded: {
        borderRadius: "50%"
    },
    imgRoundedCircle: {
        borderRadius: "50% !important"
    },
    imgRaised: {
        boxShadow:
            "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    profile: {
        textAlign: "center",
        "& img": {
            width: "125px",
            height: "125px",
            margin: "0 auto",
            transform: "translate3d(0, -50%, 0)"
        }
    },
    name: {
        marginTop: "-80px"
    },
    main: {
        position: "relative",
        zIndex: "3",
        padding: "0 100px 25px 100px"
    },
    mainRaised: {
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    title: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none",
        color: "#fff"
    },
    container: {
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        ...container
    },
    content: {
        marginTop: "125px",
        marginLeft: "200px",
        marginRight: "200px",
        paddingRight: "50px",
        padding: "30px 15px",
    },
    item: {
        textAlign: "center"
    },
    icon: {
        marginRight: "10px",
        color: "#888888"
    },
    whiteOutlinedInput: {
        '&$whiteFocused $notchedOutline': {
            borderColor: `#ffffff !important`,
        }
    },
    whiteFocused: {
        color: "#fff"
    },
    notchedOutline: {
        borderWidth: '0.5px',
    },
    whiteInput: {
        color: "#fff"
    },
    button: {
        marginTop: "30px"
    },
    input: {
        color: "#e1e1e1 !important"
    },
    fileInput: {
        position: "absolute",
        left: "-9999px"
    },
    pointer: {
        cursor: "pointer"
    }
};

export default withStyles(styles)(ProfilePage);
