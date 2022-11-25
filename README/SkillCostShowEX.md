# [スキルコスト表示拡張](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillCostShowEX.js)
# Ver.1.0.2
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_SkillCostShowEX.js)
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  
[スキルコスト拡張](https://github.com/nuun888/MZ/blob/master/README/SkillCostEX.md)  

スキルコストの表示を拡張します。  

![画像](img/SkillCost1.png)  

## 設定方法
スキルコストの表示順からスキルコストの表示順を設定できます。  
設定してないコストは表示されません。  
スキルコストの表示順でHP、MP、TP、Gold、Exp以外のコストを設定する場合は消費するコストのタグ名を`コスト表示対象`に記入し、`HP、MP、TP、Gold、Exp以外のコスト個別設定`で設定してください。  
`コスト評価式`はコストの評価式を記入します。  
例  
パーティリミットゲージのコストを表示する場合はコスト表示対象に`'limitCost'`を記入し、コスト評価式に`this._actor.skillLimitCost(skill)`と記入してください。  
パーティリミットゲージのコスト表示をこのプラグインで設定する場合は、このプラグインをパーティリミットゲージより下に配置してください。  

`skill`:発動するスキルデータ  
`this._actor`または`actor`:アクターデータ  

色の設定は通常システムカラーを記入しますが、テキストタブからカラーコードを記入できます。

## 更新履歴
2022/11/25 Ver.1.0.2  
アクターのゲームデータの取得パラメータをactorで取得できるように修正。  
日本語以外での表示を英語表示に変更。  
2022/1/3 Ver.1.0.1  
コスト表示対象でリストにないタグを複数指定したときに、正常に表示されない問題を修正。  
2021/12/5 Ver.1.0.0  
初版
