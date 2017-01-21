using UnityEngine;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;

//this class will save and load the scores in the leaderboard
public static class  SaveScore {

   public static List<Something> leaderboard = new List<Something>();
   public static int max = 10;

   public static void Save(){
     BinaryFormatter bf = new BinaryFormatter();
     FileStream file = File.Create ("leaderboard.txt"); //save leaderboard in this file
     bf.Serialize(file, SaveScore.leaderboard);
     file.Close();
   }

   public static void Load(){
     if(File.Exists("leaderboard.txt")) { //check if has leaderboard saved
        BinaryFormatter bf = new BinaryFormatter();
        FileStream file = File.Open("leaderboard.txt", FileMode.Open);
        SaveScore.leaderboard = (List<Something>)bf.Deserialize(file);
        file.Close();
      }
   }

   public static void AddScore(Something actual){
      while (SaveScore.leaderboard.Count < 10){
        Something test = new Something(0);
        SaveScore.leaderboard.Add(test);
      }
      SaveScore.leaderboard.Add(actual);  //add new score to list
      //sort scores
      SaveScore.leaderboard = SaveScore.leaderboard.OrderByDescending(x => x.score).ToList(); //order by score
      //remove last one
      SaveScore.leaderboard.RemoveAt(SaveScore.leaderboard.Count -1);
   }

   public static void PrintScoreBoard(){
     for(int i = 0; i<SaveScore.leaderboard.Count; ++i)
      Debug.Log(SaveScore.leaderboard[i].getScore());
   }
}
