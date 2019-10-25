/**
 * Created by CPU60079_LOCAL on 10/25/2019.
 */
var MainGame = cc.Layer.extend({
    _transparentTexture : null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        cc.log("test");
        cc.spriteFrameCache.addSpriteFrames(res.textureTransparentPack_plist);
        var transparentTexture = cc.textureCache.addImage(res.textureTransparentPack_png);
        this._transparentTexture = new cc.SpriteBatchNode(transparentTexture);
        this.addChild(new Ship());
        this.scheduleUpdate();
    }
});