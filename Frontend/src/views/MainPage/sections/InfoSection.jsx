import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Button from "@material-ui/core/Button/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Grid from "@material-ui/core/Grid/Grid";
import EuroSymbolOutlined from "@material-ui/icons/EuroSymbolOutlined";
import CategoryOutlined from "@material-ui/icons/CategoryOutlined";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import BorderColorOutlined from "@material-ui/icons/BorderColorOutlined";
import Divider from "@material-ui/core/Divider/Divider";


import HomeOutlined from "@material-ui/icons/HomeOutlined";
import MoneyOffOutlined from "@material-ui/icons/MoneyOffOutlined";
import RestaurantOutlined from "@material-ui/icons/RestaurantOutlined";
import CommuteOutlined from "@material-ui/icons/CommuteOutlined";
import SchoolOutlined from "@material-ui/icons/SchoolOutlined";
import HealingOutlined from "@material-ui/icons/HealingOutlined";
import FlightOutlined from "@material-ui/icons/FlightOutlined";
import MoodOutlined from "@material-ui/icons/MoodOutlined";
import PetsOutlined from "@material-ui/icons/PetsOutlined";
import AttachMoneyOutlined from "@material-ui/icons/AttachMoneyOutlined";
import AccountBalanceOutlined from "@material-ui/icons/AccountBalanceOutlined";
import CardGiftcardOutlined from "@material-ui/icons/CardGiftcardOutlined";
import CreditCardOutlined from "@material-ui/icons/CreditCardOutlined";
import classNames from "classnames";


class InfoSection extends React.Component {
    state = {
        noAmountError: false,
        noCategoryError: false,
        newGainDialog: false,
        newSpendingDialog: false,
        spending: 0,
        gain: 0,
        category: "",
        description: ""
    };

    handleOpenGain = () => {
        this.setState({newGainDialog: true});
    };

    handleOpenSpending = () => {
        this.setState({newSpendingDialog: true});
    };

    handleConfirmGain = () => {
        let invalid = false;
        if (!this.state.gain || parseFloat(this.state.gain) <= 0.0) {
            this.setState({noAmountError: true});
            invalid = true;
        }
        if (!this.state.category) {
            this.setState({noCategoryError: true});
            invalid = true;
        }
        if (!invalid) {
            this.setState({noAmountError: false});
            this.setState({noCategoryError: false});
            this.setState({newGainDialog: false});
            this.props.onAddGain(parseFloat(this.state.gain), this.state.category, this.state.description);
            this.setState({category: ""});
        }
    };

    handleConfirmSpending = () => {
        let invalid = false;
        if (!this.state.spending || parseFloat(this.state.spending) <= 0.0) {
            this.setState({noAmountError: true});
            invalid = true;
        }
        if (!this.state.category) {
            this.setState({noCategoryError: true});
            invalid = true;
        }
        if (!invalid) {
            this.setState({noAmountError: false});
            this.setState({noCategoryError: false});
            this.setState({newSpendingDialog: false});
            this.props.onAddSpending(parseFloat(this.state.spending), this.state.category, this.state.description);
            this.setState({category: ""});
        }
    };

    handleCancel = () => {
        this.setState({newSpendingDialog: false});
        this.setState({newGainDialog: false});
        this.setState({noAmountError: false});
        this.setState({noCategoryError: false});
        this.setState({category: ""});
    };

    handleChange = name => event => {
        if (name === "gain" || name === "spending") {
            this.setState({noAmountError: false});
        } else if (name === "category") {
            this.setState({noCategoryError: false});
        }
        this.setState({
            [name]: event.target.value,
        });
    };

    handleKeyPress = form => event => {
        if (event.key === 'Enter') {
            if (form === "gain") {
                this.handleConfirmGain();
            } else if (form === "spending") {
                this.handleConfirmSpending();
            }
        }
    };

