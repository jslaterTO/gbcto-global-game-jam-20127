#pragma strict

public class CactusDontTouchBehaviour extends Masticatable{
    private var touched : boolean;
    private var pulseSmall : boolean;
    private var score : int;
    private var rend : Renderer;
    private var rand : float;
    public var timeToLive : float;
    private var lived : float;
    public var messageDelay : float;
    public var messageUI : GameObject[];


    //object instatiation
    function Start(){
        touched = false;
        score = 0;
        masticated = false;
        currentObjectState = ObjectState.Entering;
        timeToLive = 0.2f;
        messageDelay = 2.5f;
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
            messageUI = GameObject.FindGameObjectsWithTag("UI");
            //var sendMessage : UIChat;
            //sendMessage =  messageUI.GetComponent("UIChat");
            //sendAMessage.AddMessage("Ouch! Prickly...",true);
            //hurt animation
        }

        switch(currentObjectState){
            case ObjectState.Entering:
                transform.position = Vector3.Lerp(transform.position,Vector3(0,0,0),8* Time.deltaTime);
                //the object is in place, begin playable phase
                if((transform.position - Vector3(0,0,0)).magnitude <= 0.01){
                    currentObjectState = ObjectState.Playable;
                }
                break;

            case ObjectState.Playable:
                lived += Time.deltaTime;
                if(lived >= timeToLive){
                    currentObjectState = ObjectState.Exiting;
                }
                break;

            case ObjectState.Exiting:
                masticated = true;
                transform.position = Vector3.Lerp(transform.position, Vector3(-30,0,0), 8* Time.deltaTime);
                break;
        }
    }
}