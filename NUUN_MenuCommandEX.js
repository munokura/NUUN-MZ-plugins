/*:-----------------------------------------------------------------------------------
 * NUUN_MenuCommandEX.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Menu command display EX
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuScreenEXBase
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuScreenEXBase
 * @version 1.0.1
 * 
 * @help
 * Any background image or command image can be displayed on the menu command.
 * Set below other menu plug-ins.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 1/3/2023 Ver.1.0.1
 * Added command sort function.
 * 1/3/2023 Ver.1.0.0
 * First edition.
 * 
 * @param MenuCommandSetting
 * @text Menu command setting
 * @desc Set menu commands.
 * @type struct<MenuCommandList>[]
 * @default []
 * 
 * @param ContentsWidth
 * @desc Content width.
 * @text Content width
 * @type number
 * @default 0
 * 
 * @param ContentsHeight
 * @desc Content height.
 * @text Content height.
 * @type number
 * @default 0
 * 
 * @param SelectContentsX
 * @desc The X coordinate of the command when the command is selected. (relative)
 * @text X coordinate when command is selected
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param SelectContentsY
 * @desc The Y coordinate of the command when the command is selected. (relative)
 * @text Y coordinate when command is selected
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param SelectContentsDuration
 * @desc The number of frames to move when selecting a command.
 * @text Number of moving frames
 * @type number
 * @min 1
 * @default 30
 * 
 * @param SelectOnFlash
 * @text Hide cursor when target is selected
 * @desc Does not display the cursor when selecting targets.
 * @type boolean
 * @default false
 * 
 * @param HideCommandName
 * @text Hide command name
 * @desc Do not display command names.
 * @type boolean
 * @default false
 * 
 * @param CommandSort
 * @text Command sort enabled
 * @desc Display commands in order of setting.
 * @type boolean
 * @default false
 * 
 */
/*~struct~MenuCommandList:
 * 
 * @param CommandName
 * @text Command name
 * @desc Specifies the name of the command to apply.
 * @type string
 * @default
 * 
 * @param ContentsX
 * @desc X coordinate of the command. (relative)
 * @text Command X coordinate
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param ContentsY
 * @desc Y coordinate of the command. (relative)
 * @text Command Y coordinate
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param ContentsBackSetting
 * @text Content background setting
 * @default ------------------------------
 * 
 * @param ContentsBackGroundImg
 * @desc Specifies the content background image file name.
 * @text Content background image
 * @type file
 * @dir img/
 * @default 
 * @parent ContentsBackSetting
 * 
 * @param SelectContentsBackGroundImg
 * @desc Specifies the content background image file name when the cursor is selected.
 * @text Content background image when cursor is selected
 * @type file
 * @dir img/
 * @default 
 * @parent ContentsBackSetting
 * 
 * @param CommandImgSetting
 * @text Command image setting
 * @default ------------------------------
 * 
 * @param CommandImg
 * @desc Specifies the command image file name.
 * @text Command background image
 * @type file
 * @dir img/
 * @default 
 * @parent CommandImgSetting
 * 
 * @param CommandImgX
 * @desc X coordinate of the command image. (relative)
 * @text Command image X coordinate
 * @type number
 * @min -9999
 * @default 0
 * @parent CommandImgSetting
 * 
 * @param CommandImgY
 * @desc Y coordinate of the command image. (relative)
 * @text Command image Y coordinate
 * @type number
 * @min -9999
 * @default 0
 * @parent CommandImgSetting
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc メニューコマンド表示EX
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuScreenEXBase
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuScreenEXBase
 * @version 1.0.1
 * 
 * @help
 * メニューコマンドに任意の背景画像、コマンド画像を表示することができます。
 * 他のメニュー系プラグインよりも下に設定してください。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/1/3 Ver.1.0.1
 * コマンドのソート機能を追加。
 * 2023/1/3 Ver.1.0.0
 * 初版。
 * 
 * @param MenuCommandSetting
 * @text メニューコマンド設定
 * @desc メニューコマンドの設定を行います。
 * @type struct<MenuCommandList>[]
 * @default []
 * 
 * @param ContentsWidth
 * @desc コンテンツ横幅。
 * @text 横幅
 * @type number
 * @default 0
 * 
 * @param ContentsHeight
 * @desc コンテンツ縦幅。
 * @text 縦幅
 * @type number
 * @default 0
 * 
 * @param SelectContentsX
 * @desc コマンド選択時のコマンドのX座標。(相対)
 * @text コマンド選択時X座標
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param SelectContentsY
 * @desc コマンド選択時のコマンドのY座標。(相対)
 * @text コマンド選択時Y座標
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param SelectContentsDuration
 * @desc コマンド選択時の移動フレーム数。
 * @text 移動フレーム数
 * @type number
 * @min 1
 * @default 30
 * 
 * @param SelectOnFlash
 * @text 対象選択時カーソル非表示
 * @desc 対象選択時のカーソルを表示しません。
 * @type boolean
 * @default false
 * 
 * @param HideCommandName
 * @text コマンド名非表示
 * @desc コマンド名を表示させません。
 * @type boolean
 * @default false
 * 
 * @param CommandSort
 * @text コマンドソート有効
 * @desc コマンドを設定順に表示させます。
 * @type boolean
 * @default false
 * 
 */
