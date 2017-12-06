import Vector2 from './vectors';

const rotate = (velocity, angle) => {
    return new Vector2(
        velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    );
}

export const collide = (rba, rbb) => {
    const velocityDiff = rba.vel.subtract(rbb.vel);
    const distanceDiff = rbb.pos.subtract(rba.pos);

    if(velocityDiff.x * distanceDiff.x + velocityDiff.y * distanceDiff.y >= 0){
        
        //Grab angle of collision
        const angle = -Math.atan2(rbb.pos.y - rba.pos.y, rbb.pos.x - rba.pos.x);
        
        //Rotate velocity vectors so we can calculate the collision in 1d
        const u1 = rotate(rba.vel, angle);
        const u2 = rotate(rbb.vel, angle);

        //Masses for formula
        const m1 = rba.mass;
        const m2 = rbb.mass;

        //Run elastic collision equation in the x axis, leave y as-is 
        let v1 = new Vector2(u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), u1.y);
        let v2 = new Vector2(u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), u2.y);

        //Rotate velocities back to their original orientation
        v1 = rotate(v1, -angle);
        v2 = rotate(v2, -angle);

        //Apply velocities to rigidbody
        rba.vel = v1.copy();
        rbb.vel = v2.copy();
    }
}