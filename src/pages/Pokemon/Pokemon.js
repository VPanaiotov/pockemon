import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { pokemonDescriptionURL, pokemonsURL } from '../../providers/constants';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import ForwardIcon from '@material-ui/icons/Forward';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        marginTop: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& button': {
            marginTop: 20
        }
    },
    cardRoot: {
        maxWidth: 500,
        margin: '0 auto'
    },
    loadingSpinner: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50,
        '& > div': {
            width: 70,
            height: 70
        }
    },
    avatar: {
        height: 96,
        width: 96
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            '& div:first-of-type': {
                marginBottom: 20
            }
        }
    },
    bold: {
        fontWeight: 'bold'
    }
}));

const PokemonsPage = (props) => {
    const classes = useStyles();
    const [pokemon, setPokemon] = useState({});
    const [description, setDescription] = useState('');

    const getDetails = async () => {
        const pokemonDetails = await fetch(pokemonsURL+'/'+props.match.params.id).then((res) => res.json());
        if(pokemonDetails) {
            setPokemon(pokemonDetails);
            console.log('here', pokemonDetails);
        }

        const descriptionDetails = await fetch(pokemonDescriptionURL+props.match.params.id).then((res) => res.json());
        if(descriptionDetails) {
            setDescription(descriptionDetails?.descriptions?.find((el) => el.language.name === 'en').description);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    const renderPokemon = () => {
        if(!pokemon) {
            return (
                <Box className={classes.loadingSpinner}>
                    <CircularProgress />
                </Box>
            );
        }
        else {
            return (
                <Card className={classes.cardRoot}>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="96"
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.match.params.id}.png`}
                            />
                        </Avatar>
                        }
                        title={'Name: ' + pokemon.name}
                        subheader={`Description: ${description ? description : 'Missing'}`}
                    />
                    <CardContent className={classes.cardContent}>
                        <div>
                            <Typography paragraph className={classes.bold}>Statistics:</Typography>
                            {pokemon?.stats?.map((el) => (
                                <Typography paragraph key={'stat-'+el.stat.name}>
                                    {el.stat.name} - {el.base_stat}
                                </Typography>
                            ))}
                        </div>
                        <div>
                            <Typography paragraph className={classes.bold}>Abilities:</Typography>
                            {pokemon?.abilities?.map((el) => (
                                <Typography paragraph key={'ability-'+el.ability.name}>
                                    {el.ability.name} - {el.is_hidden ? 'Hidden' : 'Not hidden'}
                                </Typography>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            );
        }
    };

    return (
        <div className={classes.root}>
            {renderPokemon()}
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

export default PokemonsPage;