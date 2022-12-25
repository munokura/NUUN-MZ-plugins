# [スキルラーニング](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillLearning.js)
# Ver.1.1.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillLearning.js)  
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)Ver.1.6.1以降  

相手の使用するスキルを習得することができます。  

## 設定
### スキルを受けた時または使用したときに習得  
スキルのメモ欄  
`<SkillLearning:[rate], [skill], [mode]>` 攻撃を受けた時に習得可能スキルならスキルを確率で習得します。  
スキルを習得する特徴があるバトラーのみ習得します。  
`[rate]`:習得確率(百分率)  
`[skill]`:習得スキル　0:発動スキルを習得します。 １以上:指定のスキル  
`[mode]`:習得対象 0:敵味方　1:味方のみ　2:敵のみ  
例:`<SkillLearning:80, 0, 0>` 攻撃を受けた時80%の確率で攻撃スキルを習得します。  
`<SkillLearning:100, 52, 1>` 攻撃を受けた時100%の確率で習得者が味方ならスキルID52番のスキルを習得します。  

`<WatchingSkillLearning:[rate], [skill], [mode]>` 相手がスキルを使用した時に習得可能スキルならスキルを確率で習得します。  
スキルを習得する特徴があるバトラーのみ習得します。  
`[rate]`:習得確率(百分率)  
`[skill]`:習得スキル　0で発動スキルを習得します。 １以上:指定のスキル  
`[mode]`:習得対象 0:敵味方　1:味方のみ　2:敵のみ  

特徴を持つメモ欄(敵キャラを含む)  
スキルを習得する特徴を作る。  
`<SkillLearningAbility>`  
攻撃を受けたときに習得可能スキルならスキルを習得します。  
`<WatchingSkillLearningAbility>`  
相手がスキルを使用したときに習得可能スキルならスキルを習得します。  

### 攻撃をしたときに対象のスキルを習得
スキルのメモ欄  
`<AttackSkillLearning:[rate], [skill], [mode]>` 攻撃を与えた時に対象のスキルを習得します。  
下記のタグ(OnAttackSkillLearning)があるスキルのみ習得出来ます。  
`[rate]`:習得確率(百分率)  
`[skill]`:習得スキル　0:全てのスキル 1:全てのスキルから１つランダム。  
`[mode]`:習得モード 0:ヒット　1:撃破  

`<OnAttackSkillLearning:[mode]>` 攻撃時に習得可能にするスキルを設定します。  
`[mode]`:習得対象 0:敵味方　1:味方のみ　2:敵のみ  

### 共通設定
スキル習得補正率を設定  
特徴を持つメモ欄  
`<SkillLearningCorrection:[rorrection]>` スキル習得補正率を設定します。  
`[rorrection]`:±補正率  


敵が習得したスキルのレーティングは全て5で設定されます。  

## 更新履歴
2022/12/25 Ver.1.1.0  
攻撃時に対象のスキルを習得できる機能を追加。  
2022/12/18 Ver.1.0.2  
スキル習得時にSEを再生する機能を追加。  
2022/12/17 Ver.1.0.1  
モンスター図鑑の敵の使用スキル適用による定義追加。  
2022/12/17 Ver.1.0.0  
初版  
