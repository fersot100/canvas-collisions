class Vector2 {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    add (v){
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    subtract (v){
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    normalize (){
        const hyp = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        return new Vector2(this.x / hyp, this.y / hyp);
    }
    multiply(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
    copy(){
        return new Vector2(this.x, this.y);
    }
}

export default Vector2;