
function Start () {
}

function Update () {

}

function OnMouseDrag() {

    //If the first mouse button is held down
    if (Input.GetMouseButton(0))
    {
        //cast a ray to detect that the mouse is actually hovering over the object
        var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        var rayDistance: float;

        Debug.Log(Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y")) * 40.0);
        if (Mathf.Abs(Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y")).magnitude) > 1) {
            Debug.Log("You're rubbing it correctly!");
        }
    }
}