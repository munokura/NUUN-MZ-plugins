/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyParamNoLimit.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Exceed the enemy character's status limit
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

In the database, there is a limit on each enemy character's stat setting,
and you cannot enter a value beyond that limit.
This plugin allows you to set each enemy character's stat beyond the limit.

Enter the following in the enemy character's memo field.
<EnemyHP:1000000> HP 1000000 (default limit 999999)
<EnemyMP:1000000> MP 1000000 (default limit 9999)
<EnemyAtk:2000> Attack Power 2000 (default limit 999)
<EnemyDef:2000> Defense Power 2000 (default limit 999)
<EnemyMat:2000> Magic Power 2000 (default limit 999)
<EnemyMdf:2000> Magic Defense 2000 (default limit 999)
<EnemyAgi:2000> Agility 2000 (default limit 999)
<EnemyLuk:2000> Luck 2000 (default limit 999)
<EnemyExp:10000000> 10,000,000 Experience Points (default limit: 9,999,999)
<EnemyGold:10,000,000> 10,000,000 Money (default limit: 9,999,999)

This plugin requires "NUUN_Base."

Terms of Use
This plugin is distributed under the MIT License.

Update History
2020/11 Version 1.0.0
First Edition
*/

/*:ja
@target MZ
@plugindesc 敵キャラのスタータス上限突破
@base NUUN_Base
@orderAfter NUUN_Base
@author NUUN
@version 1.0.0
           
@help
データベース上では敵キャラの各ステータス設定には上限がかけられていて、
上限を超えて数値を入力できません。
このプラグインは、敵キャラの各ステータスの上限を超えて設定することが出来ます。

敵キャラのメモ欄に以下を記入します。
<EnemyHP:1000000> HP1000000（デフォルト上限999999）
<EnemyMP:1000000> MP1000000（デフォルト上限9999）
<EnemyAtk:2000> 攻撃力2000（デフォルト上限999）
<EnemyDef:2000> 防御力2000（デフォルト上限999）
<EnemyMat:2000> 魔法力2000（デフォルト上限999）
<EnemyMdf:2000> 魔法防御2000（デフォルト上限999）
<EnemyAgi:2000> 敏捷性2000（デフォルト上限999）
<EnemyLuk:2000> 運2000（デフォルト上限999）
<EnemyExp:10000000> 経験値10000000（デフォルト上限9999999）
<EnemyGold:10000000> お金10000000（デフォルト上限9999999）

このプラグインは「NUUN_Base」が必要です。

利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2020/11 Ver 1.0.0
初版
*/

var Imported = Imported || {};
Imported.NUUN_EnemyParamNoLimit = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_EnemyParamNoLimit');

  const _DataManager_nuun_loadDataEnemies = DataManager.nuun_loadDataEnemies;
  DataManager.nuun_loadDataEnemies = function(deta){
    _DataManager_nuun_loadDataEnemies.call(this, deta);
    this.limitMaxparam(deta);
  };

  DataManager.limitMaxparam = function(deta){
    if (deta.meta.EnemyHP){
      deta.params[0] = Number(deta.meta.EnemyHP);
    }
    if (deta.meta.EnemyMP) {
      deta.params[1] = Number(deta.meta.EnemyMP);
    }
    if (deta.meta.EnemyAtk) {
      deta.params[2] = Number(deta.meta.EnemyAtk);
    }
    if (deta.meta.EnemyDef) {
      deta.params[3] = Number(deta.meta.EnemyDef);
    }
    if (deta.meta.EnemyMat) {
      deta.params[4] = Number(deta.meta.EnemyMat);
    }
    if (deta.meta.EnemyMdf) {
      deta.params[5] = Number(deta.meta.EnemyMdf);
    }
    if (deta.meta.EnemyAgi) {
      deta.params[6] = Number(deta.meta.EnemyAgi);
    }
    if (deta.meta.EnemyLuk) {
      deta.params[7] = Number(deta.meta.EnemyLuk);
    }
    if (deta.meta.EnemyExp) {
      deta.exp = Number(deta.meta.EnemyExp);
    }
    if (deta.meta.EnemyGold) {
      deta.gold = Number(deta.meta.EnemyGold);
    }
  };
})();