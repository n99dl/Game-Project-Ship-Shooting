
cc.game.onStart = function () {
    // Pass true to enable retina display, disabled by default to improve performance
    cc.view.enableRetina(true);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(480,720,cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    cc.director.setProjection(cc.Director.PROJECTION_2D);
    if (cc.sys.isNative){
        var searchPath = jsb.fileUtils.getSearchPaths();
        searchPath.push("res");
        searchPath.push("src");
        jsb.fileUtils.setSearchPaths(searchPath);
        /*jsb.fileUtils.addSearchPath("res");
        jsb.fileUtils.addSearchPath("src");*/
    }

    cc.LoaderScene.preload(g_mainmenu, function () {
        cc.director.runScene(MainMenu.scene());
    }, this)
};
cc.game.run();