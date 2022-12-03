# [売値任意設定](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AnySellPrice.js)
# Ver.1.1.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AnySellPrice.js)  

アイテム、武器、防具の売値を価格の半分ではなく任意の売値にします。

## 設定方法
アイテム、武器、防具のメモ欄  
`<SellPrice:[sell]>`  
`[sell]`:売値  
`<SellPrice:500>` 売値が500になります。  
`<SellPrice:0>` 購入することは出来ますが、売ることが出来なくなります。(データベースの価格を1以上に設定した場合)  

プラグインコマンドの売値の設定は、イベントコマンドショップの処理の前に行ってください。  
なお売値の設定は自動では初期化されません。売値の設定または売値の設定リスト初期化を行わない限りまえで設定したデータが残り続けます。

## 更新履歴
2021/10/31 Ver 1.1.0  
プラグインコマンドで売値を設定できる機能を追加。  
2021/10/9 Ver 1.0.0  
初版  
