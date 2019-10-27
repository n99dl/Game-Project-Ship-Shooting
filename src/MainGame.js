/**
 * Created by CPU60079_LOCAL on 10/25/2019.
 */
var MainGame = cc.Layer.extend({
    _transparentTexture : null,
    _ship : null,
    _enemy : null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        cc.log("test");
        cc.spriteFrameCache.addSpriteFrames(res.textureTransparentPack_plist);
        this.addController();
        var transparentTexture = cc.textureCache.addImage(res.textureTransparentPack_png);
        this._transparentTexture = new cc.SpriteBatchNode(transparentTexture);
        this._ship = new Ship();
        this._enemy = new Enemy();
        this._transparentTexture.addChild(this._ship);
        this._transparentTexture.addChild(this._enemy);
        this.addChild(this._transparentTexture);
        this.scheduleUpdate();
    },
    update: function (dt) {
        var i, objectList;
        objectList = this._transparentTexture.children;
        for (i in objectList){
            objectList[i].update(dt);
        }
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
    }
});