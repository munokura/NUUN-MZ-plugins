/*:-----------------------------------------------------------------------------------
 * NUUN_TMSkillCostEx.js
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
@plugindesc Skill Cost Expansion
@author NUUN
@license MIT License

@help
English Help Translator: munokura
Please check the URL below for the latest version of the plugin.
URL https://github.com/nuun888/MZ
-----

You can set skills that consume HP or items instead of MP or TP.

How to Use:

You can add a cost by writing a tag in the skill's memo field.

If an item set as "Not Consumable" in the database is used as a cost,
it will be treated as necessary but not consumed when using the skill.

If HP is set as the cost, the skill cannot be used if the remaining HP is
equal to the cost.
However, if the skill has the hpCostNoSafety tag,
the skill can be used even if the remaining HP is less than the cost.
Naturally, the actor who used it will be incapacitated.

If experience points are set as the cost and the expCostNoLevelDown tag is
also set,
the skill cannot be used if paying the cost would result in a level loss.

There are no plugin commands.

This plugin is distributed under the MIT License and is free to use, including
for commercial purposes, modifications, and redistribution.

Plugin Parameters:

Assigns the remaining HP (MP) before the cost is consumed to the specified
variable,
which allows the amount of consumed HP (MP) to be reflected in the damage
calculation formula.
If you set the value of hpVNumberId to 1, the remaining HP before cost
consumption will be assigned to game variable 1. You can reference the value
of game variable 1 by writing $gameVariables.value(1)
in the damage calculation formula.

Skill Memo:

<hpCost:10> # Sets the skill cost to 10 HP.
<hpRateCost:50> # Sets the skill cost to 50% of maximum HP.
<hpCRateCost:25> # Sets the skill cost to 25% of remaining HP.
<hpCostNoSafety> # Allows incapacitation by paying the HP cost.
<mpRateCost:100> # Sets the skill cost to 100% of maximum MP.
<mpCRateCost:50> # Sets the skill cost to 50% of remaining MP.
<mpCostNoMcr> # Excludes the effect of the "MP Consumption Rate" trait from
the MP cost.
<tpCRateCost:50> # Sets the skill cost to 50% of remaining TP.
<ignoreTpCost> # When the skill's TP cost is insufficient, it can be activated
by consuming all TP.
<itemCost:I1*2> # Sets two items #1 as the skill cost.
<itemCost:W2*1> # Sets one weapon #2 as the skill cost.
<itemCost:A5*1> # Sets one armor #5 as the skill cost.
<expCost:50> # Sets 50 experience points as the skill cost.
<expCostNoLevelDown> # Disables level down due to experience points.
<goldCost:100> # Sets 100 gold as the skill cost.
<vnCost:3*1> # Sets the value of game variable #3, 1, as the skill cost.

Special usage of the vnCost tag:

Only the vnCost memo tag can use control characters to set the variable
contents as parameters.

<vnCost:\V[14]*\V[15]>
For example, when using a skill with the above tag, if variable 14 has a value
of 16 and variable 15 has a value of 3, then variable 16 will consume 3
points.

Update History
2021/5/1 Ver. 1.1.1
First ported version

@param hpVNumberId
@text Remaining HP before consumption assignment variable
@desc The variable number to which the remaining HP before cost consumption is assigned when using a skill. (Setting 1 or higher will enable this.)
@type variable
@default 0

@param mpVNumberId
@text Remaining MP before consumption assignment variable
@desc The variable number to which the remaining MP before cost consumption is assigned when using a skill. (Setting 1 or higher will enable this.)
@type variable
@default 0

@param tpVNumberId
@text Remaining TP before consumption assignment variable
@desc The variable number to which the remaining TP before cost consumption is assigned when using a skill. (Setting 1 or higher will enable this.)
@type variable
@default 0

@param ignoreEnemyItemCost
@text Ignore enemy item costs
@desc Whether enemies should ignore item costs when using skills
@type select
@default 1
@option Consume party items
@value 0
@option ignore
@value 1
*/

