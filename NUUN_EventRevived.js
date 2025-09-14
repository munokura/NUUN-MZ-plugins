/*:-----------------------------------------------------------------------------------
 * NUUN_EventRevived.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Event revival
@author NUUN
@license MIT License

@help
English Help Translator: munokura
Please check the URL below for the latest version of the plugin.
URL https://github.com/nuun888/MZ
-----

Recovers events deleted by deleting events.

To restore events, use the plugin command.
If you select "Restore Events" and want to restore only specific events,
define the tag you want to restore in the memo field.
You can also specify tags defined by other plugins.
Example: `<SBE>`
By specifying the applied tag `SBE`, only events with the `<SBE>` tag will be
restored.
If left blank, events deleted by deleting all events on the map will be
restored.

Update History
February 7, 2022 Ver. 1.0.0
First Edition

@command MapEventRevived
@text Event revival
@desc Resurrects events in the map.
@arg MetaData
@text Applied tags
@desc Specify the tag defined in the memo field of the event to which the resurrection applies. If left blank, all will be resurrected.
@type combo[]
*/

/*:ja
@target MZ
@plugindesc イベント復活
@author NUUN
@version 1.0.0

@help
イベントの消去で消えたイベントを復活させます。

イベントを復活させるにはプラグインコマンドを使用します。 
イベントの復活を選択し特定のイベントのみ復活したい場合は、メモ欄に復活したいタグを定義してください。  
また他プラグインで定義しているタグも指定できます。  
例`<SBE>`  
適用タグ`SBE`と指定することで`<SBE>`のタグがあるイベントのみが復活します。  
無記入の場合はマップ内すべてのイベントの消去で消したイベントが復活します。  

更新履歴
2022/2/7 Ver.1.0.0
初版

@command MapEventRevived
@desc マップ内のイベントを復活させます。
@text イベントの復活

@arg MetaData
@desc 復活を適用するイベントのメモ欄に定義しているタグを定義します。無記入の場合はすべて復活します。
@text 適用タグ
@type combo[]
@option 
@default 
*/

var Imported = Imported || {};
Imported.NUUN_Seamless = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EventRevived');

const pluginName = "NUUN_EventRevived";
PluginManager.registerCommand(pluginName, 'MapEventRevived', args => {
    $gameMap.eventReset(args);
});

Game_Map.prototype.eventReset = function(args) {
    const tagList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(args.MetaData)) : null) || [];
    const tagListLength = tagList.length;
    for (const event of this.events()) {
        if (event._erased) {
            const meta = event.event().meta;
            if (tagListLength > 0) {
                const result = tagList.some(tag => meta[tag]);
                if (result) {
                    event.eventReset();
                }
            } else {
                event.eventReset();
            }
        } 
    }
};

Game_Event.prototype.eventReset = function() {
    this.initMembers();
    this.locate(this.event().x,this.event().y);
    this.refresh();
};

})();