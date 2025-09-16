/*:-----------------------------------------------------------------------------------
 * NUUN_BattlerOverlayBase.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Butler Overlay Base
@author NUUN
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/NUUN-MZ-plugins ).
Original plugin by NUUN.
Please check the latest official version at:
https://github.com/nuun888/MZ
-----

This is a base plugin that displays images on monsters and side-view actors.
Adding sprites to children of monster and actor sprites prevents the effects
on gauges, state icons, etc. (This prevents discoloration of the battler's
gauge and state icons when changing the battler's color tone with the Butler
Graphics Display Extension plugin.)

When using this plugin in conjunction with Jupiter Penguin's pseudo-3D battles
or Soryu's SV actor-based enemies, this plugin must be placed below those
plugins.

Terms of Use
This plugin is distributed under the MIT License.

Update History
March 4, 2024 Ver. 1.0.7
Changes made to the processing method fixed in Ver. 1.0.7.
March 2, 2024 Ver. 1.0.6
Fixed an issue where gauges and other items were displayed on monsters before
they appeared.
August 24, 2023 Ver. 1.0.5
Fixed an error that occurred when using this plugin in conjunction with
certain plugins.
July 15, 2023 Ver. 1.0.4
Added a feature to specify the coordinate mode when synchronizing with the
butler image.
June 2, 2023 Ver. 1.0.3
Processing fixes.
May 28, 2023 Ver. 1.0.2
Added processing related to SV actor gauge display.
October 11, 2022 Ver. 1.0.1
Minor fixes.
May 10, 2022 Ver. 1.0.0
First version

@param ConflictScale
@text Considering the magnification ratio
@desc Consideration of the magnification rate when setting the enemy image to the top
@type select
@default 'Img'
@option Original size standard
@value 'Default'
@option Image size standards
@value 'Img'

@param CoordinateMode
@text Coordinate calculation mode
@desc Coordinate calculation mode.
@type select
@default 'Default'
@option Original coordinate values
@value 'Default'
@option Decimal truncation
@value 'Floor'
*/

/*:ja
@target MZ
@plugindesc バトラーオーバーレイベース
@author NUUN
@version 1.0.7
@base NUUN_Base
@orderAfter NUUN_Base

@help
モンスター、サイドビューアクター上に画像を表示させるベースプラグイン。
モンスター、アクターのスプライトの子にスプライトを追加してしまうとゲージ、ステートアイコン等にまで影響を及ば差ないようにします。
（バトラーグラフィック表示拡張プラグインでバトラーの色調を変化させるとバトラーとともにゲージ、ステートアイコンの変色を防ぐ目的等）

木星ペンギン氏の疑似３Dバトル、蒼竜氏のSVアクター適用エネミーと併用する場合、このプラグインをこれらのプラグインより
下に配置する必要があります。

利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2024/3/4 Ver.1.0.7
Ver.1.0.7で修正した処理方法の変更。
2024/3/2 Ver.1.0.6
出現前のモンスターにゲージ等が表示されてしまう問題を修正。
2023/8/24 Ver.1.0.5
一部のプラグインと併用するとエラーが出る問題を修正。
2023/7/15 Ver.1.0.4
バトラー画像と同期させるときの座標のモードを指定できる機能を追加。
2023/6/2 Ver.1.0.3
処理の修正。
2023/5/28 Ver.1.0.2
SVアクターのゲージ表示に関する処理の追加。
2022/10/11 Ver.1.0.1
微修正。
2022/5/10 Ver.1.0.0
初版


@param ConflictScale
@desc 敵画像の上設定時の拡大率の考慮
@text 拡大率の考慮
@type select
@option 元のサイズ基準
@value 'Default'
@option 画像のサイズ基準
@value 'Img'
@default 'Img'

@param CoordinateMode
@desc 座標の計算モード。
@text 座標計算モード
@type select
@option 元の座標値
@value 'Default'
@option 小数切り捨て
@value 'Floor'
@default 'Default'
*/

var Imported = Imported || {};
Imported.NUUN_BattlerOverlayBase = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BattlerOverlayBase');
const ConflictScale = eval(parameters['ConflictScale']) || 'Img';
const CoordinateMode = eval(parameters['CoordinateMode']) || 'Img';

const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  _Spriteset_Battle_createLowerLayer.call(this);
  this.createBattlerOverlayBase();
};

Spriteset_Battle.prototype.createBattlerOverlayBase = function() {
    this._battlerOverlaySprite = [];
    for (const sprite of this._enemySprites) {
        this.setBattlerOverlaySprite(sprite, 'enemy');
    }
    for (const sprite of this._actorSprites) {
        this.setBattlerOverlaySprite(sprite, 'actor');
    }
};

