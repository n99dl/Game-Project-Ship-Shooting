/**
 * Created by CPU60079_LOCAL on 10/28/2019.
 */
var Bullet = cc.Sprite.extend({
    speed: 500,
    direction: 1,
    isActive: 1,
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
    update: function (dt) {
        this.y += dt * this.speed * this.direction;
        if (this.y < 0 || this.x < 0 || this.y > cc.director.getWinSize().height || this.x > cc.director.getWinSize().width)
            this.isActive = 0;
    },
    getStatus: function () {
        return this.isActive;
    }
})

createBullet = function (owner, batch, type) {
    var newBullet = new Bullet(owner, type);
    batch.addChild(newBullet);
}