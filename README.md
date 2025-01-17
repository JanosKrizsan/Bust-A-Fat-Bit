# Bust a Fat Bit

![Bitcoin gambling](https://i.imgur.com/gtgeRym.jpg)

# About

Bustabit is a popular platform where users can go to bet on certain "multipliers". The multiplier rises from 1.00 by increments of 0.01 and may stop anywhere from within the 10 million pre-generated numbers. Therefore we are unable to determine what the numbers might be for the next 10 million iterations. It is completely random. For the player to win, and not "bust" (to lose), they have to guess a number lower than the game's resulting decimal number.

For example, if we guess the multiplier 1.1x, we have an 89% chance of winning, however our winnings will be our bet * 1.1, thus our profit would only be a meager 10%. While it does sound good, we must remember that a single bit equals (as of writing) 0.019 USD. It of course fluctuates depending on the value of Bitcoin. So in our example, any multiplier that the game results in - which is greater than 1.1x - would grant us a win. However, on a loss we would loose our bet, and the thing is, we do not know when a number appears between 1.00 - 1.1. It is possible to recover, but not to win long term. We will look at some common strategies later on.

## How does Bustabit calculate the game results?

From the source `On Game v2 Mechanics` below:<br>
"Starting with a secret I've generated a chain of 10,000,000 SHA256 hashes. Each element is the hash of the lowercase, hexadecimal string representation of the previous hash. The hash of the chain's last element is 86728f5fc3bd99db94d3cdaf105d67788194e9701bf95d049ad0e1ee3d004277.

Every game maps to a hash in the chain: The 10,000,000th element of the chain is the hash of game #1 and the first element in the chain is the hash of game #10,000,000. To verify that a hash belongs to a game #n, simply hash it n times and compare the result with the terminating hash.

Before being used to calculate the corresponding result, each game hash is salted with the lowercase, hexadecimal string representation of the hash of bitcoin block 505750. This block has not been mined yet, proving that I have not deliberately picked a chain that is unfavorable for players."

[On Game v2 Mechanics](https://bitcointalk.org/index.php?topic=2807542.0)<br>
[Release of Bustabit v2](https://bitcointalk.org/index.php?topic=2897545.0)<br>
[Bustabit v2 Game Verification Script](https://jsfiddle.net/Dexon95/2fmuxLza/)<br>
[Bustabit v1 Source Code](https://github.com/Dexon95/Bustabit)
[Convert Bits to Fiat](https://youmeandbtc.com/bitcoin-converter/convert-btc-mbtc-bits-satoshis-usd/)

# Betting Strategies 🎰

## Oscar's Grind
Oscar's Grind is a betting strategy used by gamblers on wagers where the outcome is evenly distributed between two results of equal value (like flipping a coin, betting on red or black in roulette, etc.). It is an archetypal positive progression strategy. This progression is based on calculating the size of bets so that in the event of a losing streak, if and when a same-length winning streak occurs, a profit is obtained. The main concept is that there are periods of many wins and periods of many losses. Losses and wins often come in streaks. Ideally, bets are kept low on losing streaks and increased on winning streaks, which hopefully will follow.

[Wiki](https://en.wikipedia.org/wiki/Oscar%27s_grind)

## Martingale
A martingale is any of a class of betting strategies that originated from and were popular in 18th century France. The simplest of these strategies was designed for a game in which the gambler wins the stake if a coin comes up heads and loses it if the coin comes up tails. The strategy had the gambler double the bet after every loss, so that the first win would recover all previous losses plus win a profit equal to the original stake. The martingale strategy has been applied to roulette as well, as the probability of hitting either red or black is close to 50%.

Since a gambler with infinite wealth will, almost surely, eventually flip heads, the martingale betting strategy was seen as a sure thing by those who advocated it. None of the gamblers possessed infinite wealth, and the exponential growth of the bets would eventually bankrupt "unlucky" gamblers who chose to use the martingale. The gambler usually wins a small net reward, thus appearing to have a sound strategy. However, the gambler's expected value does indeed remain zero (or less than zero) because the small probability that the gambler will suffer a catastrophic loss exactly balances with the expected gain. In a casino, the expected value is negative, due to the house's edge. The likelihood of catastrophic loss may not even be very small. The bet size rises exponentially. This, combined with the fact that strings of consecutive losses actually occur more often than common intuition suggests, can bankrupt a gambler quickly.

[Wiki](https://en.wikipedia.org/wiki/Martingale_(betting_system))

## Reverse Martingale
This is also known as the reverse martingale. In a classic martingale betting style, gamblers increase bets after each loss in hopes that an eventual win will recover all previous losses. The anti-martingale approach instead increases bets after wins, while reducing them after a loss. The perception is that the gambler will benefit from a winning streak or a "hot hand", while reducing losses while "cold" or otherwise having a losing streak. As the single bets are independent from each other (and from the gambler's expectations), the concept of winning "streaks" is merely an example of gambler's fallacy, and the anti-martingale strategy fails to make any money. If on the other hand, real-life stock returns are serially correlated (for instance due to economic cycles and delayed reaction to news of larger market participants), "streaks" of wins or losses do happen more often and are longer than those under a purely random process, the anti-martingale strategy could theoretically apply and can be used in trading systems (as trend-following or "doubling up").

[Wiki](https://en.wikipedia.org/wiki/Martingale_(betting_system))

## Labouchère System
The Labouchère system, also called the cancellation system or split martingale, is a gambling strategy used in roulette. The user of such a strategy decides before playing how much money they want to win, and writes down a list of positive numbers that sum to the predetermined amount. With each bet, the player stakes an amount equal to the sum of the first and last numbers on the list. If only one number remains, that number is the amount of the stake. If the bet is successful, the two amounts are removed from the list. If the bet is unsuccessful, the amount lost is appended to the end of the list. This process continues until either the list is completely crossed out, at which point the desired amount of money has been won, or until the player runs out of money to wager.

[Wiki](https://en.wikipedia.org/wiki/Labouch%C3%A8re_system)

## Gambler's Fallacy
The gambler's fallacy, also known as the Monte Carlo fallacy or the fallacy of the maturity of chances, is the erroneous belief that if a particular event occurs more frequently than normal during the past it is less likely to happen in the future (or vice versa), when it has otherwise been established that the probability of such events does not depend on what has happened in the past. Such events, having the quality of historical independence, are referred to as statistically independent. The fallacy is commonly associated with gambling, where it may be believed, for example, that the next dice roll is more than usually likely to be six because there have recently been less than the usual number of sixes.

[Wiki](https://en.wikipedia.org/wiki/Gambler%27s_fallacy)

## Our Strategy

We will stick with the Gambler's Fallacy and believe in independent randomness. We are unable to predict the numbers coming up, and even the currently available 50 we have at our disposal are useless in determining them. Remember, anything under our multiplier will make us lose our bet, thus we must choose our multiplier and bet carefully. The Martingale strategy seems to show okay-ish results in the short to mid term, however upon entering a loss-streak (consequent lossses) of over 20, even a low initial bet of 3 will bankrupt most players. To stay in the game longer (and recover our losses), we need a higher balance, relativiely low multiplier, and the lowest possible initial bet.

To calculate your desired setup, you can use the function included in a separate .js file. Please note, it follows a Martingale style bet-multiplication.
For example if we use the numbers:
```
base bet = 3
multiplier on previous bet = 1.42
loss-streak of rounds = 35
funds to start with = 1,200,000 (1 million 200 thousand) bits
```
Would leave us with a balance of: `124,345.52 bits` 

We could not bet after that, as on a loss we would be in the negative. While I was testing the website, I easily met 20+ loss-streaks, with a few 30+ here and there. Even with a modest strategy it is impossible to survive a long loss streak. With such low returns it will take an immense amount of time and luck to recover just the lost funds.

The function:
```
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
```

## Numbers

If one wishes to go for a higher return with faster gains, it is better to set a 1.1x multiplier so we would get an 89% win chance. However, for this we would need a higher bet as well, because we would get 10% of our bet as profit. So for us to gain 1000 bits, we would need to wager 10.000 bits. Upon losing a round we would need to multiply our bet by at least 2 to account for the loss plus profit. This strategy could be better managed than others, however we need a high amount of initial funds to work with bigger bets. The main reasoning here is that with a 1.1x multiplier loss-streaks happen less often and if do, last for fewer rounds.

Another popular strategy is a simple Martingale with our numbers above. We set our bet to 0.005% of the initial funds. This means, we bet 5 bits if we have 100.000 bits as our balance. We set a 3.43x multiplier, thus we win 28-32% of the time and upon each loss we multiply our next bet by 1.42. By this, we recover all our losses and get an increased amount on a win. However, one must know that we could lose most of our funds (without a stop-loss) within 30 rounds with this strategy. It is essentially a slow but balanced crawl.

It is recommended to play with money you will not miss, and to play it safe using all three stop-losses.

# Features 📝

Due to limitations in availability and lack of information, we cannot very well build an embedded script that is fast enough and also compares a growing number of previous results. The scripts run within a limited iFrame and must run under a given time-period otherwise we miss our bet window. Certain features and functions are disabled by default, and our resources are vastly limited. We are given the last 50 games as a queue, which are updated each time. That is just 0.000005% of the total pool of winning multipliers (numbers) in the game.

Thus the current strategy is simply mitigating damage and loss of funds. This script includes several notifiers, stop-checks and automated rest functionality.

## Legend 

Can be set individually -> ⚙️ <br>
Cannot be set -> ⛔️ <br>

## Stop-Checks

For prevention of a greater loss.<br>
- Percent check| if a % of the funds have been lost, the script terminates completely ⚙️
- Loss-streak check| in case we reach a certain number of consequitive losses, the script quits ⚙️
- Bet amount check| if our bet would be greater or equal to the given ceiling, the script stops ⚙️

## Notifications

To let us know of good and bad.<br>
- Ugh-oh | notifies us if our previous wager is greater than 20% of our balance ⛔️
- Pre-loss ceiling | tells us if we are within the provided range of our loss-streak check ⚙️
- Happy times | lets us know if we made a 50% profit ⛔️

## Faux-Rest

To seem at least not addicted to gambling.<br>
- Seeding Randomness | we provide a starting and ending number, between which it sets a random number ⚙️
- Repetition | after a rest, it resets the initial values to new random ones using the seeds we gave ⛔️
- Rest Service Provider | we must provide all 4 values (rest interval start and finish, rest duration start and finish) ⚙️

Note:<br>
If any of the REST options is set to 0, the whole function will switch off automatically.

## Ease of Use / Quality of Life

Everybody loves fun and comfort.<br>
- Name me, me! | we could set a specific username, but if non available, it will use our account name ⚙️
- Toggle all Be all | we can toggle all options on/off with the `I want extra options` switch ⚙️
- I am picky | we can toggle specific settings on/off by setting the value to 0 ⚙️
- No rest for thee | we can toggle the whole REST option on/off with the `I want some rest too` switch ⚙️

# Setting Up 📲

1. Go to `bustabit.com/play`
2. Register a new username, and make sure to save your details
3. For extra safety add your e-mail address
4. Click on `Auto` and remove other scripts (so mistakes are avoided)
![Auto](https://i.imgur.com/9hiRbhz.png)
5. Click `New` and fill in the name (whatever you want)
6. Copy-paste the script file's contents to the lower part
![Edit](https://imgur.com/06tqqKh.png)
7. Click "Create Script" which saves it

# Usage 🎮

- Please read above for each option available and what they do
- Set it up as you wish, it is yours to play with!
- I provided some basic numbers as defaults
- To run, simply click the `Run Script` button on the bottom
- You can try it out by running it in `Simulation Mode`, this will help to further better your strategy
![Menu](https://imgur.com/6IVQpJF.png)

- To use the extra function included, press F12 or Ctrl+Shift+I in your browser and copy-paste it into the console
- Then call the function with the desired parameters `example: functionName(3, 1.42, 30, 120000)`

# Development ⌨️

It was developed without any help. No help was provided by any IDEs or any checkers. The iFrame makes it impossible to use certain functions, and it disables newer JS features. You are unable to use, for example, foreach or lambda functions.

## Debugging 🛠

Debugging was done within the iFrame for the highest possible compatibility. This came with its own frustration, however a successful end-result was achieved.
