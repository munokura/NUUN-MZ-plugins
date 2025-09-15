/*:-----------------------------------------------------------------------------------
 * NUUN_ButlerName.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Butler name display
@author NUUN
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Original plugin by NUUN.
Please check the latest official version at:
https://github.com/nuun888/MZ
-----

Displays the monster name on enemies and SV actors during battle.

Enemy character or actor memo field
<EnemyNameX:[position]> Adjusts the X coordinate of the monster name.
(Relative coordinates)
<EnemyNameY:[position]> Adjusts the Y coordinate of the monster name.
(Relative coordinates)

<NoBattlerName> Does not display the name.

Battle Event Notes
<EnemyNamePosition:[Id],[x],[y]> Adjusts the gauge position of the [Id]th
monster in the enemy group. (Relative coordinates)
[Id]: Display order number
[x]: X coordinate
[y]: Y coordinate
[id] is specified by the ID of the monster placed in the enemy group settings.
A number appears in the upper left corner of the monster image in the
placement view; enter that number here.

This plugin requires NUUN_BattlerOverlayBase (Battler Overlay Base).
Please make sure to update the Battler Overlay Base to the latest version.

Terms of Use
This plugin is distributed under the MIT License.

Update History
January 4, 2025 Ver. 1.4.2
Added the ability to hide names.
January 1, 2025 Ver. 1.4.1
Fixed an issue where the name remained the same even after transformation.
June 2, 2023 Ver. 1.4.0
Added the ability to display names on SV actors.
May 6, 2023 Ver. 1.3.1
Fixed the enemy name display to fade in and out.
May 10, 2022 Ver. 1.3.0
Major changes to the definition of the battler display process.
November 8, 2021 Ver. 1.2.2
Changed the method for setting enemy group coordinate changes.
November 7, 2021 Ver. 1.2.1
Made some processing fixes.
November 5, 2021 Ver. 1.2.0
Added a feature to adjust the coordinates of monster names for each monster in
the enemy group.
September 2, 2021 Ver. 1.1.6
Added a feature to display them at the center.
August 29, 2021 Ver. 1.1.5
Added processing to prevent conflicts.
July 15, 2021 Ver. 1.1.4
Optimized processing and moved some processing to NUUN_Base.
July 13, 2021 Ver. 1.1.3
Addressed a conflict with the plugin that deletes enemy images.
July 10, 2021 Ver. 1.1.2
Fixed an issue where some variable names were duplicated.
July 10, 2021 Ver. 1.1.1
Fixed an error that could occur when generating enemy sprites mid-battle.
June 19, 2021 Ver. 1.1.0
Added a feature to set the timing for displaying names.
June 19, 2021 Ver. 1.0.5
Made some changes to the process to support Pseudo 3D Battle Ver. 1.1.
Changed the setting for how to process enlarged enemy images when displayed on
top.
June 18, 2021 Ver. 1.0.4
Fixed some incorrect help descriptions.
May 26, 2021 Ver. 1.0.3
Fixed the magnification factor of MNKR_TMBattlerExMZ.js to be applied.
May 24, 2021 Ver. 1.0.2
Made some changes to the process.
May 23, 2021 Ver. 1.0.1
Fixed an issue where plugin parameters were not reflected.
May 23, 2021 Ver. 1.0.0
First version

@param EnemySetting
@text Enemy Settings
@default ------------------------------

@param EnemyVisibleSetting
@text Display settings
@default ------------------------------
@parent EnemySetting

@param EnemyNamePosition
@text Name display position
@desc Monster name display position
@type select
@default 0
@option No display
@value -1
@option Above the enemy image
@value 0
@option Under the enemy image
@value 1
@option Center of enemy image
@value 2
@parent EnemyVisibleSetting

@param EnemyNameVisible
@text Name display timing
@desc Monster name display timing
@type select
@default 0
@option Always Show
@value 0
@option When selected
@value 1
@parent EnemyVisibleSetting

@param GaugeSetting
@text Enemy Gauge Settings
@default ------------------------------
@parent EnemySetting

@param Name_X
@text X coordinate
@desc Specify the X coordinate (relative coordinate).
@type number
@default 0
@min -9999
@parent GaugeSetting

@param Name_Y
@text Y coordinate
@desc Specify the Y coordinate (relative coordinate).
@type number
@default 0
@min -9999
@parent GaugeSetting

@param Name_FontSize
@text Font size
@desc Monster name font size (from main font)
@type number
@default -12
@min -9999
@parent GaugeSetting

@param ActorSetting
@text Actor Settings
@default ------------------------------

@param ActorVisibleSetting
@text Display settings
@default ------------------------------
@parent ActorSetting

@param ActorNamePosition
@text Actor Name Position
@desc Actor Name Position
@type select
@default -1
@option No display
@value -1
@option Above the SV image
@value 0
@option Under the SV image
@value 1
@parent ActorVisibleSetting

@param ActorNameVisible
@text Actor name display timing
@desc Actor name display timing
@type select
@default 0
@option Always Show
@value 0
@option When selected
@value 1
@parent ActorVisibleSetting

@param ActorNameSetting
@text Actor Name Settings
@default ------------------------------
@parent ActorSetting

@param ActorName_X
@text Actor Name X Coordinate
@desc Specifies the X coordinate (relative coordinate) of the actor name.
@type number
@default 0
@min -9999
@parent ActorNameSetting

@param ActorName_Y
@text Actor Name Y Coordinate
@desc Specifies the Y coordinate (relative coordinate) of the actor name.
@type number
@default 0
@min -9999
@parent ActorNameSetting

@param ActorName_FontSize
@text Font size
@desc Actor name font size (from main font).
@type number
@default -12
@min -9999
@parent ActorNameSetting
*/

