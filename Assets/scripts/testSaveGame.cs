using UnityEngine;
using System.Collections;

public class testSaveGame : MonoBehaviour {

	// Use this for initialization
	void Start () {
		Something test1 = new Something(2);
		SaveScore.AddScore(test1);
		//SaveScore.PrintScoreBoard();
		Something test2 = new Something(1);
		SaveScore.AddScore(test2);
		Something test3 = new Something(3);
		SaveScore.AddScore(test3);
		Something test4 = new Something(5);
		//SaveScore.AddScore(test4);
		Something test5 = new Something(7);
		//SaveScore.AddScore(test5);
		Something test6 = new Something(4);
		//SaveScore.AddScore(test6);
		Something test7 = new Something(8);
		//SaveScore.AddScore(test7);
		Something test8 = new Something(9);
		//SaveScore.AddScore(test8);
	}

	// Update is called once per frame
	void Update () {

	}
}
