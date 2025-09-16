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
@plugindesc Enemy name display
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

Displays the monster's name on the enemy battler.

Enemy character memo field
<EnemyNameX:[position]> Adjusts the X coordinate of the monster name.
(Relative coordinates)
<EnemyNameY:[position]> Adjusts the Y coordinate of the monster name.
(Relative coordinates)

Battle event notes
<EnemyNamePosition:[Id],[x],[y]> Adjusts the gauge position of the [Id]th
monster in the enemy group. (Relative coordinates)
[Id]: Display order number
[x]: X coordinate
[y]: Y coordinate
[id] specifies the ID of the monster placed in the enemy group settings. A
number appears in the upper left corner of the monster image in the placement
view; enter that number here.

This plugin requires NUUN_BattlerOverlayBase (Battler Overlay Base).

Terms of Use
This plugin is distributed under the MIT License.

Update History
May 10, 2022 Ver. 1.3.0
Major changes to the definition of the Battler display process.
November 8, 2021 Ver. 1.2.2
Changed the setting method for enemy group coordinate changes.
November 7, 2021 Ver. 1.2.1
Some processing fixes.
November 5, 2021 Ver. 1.2.0
Added a feature to adjust the coordinates of monster names for each monster in
an enemy group.
September 2, 2021 Ver. 1.1.6
Added a centered display feature.
August 29, 2021 Ver. 1.1.5
Added processing to prevent conflicts.
July 15, 2021 Ver. 1.1.4
Processing optimization: Some processing moved to NUUN_Base.
July 13, 2021 Ver. 1.1.3
Fixed a conflict with a plugin that erases enemy images.
July 10, 2021 Ver. 1.1.2
Fixed an issue where some variable names were duplicated.
July 10, 2021 Ver. 1.1.1
Fixed an error that could occur when generating enemy sprites mid-battle.
June 19, 2021 Ver. 1.1.0
Added a feature to set the timing for displaying names.
June 19, 2021 Ver. 1.0.5
Changed some processing to support Pseudo 3D Battle Ver. 1.1.
Changed the setting for how to process enlarged enemy images when displayed
from above.
June 18, 2021 Ver. 1.0.4
Fixed an incorrect description in the help.
May 26, 2021 Ver. 1.0.3
Fixed the scaling factor of MNKR_TMBattlerExMZ.js to be applied.
May 24, 2021 Ver. 1.0.2
Made some processing changes.
May 23, 2021 Ver. 1.0.1
Fixed an issue where plugin parameters were not reflected.
May 23, 2021 Ver. 1.0.0
First release

@param EnemySetting
@text Monster Settings
@default ------------------------------

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

@param EnemyNameVisible
@text Name display timing
@desc Monster name display timing
@type select
@default 0
@option Always Show
@value 0
@option When selected
@value 1

@param Name_X
@text X coordinate
@desc Specify the X coordinate (relative coordinate).
@type number
@default 0
@min -9999

@param Name_Y
@text Y coordinate
@desc Specify the Y coordinate (relative coordinate).
@type number
@default 0
@min -9999

@param Name_FontSize
@text Font size
@desc Monster name font size (from main font)
@type number
@default -12
@min -9999
*/

