/*:-----------------------------------------------------------------------------------
 * NUUN_PartyCommandCustomize.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Party command display order
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

You can display party commands in any order.

This plugin's behavior varies depending on where you place it.
Placing it at the bottom allows you to set the display order for all commands.
If you're adding commands from other plugins, enter the corresponding string
in "Commandkey."

If you're adding commands from other plugins without configuring them with
this plugin, place it above those plugins.

Specifications
Party commands will be omitted if there are one or fewer items in the party
command list.

Update History
February 26, 2022 Ver. 1.0.0
First Edition

@param PartyCommandList
@text Party Command List
@desc Party command settings.
@type struct<CommandList>[]
*/

/*:ja
@target MZ
@plugindesc パーティコマンド任意表示順
@author NUUN
@version 1.0.0
@base NUUN_Base
@orderAfter NUUN_Base

@help
パーティコマンドのコマンドの表示を任意の順番で表示できます。

このプラグインを配置する場所により動作が異なります。
下のほうに配置することにより全てのコマンドの表示順を設定できます。他プラグインによるコマンド追加を行う場合は「Commandkey」
に該当する文字列を記入してください。
他プラグインのコマンド追加をこのプラグインで設定せずに追加する場合は、それらのプラグインの上に配置してください。

仕様
パーティコマンドリストの項目が１以下の時はパーティコマンドが省略されます。

更新履歴
2022/2/26 Ver.1.0.0
初版

@param PartyCommandList
@text パーティコマンドリスト
@desc パーティコマンドの設定。
@default 
@type struct<CommandList>[]
*/

var Imported = Imported || {};
Imported.NUUN_PartyCommandCustomize = true;

(() => {
const parameters = PluginManager.parameters('NUUN_PartyCommandCustomize');
const PartyCommandList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PartyCommandList'])) : null) || [];

const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
  if (PartyCommandList) {
    for (const data of PartyCommandList) {
      const key = data.Commandkey[0];
      let text = data.CommandName;
      if (key === "fight") {
        text = !text ? TextManager.fight : text;
      }
      if (key === "escape") {
        text = !text ? TextManager.escape : text;
        this.addCommand(text, key, data.CommandEval ? eval(data.CommandEval) : BattleManager.canEscape());
      } else {
        this.addCommand(text, key, eval(data.CommandEval));
      }
    }
  } else {//配列がなければ通常の処理
    _Window_PartyCommand_makeCommandList.call(this);
  }
};

const _Scene_Battle_selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
  _Scene_Battle_selectPreviousCommand.call(this);
  if (!BattleManager.needsPartyCommand() && !BattleManager.actor()) {
    this.selectNextCommand();
  }
};

const _Scene_Battle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
Scene_Battle.prototype.changeInputWindow = function() {
  _Scene_Battle_changeInputWindow.call(this);
  if (BattleManager.isInputting()) {
    if (!BattleManager.isTpb() && !BattleManager.needsPartyCommand() && !BattleManager.actor()) {
      this.selectNextCommand();
    }
  }
};

const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.initNeedsPartyCommand();
};

BattleManager.initNeedsPartyCommand = function() {
  this._tpbNeedsPartyCommand = this.needsPartyCommand() ? this._tpbNeedsPartyCommand : false;
};

BattleManager.needsPartyCommand = function() {
  return PartyCommandList && PartyCommandList.length > 1;
};

})();