var config = 
{
  userName: {value: 'user', type: 'text', label: 'Add your name' },
  baseBet: { value: 300, type: 'balance', label: 'Add Your Base Bet' },
  mult: { type: 'noop', label: 'multiplier' },
  payout: { value: 3.43, type: 'multiplier', label: 'Win condition:' },
  loss: {
    value: 'increase', type: 'radio', label: 'Increase by if lost:',
    options: {
      base: { type: 'noop', label: 'Return to base bet' },
      increase: { value: 1.42, type: 'multiplier', label: 'Increase current bet by' },
    }
  },
  win: {
    value: 'base', type: 'radio', label: 'on win',
    options: {
      base: { type: 'noop', label: 'Return to base bet' },
      increase: { value: 2, type: 'multiplier', label: 'Increase current bet by' },
    }
  },
  extrasLabel: { type: 'noop', label: 'extra options' },
  extras: {value: true, type: 'checkbox', label: 'I want extra options' },
  stopRound: {
    value: 25, type: 'text', label: 'Stop after X consequent losses'
  },
  notifyStop: {
    value: 5, type: 'text', label: 'Notify when X rounds before stop set'
  },
  stopPercent: {
    value: 10, type: 'text', label: 'Stop if percentage of capital lost'
  },
  stopAmount: {
    value: 8000, type: 'text', label: 'Stop if current bet is gt/eq'
  },
  startRestWhen: {
    value: 1, type: 'text', label: 'Rest after input floor (mins)'
  },
  stopRestWhen: {
    value: 5, type: 'text', label: 'Rest after input ceiling (mins)'
  },
  restFromMinutes: {
    value: 1, type: 'text', label: 'Rest dur. input floor (mins)'
  },
  restTillMinutes: {
    value: 5, type: 'text', label: 'Rest dur. input ceiling (mins)'
  },
  clearCons: {
    value: 5, type: 'text', label: 'Clear console every X round'
  },
};


var toggleExtras = config.extras.value;
var currentBet = config.baseBet.value;
var lossesRow = 0;
var winsStart = 0;
var timeReset = false;
var scriptStartTime = new Date();
var dispName = config.userName.value === 'user' ? userInfo.uname : config.userName.value;

function checkVar(elem) {
  return elem === '0' ? '' : parseInt(elem);
}

function checkVars(varList) {
  for (var i = 0; i < varList.length; i++) {
    varList[i] = checkVar(varList[i]);
    if (!varList[i]) {
      return false;
    }
  }
  return varList;
}

function typeCheck(elem) {
  switch(typeof elem) {
    case "number":
    case "object":
      return true;
    case "string":
    default:
      return false;
  }
}

if (toggleExtras) {
  var stopPercentage = checkVar(config.stopPercent.value);
  var stopAmountCeiling = checkVar(config.stopAmount.value);
  var stopLossCeiling = checkVar(config.stopRound.value);
  var firstGameId = engine.gameId;
  var gameRounds = checkVar(config.clearCons.value);
  var notifyStopCheck = checkVar(config.notifyStop.value);
  var startBalance = userInfo.balance;
  var restInterval = checkVars([config.startRestWhen.value, config.stopRestWhen.value]);
  var restDurationInterval = checkVars([config.restFromMinutes.value, config.restTillMinutes.value]);
}

console.log('HAL started at: ', scriptStartTime);
console.log('Here come the numbers ' + dispName.toUpperCase() + '...');

function betBits() {
  var bits = roundBits(currentBet);
  engine.bet(roundBits(currentBet), config.payout.value);
  return bits / 100;
}

function roundBits(betVal) {
  return Math.round(betVal / 100) * 100;
}

