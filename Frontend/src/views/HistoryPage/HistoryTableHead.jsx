import React from "react";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

const rows = [
    { id: 'date', numeric: false, disablePadding: true, label: 'Data' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Tipo' },
    { id: 'category', numeric: false, disablePadding: false, label: 'Categoria' },
    { id: 'value', numeric: false, disablePadding: false, label: 'Valor' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Descrição' }
];

const checkBoxStyles = theme => ({
    root: {
        '&$checked': {
            color:  "rgba(181, 9, 25, 0.5)",
        },
    },
    checked: {},
})

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

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
                        <Checkbox
                            classes={{
                                root: classes.root,
                            }}
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
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

export default withStyles(historyTableHeadStyle)(HistoryTableHead);
