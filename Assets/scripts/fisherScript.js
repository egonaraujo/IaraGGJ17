﻿#pragma strict

var ballonsSprites : GameObject[];
var colorsSprite : GameObject[];
var ballonLength : int;

var actualHit : int;
var colors : int[];
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

function Start () {
	isDying = false;
    actualHit = 0;
}

function Update () {
	if (isDying) {
        // make rotation
        transform.RotateAround(worldPoint, Vector3.back, rotationDelay);
    }
    else {
        transform.Translate(transform.forward * speed * Time.deltaTime);
    }
}

function listenColor(color : int) {
    if(colors[actualHit] == color) {
        ballonBhv.removeColor(actualHit, colorDelay);
        ++actualHit;
        if(actualHit == ballonLength) {
            die();
        }
    }
    return true;
}

function initFisher(c : Array, length : int, velocity: float, gm : GameObject) {
    for (var i = 0; i < length; ++i) {
        colors[i] = c[i];
    }
    gameMaster = gm;
    ballonLength = length;
    speed = velocity;
    var ballon : GameObject = Instantiate(ballonsSprites[length], ballonParent.transform);
    ballonBhv = ballon.GetComponent(ballonScript) as ballonScript;
}

function die() {
    isDying = true;
    var gameMasterBhv : gameMasterScript = gameMaster.GetComponent(gameMasterScript) as gameMasterScript;
    gameMasterBhv.addScore();
    addFadeAndDie(gameObject, dyingDelay);
    worldPoint = transform.TransformPoint(rotationPoint);
}

function addFadeAndDie(dyingObject : GameObject, delay : float) {
    dyingObject.AddComponent(fadeAndDieScript);
    var fadeAndDieBhv : fadeAndDieScript = dyingObject.GetComponent(fadeAndDieScript) as fadeAndDieScript;
    fadeAndDieBhv.initBhv(delay);
}


