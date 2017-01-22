#pragma strict

var cursor : GameObject;
var bar : GameObject;
var gameMaster : GameObject;

var upperLimit : float;
var lowerLimit : float;

private var cursorPercent : float;
private var numberOfColors : int = 6;
var isColorSelected : boolean;
var isMoving : boolean;
var isShooting : boolean;
var step : float;
var delay : float;
private var increment : float;
private var timeLimit : float;
private var blockedTime : float;
var blockDelay : float;
var blocked : boolean;

var effects : GameObject[];

private var lastEffectColor : int;
private var actualEffectColor : int;


function Start () {
    isMoving = false;
    isShooting = false;
    timeLimit = Time.time;
    cursorPercent = 0.5;
    increment = step;
    //updateEffect();
}

function Update () {
    if(blocked) {
        if(blockedTime < Time.time) {
            effects[actualEffectColor].SetActive(true);
            blocked = false;
            if(Input.GetButton("Jump")){
                startMove();
            }
        }
    }
    else{
        if(Input.GetButtonDown("Jump")) { // Spacebar Pressed
            startMove();
        }

        if(Input.GetButtonUp("Jump")) { // SpaceBar Released
            stopMove();
        }

        if(isMoving) { // the cursor is in moviment
            cursorPercent += increment * Time.deltaTime;
            if(cursorPercent >= 1){
                //Cap the value to 1 and revert the signal of the increment
                cursorPercent = 1;
                increment *= -1;
            }

            else if(cursorPercent <= 0){
                //Cap the value to 0 and revert the signal of the increment
                cursorPercent = 0;
                increment *= -1;
            }
            //updateEffect();
        }

        if(isShooting) { //Color is select, must press again to shot
            if (timeLimit < Time.time) {
                isShooting = false;
                isColorSelected = false;
            }
        }

        //Update Cursor position
        cursor.transform.localPosition.x = ((upperLimit - lowerLimit) * cursorPercent ) + lowerLimit;
    }

}

function isRightColor (color : int) {
    var gameMasterBhv : gameMasterScript = gameMaster.GetComponent(gameMasterScript) as gameMasterScript;
    return gameMasterBhv.emitColor(color);
}

function startMove () {
    isMoving = true;
    effects[actualEffectColor].SetActive(false);
}

function stopMove() {
    var fireColor : int = Mathf.Floor(numberOfColors * cursorPercent);
    if(fireColor > (numberOfColors -1 )) {
        fireColor = (numberOfColors -1);
    }
    // Emit the color
    isShooting = false;
    isColorSelected = false;

    effects[fireColor].SetActive(true);
    if (!isRightColor(fireColor)) {
        blocked = true;
        blockedTime = Time.time + blockDelay;
        effects[actualEffectColor].SetActive(false);
        effects[fireColor].SetActive(false);
    }
    isMoving = false;
    actualEffectColor = fireColor;
}

function updateEffect() {
    actualEffectColor = Mathf.Floor(numberOfColors * cursorPercent);
    if(actualEffectColor > (numberOfColors -1 )) {
        actualEffectColor = (numberOfColors -1);
    }

    Debug.Log(actualEffectColor);
    Debug.Log(lastEffectColor);
    if(actualEffectColor != lastEffectColor) {
        effects[lastEffectColor].SetActive(false);
        effects[actualEffectColor].SetActive(true);
        lastEffectColor = actualEffectColor;
    }
}
