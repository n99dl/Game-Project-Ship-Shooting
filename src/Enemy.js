var Enemy = cc.Sprite.extend({
    _gameLayer: null,
    moveSpeed : 200,
    direction : -1,
    isActive: 1,
    timer: 0,
    bulletRate: 1/80,
    ctor: function (gameLayer) {
        this._super("#E1.png");
        this._gameLayer = gameLayer;
        this.init();
    },
    init: function () {
        var winSize = cc.director.getWinSize();
        this.x = winSize.width / 2;
        this.y = winSize.height;
        this.setRotation(180);
        //cc.log("initiated");
    },
    update: function (dt) {
        var winSize = cc.director.getWinSize();
        this.x += this.moveSpeed * dt * this.direction;
        //cc.log(this.moveSpeed * dt * this.direction);
        if (this.x < 0){
            this.x = 0;
            this.direction = 1;
        }
        if (this.x > winSize.width){
            this.x =  winSize.width;
            this.direction = -1;
        }
        this.y -= this.moveSpeed * dt * 0.5;
        if (this.y < 0 || this.x < 0 || this.y > winSize.height || this.x > winSize.width)
        this.isActive = 0;

        if (this.timer % (1 / this.bulletRate) == 0)
        createBullet(this,this._gameLayer._textureOpaquePack,"enemy");

        this.timer ++;
    }
})