//Property of Tomasz Dobrowolski 
//if there are 2 stars - ** that means code was replicated for program
//if there is 1 star - * a source was used to help create code

scoreCounter = 0;
playerCounter = 0; //counter for moves of player
monsterCounter = 0; //counter for moves of monster
playerPosition = 0; //player position in grid
bottomRowPositionArray         = [-1,1,0,-8]; //cells 57 - 62
topRowPositionArray            = [-1,1,8,0]; //cells 1 - 6
leftColumnPositionArray        = [0,1,8,-8]; //cells 8, 16, 24, 32, 40, 48
rightColumnPositionArray       = [-1,0,8,-8]; //cells 15, 23, 31, 39, 47, 55
topLeftCornerPositionArray     = [0,1,8,0]; //cell 0
topRightCornerPositionArray    = [-1,0,8,0]; //cell 7
bottomLeftCornerPositionArray  = [0,1,0,-8]; //cell 56
bottomRightCornerPositionArray = [-1,0,0,-8]; //cell 63
middleCellsPositionArray 	   = [-1,1,8,-8]; //rest of the cells
leftMove1 = false; //if player has been detected by the monster on the left side
rightMove1 = false; //if player has been detected by the monster on the right side
downMove1 = false; //if player has been detected by the monster below it
upMove1 = false;  //if player has been detected by the monster above it
leftMove2 = false;
rightMove2 = false;
upMove2 = false;
downMove2 = false;
playerFound1 = false; //if player has been detected by the monster at all
playerFound2 = false;
defaultCounter = 0; 
monsterPosition = 63; //starting position of the monster
rUArray = []; //empty arrays to store player position when the monster is moving
rDArray = [];
rLArray = [];
rRArray = [];
monsterCounter2 = 0; //used to check if the monster has taken a move
monNoMove = 2;   //variable used to check to see if Speed Ability has been activated and to make sure it only lasts for 2 moves
playerNoMove = 2; //variable used to check to see if Freeze Debuff has been activated and to make sure it only lasts for 2 moves
darkCounter = 3; //variable used to check if the Invisible Debuff has been activated and to make sure it only lasts for 3 moves
boolChest1 = true; //boolean for the chest abilities. To make sure that once a player or monster has entered the room, the ability cannot be reused by reentering the room
boolChest2 = true;
boolChest3 = true;
boolChest4 = true;
boolChest5 = true;
boolChest6 = true;
boolChest7 = true;
boolChest8 = true;
boolChest9 = true;
boolChest10 = true;
boolChest11 = true;
boolChest12 = true;
boolChest13 = true;
boolChest14 = true;
boolChest15 = true;
boolChest16 = true;
canv = document.getElementById("myCanvas"); //Links to canvas on html page
canvText = canv.getContext("2d"); //used to draw 2d canvas
canvText.font = "28px Impact"; //font used in canvas
gameOver = false; //used to check if the game has ended.
startButton = document.getElementById("startButton"); //links to the start button on the html page
howToPlayButton = document.getElementById("howToPlayButton"); //links to the how to play button on html page
highScoreButton = document.getElementById("highScoreButton"); //links to the high score button on html page



function loadFunction(){ //this function runs if the start button is pressed
	document.getElementById("howToPlayOutput").innerHTML = "";  //clears the how to play text
	tableFunction(); //loads the grid
	textLoadFunction(); //loads the ability and score text
	listen();			//listens for the keyboard
	playerFunction(0); //loads the player into cell 0
	monsterFunction(63); //loads the monster in to cell 63
	chest1(5);     //sets where each of the chest abilities are located; they are located in rooms 5, 15, 26, 46, 59, 3, 8, 10, 20, 29, 33, 39, 40, 43, 53, 57
	chest2(15);
	chest3(26);
	chest4(46);
	chest5(59);
	chest6(3);
	chest7(8);
	chest8(10);
	chest9(20);
	chest10(29);
	chest11(33);
	chest12(39);
	chest13(40);
	chest14(43);
	chest15(53);
	chest16(57);
	exitFunction(47); //displays the exit image in cell 47
	buttonHideAndDisplay(); //hides and displays certain buttons
	removeButtons(); //removes the start, how to play and highscore buttons
}


function removeButtons(){ //removes the buttons
	startButton.parentNode.removeChild(startButton); //http://stackoverflow.com/questions/5933157/how-to-remove-an-html-element-using-javascript
	howToPlayButton.parentNode.removeChild(howToPlayButton);
	highScoreButton.parentNode.removeChild(highScoreButton);
}

function buttonHideAndDisplay(){ //this function hides the menu buttons and displays the back to menu button
	document.getElementById("startButton").disabled = true; //http://stackoverflow.com/questions/17114825/how-to-disable-button-after-one-click-with-validation-using-javascript  disables start button
	document.getElementById("startButton").style.visibility = 'hidden';  //hides start button
	document.getElementById("howToPlayButton").disabled = true; //disables how to play button
	document.getElementById("howToPlayButton").style.visibility = 'hidden';//https://www.w3schools.com/jsref/prop_style_visibility.asp   hides how to play button
	document.getElementById("highScoreButton").disabled = true;  //disables high score button 
	document.getElementById("highScoreButton").style.visibility = 'hidden'; //hides high score button
	document.getElementById("menuButton").disabled = false; //enables the menu button
	document.getElementById("menuButton").style.visibility = 'visible'; //makes the menu button visible
}