function getRandomMins(start, end) {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

function resetTimes() {
  console.log('resettimes');
  if (typeCheck(restInterval)) {
    console.log('Resettimes true');
    waitForRestTime = getRandomMins(restInterval[0], restInterval[1]);
    scriptStartTime = new Date();
    timeReset = true;
  }
}

if (!ypeCheck(restInterval) || !typeCheck(restDurationInterval)) {
  console.log('waitforresttime false');
  var waitForRestTime = getRandomMins(restInterval[0], restInterval[1]);
  var restStart = restDurationInterval[0];
  var restEnd = restDurationInterval[1];
}

function alertOfPotentials() {
  var alertMsg = '';
  if (userInfo.balance * 0.2 < engine.history.first().wager) {
    alertMsg += 'Your pending wager is more than 20% of your funds!\n';
  }
  if (tresholdCheck() && toggleExtras) {
    alertMsg += 'Your loss-streak is near the treshold: ' + stopLossCeiling +'!\n';
  }
  if (startBalance * 1.5 < userInfo.balance && startBalance * 1.6 > userInfo.balance) {
    alertMsg += 'You have made a more than 50% profit since starting!';
  }
  if (alertMsg) {
    console.log(alertMsg);
  }
}

function getTimeDiff(dateStart, dateGiven) {
  var milsecDiff = Math.abs(dateStart - dateGiven);
  var minuteDiff = Math.ceil(milsecDiff / (1000 * 60));
  return minuteDiff;
}

function isConsoleToClear() {
  if (typeCheck(gameRounds)) {
      if ((firstGameId - engine.gameId) % gameRounds === 0) {
        console.clear();
      }
    }
  }

function assessIsRest(minuteDiff) {
  console.log('assess is rest time');
  return minuteDiff >= waitForRestTime;
}

function restCheck() {
  console.log('rest check');
  return assessIsRest(getTimeDiff(scriptStartTime, new Date()));
}

function assessIsBeforeRest(minuteDiff) {
  console.log('assess is before rest');
  var currentTime = getTimeDiff(scriptStartTime, new Date());
  return currentTime < minuteDiff;
}

function beforeRestCheck() {
  console.log('before rest check');
  return assessIsBeforeRest(getTimeDiff(scriptStartTime, waitForRestTime));
}

function stopExec(message) {
  stop('Stopping due to stop-condition triggering: ' + message);
}

function percentStopCheck() {
  var percentDanger = false;
  if (typeCheck(stopPercentage)) {
    var perc = parseInt(stopPercentage);
    percentDanger = ((100 - perc) / 100) * startBalance >= userInfo.balance;
  }
  if (percentDanger) {
    stopExec("percentage stop-ceiling reached");
    return true;
  }
}

function lossStreakStopCheck() {
  var lossDanger = false;
  if (typeCheck(stopLossCeiling)) {
    lossDanger = lossesRow === stopLossCeiling;
  }
  if (lossDanger) {
    stopExec("loss streak stop-ceiling reached");
    return true;
  }
}

function amountCeilingStopCheck() {
  var amountDanger = false;
  if (typeCheck(stopAmountCeiling)) {
    amountDanger = parseInt(engine.history.first().wager / 10) >= stopAmountCeiling;
  }
  if (amountDanger) {
    stopExec("bet amount stop-ceiling reached");
    return true;
  }
}

function tresholdCheck() {
  if (typeCheck(notifyStopCheck)) {
    return lossesRow === stopLossCeiling - notifyStopCheck;
  }
  return false;
}

function assessAnyRestIsSet() {
  return !(!restDurationInterval || !restInterval);
}

function assessAfterRest() {
  if (timeReset) {
    timeReset = false;
    return true;
  }
  return false;
}

function Rest() {
  engine.listeners().pop();
}

function getLastGame() {
  return engine.history.first();
}

function lastWagerCheck(last) {
  return last.wager !== 0;
}

function returnToBaseBet(current) {
  current = config.baseBet.value;
}

function increaseCurrentBetBy(current, multValue, previous) {
  if (lastWagerCheck(previous)) {
    current *= multValue;
  }
}

function gamePlay() {
  isConsoleToClear();
  if (toggleExtras) {
    if(amountCeilingStopCheck()) {
      return;
    }
  }
  
  var lastGame = getLastGame();

  if (lastGame.cashedAt) {
    if (config.win.value === 'base') {
      returnToBaseBet(currentBet);
    } else {
      currentBet *= config.win.options.increase.value;
      increaseCurrentBetBy(currentBet, config.win.options.increase.value, lastGame)
    }
    winsStart += 1;
    console.log('Wins, since start: ', winsStart);
    lossesRow = 0;
  } else if (lastWagerCheck(lastGame) && !lastGame.cashedAt) {
    if (config.loss.value === 'base') {
      returnToBaseBet(currentBet);
    } else {
      currentBet *= config.loss.options.increase.value;
      increaseCurrentBetBy(currentBet, config.loss.options.increase.value, lastGame)
    }
    lossesRow += 1;
    console.log('Losses in a row: ', lossesRow);
  }
  if (toggleExtras) {
    lossStreakStopCheck();
    percentStopCheck();
    if (lossStreakStopCheck() || percentStopCheck()) {
      return;
    }
  }
  if (lastWagerCheck(lastGame)) {
    //console.log("Previous bet unsuccessful, we just missed the time-frame.");
    return;
  }
  console.log('Tried to wager ' + betBits() + ' this round.');
  alertOfPotentials();
}

function toggleGamePlay() {
  if (!toggleExtras) {
    gamePlay();
  } else {
    if (assessAnyRestIsSet()) {
      if (beforeRestCheck()) {
        gamePlay();
        return;
      }
      if (restCheck()) {
        Rest();
        resetTimes();
        var restDuration = getRandomMins(restStart, restEnd);
        console.log('Rest started:\n  Rest will go on for: ', restDuration, ' minutes');
        setTimeout(Start, restDuration);
        return;
      }
      else if (afterRestCheck()) {
        console.log('Rest finished, continuing...');
        engine.addListener('GAME_ENDED', toggleGamePlay);
      }
      gamePlay();
    }
  }
}

engine.addListener('GAME_ENDED', toggleGamePlay);


