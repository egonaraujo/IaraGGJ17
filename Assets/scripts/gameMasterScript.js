#pragma strict

var bar : GameObject;
private var fishers : Array;
var fisherPrefab : GameObject;
private var score : int;

var upperLimit : float;
var lowerLimit : float;

var initialX : float;

function Start () {
    fishers = new Array();
}

function Update () {
	
}

function emitColor (color : int) {
    var success : boolean = false;
    for (var fisher : GameObject in fishers) {
        var fisherBhv : fisherScript = fisher.GetComponent(fisherScript) as fisherScript;
        success = success || fisherBhv.listenColor(color);
    }

    return success;
}

function addScore() {
    ++score;
}

function addFisher() {
    var position : Vector3 = Vector3(
        initialX,
        lowerLimit + (upperLimit - lowerLimit) * Random.value);
    Instantiate(fisherPrefab, position, Quaternion.identity);
}
