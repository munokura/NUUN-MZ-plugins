/*:-----------------------------------------------------------------------------------
 * NUUN_BigEnemy.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Giant Monster
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

Displays the enemy image full-screen or at the bottom of the game screen.
Enemy Memo
The following tags will scale to fit the width of the screen.
<BigEnemy> Scales the image to fit the screen.
<BigEnemy:OriginalRatio> Scales the image based on the width without changing
the ratio.
The following tags will display the image at its original size, with the
bottom of the image aligned to the bottom of the game screen.
<BigEnemy:UnderPosition> Scales the image to fit the bottom of the screen at
its original size. The image's size and X coordinate will not be adjusted.

Optional Tag: Enemy Memo
<BigEnemyFront> Scales the image to the front.
<BigEnemyBack> Scales the image to the back.
<BigEnemyY:[y]> Shifts the Y coordinate.
Example
<BigEnemyY:50> Shifts the Y coordinate down by 50.

<BigEnemyDamageX:[x]> Adjusts the X coordinate of the damage effect.
<BigEnemyDamageX:[y]> Adjusts the Y coordinate of the damage effect.
[x]: X coordinate (relative)
[y]: Y coordinate (relative)

<CorrectionScale:[scale]> Corrects the magnification.
[scale]: Magnification
Example
<CorrectionScale:1.1>

Specifications
BigEnemy and BigEnemy:OriginalRatio are scaled to fit the horizontal size of
the screen.
BigEnemy:UnderPosition is displayed at its original size and the X coordinate
is not adjusted, but the Y coordinate is adjusted so that the bottom of the
image is displayed at the bottom of the screen.
BigEnemyY is a relative coordinate from the displayed image. This only applies
to giant enemies.

Terms of Use
This plugin is distributed under the MIT License.

Update History
2024/10/23 Ver.1.2.1
Fixed an issue where enemy size would revert to its original size when an
enemy vanished if an external plugin was used to adjust enemy magnification.
2021/11/7 Ver.1.2.0
Added a feature to adjust damage effects.
Fixed some calculation errors.
2021/6/31 Ver.1.1.6
Fixed an issue where enemy images were enlarged larger than expected in
Ver.1.3.0 and later.
2021/5/31 Ver.1.1.5
Fixed the magnification not updating when no monsters are present.
2021/5/30 Ver.1.1.4
Fixed an issue where images would not display in UnderPosition mode.
2021/5/29 Ver.1.1.3
Added support for MNKR_TMBattlerExMZ's breathing and MOG_BattlerMotion's
Breath Motion.
March 20, 2021 Ver. 1.1.2
Changed the standard display order to the default. <BigEnemyNormal> has been
changed to the default setting. <BigEnemyBack> has been added, and the default
setting up to Ver. 1.1.1
must be entered as <BigEnemyBack>.
March 20, 2021 Ver. 1.1.1
Added a feature to reset the display order of giant enemies to the original
specifications.
March 18, 2021 Ver. 1.1.0
Added a feature to display them below the monster image.
Fixed an issue where monsters would appear in front after the second battle.
March 17, 2021 Ver. 1.0.3
Added a feature to adjust the Y coordinate.
January 17, 2021 Ver. 1.0.2
Changed so that they always appear in the back.
December 15, 2020 Ver. 1.0.1
Fixed an issue where popups would be misaligned in Original Ratio mode.
November 22, 2020 Ver. 1.0.0
First edition
*/

