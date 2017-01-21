#pragma strict

var bar : GameObject;
private var fishers : Array;
var fisherPrefab : GameObject;
private var score : int;

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
