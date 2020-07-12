const attackValue = 10;
const monsterAttackValue = 14;
const healVaLue  = 20;
const strongAttackValue = 18;

const enteredValue = prompt("Enter the maximum life for you and the monster", )
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";


let chosenMaxLife = parseInt(enteredValue);

if(isNaN(chosenMaxLife || chosenMaxLife<=0)) {
    chosenMaxLife = 100;
}

let currentMonsterHealth  = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

let battleLog = [];


adjustHealthBars(chosenMaxLife);

function reset(){
    currentMonsterHealth  = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}
function writeToLog(event, value, monsterHealth, playerHealth){
    let logEntry;
    if(event === LOG_EVENT_PLAYER_ATTACK){
        logEntry = {
            event: event,
            value: value,
            target: 'Monster',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if(event === LOG_EVENT_MONSTER_ATTACK){
        logEntry = {
            event: event,
            value: value,
            target: 'Player',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    }else if(event === LOG_EVENT_PLAYER_ATTACK){
        logEntry = {
            event: event,
            value: value,
            target: 'Monster',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    }else if(event === LOG_EVENT_PLAYER_HEAL){
        logEntry = {
            event: event,
            value: value,
            target: 'Player',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    }else if(event === LOG_EVENT_GAME_OVER){
        logEntry = {
            event: event,
            value: value,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    }
    battleLog.push(logEntry);

}

function endRound(){
    const intialPlayerHelath = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth -= playerDamage;
   writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth)
    if(currentPlayerHealth <= 0 && hasBonusLife){
            hasBonusLife = false;
            removeBonusLife();
            currentPlayerHealth = intialPlayerHelath;
            setPlayerHealth(intialPlayerHelath)
            alert("Thanks to the bonus life, You are alive now!")
       
        }
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You won');
        writeToLog(LOG_EVENT_GAME_OVER, 
            'Player Won', currentMonsterHealth, currentPlayerHealth)

    }
    else if( currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('You lost');
        writeToLog(LOG_EVENT_GAME_OVER, 
            'Monster Won', currentMonsterHealth, currentPlayerHealth)
    }
    else if ( currentPlayerHealth <=0 && currentMonsterHealth <= 0){
        alert('Match is draw');
    }

    if(currentMonsterHealth <=0 || currentPlayerHealth <=0  )
        {
            reset();
        }
}

function attackMonseter(mode){
    let maxDamage;
    let logEvent;
    if(mode === 'attack'){
        maxDamage = attackValue;
        logEvent = LOG_EVENT_PLAYER_ATTACK
    }
    else if(mode === 'strong_attack') {
        maxDamage = strongAttackValue;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, 
        damage, currentMonsterHealth, currentPlayerHealth)   
         endRound();
}

function attackHandler(){
    attackMonseter('attack');
}

attackBtn.addEventListener('click', attackHandler );


function strongAttackHandler(){
    attackMonseter('strong_attack');
}

strongAttackBtn.addEventListener('click', strongAttackHandler);

function healPlayer(){
    let HealValue;
    if(currentPlayerHealth >= chosenMaxLife - healVaLue){
        alert("You can't heal to more than your max initial health.")
        HealValue = chosenMaxLife - currentPlayerHealth;
    }else{
        HealValue = healVaLue; 
    }
    increasePlayerHealth(healVaLue);
    currentPlayerHealth += healVaLue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, 
        healVaLue, currentMonsterHealth, currentPlayerHealth) 
        endRound();
}
let i=0;
function printLog(){
  for(const logEntry of battleLog){
    console.log(`#${i}`);
    for( const key in logEntry){
        console.log(`${key} => ${logEntry[key]}`)
    }
    i++;
  }
}

healBtn.addEventListener('click', healPlayer);

logBtn.addEventListener('click', printLog)