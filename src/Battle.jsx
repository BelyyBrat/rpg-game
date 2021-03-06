import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Grid, Button, Typography, Paper } from '@material-ui/core';
import {
  setAttackButtonsStatus,
  setInventoryButtonStatus,
  applyAttack,
  setLegend,
  setSubtitle,
  applyEnemyAttack,
  setCharacterCardStyle,
  setEnemyCardStyle,
  setRoundTitle,
  setPageStatus,
  increaseBattlePageOpenCount
} from './actions';
import './Battle.css';

class Battle extends Component {

  allowApplyAttack = () => {
    const {setLegend, setAttackButtonsStatus, setInventoryButtonStatus, battlePageOpenCount} = this.props;
    if (battlePageOpenCount < 2){
      setLegend('Buttons became active now')
      setAttackButtonsStatus();
      setInventoryButtonStatus(false);
      const secondText = () => {
        setLegend('Make your choice from menu')
      }
      setTimeout(secondText, 1500);
    }
  }

  componentDidMount = () => {
    const {setLegend, battlePageOpenCount, setRoundTitle, randomMonsters, increaseBattlePageOpenCount} = this.props;
    increaseBattlePageOpenCount();
    if (randomMonsters.length === 2){
      setRoundTitle('Round 1');
    } else if (randomMonsters.length === 1){
      setRoundTitle('Round 2');
    } else {
      setRoundTitle('Round 3');
    }
    if (battlePageOpenCount < 1){
      const firstText = () => {
        setLegend('This is Battle Mode')
      }
      setLegend(null);
      setTimeout(firstText, 1000);
      setTimeout(this.allowApplyAttack, 2500);
    } else {
      setLegend('Welcome back to Battle Menu')
    }
  }

  textWrapping = (text, fontSize) => {
  return <Typography align='center' variant={fontSize} color='inherit'>{text}</Typography>
  }

  monsterCard = (monster) => {
    return (
      <Paper elevation={5}>
        <img alt='monster' src={`https://robohash.org/${monster.id}?set=set2&size=200x200`}/>
        {this.textWrapping(monster.name, 'h6')}
        {[`Attack: ${monster.attack}`, `Defense: ${monster.defense}`, `Health: ${monster.health}`, `Magic: ${monster.magic}`].map((m, idx) => {
          return (<div key={idx}>{this.textWrapping(m, 'subtitle1')}</div>)
        })
        }
      </Paper>          
    )
  }

  randomAttackValue = () => {
    const attackValues = [0, 5, 10, 15, 20];
    const randomValue = attackValues[Math.floor(Math.random() * attackValues.length)];
    return randomValue;
  }

