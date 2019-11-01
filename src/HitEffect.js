/**
 * Created by CPU60079_LOCAL on 11/1/2019.
 */
var HitEffect = cc.Sprite.extend({
    active: true,
    ctor: function (position) {
        this._super("#hit.png");
        this.init(position);
    },
    init: function (position) {
        this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
        this.visible = true;
        this.active = true;
        this.stopAllActions();
        this.setPosition(position);
        this.runAction(cc.scaleBy(0.3, 2, 2));
        this.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(this.destroy, this)));
    },
    destroy: function () {
        this.visible = false;
        this.active = false;
    }
})

createHitEffect = function (position, gamelayer) {
    var hitEffect;
    //var i,o;
    //for (i in GV.HIT_EFFECT){
    //    o = GV.HIT_EFFECT[i];
    //    if (!o.active){
    //        o.init(position);
    //        return o;
    //    }
    //}
    hitEffect = new HitEffect(position);
    GV.HIT_EFFECT.push(hitEffect);
    gamelayer._textureOpaquePack.addChild(hitEffect);
    return hitEffect;
}