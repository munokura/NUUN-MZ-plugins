/*:-----------------------------------------------------------------------------------
 * NUUN_StealableItems.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Stealing skills, items
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

You can create skills that allow you to steal items or money from enemies, or
have items or money stolen from you.

To create a skill that allows you to steal items, write the following in the
skill or item's memo field.
This tag can be used on both actors and enemies.
<stealSkill:[rate]>
[rate]: Success rate
Example: <stealSkill:80>
Setting a stealing skill.

To create a skill that allows you to steal money from enemies, write the
following in the skill or item's memo field.
This tag is for actors only.
<goldStealSkill:[rate], [gold], [variance]>
[rate]: Success rate [gold]: Amount stolen per steal [variance]: Variance ±
<goldStealSkill:50>

To create a skill that allows you to steal money from enemies, write the
following in the skill or item's memo field.
The following tags are for enemies only.
<goldStealSkill:[rate],[gold]>
[rate]: Success rate, [gold]: Amount stolen
<goldStealSkillRate:[gold],[goldRate]>
[rate]: Success rate, [goldRate]: Amount stolen (percentage)

Example
<goldStealSkill:100, 400>
There is a 100% chance of stealing 400G.
<goldStealSkillRate:70, 30>
There is a 70% chance of stealing 30% of your gold.

To set the items that can be stolen from an enemy, enter the following in the
enemy's memo field:
<steal [itemType]:[id], [rate], [condTag], [condMode]>
[itemType]: Item type I, Item W, Weapon A, Armor M, Price
[id]: Item, weapon, or armor ID
[rate]: Probability (percentage)
The following settings require the Conditional Base plugin. If no conditions
are specified, they can be omitted.
[condTag]: Condition tag (Optional; Conditional Base required).
[condMode]: Condition mode (Optional; Conditional Base required). 0: Partial
match 1: Full match

<steal I: Item ID, Probability>
Sets the items that can be stolen.
<steal W: Weapon ID, Probability>
Sets the weapons that can be stolen.
<steal A: Armor ID, Probability>
Sets the armor that can be stolen.
<steal M: Price, Probability>
Sets the price that can be stolen.

Conditionally Stealable Items
<Steal[condTag]:[id],[id],[id]...> Steals when the stealer meets the specified
ID conditions.
<TargetSteal[condTag]:[id],[id],[id]...> Steals when the target meets all of
the specified ID conditions.
<PartySteal[condTag]:[id],[id],[id]...> Steals when all of the party members'
specified ID conditions are met.
<TroopSteal[condTag]:[id],[id],[id]...> Steals when all of the enemy group's
specified ID conditions are met.
[mode]: Condition mode 0: Partial match 1: Full match
[id]: Condition list ID
<StealCond1:1,14,15>

Enemy Memo
<Steal_[itemType]_[itemId]: [Steal count], [Dispersion]>
[itemType]:
I: Item
W: Weapon
A: Armor
[itemId]: Item ID
[Steal count]: Maximum number of steals
[Dispersion]: ± Dispersion

To set the items stolen by enemies, use the "Enemy Items Stolen" plugin
parameter.

Actor, Class, Weapon, Armor, State, and Enemy Memo
<steal_sr: [± Additional Chance]> Add/Decrease
<steal_sr_Percent: [% Additional Chance]> Percentage Increase/Decrease
Changes the steal success rate for memo fields with special features.
<stealResist: [% probability]>
Sets the steal resistance rate in the memo field with the feature.
<stealResist: 50> Reduces the chance of being stolen by 50%.

The following variables and functions are available to reference the number of
times you have stolen items.
$gameSystem._stealCount
$gameSystem.getBattleSteal()
Total amount of money stolen.
$gameSystem._stealGoldSum
$gameSystem.getBattleStealGold()
Number of times items have been stolen.
$gameSystem._stolenCount
$gameSystem.getBattleStolen()
Total amount of money stolen.
$gameSystem._stolenGoldSum
$gameSystem.getBattleStolenGold()

Stealing Probability Calculation
Skill/Item Success Probability * (Success Rate Modifier % + Success Rate
Modifier +)
When displaying the adjusted probability for Success Rate Modifier % and
Success Rate Modifier + on the status screen, the calculated probability may
differ from the displayed probability depending on the skill or item success
rate.

Terms of Use
This plugin is distributed under the MIT License.

Update History
2025/4/25 Ver. 1.5.3
Fixed an error when displaying stolen items in the Monster Encyclopedia.
2025/2/2 Ver. 1.5.2
Fixed popup processing.
2024/9/7 Ver. 1.5.1
Added the ability to specify the number of steals allowed.
Fixed the ability to display a message when a member has no money.
Fixed an issue where the stolen amount was displayed as more than the member's
money.
September 1, 2024 Ver. 1.5.0
Added an effect that boosts enemy steal chance.
Fixed the ability to apply luck to steal chance.
May 11, 2024 Ver. 1.4.2
Fixed stealing from allies.
Fixed phase.
July 2, 2022 Ver. 1.4.1
Added processing to display stolen items in the results.
June 14, 2022 Ver. 1.4.0
Supports popups. (Requires NUUN_popUp)
Removed unused plugin parameters.
January 25, 2022 Ver. 1.3.2
Fixed processing of probability and resistivity.
November 13, 2021 Ver. 1.3.1
Supports conditional stealing.
October 24, 2021 Ver. 1.3.0
Changed message format.
Added the ability to steal the same item multiple times.
Added the ability to steal by lottery from all stealable items.
2021/6/18 Ver 1.2.0
Fixed an issue where boost calculations were not working properly.
Added a feature to display a message when you do not have any items or money.
Added a feature to play a sound effect when a steal is successful.
2021/2/20 Ver 1.1.1
Fixed an issue where the percentage increase or decrease in the steal success
rate was not being properly acquired.
2021/2/5 Ver 1.1.0
Implemented steal resistance.
2021/1/24 Ver 1.0.1
Fixed an issue where parameters such as the number of times items stolen were
not being properly acquired.
2020/11/21 Ver 1.0.0
First version

@param StealMode
@text Money Steal Mode
@desc Stolen money will not be reclaimed.
@type boolean
@default true

@param StealCount
@text Number of items that can be stolen
@desc Number of times you can steal one item. 0 means unlimited
@type number
@default 1

@param StealProcess
@text What to do when stealing
@desc Specifies the steal action.
@type select
@default 0
@option First matching item
@value 0
@option All stealable items and money will be selected
@value 1

@param NotStealName
@text Message when you can't steal
@desc Message displayed when an item cannot be stolen from an enemy. %1 User %2 Target
@default %2から何も盗めなかった！

@param NonStealName
@text Message when there are no items to steal
@desc Message displayed when there are no items to steal. %1 User %2 Target
@default %2は何も持っていない！

@param NonStealGoldName
@text A message for when you have no money to steal
@desc Message when there is no money to steal. %1 user %2 target
@default %2は何も持っていない！

@param GetStealName
@text Message when you steal an item from an enemy
@desc Message displayed when stealing an item from an enemy. %1 User %2 Target %3 Stolen item or amount
@default %2から%3を盗んだ！

@param StolenName
@text Message when an item is stolen by an enemy
@desc Message when an item is stolen from an enemy. %1 User %2 Target %3 Stolen item or amount
@default %2から%3を盗み取った！

@param StolenItemDrop
@text Recovering stolen items
@desc Will stolen items be dropped after defeating an enemy?
@type boolean
@default false

@param StolenGoldDrop
@text Recovering stolen money
@desc Will stolen money from enemies be dropped after defeating them?
@type boolean
@default false

@param stolenItems
@text Setting items stolen from enemies
@desc This is the setting for items that can be stolen from enemies.
@type struct<stolenItems>[]
@default []

@param SuccessSE
@text Item Stealing Sound Effects
@default ------------------------------

@param StealSuccessSE
@text Sound effect when stealing is successful
@desc Sound effect when stealing is successful
@type file
@dir audio/se/
@parent SuccessSE

@param volume
@desc volume.
@type number
@default 90
@parent SuccessSE

@param pitch
@desc pitch.
@type number
@default 100
@parent SuccessSE

@param pan
@text phase
@desc phase.
@type number
@default 0
@min -100
@max 100
@parent SuccessSE

@param GoldSuccessSE
@text Sound effects when stealing money successfully
@default ------------------------------

@param StealGoldSuccessSE
@text Sound effect when money is stolen successfully
@desc Sound effect when money is stolen successfully
@type file
@dir audio/se/
@parent GoldSuccessSE

@param G_volume
@text volume
@desc volume.
@type number
@default 90
@parent GoldSuccessSE

@param G_pitch
@text pitch
@desc pitch.
@type number
@default 100
@parent GoldSuccessSE

@param G_pan
@text phase
@desc phase.
@type number
@default 0
@min -100
@max 100
@parent GoldSuccessSE
*/

