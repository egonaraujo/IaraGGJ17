#pragma strict

var text : UI.Text;

function Start() {
    var plainText : String = "";
    SaveScore.Load();
    SaveScore.AddScore(Something(0));
    var vectorialText : String[]  = SaveScore.getLeaderBoard();
    for(var i : int = 0; i < 10; ++i) {
        plainText += vectorialText[i] + "\n";
    }

    text.text = plainText;
}

function Update () {
}
