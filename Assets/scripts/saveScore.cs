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
     FileStream file = File.Create (Application.persistentDataPath + "/savedGames.gd");
     bf.Serialize(file, SaveScore.leaderboard);
     file.Close();
   }

   public static void Load(){
     if(File.Exists(Application.persistentDataPath + "/savedGames.gd")) {
        BinaryFormatter bf = new BinaryFormatter();
        FileStream file = File.Open(Application.persistentDataPath + "/savedGames.gd", FileMode.Open);
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
      Debug.Log("Antes de ordenar");
      PrintScoreBoard();
      SaveScore.leaderboard = SaveScore.leaderboard.OrderByDescending(x => x.score).ToList(); //order by score
      Debug.Log("Depois de ordenar");
      PrintScoreBoard();
      SaveScore.leaderboard.RemoveAt(SaveScore.leaderboard.Count -1);
      Debug.Log("Depois de remover");
      PrintScoreBoard();
   }

   public static void PrintScoreBoard(){
     for(int i = 0; i<SaveScore.leaderboard.Count; ++i)
      Debug.Log(SaveScore.leaderboard[i].getScore());
   }
}
