
// Variable Declaration 
let xp = 10;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting = 0;
let monsterHealth = 0;
let inventory = ["stick"];
let position = 0;
let randomNumber = 0; 
let playAudio = true;
let audio = new Audio("song.mp3");
let clickSound = new Audio("sword.mp3");
let shieldSound = new Audio("sheild.mp3");
let shieldSound2 = new Audio("sheild.mp3");
let dragonFX = new Audio("dragon.mp3");
let coinsFX = new Audio("coins.mp3");
let whooshFX = new Audio("whoosh.mp3");




const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 8
    },
    {
        name: "claw hammer",
        power: 12
    },
    {
        name: "sword",
        power: 15
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    }, 

    {
        name: "fanged beast",
        level: 8,
        health: 60
    },

    {
        name: "dragon",
        level: 20,
        health: 250
    }
];

// Query Selectors 
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.getElementById("monster-stats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Sound FX 


document.getElementById('button1').onclick = function(){

    if(button1.innerHTML == "REPLAY?"){
        whooshFX.play();
    }
    else{
    if(button1.innerHTML != "Fight Slime" && button1.innerHTML != "Fight Fanged Beast" && button1.innerHTML != "Attack"){

        if(gold > 0){
            coinsFX.play();
        }
    }

    if(button1.innerHTML == "Fight Slime"){
        shieldSound.play();
    }

    if(button1.innerHTML == "Attack"){
        clickSound.play();
    }
}
};
document.getElementById('button3').onclick = function(){

    if(button3.innerHTML == "REPLAY?"){
        whooshFX.play();
    }
    else{
        if(button3.innerHTML != "Fight dragon"){
            whooshFX.play();
            }
        
            else if(button3.innerHTML == "Fight dragon"){
                dragonFX.play();
                }
    }
    
};

document.getElementById('button2').onclick = function(){


    if(button2.innerHTML == "REPLAY?"){
        whooshFX.play();
    }
    else{

    
    if(button2.innerHTML == "8"){
        if(gold > 0){
            coinsFX.play();
        }
    }
    else{

    
    if( button2.innerHTML != "Buy Weapon (30 gold)" 
    &&  button2.innerHTML != "Go to cave" && button2.innerHTML != "Fight Fanged Beast"){
        whooshFX.play();
    }

    if(button2.innerHTML == "Buy Weapon (30 gold)"){

        if(gold >= 30){
            coinsFX.play();
        }
     
    }

    if(button2.innerHTML == "Go to cave" || button2.innerHTML == "Fight Slime" || button2.innerHTML == "Fight Fanged Beast" ){
        shieldSound.play();
    }
}
    }
};

button4.addEventListener("click", playMusic);


// Event Handlers 
button1.addEventListener("click", goStore);
button2.addEventListener("click", goCave);
button3.addEventListener("click", fightDragon);


console.log("Welcome to the town");


const locations = [

    // Object 1/Element 0
    {
        name: "town square",
        buttonText: ["Go to store", "Go to cave", "Fight dragon"],
        buttonFunctions: [goStore, goCave, fightDragon],
        text: "Welcome to Dragon Repeller. You must deafeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above."
    },
    
    // Object 2/Element 1
    {
        name: "store",
        buttonText: ["Buy 10 health (10 gold)", "Buy Weapon (30 gold)", "Go to town square"],
        buttonFunctions: [buyHealth, buyWeapon, goTown],
        text: "Welcome to Dragon Slayers Store"
    },

    // Object 3/Element 2
    {
        name: "cave",
        buttonText: ["Fight Slime", "Fight Fanged Beast", "Go to town square"],
        buttonFunctions: [fightSlime, fightBeast, goTown],
        text: "You entered the cave. Beware of the monsters lurking..."
    },

    //Object 4/Element 3
    {
        name: "fight",
        buttonText: ["Attack", "Dodge", "Run"],
        buttonFunctions: [attack, dodge, run],
        text: "You are fighting a monster."
    },

    //Object 5/Element 4
    { 
        name: "defeatMonster",
        buttonText: ["Go to town square", "Go to town square", "Go to town square"],
        buttonFunctions: [goTown, easterEggGame, goTown],
        text: 'The monster screams "Arg" as it dies. You gain experince points and find gold'
    },
    
    //Object 6/Element 5
    {
        name: "lose",
        buttonText: ["REPLAY?","REPLAY?", "REPLAY?"], 
        buttonFunctions: [restart, restart, restart],
        text: "You died :("
    },

    //Object 7/Element 6
    {
        name: "win",
        buttonText: ["REPLAY?","REPLAY?", "REPLAY?"], 
        buttonFunctions: [restart, restart, restart],
        text: "You defeated the dragon. YOU WIN THE GAME. :)"
    },

    //Object 8/Element 7
    {
        name: "easterEgg",
        buttonText: ["2", "8", "Go to town square"],
        buttonFunctions: [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you chooses matches one of the random numbers, you win."
    }
];


// Functions 
function update(location){

    monsterStats.style.display = "none"; 
    button1.innerHTML = location["buttonText"][0];
    button2.innerHTML = location["buttonText"][1];
    button3.innerHTML = location["buttonText"][2];
      
    if(location.name == "store"){
            removeTown();

    }
    else if(location.name == "town square"){

        bonusRound = false;

        // Came from the store
        if(position == 0){
            removeStore();
        }

        // Came from defeating a monster
        else if(position == 1){
            removeKillMonster();

            
            position = 0; // RESET
        }
        // Came from easter egg
        else if(position == 2){
            removeEasterEggGame();
        }
    }

    else if(location.name == "cave"){
        removeTown();
    }

    else if(location.name == "fight"){

        // Check if we are fighting a dragon
        if(fighting == 2){
            removeTown();
        }
        else{
            removeCave();
        }
    }

    else if(location.name == "defeatMonster" || location.name == "lose"){
        removeFight();
        position = 1;
    }

        button1.addEventListener("click", location["buttonFunctions"][0]);
        button2.addEventListener("click", location["buttonFunctions"][1]);
        button3.addEventListener("click", location["buttonFunctions"][2]);

        text.innerHTML = location.text;

}

function goTown(){
    console.log("Going to town");

    // Pass the array with the first element/object
    update(locations[0]);

}

function goStore(){
    console.log("Going to the store.");

    // Pass the array with the second element/object
    update(locations[1]);
    
}

function goCave(){
    console.log("Going to the cave.");

    update(locations[2]);
}

function buyHealth(){
    console.log("Buy Health");
    console.log(health);

    if(health >= 150)
    {
        text.innerHTML = "You have MAX health";

    }
    else{
        if(gold >= 10){
            gold -= 10;
            health += 10;
    
            goldText.innerHTML = gold;
            healthText.innerHTML = health;
        }
        else{
            text.innerHTML = "You do not have enough gold to buy health.";
        }
    
    
    }
}

function buyWeapon(){
    console.log("Buy Weapon");

    if(currentWeapon < (weapons.length-1)){
        if(gold >= 30){
            gold -= 30;
    
            currentWeapon++;
            goldText.innerHTML = gold;
    
            let newWeapon = weapons[currentWeapon].name; 
            text.innerHTML = "You now have a " + newWeapon + "."; 
            inventory.push(newWeapon);
    
            text.innerHTML += " In your inventory you have: " + inventory;
    
         }
        else{
            text.innerHTML = "You do not have enough gold to buy a weapon.";
        }
    }
    else{
        text.innerHTML = "You already have the most powerful weapon";

        button2.innerHTML = "Sell weapon for 15 gold"

        button2.removeEventListener("click", buyWeapon);
        button2.addEventListener("click", sellWeapon);
    }
}

function removeTown(){
    button1.removeEventListener("click", goStore);
    button2.removeEventListener("click", goCave);
    button3.removeEventListener("click", fightDragon);
}
function removeStore(){
    button1.removeEventListener("click", buyHealth);
    button2.removeEventListener("click", buyWeapon);
    button3.removeEventListener("click", goTown);
}

function removeCave(){
    button1.removeEventListener("click", fightSlime);
    button2.removeEventListener("click", fightBeast);
    button3.removeEventListener("click", goTown);
}

function removeFight(){
    button1.removeEventListener("click", attack);
    button2.removeEventListener("click", dodge);
    button3.removeEventListener("click", goTown);
}

function removeEasterEggGame(){
    button1.removeEventListener("click", pickTwo);
    button2.removeEventListener("click", pickEight);
    button3.removeEventListener("click", goTown);
}

function removeKillMonster(){
 
    button1.removeEventListener("click", goTown);
    button2.removeEventListener("click", easterEggGame);
    button3.removeEventListener("click", goTown);
}

function removeLose(){
    button1.removeEventListener("click", restart);
    button2.removeEventListener("click", restart);
    button3.removeEventListener("click", restart);
}
function sellWeapon(){
    console.log("Sell Weapon");

    if ( (inventory.length > 1)){
         
        gold += 15;
        goldText.innerHTML = gold;
        
        let currentWeapon = inventory.shift();
        // Removes the first element from the array and returns it into this variable

        text.innerHTML = "You sold a " + currentWeapon + ".";

        text.innerHTML += "In your inventory, you have " + inventory;
    }
    else{
        text.innerHTML = "Don't sell your only weapon.";
    }
}

function fightSlime(){
    console.log("Fighting Slime Monster");

    fighting = 0;
    goFight();

}

function fightBeast(){
    console.log("Fighting beast!");

    fighting = 1;
    goFight();
}

function fightDragon(){
    console.log("Fight the dragon!");

    fighting = 2;
    goFight();
}

function goFight(){

    console.log("Fighting stage");

    update(locations[3]);

    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerHTML = monsters[fighting].name;
    monsterHealthText.innerHTML = monsterHealth;
}
function attack(){

    console.log("Attack stage");

    text.innerHTML = "The " + monsters[fighting].name + " attacks. ";
    text.innerHTML += " You attack with your " + weapons[currentWeapon].name + ". ";

    // Check for player hitting monster 
    if(isHit()){
        monsterHealth -= getPlayerAttackValue(monsters[fighting].level);
    }
    // Failed Hit
    else{
        text.innerHTML += " You missed. ";
    }

     // Check for monster hitting player
     if(isHit()){
        health -= getMonsterAttackValue(monsters[fighting].level);
    }
    // Failed Hit
    else{
        text.innerHTML +=  monsters[fighting].name + " missed. ";
    }


    if(health < 0){
        healthText.innerHTML = 0;
    }

    else{
        healthText.innerHTML = health;
    }
    monsterHealthText.innerHTML = monsterHealth;

    if(health <= 0 ){
        lose();
    }
    else if(monsterHealth <= 0){
        // Ternary Operator
        fighting == 2 ? winGame() : defeatMonster(); 
    }


    // Random number between 0 and 1
    // 90 percent chance, your weapon will not break 
    // 10 percent chance, that your weapon breaks
    // Your weapon can't break, if you have only 1 weapon
    if(Math.random() <= .10 && inventory.length > 1){
        text.innerHTML += " Your " + inventory.pop() + " breaks. ";

        currentWeapon--;
    }
}
function getPlayerAttackValue(level){

    let weaponPower = 0;
  
    // Fighting Slime
    if(fighting == 0){

        if(xp != 0 && xp <= 2){
            randomNumber = xp * 2;
        }
        else if(xp == 0){
            randomNumber = 2;
        }
        else{
            randomNumber = 4;
        }

        weaponPower = Math.floor(weapons[currentWeapon].power / 2);
    }

    // Fighting beast 
    else if(fighting == 1){
        if(xp != 0  && xp <= 4){
            randomNumber = xp * 2;
        }
        else if(xp == 0){
            randomNumber = 2;
        }

        else{
            randomNumber = 8;
        }
        weaponPower = Math.floor(weapons[currentWeapon].power / 3);
        // Weaken the weapon against a higher enemy
    }

    // Fighting the dragon
    else{
        
        if(xp != 0 && xp <= 6){
            randomNumber = xp * 3;
        }
        else if(xp == 0){
            randomNumber = 2;
        }
        else{
            randomNumber = 24;
        }

        weaponPower = Math.floor(weapons[currentWeapon].power / 3);
        // Weaken the weapon against a higher enemy
    }


       let hit = Math.floor((Math.random() * randomNumber) + 1) + weaponPower;


       if(fighting == 3 && xp >= 6){
        hit += Math.floor(Math.random() * 7);
       }
    
   

    console.log("Player Hit Value: " + hit);

    return hit;
}

function getMonsterAttackValue(level){

    let randomNumber = level * 5; 

    let hit =  Math.floor(Math.floor(Math.floor(Math.random() * randomNumber) + 2) / 2);


    console.log("Monster hit: " + hit)
    return hit;
}

// Math.random() checks a random numbere between 0 and 1 
// so if the number is above .20 we return true so that is an 80 percent chance.
function isHit(){
    return ((Math.random() > 0.20) || (health < 20));
}
// 80 percent of the time we will hit 
// return false if we miss, which is 20 percent or less
// If the players health is lower than 20, we always return true and the playere always hits

function dodge(){
    text.innerHTML = " You dodge the attack from the " + monsters[fighting].name + ". ";
}

function lose(){

    removeFight();
    update(locations[5]);
    
}

function run(){
    removeFight();
    goTown();
}

function winGame(){
    removeFight();
    update(locations[6]);
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp++;
    goldText.innerHTML = gold;
    xpText.innerHTML = xp;
    update(locations[4]);

    console.log("Defeated Monster stage");
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    let inventory = ["stick"];
     
    goldText.innerHTML = gold;
    healthText.innerHTML = health;
    xpText.innerHTML = xp;

    removeLose();

    goTown();
}

function pickTwo(){

    pick(2);


}
function pickEight(){
    pick(8);
}
function pick(guess){

    bonusRound = true;

    let numbers = [];

    while(numbers.length < 10){
        numbers.push(Math.floor((Math.random() * 11)));
    }

    text.innerHTML = "You picked " + guess + ". Here are the random numbers:\n";

    text.innerHTML += "[ ";

    for(index = 0; index < numbers.length-1; index++){
        text.innerHTML += numbers[index] + "\n"; 
    }
 
    text.innerHTML += "] ";

    if(numbers.indexOf(guess) != -1){
        text.innerHTML += " Right :). You win 20 gold.";
        gold += 20;
        goldText.innerHTML = gold;
    }
    else{
        text.innerHTML += " Wrong :(. You lose 10 health";
        health -= 10;
        

        if(health <= 0){
            //update(locations[5]); // Simulate lose 
            health = 0;

            lose();
            removeEasterEggGame();
        }

        healthText.innerHTML = health;
       
    }   
}    

function easterEggGame(){
    console.log("EASTER EGG GAME");

    removeKillMonster();
    position = 2;

    update(locations[7]);
}

function playMusic(){

    if(playAudio){
        button4.innerHTML = "Pause Music";
        audio.play();

        playAudio = false;
    }
    else{
        button4.innerHTML = "Play Music";
        audio.pause();
        playAudio = true;

    }
}



