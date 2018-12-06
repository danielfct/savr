import React from "react";
import Footer from "../../components/Footer/Footer";
import SavrHeaderLinks from "../../components/Header/SavrHeaderLinks";
import Header from "../../components/Header/Header";
import Paper from "@material-ui/core/Paper/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { container, title } from "assets/jss/savr.jsx";
import HistoryTable from "./HistoryTable";
import {DESPESA, RECEITA} from "../../variables/history";

class HistoryPage extends React.Component {
    state = {
        search: "",
    };

    predicate = (entry, search) => {
        return entry.category.indexOf(search) !== -1 ||
            ("despesa".indexOf(search) !== -1 && entry.type === DESPESA) ||
            ("receita".indexOf(search) !== -1 && entry.type === RECEITA) ||
            entry.message.indexOf(search) !== -1 ||
            entry.date.toLocaleDateString("pt").indexOf(search) !== -1 ||
            entry.description.indexOf(search) !== -1;
    };

    onSearchUpdate = (search) => {
        this.setState({search: search});
    };

    render() {
        const {classes, user, onUserLogout, userHistory, onUpdateHistory, ...rest} = this.props;
        return (
            <div className={classes.content}>
                <div className={classes.container}>
                    <Header
                        dark
                        fixed
                        href
                        user={user}
                        searchBar
                        onSearchUpdate={this.onSearchUpdate}
                        rightLinks={<SavrHeaderLinks {...rest} current={this.props.location.pathname} user={user} onUserLogout={onUserLogout}/>}
                        {...rest}/>
                    <Paper>
                        <HistoryTable userHistory={userHistory.filter(e => this.predicate(e, this.state.search))}
                                      onUpdateHistory={onUpdateHistory}/>
                    </Paper>
                </div>
                <Footer/>
            </div>
        );
    }
}

const styles = {
    container: {
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        ...container
    },
    content: {
        marginTop: "70px",
        padding: "30px 15px",
    }
};


export default withStyles(styles)(HistoryPage);