/*~struct~MenuCommandList:ja
 * 
 * @param CommandName
 * @text コマンド名
 * @desc 適用させるコマンド名を指定します。
 * @type string
 * @default
 * 
 * @param ContentsX
 * @desc コマンドのX座標。(相対)
 * @text コマンドX座標
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param ContentsY
 * @desc コマンドのY座標。(相対)
 * @text コマンドY座標
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param ContentsBackSetting
 * @text コンテンツ背景設定
 * @default ------------------------------
 * 
 * @param ContentsBackGroundImg
 * @desc コンテンツ背景画像ファイル名を指定します。
 * @text コンテンツ背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent ContentsBackSetting
 * 
 * @param SelectContentsBackGroundImg
 * @desc カーソル選択時のコンテンツ背景画像ファイル名を指定します。
 * @text カーソル選択時コンテンツ背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent ContentsBackSetting
 * 
 * @param CommandImgSetting
 * @text コマンド画像設定
 * @default ------------------------------
 * 
 * @param CommandImg
 * @desc コマンド画像ファイル名を指定します。
 * @text コマンド背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent CommandImgSetting
 * 
 * @param CommandImgX
 * @desc コマンド画像のX座標。(相対)
 * @text コマンド画像X座標
 * @type number
 * @min -9999
 * @default 0
 * @parent CommandImgSetting
 * 
 * @param CommandImgY
 * @desc コマンド画像のY座標。(相対)
 * @text コマンド画像Y座標
 * @type number
 * @min -9999
 * @default 0
 * @parent CommandImgSetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_MenuCommandEX = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_MenuCommandEX');
    const MenuCommandSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['MenuCommandSetting'])) : null) || [];
    const ContentsWidth = Number(parameters['ContentsWidth'] || 0);
    const ContentsHeight = Number(parameters['ContentsHeight'] || 0);
    const SelectContentsX = Number(parameters['SelectContentsX'] || 0);
    const SelectContentsY = Number(parameters['SelectContentsY'] || 0);
    const SelectContentsDuration = Number(parameters['SelectContentsDuration'] || 30);
    const SelectOFFFlash = eval(parameters['SelectOnFlash'] || "false");
    const HideCommandName = eval(parameters['HideCommandName'] || "false");
    const CommandSort = eval(parameters['CommandSort'] || "false");

    const _Window_MenuCommand_initialize = Window_MenuCommand.prototype.initialize;
    Window_MenuCommand.prototype.initialize = function(rect) {
        this._commandSprite = [];
        _Window_MenuCommand_initialize.call(this, rect);
    };

    Window_MenuCommand.prototype.getMenuCommandEX = function(index) {
        return MenuCommandSetting.find(data => data.CommandName === this.commandName(index));
    };

    Window_MenuCommand.prototype.itemWidth = function() {
        return ContentsWidth > 0 ? ContentsWidth : Window_Selectable.prototype.itemWidth.call(this);
    };
    
    Window_MenuCommand.prototype.itemHeight = function() {
        return ContentsHeight > 0 ? ContentsHeight : Window_Selectable.prototype.itemHeight.call(this);
    };

    Window_MenuCommand.prototype.menuCommandExData = function(index) {
        return MenuCommandSetting[this._list[index].commandEXId];
    };

    Window_MenuCommand.prototype.isCurrentCommandEx = function(index) {
        return this.commandSymbol(index) === this.currentSymbol();
    };

    Window_MenuCommand.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        this.refresh();
    };

    const _Window_MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
        Window_MenuCommand.prototype.makeCommandList = function() {
        _Window_MenuCommand_makeCommandList.call(this);
        //this.refreshCommandList();
    };

    Window_MenuCommand.prototype.refreshCommandList = function() {
        const newList = [];
        const normalList = [];
        this._list.forEach((data, index) => {
            const find = MenuCommandSetting.findIndex(command => command.CommandName === data.name);
            data.commandEXId = find;
            if (CommandSort) {
                if (find >= 0) {
                    newList[find] = data;
                } else {
                    normalList.push(data);
                }
            }
            if (!this._commandSprite[index]) {
                const sprite = new Sprite_MenuCommand(this.menuCommandExData(index));
                this._contentsBackSprite.addChild(sprite);
                this._commandSprite[index] = sprite;
            }
            if (this._commandSprite[index]) {
                const rect = this.itemRect(index);
                this._commandSprite[index].setup(rect.x, rect.y, this.menuCommandExData(index));
            }
        });
        if (CommandSort) {
            this._list = newList.concat(normalList).filter(list => !!list);
        }
    };

    Window_MenuCommand.prototype.paint = function() {
        this.refreshCommandList();
        Window_Selectable.prototype.paint.call(this);
    };

    Window_MenuCommand.prototype.hideGaugeSprite = function() {
        for (const sprite of Object.values(this._commandSprite)) {
            sprite.hide();
        }
    };

    Window_MenuCommand.prototype.itemRect = function(index) {
        const rect = Window_Selectable.prototype.itemRect.call(this, index);
        const data = this.menuCommandExData(index);
        if (data) {
            rect.x += data.ContentsX;
            rect.y += data.ContentsY;
        }
        return rect;
    };

    Window_MenuCommand.prototype.drawItem = function(index) {
        const data = this.menuCommandExData(index);
        if (!data || data && !HideCommandName) {
            Window_Command.prototype.drawItem.call(this, index);
        }
        if (data) {
            this.drawItemImg(data, index);
        }
    };

    Window_MenuCommand.prototype.drawItemImg = function(data, index) {
        const img = data.CommandImg;
        if (img) {
            const bitmap = ImageManager.nuun_LoadPictures(img);
            bitmap.addLoadListener(function() {
                this.drawContentsItemImg(bitmap, data, index);
            }.bind(this));
        }
    };

    Window_MenuCommand.prototype.drawContentsItemImg = function(bitmap, data, index) {
        const rect = this.itemRect(index);
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.contents.blt(bitmap, 0, 0, rect.width, rect.height, rect.x + (data.CommandImgX || 0), rect.y + (data.CommandImgY || 0));
    };

    Window_MenuCommand.prototype.drawItemBackground = function(index) {
        const sprite = this._commandSprite[index];
        const image = this.getBackgroundImg(index);
        if (sprite) {
            const rect = this.itemRect(index);
            sprite.setBitmap(ImageManager.nuun_LoadPictures(image));
            sprite.setPosition(rect.x, rect.y);
            if (this.isCurrentCommandEx(index)) {
                sprite.moveCommand();
            } else {
                sprite.resetMoveCommand();
            }
        }
        if (!image) {
            Window_Selectable.prototype.drawItemBackground.call(this, index);
        }
    };

    Window_MenuCommand.prototype.getBackgroundImg = function(index) {
        const data = this.menuCommandExData(index);
        if (data) {
            return this.isCurrentCommandEx(index) && data.SelectContentsBackGroundImg ? data.SelectContentsBackGroundImg : data.ContentsBackGroundImg;
        }
        return null;
    };

    Window_MenuCommand.prototype.refreshCursor = function() {
        if (!SelectOFFFlash) {
            Window_Selectable.prototype.refreshCursor.call(this);
        }
    };


    function Sprite_MenuCommand() {
        this.initialize(...arguments);
    }
    
    Sprite_MenuCommand.prototype = Object.create(Sprite.prototype);
    Sprite_MenuCommand.prototype.constructor = Sprite_MenuCommand;
    
    Sprite_MenuCommand.prototype.initialize = function(data) {
        Sprite.prototype.initialize.call(this);
        this._data = data;
        this.backgroundImgSprite = null;
        this._duration = 0;
        this._flashColor = [0, 0, 0, 0];
        this._flashDuration = 0;
        this._anchor.x = 0.0;
        this._anchor.y = 0.0;
        this._moveX = 0;
        this._moveY = 0;
        this._targetX = 0;
        this._targetY = 0;
        this._cursorOn = false;
    };
    
    Sprite_MenuCommand.prototype.bitmapWidth = function() {
        return this._data && this._data.ContentsWidth > 0 ? this._data.ContentsWidth : ContentsWidth;
    };
    
    Sprite_MenuCommand.prototype.bitmapHeight = function() {
        return this._data && this._data.ContentsHeight > 0 ? this._data.ContentsHeight : ContentsHeight;
    };

    Sprite_MenuCommand.prototype.setup = function(x, y, data) {
        this._data = data;
        this.setPosition(x, y);
    };

    Sprite_MenuCommand.prototype.setBitmap = function(bitmap) {
        if (!this.backgroundImgSprite && bitmap) {
            const sprite = new Sprite();
            this.addChild(sprite);
            this.backgroundImgSprite = sprite;
        }
        if (this.backgroundImgSprite) {
            this.backgroundImgSprite.bitmap = null;
            if (bitmap) {
                this.backgroundImgSprite.bitmap = bitmap;
            }
        }
    };

    Sprite_MenuCommand.prototype.setPosition = function(x, y) {
        this._homeX = x;
        this._homeY = y;
        this.x = x;
        this.y = y;
    };

    Sprite_MenuCommand.prototype.moveCommand = function() {
        this._targetX = SelectContentsX;
        this._targetY = SelectContentsY;
        this._isMoveing = SelectContentsX !== 0 || SelectContentsY !== 0;
        this._cursorOn = true;
    };

    Sprite_MenuCommand.prototype.resetMoveCommand = function() {
        if (this._cursorOn) {
            this._targetX = 0;
            this._targetY = 0;
            this._isMoveing = true;
        }
        this._cursorOn = false;
    };

    Sprite_MenuCommand.prototype.isMovingDuration = function() {
        return SelectContentsDuration;
    };

    Sprite_MenuCommand.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateMoveing();
    };

    Sprite_MenuCommand.prototype.updateMoveing = function() {
        if (this._isMoveing) {
            if (this._cursorOn) {
                this._moveX = this._moveX + Math.floor(SelectContentsX / this.isMovingDuration());
                this._moveY = this._moveY + Math.floor(SelectContentsY / this.isMovingDuration());
                this.x = this._homeX + this._moveX;
                this.y = this._homeY + this._moveY;
                if (SelectContentsX > 0 && this.x >= this._homeX + this._targetX) {
                    this.x = Math.min(this.x, this._homeX + this._targetX);
                } else if (SelectContentsX < 0 && this.x <= this._homeX + this._targetX) {
                    this.x = Math.max(this.x, this._homeX + this._targetX);
                }
                if (SelectContentsY > 0 && this.y >= this._homeY + this._targetY) {
                    this.y = Math.min(this.y, this._homeY + this._targetY);
                } else if (SelectContentsY < 0 && this.y <= this._homeY + this._targetY) {
                    this.y = Math.max(this.y, this._homeY + this._targetY);
                }
                if (this.x === this._homeX + this._targetX && this.y === this._homeY + this._targetY) {
                    this._isMoveing = false;
                }
            } else {
                this._moveX = this._moveX - Math.floor(SelectContentsX / this.isMovingDuration());
                this._moveY = this._moveY - Math.floor(SelectContentsY / this.isMovingDuration());
                this.x = this._homeX + this._moveX;
                this.y = this._homeY + this._moveY;
                if (SelectContentsX > 0 && this.x <= this._homeX) {
                    this.x = Math.max(this.x, this._homeX);
                } else if (SelectContentsX < 0 && this.x >= this._homeX) {
                    this.x = Math.min(this.x, this._homeX);
                }
                if (SelectContentsY < 0 && this.y >= this._homeY) {
                    this.y = Math.min(this.y, this._homeY);
                } else if (SelectContentsY > 0 && this.y <= this._homeY) {
                    this.y = Math.max(this.y, this._homeY);
                }
                if (this.x === this._homeX && this.y === this._homeY) {
                    this._isMoveing = false;
                }
            }
        }
    };
    
})();