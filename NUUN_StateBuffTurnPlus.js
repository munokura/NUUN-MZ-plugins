/*:-----------------------------------------------------------------------------------
 * NUUN_StateBuffTurnPlus.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc State, buff turn number increase/decrease features
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

You can set a feature to increase or decrease the number of turns for states
and buffs.

A memo field with a feature.
<StateTurn[stateId]:[turn]> Increases the number of turns for the specified
state by [Turns].
<BuffTurn[BuffId]:[turn]> Increases the number of turns for the specified buff
by [Turns].
<DebuffTurn[BuffId]:[turn]> Increases the number of turns for the specified
debuff by [Turns].
[stateId]: State ID
[BuffId]: Buff ID 0: HP 1: MP 2: Attack Power 3: Defense Power 4: Magic Power
5: Magic Defense 6: Agility 7: Luck
[turn]: ± Number of turns
<StateTurn4:2> Increases the number of turns for state 4 by 2.
<BuffTurn3:3> Increases the effect of the attack power buff by 3 turns.
<DebuffTurn5:-2> Reduces the effect of the Magic Reduction debuff by 2 turns.
If the additional turn and the turn it applies are below 0, the effect will be
applied for at least 1 turn.

<MemberTurnPlus[mode]:[id],[id]...>
When a party member possesses this trait, the effect of the state, buff, or
debuff is extended. Please be sure to include the above and the tag that
increases or decreases the effect of the state or buff.
[id]: Actor ID
0: All members
1 or more: Actor ID
1-5: Actors with actor IDs 1 through 5

<EnemyTurnPlus:[id],[id]...>
When a party member possesses this trait, the effect of the state, buff, or
debuff is extended. Please be sure to include the above and the tag that
increases or decreases the effect of the state or buff.
0: All battle enemies
1 or higher: Monster ID
3-8: Monsters with IDs 3 through 8

Update History
August 1, 2022 Ver. 1.1.1
Fixed an issue that caused an error when adding enemy states.
July 29, 2022 Ver. 1.1.0
Added a feature that increases or decreases turn counts if someone in the
party or enemy group has a trait.
January 15, 2022 Ver. 1.0.0
First release
*/

/*:ja
@target MZ
@plugindesc ステート、バフターン数増減特徴
@author NUUN
@version 1.1.1
@base NUUN_Base
@orderAfter NUUN_Base

@help
ステート、バフ付加時の効果ターンが増加、減少する特徴を設定できます。

特徴を持つメモ欄
<StateTurn[stateId]:[turn]> 指定のステートのターンが[Turn]増加します。
<BuffTurn[BuffId]:[turn]> 指定のバフのターンが[Turn]増加します。
<DebuffTurn[BuffId]:[turn]> 指定のデバフのターンが[Turn]増加します。
[stateId]:ステートID
[BuffId]:バフID 0:HP 1:MP 2:攻撃力 3:防御力 4:魔法力 5:魔法防御 6:敏捷性 7:運
[turn]:±ターン数
<StateTurn4:2> ステート４番のターンが２ターン増加します。
<BuffTurn3:3> 攻撃力上昇のバフの
効果が３ターン増加します。
<DebuffTurn5:-2> 魔法力低下のデバフの効果が２ターン減少します。
加算ターンと付与するターンのターンが0を下回った場合は最低１ターン効果が適用されます。

<MemberTurnPlus[mode]:[id],[id]...>
パーティメンバーの誰かがこの特徴を持つときに、ステート、バフ、デバフの効果が延長されます。なお必ず上記とステート、バフの効果が増減するタグを記入してください。
[id]:アクターID
0:全てのメンバー
1以上:アクターID
1-5:アクターID1～5までのアクター

<EnemyTurnPlus:[id],[id]...>
敵グループの誰かがこの特徴を持つときに、ステート、バフ、デバフの効果が延長されます。なお必ず上記とステート、バフの効果が増減するタグを記入してください。
0:全てのバトルエネミー
1以上:モンスターID
3-8:モンスターID3～8までのモンスター

更新履歴
2022/8/1 Ver.1.1.1
敵のステート付加時にエラーが出る問題を修正。
2022/7/29 Ver.1.1.0
パーティ、敵グループの誰かが特徴を持っていればターンが増減する機能を追加。
2022/1/15 Ver.1.0.0
初版
*/

var Imported = Imported || {};
Imported.NUUN_StateBuffTurnPlus = true;

