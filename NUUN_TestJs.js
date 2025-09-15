/*:-----------------------------------------------------------------------------------
 * NUUN_TestJs.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Verification file
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
*/

/*:ja
@target MZ
@plugindesc 確認用ファイル
@author NUUN
@base NUUN_Base
@orderAfter NUUN_Base
@version 1.0.0

@help
*/

(() => {

    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        console.log("処理されています。")
        _Window_MenuCommand_addOriginalCommands.call(this);
    };
    
})();