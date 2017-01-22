#pragma strict

public class HandBehaviour extends MonoBehaviour{

    public var cameraHand : Camera;
    public var pos : Vector3;

    function Start () {

    }

    function Update () {
        // make the hand track the mouse position always
        pos = cameraHand.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, 14));
        transform.position = Vector3(pos.x,pos.y,transform.position.z);

        if(Input.GetMouseButton(0)){
            GetComponent(Renderer).material.color.a = 0.5f;
        }
    }
}