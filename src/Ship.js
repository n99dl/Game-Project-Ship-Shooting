/**
 * Created by CPU60079_LOCAL on 10/25/2019.
 */
var Ship = cc.Sprite.extend({
    appearPosition: cc.p(200,200),
    ctor: function () {
        this._super("#ship01.png");
        this.init();
    },
    init: function () {
        this.setPosition(this.appearPosition);
    }
})