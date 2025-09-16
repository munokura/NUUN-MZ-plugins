/*:-----------------------------------------------------------------------------------
 * NUUN_DropItemRateBase.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Drop rate probability manipulation base
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

This is a base plugin for applying plugins that modify enemy drop rates.

Update History
January 29, 2022 Version 1.0.0
First release
*/

/*:ja
@target MZ
@plugindesc ドロップ率確率操作ベース
@author NUUN
@version 1.0.0

@help
敵のドロップ率の確率に変更を加えるプラグインを適用させるためのベースプラグインです。

更新履歴
2022/1/29 Ver.1.0.0
初版
*/

var Imported = Imported || {};
Imported.NUUN_DropItemRateBase = true;

(() => {
const parameters = PluginManager.parameters('NUUN_DropItemRateBase');

Game_Enemy.prototype.makeDropItems = function() {//再定義
    const rate = this.dropItemRate();
    return this.enemy().dropItems.reduce((r, di, i) => {
        if (di.kind > 0 && this.randomValue(di, rate, i) < this.rateValue(di, rate, i)) {
            return r.concat(this.itemObject(di.kind, di.dataId));
        } else {
            return r;
        }
    }, []);
};

Game_Enemy.prototype.randomValue = function(di, rate, i) {
    return Math.random() * di.denominator;
};

Game_Enemy.prototype.rateValue = function(di, rate, i) {
    return rate;
};

})();