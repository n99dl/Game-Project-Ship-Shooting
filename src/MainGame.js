/**
 * Created by CPU60079_LOCAL on 10/25/2019.
 */
var MainGame = cc.Layer.extend({
    _textureOpaquePack : null,
    _transparentTexture : null,
    _ship : null,
    _enemy : null,
    enemyRate: 4,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        cc.log("test");
        cc.spriteFrameCache.addSpriteFrames(res.textureTransparentPack_plist);
        cc.spriteFrameCache.addSpriteFrames(res.textureOpaquePack_plist);
        this.addController();
        var textureOpaquePack = cc.textureCache.addImage(res.textureOpaquePack_png);
        var transparentTexture = cc.textureCache.addImage(res.textureTransparentPack_png);
        this._transparentTexture = new cc.SpriteBatchNode(transparentTexture);
        this._textureOpaquePack = new cc.SpriteBatchNode(textureOpaquePack);
        this._ship = new Ship(this);
        //this._textureOpaquePack.addChild(new Bullet(this._ship));
        //Bullet.createBullet(this._ship, this._textureOpaquePack);
        this._transparentTexture.addChild(this._ship);
        this.addChild(this._transparentTexture);
        this.addChild(this._textureOpaquePack);
        this.scheduleUpdate();
        cc.log(this.enemyRate);
        this.schedule(this.createEnemy,this.enemyRate);
        this.schedule(this.increaseDiff,10);
        //this.createEnemy();
    },
    update: function (dt) {
        var i, objectList;
        objectList = this._transparentTexture.children;
        for (i in objectList){
            if (objectList[i])
            objectList[i].update(dt);
        }
        objectList = this._textureOpaquePack.children;
        for (i in objectList){
            objectList[i].update(dt);
        }
    },
    createEnemy: function () {
        cc.log("create enemy");
        //this._enemy = new Enemy(this);
        this._transparentTexture.addChild(new Enemy(this));
    },
    addController: function () {
        if ('keyboard' in sys.capabilities){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    GV.KEYPRESSED[key] = true;
                    //cc.log("pressed");
                },
                onKeyReleased: function (key, event) {
                    GV.KEYPRESSED[key] = false;
                    //cc.log("released");
                }
            },this)
        }
    },
    increaseDiff: function () {
        this.enemyRate = Math.max(2.5, this.enemyRate - 0.5);
        cc.log(this.enemyRate);
    }
});