/*:ja
@target MZ
@plugindesc 盗みスキル、アイテム
@author NUUN
@version 1.5.3
@base NUUN_Base
@orderAfter NUUN_Base

@help
敵からアイテムやお金を盗むスキルまたは、敵からアイテム、お金を盗まれるスキルを
作ることが出来ます。

アイテムを盗むスキルを作るには、スキル、アイテムのメモ欄に以下を記述します。
このタグはアクター、敵両方で使用できます。
<stealSkill:[rate]>
[rate]:成功率
例<stealSkill:80>
盗みスキルを設定します。

敵からお金を盗むスキルを作るには、スキル、アイテムのメモ欄に以下を記述します。
このタグはアクター専用です。
<goldStealSkill:[rate], [gold], [variance]>
[rate]:成功率 [gold]:１回で盗める金額 [variance]:分散度±
<goldStealSkill:50>

敵からお金を盗まれるスキルを作るには、スキル、アイテムのメモ欄に以下を記述します。
以下のタグは敵専用です。
<goldStealSkill:[rate],[gold]>
[rate]:成功率 [gold]:盗める金額
<goldStealSkillRate:[gold],[goldRate]>
[rate]:成功率 [goldRate]:盗める金額割合

例
<goldStealSkill:100, 400>
100%の確率で400Ｇ奪われます。
<goldStealSkillRate:70, 30>
70%の確率で所持金の30%が奪われます。

敵から盗めるアイテムを設定するには、敵のメモ欄に以下を記述します。
<steal [itemType]:[id], [rate], [condTag], [condMode]>
[itemType]：アイテムタイプ　I アイテム　W 武器　A 防具　M 金額
[id]:アイテム、武器、防具のID
[rate]：確率(100分率)
以下の設定は条件付きベースプラグインが必要です。条件を指定しない場合は省略できます。
[condTag]：条件タグ ※省略可能　条件付きベースが必要です。
[condMode]：条件モード ※省略可能　条件付きベースが必要です。0:一部一致 1:全て一致

<steal I:アイテムID, 確率>
盗めるアイテムを設定します。
<steal W:武器ID, 確率>
盗める武器を設定します。
<steal A:防具ID, 確率>
盗める防具を設定します。
<steal M:金額, 確率>
盗める金額を設定します。

条件付き盗めるアイテム
<Steal[condTag]:[id],[id],[id]...> 盗みスキル発動者が指定したIDの条件を満たしたときに盗めます。
<TargetSteal[condTag]:[id],[id],[id]...> 盗み対象が指定したIDの条件を全て満たしたときに盗めます。
<PartySteal[condTag]:[id],[id],[id]...> パーティメンバーの指定したIDの条件を全て満たしたときに盗めます。
<TroopSteal[condTag]:[id],[id],[id]...> 敵グループの指定したIDの条件を全て満たしたときに盗めます。
[mode]：条件モード　0:一部一致 1：全て一致
[id]：条件リストのID
<StealCond1:1,14,15> 

敵のメモ欄
<Steal_[itemType]_[itemId]:[盗める回数], [分散度]>
[itemType]:
I:アイテム
W:武器
A:防具
[itemId]:アイテムID
[盗める回数]:盗める最大回数
[分散度]:分散度±

敵から盗まれるアイテムを設定するには、プラグインパラメータの「敵から奪われるアイテム設定」から設定します。

アクター、職業、武器、防具、ステート、エネミーのメモ欄
<steal_sr: [±追加確率]> 加算増減
<steal_sr_Percent: [%追加確率]> 割合増減
特徴を有するメモ欄に盗みの成功確率を変更します。
<stealResist: [%確率]>
特徴を有するメモ欄に盗みの抵抗率を設定します。
<stealResist: 50> 盗まれる確率が50%低下します。

盗んだ回数等を参照できるように以下の変数及び関数を用意しています。
アイテムを盗んだ回数。
$gameSystem._stealCount
$gameSystem.getBattleSteal()
お金を盗んだ合計金額。
$gameSystem._stealGoldSum
$gameSystem.getBattleStealGold()
アイテムを盗まれた回数。
$gameSystem._stolenCount
$gameSystem.getBattleStolen()
お金を盗まれた合計金額。
$gameSystem._stolenGoldSum
$gameSystem.getBattleStolenGold()

盗み時の確率計算
スキル、アイテムの成功確率 * (成功率補正% + 成功率補正+)
成功率補正%と成功率補正+を補正した確率でステータス画面に表示させる場合、スキル、アイテムの成功確率によっては
計算上と表示上の確率とは異なる確率になります。

利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2025/4/25 Ver 1.5.3
モンスター図鑑で盗みアイテム表示時のエラーを修正。
2025/2/2 Ver 1.5.2
ポップアップの処理の修正。
2024/9/7 Ver 1.5.1
盗める回数を指定できる機能を追加。
メンバーの所持金がない場合のメッセージを表示できるように修正。
盗んだ金額がメンバーの所持金以上の金額で表示されてしまう問題を修正。
2024/9/1 Ver 1.5.0
敵の盗み率にブーストさせる効果を追加。
盗み確立に運を適用できるように修正。
2024/5/11 Ver 1.4.2
味方同士に対して盗みを実行しないように修正。
位相を修正。
2022/7/2 Ver 1.4.1
リザルトに盗んだアイテムを表示するための処理を追加。
2022/6/14 Ver 1.4.0
ポップアップに対応。(要NUUN_popUp)
使用していなかったプラグインパラメータを削除。
2022/1/25 Ver 1.3.2
確率、抵抗率の処理を修正。
2021/11/13 Ver 1.3.1
条件付きに対応。
2021/10/24 Ver 1.3.0
メッセージのフォーマットを変更。
同じアイテムを何度でも盗める機能を追加。
全盗めるアイテムから抽選して盗む機能を追加。
2021/6/18 Ver 1.2.0
ブーストの計算が正常に行えていなかった問題を修正。
アイテム、お金を持っていない場合のメッセージを表示する機能を追加。
盗み成功時にSEを鳴らす機能を追加。
2021/2/20 Ver 1.1.1
盗み成功率の割合増減が正常に取得できていなかった問題を修正。
2021/2/5 Ver 1.1.0
盗みの抵抗実装。
2021/1/24 Ver 1.0.1
アイテムを盗んだ回数などのパラメータが正常に取得できない問題を修正。
2020/11/21 Ver 1.0.0
初版

@param StealMode
@text お金の盗みモード
@desc 盗み取ったお金は再取得しない。
@type boolean
@default true

@param StealCount
@text 盗めるアイテム回数
@desc 1アイテムの盗める回数。0で無制限
@type number
@default 1

@param StealProcess
@text 盗むときの処理
@desc 盗み処理を指定します。
@type select
@option 最初に一致したアイテム
@value 0
@option 全ての盗めるアイテム、お金から抽選
@value 1
@default 0

@param NotStealName
@text 盗めなかった時のメッセージ
@desc 敵からアイテムを盗めなかった時のメッセージ。%1使用者　%2対象
@default %2から何も盗めなかった！

@param NonStealName
@text 盗めるアイテムがない時のメッセージ
@desc 盗めるアイテムがなかった時のメッセージ。%1使用者　%2対象
@default %2は何も持っていない！

@param NonStealGoldName
@text 盗めるお金がない時のメッセージ
@desc 盗めるお金がなかった時のメッセージ。%1使用者　%2対象
@default %2は何も持っていない！

@param GetStealName
@text 敵からアイテムを盗めた時のメッセージ
@desc 敵からアイテムを盗めた時のメッセージ。%1使用者　%2対象　%3盗んだアイテムまたは金額
@default %2から%3を盗んだ！

@param StolenName
@text 敵からアイテムを盗まれた時のメッセージ
@desc 敵からアイテムを盗まれた時のメッセージ。%1使用者　%2対象　%3盗んだアイテムまたは金額
@default %2から%3を盗み取った！

@param StolenItemDrop
@text 盗まれたアイテムの回収
@desc 敵から盗まれたアイテムを撃破後、ドロップするか。
@type boolean
@default false

@param StolenGoldDrop
@text 盗まれたお金の回収
@desc 敵から盗まれたお金を撃破後、ドロップするか。
@type boolean
@default false

@param stolenItems
@text 敵から奪われるアイテム設定
@desc 敵から奪われるアイテムの設定です。
@default []
@type struct<stolenItems>[]

@param SuccessSE
@text アイテム盗みSE設定
@default ------------------------------

@param StealSuccessSE
@text 盗み成功時SE
@desc 盗み成功時のSE
@type file
@dir audio/se/
@parent SuccessSE

@param volume
@text 音量
@desc 音量。
@type number
@default 90
@parent SuccessSE

@param pitch
@text ピッチ
@desc ピッチ。
@type number
@default 100
@parent SuccessSE

@param pan
@text 位相
@desc 位相。
@type number
@default 0
@max 100
@min -100
@parent SuccessSE

@param GoldSuccessSE
@text お金盗み成功時のSE設定
@default ------------------------------

@param StealGoldSuccessSE
@text お金盗み成功時SE
@desc お金盗み成功時のSE
@type file
@dir audio/se/
@parent GoldSuccessSE

@param G_volume
@text 音量
@desc 音量。
@type number
@default 90
@parent GoldSuccessSE

@param G_pitch
@text ピッチ
@desc ピッチ。
@type number
@default 100
@parent GoldSuccessSE

@param G_pan
@text 位相
@desc 位相。
@type number
@default 0
@max 100
@min -100
@parent GoldSuccessSE
*/