    render() {
        const {classes} = this.props;
        const {earnedValue, spentValue} = this.props;
        return (
            <div>
                <GridContainer className={classes.container}>
                    <GridItem xs={7} sm={7} md={7}>
                        <GridItem xs={8} sm={8} md={8} className={classes.item}>
                            <Typography variant={"body2"}>Receita:</Typography>
                            <Typography variant={"body2"}>{earnedValue + " €"}</Typography>
                        </GridItem>
                        <GridItem xs={8} sm={8} md={8} className={classes.item}>
                            <Typography variant={"body2"}>Gasto:</Typography>
                            <Typography variant={"body2"}>{spentValue + " €"}</Typography>
                        </GridItem>
                        <GridItem xs={8} sm={8} md={8} className={classes.balance}>
                            <Typography variant={"title"}>Balanço:</Typography>
                            <Typography variant={"title"}>{parseFloat((earnedValue - spentValue).toFixed(2)) + " €"}</Typography>
                        </GridItem>
                    </GridItem>
                    <GridItem xs={5} sm={5} md={5}>
                        <GridItem xs={12} sm={12} md={12}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color={"primary"}
                                fullWidth
                                onClick={this.handleOpenGain}>
                                Adicionar Receita
                            </Button>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color={"secondary"}
                                fullWidth
                                onClick={this.handleOpenSpending}>
                                Adicionar Despesa
                            </Button>
                        </GridItem>
                    </GridItem>
                </GridContainer>
                {this.state.newGainDialog &&
                <Dialog
                    open={true}
                    onClose={this.handleCancel}
                    onKeyPress={this.handleKeyPress("gain")}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Adicionar receita</DialogTitle>
                    <Divider color="white"/>
                    <DialogContent>
                        <form className={classes.container}>
                            <Grid container padding={4} spacing={8} alignItems="center">
                                <Grid item xs={1}>
                                    <EuroSymbolOutlined className={classes.icon}/>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        className={classNames(classes.textField, classes.floatingLabelFocusStyle)}
                                        error={this.state.noAmountError}
                                        label="Quantia"
                                        type="number"
                                        onChange={this.handleChange('gain')}
                                        margin="dense"
                                        fullWidth
                                        required
                                        variant={"outlined"}
                                        InputLabelProps={{
                                            classes: {
                                                focused: classes.greenFocused,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                root: classes.whiteOutlinedInput,
                                                focused: classes.whiteFocused,
                                                notchedOutline: classes.notchedOutline,
                                                input: classes.whiteInput,
                                            },
                                            inputProps: { min: 0 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <CategoryOutlined className={classes.icon}/>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        id="outlined-select-category"
                                        error={this.state.noCategoryError}
                                        select
                                        fullWidth
                                        required
                                        value={this.state.category}
                                        label="Categoria"
                                        className={classes.textField}
                                        onChange={this.handleChange('category')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        InputLabelProps={{
                                            classes: {
                                                focused: classes.greenFocused,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                root: classes.whiteOutlinedInput,
                                                focused: classes.whiteFocused,
                                                notchedOutline: classes.notchedOutline,
                                                input: classes.whiteInput,
                                            },
                                        }}
                                        margin="dense"
                                        variant="outlined"
                                    >
                                        <MenuItem value="">Seleciona a categoria...</MenuItem>
                                        <Divider color={"white"}/>
                                        <MenuItem value="Salário"><AttachMoneyOutlined className={classes.icon}/>Salário</MenuItem>
                                        <MenuItem value="Empréstimo"><AccountBalanceOutlined className={classes.icon}/>Empréstimo</MenuItem>
                                        <MenuItem value="Oferta"><CardGiftcardOutlined className={classes.icon}/>Oferta</MenuItem>
                                        <MenuItem value="Prémio"><CreditCardOutlined className={classes.icon}/>Prémio</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={1}>
                                    <BorderColorOutlined className={classes.icon}/>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        className={classes.textField}
                                        label="Descrição"
                                        helperText="Máximo de 100 letras"
                                        onChange={this.handleChange("description")}
                                        fullWidth
                                        multiline
                                        margin="dense"
                                        variant={"outlined"}
                                        rows={1}
                                        rowsMax={5}
                                        InputLabelProps={{
                                            classes: {
                                                focused: classes.greenFocused,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                root: classes.whiteOutlinedInput,
                                                focused: classes.whiteFocused,
                                                notchedOutline: classes.notchedOutline,
                                                input: classes.whiteInput,
                                            }
                                        }}/>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                    <Divider/>
                    <DialogActions>
                        <Button onClick={this.handleCancel} className={classes.dialogCancelButton}>
                            Cancelar
                        </Button>
                        <Button onClick={this.handleConfirmGain} className={classes.dialogConfirmButton}>
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>}
                {this.state.newSpendingDialog &&
                <Dialog
                    open={true}
                    onClose={this.handleCancel}
                    onKeyPress={this.handleKeyPress("spending")}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Adicionar Despesa</DialogTitle>
                    <Divider color={"white"}/>
                    <DialogContent>
                        <form className={classes.container}>
                            <Grid container padding={4} spacing={8} alignItems="center">
                                <Grid item xs={1}>
                                    <EuroSymbolOutlined className={classes.icon}/>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        className={classes.textField}
                                        error={this.state.noAmountError}
                                        required
                                        label="Quantia"
                                        type="number"
                                        onChange={this.handleChange('spending')}
                                        InputLabelProps={{
                                            classes: {
                                                focused: classes.redFocused,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                root: classes.whiteOutlinedInput,
                                                focused: classes.whiteFocused,
                                                notchedOutline: classes.notchedOutline,
                                                input: classes.whiteInput,
                                            },
                                            inputProps: { min: 0 }
                                        }}
                                        margin="dense"
                                        fullWidth
                                        variant={"outlined"}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <CategoryOutlined className={classes.icon}/>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        id="outlined-select-category"
                                        select
                                        fullWidth
                                        label="Categoria"
                                        error={this.state.noCategoryError}
                                        required
                                        className={classes.textField}
                                        onChange={this.handleChange('category')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        InputLabelProps={{
                                            classes: {
                                                focused: classes.redFocused,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                root: classes.whiteOutlinedInput,
                                                focused: classes.whiteFocused,
                                                notchedOutline: classes.notchedOutline,
                                                input: classes.whiteInput,
                                            },
                                        }}
                                        margin="dense"
                                        variant="outlined"
                                        value={this.state.category}>
                                        <MenuItem value="">Seleciona a categoria...</MenuItem>
                                        <Divider color={"white"}/>
                                        <MenuItem value="Casa"><HomeOutlined className={classes.icon}/>Casa</MenuItem>
                                        <MenuItem value="Impostos"><MoneyOffOutlined className={classes.icon}/>Impostos</MenuItem>
                                        <MenuItem value="Restauração"><RestaurantOutlined className={classes.icon}/>Restauração</MenuItem>
                                        <MenuItem value="Transporte"><CommuteOutlined className={classes.icon}/>Transporte</MenuItem>
                                        <MenuItem value="Educação"><SchoolOutlined className={classes.icon}/>Educação</MenuItem>
                                        <MenuItem value="Saúde"><HealingOutlined className={classes.icon}/>Saude</MenuItem>
                                        <MenuItem value="Férias"><FlightOutlined className={classes.icon}/>Férias</MenuItem>
                                        <MenuItem value="Diversão"><MoodOutlined className={classes.icon}/>Diversão</MenuItem>
                                        <MenuItem value="Animais de Estimação"><PetsOutlined className={classes.icon}/>Animais de
                                            Estimação</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={1}>
                                    <BorderColorOutlined className={classes.icon}/>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        className={classes.textField}
                                        label="Descrição"
                                        helperText="Máximo de 100 letras"
                                        onChange={this.handleChange("description")}
                                        fullWidth
                                        multiline
                                        margin="dense"
                                        variant={"outlined"}
                                        rows={1}
                                        rowsMax={5}
                                        InputLabelProps={{
                                            classes: {
                                                focused: classes.redFocused,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                root: classes.whiteOutlinedInput,
                                                focused: classes.whiteFocused,
                                                notchedOutline: classes.notchedOutline,
                                                input: classes.whiteInput,
                                            },
                                        }}/>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                    <Divider color={"white"}/>
                    <DialogActions>
                        <Button onClick={this.handleCancel} className={classes.dialogCancelButton}>
                            Cancelar
                        </Button>
                        <Button onClick={this.handleConfirmSpending} className={classes.dialogConfirmButton}>
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>}
            </div>
        );
    }
}

const infoSectionStyle = theme => ({
    dialogCancelButton: {
        color: "#ff0000"
    },
    dialogConfirmButton: {
        color: "#03a000",
    },
    container: {
        padding: "10px",
        margin: "10px",
    },
    item: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "10px"
    },
    balance: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "10px",
        marginTop: "20px",
        marginBottom: "10px"
    },
    button: {
        margin: "10px"
    },
    whiteOutlinedInput: {
        '&$whiteFocused $notchedOutline': {
            borderColor: `#ffffff !important`,
        }
    },
    whiteFocused: {
    },
    redFocused: {
        color: `#ff0000 !important`,
    },
    greenFocused: {
        color: `#00af00 !important`,
    },
    notchedOutline: {
        borderWidth: '0.5px',
    },
    whiteInput: {
        color: "#fff"
    },
    icon: {
        marginRight: "10px",
        color: "#888888"
    }
});

export default withStyles(infoSectionStyle)(InfoSection);