/*:ja
@target MZ
@plugindesc  バトラー名前表示
@author NUUN
@version 1.4.2
@base NUUN_BattlerOverlayBase
@orderAfter NUUN_BattlerOverlayBase

@help
戦闘中の敵及びSVアクターにモンスターの名前を表示します。

敵キャラまたはアクターのメモ欄
<EnemyNameX:[position]> モンスター名のX座標を調整します。（相対座標）
<EnemyNameY:[position]> モンスター名のY座標を調整します。（相対座標）

<NoBattlerName> 名前を表示しません。

バトルイベントの注釈
<EnemyNamePosition:[Id],[x],[y]> 敵グループの[Id]番目のモンスターのゲージの位置を調整します。（相対座標）
[Id]:表示順番号
[x]:X座標
[y]:Y座標
[id]は敵グループ設定で配置した順番のIDで指定します。配置ビューのモンスター画像の左上に番号が表示されますのでその番号を記入します。

このプラグインはNUUN_BattlerOverlayBase(バトラーオーバーレイベース)が必要です。
バトラーオーバーレイベースは必ず最新版にしてください。

利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2025/1/4 Ver.1.4.2
名前を非表示にする機能を追加。
2025/1/1 Ver.1.4.1
変身後でも名前が変身前のまま表示されていた問題を修正。
2023/6/2 Ver.1.4.0
SVアクターに名前を表示する機能を追加。
2023/5/6 Ver.1.3.1
敵の名前の表示をフェードアウト、フェードインさせるように修正。
2022/5/10 Ver.1.3.0
バトラーの表示処理の定義大幅変更に関する定義変更。
2021/11/8 Ver.1.2.2
敵グループの座標変更の設定方法を変更。
2021/11/7 Ver.1.2.1
一部処理を修正。
2021/11/5 Ver.1.2.0
敵グループのモンスター毎にモンスター名の座標を調整できる機能を追加。
2021/9/2 Ver.1.1.6
中心に表示する機能を追加。
2021/8/29 Ver.1.1.5
競合対策のための処理追加。
2021/7/15 Ver.1.1.4
処理の最適化により一部処理をNUUN_Baseに移行。
2021/7/13 Ver.1.1.3
エネミー画像を消去するプラグインとの競合対策。
2021/7/10 Ver.1.1.2
一部の変数名が重複していた問題を修正。
2021/7/10 Ver.1.1.1
戦闘途中でエネミースプライトを生成するとエラーが出る場合があるので修正。
2021/6/19 Ver.1.1.0
名前の表示タイミングを設定できる機能を追加。
2021/6/19 Ver.1.0.5
疑似3DバトルVer.1.1対応のため一部の処理を変更。
敵画像の上表示時の画像拡大時の処理方法の設定方法を変更。
2021/6/18 Ver.1.0.4
ヘルプの説明の一部が間違っていたのを修正。
2021/5/26 Ver.1.0.3
MNKR_TMBattlerExMZ.jsの拡大率を適用するように修正。
2021/5/24 Ver.1.0.2
処理の一部を修正。
2021/5/23 Ver.1.0.1
プラグインパラメータが反映されなかった問題を修正。
2021/5/23 Ver.1.0.0
初版


@param EnemySetting
@text 敵設定
@default ------------------------------

@param EnemyVisibleSetting
@text 表示設定
@default ------------------------------
@parent EnemySetting

@param EnemyNamePosition
@desc モンスターの名前表示位置
@text 名前表示位置
@type select
@option 表示なし
@value -1
@option 敵画像の上
@value 0
@option 敵画像の下
@value 1
@option 敵画像の中心
@value 2
@default 0
@parent EnemyVisibleSetting

@param EnemyNameVisible
@desc モンスターの名前の表示タイミング
@text 名前表示タイミング
@type select
@option 常に表示
@value 0
@option 選択時
@value 1
@default 0
@parent EnemyVisibleSetting

@param GaugeSetting
@text 敵ゲージ設定
@default ------------------------------
@parent EnemySetting

@param Name_X
@desc X座標（相対座標）指定します。
@text X座標
@type number
@default 0
@min -9999
@parent GaugeSetting

@param Name_Y
@desc Y座標（相対座標）指定します。
@text Y座標
@type number
@default 0
@min -9999
@parent GaugeSetting

@param Name_FontSize
@desc モンスター名のフォントサイズ。（メインフォントから）
@text フォントサイズ
@type number
@default -12
@min -9999
@parent GaugeSetting

@param ActorSetting
@text アクター設定
@default ------------------------------

@param ActorVisibleSetting
@text 表示設定
@default ------------------------------
@parent ActorSetting

@param ActorNamePosition
@desc アクター名位置
@text アクター名位置
@type select
@option 表示なし
@value -1
@option SV画像の上
@value 0
@option SV画像の下
@value 1
@default -1
@parent ActorVisibleSetting

@param ActorNameVisible
@desc アクター名の表示タイミング
@text アクター名表示タイミング
@type select
@option 常に表示
@value 0
@option 選択時
@value 1
@default 0
@parent ActorVisibleSetting

@param ActorNameSetting
@text アクター名設定
@default ------------------------------
@parent ActorSetting

@param ActorName_X
@desc アクター名のX座標（相対座標）指定します。
@text アクター名X座標
@type number
@default 0
@min -9999
@parent ActorNameSetting

@param ActorName_Y
@desc アクター名のY座標（相対座標）指定します。
@text アクター名Y座標
@type number
@default 0
@min -9999
@parent ActorNameSetting

@param ActorName_FontSize
@desc アクター名のフォントサイズ。（メインフォントから）
@text フォントサイズ
@type number
@default -12
@min -9999
@parent ActorNameSetting
*/

