/*:-----------------------------------------------------------------------------------
 * NUUN_BeforeCore_1_3_2Patch.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc Core Script Ver.1.3.2 and earlier patches
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

This is a patch for core script versions prior to 1.3.2.
Place it near the top of your plugin list.

Terms of Use
This plugin is distributed under the MIT License.

Update History
September 24, 2021 Version 1.0.0
First release
*/

/*:ja
@target MZ
@plugindesc コアスクリプトVer.1.3.2以前パッチ
@author NUUN
@version 1.0.0

@help
コアスクリプトVer.1.3.2以前のバージョン用パッチです。
プラグインリストの上のほうに配置してください。

利用規約
このプラグインはMITライセンスで配布しています。

更新履歴
2021/9/24 Ver.1.0.0
初版
*/

var Imported = Imported || {};
Imported.NUUN_BeforeCore_1_3_2Patch = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BeforeCore_1_3_2Patch');

  Sprite_Gauge.prototype.textHeight = function() {
    return 24;
  };
})();