/*:ja
@target MZ
@plugindesc 巨大モンスター
@author NUUN
@version 1.2.1

@help
エネミー画像を画面一杯またはゲーム画面下に合わせて表示します。
敵キャラのメモ欄
以下のタグは画面の横サイズに合わせて拡大されます。
<BigEnemy> 画像を画面サイズに合わせます。
<BigEnemy:OriginalRatio> 比率を変更せず横幅の倍率基準で拡大します。
以下のタグはオリジナル画像サイズのまま、ゲーム画面の下側に画像の下を合わせて表示されます。
<BigEnemy:UnderPosition> 画像を原寸倍率で画面下に合わせ表示させます。画像のサイズ調整やX座標調整はいたしません。

オプションタグ　エネミーのメモ欄
<BigEnemyFront> 画像を一番手前側に表示させます。
<BigEnemyBack> 画像を一番後ろ側に表示させます。
<BigEnemyY:[y]> Y座標をシフトして表示します。
例
<BigEnemyY:50> Y座標を50下にシフトして表示します。

<BigEnemyDamageX:[x]> ダメージエフェクトのX座標を調整します。
<BigEnemyDamageX:[y]> ダメージエフェクトのY座標を調整します。
[x]：X座標(相対)
[y]：Y座標(相対)

<CorrectionScale:[scale]> 拡大率の補正を行います。
[scale]：倍率
例
<CorrectionScale:1.1>

仕様
BigEnemy及びBigEnemy:OriginalRatioは画面の横サイズに合わせて拡大されます。
BigEnemy:UnderPositionはオリジナルサイズのまま表示されX座標の調整は行われませんが、Yは画像の一番下が画面の下に表示されるように調整されます。
BigEnemyYは表示した画像からの相対座標となります。なお巨大エネミーのみ有効です。

利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2024/10/23 Ver.1.2.1
外部プラグインでエネミーの倍率補正をかけている場合に、敵消滅時にサイズが元のサイズに戻ってしまう問題を修正。
2021/11/7 Ver.1.2.0
ダメージエフェクトを調整できる機能を追加。
一部の計算が間違っていたため修正。
2021/6/31 Ver.1.1.6
Ver.1.3.0以降で敵の画像が想定よりも大きく拡大されてしまう問題を修正。
2021/5/31 Ver.1.1.5
モンスターが出現していないときは、拡大率のアップデートをしないように修正。
2021/5/30 Ver.1.1.4
UnderPositionモードの時に画像が表示されない問題を修正。
2021/5/29 Ver.1.1.3
MNKR_TMBattlerExMZの息づかい、MOG_BattlerMotionのBreath Motionに対応。
2021/3/20 Ver.1.1.2
標準の表示順をデフォルト仕様に変更。<BigEnemyNormal>はデフォルト設定に変更されました。<BigEnemyBack>が追加されVer.1.1.1までの
デフォルト設定は<BigEnemyBack>を記入しなくてはならなくなりました。
2021/3/20 Ver.1.1.1
巨大エネミーの表示順を元の仕様にする機能を追加。
2021/3/18 Ver.1.1.0
モンスター画像の下に合わせて表示する機能を追加。
２回目の戦闘以降にモンスターが手前に表示される問題を修正。
2021/3/17 Ver.1.0.3
Y座標を調整できる機能を追加。
2021/1/17 Ver.1.0.2
常に後ろに表示されるように変更。
2020/12/15 Ver.1.0.1
OriginalRatioモードの時にポップアップの位置がずれる問題を修正。
2020/11/22 Ver.1.0.0
初版
*/
var Imported = Imported || {};
Imported.NUUN_BigEnemy = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BigEnemy');

  const _Game_Enemy_screenY = Game_Enemy.prototype.screenY;
  Game_Enemy.prototype.screenY = function() {
    if (this.enemy().meta.BigEnemy) {
      if (this.enemy().meta.BigEnemyFront) {
        return Graphics.height;
      } else if (this.enemy().meta.BigEnemyBack) {
        return 0;
      } else {
        return _Game_Enemy_screenY.call(this);
      }
    } else {
      return _Game_Enemy_screenY.call(this);
    }
  };

  const _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
  Sprite_Battler.prototype.initMembers = function() {
    _Sprite_Battler_initMembers.call(this);
    this._bigEnemy = false;
  };

  const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function(battler) {
    _Sprite_Enemy_setBattler.call(this, battler);
    if (battler.enemy().meta.BigEnemy) {
      this._bigEnemy = battler.enemy().meta.BigEnemy;
      if (this._bigEnemy) {
        const name = this._enemy.battlerName();
        if ($gameSystem.isSideView()) {
          ImageManager.loadSvEnemy(name);
        } else {
          ImageManager.loadEnemy(name);
        }
        if (this.bitmap && !this.bitmap.isReady()) {
          this.bitmap.addLoadListener(this.setBigEnemy.bind(this));
        }
      }
    }
  };

  Sprite_Enemy.prototype.setBigEnemy = function() {
    const bitmap = this.bitmap;
    const correctionScale = this._enemy.enemy().meta.CorrectionScale;
    if (this._bigEnemy === "UnderPosition") {
      this._homeY = Graphics.height - 28;
      this._originalscaleX = this.scale.x * (correctionScale || 1);
      this._originalscaleY = this.scale.y * (correctionScale || 1);
    } else {
      this.scale.x = Graphics.width / bitmap.width * (correctionScale || 1);
      this._originalscaleX = this.scale.x;
      this._homeX = Graphics.boxWidth / 2;
      let height = 0;
      if (this._bigEnemy === 'OriginalRatio') {
        this.scale.y = this.scale.x;
        height = Math.floor((Graphics.height - bitmap.height * this.scale.y) / 2);
      } else {
        this.scale.y = Graphics.height / bitmap.height * (correctionScale || 1);
      }
      this._originalscaleY = this.scale.y;
      this._homeY = Math.floor((Graphics.height - Graphics.boxHeight) / 2 + Graphics.boxHeight) + 24 - height;
    }
    this._homeY += this._enemy.enemy().meta.BigEnemyY ? Number(this._enemy.enemy().meta.BigEnemyY) : 0;
    this.updatePosition();
  };

  const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
  Sprite_Enemy.prototype.update = function () {
    _Sprite_Enemy_update.call(this);
    this.updateBigEnemy();
  };

  Sprite_Enemy.prototype.updateBigEnemy = function () {
    if (this._bigEnemy && this.scale.x !== this._originalscaleX) {
        this.scale.x *= this._originalscaleX;
    }
    if (this._bigEnemy && this.scale.y !== this._originalscaleY) {
        this.scale.y *= this._originalscaleY;
    }
  };

  const _Sprite_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
  Sprite_Enemy.prototype.updateStateSprite = function() {
    _Sprite_Enemy_updateStateSprite.call(this);
    if(this._bigEnemy && this._bigEnemy !== "UnderPosition"){
      const correctionScale = this._enemy.enemy().meta.CorrectionScale;
      this._stateIconSprite.y = (40 - this.y) / this.scale.y;
      this._stateIconSprite.scale.x = 1 / this.scale.x * 0.5;
      this._stateIconSprite.scale.y = 1 / this.scale.y;
    }
  };

  const _Sprite_Enemy_damageOffsetX = Sprite_Enemy.prototype.damageOffsetX;
  Sprite_Enemy.prototype.damageOffsetX = function() {
    let x = _Sprite_Enemy_damageOffsetX.call(this);
    if (this._bigEnemy) {
      x += Number(this._enemy.enemy().meta.BigEnemyDamageX) || 0;
    }
    return x;
  };

  const _Sprite_Enemy_damageOffsetY = Sprite_Enemy.prototype.damageOffsetY;
  Sprite_Enemy.prototype.damageOffsetY = function() {
    let y = _Sprite_Enemy_damageOffsetY.call(this);
    if(this._bigEnemy){
      if (this._bigEnemy === "OriginalRatio") {
        y -= this.bitmap.height * this.scale.y / 2
      } else if (this._bigEnemy === "UnderPosition") {
        y -= this.bitmap.height / 2;
      } else {
        y -= Graphics.boxHeight / 2
      }
      y += Number(this._enemy.enemy().meta.BigEnemyDamageY) || 0;
    }
    return y;
  };

  const _Sprite_Enemy_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
  Sprite_Enemy.prototype.loadBitmap = function(name) {
    _Sprite_Enemy_loadBitmap.call(this, name);
    if (this._bigEnemy) {
      if (this.bitmap && !this.bitmap.isReady()) {
        this.bitmap.addLoadListener(this.setBigEnemy.bind(this));
      } else {
        this.setBigEnemy();
      }
    }
  };

})();