var Imported = Imported || {};
Imported.NUUN_StealableItems = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    let _stealText = [];

    function stealMode(type) {
        switch (type) {
            case 'notSteal':
                return params.NotStealName || '%2から何も盗めなかった！';
            case 'nonSteal':
                return params.NonStealName || '%2は何も持っていない！';
            case 'nonStealGold':
                return params.NonStealGoldName || '%2は何も持っていない！';
            case 'getSteal':
                return params.GetStealName || '%2から%3を盗んだ！';
            case 'getGold':
            return params.GetStealName || '%2から%3を盗んだ！';
            case 'stolenName':
                return params.StolenName || '%2から%3を盗み取った！';
            case 'stolenGold':
                return params.StolenName || '%2から%3を盗み取った！';
        }
    };

    function _getStealVariance(count, variance) {
        const amp = Math.floor(Math.max((Math.abs(count) * variance) / 100, 0));
        const v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;
        return Math.max((count >= 0 ? count + v : count - v), 0);
    };

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize .call(this);
        this._stealCount = 0;
        this._stealGoldSum = 0;
        this._stolenCount = 0;
        this._stolenGoldSum = 0;
    };

    Game_System.prototype.onBattleSteal = function() {
        this._stealCount = this._stealCount || 0
        this._stealCount++;
    };

    Game_System.prototype.getBattleSteal = function() {
        return this._stealCount || 0;
    };

    Game_System.prototype.onBattleStealGold = function(gold) {
        this._stealGoldSum = this._stealGoldSum || 0;
        this._stealGoldSum++;
    };

    Game_System.prototype.getBattleStealGold = function() {
        return this._stealGoldSum || 0;
    };

    Game_System.prototype.onBattleStolen = function() {
        this._stolenCount = this._stolenCount || 0;
        this._stolenCount++;
    };

    Game_System.prototype.getBattleStolen = function() {
        return this._stolenCount || 0;
    };

    Game_System.prototype.onBattleStolenGold = function(gold) {
        this._stolenGoldSum = this._stolenGoldSum || 0;
        this._stolenGoldSum += gold;
    };

    Game_System.prototype.getBattleStolenGold = function() {
        return this._stolenGoldSum || 0;
    };

    Game_System.prototype.stolenSwitch = function(item){
        return (item.stolenSwitch > 0 ? $gameSwitches.value(item.stolenSwitch) : true);
    };

    const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        this.applySteal(target);
        _Game_Action_applyItemUserEffect.apply(this, arguments);
    };

    Game_Action.prototype.applySteal = function(target) {
        if (target.result().isHit()) {
            if (target.isEnemy() && !this.subject().isEnemy()) {
                if (this.item().meta.stealSkill){
                    this.stealItems(target);
                }
                if (this.item().meta.goldStealSkill){
                    this.stealGold(target);
                }
            } else if (target.isActor() && !this.subject().isActor()) {
                if (this.item().meta.stealSkill){
                    this.stolenItem(target);
                }
                if (this.item().meta.goldStealSkill || this.item().meta.goldStealSkillRate){
                    this.stolenGold(target);
                }
            }
        }
    };

    Game_Action.prototype.stealItems = function(target){
        const stealItem = this.makeStealItems(target);
        if (stealItem) {
            this.getStealItems(target, stealItem);
        } else {
            if (!target.isStealItems()) {
                this.subject().result().pushSteal(null, 'nonSteal');
            } else {
                this.subject().result().pushSteal(null, 'notSteal');
            }
        }
        this.makeSuccess(target);
    };

    Game_Action.prototype.stealGold = function(target){
        const stealItem = this.makeStealGold(target);
        if (stealItem) {
            this.getStealGold(target, stealItem);
        } else {
            if (!target.isStealGold()) {
                this.subject().result().pushGoldSteal(null, 'nonStealGold');
            } else {
                this.subject().result().pushGoldSteal(null, 'notSteal');
            }
        }
        this.makeSuccess(target);
    };

    Game_Action.prototype.stolenItem = function(target){
        const item = this.getStolenItem(target);
        this.subject().keepStolenItem(item);
        if (item) {
            this.lostStolenItem(target, item);
        } else {
            this.subject().result().pushSteal(null, 'notSteal');
        }
        this.makeSuccess(target);
    };

    Game_Action.prototype.stolenGold = function(target){
        const gold = this.getLostStolenGold(target);
        this.subject().keepStolenGold(gold);
        if ($gameParty._gold <= 0) {
            this.subject().result().pushGoldSteal(null, 'nonStealGold');
        } else if (gold) {
            this.lostStolenGold(target, gold);
        } else {
            this.subject().result().pushGoldSteal(null, 'notSteal');
        }
        this.makeSuccess(target);
    };

    Game_Action.prototype.getStolenItem = function(target){
        params.stolenItems = params.stolenItems || [];
        let weightSum = 0;
        let getItem = null;
        if (this.getStolenRate(target) && params.stolenItems) {
            let stolenItemList = params.stolenItems.reduce(function(r, item) {
                if($gameParty._items[item.stolenItemId] > 0 && $gameSystem.stolenSwitch(item)) {
                    weightSum += item.weight;
                    r.push(item)
                }
                return r;
            },[]);
            const value = Math.random() * weightSum;
            const stolenLength = stolenItemList.length;
            let probability = 0.0;
            let i = 0;
            if (stolenLength > 0){
                while(stolenLength > i){
                    probability += stolenItemList[i].weight / weightSum * weightSum;
                    if(probability > value){
                        getItem = $dataItems[stolenItemList[i].stolenItemId];
                        $gameSystem.onBattleStolen();
                        break;
                    }
                    i++;
                }
            }
            return getItem;
        }
    };

    Game_Action.prototype.getLostStolenGold = function(target){
        const stolenGold = this.lostStolenGoldMode();
        let gold = 0;
        if (this.getStolenGoldRate(target, stolenGold[0])) {
            if(stolenGold[2] === 1){
                gold = Math.floor($gameParty._gold * Math.min(stolenGold[1], 100 / 100));
            } else {
                gold = Math.min(stolenGold[1], $gameParty._gold);
            }
            $gameSystem.onBattleStolenGold(gold);
        }
        return gold;
    };

    Game_Action.prototype.getStealItems = function(target, item){
        $gameParty.gainItem(item, 1);
        if(params.StealSuccessSE) {
            AudioManager.playSe({"name":params.StealSuccessSE,"volume":params.volume,"pitch":params.pitch,"pan":params.pan});
        }
        this.subject().result().pushSteal(item, 'getSteal');
    };

    Game_Action.prototype.getStealGold = function(target, gold){
        $gameParty.gainGold(gold);
        const itemName = gold + TextManager.currencyUnit;
        if(params.StealGoldSuccessSE) {
            AudioManager.playSe({"name":params.StealGoldSuccessSE,"volume":params.G_volume,"pitch":params.G_pitch,"pan":params.G_pan});
        }
        this.subject().result().pushGoldSteal(itemName, 'getGold');
    };

    Game_Action.prototype.lostStolenItem = function(target, item){
        $gameParty.loseItem(item, 1)
        if(params.StealSuccessSE) {
            AudioManager.playSe({"name":params.StealSuccessSE,"volume":params.volume,"pitch":params.pitch,"pan":params.pan});
        }
        this.subject().result().pushSteal(item, 'stolenName');
    };

    Game_Action.prototype.lostStolenGold = function(target, gold){
        $gameParty.loseGold(gold);
        const itemName = gold + TextManager.currencyUnit;
        if(params.StealGoldSuccessSE) {
            AudioManager.playSe({"name":params.StealGoldSuccessSE,"volume":params.G_volume,"pitch":params.G_pitch,"pan":params.G_pan});
        }
        this.subject().result().pushGoldSteal(itemName, 'stolenGold');
    };

    Game_Action.prototype.makeStealItems = function(target){
        $gameSystem._stealIndex = 0;
        if (params.StealProcess === 0) {
            return this.farstItemSteal(target);
        } else {
            return this.allItemsSteal(target);
        }
    };

    Game_Action.prototype.makeStealGold = function(target){
        $gameSystem._stealIndex = 0;
        if (params.StealProcess === 0) {
            return this.farstGoldSteal(target);
        } else {
            return this.allGoldSteal(target);
        }
    };

    Game_Action.prototype.farstItemSteal = function(target){
        const list = target.getStealList();
        const stealId = 0;
        const index = list.findIndex(di => di && di.kind > 0 && di.kind < 4 && target.stealConditions(di) && this.getStealRate(target, di));
        if (index >= 0) {
            const di = list[index];
            if (di) {
                const r = this.stealObject(di.kind, di.dataId);
                if (di.count > 0) {
                    list[index].count--;
                    if (di.count === 0) {
                        list[index] = {dataId: 1, denominator: 1, kind: 0};
                    }
                }
                $gameSystem._stealIndex = index;
                $gameSystem.onBattleSteal();
                $gameTroop.stealItems.push(r);
                return r;
            }
        }
    };

    Game_Action.prototype.allItemsSteal = function(target){
        const list = target.getStealList();
        const stealId = target.stealRandomId();
        const index = list.findIndex(data => stealId === data.id);
        if (index >= 0) {
            const di = list[index];
            if (di && di.kind > 0 && di.kind < 4 && target.stealConditions(di) && this.getStealRate(target, di)) {
                const r = this.stealObject(di.kind, di.dataId);
                if (di.count > 0) {
                    list[index].count--;
                    if (di.count === 0) {
                        list[index] = {dataId: 1, denominator: 1, kind: 0};
                    }
                }
                $gameSystem._stealIndex = index;
                $gameSystem.onBattleSteal();
                $gameTroop.stealItems.push(r);
                return r;
            }
        }
    };

    Game_Action.prototype.farstGoldSteal = function(target){
        const list = target.getStealList();
        const stealId = 0;
        const index = list.findIndex(di => di && di.kind === 4 && target.stealConditions(di) && this.stealGoldRate(target, di));
        if (index >= 0) {
            const di = list[index];
            if (di) {
                let r = this.stealObject(di.kind, di.dataId);
                const data = this.item().meta.goldStealSkill.split(',').map(Number);
                if (data[1] > 0) {
                    const value = _getStealVariance(data[1], data[2]);
                    r = Math.min(r, value);
                    di.dataId -= r;
                    if (di.dataId <= 0) {
                        list[index] = {dataId: 0, denominator: 1, kind: 0};
                    }
                } else if (params.StealMode) {
                    list[index] = {dataId: 0, denominator: 1, kind: 0};
                }
                $gameSystem.onBattleStealGold();
                $gameTroop.stealItems.push({money:r});
                return r;
            }
        }
    };

    Game_Action.prototype.allGoldSteal = function(target){
        const list = target.getStealList();
        const stealId = target.stealGoldRandomId();
        const index = list.findIndex(data => stealId === data.id);
        if (index >= 0) {
            const di = list[index];
            if (di && di.kind === 4 && target.stealConditions(di) && this.getGoldRate(target, di)) {
                const r = this.stealObject(di.kind, di.dataId);
                if (data[1] > 0) {
                    const value = _getStealVariance(data[1], data[2]);
                    r = Math.min(r, value);
                    di.dataId -= r;
                    if (di.dataId <= 0) {
                        list[index] = {dataId: 0, denominator: 1, kind: 0};
                    }
                } else if (params.StealMode) {
                    list[index] = {dataId: 0, denominator: 1, kind: 0};
                }
                $gameSystem.onBattleStealGold();
                $gameTroop.stealItems.push({money:r});
                return r;
            }
        }
    };

    Game_Action.prototype.getStealRate = function(target, di){
        const skillRate = ((Number(this.item().meta.stealSkill) || 100)) / 100;
        const luk = this.lukEffectRate(target);
        const subject = this.subject();
        return Math.random() < skillRate * subject.getStealBoostRate() * luk * (di.denominator * target.stealItemResistRate());
    };

    Game_Action.prototype.getStolenRate = function(target) {
        const skillRate = ((Number(this.item().meta.stealSkill) || 100)) / 100;
        const luk = this.lukEffectRate(target);
        const subject = this.subject();
        return Math.random() < skillRate * subject.getStealBoostRate() * luk * target.stealItemResistRate();
    };

    Game_Action.prototype.stealGoldRate = function(target) {
        const data = this.item().meta.goldStealSkill.split(',').map(Number);
        const skillRate = (data[0] || 100) / 100;
        const luk = this.lukEffectRate(target);
        const subject = this.subject();
        return Math.random() < skillRate * subject.getStealBoostRate() * luk * target.stealItemResistRate();
    };

    Game_Action.prototype.getStolenGoldRate = function(target, rate) {
        const skillRate = rate / 100;
        const luk = this.lukEffectRate(target);
        const subject = this.subject();
        return Math.random() < skillRate * subject.getStealBoostRate() * luk * target.stealItemResistRate(); 
    };

    Game_Action.prototype.lostStolenGoldMode = function(){
        const mode = this.item().meta.goldStealSkillRate;
        let stolenGold = [];
        if (mode){
            stolenGold = this.item().meta.goldStealSkillRate.split(',').map(Number);
            stolenGold[2] = 1;
        } else {
            stolenGold = this.item().meta.goldStealSkill.split(',').map(Number);
            stolenGold[2] = 0;
        }
        return stolenGold;
    };

    Game_Action.prototype.stealObject = function(kind, dataId) {
        if (kind === 1) {
            return $dataItems[dataId];
        } else if (kind === 2) {
            return $dataWeapons[dataId];
        } else if (kind === 3) {
            return $dataArmors[dataId];
        } else if (kind === 4) {
            return dataId;
        } else {
            return null;
        }
    };

    Game_Enemy.prototype.stealObject = function(kind, dataId) {//モンスター図鑑
        if (kind === 1) {
            return $dataItems[dataId];
        } else if (kind === 2) {
            return $dataWeapons[dataId];
        } else if (kind === 3) {
            return $dataArmors[dataId];
        } else if (kind === 4) {
            return dataId;
            } else {
            return null;
        }
    };

    Game_BattlerBase.prototype.getStealRate = function() {
        const subject = this.subject();
        return subject.getStealBoostRate() * 100;
    };

    Game_BattlerBase.prototype.stealItemResistRate = function() {
        return this.traitObjects().reduce((r, trait) => {
            return r * (trait.meta.stealResist ? Number(trait.meta.stealResist) / 100 : 1.0);
        }, 1.0);
    };

    Game_BattlerBase.prototype.getStealBoostRate = function() {
        return this.stealPercentBoost() + this.stealBoost();
    };

    Game_BattlerBase.prototype.stealBoost = function(){
        return this.traitObjects().reduce((r, trait) => {
            return r + (trait.meta.steal_sr ? Number(trait.meta.steal_sr) / 100 : 0);
        }, 0.0);
    };

    Game_BattlerBase.prototype.stealPercentBoost = function(){
        return this.traitObjects().reduce((r, trait) => {
            return r * (trait.meta.steal_sr_Percent ? Number(trait.meta.steal_sr_Percent) / 100 : 1.0);
        }, 1.0);
    };

    Game_BattlerBase.prototype.stealItemRate = function() {
        return this.traitObjects().reduce((r, trait) => {
            return r * (trait.meta.stealResist ? Number(trait.meta.stealResist) / 100 : 1.0);
        }, 1.0);
    };

    const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
    Game_Enemy.prototype.initMembers = function() {
        _Game_Enemy_initMembers.call(this);
        this._stealItems = [];
        this._keepStolenItem = [];
        this._keepStolenGold = 0;
    };

    const _Game_Enemy_gold = Game_Enemy.prototype.gold;
    Game_Enemy.prototype.gold = function() {
        return _Game_Enemy_gold.call(this) + this._keepStolenGold;
    };

    const _Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
    Game_Enemy.prototype.makeDropItems = function() {
        let dropItems = _Game_Enemy_makeDropItems.call(this);
        if(this._keepStolenItem.length > 0){
        this._keepStolenItem.forEach(di => {
                dropItems.push(this.itemObject(di.kind, di.dataId));
            });
        }
        return dropItems;
    };

    const _Game_Enemy_setup = Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup = function(enemyId, x, y) {
        _Game_Enemy_setup.call(this,enemyId, x, y);
        this.stealSetup();
    };

    Game_Enemy.prototype.stealSetup = function() {
        //const re =/<(?:steal)\s*([IWAM]):\s*(\d+(?:\s*,\s*\d+)*)>/g;
        const re =/<(?:steal)\s*([IWAM]):\s*(.*)>/g;
        while(true) {
            let match = re.exec(this.enemy().note);
            if (match) {
                let data = match[2].split(',');
                switch (match[1]) {
                    case 'I':
                        this._stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]) / 100, kind:1, cond: data[2], mode: parseInt(data[3]), count: this.getStealData(1, parseInt(data[0]))});
                        break;
                    case 'W':
                        this._stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]) / 100, kind:2, cond: data[2], mode: parseInt(data[3]), count: this.getStealData(2, parseInt(data[0]))});
                        break;
                    case 'A':
                        this._stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]) / 100, kind:3, cond: data[2], mode: parseInt(data[3]), count: this.getStealData(3, parseInt(data[0]))});
                        break;
                    case 'M':
                        this._stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]) / 100, kind:4, cond: data[2], mode: parseInt(data[3]), count: 0});
                        break;
                }
            } else {
                return;
            }
        }
    };

    Game_Enemy.prototype.getStealData = function(kind, dataId) {
        const data = this.stealCountTag(kind, dataId);
        if (!data) return params.StealCount || 1;
        const splitData = data.split(',').map(Number);
        return _getStealVariance(splitData[0], splitData[1])
    };

    Game_Enemy.prototype.stealCountTag = function(kind, dataId) {
        if (kind === 1) {
            return this.enemy().meta["Steal_I_" + dataId];
        } else if (kind === 2) {
            return this.enemy().meta["Steal_W_" + dataId];
        } else if (kind === 3) {
            return this.enemy().meta["Steal_A_" + dataId];
        } else if (kind === 4) {
            return null;
        } else {
            return null;
        }
    };

    Game_Enemy.prototype.stealRandomId = function() {
        let i = 0;
        this._stealItems.forEach(di => {
            if (di.kind > 0 && di.kind < 4) {
                di.id = i;
                i++;
            }
        });
        return Math.randomInt(i);
    };

    Game_Enemy.prototype.stealGoldRandomId = function() {
        let i = 0;
        this._stealItems.forEach(di => {
            if (di.kind === 4) {
                di.id = i;
                i++;
            }
        });
        return Math.randomInt(i);
    };

    Game_Enemy.prototype.getStealList = function() {
        return this._stealItems;
    };

    Game_Enemy.prototype.isStealItems = function() {
        return this._stealItems.length > 0 && this._stealItems.some(item => item.kind > 0 && item.kind <= 3);
    };

    Game_Enemy.prototype.isStealGold = function() {
        return this._stealItems.length > 0 && this._stealItems.some(item => item.kind === 4);
    };

    Game_Enemy.prototype.keepStolenItem = function(item) {
        if (params.StolenItemDrop && item){
            this._keepStolenItem.push({dataId: item.id, denominator: 1.0, kind: 1});
        }
    };

    Game_Enemy.prototype.keepStolenGold = function(gold) {
        if (params.StolenGoldDrop && gold > 0){
            this._keepStolenGold += gold;
        }
    };

    Game_Enemy.prototype.stealConditions = function(di){
        if (Imported.NUUN_ConditionsBase && di.cond) {
            const action = $gameTemp.getActionData();
            const condTag = 'Steal' + String(di.cond).trim();
            const mode = di.mode || 0;
            return action.subject.getTriggerConditions(this.enemy(), this, condTag, 'Target' + condTag, 'Party' + condTag, 'Troop' + condTag, action.action, action.damage, mode);
        } else {
            return true;
        }
    };

    const _Game_Troop_clear = Game_Troop.prototype.clear
    Game_Troop.prototype.clear = function() {
        _Game_Troop_clear.call(this);
        this.stealItems = [];
    };

    Game_Troop.prototype.getStealItems = function() {
        return this.stealItems;
    };

    const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function() {
        _Game_ActionResult_clear.call(this);
        this.stealResult = [];
    };

    Game_ActionResult.prototype.pushSteal = function(item, type) {
        const result = {};
        if (item) {
            result.name = item.name;
            result.id = item.id;
            result.iconIndex = item.iconIndex;
            if (Imported.NUUN_popUp) {
                result.popupText = this.stealPopupText(type);//ポップアッププラグイン
            }
        } else {
            result.name = null;
            result.id = 0;
            result.iconIndex = 0;
        }
        result.text = stealMode(type);
        result.type = type;
        this.stealResult.push(result);
    };

    Game_ActionResult.prototype.pushGoldSteal = function(gold, type) {
        const result = {};
        if (gold) {
            result.name = gold;
            result.iconIndex = 0;
            if (Imported.NUUN_popUp) {
                result.popupText = this.stealPopupText(type);//ポップアッププラグイン
            }
        } else {
            result.name = gold;
            result.iconIndex = 0;
        }
        result.id = 0;
        result.text = stealMode(type);
        result.type = type;
        this.stealResult.push(result);
    };

    const _Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
    Window_BattleLog.prototype.displayActionResults = function(subject, target) {
        if (target.result().used) {
            this.setDisplaySteal(subject, target);
        }
        _Window_BattleLog_displayActionResults.apply(this, arguments);
    };

    Window_BattleLog.prototype.setDisplaySteal = function(subject, target) {
        const result = subject.result();
        _stealText = [];
        result.stealResult.forEach(steal => {console.log(steal)
            _stealText.push(steal.text.format(subject.name(), target.name(), steal.name));
            if ((Imported.NUUN_popUp || Imported.NUUN_PopupEx) && steal.name) {
                this.stealPopup(target, steal);
            }
        })
    };

    const _Window_BattleLog_displayFailure = Window_BattleLog.prototype.displayFailure;
    Window_BattleLog.prototype.displayFailure = function(target) {
        _Window_BattleLog_displayFailure.apply(this, arguments);
        if (target.result().used) {
            this.displaySteal(target);
        }
    };

    Window_BattleLog.prototype.displaySteal = function(target) {
        _stealText.forEach(text => {
            this.push("addText", text);
            this.push("pushBaseLine");
        });
    };

})();
