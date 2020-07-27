export const setRandomMonsters = (monsters) => {
  return {
    type: 'SET_RANDOM_MONSTERS',
    payload: monsters
  }
}

export const setCharacter = (character) => {
  return {
    type: 'SET_CHARACTER',
    payload: character
  }
}

export const setEnemy = (enemy) => {
  return {
    type: 'SET_ENEMY',
    payload: enemy
  }
}

export const setStartGame = () => {
  return {
    type: 'SET_START_GAME'
  }
}

export const applyAttack = (value) => {
  return {
    type: 'APPLY_ATTACK',
    payload: value
  }
}

export const setMenuButtonsStatus = () => {
  return {
    type: 'SET_MENU_BUTTONS_STATUS'
  }
}

export const setSubtitle = (text) => {
  return {
    type: 'SET_SUBTITLE',
    payload: text
  }
}

export const setLegend = (text) => {
  return {
    type: 'SET_LEGEND',
    payload: text
  }
}

export const applyEnemyAttack = (randomValue) => {
  return {
    type: 'APPLY_ENEMY_ATTACK',
    payload: randomValue
  }
}

export const setCharacterCardStyle = (style) => {
  return {
    type: 'SET_CHARACTER_CARD_STYLE',
    payload: style
  }
}

export const setEnemyCardStyle = (style) => {
  return {
    type: 'SET_ENEMY_CARD_STYLE',
    payload: style
  }  
}