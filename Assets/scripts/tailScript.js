#pragma strict

var upperLimit : float;
var lowerLimit : float;

var speed : float;

var rotatePercent : float;

function Update() {
    rotatePercent += speed* Time.deltaTime;
    if(rotatePercent >= 1){
        //Cap the value to 1 and revert the signal of the speed
        rotatePercent = 1;
        speed *= -1;
    }

    else if(rotatePercent <= 0){
        //Cap the value to 0 and revert the signal of the speed
        rotatePercent = 0;
        speed *= -1;
    }

    gameObject.transform.Rotate(0, 0, (upperLimit - lowerLimit)*speed*Time.deltaTime);
}
