/*:-----------------------------------------------------------------------------------
 * NUUN_Destination.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Action goal display
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

Displays action objectives on the save and menu screens.
This plugin requires the default menu screen type (NUUN_MenuScreen_default),
menu screen type 1 (NUUN_MenuScreen_2), and menu screen type 2
(NUUN_MenuScreen_2).

Terms of Use
This plugin is distributed under the MIT License.

Update History
July 4, 2022 Ver. 1.0.2
Added processing for displaying the save screen extension.
July 2, 2022 Ver. 1.0.1
Revised the plugin parameter descriptions due to inconsistent descriptions.
June 4, 2022 Ver. 1.0.0
First version

@param DestinationList
@text Behavioral goal text setting
@desc Set the behavioral goal text.
@type struct<Destination>[]
@default []

@command SetDestination
@text Change in behavioral goals
@desc Change the action goal text displayed on the menu screen.
@arg id
@text Behavioral goals
@desc Specify the action goal ID.
@type number
@default 0
*/

/*~struct~Destination:
@param DestinationText
@text Behavioral goal text
@desc Enter the text of the action goal. (Control characters are allowed.)
@type multiline_string
*/

/*:ja
@target MZ
@plugindesc 行動目標表示
@author NUUN
@version 1.0.2
@base NUUN_Base
@orderAfter NUUN_Base

@help
セーブ、メニュー画面に行動目標を表示します。
このプラグインはメニュー画面デフォルトタイプ(NUUN_MenuScreen_default)、メニュー画面タイプ１(NUUN_MenuScreen)、メニュー画面タイプ２(NUUN_MenuScreen_2)が必要です。

利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2022/7/4 Ver.1.0.2
セーブ画面拡張の表示への処理追加。
2022/7/2 Ver.1.0.1
プラグインパラメータの説明が異なる説明のため修正。
2022/6/4 Ver.1.0.0
初版


@command SetDestination
@text 行動目標変更
@desc メニュー画面に表示する行動目標テキストを変更します。

@arg id
@text 行動目標
@desc 行動目標IDを指定します。
@type number
@default 0



@param DestinationList
@text 行動目標テキスト設定
@desc 行動目標テキストの設定を行います。
@default []
@type struct<Destination>[]
*/

/*~struct~Destination:ja

@param DestinationText
@text 行動目標テキスト
@desc 行動目標のテキストを記入します。（制御文字使用可能）
@default 
@type multiline_string
*/

var Imported = Imported || {};
Imported.NUUN_Destination = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_Destination');
    const DestinationList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DestinationList'])) : null) || [];
    
    const pluginName = "NUUN_Destination";
    PluginManager.registerCommand(pluginName, 'SetDestination', args => {
        $gameSystem.setDestinationId(Number(args.id));
    });

    Window_Base.prototype.getDestinationList = function() {
        const data = DestinationList[$gameSystem.getDestinationId() - 1];
        return data ? data.DestinationText : null;
    };

    Game_System.prototype.getDestinationId = function() {
        return this._destinationId || 0;
    };

    Game_System.prototype.setDestinationId = function(index) {
        this._destinationId = index;
    };

    Game_System.prototype.getDestinationList = function() {
        const data = DestinationList[$gameSystem.getDestinationId() - 1];
        return data ? data.DestinationText : null;
    };

})();