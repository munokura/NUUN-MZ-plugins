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
Please check the URL below for the latest version of the plugin.
URL https://github.com/nuun888/MZ
-----

You can display actor commands in any order.

This plugin's behavior varies depending on where you place it.
Placing it at the bottom allows you to set the display order for all commands.
If you are adding commands from another plugin, enter the corresponding string
in "Commandkey".
If you are adding actor commands from another plugin without configuring them
with this plugin, place it below this plugin.

'default': The original command is displayed.

Specifications
If no command list is set, the default command list is displayed.

Update History
February 26, 2022 Ver. 1.0.0
First Edition

@param ActorCommand
@text Actor Command List
@desc Setting the actor's commands.
@type struct<ActorCommandSetting>[]
*/

/*~struct~ActorCommandSetting:
@param ActorId
@text actor
@desc actor
@type actor

@param ActorCommandData
@text Command List
@desc Command configuration.
@type struct<ActorCommandList>[]
@default ["{\"CommandName\":\"\",\"Commandkey\":\"'default'\",\"CommandEval\":\"\",\"CommandFuncEval\":\"[]\"}"]
*/

/*~struct~ActorCommandList:
@param CommandName
@text Command name
@desc Set the command name.
@type string

@param Commandkey
@text Show Command Keys
@desc Specify the classes to apply or exclude. If not specified, it will be reflected in all commands.
@type combo
@default 'default'
@option 'attack'
@option 'skill'
@option 'guard'
@option 'item'
@option 'escape'
@option 'formation'
@option 'default'

@param CommandEval
@text Command usage conditions.
@desc Conditions under which commands can be used. Can be set outside of skills. If defined in the command processing evaluation formula, it will not be processed.
@type combo
@option $gameSwitches.value(0); // switch

@param CommandFuncEval
@text Command processing evaluation expression
@desc Defines the expression to evaluate when processing a command.
@type combo
@option this.addCommand(TextManager.formation, "formation", $gameParty.useFormation()); // Member change screen (battle)
*/

/*:ja
@target MZ
@plugindesc アクターコマンド任意表示順
@author NUUN
@version 1.0.1
@base NUUN_Base
@orderAfter NUUN_Base

@help
アクターコマンドのコマンドの表示を任意の順番で表示できます。

このプラグインを配置する場所により動作が異なります。
下のほうに配置することにより全てのコマンドの表示順を設定できます。他プラグインによるコマンド追加を行う場合は「Commandkey」
に該当する文字列を記入してください。
他プラグインのアクターコマンド追加をこのプラグインで設定せずに追加する場合は、このプラグインの下に配置してください。

'default' 元のコマンドが表示されます。

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

/*~struct~ActorCommandSetting:ja

@param ActorId
@desc アクター
@text アクター
@type actor

@param ActorCommandData
@text コマンドリスト
@desc コマンドの設定。
@default ["{\"CommandName\":\"\",\"Commandkey\":\"'default'\",\"CommandEval\":\"\",\"CommandFuncEval\":\"[]\"}"]
@type struct<ActorCommandList>[]
*/

/*~struct~ActorCommandList:ja
@param CommandName
@text コマンド名
@desc コマンド名を設定します。
@type string

@param Commandkey
@text 表示コマンドキー
@desc 適用、除外するクラスを指定します。無指定の場合は全てのコマンドで反映されます。
@type combo
@option 'attack'
@option 'skill'
@option 'guard'
@option 'item'
@option 'escape'
@option 'formation'
@option 'default'
@default 'default'

@param CommandEval
@type combo
@option $gameSwitches.value(0);//スイッチ
@default 
@text コマンド使用条件。
@desc コマンドが使用できる条件。スキル以外で設定できます。コマンド処理評価式で定義している場合は処理しません。

@param CommandFuncEval
@type combo
@option this.addCommand(TextManager.formation, "formation", $gameParty.useFormation());//メンバー変更画面(戦闘)
@default 
@text コマンド処理評価式
@desc コマンドを処理する評価式を定義します。
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
        const key = data.Commandkey;
        let text = data.CommandName;
        let dataFunc = data.CommandFuncEval;
        switch (key) {
          case "default":
            _Window_ActorCommand_makeCommandList.call(this);
          case "escape":
            if (dataFunc) {
              eval(data.CommandFuncEval);
              break;
            }
            text = !text ? TextManager.escape : text;
            this.addCommand(text, key, data.CommandEval ? eval(data.CommandEval) : BattleManager.canEscape());
            break;
          case "attack":
            if (dataFunc) {
              eval(data.CommandFuncEval);
              break;
            }
            text = !text ? TextManager.fight : text;
            this.addCommand(text, "attack", data.CommandEval ? eval(data.CommandEval) : this._actor.canAttack());
            break;
          case "skill":
            if (dataFunc) {
              eval(data.CommandFuncEval);
              break;
            }
            this.addSkillCommands();
            break;
          case "guard":
            if (dataFunc) {
              eval(data.CommandFuncEval);
              break;
            }
            text = !text ? TextManager.guard : text;
            this.addCommand(TextManager.guard, "guard", data.CommandEval ? eval(data.CommandEval) : this._actor.canGuard());
            break;
          case "item":
            if (dataFunc) {
              eval(data.CommandFuncEval);
              break;
            }
            text = !text ? TextManager.item : text;
            this.addCommand(TextManager.item, "item", eval(data.CommandEval));
            break;
          default:
            if (dataFunc) {
              eval(data.CommandFuncEval);
              break;
            }
            this.addCommand(TextManager.item, key, eval(data.CommandEval));
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