var Imported = Imported || {};
Imported.NUUN_ButlerName = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ButlerName');
const EnemyNamePosition = Number(parameters['EnemyNamePosition'] || 0);
const EnemyNameVisible = Number(parameters['EnemyNameVisible'] || 0);
const Name_X = Number(parameters['Name_X'] || 0);
const Name_Y = Number(parameters['Name_Y'] || 0);
const Name_FontSize = Number(parameters['Name_FontSize'] || -12);
const ActorNamePosition = Number(parameters['ActorNamePosition'] || 0);
const ActorNameVisible = Number(parameters['ActorNameVisible'] || 0);
const ActorName_X = Number(parameters['ActorName_X'] || 0);
const ActorName_Y = Number(parameters['ActorName_Y'] || 0);
const ActorName_FontSize = Number(parameters['ActorName_FontSize'] || -12);


function getEnemyNamePosition(troop) {
  const pages = troop.pages[0];
  list = [];
  const re = /<(?:EnemyNamePosition):\s*(.*)>/;
  pages.list.forEach(tag => {
    if (tag.code === 108 || tag.code === 408) {
      let match = re.exec(tag.parameters[0]);
      if (match) {
        list.push(match[1].split(',').map(Number));
      }
    }
  });
  return list;
};


const _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
  _Sprite_Actor_update.call(this);
  this.updateBattlerName();
};

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
  _Sprite_Enemy_update.call(this);
  this.updateBattlerName();
};

