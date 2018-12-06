import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {DESPESA} from "../../variables/history";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Fade from "@material-ui/core/Fade/Fade";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import MySnackbarContent from "../../components/Snackbar/MySnackBarContent";

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const checkBoxStyles = theme => ({
    root: {
        '&$checked': {
            color:  "rgba(181, 9, 25, 0.6)",
        },
    },
    checked: {},
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

const rows = [
    { id: 'date', numeric: false, disablePadding: false, label: 'Data' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Tipo' },
    { id: 'category', numeric: false, disablePadding: false, label: 'Categoria' },
    { id: 'amount', numeric: false, disablePadding: false, label: 'Valor' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Descrição' }
];

class HistoryTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <CustomCheckbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            disabled={rowCount === 0}
                            disable
                            checked={numSelected > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Ordenar"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

HistoryTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    }
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes, handleDelete } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit">
                        {numSelected + (numSelected === 1 ? " selecionado" : " selecionados")}
                    </Typography>
                ) : (
                    <Typography variant={"h6"} id="tableTitle">
                        Histórico do utilizador
                    </Typography>)}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Apagar">
                        <IconButton aria-label="Delete" onClick={() => handleDelete()}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (undefined)}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    icon: {
        marginRight: "5px"
    }
});

class HistoryTable extends React.Component {
    state = {
        order: 'desc',
        orderBy: 'date',
        selected: [],
        page: 0,
        rowsPerPage: 5,
        successDelete: false
    };

    handleDelete = () => {
        let {userHistory} = this.props;
        let {selected} = this.state;
        selected.forEach(e => {
            userHistory = userHistory.filter(elem => elem.id !== e)
        });
        selected.length = 0;
        this.setState({selected: selected});
        this.props.onUpdateHistory(userHistory);
        this.setState({successDelete: true})
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: this.props.userHistory.map(entry => entry.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleClose = (event, reason) => {
        this.setState({successDelete: false});
    };

    render() {
        const { classes, userHistory } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, userHistory.length - page * rowsPerPage);
        return (
            <div>
                {this.state.successDelete &&
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
                        message={"Histórico atualizado com sucesso."}/>
                </Snackbar>}
                <Paper className={classes.root}>
                    <EnhancedTableToolbar numSelected={selected.length} classes={classes} handleDelete={this.handleDelete}/>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <HistoryTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={userHistory.length}
                            />
                            <TableBody>
                                {stableSort(userHistory, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(entry => {
                                        const isSelected = this.isSelected(entry.id);
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, entry.id)}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={entry.id}
                                                selected={isSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <CustomCheckbox checked={isSelected} />
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">{entry.date.toLocaleDateString("pt")}</TableCell>
                                                <TableCell>{entry.type === DESPESA ? "Despesa" : "Receita"}</TableCell>
                                                <TableCell>{<entry.icon className={classes.icon}/>}{entry.category}</TableCell>
                                                <TableCell>{entry.amount + (entry.type === DESPESA ? " € gastos" : " € recebidos")}</TableCell>
                                                <TableCell>{entry.description}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={userHistory.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Página anterior',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Página seguinte',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        labelRowsPerPage={"Linhas por página"}
                    />
                </Paper>
            </div>
        );
    }
}

HistoryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistoryTable);
