/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    /*load textures from assets*/
    this.kBackground = "assets/village_back.png";
    this.kFrontground = "assets/village_front.png";

    this.mBackground = null;
    this.mFrontground = null;

    this.mMainView = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBackground);
    gEngine.Textures.loadTexture(this.kFrontground);
}

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.Textures.unloadTexture(this.kFrontground);

    gEngine.LayerManager.cleanUp();
    //gEngine.Core.startScene(nextLevel);
}

MyGame.prototype.initialize = function () {
    this.mBackground = new Background(this.kBackground);
    this.mFrontground = new Background(this.kFrontground);
    this.mMainView = new MainView();

    /*Draw the hero(now the hero is only a rect, it should be a different class)*/
    this.mHero = new Renderable();
    this.mHero.setColor([0, 0, 1, 1]);
    this.mHero.getXform().setPosition(10, 10);
    this.mHero.getXform().setSize(2, 2);

    /*put different elements into different layers*/
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBackground);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mHero);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mFrontground);
}

MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mMainView.setup();

    gEngine.DefaultResources.setGlobalAmbientColor([.9, .9, .9, 1]);

    /*draw as a whole main view view-port*/
    gEngine.LayerManager.drawAllLayers(this.mMainView.getCam());

    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
}

MyGame.prototype.update = function () {
    /*
    very primitive update function, should be composed with different update functions
    */
    var delta = 0.5;
    var xform = this.mHero.getXform();

    // Support hero movements
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        xform.incYPosBy(delta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        xform.incXPosBy(-delta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        xform.incYPosBy(-delta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        xform.incXPosBy(delta);
    }
}
