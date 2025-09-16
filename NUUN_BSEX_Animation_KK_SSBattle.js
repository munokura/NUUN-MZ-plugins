/*:-----------------------------------------------------------------------------------
 * NUUN_BSEX_Animation_KK_SSBattle.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Battle Style Expansion Speed Star Battle
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

This plugin is used in conjunction with the Battle Style Extension plugin and
KeKe's Speed Star Battle to properly display animations and popups in the
front view.

Turn on the front view effects for the Battle Style Extension settings and
turn off other front view support for Speed Star Battle.
The order of the plugins in the plugin list should be:
Battle Style Extension
Speed Star Battle (a fast-paced, flowing battle)
Battle Style Extension + Speed Star Battle

Update History
2021/12/27 Ver. 1.0.0
First Edition
*/

/*:ja
@target MZ
@plugindesc バトルスタイル拡張スピードスターバトル併用
@author NUUN
@version 1.0.0
@base NUUN_BattleStyleEX_Base
@orderAfter NUUN_BattleStyleEX_Base
@orderAfter Keke_SpeedStarBattle

@help
バトルスタイル拡張プラグインとケケー様のスピードスターバトルと併用ででフロントビューにアニメーション、ポップアップを
正常に表示するためのプラグインです。

バトルスタイル拡張設定用のフロントビューエフェクトをONに
スピードスターバトルのその他のフロントビュー対応をOFFにしてください。
プラグインリストの配置順は
バトルスタイル拡張
スピードスターバトル(流れるように疾走する快速バトル)
バトルスタイル拡張スピードスターバトル併用
の順に設定してください。

更新履歴
2021/12/27 Ver.1.0.0
初版
*/

var Imported = Imported || {};
Imported.NUUN_BSEX_Animation_KK_SSBattle = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BSEX_Animation_KK_SSBattler');
const parametersBEX = PluginManager.parameters('NUUN_BattleStyleEX');
const ActorEffectShow = eval(parametersBEX['ActorEffectShow'] || 'true');

    const _Spriteset_Battle_makeTargetSprites = Spriteset_Battle.prototype.makeTargetSprites;
    Spriteset_Battle.prototype.makeTargetSprites = function(targets) {
        const targetSprites = _Spriteset_Battle_makeTargetSprites.call(this, targets);
        return ActorEffectShow ? this._nuun_targetSprites : targetSprites;
    };


})();