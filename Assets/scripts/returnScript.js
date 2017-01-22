#pragma strict

import UnityEngine.SceneManagement;

function Update () {
    if(Input.GetButtonDown("Jump")) { // Spacebar Pressed
        SceneManager.LoadScene("menu");
    }
}