/*:ja
@target MZ
@plugindesc  敵名前表示
@author NUUN
@version 1.3.0
@base NUUN_BattlerOverlayBase
@orderAfter NUUN_BattlerOverlayBase

@help
敵バトラー上にモンスターの名前を表示します。

敵キャラのメモ欄
<EnemyNameX:[position]> モンスター名のX座標を調整します。（相対座標）
<EnemyNameY:[position]> モンスター名のY座標を調整します。（相対座標）

バトルイベントの注釈
<EnemyNamePosition:[Id],[x],[y]> 敵グループの[Id]番目のモンスターのゲージの位置を調整します。（相対座標）
[Id]:表示順番号
[x]:X座標
[y]:Y座標
[id]は敵グループ設定で配置した順番のIDで指定します。配置ビューのモンスター画像の左上に番号が表示されますのでその番号を記入します。

このプラグインはNUUN_BattlerOverlayBase(バトラーオーバーレイベース)が必要です。

利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
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
@text モンスター設定
@default ------------------------------

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

@param EnemyNameVisible
@desc モンスターの名前の表示タイミング
@text 名前表示タイミング
@type select
@option 常に表示
@value 0
@option 選択時
@value 1
@default 0

@param Name_X
@desc X座標（相対座標）指定します。
@text X座標
@type number
@default 0
@min -9999

@param Name_Y
@desc Y座標（相対座標）指定します。
@text Y座標
@type number
@default 0
@min -9999

@param Name_FontSize
@desc モンスター名のフォントサイズ。（メインフォントから）
@text フォントサイズ
@type number
@default -12
@min -9999
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
//let namePositionList = [];

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

const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
  _Sprite_Enemy_initMembers.call(this);
};

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
  _Sprite_Enemy_update.call(this);
  this.updateEnemyName();
};

Sprite_Enemy.prototype.updateEnemyName = function() {
  if (EnemyNamePosition < 0) {
    return;
  }
  if (this.battlerOverlay && !this.nameSprite) {
    this.createEnemyName();
  }
  if (this.nameSprite) {
    const enemy = this._enemy.enemy();
    const x = (enemy.meta.EnemyNameX ? Number(enemy.meta.EnemyNameX) : 0) + Name_X + this._enemy.getNamePositionX();
    const y = (enemy.meta.EnemyNameY ? Number(enemy.meta.EnemyNameY) : 0) + Name_Y + this._enemy.getNamePositionY();
    this.nameSprite.x = x;
    this.nameSprite.y = y - this.getButlerNamePosition();
  }
};

Sprite_Enemy.prototype.getButlerNamePosition = function() {
  const scale = this.getButlerOverlayConflict();
  if (EnemyNamePosition === 0) {
    return this.getButlerOverlayHeight() * scale;
  } else if (EnemyNamePosition === 2) {
    return Math.floor((this.getButlerOverlayHeight() * scale) / 2);
  } else {
    return 0;
  }
};

Sprite_Enemy.prototype.createEnemyName = function() {
  const sprite = new Sprite_ButlerName();
  this.battlerOverlay.addChild(sprite);
  this.nameSprite = sprite;
  sprite.setup(this._enemy);
  sprite.show();
  sprite.move(0, 0);
  $gameTemp.enemyNameRefresh = true;
};

function Sprite_ButlerName() {
  this.initialize(...arguments);
}

Sprite_ButlerName.prototype = Object.create(Sprite_Name.prototype);
Sprite_ButlerName.prototype.constructor = Sprite_ButlerName;

Sprite_ButlerName.prototype.initialize = function() {
  Sprite_Name.prototype.initialize.call(this);
  this.anchor.x = 0.5;
  this.anchor.y = 1;
};

Sprite_ButlerName.prototype.fontSize = function() {
  return $gameSystem.mainFontSize() + Name_FontSize;
};

Sprite_ButlerName.prototype.redraw = function() {
  const name = this.name();
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.setupFont();
  this.bitmap.clear();
  this.bitmap.drawText(name, 0, 0, width, height, "center");
};

Sprite_ButlerName.prototype.butlerNameVisible = function() {
  this.visible = this.butlerNameVisibleInSelect();
};

Sprite_ButlerName.prototype.butlerNameVisibleInSelect = function() {
  if (EnemyNameVisible === 1) {
    return this._battler.isSelected();
  }
  return true;
};

Sprite_ButlerName.prototype.update = function() {
  Sprite.prototype.update.call(this);
  this.butlerNameVisible();
};

const _Spriteset_Battle_updateButlerOverlay = Spriteset_Battle.prototype.updateButlerOverlay;
Spriteset_Battle.prototype.updateButlerOverlay = function() {
  _Spriteset_Battle_updateButlerOverlay.call(this);
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
  this._butlerNamePositionX = 0;
  this._butlerNamePositionY = 0;
};

Game_Enemy.prototype.setEnemyNamePosition = function(x, y) {
  this._butlerNamePositionX = x;
  this._butlerNamePositionY = y;
};

Game_Enemy.prototype.getNamePositionX = function() {
  return this._butlerNamePositionX;
};

Game_Enemy.prototype.getNamePositionY = function() {
  return this._butlerNamePositionY;
};

})();
