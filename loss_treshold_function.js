/*
rounds => how many consequent rounds of losing
multip => the multiplier on the previous bet
num => the original bet
balance => your original balance at the start
Copy-paste it into your browser and hit enter, then call by f(num, multip, rounds, balance);
*/
function tresholdBoundary(num, multip, rounds, balance) {
  var counter = 0;
  var total = 0;
  var currentNum = num;
  var bal = balance;
  while (counter != rounds) {
    counter++;
    console.log("Round: " + counter + " | Bet: " + currentNum);
    bal -= currentNum;
    total += currentNum;
    currentNum = currentNum * multip;
  }
  console.log("You'd lose " + total.toFixed(2) + " in " + rounds + " rounds.");
  console.log("Your balance would be ", + bal + ".");
}