/**
 * Created by CPU60079_LOCAL on 10/25/2019.
 */
var Ship = cc.Sprite.extend({
    moveSpeed : 200,
    appearPosition: cc.p(200,200),
    ctor: function () {
        this._super("#ship01.png");
        this.init();
    },
    init: function () {
        this.setPosition(this.appearPosition);
    },
    update: function (dt) {
        var dx = 0, dy = 0;
        //cc.log("moving");
        var speed = this.moveSpeed;
        if (GV.KEYPRESSED[cc.KEY.shift]){
            speed /= 2;
        }
        if (GV.KEYPRESSED[cc.KEY.a] || GV.KEYPRESSED[cc.KEY.left]){
            dx = -1;
            //cc.log("moving left");
        }
        if (GV.KEYPRESSED[cc.KEY.d] || GV.KEYPRESSED[cc.KEY.right]){
            dx = 1;
        }
        if (GV.KEYPRESSED[cc.KEY.w] || GV.KEYPRESSED[cc.KEY.up]){
            dy = 1;
        }
        if (GV.KEYPRESSED[cc.KEY.s] || GV.KEYPRESSED[cc.KEY.down]){
            dy = -1;
        }
        this.x += dt * speed * dx;
        this.y += dt * speed * dy;
    }
})