Sprite_Battler.prototype.updateBattlerName = function() {
    if (!this._battler || this.noBattlerNamePosition() || this.noBattlerName()) {
        return;
    }
    if (this.battlerOverlay && !this.nameSprite) {
        this.createBattlerName();
    }
    this.setBattlerNamePosition();
};

Sprite_Enemy.prototype.noBattlerNamePosition = function() {
    return EnemyNamePosition < 0;
};

Sprite_Actor.prototype.noBattlerNamePosition = function() {
    return (this._battler.isEnemy() ? EnemyNamePosition : ActorNamePosition) < 0;
};

Sprite_Actor.prototype.noBattlerName = function() {
    return this._battler.isEnemy() ? this._battler.enemy().meta.NoBattlerName : false;
};

Sprite_Enemy.prototype.noBattlerName = function() {
    return this._enemy.enemy().meta.NoBattlerName;
};

Sprite_Enemy.prototype.setBattlerNamePosition = function() {
    if (this.nameSprite) {
        const enemy = this._enemy.enemy();
        const x = (enemy.meta.EnemyNameX ? Number(enemy.meta.EnemyNameX) : 0) + Name_X + this._enemy.getNamePositionX();
        const y = (enemy.meta.EnemyNameY ? Number(enemy.meta.EnemyNameY) : 0) + Name_Y + this._enemy.getNamePositionY();
        this.nameSprite.x = x;
        this.nameSprite.y = y - this.getBattlerNamePosition();
    }
};

Sprite_Actor.prototype.setBattlerNamePosition = function() {
    if (this._battler.isEnemy()) {
        Sprite_Enemy.prototype.setBattlerNamePosition.call(this);
    } else if (this.nameSprite) {
        const actor = this._actor.actor();
        const x = (actor.meta.ActorNameX ? Number(actor.meta.ActorNameX) : 0) + ActorName_X;
        const y = (actor.meta.ActorNameY ? Number(actor.meta.ActorNameY) : 0) + ActorName_Y;
        this.nameSprite.x = x;
        this.nameSprite.y = y - this.getBattlerNameSVPosition();
    }
};

Sprite_Battler.prototype.getBattlerNamePosition = function() {
    const scale = this.getBattlerOverlayConflict();
    if (EnemyNamePosition === 0) {
        return this.getBattlerOverlayHeight() * scale;
    } else if (EnemyNamePosition === 2) {
        return Math.floor((this.getBattlerOverlayHeight() * scale) / 2);
    } else {
        return 0;
    }
};

Sprite_Actor.prototype.getBattlerNameSVPosition = function() {
    const scale = this.battlerOverlay.battlerSpriteScale_y;
    if (ActorNamePosition === 0) {
      return this.getSVBattlerHeight() * scale;
    } else if (ActorNamePosition === 2) {
      return Math.floor((this.getSVBattlerHeight() * scale) / 2);
    } else {
      return 0;
    }
};

Sprite_Enemy.prototype.createBattlerName = function() {
    const sprite = new Sprite_EnemyName();
    this.battlerOverlay.addChild(sprite);
    this.nameSprite = sprite;
    sprite.setup(this._enemy);
    sprite.show();
    sprite.move(0, 0);
    $gameTemp.enemyNameRefresh = true;
};
  
Sprite_Actor.prototype.createBattlerName = function() {
     if (this._battler.isEnemy()) {
        Sprite_Enemy.prototype.createBattlerName.call(this);
        return;
    }
    const sprite = new Sprite_BattlerName();
    this.battlerOverlay.addChild(sprite);
    this.nameSprite = sprite;
    sprite.setup(this._actor);
    sprite.show();
    sprite.move(0, 0);
    $gameTemp.enemyNameRefresh = true;
};


function Sprite_BattlerName() {
    this.initialize(...arguments);
}
  
