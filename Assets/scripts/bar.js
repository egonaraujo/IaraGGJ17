#pragma strict

var cursor : GameObject;
var bar : GameObject;
var gameMaster : GameObject;

var upperLimit : float;
var lowerLimit : float;

private var cursorPercent : float;
private var numberOfColors : int = 7;
private var isColorSelected : boolean;
var isMoving : boolean;
var isShooting : boolean;
var step : float;
var delay : float;
private var increment : float;
private var timeLimit : float;
var blocked : boolean;


function Start () {
    isMoving = false;
    isShooting = false;
    timeLimit = Time.time;

}

function Update () {
    if(Input.GetButtonDown("Jump")) { // Spacebar Pressed
        if(isColorSelected) { //Fire the color
            var fireColor : int = Mathf.Floor(numberOfColors * cursorPercent);
            if(fireColor > 6) {
                fireColor = 6;
            }
            // Emit the color
            isShooting = false;
        }
        else { //Move the cursor
            isMoving = true;
        }
    }

    if(Input.GetButtonUp("Jump")) { // SpaceBar Released
        if(isColorSelected) { // Just Fired
            
        }
        else { // Cursor just stoped
            // start timeStamp to shoot
            isShooting = true;
            timeLimit = Time.time + delay;
            isColorSelected = true;
            isMoving = false;
        }
    }

    if(isMoving) { // the cursor is in moviment
        cursorPercent += increment;
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
    }

    if(isShooting) { //Color is select, must press again to shot
        if (timeLimit > Time.time) {
            isShooting = false;
            isColorSelected = false;
        }
    }
}

function emitColor (color : int) {
    
}
