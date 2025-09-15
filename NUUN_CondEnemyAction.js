/*:-----------------------------------------------------------------------------------
 * NUUN_CondEnemyAction.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Expanded enemy behavior patterns
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

You can set detailed conditions for enemy behavior patterns.
To apply conditions, set the switches you want to apply the conditions to in
the Condition Judgment Application Switch ID List in the plugin parameters.

This plugin requires a conditional base.

Enemy Character Memo
<ActionCond[SwitchId]:[CondId]...> The condition is met only when the
condition for the user-specified ID is met.
<PartyActionCond[SwitchId]:[CondId]...> The condition is met only when the
condition for a party member's specified ID is met.
<TroopActionCond[SwitchId]:[CondId]...> The condition is met only when the
condition for the enemy group's specified ID is met.
[SwitchId]: Switch ID set in the behavior pattern switch
[CondId]: Condition ID (multiple IDs can be specified)
Example
<ActionCond10:6> If the behavior pattern action condition is switch number 10,
the condition is met when condition number 6 in the action list is met.

<ActionMatch[SwitchId]:[modeId]>
[modeId]: 0: Match any one of the following
1: Match all
[SwitchId]: Switch ID set in the behavior pattern switch
If left blank, the condition will be met if any one of the following matches.

Terms of Use
This plugin is distributed under the MIT License.

Update History
June 12, 2022 Ver. 1.0.1
Fixed a description that was insufficient.
Fixed the condition match mode, which applied to all actions.
December 18, 2021 Ver. 1.0.0
First version

@param CondActionSwitches
@text Condition judgment application switch ID list
@desc Set the switch to apply the conditions.
@type struct<CondActionSwitchList>[]
*/

/*~struct~CondActionSwitchList:
@param SwitchId
@text switch
@desc Specifies the switch.
@type switch
*/

/*:ja
@target MZ
@plugindesc 敵の行動パターン条件拡張
@author NUUN
@version 1.0.1
@base NUUN_ConditionsBase
@orderAfter NUUN_ConditionsBase

@help
敵の行動パターンの条件を細かく設定できます。
条件を適用するにはプラグインパラメータで条件判定適用スイッチIDリストに条件適用扱いとするスイッチを設定します。

このプラグインは条件付きベースが必要です。

敵キャラのメモ欄
<ActionCond[SwitchId]:[CondId]...> 使用者の指定したIDの条件が一致したときのみ条件を満たします。
<PartyActionCond[SwitchId]:[CondId]...> パーティメンバーの指定したIDの条件が一致したときのみ条件を満たします。
<TroopActionCond[SwitchId]:[CondId]...> 敵グループの指定したIDの条件が一致したときのみ条件を満たします。
[SwitchId]:行動パターンのスイッチで設定したスイッチID
[CondId]:条件ID(複数指定可能)
例
<ActionCond10:6> 行動パターンのアクション条件が10番のスイッチ指定時、行動リストの6番の条件が一致したときに条件を満たします。

<ActionMatch[SwitchId]:[modeId]> 
[modeId]:0 いずれかが一致　1：全て一致
[SwitchId]:行動パターンのスイッチで設定したスイッチID
未記入の場合はいずれかが一致の場合条件を満たしたときになります。


利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2022/6/12 Ver.1.0.1
説明文が情報不足だったため修正。
条件一致モードが全アクション対象だったため修正。
2021/12/18 Ver.1.0.0
初版

@param CondActionSwitches
@text 条件判定適用スイッチIDリスト
@desc 適用する条件するスイッチを設定します。
@type struct<CondActionSwitchList>[]
*/

/*~struct~CondActionSwitchList:ja

@param SwitchId
@text スイッチ
@desc スイッチを指定します。
@type switch
*/

var Imported = Imported || {};
Imported.NUUN_CondEnemyAction = true;

(() => {
const parameters = PluginManager.parameters('NUUN_CondEnemyAction');
const CondActionSwitches = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['CondActionSwitches'])) : null) || [];

const _Game_Enemy_meetsSwitchCondition = Game_Enemy.prototype.meetsSwitchCondition;
Game_Enemy.prototype.meetsSwitchCondition = function(param) {
    if (condSwitch(param)) {
        return this.condAction(param);
    } else {
        return _Game_Enemy_meetsSwitchCondition.call(this, param)
    }
};

Game_Enemy.prototype.condAction = function(param) {
    const tag = 'ActionCond' + param;
    const matchTag = 'ActionMatch' + param;
    const mode = Number(this.enemy().meta[matchTag]) || 0;
    return this.getTriggerConditions(this.enemy(), null, tag, null, 'Party' + tag, 'Troop' + tag, null, null, mode);
};

function condSwitch(param) {
    return CondActionSwitches.some(s => s.SwitchId === param);
};
 
})();