#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// ----------------------game variable----------------------------
let enemies = ["Skeleton", "Zombie", "Warrior", "Assasian"];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;
// ----------------------game variable----------------------------
let heroHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPotion = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;
// ----------------------while loop condition----------------------------
let gameRunning = true;
console.log(chalk.bgCyan.black.bold("******************Welcome To DeadZone!****************"));
Game: while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(chalk.magenta(`# ${enemy} has appeared #\n`));
    while (enemyHealth > 0) {
        console.log(chalk.red(`Your Health: ${heroHealth}`));
        console.log(chalk.green(`${enemy} Health: ${enemyHealth}`));
        let options = await inquirer.prompt([{
                name: "ans",
                type: "list",
                message: "What would you like to do ?",
                choices: ["1. Attack", "2. Take Health Potion", "3. Run"]
            }]);
        if (options.ans === "1. Attack") {
            let attackDamageToEnemy = 50;
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);
            enemyHealth -= damageToEnemy;
            heroHealth -= damageToHero;
            console.log(chalk.yellow(`you strike ${enemy} for ${damageToEnemy}`));
            console.log(chalk.blue(`${enemy} strike you for ${damageToHero} `));
            if (heroHealth < 1) {
                console.log(chalk.greenBright("You have taken too much damage. You are too weak to continue"));
                break;
            }
        }
        else if (options.ans === "2. Take Health Potion") {
            if (numHealthPotion > 0) {
                heroHealth += healthPotionHealAmount;
                numHealthPotion--;
                console.log(chalk.red(`You use health potion for ${healthPotionHealAmount}.`));
                console.log(chalk.green(`You now  have ${heroHealth} health.`));
                console.log(chalk.blue(`You have ${numHealthPotion} health potion left.`));
            }
            else {
                console.log(chalk.red.bgWhite(`You have no health potion left,defeat enemy for a chance to get health potion. `));
            }
        }
        else if (options.ans === "3. Run") {
            console.log(chalk.red(`You run away from ${enemy}`));
            continue Game;
        }
    }
    if (heroHealth < 1) {
        console.log(chalk.greenBright(`You are out from battle,you are too weak.`));
        break;
    }
    console.log(chalk.blue(`${enemy} was defeated!`));
    console.log(chalk.red(`You have ${heroHealth} health`));
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    if (randomNumber < healthPotionDropChance) {
        numHealthPotion++;
        console.log(chalk.green(`Enemy give you health potion`));
        console.log(chalk.yellow(`Your health is ${heroHealth}`));
        console.log(chalk.blue(`Your health potion is ${numHealthPotion}`));
    }
    let userOption = await inquirer.prompt([{
            name: "ans",
            type: "list",
            message: "What would you like to do now ?",
            choices: ["1. Continue", "2. Exit"]
        }]);
    if (userOption.ans === "1. Continue") {
        console.log(chalk.red(`You are continue on your adventure`));
    }
    else {
        console.log(chalk.green(`***********You successfully exit from DeadZone************`));
        break;
    }
    console.log((`********************Thank you for Playing.*******************\n`));
}
