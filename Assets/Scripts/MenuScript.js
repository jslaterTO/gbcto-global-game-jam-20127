#pragma strict
import UnityEngine.SceneManagement;

function Start () {
	
}

function Update () {
    if(Input.GetMouseButton(0) || Input.GetMouseButton(1)){
        SceneManager.LoadScene("GameScene");
    }
}
