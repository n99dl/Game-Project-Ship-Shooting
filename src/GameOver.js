/**
 * Created by Ninh Karthus on 10/31/2019.
 */
var GameOver = cc.Layer.extend({
    ctor: function () {
        var winSize = cc.director.getWinSize();
        this._super();

        var goLabel = new cc.LabelTTF("GAME OVER","Arial",50);
        goLabel.setPosition(cc.p(winSize. width / 2, 500));
        this.addChild(goLabel);

        var scoreLabel = new cc.LabelTTF("Your score: " + GV.SCORE, "Arial", 40);
        scoreLabel.setPosition(cc.p(winSize.width / 2, 400));
        this.addChild(scoreLabel);

        var reTrySprite = new cc.Sprite(res.menu_png, cc.rect(123 * 3, 0, 123, 36));
        var reTryButton = new cc.MenuItemSprite(reTrySprite, reTrySprite, reTrySprite, function () {
            var newScene = new cc.Scene();
            var newGame = new MainGame();
            newScene.addChild(newGame);
            cc.director.runScene(newScene);
        }.bind(this))
        var reTryMenu = new cc.Menu(reTryButton);
        reTryMenu.setPosition(cc.p(winSize.width / 2, 300));
        this.addChild(reTryMenu);
    },
    changeScreen: function () {

    }
})