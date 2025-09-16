/*:-----------------------------------------------------------------------------------
 * NUUN_BuffMaxLevel.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Changed the upper limit of stacking buffs and debuffs
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

Changes the maximum stacking limit for buffs and debuffs.
You can also change the starting index number of the icons displayed.

Icon Settings
The icon index for buffs and debuffs is calculated as the specified starting
index + buff (debuff) level * 8 per level.

By default, the starting index for buffs is 32, for strengthened buffs it is
40, for debuffs it is 48, and for strengthened debuffs it is 56.
To set icons with three or more levels, set them in consecutive order,
starting with strengthened debuffs: HP, MP, Attack Power, Defense Power, Magic
Power, Magic Defense, Agility, and Luck.

Note that skipped numbers are not allowed due to conflicts with other plugins,
so be sure to arrange the icons consecutively from the first level to the
maximum.

Update History
March 8, 2023 Ver. 1.0.1
Fixed a spelling error in a plugin parameter.
February 11, 2022 Ver. 1.0.0
First version

@param BuffIconIndex
@text Buff Start Index
@desc Buff start icon index ID
@type number
@default 32

@param DebuffIconIndex
@text Debuff Start Index
@desc Debuff start icon index ID
@type number
@default 48

@param HPBuffMaxLevel
@text HP buff maximum level
@desc Maximum HP buff stacking level
@type number
@default 2
@min 1

@param HPDebuffMaxLevel
@text HP debuff maximum level
@desc Maximum HP debuff stacking level
@type number
@default 2
@min 1

@param MPBuffMaxLevel
@text MP buff maximum level
@desc Maximum MP buff stacking level
@type number
@default 2
@min 1

@param MPDebuffMaxLevel
@text MP debuff maximum level
@desc Maximum MP debuff stacking level
@type number
@default 2
@min 1

@param AtkBuffMaxLevel
@text Attack power buff maximum level
@desc Maximum stacking level for attack power buff
@type number
@default 2
@min 1

@param AtkDebuffMaxLevel
@text Attack power debuff maximum level
@desc Maximum level of stacking when attack power debuffing
@type number
@default 2
@min 1

@param DefBuffMaxLevel
@text Defense buff maximum level
@desc Maximum defense buff stacking level
@type number
@default 2
@min 1

@param DefDebuffMaxLevel
@text Defense debuff maximum level
@desc Maximum defense debuff stack level
@type number
@default 2
@min 1

@param MatBuffMaxLevel
@text Maximum magic buff level
@desc Maximum stacking level for magic attack buff
@type number
@default 2
@min 1

@param MatDebuffMaxLevel
@text Maximum magic debuff level
@desc Maximum level of magic debuff stacking
@type number
@default 2
@min 1

@param MdfBuffMaxLevel
@text Magic Defense Buff Max Level
@desc Maximum level of magic defense buff stacking
@type number
@default 2
@min 1

@param MdfDebuffMaxLevel
@text Magic Defense Debuff Max Level
@desc Maximum stack level for magic defense debuff
@type number
@default 2
@min 1

@param AgiBuffMaxLevel
@text Agility buff max level
@desc Maximum level of agility buff stacking
@type number
@default 2
@min 1

@param AgiDebuffMaxLevel
@text Agility debuff max level
@desc Maximum level of Agility debuff stacking
@type number
@default 2
@min 1

@param LukBuffMaxLevel
@text Luck buff maximum level
@desc Maximum stacking level for luck buffs
@type number
@default 2
@min 1

@param LukDebuffMaxLevel
@text Luck debuff maximum level
@desc Maximum stacking level for luck debuffs
@type number
@default 2
@min 1
*/

