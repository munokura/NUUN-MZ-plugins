/*:-----------------------------------------------------------------------------------
 * NUUN_BattlePosition.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2021/1/17 Ver.1.0.3
 * NUUN_BattlePositionの処理に影響があるため一部の処理を変更。
 * 2021/1/13 Ver.1.0.2
 * 競合対策のためエネミー、アクターの位置修正の処理方法を変更。
 * 2020/12/16 Ver.1.0.1.1
 * サイドビューバトルでエネミーの座標が左端に表示されてしまう問題を修正。
 * 2020/12/16 Ver.1.0.1
 * UIサイズ変更時のエネミーの座標シフト方法にUIサイズに比例してシフトする機能を追加。
 * 2020/12/15 Ver.1.0.0
 * 初版
 * 
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Actor and enemy coordinate adjustment when changing resolution, battle background Y coordinate adjustment plugin
@author NUUN
@license MIT License

@help
English Help Translator: munokura
Please check the URL below for the latest version of the plugin.
URL https://github.com/nuun888/MZ
-----

Fixed an issue where enemy and actor display coordinates would be displayed
relative to the top left of the UI screen when the UI size was changed.

You can also adjust the coordinates of actors and enemies.

You can also adjust the Y coordinate of the battle background.

Fixed an issue where the icon displayed when a state was assigned to an enemy
that was cut off at the top of the screen would be cut off from the screen.

Terms of Use
This plugin is distributed under the MIT License.

@param ActorSideViewXPosition
@text Actor X Position
@desc Moves the base X coordinate of the actor.
@type number
@default 0

@param ActorSideViewYPosition
@text Actor Y Position
@desc Moves the base Y coordinate of the actor.
@type number
@default 0
@min -999

@param EnemyXPositionMode
@text Enemy X-shift coordinate mode when UI width is changed
@desc Specifies how enemies shift when the UI width is changed. (true: Shift to the right as is false: Shift in proportion to the UI width size)
@type boolean
@default true

@param EnemyXPosition
@text Enemy X Position
@desc Moves the enemy's base X coordinate.
@type number
@default 0
@min -999

@param EnemyYPosition
@text Enemy Y Position
@desc Moves the enemy's base Y coordinate.
@type number
@default 0
@min -999

@param BackgroundFit
@text Screen size adjustment
@desc Adjust the battle background to fit the screen size (front view only).
@type boolean
@default false

@param BackgroundPosition
@text Battle background Y position
@desc Moves the Y coordinate of the battle background.
@type number
@default 0
@min -999
*/

/*:ja
@target MZ
@plugindesc 解像度変更時のアクター、エネミー座標調整、戦闘背景Y座標調整プラグイン
@author NUUN

@help UIサイズを変更した際、エネミー、アクターの表示座標がUI画面の左上基準に表示される問題を修正。
またアクターとエネミーの座標の調整が出来ます。

戦闘背景のY座標を調整できます。

画面上部に見切れて表示されてるエネミーにステートが付与された時のアイコン表示が、画面から見切れて表示される問題を修正。

利用規約
このプラグインはMITライセンスで配布しています。

@param ActorSideViewXPosition
@desc アクターの基本X座標を移動させます。
@text アクターXポジション
@type number
@default 0

@param ActorSideViewYPosition
@desc アクターの基本Y座標を移動させます。
@text アクターYポジション
@type number
@default 0
@min -999

@param EnemyXPositionMode
@desc UI横幅変更時のエネミーのシフト方法を指定します。（true:そのまま右にシフト　false:UI横幅サイズに比例してシフト）
@text UI横幅変更時エネミーXシフト座標モード
@type boolean
@default true

@param EnemyXPosition
@desc エネミーの基本X座標を移動させます。
@text エネミーXポジション
@type number
@default 0
@min -999

@param EnemyYPosition
@desc エネミーの基本Y座標を移動させます。
@text エネミーYポジション
@type number
@default 0
@min -999

@param BackgroundFit
@desc バトル背景を画面サイズに合わせる。(フロントビューのみ)
@text 画面サイズ調整
@type boolean
@default false

@param BackgroundPosition
@desc バトル背景のY座標を移動させます。
@text バトル背景Yポジション
@type number
@default 0
@min -999
*/
var Imported = Imported || {};
Imported.NUUN_BattlePosition = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BattlePosition');
  const actorXPosition = Number(parameters['ActorSideViewXPosition'] || 0);
  const actorYPosition = Number(parameters['ActorSideViewYPosition'] || 0);
  const EnemyXPositionMode = eval(parameters['EnemyXPositionMode'] || true);
  const enemyXPosition = Number(parameters['EnemyXPosition'] || 0);
  const enemyYPosition = Number(parameters['EnemyYPosition'] || 0);
  const backgroundFit = eval(parameters['BackgroundFit'] || false);
  const backgroundPosition = Number(parameters['BackgroundPosition'] || 0);

  const _Sprite_Actor_setHome = Sprite_Actor.prototype.setHome;
  Sprite_Actor.prototype.setHome = function(x, y) {
    if ($gameSystem.isSideView()) {
      x += (Graphics.boxWidth - 808) / 2 + actorXPosition;
      y += (Graphics.boxHeight - 616) / 2 + actorYPosition;
    }
    _Sprite_Actor_setHome.call(this, x, y);
  };

  const _Game_Enemy_screenX = Game_Enemy.prototype.screenX;
  Game_Enemy.prototype.screenX = function() {
    return (!$gameSystem.isSideView() && EnemyXPositionMode ? (Graphics.boxWidth - 808) / 2 + _Game_Enemy_screenX.call(this) : Graphics.boxWidth / 808 * _Game_Enemy_screenX.call(this)) + enemyXPosition;
  };

  const _Game_Enemy_screenY = Game_Enemy.prototype.screenY;
  Game_Enemy.prototype.screenY = function() {
    return (Graphics.boxHeight - 616) / 2 + enemyYPosition + _Game_Enemy_screenY.call(this);
  };

  const _Sprite_Battleback_adjustPosition = Sprite_Battleback.prototype.adjustPosition;
  Sprite_Battleback.prototype.adjustPosition = function() {
    _Sprite_Battleback_adjustPosition.call(this);
    if (backgroundFit && !$gameSystem.isSideView()){
      this.width = this.bitmap.width;
      this.height = this.bitmap.height;
      this.x = 0;
      this.scale.x = Graphics.width / this.bitmap.width;
      this.scale.y = Graphics.height / this.bitmap.height;
    }
    this.y += backgroundPosition;
  };

  Sprite_Enemy.prototype.updateStateSprite = function() {
    this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);
    if (this._stateIconSprite.y < 20 - this.y) {
        this._stateIconSprite.y = 40 - this.y;
    }
  };
})();
