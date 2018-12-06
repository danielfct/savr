import React from "react";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ArrowRight from '@material-ui/icons/ArrowRight';
import {HomeOutlined, RestaurantOutlined} from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({

});


class SuggestionSection extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <List>
                    <ListItem divider>
                        <ListItemIcon>
                            <HomeOutlined className={classes.icon}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Casa"
                            secondary="Os gastos com a Casa são os que mais pesam no seu orçamento.
                            Já considerou trocar as lâmpadas convencionais por lâmpadas LED?"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <RestaurantOutlined className={classes.icon}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Restauração"
                            secondary="Sabia que cozinhar em casa é muito mais barato e saudável que
                            comer fora?"
                        />
                    </ListItem>
                </List>
            </div>
        );
    }
}

const style = theme => ({
    icon: {
        color: "#888888"
    },
});


export default withStyles(style)(SuggestionSection);