/*:ja
@target MZ
@plugindesc バフ、デバフ重ね掛け上限変更
@author NUUN
@version 1.0.1

@help
バフ、デバフの重ね掛けの上限値を変更します。
また表示するアイコンの開始インデックス番号も変更できます。

アイコンの設定
バフ、デバフのアイコンインデックスは１段階につき指定した開始インデックス + バフ（デバフ）レベル * 8になっています。
デフォルトだとバフの開始インデックスが32、強化バフが40、デバフの開始インデックスが48、強化デバフが56になっています。
3段階以上のアイコンを設定するには、強化デバフから連番でHP、MP、攻撃力、防御力、魔法力、魔法防御、敏捷性、運の順で設定します。
なお、他のプラグインとの競合から飛び番での設定は出来ませんので、必ず１段階目から最大までのアイコンを連続して並べてください。

更新履歴
2023/3/8 Ver.1.0.1
プラグインパラメータのスペルが間違っていたため修正。
2022/2/11 Ver.1.0.0
初版

@param BuffIconIndex
@text バフ開始インデックス
@desc バフ開始アイコンインデックスID
@type number
@default 32

@param DebuffIconIndex
@text デバフ開始インデックス
@desc デバフ開始アイコンインデックスID
@type number
@default 48

@param HPBuffMaxLevel
@text HPバフ最大レベル
@desc HPバフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param HPDebuffMaxLevel
@text HPデバフ最大レベル
@desc HPデバフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param MPBuffMaxLevel
@text MPバフ最大レベル
@desc MPバフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param MPDebuffMaxLevel
@text MPデバフ最大レベル
@desc MPデバフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param AtkBuffMaxLevel
@text 攻撃力バフ最大レベル
@desc 攻撃力バフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param AtkDebuffMaxLevel
@text 攻撃力デバフ最大レベル
@desc 攻撃力デバフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param DefBuffMaxLevel
@text 防御力バフ最大レベル
@desc 防御力バフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param DefDebuffMaxLevel
@text 防御力デバフ最大レベル
@desc 防御力デバフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param MatBuffMaxLevel
@text 魔法力バフ最大レベル
@desc 魔法撃力バフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param MatDebuffMaxLevel
@text 魔法力デバフ最大レベル
@desc 魔法力デバフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param MdfBuffMaxLevel
@text 魔法防御バフ最大レベル
@desc 魔法防御バフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param MdfDebuffMaxLevel
@text 魔法防御デバフ最大レベル
@desc 魔法防御デバフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param AgiBuffMaxLevel
@text 敏捷性バフ最大レベル
@desc 敏捷性バフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param AgiDebuffMaxLevel
@text 敏捷性デバフ最大レベル
@desc 敏捷性デバフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param LukBuffMaxLevel
@text 運バフ最大レベル
@desc 運バフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1

@param LukDebuffMaxLevel
@text 運デバフ最大レベル
@desc 運デバフ時の重ね掛けの最大レベル
@type number
@default 2
@min 1
*/

var Imported = Imported || {};
Imported.NUUN_BuffMaxLevel = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BuffMaxLevel');
const buffParams = [];
const debuffParams = [];
const BuffIconIndex = Number(parameters['BuffIconIndex'] || 32);
const DebuffIconIndex = Number(parameters['DebuffIconIndex'] || 48);
buffParams[0] = Number(parameters['HPBuffMaxLevel'] || 2);
debuffParams[0] = Number(parameters['HPDebuffMaxLevel'] || 2);
buffParams[1] = Number(parameters['MPBuffMaxLevel'] || 2);
debuffParams[1] = Number(parameters['MPDebuffMaxLevel'] || 2);
buffParams[2] = Number(parameters['AtkBuffMaxLevel'] || 2);
debuffParams[2] = Number(parameters['AtkDebuffMaxLevel'] || 2);
buffParams[3] = Number(parameters['DefBuffMaxLevel'] || 2);
debuffParams[3] = Number(parameters['DefDebuffMaxLevel'] || 2);
buffParams[4] = Number(parameters['MatBuffMaxLevel'] || 2);
debuffParams[4] = Number(parameters['MatDebuffMaxLevel'] || 2);
buffParams[5] = Number(parameters['MdfBuffMaxLevel'] || 2);
debuffParams[5] = Number(parameters['MdfDebuffMaxLevel'] || 2);
buffParams[6] = Number(parameters['AgiBuffMaxLevel'] || 2);
debuffParams[6] = Number(parameters['AgiDebuffMaxLevel'] || 2);
buffParams[7] = Number(parameters['LukBuffMaxLevel'] || 2);
debuffParams[7] = Number(parameters['LukDebuffMaxLevel'] || 2);

Game_BattlerBase.ICON_BUFF_START = BuffIconIndex;
Game_BattlerBase.ICON_DEBUFF_START = DebuffIconIndex;


Game_BattlerBase.prototype.isMaxBuffAffected = function(paramId) {//再定義
    return this._buffs[paramId] === buffParams[paramId];
};

Game_BattlerBase.prototype.isMaxDebuffAffected = function(paramId) {//再定義
    return this._buffs[paramId] === debuffParams[paramId] * -1;
};

})();