Spriteset_Battle.prototype.setBattlerOverlaySprite = function(sprite, mode) {
    if (!sprite.battlerOverlay) {
        const baseSprite = new Sprite_BattlerOverlay();
        this._battleField.addChild(baseSprite);
        baseSprite.setup(sprite, mode);
        sprite.battlerOverlay = baseSprite;
        this._battlerOverlaySprite.push(baseSprite);
    }
};

const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _Spriteset_Battle_update.call(this);
    this.updateBattlerOverlay();
};

Spriteset_Battle.prototype.updateBattlerOverlay = function() {
    if ($gameTemp.refreshOverlay) {
        for (const sprite of this._enemySprites) {
            if (!sprite.battlerOverlay) {
                this.setBattlerOverlaySprite(sprite);
            }
        }
        $gameTemp.refreshOverlay = false;
    }  
    this.updateBattlerOverlaySprite();
};

Spriteset_Battle.prototype.updateBattlerOverlaySprite = function() {
    for (const sprite of this._battlerOverlaySprite) {
        let spriteData = null;
        if (sprite.battlerMode === 'actor') {
            spriteData = this._actorSprites.some(actor => actor.spriteId === sprite._battlerSpriteId);
        } else {
            spriteData = this._enemySprites.some(enemy => enemy.spriteId === sprite._battlerSpriteId);
        }
        if (!spriteData) {
            this._battleField.removeChild(sprite);
        } else {
            sprite.updatePosition();
        }
    }
};


function Sprite_BattlerOverlay() {
    this.initialize(...arguments);
}
  
Sprite_BattlerOverlay.prototype = Object.create(Sprite.prototype);
Sprite_BattlerOverlay.prototype.constructor = Sprite_BattlerOverlay;
  
Sprite_BattlerOverlay.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._battlerSprite = null;
    this._battlerSpriteId = -1;
    this.battlerSpriteScale_x = 1.0;
    this.battlerSpriteScale_y = 1.0;
};

Sprite_BattlerOverlay.prototype.setup = function(sprite, mode) {
    this._battlerSprite = sprite;
    this._battlerSpriteId = sprite.spriteId;
    this.battlerMode = mode;
};

Sprite_BattlerOverlay.prototype.setOpacity = function(opacity) {
    this.opacity = opacity;
};

Sprite_BattlerOverlay.prototype.update = function() {
    Sprite.prototype.update.call(this);
    //this.updatePosition();
};

Sprite_BattlerOverlay.prototype.updatePosition = function() {
    this.x = CoordinateMode === 'Floor' ? Math.floor(this._battlerSprite.x) : this._battlerSprite.x;
    this.y = CoordinateMode === 'Floor' ? Math.floor(this._battlerSprite.y) : this._battlerSprite.y;
    this.battlerSpriteScale_x = this._battlerSprite.scale.x;
    this.battlerSpriteScale_y = this._battlerSprite.scale.y;
};


const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
    _Sprite_Enemy_initMembers.call(this);
};

const _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
    _Sprite_Actor_update.call(this);
    if (this.battlerOverlay) {
        this.battlerOverlayOpacity();
    } else {
        $gameTemp.refreshOverlay = true;
    }
};


Sprite_Battler.prototype.battlerOverlayOpacity = function() {
    if (this._effectType && this._effectType !== "blink") {
        this.battlerOverlay.setOpacity(this.opacity);
    }
};

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
    _Sprite_Enemy_update.call(this);
    if (this.battlerOverlay) {
        this.battlerOverlayOpacity();
        this.battlerOverlayVisible();
    } else {
        $gameTemp.refreshOverlay = true;
    }
};

Sprite_Enemy.prototype.battlerOverlayVisible = function() {//暫定処置
    this.battlerOverlay.visible = this._battler.isAppeared();
};

Sprite_Battler.prototype.getBattlerOverlayHeight = function() {
    if (this._SVBattlername) {//SoR_EnemySVSprite_MZ
      return Math.floor((this._mainSprite.bitmap.height / 6) * 0.9);
    } else if (this._svBattlerSprite) {//Visu
      return Math.floor(this.height * 0.9);
    } else {
      return Math.floor(((this.bitmap.height) * 0.9));
    }
};
  
Sprite_Battler.prototype.getBattlerOverlayConflict = function() {
    if (ConflictScale === 'Img' && this.battlerOverlay) {
      return this.battlerOverlay.battlerSpriteScale_y;
    } else {
      return 1.0;
    }
};

Sprite_Actor.prototype.getBattlerOverlayHeight = function() {
    return this.getSVBattlerHeight();
};

Sprite_Actor.prototype.getSVBattlerHeight = function() {
    return this._mainSprite && this._mainSprite.bitmap ? Math.floor((this._mainSprite.bitmap.height / 6) * 0.9) : 0;
};

})();