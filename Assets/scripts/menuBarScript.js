#pragma strict

var cursor : GameObject;
var bar : GameObject;
var gameMaster : GameObject;

var timePressed : float;
var isPressioned : boolean;
var timeWait : float;
var deltaTime : float;

var options = ["Jogar", "Melhores Colocações", "Instruções"];

function Start () {
  deltaTime = 0;
  isPressioned = false;
  timeWait = 2;
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
    Debug.Log("Precionado por: " + deltaTime);
    Debug.Log("timeWait: " + timeWait);
    if(deltaTime>timeWait){
      //mudar a scene pra opção escolhida
      isPressioned = false;
      Debug.Log("Maior escolhe");
    }else{
      isPressioned = false;
      Debug.Log("Menor muda");
    }
  }
}