function highScoreFunction(){ 
	buttonHideAndDisplay();
	document.getElementById("howToPlayOutput").innerHTML += "<center><h2>High Score</h2></center>"; //http://stackoverflow.com/questions/29370017/adding-a-high-score-to-local-storage
	if (localStorage.highScore == null){
		document.getElementById("howToPlayOutput").innerHTML += "<center>No High Score has been set<center>";
	}
	else{
		document.getElementById("howToPlayOutput").innerHTML += localStorage.highScore; //displays the score when highscore button is pressed
	}
}


function highScoreSaveFunction(){	//*https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API#localStorage
	var highScore = localStorage.getItem("highScore"); //http://stackoverflow.com/questions/29370017/adding-a-high-score-to-local-storage         https://www.w3schools.com/html/html5_webstorage.asp
	var highScore2 = localStorage.getItem("highScore2"); //2 variables highscore and highscore2 which save data to local storage. highscore is used to display information whereas highscore2 is used to compare the highscore with the current score just obtained
	
	if (highScore2 !== null){ //if there is a value for highscore2 in local storage
		if (scoreCounter > highScore2){  //if the score is higher than the current high score
			name = prompt("You have produced a new high score! Enter your name", "Tomasz"); //ask the user to enter their name, so that it can be saved in the highscore option
		}
		else{}
	}
	else{
		name = prompt("You have produced a new high score! Enter your name", "Tomasz"); //if no highscore has been made. Ask for new highscore name and save it
	}
	if (name == "null"){
		name = "Unknown";
	}
	nameAndScore = "<center><b>Name:</b> "+name+"<br><b>Score:</b> "+scoreCounter+"</center>"; //text used to display the highscore
	localStorage.setItem("highScore", nameAndScore);
	localStorage.setItem("highScore2", scoreCounter);
}

function howToFunction(){ //this displays the instructions on how to play when the How To Play button is pressed
	buttonHideAndDisplay(); //hides and disables the start, how to play, highscore button. Displays and enables the back to menu button
	document.getElementById("howToPlayOutput").innerHTML =""; //clears the instructions so that if the function has already been used, the text is cleared
	//info text contains the text displayed in the how to play page
	infoText = "A monster has entered the buiding and can smell you<br><br><b>Objective:</b> Escape the building<br><ul><li>Navigate through the rooms using the <b>arrow keys</b> to the <b>exit room</b>.<li>For every move you take the monster will take a move</li>"+
	
				"<li>Some rooms will have ability chests inside"+
				"<li>Ability chests can offer buffs or debuffs:</li><ul><li><b>Speed Buff</b> - Gain speed for 2 extra turns before the monster moves</li>"+
				
				"<li><b>Freeze debuff</b> - You have been locked in your room for 3 moves</li>"+
				"<li><b>Invisible Debuff</b> - The monster is invisible for hidden for 3 moves</li></ul>"+
				"<li>The game is over if the monster enters the same room as you</li>"+
				"<li>The chest abilities are randomised, enter ability rooms at your own risk</li>"+
				"<li>Each room entered will add +1 to your score</li>"+
				"<li>Each ability chest opened will add +10 to your score</li></ul>"+//displays bullet points with bold key words
				"<br><center><b>CAN YOU ESCAPE WITH THE BEST SCORE?!</center>";
	
	document.getElementById("howToPlayOutput").innerHTML += infoText; //outputs the text to the howToPlayOutput tag

}

function textLoadFunction(){	//loads the score by creating 
	var scoreTag = document.createElement("OUTPUT"); // produces an output tag in menu.html https://www.w3schools.com/jsref/met_document_createelement.asp
	var scoreName = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Score:\u00A0\u00A0\u00A0"); //http://www.webdeveloper.com/forum/showthread.php?193107-RESOLVED-Insert-amp-nbsp-when-using-createTextNode()
	scoreTag.id = "scoreOutput"; //scorename sets the text within the output element. scoreTag.id sets the id
	document.getElementById("textDiv").appendChild(scoreName); //adds the text into the tag within the div which has the id textDiv
	document.getElementById("textDiv").appendChild(scoreTag); //adds the tags into the textDiv div

}

