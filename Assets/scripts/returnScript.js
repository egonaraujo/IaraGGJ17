#pragma strict

import UnityEngine.SceneManagement;

var count : boolean;

function Start () {
    count = false;
}

function Update () {
    if(Input.GetButtonDown("Jump")) { // Spacebar Pressed
        if(count) {
            SceneManager.LoadScene("menu");
        }
        else {
            count = true;
        }
    }
}
