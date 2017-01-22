#pragma strict

var colorsParents : GameObject[];
var colorsSprites : GameObject[];

function Start() {

}

function Update() {

}

function setColors (colors : Array) {
    for (var i : int = 0; i < colors.length; ++i) {
        colorsSprites[i] = Instantiate(colors[i], colorsParents[i].transform);
    }
}

function addFadeAndDie(dyingObject : GameObject, delay : float) {
    dyingObject.AddComponent(fadeAndDieScript);
    var fadeAndDieBhv : fadeAndDieScript = dyingObject.GetComponent(fadeAndDieScript) as fadeAndDieScript;
    fadeAndDieBhv.initBhv(delay);
}

function removeColor (i : int, fadeDelay : float ) {
    addFadeAndDie(colorsSprites[i], fadeDelay);
}