function tableFunction(){    //creates a table when play button is pressed
	var table = document.getElementById("grid");  //sets a variable which is linked to the table element within menu.html
	table.style.border = "1px solid black"; //sets the table style to a black border
	var row1 = table.insertRow(-1); //inserts 8 rows into the table.
	var row2 = table.insertRow(-1);
	var row3 = table.insertRow(-1);	
	var row4 = table.insertRow(-1);
	var row5 = table.insertRow(-1);
	var row6 = table.insertRow(-1);
	var row7 = table.insertRow(-1);
	var row8 = table.insertRow(-1);
	
	var cell0 = row1.insertCell(0); //inserts 8 cells in each row. Each variable is named after each cell
	var cell1 = row1.insertCell(1);
	var cell2 = row1.insertCell(2);
	var cell3 = row1.insertCell(3);
	var cell4 = row1.insertCell(4);
	var cell5 = row1.insertCell(5);
	var cell6 = row1.insertCell(6);
	var cell7 = row1.insertCell(7);
	var cell8 = row2.insertCell(0);
	var cell9 = row2.insertCell(1);
	var cell10 = row2.insertCell(2);
	var cell11 = row2.insertCell(3);
	var cell12 = row2.insertCell(4);
	var cell13 = row2.insertCell(5);
	var cell14 = row2.insertCell(6);
	var cell15 = row2.insertCell(7);
	var cell16 = row3.insertCell(0);
	var cell17 = row3.insertCell(1);
	var cell18 = row3.insertCell(2);
	var cell19 = row3.insertCell(3);
	var cell20 = row3.insertCell(4);
	var cell21 = row3.insertCell(5);
	var cell22 = row3.insertCell(6);
	var cell23 = row3.insertCell(7);
	var cell24 = row4.insertCell(0);
	var cell25 = row4.insertCell(1);
	var cell26 = row4.insertCell(2);
	var cell27 = row4.insertCell(3);
	var cell28 = row4.insertCell(4);
	var cell29 = row4.insertCell(5);
	var cell30 = row4.insertCell(6);
	var cell31 = row4.insertCell(7);
	var cell32 = row5.insertCell(0);
	var cell33 = row5.insertCell(1);
	var cell34 = row5.insertCell(2);
	var cell35 = row5.insertCell(3);
	var cell36 = row5.insertCell(4);
	var cell37 = row5.insertCell(5);
	var cell38 = row5.insertCell(6);
	var cell39 = row5.insertCell(7);
	var cell40 = row6.insertCell(0);
	var cell41 = row6.insertCell(1);
	var cell42 = row6.insertCell(2);
	var cell43 = row6.insertCell(3);
	var cell44 = row6.insertCell(4);
	var cell45 = row6.insertCell(5);
	var cell46 = row6.insertCell(6);
	var cell47 = row6.insertCell(7);
	var cell48 = row7.insertCell(0);
	var cell49 = row7.insertCell(1);
	var cell50 = row7.insertCell(2);
	var cell51 = row7.insertCell(3);
	var cell52 = row7.insertCell(4);
	var cell53 = row7.insertCell(5);
	var cell54 = row7.insertCell(6);
	var cell55 = row7.insertCell(7);
	var cell56 = row8.insertCell(0);
	var cell57 = row8.insertCell(1);
	var cell58 = row8.insertCell(2);
	var cell59 = row8.insertCell(3);
	var cell60 = row8.insertCell(4);
	var cell61 = row8.insertCell(5);
	var cell62 = row8.insertCell(6);
	var cell63 = row8.insertCell(7);
	
	cell0.id = "0";  //sets an id for each cell
	cell1.id = "1";
	cell2.id = "2";
	cell3.id = "3";
	cell4.id = "4";
	cell5.id = "5";
	cell6.id = "6";
	cell7.id = "7";
	cell8.id = "8";
	cell9.id = "9";
	cell10.id = "10";
	cell11.id = "11";
	cell12.id = "12";
	cell13.id = "13";
	cell14.id = "14";
	cell15.id = "15";
	cell16.id = "16";
	cell17.id = "17";
	cell18.id = "18";
	cell19.id = "19";
	cell20.id = "20";
	cell21.id = "21";
	cell22.id = "22";
	cell23.id = "23";
	cell24.id = "24";
	cell25.id = "25";
	cell26.id = "26";
	cell27.id = "27";
	cell28.id = "28";
	cell29.id = "29";
	cell30.id = "30";
	cell31.id = "31";
	cell32.id = "32";
	cell33.id = "33";
	cell34.id = "34";
	cell35.id = "35";
	cell36.id = "36";
	cell37.id = "37";
	cell38.id = "38";
	cell39.id = "39";
	cell40.id = "40";
	cell41.id = "41";
	cell42.id = "42";
	cell43.id = "43";
	cell44.id = "44";
	cell45.id = "45";
	cell46.id = "46";
	cell47.id = "47";
	cell48.id = "48";
	cell49.id = "49";
	cell50.id = "50";
	cell51.id = "51";
	cell52.id = "52";
	cell53.id = "53";
	cell54.id = "54";
	cell55.id = "55";
	cell56.id = "56";
	cell57.id = "57";
	cell58.id = "58";
	cell59.id = "59";
	cell60.id = "60";
	cell61.id = "61";
	cell62.id = "62";
	cell63.id = "63";
}

function playerFunction(x){ //player image also used to move the player around, by moving the image to different cell positions
	document.getElementById(x).innerHTML = ""; //clears anything that is in the cell the player is about to enter into 
	if (playerCounter > 0){
		j.innerHTML = ""; //* if a move has been made. Delete the previous cell the player was in
		scoreCounter++; //increments score
	}
	player = new Image();  //player image
	player.src = 'player.png'; //image file 
	player.style.height = '45px';  //image height
	player.style.width = '45px';  //image width
	document.getElementById(x).appendChild(player);  // appendChild is used to insert an image in javascript http://stackoverflow.com/questions/7802744/adding-an-img-element-to-a-div-with-javascript
	j = document.getElementById(x); //used to store the current position so that image can be deleted when player moves again
	 //increment counter
	
	if (x==5 && boolChest1 == true){ //if the player is in cell 5 and the ability chest has not been entered before, run ability function. Set boolChest1 to false to identify that the chest has been opened
		abilityFunction();
		boolChest1 = false;
	}
	else if(x==15 && boolChest2 == true){ //if the player is in cell 15 and the ability chest has not been entered before, run ability function. Set boolChest2 to false to identify that the chest has been opened
		abilityFunction();
		boolChest2 = false;
	}
	else if(x==26 && boolChest3 == true){
		abilityFunction();
		boolChest3 = false;
	}
	else if(x==46 && boolChest4 == true){
		abilityFunction();
		boolChest4 = false;
	}
	else if(x==59 && boolChest5 == true){
		abilityFunction();
		boolChest5 = false;
	}
	else if (x==3 && boolChest6 == true){
		abilityFunction();
		boolChest6 = false;
	}
	else if(x==8 && boolChest7 == true){
		abilityFunction();
		boolChest7 = false;
	}
	else if(x==10 && boolChest8 == true){
		abilityFunction();
		boolChest8 = false;
	}
	else if(x==20 && boolChest9 == true){
		abilityFunction();
		boolChest9 = false;
	}
	else if(x==29 && boolChest10 == true){
		abilityFunction();
		boolChest10 = false;
	}
	else if(x==33 && boolChest11 == true){
		abilityFunction();
		boolChest11 = false;
	}
	else if (x==39 && boolChest12 == true){
		abilityFunction();
		boolChest12 = false;
	}
	else if(x==40 && boolChest13 == true){
		abilityFunction();
		boolChest13 = false;
	}
	else if(x==43 && boolChest14 == true){
		abilityFunction();
		boolChest14 = false;
	}
	else if(x==53 && boolChest15 == true){
		abilityFunction();
		boolChest15 = false;
	}
	else if(x==57 && boolChest16 == true){
		abilityFunction();
		boolChest16 = false;
	}
	else{}
	
	if (monNoMove > 2){
		monsterMovementFunction();	//if the speed ability isnt active, run monsterMovementFunction, else dont move the monster and increment counter
	}
	else{
		monNoMove++;
	}
	if (x==47){
		gameWonFunction();  //if player is in in cell 47. The game is won
	}
	else if(playerPosition == monsterPosition){ //if player and monster are in the same room run gameLostFunction
		gameLostFunction();
	}
	else{}
	
	score(scoreCounter);  //run score function and pass scoreCounter variable into function
	playerCounter++;  //increment playerCounter
}

