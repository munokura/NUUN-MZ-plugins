/*:-----------------------------------------------------------------------------------
 * NUUN_DropItemMolecule.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Drop rate molecular manipulation
@author NUUN
@license MIT License

@help
English Help Translator: munokura
Please check the URL below for the latest version of the plugin.
URL https://github.com/nuun888/MZ
-----

Normally, the numerator of enemy drop rates is fixed at 1, but this plugin
allows you to change the numerator to any number.
<DropMolecule[dropId]:[molecule]> Changes the numerator.
[dropId]: Drop ID. In the database, the numbers are 1, 2, and 3 (in descending
order). If you install the Drop Item Addition Plugin, the numbers are 4 and
above.
[molecule]: Numerator (positive number).

Update History
2022/1/29 Ver. 1.0.0
First Edition
*/

/*:ja
@target MZ
@plugindesc ドロップ率分子操作
@author NUUN
@version 1.0.0
@base NUUN_DropItemRateBase
@orderAfter NUUN_DropItemRateBase

@help
通常、敵のドロップ率の分子は1固定になっていますが、このプラグインでは分子を任意の数値に変更できます。
<DropMolecule[dropId]:[molecule]> 分子を変更します。
[dropId]:ドロップID データベースだと上から順に1,2,3 ドロップアイテム追加プラグイン導入の場合は4番以降
[molecule]:分子(正数)

更新履歴
2022/1/29 Ver.1.0.0
初版
*/

var Imported = Imported || {};
Imported.NUUN_DropItemMolecule = true;

(() => {
const parameters = PluginManager.parameters('NUUN_DropItemMolecule');

Game_Enemy.prototype.rateValue = function(di, rate, i) {
    return rate * this.dropItemMolecule(i);
};

Game_Enemy.prototype.dropItemMolecule = function(i) {
    const tag = 'DropMolecule';
    const enemy = this.enemy();
    return Number(enemy.meta[tag + (i + 1)]) || 1.0;
};

})();