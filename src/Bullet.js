/**
 * Created by CPU60079_LOCAL on 10/28/2019.
 */
var Bullet = cc.Sprite.extend({
    speed: 1000,
    direction: 1,
    active: true,
    ctor: function (owner, type) {
        if (type == "ship"){
            this._super("#W1.png");
        } else{
            this._super("#W2.png");
            this.direction = -1;
            this.speed = 300;
        }
        this.setPosition(owner.getPosition());
    },
    destroy: function () {
        this.active = false;
        this.visible = false;
    },
    update: function (dt) {
        this.y += dt * this.speed * this.direction;
        if (this.y < 0 || this.x < 0 || this.y > cc.director.getWinSize().height || this.x > cc.director.getWinSize().width){
            this.destroy();
        }
    },
    //getStatus: function () {
    //    return this.isActive;
    //},
    getHitbox: function () {
        var w = this.width, h = this.height;
        var a = this.x - w / 2, b = this.y - h / 2, c = this.x + w / 2, d = this.y + h / 2;
        return cc.rect(a, b, c - a, d - b);
    },
    damage: function () {
        //var w = this.width, h = this.height;
        //var a = this.x - w/ 2, b = this.y - h/ 4, c = this.x + w/ 2, d = this.y + h/4;
        //cc.log("bullet   " + a + " " + b + " " + c + " " + d);
        cc.log("Bullet damage");
        cc.log(this.width/2);
        cc.log(this.height/2);
        this.destroy();
    }
})

createBullet = function (owner, batch, type) {
    var newBullet = new Bullet(owner, type);
    if (type == "ship"){
        GV.P_BULLETS.push(newBullet);
    } else{
        GV.E_BULLETS.push(newBullet);
    }
    batch.addChild(newBullet);
}