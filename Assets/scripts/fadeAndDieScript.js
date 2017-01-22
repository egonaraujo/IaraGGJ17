#pragma strict

private var dieTime : float;
private var isDying : boolean;
private var rend : SpriteRenderer;
private var factor : float;

function Start () {
    rend = gameObject.GetComponent(SpriteRenderer) as SpriteRenderer;
}

function Update () {
    if(isDying) {
        if(dieTime < Time.time) {
            Destroy(gameObject);
        }

        var alpha = rend.color.a - Time.deltaTime * factor;
        rend.color = new Color(rend.color.r, rend.color.g, rend.color.b, alpha);
    }
}

function initBhv(delay : float) {
    isDying = true;
    dieTime = Time.time + delay;
    factor = 1 / delay;
}
