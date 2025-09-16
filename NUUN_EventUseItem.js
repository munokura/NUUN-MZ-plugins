/*:-----------------------------------------------------------------------------------
 * NUUN_EventUseItem.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/12/31 Ver.1.0.0
 * 初版
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc When consuming items in an event, the consumption rate and number of uses are reflected.
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

The event command "Add/Decrease Items" does not reflect the effects of
consumption rate, number of uses, etc.
This plugin takes consumption rate and number of uses into account when
consuming items.
Note that if you want to reflect consumption rate and number of uses, use the
plugin command "Consume Items" instead of the event command "Add/Decrease
Items." "Add/Decrease Items" will not reflect these effects.

Plugin Command
ConsumeItems Item Consumption
Consume one item.

Terms of Use
This plugin is distributed under the MIT License.

@command ConsumeItems
@text Item Consumption
@desc Consume the item.
@arg consumeItem
@text item
@desc Specifies the item to be consumed.
@type item
@default 0
*/

/*:ja
@target MZ
@plugindesc  イベントでアイテム消費時消耗率、使用回数反映
@author NUUN
@orderAfter NUUN_ConsumptionItem

@help
イベントコマンドのアイテムの増減では消耗率、使用回数などの効果が反映されません。
このプラグインはアイテムを消費する時、消耗率、使用回数を考慮し消費させます。
なお、消耗率、使用回数を反映させる場合はイベントコマンドの「アイテムの増減」ではなく
プラグインコマンドの「アイテム消費」を使用します。「アイテムの増減」では反映されません。


プラグインコマンド
ConsumeItems　アイテム消費
アイテムを１つ消費します。

利用規約
このプラグインはMITライセンスで配布しています。

@command ConsumeItems
@text アイテム消費
@desc アイテムを消費させます。

@arg consumeItem
@type item
@default 0
@text アイテム
@desc 消費させるアイテムを指定します。
*/

var Imported = Imported || {};
Imported.NUUN_EventUseItem = true;
let ConsumptionMessage = false;

(() => {
const parameters = PluginManager.parameters('NUUN_EventUseItem');
const pluginName = "NUUN_EventUseItem";
PluginManager.registerCommand(pluginName, "ConsumeItems", args => {
  $gameParty.eventConsumeItem(Number(args.consumeItem));
});

Game_Party.prototype.eventConsumeItem = function(args) {
  const item = $dataItems[args];
  ConsumptionMessage = true;
  if (this.numItems(item) > 0) {
    this.consumeItem(item);
  }
  ConsumptionMessage = false;
};

if (Imported.NUUN_ConsumptionItem) {
  const _Game_Party_consumptionMessage = Game_Party.prototype.consumptionMessage;
  Game_Party.prototype.consumptionMessage = function(item) {
    _Game_Party_consumptionMessage.call(this, item);
    if (item.meta.ConsumptionMessage) {
      if (!this.inBattle() && ConsumptionMessage) {
        $gameMessage.add(item.meta.ConsumptionMessage);
      }
    }
  };
}
})();