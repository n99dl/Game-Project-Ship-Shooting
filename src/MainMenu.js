/**
 * Created by CPU60079_LOCAL on 10/24/2019.
 */
var MainMenu = cc.Layer.extend({
    init: function () {

        var winSize = cc.director.getWinSize();

        cc.log("MainMenu");
        var background = new cc.Sprite(res.loading_png);
        background.setScale(3.0);
        this.addChild(background,1);

        var title = new cc.Sprite(res.logo_png);
        title.setScale(1.5);
        title.setPosition(cc.p(winSize.width/2,winSize.height/2 + 200));
        this.addChild(title,2);

        var logo = new cc.Sprite(res.logoBack_png);
        logo.setScale(1.5);
        logo.setPosition(cc.p(winSize.width/2,winSize.height/2 ));
        this.addChild(logo,2);

        var newGameSprite = new cc.Sprite(res.menu_png, cc.rect(0,0,123,36));
        newGameSprite.setScale(1.5);
        var newGameButton = new cc.MenuItemSprite(newGameSprite, newGameSprite, newGameSprite, function () {
            cc.log("new game");
            this.startGame();
        }.bind(this));
        //this.addChild(newGameButton,1);
        var menu = new cc.Menu(newGameButton);
        //menu.alignItemsVerticallyWithPadding(10);
        menu.x = winSize.width/2 - 30;
        menu.y = winSize.height/2 - 150;

        this.addChild(menu,2);

    },
    startGame: function () {
        var newScene = new cc.Scene();
        newScene.addChild(new MainGame());
        cc.director.runScene(newScene);
    }

})

MainMenu.scene = function(){
    var newScene = new cc.Scene();
    var mainMenu = new MainMenu();
    mainMenu.init();
    newScene.addChild(mainMenu);
    cc.log("mainmenu");
    return newScene;
}