  attack = (attackValue, monster, n) => {

    const {
      applyAttack,
      applyEnemyAttack,
      setCharacterCardStyle, 
      setAttackButtonsStatus,
      setInventoryButtonStatus,
      setLegend,
      setEnemyCardStyle,
      character,
      enemy,
      setPageStatus,
      randomMonsters
    } = this.props;

    if (n > 2){
      return;
    }

    let thirdTextWin = '';
    let thirdTextContinue = '';

    const secondStep = () => {
      if (monster.name === character.name){
        setLegend(`Enemy health damage is ${attackValue}`);
        setEnemyCardStyle(null);
      } else {
        setLegend(`Your health damage is ${attackValue}`);
        setCharacterCardStyle(null);
      }
    }
    const thirdStep = (text) => {
      setLegend(text);
      if (monster.name === character.name && enemy.health - attackValue > 0){
        this.attack(this.randomAttackValue(), enemy, n+1);
      }
      if (monster.name === enemy.name && character.health - attackValue > 0){
        setAttackButtonsStatus();
        setInventoryButtonStatus(false);
      }
    }
    const forthStep = () => {
      if (monster.name === character.name){
        setLegend('You win')
        setAttackButtonsStatus();
        setInventoryButtonStatus();
        randomMonsters.length > 0 ? setPageStatus('chooseMonsters') : setPageStatus('endGame')
      } else {
        setLegend('You lose')
        setPageStatus('endGame')
      }
    }
    setTimeout(secondStep, 1500);
    if (monster.name === character.name){
      applyAttack(attackValue);
      setEnemyCardStyle('monsterCard');      
      setAttackButtonsStatus();
      setInventoryButtonStatus(true);
      if (attackValue === character.attack){
        setLegend('You made standard attack');
      } else {
        setLegend('You made random attack')
      }
      thirdTextWin = 'Enemy health reached zero';
      thirdTextContinue = 'Now it\'s turn of your enemy';
      if (enemy.health - attackValue <= 0){
        setTimeout(() => thirdStep(thirdTextWin), 3000)
        setTimeout(forthStep, 4500)
      } else {
        setTimeout(() => thirdStep(thirdTextContinue), 4500);
      }        
    } else {
      applyEnemyAttack(attackValue);
      setCharacterCardStyle('monsterCard');
      setLegend('Your enemy made attack');
      thirdTextWin = 'Your health reached zero';
      thirdTextContinue = 'Now it\'s your turn';      
      if (character.health - attackValue <= 0){
        setTimeout(() => thirdStep(thirdTextWin), 3000)
        setTimeout(forthStep, 4500)
      } else {
        setTimeout(() => thirdStep(thirdTextContinue), 3000);
      }
    }
  }

  openInventory = () => {
    this.props.setPageStatus('inventory');
  }

  render(){

    const {character, enemy, attackButtons, inventoryButton, characterCard, enemyCard} = this.props;
    return (
      <React.Fragment>
        <Grid container justify='space-around'>
          <Grid item>
            {this.textWrapping('Your character', 'h5')}
            <div className={characterCard}>
              {this.monsterCard(character)}
            </div>
          </Grid>
          <Grid item>
            {this.textWrapping('Your enemy', 'h5')}
            <div className={enemyCard}>
              {this.monsterCard(enemy)}
            </div>
          </Grid>
        </Grid>
        <Grid style={{marginTop: 50}} container spacing={2} justify='center'>
          <Grid item>
            <Button 
              variant='contained' 
              color='primary'
              onClick={() => this.attack(100, character, 1)}
              disabled={attackButtons}
            >
              Standard Attack
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant='contained' 
              color='primary'
              disabled={attackButtons}
              onClick={() => this.attack(this.randomAttackValue(), character, 1)}
            >
              Random Attack
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant='contained' 
              color='primary'
              disabled={inventoryButton}
              onClick={this.openInventory}
            >
              Store
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {

  const {character, enemy, attackButtons, inventoryButton, characterCard, enemyCard, battlePageOpenCount, randomMonsters, roundTitle} = state;

  return {
    character,
    enemy,
    attackButtons,
    inventoryButton,
    characterCard,
    enemyCard,
    battlePageOpenCount,
    randomMonsters,
    roundTitle
  }
}

const mapDispatchToProps = dispatch => ({
  applyAttack: (value) => dispatch(applyAttack(value)),
  setAttackButtonsStatus: () => dispatch(setAttackButtonsStatus()),
  setInventoryButtonStatus: (status) => dispatch(setInventoryButtonStatus(status)),
  setSubtitle: (text) => dispatch(setSubtitle(text)),
  setLegend: (text) => dispatch(setLegend(text)),
  applyEnemyAttack: (randomValue) => dispatch(applyEnemyAttack(randomValue)),
  setCharacterCardStyle: (style) => dispatch(setCharacterCardStyle(style)),
  setEnemyCardStyle: (style) => dispatch(setEnemyCardStyle(style)),
  setRoundTitle: (text) => dispatch(setRoundTitle(text)),
  setPageStatus: (page) => dispatch(setPageStatus(page)),
  increaseBattlePageOpenCount: () => dispatch(increaseBattlePageOpenCount())
})

export default connect(mapStateToProps, mapDispatchToProps)(Battle);;