function exitFunction(x){ //displays the exit image
	document.getElementById(x).innerHTML = ""; //clears the cell and then adds the image
	exit = new Image();  //exit image
	exit.src = 'exit.png';  //image file
	exit.style.height = '50px';  //image height
	exit.style.width = '50px';  //image width
	document.getElementById(x).appendChild(exit);  // appendChild is used to insert an image in javascript
}

function monsterFunction(x){  //monster image
	document.getElementById(x).innerHTML = ""; //clear the cell the monster is about to enter into 
	
	if (monsterCounter>0){ //if a move has been made. Delete the previous cell the monster was in
		k.innerHTML = "";
	}
	else{}
	
	if (x==5 && boolChest1 == true){ //if a monster walks into an ability chest room and the chest is active, disable it
	boolChest1 = false;
	}
	else if(x==15 && boolChest2 == true){
		boolChest2 = false;
	}
	else if(x==26 && boolChest3 == true){
		boolChest3 = false;
	}
	else if(x==46 && boolChest4 == true){
		boolChest4 = false;
	}
	else if(x==59 && boolChest5 == true){
		boolChest5 = false;
	}
	else if (x==3 && boolChest6 == true){
		boolChest6 = false;
	}
	else if (x==8 && boolChest7 == true){
		boolChest7 = false;
	}
	else if(x==10 && boolChest8 == true){
		boolChest8 = false;
	}
	else if(x==20 && boolChest9 == true){
		boolChest9 = false;
	}
	else if(x==29 && boolChest10 == true){
		boolChest10 = false;
	}
	else if(x==33 && boolChest11 == true){
		boolChest11 = false;
	}
	else if (x==39 && boolChest12 == true){
		boolChest12 = false;
	}
	else if(x==40 && boolChest13 == true){
		boolChest13 = false;
	}
	else if(x==43 && boolChest14 == true){
		boolChest14 = false;
	}
	else if(x==53 && boolChest15 == true){
		boolChest15 = false;
	}
	else if(x==57 && boolChest16 == true){
		boolChest16 = false;
	}
	else{}
	
	monster = new Image();  //monster image
	monster.src = 'monster.png'; //monster file
	monster.style.height = '45px'; //monster height
	monster.style.width = '45px'; //monster width
	if (darkCounter >= 3){ //if darkcounter is greater than or equal to 3, insert monster image into cell, else get rid of it and increment darkCounter
		n = document.getElementById(x).appendChild(monster);  
	}
	else{
		n.innerHTML = "";
		darkCounter++;
	}
	k = document.getElementById(x); //save the cell position of the last place the monster is. In order to be able to delete the image in the next move
	

	
	if(playerPosition == monsterPosition){ //if the player position is the same as the monster position. End the game
		gameLostFunction(); //run gameLostFunction
	}
	else{}
	
	if (monsterCounter>0){ //if a move has been made
		if (playerPosition == pastMonsterMove){ //if the player passes the monster while entering a room the game is over. If player is moving from cell 2 to cell 3 and monster is moving from cell 3 to cell 2 (their paths cross)
			gameLostFunction();
		}
	}
	else{}
	pastMonsterMove = monsterPosition; //monster position is stored so it knows what the previous move was
	monsterCounter++; //increment counter to check if a move has been made
}


function abilityFunction(){  //this function picks a random ability and runs its function
	abilityPick = Math.floor(Math.random() * 3)+1; //picks a random number between 1, 2 or 3
	if (abilityPick == 1){  //if number 1 is selected, run the speed Ability
		doubleMoveFunction();
	}
	else if (abilityPick == 2){ //if number 2 is selected, run the freeze debuff
		playerTrappedFunction(); 
	}
	else if (abilityPick == 3){ //if number 3 is selected, run the invisible debuff
		darkFunction();
	}
	else{}
	scoreCounter+=10; //increase score by 10
}