Sprite_BattlerName.prototype = Object.create(Sprite_Name.prototype);
Sprite_BattlerName.prototype.constructor = Sprite_BattlerName;
  
Sprite_BattlerName.prototype.initialize = function() {
    Sprite_Name.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._startVisible = true;
    this.opacity = this.getBattlerNameVisible() === 0 ? 255 : 0;
};

Sprite_BattlerName.prototype.setup = function(battler) {
    Sprite_Name.prototype.setup.call(this, battler);
    this.opacity = this.getBattlerNameVisible() === 0 ? 255 : 0;
};

Sprite_BattlerName.prototype.fontSize = function() {
    return $gameSystem.mainFontSize() + ActorName_FontSize;
};

Sprite_BattlerName.prototype.redraw = function() {
    const name = this.name();
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.setupFont();
    this.bitmap.clear();
    this.bitmap.drawText(name, 0, 0, width, height, "center");
};

Sprite_BattlerName.prototype.battlerNameVisible = function() {
    if (!this.battlerNameVisibleResult()) {
        return this.visible = false;
    }
    const _visible = this.battlerNameVisibleInSelect();
    if (_visible && this.opacity < 255) {
        this.opacity += 25;
        this.opacity = this.opacity.clamp(0, 255);
    } else if (!_visible && this.opacity > 0) {
        this.opacity -= 25;
        this.opacity = this.opacity.clamp(0, 255);
    }
    if (this.opacity > 0) {
        this.visible = true;
    } else {
        this.visible = false;
    }
    
};

Sprite_BattlerName.prototype.battlerNameVisibleInSelect = function() {
    if (this.getBattlerNameVisible() === 1) {
      return this._battler.isSelected();
    }
    return true;
};
  
Sprite_BattlerName.prototype.update = function() {
    Sprite_Name.prototype.update.call(this);
    this.battlerNameVisible();
};

Sprite_BattlerName.prototype.getBattlerNameVisible = function() {
    return ActorNameVisible;
};

Sprite_BattlerName.prototype.battlerNameVisibleResult = function() {
    return !this.noBattlerName();
};

Sprite_BattlerName.prototype.noBattlerName = function() {
    return this._battler.isEnemy() ? this._battler.enemy().meta.NoBattlerName : false;
};


function Sprite_EnemyName() {
  this.initialize(...arguments);
}

Sprite_EnemyName.prototype = Object.create(Sprite_BattlerName.prototype);
Sprite_EnemyName.prototype.constructor = Sprite_EnemyName;

Sprite_EnemyName.prototype.initialize = function() {
    Sprite_BattlerName.prototype.initialize.call(this);
};

Sprite_EnemyName.prototype.fontSize = function() {
    return $gameSystem.mainFontSize() + Name_FontSize;
};

Sprite_EnemyName.prototype.getBattlerNameVisible = function() {
    return EnemyNameVisible;
};


const _Spriteset_Battle_updateBattlerOverlay = Spriteset_Battle.prototype.updateBattlerOverlay;
Spriteset_Battle.prototype.updateBattlerOverlay = function() {
  _Spriteset_Battle_updateBattlerOverlay.call(this);
  if ($gameTemp.enemyNameRefresh) {
    this.setEnemyNamePosition();
    $gameTemp.enemyNameRefresh = false;
  }
};

Spriteset_Battle.prototype.setEnemyNamePosition = function() {
  const namePositionList = getEnemyNamePosition($gameTroop.troop());
  for (const data of namePositionList) {
    const enemy = $gameTroop.members()[data[0] - 1];
    if (enemy) {
      enemy.setEnemyNamePosition(data[1], data[2]);
    }
  }
};


const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
  _Game_Enemy_initMembers.call(this);
  this._battlerNamePositionX = 0;
  this._battlerNamePositionY = 0;
};

Game_Enemy.prototype.setEnemyNamePosition = function(x, y) {
  this._battlerNamePositionX = x;
  this._battlerNamePositionY = y;
};

Game_Enemy.prototype.getNamePositionX = function() {
  return this._battlerNamePositionX;
};

Game_Enemy.prototype.getNamePositionY = function() {
  return this._battlerNamePositionY;
};

})();