/*:ja
@target MZ
@plugindesc  スキルコスト拡張
@author tomoaky  改変 NUUN
@version 1.1.1

@help
MPやTPの代わりにHPやアイテムを消費するスキルを設定できるようになります。


使い方:

  スキルのメモ欄にタグを書き込むことでコストを追加できます。

  データベースで 消耗しない に設定したアイテムをコストとした場合、
  スキル使用時に必要だが消費はしないという扱いになります。

  ＨＰをコストとして設定した場合、残りＨＰがコストと同値では
  使用できません。ただし、スキルに hpCostNoSafety タグがある場合は
  残りＨＰがコスト以下でもスキルが使用できます。
  当然使用したアクターは戦闘不能になります。

  経験値をコストとして設定し、一緒に expCostNoLevelDown タグを
  設定している場合、コストの支払いによってレベルが下がる状況では
  スキルの使用ができなくなります。

  プラグインコマンドはありません。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。


プラグインパラメータ:

  コスト消費前の残りHP(MP)を指定した変数に代入し、これにより
  消費したHP(MP)の量をダメージ計算式に反映させることができます。
  hpVNumberId の値を 1 にすると、ゲーム変数１番にコスト消費前の
  残りHPが代入されます。ダメージ計算式に $gameVariables.value(1) と
  書けばゲーム変数１番の値を参照することができます。


スキルのメモ欄:

  <hpCost:10>          # スキルのコストとしてＨＰ１０を設定
  <hpRateCost:50>      # スキルのコストとして最大ＨＰの５０％を設定
  <hpCRateCost:25>     # スキルのコストとして残りＨＰの２５％を設定
  <hpCostNoSafety>     # ＨＰコスト支払いによる戦闘不能を許可する
  <mpRateCost:100>     # スキルのコストとして最大ＭＰの１００％を設定
  <mpCRateCost:50>     # スキルのコストとして残りＭＰの５０％を設定
  <mpCostNoMcr>        # ＭＰコストから特徴『ＭＰ消費率』の効果を除外
  <tpCRateCost:50>     # スキルのコストとして残りＴＰの５０％を設定
  <ignoreTpCost>       # スキルのＴＰコスト不足時、ＴＰ全消費で発動可能
  <itemCost:I1*2>      # スキルのコストとしてアイテム１番２個を設定
  <itemCost:W2*1>      # スキルのコストとして武器２番１個を設定
  <itemCost:A5*1>      # スキルのコストとして防具５番１個を設定
  <expCost:50>         # スキルのコストとして経験値５０を設定
  <expCostNoLevelDown> # 経験値コストによるレベルダウンを禁止
  <goldCost:100>       # スキルのコストとしてお金１００Ｇを設定
  <vnCost:3*1>         # スキルのコストとしてゲーム変数３番の値１を設定


vnCostタグの特殊な使い方:

  メモ欄タグ vnCost のみ制御文字を利用して変数の中身をパラメータとして
  設定することができます。
  <vnCost:\V[14]*\V[15]>
  たとえば上記のようなタグがついたスキルを使用する際に、変数１４番の
  値が 16 、変数１５番の値が 3 だった場合は、変数１６番の値を３消費
  することになります。


更新履歴
2021/5/1 Ver 1.1.1
移植初版

@param hpVNumberId
@desc スキル使用時にコスト消費前の残りHPを代入する変数番号。 ( 1 以上を指定すると有効になります)
@text  消費前残りHP代入変数
@type variable
@default 0

@param mpVNumberId
@desc スキル使用時にコスト消費前の残りMPを代入する変数番号。 ( 1 以上を指定すると有効になります)
@text  消費前残りMP代入変数
@type variable
@default 0

@param tpVNumberId
@desc スキル使用時にコスト消費前の残りTPを代入する変数番号。 ( 1 以上を指定すると有効になります)
@text  消費前残りTP代入変数
@type variable
@default 0

@param ignoreEnemyItemCost
@desc 敵がスキルを使用する際にアイテムコストを無視するかどうか
@text 敵アイテムコスト無視
@type select
@option パーティのアイテムを消費
@value 0
@option 無視
@value 1
@default 1
*/

//=============================================================================
// TMPlugin - スキルコスト拡張
// バージョン: 1.1.1
// 最終更新日: 2017/09/25
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================


var Imported = Imported || {};
Imported.NUUN_TMSkillCostEx = true;