function doubleMoveFunction(){ //speed ability
	monNoMove = 0;  //set monNoMove to 0 so that monster cannot move for 3 moves
	clearCanvas(); //clear the canvas
	canvText.fillText("Speed Ability", 150,50);// set the text to display "Speed Ability"
	if (playerPosition == 46 || playerPosition == 39){  //if the playerPosition is 46 or 39 do not do anything
	}
	else{
		setTimeout(clearCanvas, 500)//https://www.w3schools.com/js/js_timing.asp else in 0.5 seconds run clearCanvas function
	}
	
	return monNoMove; //return value of monNoMove
}


function playerTrappedFunction(){ //freeze debuff
	playerNoMove = 0;  //set playerNoMove to 0 so that the player cannot move for 3 moves
	clearCanvas(); //clear the canvas
	canvText.fillText("Freeze Debuff", 150,50);//display freeze debuff in canvas
	if (playerPosition == 46 || playerPosition == 39){ //if the playerPosition is 46 or 39 do not do anything
	}
	else{
		setTimeout(clearCanvas, 500)// else wait 0.5 seconds and run clear canvas https://www.w3schools.com/js/js_timing.asp
	}
	return playerNoMove; //return value of playerNoMove
}

function darkFunction(){ //invisible debuff
	darkCounter = 0; //set darkCounter to 0 so that the monster becomes invisible for 3 moves
	clearCanvas(); //clear canvas
	canvText.fillText("Invisible Debuff", 150,50);//display invisible debuff in canvas
	if (playerPosition == 46 || playerPosition == 39){ //if playerPosition is 46 or 39 do not do anything 
	}
	else{
		setTimeout(clearCanvas, 500) //https://www.w3schools.com/js/js_timing.asp else run clearCanvas in 0.5 seconds
	}
	return darkCounter; //return value of darkCounter
}

function clearCanvas(){
		canvText.clearRect(0, 0, canv.width, canv.height); //clear the canvas http://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
}

function listen(){ //https://www.kirupa.com/html5/keyboard_events_in_javascript.htm detects keyboard presses

	window.addEventListener('keydown', arrowDetectionFunction); //when a button is pressed on the keyboard, run arrowDetectionFunction

}

function chest1(x){  //puts the first chest image in specified cell.
	chest1 = new Image();  //chest image
	chest1.src = 'mystery.png';
	chest1.style.height = '50px';
	chest1.style.width = '50px';
	document.getElementById(x).appendChild(chest1);  //insert image into cell 
	c1 = document.getElementById(x);  //used to clear the chests at the end of the game
}
function chest2(x){ //same code as chest 1 but for chest 2
	chest2 = new Image();  //chest image
	chest2.src = 'mystery.png';
	chest2.style.height = '50px';
	chest2.style.width = '50px';
	document.getElementById(x).appendChild(chest2);  //insert into cell 
	c2 = document.getElementById(x);
}
function chest3(x){
	chest3 = new Image();  //chest image
	chest3.src = 'mystery.png';
	chest3.style.height = '50px';
	chest3.style.width = '50px';
	document.getElementById(x).appendChild(chest3);  //insert into cell 
	c3 = document.getElementById(x);
}
function chest4(x){
	chest4 = new Image();  //chest image
	chest4.src = 'mystery.png';
	chest4.style.height = '50px';
	chest4.style.width = '50px';
    document.getElementById(x).appendChild(chest4);  //insert into cell 
	c4 = document.getElementById(x);
}
function chest5(x){
	chest5 = new Image();  //chest image
	chest5.src = 'mystery.png';
	chest5.style.height = '50px';
	chest5.style.width = '50px';
	document.getElementById(x).appendChild(chest5);  //insert into cell 
	c5 = document.getElementById(x);
}
function chest6(x){
	chest1 = new Image();  //chest image
	chest1.src = 'mystery.png';
	chest1.style.height = '50px';
	chest1.style.width = '50px';
	document.getElementById(x).appendChild(chest1);  //insert into cell 
	c6 = document.getElementById(x);
}
function chest7(x){
	chest1 = new Image();  //chest image
	chest1.src = 'mystery.png';
	chest1.style.height = '50px';
	chest1.style.width = '50px';
	document.getElementById(x).appendChild(chest1);  //insert into cell 
	c7 = document.getElementById(x);
}
function chest8(x){
	chest1 = new Image();  //chest image
	chest1.src = 'mystery.png';
	chest1.style.height = '50px';
	chest1.style.width = '50px';
	document.getElementById(x).appendChild(chest1);  //insert into cell 
	c8 = document.getElementById(x);
}
function chest9(x){
	chest1 = new Image();  //chest image
	chest1.src = 'mystery.png';
	chest1.style.height = '50px';
	chest1.style.width = '50px';
	document.getElementById(x).appendChild(chest1);  //insert into cell 
	c9 = document.getElementById(x);
}
function chest10(x){
	chest1 = new Image();  //chest image
	chest1.src = 'mystery.png';
	chest1.style.height = '50px';
	chest1.style.width = '50px';
	document.getElementById(x).appendChild(chest1);  //insert into cell 
	c10 = document.getElementById(x);
}
function chest11(x){
	chest1 = new Image();  //chest image
	chest1.src = 'mystery.png';
	chest1.style.height = '50px';
	chest1.style.width = '50px';
	document.getElementById(x).appendChild(chest1);  //insert into cell 
	c11 = document.getElementById(x);
}
function chest12(x){
	chest1 = new Image();  //chest image
	chest1.src = 'mystery.png';
	chest1.style.height = '50px';
	chest1.style.width = '50px';
	document.getElementById(x).appendChild(chest1);  //insert into cell
	c12 = document.getElementById(x);
}
function chest13(x){
	chest1 = new Image();  //chest image
	chest1.src = 'mystery.png';
	chest1.style.height = '50px';
	chest1.style.width = '50px';
	document.getElementById(x).appendChild(chest1);  //insert into cell 
	c13 = document.getElementById(x);
}
function chest14(x){
	chest1 = new Image();  //chest image
	chest1.src = 'mystery.png';
	chest1.style.height = '50px';
	chest1.style.width = '50px';
	document.getElementById(x).appendChild(chest1);  //insert into cell
	c14 = document.getElementById(x);
}
function chest15(x){
	chest1 = new Image();  //chest image
	chest1.src = 'mystery.png';
	chest1.style.height = '50px';
	chest1.style.width = '50px';
	document.getElementById(x).appendChild(chest1);  //insert into cell
	c15 = document.getElementById(x);
}
function chest16(x){
	chest1 = new Image();  //chest image
	chest1.src = 'mystery.png';
	chest1.style.height = '50px';
	chest1.style.width = '50px';
	document.getElementById(x).appendChild(chest1);  //insert into cell 
	c16 = document.getElementById(x);
}

