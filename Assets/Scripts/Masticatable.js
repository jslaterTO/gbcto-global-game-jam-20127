#pragma strict

//This is a basic interface for all game objects to appear on screen
public class Masticatable extends MonoBehaviour
{
    public enum ObjectState{Entering,Playable,Exiting};
    public var currentObjectState : ObjectState;
    public var masticated: boolean;
}
