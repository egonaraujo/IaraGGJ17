#pragma strict

var ballonsSprites : GameObject[];
var colorsSprite : GameObject[];
var ballonLength : int;

var actualHit : int;
var colors : Array;
var gameMaster : GameObject;
var speed : float;;

var isDying : boolean;
var dyingDelay : float;

var ballonParent : GameObject;
var remainColors : GameObject[];

var colorDelay : float;

var rotationPoint : Vector3;
var rotationDelay : float;

private var worldPoint : Vector3;
private var ballonBhv : ballonScript;
private var ballon : GameObject;

function Start () {
	isDying = false;
    actualHit = 0;
}

function Update () {
	if (isDying) {
        // make rotation
        transform.RotateAround(worldPoint, Vector3.forward, rotationDelay);
    }
    else {
        transform.Translate(transform.right * speed * Time.deltaTime);
        if (transform.position.x > 8.5) {
            die(false);
        }
    }
}

function listenColor(color : int) {
    if(colors[actualHit] == color) {
        ballonBhv.removeColor(actualHit, colorDelay);
        ++actualHit;
        if(actualHit == ballonLength) {
            die(true);
        }
        return true;
    }
    return false;
}

function initFisher(c : Array, length : int, velocity: float, gm : GameObject) {
    colors = new Array();
    colors.length = length;
    var colorsgb : Array = new Array();
    for (var i = 0; i < length; ++i) {
        colors[i] = c[i];
        colorsgb.push(colorsSprite[colors[i]]);
    }
    gameMaster = gm;
    ballonLength = length;
    speed = velocity;
    ballon = Instantiate(ballonsSprites[length], ballonParent.transform);
    ballon.transform.localPosition = Vector3(0, 0, 0);
    ballonBhv = ballon.GetComponent(ballonScript) as ballonScript;
    ballonBhv.setColors(colorsgb);
}

function die(score : boolean) {
    isDying = true;
    var gameMasterBhv : gameMasterScript = gameMaster.GetComponent(gameMasterScript) as gameMasterScript;
    if (score) {
        gameMasterBhv.addScore();
    }
    gameMasterBhv.removeFisher();
    addFadeAndDie(gameObject, dyingDelay);
    addFadeAndDie(ballon, dyingDelay);
    worldPoint = transform.TransformPoint(rotationPoint);
}

function addFadeAndDie(dyingObject : GameObject, delay : float) {
    dyingObject.AddComponent(fadeAndDieScript);
    var fadeAndDieBhv : fadeAndDieScript = dyingObject.GetComponent(fadeAndDieScript) as fadeAndDieScript;
    fadeAndDieBhv.initBhv(delay);
}