function arrowDetectionFunction(event){  //https://www.kirupa.com/html5/keyboard_events_in_javascript.htm detects exactly which keyboard button is pressed
	if (gameOver == false){	
		var i = 3;   
		switch(event.keyCode){ //handles the event (button being pressed)
		case 37: //left key
			i = 0;	//if left arrow key is pressed i = 0
		break;
		
		case 39: //right key
			i = 1; //if right arrow key is pressed i = 1
		break;
		
		case 40: //down key
			i = 2; //if down arrow key is pressed i = 2
		break;
		
		case 38: //up key
			i = 3; //if up arrow key is pressed i = 3
		break;
		}
		if (playerNoMove > 2){ //if freeze debuff is not running 
			arrowMovementFunction(i); //run function and pass the value of i into the function	
		}
		else{ //else increment playerNoMove, and do not allow player to move.
			playerNoMove++;
			monsterMovementFunction();
			if(playerPosition == monsterPosition){ //if playerPosition equals monsterPosition the game is lost 
				gameLostFunction();
			}
		}
	}
	else{}
}


function arrowMonsterMovementFunction(m){ //used to change the cell position of the monster as well as restrict the monster within the grid.
	if (monsterPosition == 0){ //if the monster is in the top left corner. Add a value from the topLeftCornerPositionArray dependent on the arrow key pressed
		monsterPosition+= topLeftCornerPositionArray[m]; 
	}
	
	else if (playerPosition == 1 || monsterPosition == 2 || monsterPosition == 3 || monsterPosition == 4 || monsterPosition == 5 || monsterPosition == 6){
		monsterPosition+= topRowPositionArray[m]; //if monster is in the top row, add a value from the topRowPositionArray dependent on the arrow key pressed
	}
	
	else if (monsterPosition == 7){ //if monster is in the top right corner, add a value from the topRightCornerPositionArray dependent on the arrow key pressed
		monsterPosition+= topRightCornerPositionArray[m];
	}
	
	else if (monsterPosition == 8 || monsterPosition == 16 || monsterPosition == 24 || monsterPosition == 32 || monsterPosition == 40 || monsterPosition == 48){
		monsterPosition+= leftColumnPositionArray[m];  //if monster is in the most left column, add a value from the leftColumnPositionArray dependent on the arrow key pressed
	}
	
	else if (monsterPosition == 15 || monsterPosition == 23 || monsterPosition == 31 || monsterPosition == 39 || monsterPosition == 55){ //if monster is in the most right column, add a value from the rightColumnPositionArray dependent on the arrow key pressed
		monsterPosition+= rightColumnPositionArray[m];
	}
	
	else if (monsterPosition == 56){
		monsterPosition+= bottomLeftCornerPositionArray[m];  //if monster is in the bottom left corner, add a value from the bottomLeftCornerPositionArray dependent on the arrow key pressed
	}
	
	else if (monsterPosition == 57 || monsterPosition == 58 || monsterPosition == 59 || monsterPosition == 60 || monsterPosition == 61 || monsterPosition == 62){
		monsterPosition+= bottomRowPositionArray[m];  //if monster is in the bottom row, add a value from the bottomRowPositionArray dependent on the arrow key pressed
	}
	
	else if (monsterPosition == 63){
		monsterPosition+= bottomRightCornerPositionArray[m];  //if monster is in the bottom right corner, add a value from the bottomRightCornerPositionArray dependent on the arrow key pressed
	}
	
	else{
		monsterPosition+= middleCellsPositionArray[m]; //if monster is in the middle cells, add a value from the middleCellsPositionArray dependent on the arrow key pressed
	}
	
	
	monsterFunction(monsterPosition); //run monsterFunction and pass the value of monsterPosition into the function
}