(() => {
const parameters = PluginManager.parameters('NUUN_StateBuffTurnPlus');

Game_BattlerBase.prototype.getStateTurnPlus = function(stateId, sujectId, index) {
    return this.traitObjects().reduce((r, trait) => {
        if (this.getMembersTurnPlusTag(trait)) {
            if (!this.getBattlerTurnPlus(trait, sujectId)) {
                return r;
            }
        } else if (this.isActor() && this.actorId() !== sujectId) {
            return r;
        } else if (this.isEnemy() && this.index() !== index) {
            return r;
        }
        const tag = 'StateTurn' + stateId;
        const data = trait.meta[tag];
        return r + (data && data !== 0 ? Number(data) : 0);
    }, 0);
};

Game_BattlerBase.prototype.getBuffTurnPlus = function(buffId, sujectId, index) {
    return this.traitObjects().reduce((r, trait) => {
        if (this.getMembersTurnPlusTag(trait)) {
            if (!this.getBattlerTurnPlus(trait, sujectId)) {
                return r;
            }
        } else if (this.isActor() && this.actorId() !== sujectId) {
            return r;
        } else if (this.isEnemy() && this.index() !== index) {
            return r;
        }
        const tag = 'BuffTurn' + buffId;
        const data = trait.meta[tag];
        return r + (data && data !== 0 ? Number(data) : 0);
    }, 0);
};

Game_BattlerBase.prototype.getDebuffTurnPlus = function(buffId, sujectId, index) {
    return this.traitObjects().reduce((r, trait) => {
        if (this.getMembersTurnPlusTag(trait)) {
            if (!this.getBattlerTurnPlus(trait, sujectId)) {
                return r;
            }
        } else if (this.isActor() && this.actorId() !== sujectId) {
            return r;
        } else if (this.isEnemy() && this.index() !== index) {
            return r;
        }
        const tag = 'DebuffTurn' + buffId;
        const data = trait.meta[tag];
        return r + (data && data !== 0 ? Number(data) : 0);
    }, 0);
};

const _Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    _Game_BattlerBase_resetStateCounts.call(this, stateId);
    this._stateTurns[stateId] = Math.max(this._stateTurns[stateId] + this.getMembersTurnPlus(stateId), 1);
};

const _Game_BattlerBase_overwriteBuffTurns = Game_BattlerBase.prototype.overwriteBuffTurns;
Game_BattlerBase.prototype.overwriteBuffTurns = function(paramId, turns) {
    const newTurn = Math.max(turns + (this.isBuffAffected(paramId) ? this.getMembersBuffTurnPlus(paramId) : this.getMembersDebuffTurnPlus(paramId)), 1);
    _Game_BattlerBase_overwriteBuffTurns.call(this, paramId, newTurn);
};

Game_Actor.prototype.getMembersTurnPlus = function(stateId) {
    return $gameParty.battleMembers().reduce((r, member) => {
        return r + member.getStateTurnPlus(stateId, this.actorId());
    }, 0);
};

Game_Enemy.prototype.getMembersTurnPlus = function(stateId) {
    const index = this.index();
    return $gameTroop.members().reduce((r, member) => {
        return r + member.getStateTurnPlus(stateId, this.enemyId(), index);
    }, 0);
};

Game_Actor.prototype.getMembersBuffTurnPlus = function(paramId) {
    return $gameParty.battleMembers().reduce((r, member) => {
        return r + member.getBuffTurnPlus(paramId, this.actorId());
    }, 0);
};

Game_Actor.prototype.getMembersDebuffTurnPlus = function(paramId) {
    return $gameParty.battleMembers().reduce((r, member) => {
        return r + member.getDebuffTurnPlus(paramId, this.actorId());
    }, 0);
};

Game_Enemy.prototype.getMembersBuffTurnPlus = function(paramId) {
    const index = this.index();
    return $gameTroop.members().reduce((r, member) => {
        return r + member.getBuffTurnPlus(paramId, this.enemyId(), index);
    }, 0);
};

Game_Enemy.prototype.getMembersDebuffTurnPlus = function(paramId) {
    const index = this.index();
    return $gameTroop.members().reduce((r, member) => {
        return r + member.getDebuffTurnPlus(paramId, this.enemyId(), index);
    }, 0);
};

Game_Actor.prototype.getBattlerTurnPlus = function(trait, sujectId) {
    let list = [];
    const data = trait.meta.MemberTurnPlus.split(',');
    for (const id of data) {
        Array.prototype.push.apply(list, NuunManager.nuun_getListIdData(id));
    }
    if (list[0] === 0) {
        return true;
    } else {
        return list.some(id => id === sujectId);
    }
};

Game_Enemy.prototype.getBattlerTurnPlus = function(trait, sujectId) {
    let list = [];
    const data = trait.meta.EnemyTurnPlus.split(',');
    for (const id of data) {
        Array.prototype.push.apply(list, NuunManager.nuun_getListIdData(id));
    }
    if (list[0] === 0) {
        return true;
    } else {
        return list.some(id => id === sujectId);
    }
};

Game_Actor.prototype.getMembersTurnPlusTag = function(trait) {
    return !!trait.meta.MemberTurnPlus;
};

Game_Enemy.prototype.getMembersTurnPlusTag = function(trait) {
    return !!trait.meta.EnemyTurnPlus;
};

})();