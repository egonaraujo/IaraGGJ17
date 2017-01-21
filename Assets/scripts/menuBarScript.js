#pragma strict

var cursor : GameObject;
var bar : GameObject;
var gameMaster : GameObject;

var timePressed : float;
var isPressioned : boolean;
var timeWait : float;
var deltaTime : float;
var index : int;

var options = ["Jogar", "Melhores Colocações", "Instruções"];

function Start () {
  deltaTime = 0;
  isPressioned = false;
  timeWait = 2;
  index = 0;
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
    //Debug.Log("Precionado por: " + deltaTime);
    //Debug.Log("timeWait: " + timeWait);
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
  if(index<3){
    Debug.Log(options[index]);
    index++;
  }else{
    index = 0;
  }
}

function changeOption(){
  Debug.Log("Vou trocar a option");
}
