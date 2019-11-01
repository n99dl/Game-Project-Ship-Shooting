/**
 * Created by CPU60079_LOCAL on 10/25/2019.
 */
var MainGame = cc.Layer.extend({
    _explosion: null,
    _textureOpaquePack : null,
    _transparentTexture : null,
    _scoreLabel: null,
    _ship : null,
    _enemy : null,
    enemyRate: 1,
    score: 0,
    playing: true,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        var winSize = cc.director.getWinSize();
        GV.SCORE = 0;
        GV.EBULLET_RATE = GV.EBASE_BULLET_RATE;
        GV.EADD_HP = 0;
        GV.E_BULLETS = [];
        GV.P_BULLETS = [];
        GV.ENEMIES = [];
        GV.HIT_EFFECT = [];
        cc.log("into game");
        //Init Spite frame cache
        cc.spriteFrameCache.addSpriteFrames(res.textureTransparentPack_plist);
        cc.spriteFrameCache.addSpriteFrames(res.textureOpaquePack_plist);
        cc.spriteFrameCache.addSpriteFrames(res.explosion_plist);
        //Add controller
        this.addController();
        //Add Sprite sheet
        var textureOpaquePack = cc.textureCache.addImage(res.textureOpaquePack_png);
        var transparentTexture = cc.textureCache.addImage(res.textureTransparentPack_png);
        var explosion = cc.textureCache.addImage(res.explosion_png);
        //Batch Sprite sheet to reduce GL Call
        this._transparentTexture = new cc.SpriteBatchNode(transparentTexture);
        this._textureOpaquePack = new cc.SpriteBatchNode(textureOpaquePack);
        this._explosion = new cc.SpriteBatchNode(explosion);
        //Create new ship
        this._ship = new Ship(this);
        cc.log("add Ship");
        //this._textureOpaquePack.addChild(new Bullet(this._ship));
        //Bullet.createBullet(this._ship, this._textureOpaquePack);
        this._transparentTexture.addChild(this._ship);
        //Add batch to main game
        this.addChild(this._transparentTexture, 2);
        this.addChild(this._textureOpaquePack, 3);
        this.addChild(this._explosion, 4);
        //Add Score Label
        //this._scoreLabel = new cc.LabelBMFont("Score: " + GV.SCORE,res.arial_14_fnt);
        this._scoreLabel = new cc.LabelTTF("Score: " + GV.SCORE,"Arial",20);
        this._scoreLabel.setPosition(cc.p(winSize.width - 100, winSize.height - 50));
        //this._scoreLabel.scale = 1.5;
        this.addChild(this._scoreLabel,5);
        //Update
        this.scheduleUpdate();
        cc.log(this.enemyRate);
        //this.createEnemy();
        //Create Enemy
        this.schedule(this.createEnemy, this.enemyRate);
        this.schedule(this.updateScore, 0.5);
        //this.scheduleUpdateReceiver()
        //this.schedule(this.increaseDiff,10);
        //this.createEnemy();
    },
    updateScore: function () {
        if (GV.SCORE >= 1000) {
            this._ship.setBulletRate(Math.max(GV.PBASE_BULLET_RATE - 5 * Math.floor(GV.SCORE / 1000), 7));
            GV.EBULLET_RATE = Math.max(GV.EBASE_BULLET_RATE - 10 * Math.floor(GV.SCORE / 1000), 50);
            GV.EADD_HP = Math.min(Math.floor(GV.SCORE / 2000), 8);
        }
        cc.log(this._ship.bulletRate);
        this._scoreLabel.setString("Score: " + GV.SCORE);
    },
    update: function (dt) {
        var i, objectList;
        objectList = this._transparentTexture.children;
        for (i in objectList){
            if (objectList[i].active)
            objectList[i].update(dt);
        }
        objectList = this._textureOpaquePack.children;
        for (i in objectList){
            if (objectList[i].active)
            objectList[i].update(dt);
        }
        this.checkCollide();
        if (this.playing && this._ship.dead){
            this.gameOver();
        }
    },
    checkCollide: function () {
        var i, j, oList1, oList2, a, b;
        oList1 = GV.ENEMIES;
        for (i in oList1){
            a = oList1[i];
            b = this._ship;
            this.collide(a, b);
            oList2 = GV.P_BULLETS;
            for (j in oList2){
                b = oList2[j];
                this.collide(a, b);
            }
        }
        oList1 = GV.E_BULLETS;
        for (i in oList1){
            a = oList1[i];
            b = this._ship;
            this.collide(a,b);
        }
    },
    createEnemy: function () {
        var type = 1 + Math.floor(Math.random() * 2 );
        cc.log("create enemy " + type);
        var newEnemy = new Enemy(this, type);
        GV.ENEMIES.push(newEnemy);
        this._transparentTexture.addChild(newEnemy);
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
    },
    collide: function (a, b) {
        if (!a.active || !b.active)
            return false;
        var aHitbox = a.getHitbox();
        var bHitbox = b.getHitbox();
        //temp = a.getHitbox();
        if (cc.rectIntersectsRect(aHitbox, bHitbox)){
            a.damage();
            b.damage();
            return true;
        }
        return false;
    },
    gameOver: function () {
        //var scene = new cc.Scene();
        //scene.addChild(new GameOver());
        //cc.director.runScene(scene);
        var winSize = cc.director.getWinSize();
        this.playing = false;

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

    }
});