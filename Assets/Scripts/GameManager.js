#pragma strict
import System.Collections.Generic;


public class GameManager extends MonoBehaviour {
    public var normalObjects : GameObject[];
    public var pricklyObjects : GameObject[];
    public var listOfObjects : List.<GameObject>;
    private var currentObject : GameObject;
    public var numOfObjects : int;
    public var timer : int;
    private var elapsedTime : float;
    private var outOfTime : boolean;
    private enum GameState{Playing,End};
    private var currentGameState : GameState;
    private var counter : int;

    function Awake () {
        Debug.Log("Game is awake!");
        listOfObjects = new List.<GameObject>();
        if(numOfObjects == 0){
            numOfObjects = 7;
        }

        if(timer == 0){
            timer = 30;
        }
        elapsedTime = 0;
        counter = 0;
        currentGameState = GameState.Playing;
        InitGame();
    }

    function InitGame(){
        //randomly generate an array of fruits/rough things
        var rand : int;
        var arrayRandNormal : int;
        var arrayRandPrickly : int;
        for(var i =0; i < numOfObjects; i++){
            rand = Random.Range(0,9);
            if(rand >= 8){
                //generate a prickly object 10% of the time
                Debug.Log("generated a prickly thingy: " + rand);
                arrayRandPrickly = Random.Range(0,pricklyObjects.Length);
                listOfObjects.Add(Instantiate(pricklyObjects[arrayRandPrickly],new Vector3(50, 0, 0), Quaternion.identity));
                listOfObjects[i].SetActive(false);
            }
            else{
                //generate a normal object
                Debug.Log("generated a normal thingy: " + rand);
                arrayRandNormal = Random.Range(0,normalObjects.Length);
                listOfObjects.Add(Instantiate(normalObjects[arrayRandNormal],new Vector3(50, 0, 0), Quaternion.identity));
                listOfObjects[i].SetActive(false);
            }

            
        }
        //instantiate the first object and begin the game
        listOfObjects[0].SetActive(true);

    }

    function Update () {
        switch(currentGameState){
            case GameState.Playing :
                //update the timer every second
                elapsedTime += Time.deltaTime;
                if(elapsedTime >= timer){
                    Debug.Log("Oh noes you ran out of time!");
                    outOfTime = true;
                    currentGameState = GameState.End;
                }
                Debug.Log(listOfObjects[counter].transform.GetChild(0).gameObject.GetComponent(Masticatable).masticated);
                if(listOfObjects[counter].transform.GetChild(0).gameObject.GetComponent(Masticatable).masticated == true){
                    //the objected has been masticated, delete it generate the next object
                    Destroy(listOfObjects[counter],1);
                    Mathf.Clamp(++counter,0,(listOfObjects.Count - 1));
                    Debug.Log("the counter is:" + counter);
                    listOfObjects[counter].SetActive(true);
                }
                

                break;
            case GameState.End :
                break;
        }
    }
}