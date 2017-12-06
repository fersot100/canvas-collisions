class Time{
    constructor(start){
        this.currentTime = start;
        this._deltaTime = 0;
    }
    update(newTime){
        this._deltaTime = newTime - this.currentTime;
        this.currentTime = newTime;
        //Framerate is the inverse of the time between
        this.frameRate = 1000 / this._deltaTime;
    }
    get deltaTime(){
        //Return the delta in seconds
        return this._deltaTime / 1000;
    }
}
export default Time;