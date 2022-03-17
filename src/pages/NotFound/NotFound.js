import React from 'react';
import Button from '@material-ui/core/Button';
import ForwardIcon from '@material-ui/icons/Forward';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        '& button': {
            width: 'fit-content',
            background: '#f44336',
            color: '#FFFFFF',
            '&:hover': {
                backgroundColor: '#c50000 !important'
            }
        }
    }
}));

const NotFound = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1 style={{ textAlign: 'center' }}>Sorry, the page you are trying to view does not exist!</h1>
            <Button
                variant="contained"
                endIcon={<ForwardIcon />}
                onClick={() => props.history.push('/pokemons')}
            >
                Go to Pokemons Page
            </Button>
        </div>
    );
};

export default NotFound;