function arrowMovementFunction(i){   //similar to the arrowMonsterMovementFunction except this is used to move the player
	if (playerPosition == 0){ //if the player is in the top left corner. Add a value from the topLeftCornerPositionArray dependent on the arrow key pressed
		playerPosition+= topLeftCornerPositionArray[i];
	}
	
	else if (playerPosition == 1 || playerPosition == 2 || playerPosition == 3 || playerPosition == 4 || playerPosition == 5 || playerPosition == 6){
		playerPosition+= topRowPositionArray[i]; //if player is in the top row, add a value from the topRowPositionArray dependent on the arrow key pressed
	}
	
	else if (playerPosition == 7){
		playerPosition+= topRightCornerPositionArray[i];//if player is in the top right corner, add a value from the topRightCornerPositionArray dependent on the arrow key pressed
	}
	
	else if (playerPosition == 8 || playerPosition == 16 || playerPosition == 24 || playerPosition == 32 || playerPosition == 40 || playerPosition == 48){
		playerPosition+= leftColumnPositionArray[i]; //if player is in the most left column, add a value from the leftColumnPositionArray dependent on the arrow key pressed
	}
	
	else if (playerPosition == 15 || playerPosition == 23 || playerPosition == 31 || playerPosition == 39 || playerPosition == 55){//if player is in the most right column, add a value from the rightColumnPositionArray dependent on the arrow key pressed
		playerPosition+= rightColumnPositionArray[i];
	}
	
	else if (playerPosition == 56){
		playerPosition+= bottomLeftCornerPositionArray[i]; //if player is in the bottom left corner, add a value from the bottomLeftCornerPositionArray dependent on the arrow key pressed
	}
	
	else if (playerPosition == 57 || playerPosition == 58 || playerPosition == 59 || playerPosition == 60 || playerPosition == 61 || playerPosition == 62){
		playerPosition+= bottomRowPositionArray[i]; //if player is in the bottom row, add a value from the bottomRowPositionArray dependent on the arrow key pressed
	}
	
	else if (playerPosition == 63){
		playerPosition+= bottomRightCornerPositionArray[i]; //if player is in the bottom right corner, add a value from the bottomRightCornerPositionArray dependent on the arrow key pressed
	}
	
	else{
		playerPosition+= middleCellsPositionArray[i]; //if player is in the middle cells, add a value from the middleCellsPositionArray dependent on the arrow key pressed
	}
	
	
	playerFunction(playerPosition); //run playerFunction and pass the value of playerPosition into the function
}

function gameWonFunction(){//runs if the player has won the game
	clearCanvas(); //clear the canvas
	canv = document.getElementById("myCanvas"); 
	canvText = canv.getContext("2d");
	canvText.font = "28px Impact";
	canvText.fillText("You won! Press Back To Menu to exit", 10,50);//https://www.w3schools.com/html/html5_canvas.asp

	endGameFunction(); //run end game function which stops registering input and deletes images
	highScoreSaveFunction(); //run this function to save the highscore
	gameOver = true; //set gameOver boolean to true, to signify that the game is over
}

function gameLostFunction(){//run if the player has lost the game
	endGameFunction(); //run the end game function to delete images and stop registering player input
	gameOver = true; //set gameOver boolean to true, to signify that the game is over
	setTimeout(gameLostTextFunction, 300) //run the game lost canvas text after 0.3 seconds
}

function gameLostTextFunction(){ //display the game lost message in the canvas
	canvText.clearRect(0, 0, canv.width, canv.height);
	canv = document.getElementById("myCanvas");
	canvText = canv.getContext("2d");
	canvText.font = "28px Impact";
	canvText.fillText("You lost! Press Back To Menu to exit", 10,50);
}

function endGameFunction(){  
	j.innerHTML = ""; //deletes the player image
	c1.innerHTML = ""; //deletes all of the ability chests
	c2.innerHTML = "";
	c3.innerHTML = "";
	c4.innerHTML = "";
	c5.innerHTML = "";
	c6.innerHTML = "";
	c7.innerHTML = "";
	c8.innerHTML = "";
	c9.innerHTML = "";
	c10.innerHTML = "";
	c11.innerHTML = "";
	c12.innerHTML = "";
	c13.innerHTML = "";
	c14.innerHTML = "";
	c15.innerHTML = "";
	c16.innerHTML = "";
	exitFunction(47); //keeps the exit image
}

/*function onKeyDown(event) {   
  event.preventDefault();
}*/


