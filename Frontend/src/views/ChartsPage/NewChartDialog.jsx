import React from "react";
import {DatePicker} from 'material-ui-pickers';
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Divider from "@material-ui/core/Divider/Divider";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";

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
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import SvgLineChart from "../../assets/icons/svgLineChart";
import SvgPieChart from "../../assets/icons/svgPieChart";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import SvgDoubleLineChart from "../../assets/icons/svgDoubleLineChart";

class NewChartDialog extends React.Component {
    state = {
        title: "",
        chartType: "",
        categoryType: "",
        category: "",
        firstInitialDate: new Date(),
        firstFinalDate: new Date(),
        secondInitialDate: new Date(),
        secondFinalDate: new Date(),
        dataAggregation: "",
        noTitleError: false,
        noChartTypeError: false,
        noCategoryTypeError: false,
        noCategoryError: false,
        noFirstInitialDateError: false,
        noFirstFinalDateError: false,
        noSecondInitialDateError: false,
        noSecondFinalDateError: false,
        noDataAggregationError: false
    };

    handleChangeDate = name => date => {
        if (name === "firstInitialDate") {
            this.setState({noFirstInitialDateError: false});
        } else if (name === "firstFinalDate") {
            this.setState({noFirstFinalDateError: false});
        }
        if (name === "secondInitialDate") {
            this.setState({noSecondInitialDateError: false});
        } else if (name === "secondFinalDate") {
            this.setState({noSecondFinalDateError: false});
        }
        this.setState({
            [name]: date
        });
    };

