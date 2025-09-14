/*:-----------------------------------------------------------------------------------
 * NUUN_ResultSpriteHide.js
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
@plugindesc Hide window sprite when result is displayed
@author NUUN
@license MIT License

@help
English Help Translator: munokura
Please check the URL below for the latest version of the plugin.
URL https://github.com/nuun888/MZ
-----

Hides a window or sprite during results.
The method you can specify is the object variable of the window or sprite in
Scene_Battle.
Depending on the plugin, you may need to place this plugin below the
corresponding plugin.

_statusWindow: Battle Window
_statusWindow, _actorImges, _actorStatus: Battle Style Extended Battle Window

Terms of Use
This plugin is distributed under the MIT License.

Update History
September 18, 2021 Ver. 1.1.0
First Edition

@param SptiteHideObj
@text Result window sprite
@desc Specifies the method of the window or sprite in the scene battle to be hidden at the result time (multiple options can be specified).
@type combo[]
@option '_statusWindow'
@option '_actorImges'
@option '_actorStatus'
@parent CommonSetting
*/

/*:ja
@target MZ
@plugindesc リザルト時ウィンドウスプライト非表示
@author NUUN
@base NUUN_Base
@base NUUN_Result
@version 1.0.0
@orderAfter NUUN_Base

@help
リザルト時に非表示にするウィンドウまたはスプライトを非表示にします。
指定できるメソッドはScene_Battleのウィンドウまたはスプライトのオブジェクト変数になります。
プラグインによってはこのプラグインを該当プラグインより下に配置する必要がある場合があります。

_statusWindow:バトルウィンドウ
_statusWindow、_actorImges、_actorStatus:バトルスタイル拡張バトルウィンドウ


利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2021/9/18 Ver.1.1.0
初版

@param SptiteHideObj
@text リザルト時非表示ウィンドウスプライト
@desc リザルト時に非表示にするシーンバトル内のウィンドウまたはスプライトのメソッドを指定します。(複数指定可)
@type combo[]
@option '_statusWindow'
@option '_actorImges'
@option '_actorStatus'
@default 
@parent CommonSetting
*/

var Imported = Imported || {};
Imported.NUUN_ResultSpriteHide = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ResultSpriteHide');
const SptiteHideObj = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SptiteHideObj'])) : null) || [];

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  if (SptiteHideObj && BattleManager._victoryOn) {
    SptiteHideObj.forEach(method => {
      this[method].visible = false;
    });
  }
};

})();