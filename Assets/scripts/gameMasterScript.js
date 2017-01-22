#pragma strict

var bar : GameObject;
private var fishers : Array;
var fisherPrefab : GameObject;
private var score : int;

var upperLimit : float;
var lowerLimit : float;

var initialX : float;

var spawnSpeed : float;
var spawnIncrease : float;
var spawnTimeIncrease : float;
var spawnRange : float;

var fisherSpeed : float;
var fisherIncrease : float;
var fisherTimeIncrease : float;
var fisherRange : float;

private var colorsNumber : float;
var colorsTimeIncrease : float;

var maxColors : int;
var GameTime : float;

private var nextColorsIncrease : float;
private var nextSpawnIncrease : float;
private var nextFisherIncrease : float;

private var nextSpawnTime : float;
private var nextFisherSpeed : float;

private var bigColorsArray : Array;
var minBallonSize : int;
var maxBallonSize : int;

private var endGameTime : float;
private var end : boolean;

var boatSprites : Sprite[];

function Start () {
    fishers = new Array();
    nextColorsIncrease = Time.time + colorsTimeIncrease;
    nextSpawnIncrease = Time.time + spawnTimeIncrease;
    nextFisherIncrease = Time.time + fisherTimeIncrease;

    nextFisherSpeed = randomInRange(fisherSpeed, fisherRange);
    nextSpawnTime = Time.time + randomInRange(spawnSpeed, spawnRange);
    colorsNumber = minBallonSize;
    bigColorsArray = new Array();

    endGameTime = Time.time + GameTime;
    end = false;
}

function Update () {
    if(end) {
        if(Input.GetButtonDown("Jump")) { // Spacebar Pressed
            SceneManager.LoadScene("menu");
        }
    }
    else {
        if(colorsTimeIncrease > 0) {
            if(colorsNumber < maxColors) {
                if(nextColorsIncrease < Time.time) {
                    ++colorsNumber;
                    nextColorsIncrease = Time.time + colorsTimeIncrease;
                }
            }
        }

        if(spawnIncrease > 0) {
            if(nextSpawnIncrease < Time.time) {
                spawnSpeed -= spawnIncrease;
                nextSpawnIncrease = Time.time + spawnTimeIncrease;
            }
        }

        if(fisherIncrease > 0) {
            if(nextFisherIncrease < Time.time) {
                fisherSpeed += fisherIncrease;
                nextFisherIncrease = Time.time + fisherTimeIncrease;
            }
        }

        if(nextSpawnTime < Time.time) {
            var fisherBhv : fisherScript = addFisher();
            var size : float = minBallonSize + randomInt(colorsNumber-minBallonSize);
            bigColorsArray.Clear();
            bigColorsArray.length = size;
            for (var i = 0; i < size; ++i) {
                bigColorsArray[i] = randomInt(maxColors);
            }

            fisherBhv.initFisher(bigColorsArray, size, nextFisherSpeed, gameObject);

            nextFisherSpeed = randomInRange(fisherSpeed, fisherRange);
            nextSpawnTime = Time.time + randomInRange(spawnSpeed, spawnRange);
        }

        if(endGameTime < Time.time) {
            end = true;
            SaveScore.Load();
            SaveScore.AddScore(Something(score));
            Destroy(bar);
            for (var fisher : GameObject in fishers) {
                Destroy(fisher);            
            }
        }
    }
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
    var fisher : GameObject = Instantiate(fisherPrefab, position, Quaternion.identity) as GameObject;
    var rend : SpriteRenderer = fisher.GetComponent(SpriteRenderer) as SpriteRenderer;
    rend.sprite = boatSprites[randomInt(boatSprites.length)];
    fishers.push(fisher);
    return fisher.GetComponent(fisherScript) as fisherScript;
}

function removeFisher() {
    var i : int = 0;
    var removed : int = -1;
    for (var fisher : GameObject in fishers) {
        var fisherBhv : fisherScript = fisher.GetComponent(fisherScript) as fisherScript;
        if(fisherBhv.isDying) {
            removed = i;
        }
        ++i;
    }

    if(removed > -1) {
        fishers.RemoveAt(removed);
    }
}

function randomInRange (midPoint: float, range: float) {
    var lowerPoint : float = (midPoint - range);
    return lowerPoint + (2*range*Random.value);
}

function randomInt(max : int) {
    if (max == 0) {
        return 0;
    }
    var aux : int = Mathf.Floor(Random.value * max);
    if(aux == max) {
        aux = max -1;
    }
    return aux;
}
