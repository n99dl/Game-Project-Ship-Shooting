var Enemy = cc.Sprite.extend({
    moveSpeed : 100,
    direction : -1,
    ctor: function () {
        this._super("#E1.png");
        this.init();
    },
    init: function () {
        var winSize = cc.director.getWinSize();
        this.x = winSize.width / 2;
        this.y = winSize.height;
        this.setRotation(180);
        cc.log("initiated");
    },
    update: function (dt) {
        this.x += this.moveSpeed * dt * this.direction;
        cc.log(this.moveSpeed * dt * this.direction);
        if (this.x < 0){
            this.x = 0;
            this.direction = 1;
        }
        if (this.x > cc.director.getWinSize().width){
            this.x =  cc.director.getWinSize().width;
            this.direction = -1;
        }
        this.y -= this.moveSpeed * dt * 0.5;
    }
})