    handleChange = name => event => {
        if (name === "title") {
            this.setState({noTitleError: false});
        } else if (name === "chartType") {
            this.setState({noChartTypeError: false});
        } else if (name === "categoryType") {
            this.setState({noCategoryTypeError: false});
        } else if (name === "category") {
            this.setState({noCategoryError: false});
        } else if (name === "dataAggregation") {
            this.setState({noDataAggregationError: false});
        }
        this.setState({
            [name]: event.target.value,
        });
    };

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.handleConfirmNewChart();
        }
    };

    handleCancel = () => {
        this.props.handleCancel();
    };

    handleConfirmNewChart = () => {
        let invalid = false;
        if (!this.state.title) {
            this.setState({noTitleError: true});
            invalid = true;
        }
        if (!this.state.chartType) {
            this.setState({noChartTypeError: true});
            invalid = true;
        }
        if (!this.state.categoryType) {
            this.setState({noChartTypeError: true});
            invalid = true;
        }
        if (this.isChartWithCategory() && !this.state.category) {
            this.setState({noCategoryError: true});
            invalid = true;
        }
        if (!this.state.firstInitialDate) {
            this.setState({noFirstInitialDateError: true});
            invalid = true;
        }
        if (!this.state.firstFinalDate) {
            this.setState({noFirstFinalDateError: true});
            invalid = true;
        }
        if (this.isChartWithSecondDate() && !this.state.secondInitialDate) {
            this.setState({noSecondInitialDateError: true});
            invalid = true;
        }
        if (this.isChartWithSecondDate() && !this.state.secondFinalDate) {
            this.setState({noSecondFinalDateError: true});
            invalid = true;
        }
        if (!this.state.dataAggregation) {
            this.setState({noDataAggregationError: true});
            invalid = true;
        }
        if (!invalid) {
            this.props.handleConfirm(this.state.title, this.state.chartType, this.state.categoryType, this.state.category,
                this.state.firstInitialDate, this.state.firstFinalDate, this.state.secondInitialDate, this.state.secondFinalDate,
                this.state.dataAggregation);
        }
    };

    isChartWithCategory = () => {
        return this.state.chartType.includes("Uma categoria");
    };

    isChartWithSecondDate = () => {
        return this.state.chartType.includes("intervalos de tempo distintos");
    };

    render() {
        const {classes, handleCancel} = this.props;
        return (
            <Dialog
                open={true}
                onClose={this.handleCancel}
                onKeyPress={this.handleKeyPress}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Novo gráfico</DialogTitle>
                <Divider/>
                <DialogContent>
                    <form className={classes.container}>
                        <GridContainer padding={10} spacing={8} alignItems="center">
                            <GridItem xs={3}>
                                <Typography variant={"body2"}>Título do gráfico</Typography>
                            </GridItem>
                            <GridItem xs={9}>
                                <TextField
                                    className={classes.textField}
                                    error={this.state.noTitleError}
                                    label="Título"
                                    type="text"
                                    onChange={this.handleChange('title')}
                                    margin="dense"
                                    fullWidth
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
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={3}>
                                <Typography variant={"body2"}>Tipo de gráfico</Typography>
                            </GridItem>
                            <GridItem xs={3}>
                                <RadioGroup
                                    className={classes.group}
                                    value={this.state.categoryType}
                                    onChange={this.handleChange("categoryType")}>
                                    <FormControlLabel value="Receita"
                                                      control={<Radio />}
                                                      label="Receita"
                                                      required
                                                      error={this.state.noCategoryTypeError ? "Obrigatório." : undefined}
                                                      checked={this.state.categoryType === 'Receita'}/>
                                    <FormControlLabel value="Despesa"
                                                      control={<Radio />}
                                                      label="Despesa"
                                                      checked={this.state.categoryType === 'Despesa'}/>
                                </RadioGroup>
                            </GridItem>
                            <GridItem xs={6}>
                                <TextField
                                    id="outlined-select-chart"
                                    disabled={this.state.categoryType === ""}
                                    error={this.state.noChartTypeError}
                                    select
                                    fullWidth
                                    value={this.state.chartType}
                                    label="Tipo de gráfico"
                                    className={classes.textField}
                                    onChange={this.handleChange('chartType')}
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
                                    variant="outlined">
                                    <MenuItem value="">Seleciona o tipo de gráfico...</MenuItem>
                                    <Divider/>
                                    <MenuItem value={this.state.categoryType + " ao longo do tempo"}>
                                        <SvgLineChart className={classes.icon}/>{this.state.categoryType + " ao longo do tempo"}
                                    </MenuItem>
                                    <MenuItem value="Comparação em intervalos de tempo distintos">
                                        <SvgDoubleLineChart className={classes.icon}/>Comparação em intervalos de tempo distintos
                                    </MenuItem>
                                    <MenuItem value="Comparação de categorias num intervalo de tempo">
                                        <SvgPieChart className={classes.icon}/>Comparação de categorias num intervalo de tempo
                                    </MenuItem>
                                    <MenuItem value="Uma categoria ao longo do tempo">
                                        <SvgLineChart className={classes.icon}/> Uma categoria ao longo do tempo
                                    </MenuItem>
                                </TextField>
                            </GridItem>
                            <GridItem xs={3}>
                                <Typography variant={"body2"}
                                            className={!this.isChartWithCategory() ? classes.disabledCategory : null}>
                                    Categoria
                                </Typography>
                            </GridItem>
                            {!this.isChartWithCategory() &&
                            <GridItem xs={9}>
                                <TextField
                                    select
                                    fullWidth
                                    disabled={true}
                                    value={this.state.category}
                                    label="Categoria"
                                    className={classes.textField}
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
                                    variant="outlined">
                                    <MenuItem value="">Seleciona a categoria...</MenuItem>
                                </TextField>
                            </GridItem>}
                            {this.state.categoryType === "Receita" &&
                            this.isChartWithCategory() &&
                            <GridItem xs={9}>
                                <TextField
                                    error={this.state.noCategoryError}
                                    select
                                    value={this.state.category}
                                    label="Categoria"
                                    fullWidth
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
                                    variant="outlined">
                                    <MenuItem value="">Seleciona a categoria...</MenuItem>
                                    <Divider/>
                                    <MenuItem value="Salário"><AttachMoneyOutlined
                                        className={classes.icon}/>Salário</MenuItem>
                                    <MenuItem value="Empréstimo"><AccountBalanceOutlined className={classes.icon}/>Empréstimo</MenuItem>
                                    <MenuItem value="Oferta"><CardGiftcardOutlined
                                        className={classes.icon}/>Oferta</MenuItem>
                                    <MenuItem value="Prémio"><CreditCardOutlined
                                        className={classes.icon}/>Prémio</MenuItem>
                                </TextField>
                            </GridItem>}

                            {this.state.categoryType === "Despesa" &&
                            this.isChartWithCategory() &&
                            <GridItem xs={9}>
                                <TextField
                                    error={this.state.noCategoryError}
                                    select
                                    fullWidth
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
                                    variant="outlined">
                                    <MenuItem value="">Seleciona a categoria...</MenuItem>
                                    <Divider/>
                                    <MenuItem value="Casa"><HomeOutlined className={classes.icon}/>Casa</MenuItem>
                                    <MenuItem value="Impostos"><MoneyOffOutlined
                                        className={classes.icon}/>Impostos</MenuItem>
                                    <MenuItem value="Restauração"><RestaurantOutlined className={classes.icon}/>Restauração</MenuItem>
                                    <MenuItem value="Transporte"><CommuteOutlined
                                        className={classes.icon}/>Transporte</MenuItem>
                                    <MenuItem value="Educação"><SchoolOutlined
                                        className={classes.icon}/>Educação</MenuItem>
                                    <MenuItem value="Saúde"><HealingOutlined className={classes.icon}/>Saude</MenuItem>
                                    <MenuItem value="Férias"><FlightOutlined className={classes.icon}/>Férias</MenuItem>
                                    <MenuItem value="Diversão"><MoodOutlined
                                        className={classes.icon}/>Diversão</MenuItem>
                                    <MenuItem value="Animais de Estimação"><PetsOutlined className={classes.icon}/>Animais
                                        de
                                        Estimação</MenuItem>
                                </TextField>
                            </GridItem>}
                            <GridItem xs={3}>
                                <Typography variant={"body2"}>{
                                    this.isChartWithSecondDate() ?
                                        "Primeiro intervalo de tempo" : "Intervalo de tempo"}
                                </Typography>
                            </GridItem>
                            <GridItem xs={9} className={classes.dateFields}>
                                <MuiThemeProvider theme={dataPickerTheme}>
                                    <DatePicker
                                        value={this.state.firstInitialDate}
                                        onChange={this.handleChangeDate("firstInitialDate")}
                                        format='DD MMMM, YYYY'
                                        error={this.state.noFirstInitialDateError}/>
                                    <DatePicker
                                        value={this.state.firstFinalDate}
                                        onChange={this.handleChangeDate("firstFinalDate")}
                                        format='DD MMMM, YYYY'
                                        error={this.state.noFirstFinalDateError}/>
                                </MuiThemeProvider>
                            </GridItem>
                            {this.isChartWithSecondDate() &&
                            <GridItem xs={3}>
                                <Typography variant={"body2"}>Segundo intervalo de tempo</Typography>
                            </GridItem>}
                            {this.isChartWithSecondDate() &&
                            <GridItem xs={9} className={classes.dateFields}>
                                <MuiThemeProvider theme={dataPickerTheme}>
                                    <DatePicker
                                        value={this.state.secondInitialDate}
                                        onChange={this.handleChangeDate("secondInitialDate")}
                                        format='DD MMMM, YYYY'
                                        error={this.state.noSecondInitialDateError}/>
                                    <DatePicker
                                        value={this.state.secondFinalDate}
                                        onChange={this.handleChangeDate("secondFinalDate")}
                                        format='DD MMMM, YYYY'
                                        error={this.state.noSecondFinalDateError}/>
                                </MuiThemeProvider>
                            </GridItem>}
                            <GridItem xs={3}>
                                <Typography variant={"body2"}>
                                    Agregação de dados
                                </Typography>
                            </GridItem>
                            <GridItem xs={9}>
                                <TextField
                                    error={this.state.noDataAggregationError}
                                    select
                                    value={this.state.dataAggregation}
                                    label="Agregação de dados"
                                    fullWidth
                                    className={classes.textField}
                                    onChange={this.handleChange('dataAggregation')}
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
                                    variant="outlined">
                                    <MenuItem value="">Seleciona o tipo de agregação de dados...</MenuItem>
                                    <Divider/>
                                    <MenuItem value="Diária">Diária</MenuItem>
                                    <MenuItem value="Semanal">Semanal</MenuItem>
                                    <MenuItem value="Mensal">Mensal</MenuItem>
                                    <MenuItem value="Anual">Anual</MenuItem>
                                </TextField>
                            </GridItem>
                        </GridContainer>
                    </form>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick={() => handleCancel()} className={classes.dialogCancelButton}>
                        Cancelar
                    </Button>
                    <Button onClick={this.handleConfirmNewChart} className={classes.dialogConfirmButton}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const dataPickerTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {main: '#03a000'},
    },
});

const style = theme => ({
    dialogCancelButton: {
        color: "#ff0000"
    },
    dialogConfirmButton: {
        color: "#03a000",
    },
    textField: {
        flexBasis: 200,
    },
    margin: {
        margin: 20,
    },
    container: {
        padding: "10px",
        margin: "10px",
    },
    icon: {
        marginRight: "10px",
        color: "#888888"
    },
    dateFields: {
        display: "flex",
        justifyContent: "space-between"
    },
    disabledCategory: {
        textDecoration: "line-through"
    },
    selectionText: {
        marginLeft: "10px"
    },
    whiteOutlinedInput: {
        '&$whiteFocused $notchedOutline': {
            borderColor: `#ffffff !important`,
        }
    },
    whiteFocused: {
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
});

export default withStyles(style)(NewChartDialog);
