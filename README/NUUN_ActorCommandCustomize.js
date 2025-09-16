/*:-----------------------------------------------------------------------------------
 * NUUN_ActorCommandCustomize.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Actor Command Arbitrary Display Order
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

You can display actor commands in any order.

This plugin's behavior varies depending on where you place it.
Placing it at the bottom allows you to set the display order for all commands.
If you are adding commands from another plugin, enter the corresponding string
in "Commandkey."

If you are adding actor commands from another plugin without configuring them
with this plugin, place them below this plugin.

Specifications
If no command list is set, the default command list will be displayed.

Update History
February 26, 2022 Ver. 1.0.0
First Edition

@param ActorCommand
@text Actor Command List
@desc Setting the actor's commands.
@type struct<ActorCommandSetting>[]
*/

/*:ja
@target MZ
@plugindesc アクターコマンド任意表示順
@author NUUN
@version 1.0.0
@base NUUN_Base
@orderAfter NUUN_Base

@help
アクターコマンドのコマンドの表示を任意の順番で表示できます。

このプラグインを配置する場所により動作が異なります。
下のほうに配置することにより全てのコマンドの表示順を設定できます。他プラグインによるコマンド追加を行う場合は「Commandkey」
に該当する文字列を記入してください。
他プラグインのアクターコマンド追加をこのプラグインで設定せずに追加する場合は、このプラグインの下に配置してください。

仕様
コマンドリストが設定されていない場合はデフォルトのコマンドリストが表示されます。

更新履歴
2022/2/26 Ver.1.0.0
初版

@param ActorCommand
@text アクターのコマンドリスト
@desc アクターのコマンドの設定。
@default 
@type struct<ActorCommandSetting>[]
*/

var Imported = Imported || {};
Imported.NUUN_ActorCommandCustomize = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ActorCommandCustomize');
const ActorCommand = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorCommand'])) : null) || [];

const _Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
  if (this._actor) {
    const commandList = ActorCommand.find(actor => actor.ActorId === this._actor.actorId());
    if (commandList && commandList.ActorCommandData && commandList.ActorCommandData.length > 0) {
      for (const data of commandList.ActorCommandData) {
        const key = data.Commandkey[0];
        let text = data.CommandName;
        let dataFunc = data.CommandFuncEval && data.CommandFuncEval[0];
        switch (key) {
          case "escape":
            if (dataFunc) {
              eval(data.CommandFuncEval[0]);
              break;
            }
            text = !text ? TextManager.escape : text;
            this.addCommand(text, key, data.CommandEval && data.CommandEval[0] ? eval(data.CommandEval[0]) : BattleManager.canEscape());
            break;
          case "attack":
            if (dataFunc) {
              eval(data.CommandFuncEval[0]);
              break;
            }
            text = !text ? TextManager.fight : text;
            this.addCommand(text, "attack", data.CommandEval && data.CommandEval[0] ? eval(data.CommandEval[0]) : this._actor.canAttack());
            break;
          case "skill":
            if (dataFunc) {
              eval(data.CommandFuncEval[0]);
              break;
            }
            this.addSkillCommands();
            break;
          case "guard":
            if (dataFunc) {
              eval(data.CommandFuncEval[0]);
              break;
            }
            text = !text ? TextManager.guard : text;
            this.addCommand(TextManager.guard, "guard", data.CommandEval && data.CommandEval[0] ? eval(data.CommandEval[0]) : this._actor.canGuard());
            break;
          case "item":
            if (dataFunc) {
              eval(data.CommandFuncEval[0]);
              break;
            }
            text = !text ? TextManager.item : text;
            this.addCommand(TextManager.item, "item", eval(data.CommandEval[0]));
            break;
          default:
            if (dataFunc) {
              eval(data.CommandFuncEval[0]);
              break;
            }
            this.addCommand(TextManager.item, key, eval(data.CommandEval[0]));
            break;
        }
      }
    } else {
      _Window_ActorCommand_makeCommandList.call(this);
    }
  }
};

const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
  _Scene_Battle_createActorCommandWindow.call(this);
  this._actorCommandWindow.setHandler("escape", this.commandEscape.bind(this));
};

})();