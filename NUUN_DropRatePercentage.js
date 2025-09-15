/*:-----------------------------------------------------------------------------------
 * NUUN_DropRatePercentage.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Drop Rate Percentage
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

Sets the item drop rate as a percentage.
Set the drop rate in the enemy database between 1 and 1000.

The units digit in the drop rate setting becomes the first decimal place.
A setting of 600 indicates a 60% drop rate.
A setting of 255 indicates a 25.5% drop rate.
When the item acquisition rate is doubled, the drop rate will be double the
set value.

Terms of Use
This plugin is distributed under the MIT License.

Update History
January 29, 2022 Ver. 1.0.1
Dropped item acquisition is now handled by a separate plugin.
August 13, 2021 Ver. 1.0.0
First version
*/

/*:ja
@target MZ
@plugindesc ドロップ率百分率化
@author NUUN
@version 1.0.1
@base NUUN_DropItemRateBase
@orderAfter NUUN_DropItemRateBase

@help
アイテムのドロップ率を百分率にします。
敵のデータベースのドロップアイテムの出現率に1～1000の間で設定してください。

ドロップ率設定の一の位が小数点第一位になります。
600と設定した場合は60%の確率でドロップします。
255と設定した場合は25.5%の確率でドロップします。
アイテム入手率２倍時の時はドロップ率が設定した数値の２倍の値になります。

利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2022/1/29 Ver.1.0.1
ドロップアイテム取得の処理を別プラグインで処理化。
2021/8/13 Ver.1.0.0
初版
*/

var Imported = Imported || {};
Imported.NUUN_DropRatePercentage = true;

(() => {
const parameters = PluginManager.parameters('NUUN_DropRatePercentage');

Game_Enemy.prototype.randomValue = function(di, rate, i) {
    return Math.random() * 1000;
};

Game_Enemy.prototype.rateValue = function(di, rate, i) {
    return di.denominator * rate;
};

Game_Enemy.prototype.getDropItemsRatePercentage = function(di) {
    return di.denominator / 10;
};

})();