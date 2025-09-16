/*:-----------------------------------------------------------------------------------
 * NUUN_EXPFormula.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */

/*:
@target MZ MV
@url https://github.com/nuun888/MZ
@plugindesc Experience calculation formula change
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

The core script's experience calculation formula reduces the increase in
required experience points as the level increases,
making it easier to gain levels from the mid-game onwards.
This plugin modifies the experience calculation formula so that the increase
in required experience points is less gradual even from the mid-game onwards.
With a base value of 30, a modifier of 20, growth rate A of 30, and growth
rate B of 30, the required experience points at level 50 are 34,886 and the
total experience points are 597,700.
At level 98, the required experience points are 134,401 and the total
experience points are 4,451,685.

Terms of Use
This plugin is distributed under the MIT License.

Update History
February 21, 2021 Version 1.0.0
First Edition
*/

/*:ja
@target MZ MV
@plugindesc 経験値計算式変更
@author NUUN
@version 1.0.0

@help
コアスクリプトの経験値計算式はレベルが高くなるほど必要経験値の上がり方が緩くなるため、
中盤以降レベルが上がりやすくなってしまいます。
このプラグインでは経験値計算式の仕様を変え中盤以降でも必要経験値の上がり方を緩やかにならないように変更します。
基本値３０、補正値２０、増加度A３０、増加度B３０でレベル５０での必要経験値は34886、累計経験値は597700、
レベル９８での必要経験値は134401、累計経験値は4451685です。

利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2021/2/21 Ver 1.0.0
初版
*/

var Imported = Imported || {};
Imported.NUUN_EXPFormula = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EXPFormula');

Game_Actor.prototype.expForLevel = function(level) {
  const c = this.currentClass();
  const basis = c.expParams[0];
  const extra = c.expParams[1];
  const acc_a = c.expParams[2];
  const acc_b = c.expParams[3];
  return Math.round((level * basis * (acc_a / 100 + 1)) * (Math.pow(level - 1,2) * (acc_b / 250))) + (extra * (level - 1));
};

})();