/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEXInMPP_Pseudo3DBattle.js
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
@plugindesc Battle style expansion: Supports pseudo 3D battles
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

This plugin prevents conflicts when using the Battle Style Extension and
Pseudo 3D Battle together.
Place this plugin below the Pseudo 3D Battle plugin.

Terms of Use
This plugin is distributed under the MIT License.

Update History
June 19, 2021 Ver. 1.1.0
Compatible with Pseudo 3D Plugin Ver. 1.1 and later.
June 13, 2021 Ver. 1.0.0
Fixed an issue that caused an error to occur when popping up.
Fixed an issue that prevented actor damage effects and enemy images from
working properly.
*/

/*:ja
@target MZ
@plugindesc バトルスタイル拡張疑似3Dバトル併用対応
@author NUUN
@version 1.1.0

@help
バトルスタイル拡張と疑似3Dバトルを併用する際の競合対策プラグインです。
このプラグインを疑似3Dバトルより下に配置してください。
 
利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2021/6/19 Ver.1.1.0
疑似3DプラグインVer.1.1以降に対応。
2021/6/13 Ver.1.0.0
ポップアップ時にエラーが出る問題を修正。
アクターのダメージエフェクト、敵の画像が正常に動作しない問題を修正。
*/

var Imported = Imported || {};
Imported.NUUN_BattleStyleEXInMPP_Pseudo3DBattle = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BattleStyleEXInMPP_Pseudo3DBattle');

  Spriteset_Battle.prototype.pseudo3dSprites = function() {
    return this._effectsBackContainer.children;
  };

  const _Spriteset_Battle_createAnimationSprite = Spriteset_Battle.prototype.createAnimationSprite;
  Spriteset_Battle.prototype.createAnimationSprite = function(targets, animation, mirror, delay) {
    this._targetMode = true;
    _Spriteset_Battle_createAnimationSprite.call(this, targets, animation, mirror, delay);
};

  const _Spriteset_Battle_makeTargetSprites = Spriteset_Battle.prototype.makeTargetSprites;
  Spriteset_Battle.prototype.makeTargetSprites = function(targets) {
    const targetSprites = _Spriteset_Battle_makeTargetSprites.call(this, targets);
    if (!this._targetMode) {
      if (this.animationTarget(targetSprites)) {
        return [];
      }
    }
    this._targetMode = false;
    return targetSprites;
  };
})();