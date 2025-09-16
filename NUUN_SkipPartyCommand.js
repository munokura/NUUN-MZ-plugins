/*:-----------------------------------------------------------------------------------
 * NUUN_SkipPartyCommand.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Skip Party Command
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

Skips the party commands that appear after the turn begins. In TPB battles,
skips the party commands that appear after the battle begins.
Pressing Cancel from the actor command will display the party commands as
usual.

*If you do not want to display all party commands, please use the Party
Command Display Order Customization Plugin (NUUN_PartyCommandCustomiz).

Terms of Use
This plugin is distributed under the MIT License.

Update History
July 30, 2022 Ver. 1.0.1
Fixed an issue that could cause an infinite loop in TPB battles.
May 2, 2022 Ver. 1.0.0
First Edition
*/

/*:ja
@target MZ
@plugindesc スキップパーティコマンド
@author NUUN
@version 1.0.1

@help
ターン開始後とに表示されるパーティコマンドをスキップします。TPBバトルの場合は戦闘開始後に表示されるパーティコマンドをスキップします。
アクターコマンドからキャンセルを押した場合は通常通りパーティコマンドが表示されます。

※パーティコマンドを完全に表示させたくない場合はパーティコマンド表示順任意プラグイン(NUUN_PartyCommandCustomiz)をご仕様ください。

利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2022/7/30 Ver.1.0.1
TPBバトルで無限ループを起こしてしまう問題を修正。
2022/5/2 Ver.1.0.0
初版
*/

var Imported = Imported || {};
Imported.NUUN_SkipPartyCommand = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SkipPartyCommand');

const _Scene_Battle_updateInputWindowVisibility = Scene_Battle.prototype.updateInputWindowVisibility
Scene_Battle.prototype.updateInputWindowVisibility = function() {
  if (!BattleManager.isTpb() && !$gameMessage.isBusy() && this.needsInputWindowChange()) {
    BattleManager.stratOnPartyCommand = true;
  }
  _Scene_Battle_updateInputWindowVisibility.call(this);
};

const _Scene_Battle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
Scene_Battle.prototype.changeInputWindow = function() {
  if (BattleManager.isInputting()) {
    if (BattleManager.stratOnPartyCommand && !BattleManager.actor()) {
      this.selectNextCommand();
      BattleManager.stratOnPartyCommand = false;
    }
  }
  _Scene_Battle_changeInputWindow.call(this);
};

const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.stratOnPartyCommand = true;
};


})();