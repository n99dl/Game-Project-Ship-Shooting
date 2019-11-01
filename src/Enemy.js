var Enemy = cc.Sprite.extend({
    _gameLayer: null,
    moveSpeed : 200,
    direction : -1,
    active: true,
    timer: 0,
    bulletRate: 80,
    _type: null,
    hp: 2,
    ctor: function (gameLayer, type) {
        this._gameLayer = gameLayer;
        this._type = type;
        if (this._type == 1){
            this._super("#E1.png");
            this.setRotation(180);
        } else {
            this._super("#E2.png");
            this.moveSpeed = 50;
            this.hp = 3;
        }
        this.hp += GV.EADD_HP;
        this.init();
    },
    init: function () {
        var winSize = cc.director.getWinSize();
        if (this._type == 1) {
            this.x = winSize.width / 2;
            this.y = winSize.height;
        } else{
            this.x = Math.floor(Math.random() * winSize.width);
            //cc.log(this.x +" " + winSize.width);
            this.y = winSize.height;
        }
        //cc.log("initiated");
    },
    destroy: function () {
        this.active = false;
        this.visible = false;
        GV.SCORE += this._type * 500;
    },
    update: function (dt) {
        var winSize = cc.director.getWinSize();
        if (this._type == 1) {
            this.x += this.moveSpeed * dt * this.direction;
            //cc.log(this.moveSpeed * dt * this.direction);
            if (this.x < 0) {
                this.x = 0;
                this.direction = 1;
            }
            if (this.x > winSize.width) {
                this.x = winSize.width;
                this.direction = -1;
            }
            this.y -= this.moveSpeed * dt * 0.5;
        } else{
            this.y -= dt * this.moveSpeed;
        }
        if (this.y < 0 || this.x < 0 || this.y > winSize.height || this.x > winSize.width){
            this.destroy();
        }

        if (this.timer % this.bulletRate == 0)
        createBullet(this,this._gameLayer,"enemy");

        this.timer ++;
    },
    getHitbox: function () {
        var w = this.width, h = this.height;
        var rx = this.x + Hitbox.E01dx, ry = this.y + Hitbox.E01dy;
        var a = rx - w / 2, b = ry - h/ 6, c = rx + w / 2, d = ry + h / 6;
        return cc.rect(a, b, c - a, d - b );
    },
    damage: function () {
        //var w = this.width, h = this.height;
        //var a = this.x - w/ 2, b = this.y - h/ 4, c = this.x + w/ 2, d = this.y + h/4;
        //cc.log(a + " " + b + " " + c + " " + d);
        cc.log("Enemy damage");
        cc.log(this.width/2);
        cc.log(this.height/2);
        if (!(--this.hp))
        this.destroy();
    }
})