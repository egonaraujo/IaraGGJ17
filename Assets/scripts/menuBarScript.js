#pragma strict

import UnityEngine.SceneManagement;

var timePressed : float;
var isPressioned : boolean;
var timeWait : float;
var deltaTime : float;
var index : int;
var position : int;

var options : String [];

var buttons : GameObject [];

function Start () {
  deltaTime = 0;
  isPressioned = false;
  timeWait = 1;
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
    SceneManager.LoadScene(options[position]);
}

function changeOption(){
  if(position<3){
    position++;

  }else{
    position = 0;
  }

  for (var i : int = 0; i < 4; ++i) {
    buttons[i].SetActive(false);
  }
  buttons[position].SetActive(true);
}
