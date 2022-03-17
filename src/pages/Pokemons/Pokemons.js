import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RepositoriesContext from '../../providers/PokemonsContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        textAlign: 'center'
    },
    list: {
        margin: '20px auto',
        maxWidth: 600,
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'auto auto auto'
        }
    },
    listItem: {
        textAlign: 'center',
        borderBottom: '1px solid grey',
        borderLeft: '1px solid grey'
    },
    noBorderLeft: {
        [theme.breakpoints.up('md')]: {
            borderLeft: 0
        }
    },
    noBorderLeftMobile: {
        [theme.breakpoints.down('sm')]: {
            borderLeft: 0
        }
    }
}));

const PokemonsPage = () => {
    const classes = useStyles();
    const initialPokemons = useContext(RepositoriesContext).pokemons;
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        if(Array.isArray(initialPokemons) && initialPokemons.length > 0) {
            setPokemons(initialPokemons);
        }
    }, [initialPokemons]);

    return (
        <div className={classes.root}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30}}>
                <h1>List of pokemons</h1>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(event) => {
                    setPokemons(initialPokemons.filter((el) => el.name.includes(event.target.value)))
                }}/>
            </div>
            <List component="nav" className={classes.list}>
                {pokemons.length > 0 ? pokemons.map((pokemon, i) => (
                    <ListItem button component="a" href={'pokemons/'+pokemon.url.split('/')[pokemon.url.split('/').length-2]} 
                        className={`${classes.listItem} ${i === 0 || i % 5 === 0 ? classes.noBorderLeft : ''} ${i === 0 || i % 3 === 0 ? classes.noBorderLeftMobile : ''}`}
                        key={'pokemon-'+pokemon.name}>
                        <ListItemText primary={pokemon.name} />
                    </ListItem>
                ))
                : null}
            </List>
        </div>
    );
};

export default PokemonsPage;