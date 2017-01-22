#pragma strict

var cursor : GameObject;
var bar : GameObject;
var gameMaster : GameObject;

var timePressed : float;
var isPressioned : boolean;
var timeWait : float;
var deltaTime : float;
var index : int;
var position : int;

var options = ["Jogar", "Equipe", "Instruções", "Leaderboard"];

function Start () {
  deltaTime = 0;
  isPressioned = false;
  timeWait = 2;
  index = 0;
  position = 0;
}

function Update () {
  startTimer();
  checkUp();
}

function startTimer(){
  if(Input.GetButtonDown("Jump") && (!isPressioned)) { // Spacebar Pressed
    timePressed = Time.time;
    isPressioned = true;
  }
}

function checkUp(){
  if(Input.GetButtonUp("Jump") && (isPressioned==true)){
    deltaTime = Time.time - timePressed;
    if(deltaTime>timeWait){
      //mudar a scene pra opção escolhida
      isPressioned = false;
      changeScene();
    }else{
      isPressioned = false;
      changeOption();
    }
  }
}

function changeScene(){
  Debug.Log("Vou trocar a cena");
  if(index<4){
    Debug.Log(options[index]);
    index++;
  }else{
    index = 0;
  }
}

function changeOption(){
  Debug.Log("Vou trocar a option");
  if(position<4){
    Debug.Log(options[position]);
    position++;
  }else{
    position = 0;
  }
}
