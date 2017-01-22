using UnityEngine;
using System.Collections;

[System.Serializable]
public class Something {

    public int score;

    public Something (int value) {
        this.score = value;
    }
    public int getScore(){
      return this.score;
    }

}
