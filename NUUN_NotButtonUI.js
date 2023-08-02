/*:-----------------------------------------------------------------------------------
 * NUUN_NotButtonUI.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Disable Button UI
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * Disable the button in Touch UI.
 * In addition, the display of the window that was narrowed with the button UI is displayed from the top of the screen. (Display up to MV)
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/3/2023 Ver.1.0.0
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ボタンUI無効化
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * タッチUIのボタンを無効にします。
 * またボタンUIで表示が狭くなっていたウィンドウの表示を画面の一番上から表示させます。(MVまでの表示)
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/8/3 Ver.1.0.0
 * 初版
 * 
 */


var Imported = Imported || {};
Imported.NUUN_NotButtonUI = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_NotButtonUI');

    const _Scene_Boot_loadPlayerData = Scene_Boot.prototype.loadPlayerData;
    Scene_Boot.prototype.loadPlayerData = function() {
        _Scene_Boot_loadPlayerData.call(this);
        ConfigManager.touchUI = false;
    };


    Scene_Base.prototype.buttonAreaTop = function() {
        return 0;
    };
    
    Scene_Base.prototype.buttonAreaHeight = function() {
        return 0;
    };

    const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function() {
        return _Scene_Options_maxCommands.call(this) - 1;
    };

    
    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        this._list = this._list.filter(data => data.symbol !== "touchUI");
    };
    
})();