#pragma strict

public class CactusDontTouchBehaviour extends Masticatable{
    private var touched : boolean;
    private var pulseSmall : boolean;
    private var score : int;
    private var rend : Renderer;
    private var rand : float;
    public var timeToLive : float;

    //object instatiation
    function Start(){
        touched = false;
        score = 0;
        masticated = false;
        currentObjectState = ObjectState.Entering;
        timeToLive = 0.3f;
    }

    //event listener
    function OnMouseDrag() {

        //If the first mouse button is held down
        if (Input.GetMouseButton(0))
        {
            //cast a ray to detect that the mouse is actually hovering over the object
            var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            var hit : RaycastHit;
            if(Physics.Raycast(ray,hit,20)){
                //you got hurt!
            }
            else{
                touched = false;
            }
        
        }
    }

    //event listener
    function OnMouseUp()
    {
        touched = false;
    }

    //this gets called every frame
    function Update(){
        //every frame countdown to end of time to live

        if(touched){
            //hurt animation
        }

        switch(currentObjectState){
            case ObjectState.Entering:

                break;

            case ObjectState.Playable:

                break;

            case ObjectState.Exiting:

                break;
        }
    }
}