(() => {
const parameters = PluginManager.parameters('NUUN_TMSkillCostEx');
const HpVNumberId = +(parameters['hpVNumberId'] || 0);
const MpVNumberId = +(parameters['mpVNumberId'] || 0);
const TpVNumberId = +(parameters['tpVNumberId'] || 0);
const IgnoreEnemyItemCost = parameters['ignoreEnemyItemCost'] === '1';

Game_BattlerBase.prototype.skillHpCost = function(skill) {
  let result = 0;
  if (skill.meta.hpCost) {
    result += +skill.meta.hpCost;
  }
  if (skill.meta.hpRateCost) {
    result += +skill.meta.hpRateCost * this.mhp / 100;
  }
  if (skill.meta.hpCRateCost) {
    result += +skill.meta.hpCRateCost * this._hp / 100;
  }
  return Math.floor(result);
};

Game_BattlerBase.prototype.skillMpCost = function(skill) {
  let result = skill.mpCost;
  if (skill.meta.mpRateCost) {
    result += +skill.meta.mpRateCost * this.mmp / 100;
  }
  if (skill.meta.mpCRateCost) {
    result += +skill.meta.mpCRateCost * this._mp / 100;
  }
  if (!skill.meta.mpCostNoMcr) {
    result *= this.mcr;
  }
  return Math.floor(result);
};

Game_BattlerBase.prototype.skillTpCost = function(skill) {
  let result = skill.tpCost;
  if (skill.meta.tpCRateCost) {
    result += +skill.meta.tpCRateCost * this._tp / 100;
  }
  result = Math.floor(result);
  if (skill.meta.ignoreTpCost && result > this._tp) result = this._tp;
  return result;
};

Game_BattlerBase.prototype.skillItemCost = function(skill) {
  if (!this.isActor() && IgnoreEnemyItemCost) {
    return null;
  }
  if (skill.meta.itemCost) {
    const re = /(i|w|a)(\d+)\*(\d+)/i;
    const match = re.exec(skill.meta.itemCost);
    if (match) {
      let itemCost = {};
      let s = match[1].toUpperCase();
      if (s === 'I') {
        itemCost.item = $dataItems[+match[2]];
      } else if (s === 'W') {
        itemCost.item = $dataWeapons[+match[2]];
      } else {
        itemCost.item = $dataArmors[+match[2]];
      }
      itemCost.num = +match[3];
      return itemCost;
    }
  }
  return null;
};

Game_BattlerBase.prototype.skillExpCost = function(skill) {
  return !this.isEnemy() && skill.meta.expCost ? +skill.meta.expCost : 0;
};

Game_BattlerBase.prototype.skillGoldCost = function(skill) {
  return !this.isEnemy() && skill.meta.goldCost ? +skill.meta.goldCost : 0;
};

Game_BattlerBase.prototype.skillVNumberCost = function(skill) {
  if (skill.meta.vnCost) {
    let result = {};
    const vnCost = skill.meta.vnCost.split('*');
    const re = /\\V\[(\d+)\]/i;
    let match = re.exec(vnCost[0]);
    result.index = match ? $gameVariables.value(+match[1]) : +vnCost[0];
    match = re.exec(vnCost[1]);
    result.num = match ? $gameVariables.value(+match[1]) : +vnCost[1];
    return result;
  }
  return null;
};

const _Game_BattleBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
  if (!this.canPaySkillHpCost(skill) ||
      !this.canPaySkillItemCost(skill) ||
      !this.canPaySkillExpCost(skill) ||
      !this.canPaySkillGoldCost(skill) ||
      !this.canPaySkillVNumberCost(skill)) {
    return false;
  }
  return _Game_BattleBase_canPaySkillCost.call(this, skill);
};

Game_BattlerBase.prototype.canPaySkillHpCost = function(skill) {
  if (skill.meta.hpCostNoSafety) return true;
  const hpCost = this.skillHpCost(skill);
  return hpCost <= 0 || this._hp > hpCost;
};

Game_BattlerBase.prototype.canPaySkillItemCost = function(skill) {
  const itemCost = this.skillItemCost(skill);
  return !itemCost || $gameParty.numItems(itemCost.item) >= itemCost.num;
};

Game_BattlerBase.prototype.canPaySkillExpCost = function(skill) {
  const expCost = this.skillExpCost(skill);
  return expCost === 0 || (this.currentExp() >= expCost &&
         (!skill.meta.expCostNoLevelDown || this.currentExp() - expCost >=
         this.currentLevelExp()));
};

Game_BattlerBase.prototype.canPaySkillGoldCost = function(skill) {
  return $gameParty.gold() >= this.skillGoldCost(skill);
};

Game_BattlerBase.prototype.canPaySkillVNumberCost = function(skill) {
  const vnCost = this.skillVNumberCost(skill);
  return !vnCost || $gameVariables.value(vnCost.index) >= vnCost.num;
};

const _Game_BattleBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
  if (HpVNumberId > 0) {
    $gameVariables.setValue(HpVNumberId, this._hp);
  }
  if (MpVNumberId > 0) {
    $gameVariables.setValue(MpVNumberId, this._mp);
  }
  if (TpVNumberId > 0) {
    $gameVariables.setValue(TpVNumberId, this._tp);
  }
  this._hp -= Math.min(this.skillHpCost(skill), this._hp);
  const itemCost = this.skillItemCost(skill);
  if (itemCost && this.isItemCostValid(itemCost.item)) {
    $gameParty.loseItem(itemCost.item, itemCost.num, false)
  }
  const expCost = this.skillExpCost(skill);
  if (expCost) {
    const newExp = this.currentExp() - expCost;
    this.changeExp(newExp, this.shouldDisplayLevelUp());
  }
  $gameParty.loseGold(this.skillGoldCost(skill));
  const vnCost = this.skillVNumberCost(skill);
  if (vnCost) {
    const n = $gameVariables.value(vnCost.index) - vnCost.num;
    $gameVariables.setValue(vnCost.index, n);
  }
  _Game_BattleBase_paySkillCost.call(this, skill);
};

Game_BattlerBase.prototype.isItemCostValid = function(item) {
  return !DataManager.isItem(item) || item.consumable;
};

})();