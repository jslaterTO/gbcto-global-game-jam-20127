#pragma strict

public class CucumberRubbingBehaviour extends Masticatable{
    private var normalSize : Vector3;
    private var touched : boolean;
    private var pulseSmall : boolean;
    private var score : int;
    public var scoreNeeded : int;
    private var rand : float;
    private var pulsationIntensity : float;
    private var wiggleDestination : Quaternion;
    public var vigirousThreshold : float;
    public var normalThreshold : float;

    //object instatiation
    function Start(){
        normalSize = transform.localScale;
        touched = false;
        score = 0;
        masticated = false;
        pulsationIntensity = 1.0f;
        wiggleDestination = Quaternion.Euler(180,180,180);
        currentObjectState = ObjectState.Entering;
        scoreNeeded = 150;
    }

    //event listener
    function OnMouseDrag() {

        //If the first mouse button is held down
        if(currentObjectState == ObjectState.Playable){
            if (!masticated && Input.GetMouseButton(0))
            {
                //cast a ray to detect that the mouse is actually hovering over the object
                var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
                var hit : RaycastHit;
                if(Physics.Raycast(ray,hit,20)){
                    //Debug.Log(Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y")));
                    if (Mathf.Abs(Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y")).magnitude) > vigirousThreshold) {
                        //Debug.Log("You're rubbing it very vigirously!");
                        touched = true;
                        DrawPulsation();
                        score += 3;

                    }
                    else if (Mathf.Abs(Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y")).magnitude) > normalThreshold) {
                        //Debug.Log("You're rubbing it correctly!");
                        touched = true;
                        DrawPulsation();
                        score += 1;
                    }
                }
                else{
                    touched = false;
                }
        
            }
        }
    }

    //event listener
    function OnMouseUp()
    {
        if(currentObjectState == ObjectState.Playable){
            touched = false;
        }
    }

    //this gets called every frame
    function Update(){

        if(currentObjectState == ObjectState.Entering){
            //make object enter the scene
            AnimateEntrance();
            //the object is in place, begin playable phase
            if((transform.position - Vector3(0,0,0)).magnitude <= 0.01){
                currentObjectState = ObjectState.Playable;
            }
        }
        else if(currentObjectState == ObjectState.Playable){
            //every frame return to normal size
            if(!touched){
                transform.localScale = Vector3.Lerp(transform.localScale, normalSize, 2* Time.deltaTime);
            }

            if(!masticated){
                if(score >= scoreNeeded){
                    //change object to masticated!
                    Debug.Log("You masticated the fruit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    currentObjectState = ObjectState.Exiting;
                }
            }
        }
        else if(currentObjectState == ObjectState.Exiting){
            masticated = true;
            AnimateMasticated();
        }
    }

    //animations down here
    function AnimateMasticated(){
        transform.position = Vector3.Lerp(transform.position, Vector3(-30,0,0), 6* Time.deltaTime);
    }

    function AnimateEntrance(){
        transform.position = Vector3.Lerp(transform.position,Vector3(0,0,0),4* Time.deltaTime);
    }

    function DrawPulsation(){
        rand = Random.Range(0,1);
        transform.localRotation = Quaternion.Slerp(transform.rotation,wiggleDestination,rand);
        if(transform.localScale.magnitude >= (normalSize.magnitude *1.09)){
            transform.localScale = Vector3.Lerp(transform.localScale, normalSize, 10 *pulsationIntensity* Time.deltaTime);
        }
        else if(transform.localScale.magnitude <= (normalSize.magnitude *1.01)){
            transform.localScale = Vector3.Lerp(transform.localScale, normalSize * 1.1, 60 * pulsationIntensity* Time.deltaTime);
        }
    }
}
