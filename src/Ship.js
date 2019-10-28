/**
 * Created by CPU60079_LOCAL on 10/25/2019.
 */
var Ship = cc.Sprite.extend({
    moveSpeed : 200,
    bulletRate: 1/25,
    appearPosition: cc.p(200,200),
    _gameLayer: null,
    timer: 0,
    ctor: function (gamelayer) {
        this._super("#ship01.png");
        this._gameLayer = gamelayer;
        this.init();
    },
    init: function () {
        this.setPosition(this.appearPosition);
        //this.schedule(this.shoot(), 0.1);
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
        this.rePositioning();

        //cc.log(this.timer % (1/this.bulletRate));
        //if (GV.KEYPRESSED[cc.KEY.space]){
        if (this.timer % (1/this.bulletRate) == 0)
            this.shoot();
        //}

        this.timer ++;
        if (this.timer == 1000) this.timer = 0;
    },
    shoot: function () {
        //cc.log("shoot");
        createBullet(this, this._gameLayer._textureOpaquePack,"ship");
    },
    rePositioning: function () {
        this.x = Math.max(this.x, 0);
        this.x = Math.min(this.x, cc.director.getWinSize().width);
        this.y = Math.max(this.y, 0);
        this.y = Math.min(this.y, cc.director.getWinSize().height);
    }
})