function search(){ // this function searches for the player by checking all the cells that are horizontal and diagonal to the monster
	rUC = 0;  //counter for rows up
	rDC = 0;  //counter for rows down
	rLC = 0;  //counter for rows left
	rRC = 0;  //counter for rows right
	
	rUArray = []; //empty arrays for up, down, left and right.
	rDArray = []; 
	rLArray = [];
	rRArray = [];
	
	rowsUp = Math.floor(monsterPosition/8); //calculates how many rows there are above the monster by dividing the monsters cell position by 8 and adding 1
	rowsDown = (8-rowsUp)-1; //calculates how many rows there are below the monster by minising the amount of rows are above the monster by 8
	rowsLeft = (monsterPosition%8); //this gets how many cells there are to the left of the monster by dividing the cell position by 8. The remainder is the value
	rowsRight = (8-rowsLeft)-1; // this minus' the value of rows left by 8 to see how many rows are to the right of the monster

	upMonsterPosition = monsterPosition; //used to get the cell position of the monster and use it for the calculation of cell position
	downMonsterPosition = monsterPosition;
	leftMonsterPosition = monsterPosition;
	rightMonsterPosition = monsterPosition;
	
	while(rowsUp>=rUC){ // while the number of rows above the monster is greater than 0
		upMonsterPosition+= -8; //minus the monster position by 8 (goes up a row)
		rUArray.push(upMonsterPosition); //store the value as an element in the row up array 
		rUC++; //increment counter
	}
	
	while(rowsDown>rDC){ //does the same as rowsUp except with rowsDown variables and arrays
		downMonsterPosition+= 8; //goes down a row
		rDArray.push(downMonsterPosition);
		rDC++;
	}
	
	while(rowsLeft>rLC){ //does the same as rowsUp except with rowsLeft variables and arrays
		leftMonsterPosition+= -1; //goes to the cell on the left
		rLArray.push(leftMonsterPosition);
		rLC++;
	}
	
	while(rowsRight>rRC){ //does the same as rowsUp except with rowsRight variables and arrays
		rightMonsterPosition+= 1; //goes to the cell on the right
		rRArray.push(rightMonsterPosition);
		rRC++;
	}
	
	return rUArray, rDArray, rLArray, rRArray; //return the elements of the array
}
function monsterCheckBefore(){ //a function used to check the player position before it moves
	search(); //run the search function
	if (checkCells(rUArray, playerPosition) == true){ //check to see if the player has been spotted in the cells above the monster
		playerFound1 = true; //if spotted set the playerFound1 to true
		upMove1 = true; //set upMove to true
		downMove1 = false;
		leftMove1 = false;
		rightMove1 = false;
	}
	else if (checkCells(rDArray, playerPosition) == true){ //check to see if the player has been spotted in the same column below the monster, mark that player has been found below the monster if found
		playerFound1 = true;
		upMove1 = false;
		downMove1 = true;
		leftMove1 = false;
		rightMove1 = false;
	}
	else if (checkCells(rLArray, playerPosition) == true){ //check to see if the player is in the same row to the left of the monster, mark that player has been found to the left if found
		playerFound1 = true;
		upMove1 = false;
		downMove1 = false;
		leftMove1 = true;
		rightMove1 = false;
	}
	else if (checkCells(rRArray, playerPosition) == true){ //check to see if the player is in the same row to the right of the monster, mark that player has been found to the right if found
		playerFound1 = true;
		upMove1 = false;
		downMove1 = false;
		leftMove1 = false;
		rightMove1 = true;
	}
	else{
		playerFound1 = false; //else mark that the player has not been spotted
	}

	return playerFound1, upMove1, downMove1, leftMove1, rightMove1; // return values 
}

function monsterCheckAfter(){ //exactly the same as monsterCheckBefore, except this function is run after the monster has taken a move. Checks the cells in the same row and column of the monster for the player. Stores information in different variables to monsterCheckBefore
	search();
	if (checkCells(rUArray, playerPosition) == true){
		playerFound2 = true;
		upMove2 = true;
		downMove2 = false;
		leftMove2 = false;
		rightMove2 = false;
	}
	else if (checkCells(rDArray, playerPosition) == true){
		playerFound2 = true;
		upMove2 = false;
		downMove2 = true;
		leftMove2 = false;
		rightMove2 = false;
	}
	else if (checkCells(rLArray, playerPosition) == true){
		playerFound2 = true;
		upMove2 = false;
		downMove2 = false;
		leftMove2 = true;
		rightMove2 = false;
	}
	else if (checkCells(rRArray, playerPosition) == true){
		playerFound2 = true;
		upMove2 = false;
		downMove2 = false;
		leftMove2 = false;
		rightMove2 = true;
	}
	else{}

	return playerFound2, upMove2, downMove2, leftMove2, rightMove2;
}

function monsterMovementFunction(){  //this function is used to decide where the monster should move based off the player position

	monsterCheckBefore(); //run function to check player position before monster moves
	if (playerFound1 == true){ //if player has been found from monsterCheckBefore
		if (upMove1 == true){   //if the player is above the monster
			m = 3;
		}
		else if (downMove1 == true){ //if the player is below the monster 
			m = 2;
		}
		else if (leftMove1 == true){  //if the player is to the left of the monster
			m = 0;
		}
		else if (rightMove1 == true){  //if the player is to the right of the monster
			m = 1;
		}
		else{}
		arrowMonsterMovementFunction(m); //pass the value of m into the arrowMonsterMovementFunction
		monsterCheckAfter(); //run function to look for player position after monster movement
	}
	else{ //else, player has not been spotted before movement, check to see if the monster has been spotted after movement
		if (upMove2 == true){   //if the player is above the monster
			m = 3;
		}
		else if (downMove2 == true){ //if the player is below the monster 
			m = 2;
		}
		else if (leftMove2 == true){  //if the player is to the left of the monster
			m = 0;
		}
		else if (rightMove2 == true){  //if the player is to the right of the monster
			m = 1;
		}
		else{
			defaultMove(); //if the player has not been spotted, run the defaultMove function
		}
		arrowMonsterMovementFunction(m); //pass the value of m into arrowMonsterMovementFunction
		monsterCheckAfter(); //run function to look for player position after monster movement
	}
}

function defaultMove(){ //the function used to move the monster to the top left corner if the player has not been spotted
	
	if (defaultCounter==0){  //if counter is 0 move monster to the left 
		m = 0;
		defaultCounter++; //increment counter
	}
	else{				//else move monster up
		m = 3;
		defaultCounter = 0; //reset counter
	}
	
	return m; //return the value of m
}





function checkCells(lookUpArray, findElement){ //this is a function used to check if an element is in an array 
	for(var i=0; i<lookUpArray.length; i++){ //for loop which runs for the length of the specified array
		if (lookUpArray[i] == findElement)return true; //if the playerPosition is in the selected array, return a true value http://stackoverflow.com/questions/7378228/check-if-an-element-is-present-in-an-array	
	}
}


function score(scoreCounter){ //This function displays the current score on screen
	document.getElementById("scoreOutput").innerHTML = scoreCounter;
}


//property of Tomasz Dobrowolski 