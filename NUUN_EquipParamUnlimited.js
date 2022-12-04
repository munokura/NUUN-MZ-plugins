/*:-----------------------------------------------------------------------------------
 * NUUN_EquipParamUnlimited.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc Equipped ability value change amount upper limit breakthrough
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * On the database, you can only set the ability value change amount of equipment from 0 to 500 (maximum HP, MP is 5000), but you can set it beyond the upper limit with this plug-in.
 * 
 * Weapon and armor notes
 * <EquipParamExMHP:[param]> Set the ability value change amount of max HP.
 * <EquipParamExMMP:[param]> Set the ability value change amount of max MP.
 * <EquipParamExATK:[param]> Set the amount of change in ability value of the attack.
 * <EquipParamExDEF:[param]> Set the amount of change in ability value for defense.
 * <EquipParamExMAT:[param]> Set the ability value change amount of magic.
 * <EquipParamExMDF:[param]> Sets the ability value change amount of magic defense.
 * <EquipParamExAGI:[param]> Set the ability value change amount of agility.
 * <EquipParamExLUK:[param]> Set the amount of change in luck's ability value.
 * 
 * [param]:Amount of change (integer)
 * For [param], enter only the numerical value without [].
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/4/2022 Ver.1.0.1
 * Changed the display in languages other than Japanese to English.
 * 4/10/2022 Ver.1.0.0
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 装備能力値変化量上限突破
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * データベース上では装備の能力値変化量は0～500(最大HP、MPは5000)までしか設定できませんがこのプラグインでは上限を超えて設定する事ができます。
 * 
 * 武器、防具のメモ欄
 * <EquipParamExMHP:[param]> 最大HPの能力値変化量を設定します。
 * <EquipParamExMMP:[param]> 最大MPの能力値変化量を設定します。
 * <EquipParamExATK:[param]> 攻撃力の能力値変化量を設定します。
 * <EquipParamExDEF:[param]> 防御力の能力値変化量を設定します。
 * <EquipParamExMAT:[param]> 魔力の能力値変化量を設定します。
 * <EquipParamExMDF:[param]> 魔法防御の能力値変化量を設定します。
 * <EquipParamExAGI:[param]> 敏捷性の能力値変化量を設定します。
 * <EquipParamExLUK:[param]> 運の能力値変化量を設定します。
 * 
 * [param]:変化量(整数)
 * ※[param]は[]を付けずに数値のみ記入してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/12/4 Ver.1.0.1
 * 日本語以外での表示を英語表示に変更。
 * 2022/4/10 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EquipParamUnlimited = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EquipParamUnlimited');

const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function(paramId) {
    let value = _Game_Actor_paramPlus.call(this, paramId);
    const paramName = getParamData(paramId);
    const tagText = "EquipParamEx" + paramName;
    for (const item of this.equips()) {
        if (item && paramName) {
            value += item.meta[tagText] ? Number(item.meta[tagText]) : 0;
        }
    }
    return value;
};

function getParamData(paramId) {
    switch (paramId) {
        case 0:
            return 'MHP'
        case 1:
            return 'MMP'
        case 2:
            return 'ATK'
        case 3:
            return 'DEF'
        case 4:
            return 'MAT'
        case 5:
            return 'MDF'
        case 6:
            return 'AGI'
        case 7:
            return 'LUK'
        default:
            return null;
    }

}
})();