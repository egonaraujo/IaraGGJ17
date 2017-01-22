#pragma strict

var audioSource : AudioSource;
var sounds : AudioClip[];
private var queue : Array;

function Start () {
    queue = new Array();
}

function Update () {
    if (queue.length > 0) {
        if(!audioSource.isPlaying) {
            var clip : AudioClip = queue.Shift() as AudioClip;
            audioSource.clip = clip;
            audioSource.Play();
        }
    }
}

function playSound (color : int) {
    queue.Push(sounds[color]);
}
