import React, {Component} from 'react';
import {Grid, Paper, Typography} from '@material-ui/core/';
import database from './database';
import './Monsters.css';

class Monsters extends Component {
 
  constructor(){
    super();
    this.state = {
      randomMonsters: [],
      character: null,
      enemy: null
    }
  }

  componentDidMount = () => {
    const shuffled = database.sort(() => 0.5 - Math.random()).slice(0, 4);
    this.setState({
      randomMonsters: shuffled
    })  
  }

  comments = () => {
    if (!this.state.character){
      return "Choose your character"
    }
    if (this.state.character && !this.state.enemy){
      return "Choose your enemy"
    }
  } 
  
  gridOnClick = (id) => {

    const monster = database.filter(m => m.id === id)
    this.setState({
      character: monster
    })
  }

  render(){

    console.log(this.state)

    return(
      <Grid container spacing={2} direction="row" alignItems="center" justify="center" style={{height: 500}}>
        {this.state.randomMonsters.map(m => {
          return (
            <Grid 
              className='item' 
              item 
              key={m.id}
              onClick={() => this.gridOnClick(m.id)}
            >
              <Paper elevation={5}>
                <img alt='monster' src={`https://robohash.org/${m.id}?set=set2&size=200x200`}/>
                <Typography align='center' variant='h6' color='inherit'>{m.name}</Typography>
              </Paper>
            </Grid>
          )
        })}
        <Typography variant='h5'>{this.comments()}</Typography>
      </Grid>
    )
  }
}

export default Monsters;