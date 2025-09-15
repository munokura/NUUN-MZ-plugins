/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEX_Standard.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */

/*:
@target MZ
@url https://github.com/nuun888/MZ
@plugindesc For battle style expansion standard settings
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

Changes the battle layout.
This plugin also implements the following features:
Actor animation in the front view
Standing image display
Conditional standing image switching
Changing the display coordinates of status parameters
Specifying background images for each window
Changing command display

To change the actor's face image to a standing image, set the actor image mode
to "Image" in the plugin parameters: Default Actor Image Settings or Actor
Image Coordinate Magnification.
If the Actor Image Coordinate Magnification setting is not set, the default
actor image setting will be applied.

The actor image settings allow you to conditionally switch between face images
and standing images. Standing images and Face Image Display EX are also
supported, but you must enable the Standing Image Display EX plugin parameter.
Conditions are prioritized from top to bottom, with matching conditions
applied first. Set the image to be applied normally at the bottom.

To change the coordinate position of each status, set "Change XX Coordinates"
for each item to true.

Enemy character memo field
<AttackAnimation:11>
Animation number 11 plays when an enemy character performs a normal attack. If
not specified, the default plugin parameter value will be applied.

If you are using this plugin in conjunction with Jupiter Penguin's Pseudo 3D
Battle Plugin to display animations for allies in the front view,
please install the Battle Style Extended Pseudo 3D Battle Compatible Patch
separately.

If you are using this plugin in conjunction with Keke's Speedster Battle
Plugin to display animations for allies in the front view,
please install the Battle Style Extended Speedster Battle Compatible Patch
separately.

Update History
2022/5/2 Ver.1.1.1
Added the ability to display effect properties in the middle (between the
actor image and status) or in the foreground.
2022/4/10 Ver.1.1.0
Changed the Actor Image Settings so that multiple conditions can be specified
for switches, weapons, armor, and states.
Added a remaining HP condition to the Actor Image Settings.
Fixed an issue where the list was not displayed for the Actor Image Settings
profession.
Fixed an issue where the Actor Image Settings skill and item conditions were
not being applied.
April 1, 2022 Ver. 1.0.5
Added a feature to center the display position of actor command items.
March 29, 2022 Ver. 1.0.4
Changed the descriptions for enemy selection, items, skills, and help window
image display.
March 26, 2022 Ver. 1.0.3
Added processing for variable display range display of actor placement in the
Actor Window Status.
March 26, 2022 Ver. 1.0.2
Fixed an issue where there was no option to hide skins in the enemy selection
window.
March 25, 2022 Ver. 1.0.1
Added switch, weapon, and armor equipped, and specific jobs to the character
portrait switching conditions.
March 24, 2022 Ver. 1.0.0
First version

@param Setting
@text Common Settings
@default ////////////////////////////////

@param PartyCommand
@text Party Command Settings
@default ////////////////////////////////

@param PartyCommandPosition
@text Command display position
@desc Specifies the display position of party commands when custom selection is performed.
@type select
@default 'default'
@parent PartyCommand
@option Top
@value 'top'
@option middle
@value 'middle'
@option Above the Actor Status window
@value 'under'
@option custom
@value 'custom'
@option Default (coordinates are fixed)
@value 'default'

@param PartyCommandMaxCol
@text Display command columns
@desc The number of command columns to display.
@type number
@default 1
@min 1
@max 99
@parent PartyCommand

@param PartyCommandMaxRow
@text Number of command lines to display
@desc The number of command lines to display.
@type number
@default 4
@min 1
@max 99
@parent PartyCommand

@param PartyCommandWindow
@text Party Command Window Settings
@default ------------------------------
@parent PartyCommand

@param PartyCommandWindowShow
@text Window Image Display
@desc Displays the window image. Set this to OFF when specifying a background. (When set to OFF, only commands are displayed.)
@type boolean
@default true
@parent PartyCommandWindow

@param PartyCommand_X
@text Command window X coordinate
@desc Specifies the X coordinate of the party command window.
@type number
@default 0
@min -9999
@max 9999
@parent PartyCommandWindow

@param PartyCommand_Y
@text Command window Y coordinate
@desc Specifies the Y coordinate of the party command window.
@type number
@default 0
@min -9999
@max 9999
@parent PartyCommandWindow

@param PartyCommand_Width
@text Command window width
@desc Specifies the width of the party command window. 0 is the UI width.
@type number
@default 0
@min 0
@max 9999
@parent PartyCommandWindow

@param PartyCommandBackGround
@text Party Command Background Settings
@default ------------------------------
@parent PartyCommand

@param PartyCommandBackgroundImg
@text Party Command Background Image Window
@desc Specifies the background image window for party commands.
@type file
@dir img/
@parent PartyCommandBackGround

@param PartyBackground_X
@text Background image X coordinate (relative)
@desc Party command background image X coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent PartyCommandBackGround

@param PartyBackground_Y
@text Background image Y coordinate (relative)
@desc Party command background image Y coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent PartyCommandBackGround

@param PartyCommandOption
@text Party Command Options
@default ------------------------------
@parent PartyCommand

@param PartyCommandWindowCenter
@text Window coordinate center display
@desc Centers the window (non-default).
@type boolean
@default false
@parent PartyCommandOption

@param PartyCommandMode
@text Command display centered
@desc Display the party command items closer to the center.
@type boolean
@default false
@parent PartyCommandOption

@param ActorCommand
@text Actor Command Settings
@default ////////////////////////////////

@param ActorCommandWindowShow
@text Window Image Display
@desc Displays the window image. Set this to OFF when specifying a background. (When set to OFF, only commands are displayed.)
@type boolean
@default true
@parent ActorCommand

@param ActorCommandPosition
@text How to display actor commands
@desc Select how actor commands are displayed.
@type select
@default 'default'
@parent ActorCommand
@option Default (coordinates are fixed)
@value 'default'
@option Top
@value 'top'
@option middle
@value 'middle'
@option Above the Actor Status window
@value 'under'
@option Above each SV actor (SV recommended)
@value 'svtop'
@option To the left of each SV actor (SV recommended)
@value 'svleft'
@option To the right of each SV actor (SV recommended)
@value 'svright'
@option custom
@value 'custom'

@param ActorCommandMaxRow
@text Maximum number of command lines displayed
@desc The maximum number of command lines that can be displayed. If variable command display is OFF, this setting value is applied.
@type number
@default 10
@min 1
@max 99
@parent ActorCommand

@param ActorCommandMinRow
@text Minimum number of command lines to display when commands are variable
@desc The minimum number of command lines to display.
@type number
@default 4
@min 1
@max 99
@parent ActorCommand

@param ActorCommandMaxCol
@text Display command columns
@desc The number of command columns to display.
@type number
@default 1
@min 1
@max 99
@parent ActorCommand

@param ActorCommandVariable
@text Variable command display
@desc The number of actor commands displayed will be the same as the number of commands (up to the maximum number of command lines).
@type boolean
@default true
@parent ActorCommand

@param ActorCommandWindow
@text Actor Command Window Settings
@default ------------------------------
@parent ActorCommand

@param ActorCommand_X
@text Command window X coordinate
@desc Specifies the X coordinate of the actor command window.
@type number
@default 0
@min -9999
@max 9999
@parent ActorCommandWindow

@param ActorCommand_Y
@text Command window Y coordinate
@desc Specifies the Y coordinate of the actor command window.
@type number
@default 0
@min -9999
@max 9999
@parent ActorCommandWindow

@param ActorCommand_Width
@text Command window width
@desc Specifies the width of the actor command window.
@type number
@default 192
@min 0
@max 9999
@parent ActorCommandWindow

@param ActorCommandBackGround
@text Party Command Background Settings
@default ------------------------------
@parent ActorCommand

@param ActorCommandBackgroundImg
@text Actor Command Background Image Window
@desc Specifies the background image window for the actor command.
@type file
@dir img/
@parent ActorCommandBackGround

@param ActorBackground_X
@text Background image X coordinate (relative)
@desc Actor command background image X coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent ActorCommandBackGround

@param ActorBackground_Y
@text Background image Y coordinate (relative)
@desc Actor command background image Y coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent ActorCommandBackGround

@param ActorCommandOption
@text Actor Command Options
@default ------------------------------
@parent ActorCommand

@param ActorCommandWindowCenter
@text Window coordinate center display
@desc Centers the window (top, middle, above actor status, custom only).
@type boolean
@default true
@parent ActorCommandOption

@param ActorCommandMode
@text Command display centered
@desc Display the actor command items closer to the center.
@type boolean
@default true
@parent ActorCommandOption

@param ActorStatus
@text Actor Status Settings
@default ////////////////////////////////

@param ActorMaxCol
@text Number of horizontal actors
@desc The number of actors to line up horizontally.
@type number
@default 1
@min 1
@max 99
@parent ActorStatus

@param ActorMaxRow
@text Number of vertical actors
@desc The number of actors to line up vertically.
@type number
@default 4
@min 1
@max 99
@parent ActorStatus

@param ActorStatusMode
@text How to display actor status
@desc Select how to display actor status.
@type select
@default 'center'
@parent ActorStatus
@option Left-leaning
@value 'left'
@option center
@value 'center'
@option Right-leaning
@value 'right'

@param EnemyWindow
@text Enemy character selection settings
@default ------------------------------

@param EnemyWindowShow
@text Window Image Display
@desc Show window image. If you turn it off, the window behind the command will not be displayed.
@type boolean
@default true
@parent EnemyWindow

@param EnemyMaxRow
@text Number of rows
@desc The number of lines to display.
@type number
@default 4
@min 1
@max 99
@parent EnemyWindow

@param EnemyMaxCol
@text number of columns
@desc The number of columns to display.
@type number
@default 2
@min 1
@max 99
@parent EnemyWindow

@param EnemyWindow_X
@text Window X coordinate
@desc Specifies the X coordinate of the enemy character window.
@type number
@default 0
@min -9999
@max 9999
@parent EnemyWindow

@param EnemyWindow_Y
@text Window Y coordinate
@desc Specifies the Y coordinate of the enemy character window.
@type number
@default 0
@min -9999
@max 9999
@parent EnemyWindow

@param EnemyWindow_Width
@text Window width
@desc Specifies the width of the enemy character window. If you set it to 0 (the UI size is larger than the screen), it will automatically be set to the width of the screen.
@type number
@default 0
@min 0
@max 9999
@parent EnemyWindow

@param EnemyWindowOpacity
@text Window opacity when selected
@desc Opacity of actor status window when enemy character is selected (0 = hidden)
@type number
@default 255
@min 0
@max 255
@parent EnemyWindow

@param EnemyWindowOption
@text Enemy character selection window options
@default ------------------------------
@parent EnemyWindow

@param EnemyWindowMode
@text Set coordinate mode
@desc Coordinate setting mode for enemy character window. (ON: Relative coordinates from the default display position. OFF: Absolute coordinates from the top left of the screen.)
@type boolean
@default true
@parent EnemyWindowOption

@param EnemyWindowBackGround
@text Background Image Window Background Settings
@default ------------------------------
@parent EnemyWindow

@param EnemyWindowBackgroundImg
@text Background Image Window
@desc Specifies the background image window.
@type file
@dir img/
@parent EnemyWindowBackGround

@param EnemyWindowBackground_X
@text Background image X coordinate (relative)
@desc Actor Status Window background image X coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent EnemyWindowBackGround

@param EnemyWindowBackground_Y
@text Background image Y coordinate (relative)
@desc Actor status window background image Y coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent EnemyWindowBackGround

@param ActorStatusWindow
@text Actor Status Window Settings
@default ------------------------------
@parent ActorStatus

@param ActorStatusWindowLock
@text Actor Status Window Fixed
@desc Freezes the actor status window when selecting commands.
@type boolean
@default false
@parent ActorStatusWindow

@param ActorStatusWindowPosition
@text Window reference display position
@desc Actor Status Window Reference Display Position
@type select
@default 'ui_under'
@parent ActorStatusWindow
@option Bottom of UI screen
@value 'ui_under'
@option bottom of screen
@value 'under'
@option custom
@value 'custom'

@param ActorStatusWindow_X
@text Window X coordinate (relative coordinate)
@desc Specifies the X coordinate (relative coordinate) of the Actor Status window.
@type number
@default 0
@min -9999
@max 9999
@parent ActorStatusWindow

@param ActorStatusWindow_Y
@text Window Y coordinate (relative)
@desc Specifies the Y coordinate (relative coordinate) of the Actor Status Window. The coordinate is relative to the "Window Reference Display Position."
@type number
@default 0
@min -9999
@max 9999
@parent ActorStatusWindow

@param ActorStatusWindow_Width
@text Window width
@desc Specifies the width of the actor status window. When the command display position is the default, it also includes the command width. 0 is the default value
@type number
@default 0
@min 0
@max 9999
@parent ActorStatusWindow

@param ActorStatusWindow_Height
@text Window height
@desc Specifies the vertical width of the actor status window when actor window coordinate changes are allowed. 0 is the default value.
@type number
@default 0
@min 0
@max 9999
@parent ActorStatusWindow

@param WidthWithCommand
@text Adjust width size
@desc Adjust the width of the Actor Command from the width of the Actor Status window.
@type boolean
@default true
@parent ActorStatusWindow

@param WindowShow
@text Actor Status Window Image Display
@desc Displays the actor status window image.
@type boolean
@default true
@parent ActorStatusWindow

@param WindowFrameShow
@text Actor Status Window Frame Display
@desc Shows the actor status pane.
@type boolean
@default false
@parent ActorStatusWindow

@param CursorBackShow
@text Actor Status Window Background Display
@desc Displays the actor status window background.
@type boolean
@default true
@parent ActorStatusWindow

@param ActorWindowBackGround
@text Background Image Window Background Settings
@default ------------------------------
@parent ActorStatus

@param WindowBackground
@text Background Image Window
@desc Specifies the background image window.
@type file
@dir img/
@parent ActorWindowBackGround

@param WindowBackground_X
@text Background image X coordinate (relative)
@desc Actor Status Window background image X coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent ActorWindowBackGround

@param WindowBackground_Y
@text Background image Y coordinate (relative)
@desc Actor status window background image Y coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent ActorWindowBackGround

@param ActorStatusOption
@text Actor Status Window Options
@default ------------------------------
@parent ActorStatus

@param ActorStatusWindowCenter
@text Window coordinate center display
@desc Centers the window.
@type boolean
@default true
@parent ActorStatusOption

@param ActorSetting
@text Actor Settings
@default ////////////////////////////////

@param DefaultStatusPositionData
@text Default status coordinate display settings
@desc Set the default status coordinates and display settings.
@type struct<StatusPositionData>
@default {"ActorNameChangePosition":"","NameChangePosition":"false","ActorName_X":"0","ActorName_Y":"10","ActorHPChangePosition":"------------------------------","HPGaugeWidth":"128","HPGaugeHeight":"12","HPChangePosition":"false","ActorHP_X":"8","ActorHP_Y":"180","ActorMPChangePosition":"------------------------------","MPGaugeWidth":"128","MPGaugeHeight":"12","MPChangePosition":"false","ActorMP_X":"8","ActorMP_Y":"314","ActorTPChangePosition":"------------------------------","TPGaugeWidth":"128","TPGaugeHeight":"12","TPChangePosition":"false","ActorTP_X":"8","ActorTP_Y":"448","ActorTPBChangePosition":"------------------------------","TPBGaugeWidth":"128","TPBGaugeHeight":"12","TPBChangePosition":"false","ActorTPB_X":"0","ActorTPB_Y":"0","ActorStateChangePosition":"------------------------------","StateChangePosition":"false","ActorState_X":"22","ActorState_Y":"156","OutsideWindowVisible":"false","ActorImgChangePosition":"------------------------------","ImgChangePosition":"false","ActorImg_X":"0","ActorImg_Y":"0","Background":"------------------------------","ActorBackground":"","ActorFrontBackground":""}
@parent ActorSetting

@param DefaultActorImgData
@text Default actor image settings
@desc Set the default actor image.
@type struct<ActorImgList>
@default {"ActorImgMode":"'none'","Actor_X":"0","Actor_Y":"0","Img_SX":"0","Img_SY":"0","Actor_Scale":"100"}
@parent ActorSetting

@param ActorData
@text Actor coordinates, image settings
@desc Set individual coordinates and images for each actor.
@type struct<ActorDataList>[]
@default []
@parent ActorSetting

@param OnActorPictureEX
@text Standing picture display EX applied
@desc Applies the settings for Standing Character Display EX.
@type boolean
@default false
@parent ActorSetting

@param Img_SW
@text Actor image display width
@desc Display width of actor image.
@type number
@default 0
@min 0
@max 9999
@parent ActorSetting

@param Img_SH
@text Actor image display width
@desc Display height of actor image.
@type number
@default 0
@min 0
@max 9999
@parent ActorSetting

@param SelectBackShow
@text Background display when actor is in action
@desc Displays the actor background that is displayed when selecting an actor's action.
@type boolean
@default true
@parent ActorSetting

@param ActorSelectBackShow
@text Background display when actor is selected as target
@desc Displays the actor background that is displayed when an actor is targeted.
@type boolean
@default true
@parent ActorSetting

@param ActorStatusParamOption
@text Actor Status Window Status Options
@default ------------------------------
@parent ActorSetting

@param NameShow
@text Name Display
@desc Displays the name.
@type boolean
@default true
@parent ActorStatusParamOption

@param TPBShow
@text TPB Gauge Display
@desc Displays the TPB gauge. Set this when displaying the TPB gauge in another location using an external plug-in.
@type boolean
@default true
@parent ActorStatusParamOption

@param OutsideWindowVisible
@text Displaying icons outside the window frame
@desc The icon will be displayed outside the window frame (displayed above the actor image).
@type boolean
@default false
@parent ActorStatusParamOption

@param StateVisible
@text State Icon Display
@desc Displays the icon. Set this when you want to display the state icon in a different location using an external plugin.
@type boolean
@default true
@parent ActorStatusParamOption

@param FaceHeight
@text Face graphic vertical width
@desc Specifies the vertical width of the face graphic (0 is the default).
@type number
@default 0
@min 0
@max 9999
@parent ActorStatusParamOption

@param FaceHeightOnWindow
@text Image window display
@desc Fits the height range of the image within the window.
@type boolean
@default true
@parent ActorStatusParamOption

@param ActorEffect
@text Actor Animation Effect Settings
@default ////////////////////////////////

@param ActorEffectShow
@text Front view effect display
@desc Animation effects are also displayed in front view.
@type boolean
@default false
@parent ActorEffect

@param EffectPriority
@text Effect Display Properties
@desc The display properties of the effect.
@type select
@default 'top'
@parent ActorEffect
@option frontmost
@value 'top'
@option middle
@value 'middle'

@param ActorEffect_X
@text Animation effect X coordinate (relative coordinate)
@desc The relative x-coordinate of the animation effect.
@type number
@default 0
@min -9999
@max 9999
@parent ActorEffect

@param ActorEffect_Y
@text Animation effect Y coordinate (relative coordinate)
@desc The relative Y coordinate of the animation effect.
@type number
@default 0
@min -9999
@max 9999
@parent ActorEffect

@param ActorDamage_X
@text Damage effect X coordinate (relative coordinate)
@desc X coordinate of the damage effect (relative coordinate).
@type number
@default 0
@min -9999
@max 9999
@parent ActorEffect

@param ActorDamage_Y
@text Damage effect Y coordinate (relative coordinate)
@desc Y coordinate of the damage effect (relative coordinate).
@type number
@default 0
@min -9999
@max 9999
@parent ActorEffect

@param ActorsMirror
@text Actor Animation Reverse
@desc Reverses the actor's animation.
@type boolean
@default true
@parent ActorEffect

@param ActorImgEffect
@text Actor Graphic Effect Settings
@default ////////////////////////////////

@param DamageImgFrame
@text Damage and recovery frame changes
@desc Image change frames during damage and recovery.
@type number
@default 30
@min 1
@max 9999
@parent ActorImgEffect

@param OnActorShake
@text Damage Shake Enabled
@desc Enables shake on damage.
@type boolean
@default false
@parent ActorImgEffect

@param ActorShakeFlame
@text Shake Frame
@desc Shake frames when damaged (default 36)
@type number
@default 36
@min 0
@parent ActorImgEffect

@param ActorShakePower
@text Shake size
@desc The amount of shake when damaged. (Default: 2)
@type number
@default 2
@min 0
@parent ActorImgEffect

@param ActorShakeSpeed
@text Shake Speed
@desc Shake speed when damaged. (Default 20)
@type number
@default 20
@min 0
@parent ActorImgEffect

@param OnActionZoom
@text Effect enabled when taking action
@desc Enables effects during actions.
@type boolean
@default false
@parent ActorImgEffect

@param ActionZoomDuration
@text Effect frame during action
@desc Effect frames during action
@type number
@default 60
@min 0
@parent ActorImgEffect

@param ActorFlash
@text Actor image flashes when selected
@desc Makes the actor image blink when an actor target is selected.
@type boolean
@default true
@parent ActorImgEffect

@param ImgDeathHide
@text Hide actor image when unable to fight
@desc If an actor is incapacitated, their face image will be hidden.
@type boolean
@default true
@parent ActorImgEffect

@param EnemyAnimation
@text Enemy character animation settings
@default ////////////////////////////////

@param EnemySkillAnimation
@text Normal attack animation ID
@desc Enemy character's default normal attack animation ID
@type animation
@default 1
@min 0
@parent EnemyAnimation

@param EnemyAppearWindow
@text Monster Appearance Window
@default ////////////////////////////////

@param AppearWindowVisible
@text Hide monster appearance messages
@desc Do not display messages when monsters appear.
@type boolean
@default false
@parent EnemyAppearWindow

@param AppearWindowAnchorMode
@text Appearance window display position
@desc The display position of the appearing window.
@type select
@default 'under'
@parent EnemyAppearWindow
@option above
@value 'top'
@option under
@value 'under'

@param AppearWindowOpacity
@text Window opacity when enemy appearance message is displayed
@desc Opacity of actor status window when enemy appearance message is displayed (0 = hidden)
@type number
@default 255
@min 0
@max 255
@parent EnemyAppearWindow

@param AppearWindowBackGround
@text Enemy appearance message background image window background settings
@default ------------------------------
@parent EnemyAppearWindow

@param AppearBackgroundImg
@text Enemy appearance background image window
@desc Specifies the background image window for the enemy appearance message.
@type file
@dir img/
@parent AppearWindowBackGround

@param AppearWindowBackground_X
@text Enemy appearance background image X coordinate (relative)
@desc The X coordinate (relative) of the background image for the enemy appearance message.
@type number
@default 0
@min -9999
@max 9999
@parent AppearWindowBackGround

@param AppearWindowBackground_Y
@text Enemy appearance background image Y coordinate (relative)
@desc The Y coordinate (relative) of the background image for the enemy appearance message.
@type number
@default 0
@min -9999
@max 9999
@parent AppearWindowBackGround

@param ItemWindow
@text Item Selection Window
@default ////////////////////////////////

@param ItemWindowShow
@text Window Image Display
@desc Show window image. If you turn it off, the window behind the command will not be displayed.
@type boolean
@default true
@parent ItemWindow

@param ItemWindowOpacity
@text Window opacity when item window is displayed
@desc Opacity of actor status window when item window is displayed (0 for hidden)
@type number
@default 255
@min 0
@max 255
@parent ItemWindow

@param ItemWindowBackGround
@text Background Image Window Background Settings
@default ------------------------------
@parent ItemWindow

@param ItemWindowBackgroundImg
@text Background Image Window
@desc Specifies the background image window.
@type file
@dir img/
@parent ItemWindowBackGround

@param ItemWindowBackground_X
@text Background image X coordinate (relative)
@desc The item window background image X coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent ItemWindowBackGround

@param ItemWindowBackground_Y
@text Background image Y coordinate (relative)
@desc The item window's background image Y coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent ItemWindowBackGround

@param SkillWindow
@text Skill Selection Window
@default ////////////////////////////////

@param SkillWindowShow
@text Window Image Display
@desc Show window image. If you turn it off, the window behind the command will not be displayed.
@type boolean
@default true
@parent SkillWindow

@param SkillWindowOpacity
@text Skill window opacity
@desc Opacity of actor status window when skill window is displayed (0 = hidden)
@type number
@default 255
@min 0
@max 255
@parent SkillWindow

@param SkillWindowBackGround
@text Background Image Window Background Settings
@default ------------------------------
@parent SkillWindow

@param SkillWindowBackgroundImg
@text Background Image Window
@desc Specifies the background image window.
@type file
@dir img/
@parent SkillWindowBackGround

@param SkillBackground_X
@text Background image X coordinate (relative)
@desc Skill window background image X coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent SkillWindowBackGround

@param SkillBackground_Y
@text Background image Y coordinate (relative)
@desc Skill window background image Y coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent SkillWindowBackGround

@param HelpWindow
@text Help Window
@default ////////////////////////////////

@param HelpWindowShow
@text Window Image Display
@desc Show window image. If you turn it off, the window behind the command will not be displayed.
@type boolean
@default true
@parent HelpWindow

@param HelpWindowBackGround
@text Background Image Window Background Settings
@default ------------------------------
@parent HelpWindow

@param HelpWindowBackgroundImg
@text Background Image Window
@desc Specifies the background image window.
@type file
@dir img/
@parent HelpWindowBackGround

@param HelpBackground_X
@text Background image X coordinate (relative)
@desc The background image X coordinate (relative) of the help window.
@type number
@default 0
@min -9999
@max 9999
@parent HelpWindowBackGround

@param HelpBackground_Y
@text Background image Y coordinate (relative)
@desc Help window background image Y coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent HelpWindowBackGround

@param VictoryWindow
@text Victory Window
@default ////////////////////////////////

@param VictoryWindowAnchorMode
@text Victory window display position
@desc Victory window display position.
@type select
@default 'under'
@parent VictoryWindow
@option above
@value 'top'
@option under
@value 'under'

@param VictoryWindowOpacity
@text Window opacity when victory window is displayed
@desc Opacity of actor status window when victory window is displayed (0 = hidden)
@type number
@default 255
@min 0
@max 255
@parent VictoryWindow

@param VictoryWindowBackGround
@text Background Image Window Background Settings
@default ------------------------------
@parent VictoryWindow

@param VictoryBackgroundImg
@text Background Image Window
@desc Specifies the background image window.
@type file
@dir img/
@parent VictoryWindowBackGround

@param VictoryBackground_X
@text Background image X coordinate (relative)
@desc The result window background image X coordinate (relative).
@type number
@default 0
@min -9999
@max 9999
@parent VictoryWindowBackGround

@param VictoryBackground_Y
@text Background image Y coordinate (relative)
@desc The Y coordinate (relative) of the background image of the result status window.
@type number
@default 0
@min -9999
@max 9999
@parent VictoryWindowBackGround

@param LoseWindow
@text Defeat Window
@default ////////////////////////////////

@param LoseWindowAnchorMode
@text Window display position when defeated
@desc The position where the window is displayed when losing.
@type select
@default 'under'
@parent LoseWindow
@option above
@value 'top'
@option under
@value 'under'

@param LoseWindowOpacity
@text Window opacity when defeat window is displayed
@desc Opacity of actor status window when defeated (0 for hidden)
@type number
@default 255
@min 0
@max 255
@parent LoseWindow

@param LoseWindowBackGround
@text Background Image Window Background Settings
@default ------------------------------
@parent LoseyWindow

@param LoseBackgroundImg
@text Background Image Window
@desc Specifies the background image window.
@type file
@dir img/
@parent LoseWindowBackGround

@param LoseBackground_X
@text Background image X coordinate (relative)
@desc The X coordinate of the background image when defeated (relative).
@type number
@default 0
@min -9999
@max 9999
@parent LoseWindowBackGround

@param LoseBackground_Y
@text Background image Y coordinate (relative)
@desc The Y coordinate of the background image when defeated (relative).
@type number
@default 0
@min -9999
@max 9999
@parent LoseWindowBackGround

@param EscapeWindow
@text Escape Window
@default ////////////////////////////////

@param EscapeWindowAnchorMode
@text Window display position during escape
@desc The display position of the escape window.
@type select
@default 'under'
@parent EscapeWindow
@option above
@value 'top'
@option under
@value 'under'

@param EscapeWindowOpacity
@text Window opacity when window is displayed during escape
@desc Opacity of the actor status window when the escape window is displayed (0 for hidden)
@type number
@default 255
@min 0
@max 255
@parent EscapeWindow

@param EscapeWindowBackGround
@text Background Image Window Background Settings
@default ------------------------------
@parent EscapeWindow

@param EscapeBackgroundImg
@text Background image window when escape is successful
@desc Specifies the background image window when the escape is successful.
@type file
@dir img/
@parent EscapeWindowBackGround

@param EscapeBackground_X
@text Background image X coordinate (relative) when escape is successful
@desc The relative X coordinate of the background image when the escape is successful.
@type number
@default 0
@min -9999
@max 9999
@parent EscapeWindowBackGround

@param EscapeBackground_Y
@text Background image Y coordinate (relative) when escape is successful
@desc The relative Y coordinate of the background image when the escape is successful.
@type number
@default 0
@min -9999
@max 9999
@parent EscapeWindowBackGround

@param EscapeFailureBackgroundImg
@text Background image window when escape is successful
@desc Specifies the background image window when the escape is successful.
@type file
@dir img/
@parent EscapeWindowBackGround

@param EscapeFailureBackground_X
@text Background image X coordinate (relative) when escape is successful
@desc The relative X coordinate of the background image when the escape is successful.
@type number
@default 0
@min -9999
@max 9999
@parent EscapeWindowBackGround

@param EscapeFailureBackground_Y
@text Background image Y coordinate (relative) when escape is successful
@desc The relative Y coordinate of the background image when the escape is successful.
@type number
@default 0
@min -9999
@max 9999
@parent EscapeWindowBackGround

@param MessageWindow
@text Message window
@default ////////////////////////////////

@param MessageWindowOpacity
@text Message window opacity
@desc Opacity of the actor status window when the message window is displayed at the bottom (0 means hidden)
@type number
@default 255
@min 0
@max 255
@parent MessageWindow
*/

/*:ja
@target MZ
@plugindesc バトルスタイル拡張スタンダード設定用
@author NUUN
@base NUUN_BattleStyleEX
@orderBefore NUUN_BattleStyleEX
@version 1.1.1

@help
バトルレイアウトを変更します。
このプラグインでは他に以下の機能を実装します。
フロントビューでのアクターへのアニメーション
立ち絵表示
条件付き立ち絵切り替え
ステータスパラメータの表示座標変更
各ウィンドウの背景画像指定
コマンドの表示変更

アクターの顔グラを立ち絵にする場合は、プラグインパラメータのデフォルトアクター画像設定またはアクター画像座標拡大率設定で
アクターの画像モードを画像に設定してください。
アクター画像座標拡大率設定を設定してない場合はのデフォルトアクター画像設定の設定が適用されます。

アクターの画像設定で条件で顔グラまたは立ち絵を切り替える事ができます。また立ち絵、顔グラ表示EXに対応していますが、プラグインパラメータの
立ち絵表示EX適用をONにしてください。
条件の優先度は上から順に一致した条件が適用されます。通常時に適用される画像は一番下に設定してください。

各ステータスの座標位置を変更したい場合は、各項目の「〇〇の座標変更」をtureにしてください。

敵キャラのメモ欄
<AttackAnimation:11>
敵キャラの通常攻撃時、11番のアニメーションが再生されます。指定がない場合はプラグインパラメータのデフォルト値が適用されます。

木星ペンギン氏作疑似３Dバトルプラグインと併用して、フロントビューで味方にアニメーションを表示させる場合は
別途バトルスタイル拡張疑似３Dバトル併用パッチを導入してください。

ケケー氏作スピードスターバトルプラグインと併用して、フロントビューで味方にアニメーションを表示させる場合は
別途バトルスタイル拡張スピードスターバトル併用を導入してください。

更新履歴
2022/5/2 Ver.1.1.1
エフェクトのプロパティを中間（アクター画像とステータスの間）か最前面に表示する機能を追加。
2022/4/10 Ver.1.1.0
アクター画像設定のスイッチ、武器、防具、ステートの条件に複数指定できるように変更。
アクター画像設定に残りHPの条件を追加。 
アクター画像設定の職業でリストが表示されなかった問題を修正。
アクター画像設定のスキル、アイテム条件が適用されていなかった問題を修正。
2022/4/1 Ver.1.0.5
アクターコマンドの項目の表示位置を中央寄りにする機能を追加。
2022/3/29 Ver.1.0.4
敵選択、アイテム、スキル、ヘルプウィンドウ画像表示の説明文を変更。
2022/3/26 Ver.1.0.3
アクターウィンドウステータスのアクター配置を表示範囲可変表示に対する処理の追加。
2022/3/26 Ver.1.0.2
敵選択ウィンドウのスキン非表示を設定する項目がなかった問題を修正。
2022/3/25 Ver.1.0.1
立ち絵切り替え条件にスイッチ、武器、防具装備時、特定の職業を追加。
2022/3/24 Ver.1.0.0
初版

@param Setting
@text 共通設定
@default ////////////////////////////////

@param PartyCommand
@text パーティコマンド設定
@default ////////////////////////////////

@param PartyCommandPosition
@text コマンドの表示位置
@desc カスタム選択時のパーティコマンドの表示位置を指定します。
@type select
@option 上部
@value 'top'
@option 中間
@value 'middle'
@option アクターステータスウィンドウの上
@value 'under'
@option カスタム
@value 'custom'
@option デフォルト(座標は固定です)
@value 'default'
@default 'default'
@parent PartyCommand

@param PartyCommandMaxCol
@desc 表示するコマンド列数。
@text 表示コマンド列数
@type number
@default 1
@min 1
@max 99
@parent PartyCommand

@param PartyCommandMaxRow
@desc 表示するコマンド行数。
@text 表示コマンド行数
@type number
@default 4
@min 1
@max 99
@parent PartyCommand

@param PartyCommandWindow
@text パーティコマンドウィンドウ設定
@default ------------------------------
@parent PartyCommand

@param PartyCommandWindowShow
@desc ウィンドウ画像を表示する。背景指定時はOFFにしてください。(OFFでコマンドのみ表示されます。)
@text ウィンドウ画像表示
@type boolean
@default true
@parent PartyCommandWindow

@param PartyCommand_X
@desc パーティコマンドウィンドウのX座標を指定します。
@text コマンドウィンドウX座標
@type number
@default 0
@max 9999
@min -9999
@parent PartyCommandWindow

@param PartyCommand_Y
@desc パーティコマンドウィンドウのY座標を指定します。
@text コマンドウィンドウY座標
@type number
@default 0
@max 9999
@min -9999
@parent PartyCommandWindow

@param PartyCommand_Width
@desc パーティコマンドウィンドウの横幅を指定します。0でUI幅
@text コマンドウィンドウの横幅
@type number
@default 0
@max 9999
@min 0
@parent PartyCommandWindow

@param PartyCommandBackGround
@text パーティコマンド背景設定
@default ------------------------------
@parent PartyCommand

@param PartyCommandBackgroundImg
@desc パーティコマンドの背景画像ウィンドウを指定する。
@text パーティコマンド背景画像ウィンドウ
@type file
@dir img/
@default 
@parent PartyCommandBackGround

@param PartyBackground_X
@desc パーティコマンドの背景画像X座標（相対）。
@text 背景画像X座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent PartyCommandBackGround

@param PartyBackground_Y
@desc パーティコマンドの背景画像Y座標（相対）。
@text 背景画像Y座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent PartyCommandBackGround

@param PartyCommandOption
@text パーティコマンドオプション
@default ------------------------------
@parent PartyCommand

@param PartyCommandWindowCenter
@text ウィンドウ座標中央表示
@desc ウィンドウを中央に表示させます。(デフォルト以外)
@type boolean
@default false
@parent PartyCommandOption

@param PartyCommandMode
@desc パーティコマンドの項目を中央寄りに表示させます。
@text コマンド表示中央寄り
@type boolean
@default false
@parent PartyCommandOption

@param ActorCommand
@text アクターコマンド設定
@default ////////////////////////////////

@param ActorCommandWindowShow
@desc ウィンドウ画像を表示する。背景指定時はOFFにしてください。(OFFでコマンドのみ表示されます。)
@text ウィンドウ画像表示
@type boolean
@default true
@parent ActorCommand

@param ActorCommandPosition
@text アクターコマンドの表示方法
@desc アクターコマンドの表示方法を選択します。
@type select
@option デフォルト(座標は固定です)
@value 'default'
@option 上部
@value 'top'
@option 中間
@value 'middle'
@option アクターステータスウィンドウの上
@value 'under'
@option 各SVアクターの上（SV推奨）
@value 'svtop'
@option 各SVアクターの左（SV推奨）
@value 'svleft'
@option 各SVアクターの右（SV推奨）
@value 'svright'
@option カスタム
@value 'custom'
@default 'default'
@parent ActorCommand

@param ActorCommandMaxRow
@desc 表示できる最大コマンド行数。コマンド可変表示をOFFの場合はこの設定の値が適用されます。
@text 最大表示コマンド行数
@type number
@default 10
@min 1
@max 99
@parent ActorCommand

@param ActorCommandMinRow
@desc 表示する最低コマンド行数。
@text コマンド可変表示時の表示最低コマンド行数
@type number
@default 4
@min 1
@max 99
@parent ActorCommand

@param ActorCommandMaxCol
@desc 表示するコマンド列数。
@text 表示コマンド列数
@type number
@default 1
@min 1
@max 99
@parent ActorCommand

@param ActorCommandVariable
@desc アクターコマンドの表示数をコマンド数分表示します。（最大表示コマンド行数まで表示）
@text コマンド可変表示
@type boolean
@default true
@parent ActorCommand

@param ActorCommandWindow
@text アクターコマンドウィンドウ設定
@default ------------------------------
@parent ActorCommand

@param ActorCommand_X
@desc アクターコマンドウィンドウのX座標を指定します。
@text コマンドウィンドウX座標
@type number
@default 0
@max 9999
@min -9999
@parent ActorCommandWindow

@param ActorCommand_Y
@desc アクターコマンドウィンドウのY座標を指定します。
@text コマンドウィンドウY座標
@type number
@default 0
@max 9999
@min -9999
@parent ActorCommandWindow

@param ActorCommand_Width
@desc アクターコマンドウィンドウの横幅を指定します。
@text コマンドウィンドウの横幅
@type number
@default 192
@max 9999
@min 0
@parent ActorCommandWindow

@param ActorCommandBackGround
@text パーティコマンド背景設定
@default ------------------------------
@parent ActorCommand

@param ActorCommandBackgroundImg
@desc アクターコマンドの背景画像ウィンドウを指定する。
@text アクターコマンド背景画像ウィンドウ
@type file
@dir img/
@default 
@parent ActorCommandBackGround

@param ActorBackground_X
@desc アクターコマンドの背景画像X座標（相対）。
@text 背景画像X座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent ActorCommandBackGround

@param ActorBackground_Y
@desc アクターコマンドの背景画像Y座標（相対）。
@text 背景画像Y座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent ActorCommandBackGround

@param ActorCommandOption
@text アクターコマンドオプション
@default ------------------------------
@parent ActorCommand

@param ActorCommandWindowCenter
@text ウィンドウ座標中央表示
@desc ウィンドウを中央に表示させます。(上部、中間、アクターステータスの上、カスタムのみ)
@type boolean
@default true
@parent ActorCommandOption

@param ActorCommandMode
@desc アクターコマンドの項目を中央寄りに表示させます。
@text コマンド表示中央寄り
@type boolean
@default true
@parent ActorCommandOption

@param ActorStatus
@text アクターステータス設定
@default ////////////////////////////////

@param ActorMaxCol
@desc 横に並べるアクター数。
@text 横アクター数
@type number
@default 1
@min 1
@max 99
@parent ActorStatus

@param ActorMaxRow
@desc 縦に並べるアクター数。
@text 縦アクター数
@type number
@default 4
@min 1
@max 99
@parent ActorStatus

@param ActorStatusMode
@text アクターステータス表示方法
@desc アクターステータスの表示方法を選択します。
@type select
@option 左寄り
@value 'left'
@option 中央
@value 'center'
@option 右寄り
@value 'right'
@default 'center'
@parent ActorStatus

@param EnemyWindow
@text 敵キャラ選択設定
@default ------------------------------

@param EnemyWindowShow
@desc ウィンドウ画像を表示する。OFFにするとコマンド背後のウィンドウが表示されません。
@text ウィンドウ画像表示
@type boolean
@default true
@parent EnemyWindow

@param EnemyMaxRow
@desc 表示する行数。
@text 行数
@type number
@default 4
@min 1
@max 99
@parent EnemyWindow

@param EnemyMaxCol
@desc 表示する列数。
@text 列数
@type number
@default 2
@min 1
@max 99
@parent EnemyWindow

@param EnemyWindow_X
@desc 敵キャラウィンドウのX座標を指定します。
@text ウィンドウX座標
@type number
@default 0
@max 9999
@min -9999
@parent EnemyWindow

@param EnemyWindow_Y
@desc 敵キャラウィンドウのY座標を指定します。
@text ウィンドウY座標
@type number
@default 0
@max 9999
@min -9999
@parent EnemyWindow

@param EnemyWindow_Width
@desc 敵キャラウィンドウの横幅を指定します。0でUIサイズ 画面より大きい値にすると自動的に画面の横幅になります。
@text ウィンドウの横幅
@type number
@default 0
@max 9999
@min 0
@parent EnemyWindow

@param EnemyWindowOpacity
@desc 敵キャラ選択時のアクターステータスウィンドウの不透明度（0で非表示）
@text 選択時ウィンドウ不透明度
@type number
@default 255
@max 255
@min 0
@parent EnemyWindow

@param EnemyWindowOption
@text 敵キャラ選択ウィンドウオプション
@default ------------------------------
@parent EnemyWindow

@param EnemyWindowMode
@desc 敵キャラウィンドウの設定座標モード。(ON：デフォルトの表示位置からの相対座標 OFF:画面左上からの絶対座標)
@text 設定座標モード
@type boolean
@default true
@parent EnemyWindowOption

@param EnemyWindowBackGround
@text 背景画像ウィンドウ背景設定
@default ------------------------------
@parent EnemyWindow

@param EnemyWindowBackgroundImg
@desc 背景画像ウィンドウを指定する。
@text 背景画像ウィンドウ
@type file
@dir img/
@default 
@parent EnemyWindowBackGround

@param EnemyWindowBackground_X
@desc アクターステータスウィンドウの背景画像X座標（相対）。
@text 背景画像X座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent EnemyWindowBackGround

@param EnemyWindowBackground_Y
@desc アクターステータスウィンドウの背景画像Y座標（相対）。
@text 背景画像Y座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent EnemyWindowBackGround

@param ActorStatusWindow
@text アクターステータウィンドウ設定
@default ------------------------------
@parent ActorStatus

@param ActorStatusWindowLock
@desc コマンド選択時にアクターステータスウィンドウを固定します。
@text アクターステータスウィンドウ固定
@type boolean
@default false
@parent ActorStatusWindow

@param ActorStatusWindowPosition
@text ウィンドウ基準表示位置
@desc アクターステータスウィンドウの基準表示位置
@type select
@option UI画面下
@value 'ui_under'
@option 画面下
@value 'under'
@option カスタム
@value 'custom'
@default 'ui_under'
@parent ActorStatusWindow

@param ActorStatusWindow_X
@desc アクターステータスウィンドウのX座標（相対座標）を指定します。
@text ウィンドウのX座標（相対座標）
@type number
@default 0
@min -9999
@max 9999
@parent ActorStatusWindow

@param ActorStatusWindow_Y
@desc アクターステータスウィンドウのY座標（相対座標）を指定します。座標は「ウィンドウ基準表示位置」からの相対座標です。
@text ウィンドウのY座標（相対座標）
@type number
@default 0
@min -9999
@max 9999
@parent ActorStatusWindow

@param ActorStatusWindow_Width
@desc アクターステータスウィンドウの横幅を指定します。コマンドの表示位置がデフォルトの時はコマンド幅も含みます。 0でデフォルト値
@text ウィンドウの横幅
@type number
@default 0
@max 9999
@min 0
@parent ActorStatusWindow

@param ActorStatusWindow_Height
@desc アクターウィンドウ座標変更許可時のアクターステータスウィンドウの縦幅を指定します。0でデフォルト値
@text ウィンドウの縦幅
@type number
@default 0
@max 9999
@min 0
@parent ActorStatusWindow

@param WidthWithCommand
@desc アクターステータスウィンドウの横幅からアクターコマンドの横幅分サイズを調整します。
@text 横幅分サイズ調整
@type boolean
@default true
@parent ActorStatusWindow

@param WindowShow
@desc アクターステータスウィンドウ画像を表示する。
@text アクターステータスウィンドウ画像表示
@type boolean
@default true
@parent ActorStatusWindow

@param WindowFrameShow
@desc アクターステータスウィンドウ枠を表示する。
@text アクターステータスウィンドウ枠表示
@type boolean
@default false
@parent ActorStatusWindow

@param CursorBackShow
@desc アクターステータスウィンドウ背景を表示する。
@text アクターステータスウィンドウ背景表示
@type boolean
@default true
@parent ActorStatusWindow

@param ActorWindowBackGround
@text 背景画像ウィンドウ背景設定
@default ------------------------------
@parent ActorStatus

@param WindowBackground
@desc 背景画像ウィンドウを指定する。
@text 背景画像ウィンドウ
@type file
@dir img/
@default 
@parent ActorWindowBackGround

@param WindowBackground_X
@desc アクターステータスウィンドウの背景画像X座標（相対）。
@text 背景画像X座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent ActorWindowBackGround

@param WindowBackground_Y
@desc アクターステータスウィンドウの背景画像Y座標（相対）。
@text 背景画像Y座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent ActorWindowBackGround

@param ActorStatusOption
@text アクターステータスウィンドウオプション
@default ------------------------------
@parent ActorStatus

@param ActorStatusWindowCenter
@text ウィンドウ座標中央表示
@desc ウィンドウを中央に表示させます。
@type boolean
@default true
@parent ActorStatusOption

@param ActorSetting
@text アクター設定
@default ////////////////////////////////

@param DefaultStatusPositionData
@text デフォルトステータス座標表示設定
@desc デフォルトのステータスの座標、表示設定の設定を行います。
@default {"ActorNameChangePosition":"","NameChangePosition":"false","ActorName_X":"0","ActorName_Y":"10","ActorHPChangePosition":"------------------------------","HPGaugeWidth":"128","HPGaugeHeight":"12","HPChangePosition":"false","ActorHP_X":"8","ActorHP_Y":"180","ActorMPChangePosition":"------------------------------","MPGaugeWidth":"128","MPGaugeHeight":"12","MPChangePosition":"false","ActorMP_X":"8","ActorMP_Y":"314","ActorTPChangePosition":"------------------------------","TPGaugeWidth":"128","TPGaugeHeight":"12","TPChangePosition":"false","ActorTP_X":"8","ActorTP_Y":"448","ActorTPBChangePosition":"------------------------------","TPBGaugeWidth":"128","TPBGaugeHeight":"12","TPBChangePosition":"false","ActorTPB_X":"0","ActorTPB_Y":"0","ActorStateChangePosition":"------------------------------","StateChangePosition":"false","ActorState_X":"22","ActorState_Y":"156","OutsideWindowVisible":"false","ActorImgChangePosition":"------------------------------","ImgChangePosition":"false","ActorImg_X":"0","ActorImg_Y":"0","Background":"------------------------------","ActorBackground":"","ActorFrontBackground":""}
@type struct<StatusPositionData>
@parent ActorSetting

@param DefaultActorImgData
@text デフォルトアクター画像設定
@desc デフォルトのアクター画像の設定を行います。
@default {"ActorImgMode":"'none'","Actor_X":"0","Actor_Y":"0","Img_SX":"0","Img_SY":"0","Actor_Scale":"100"}
@type struct<ActorImgList>
@parent ActorSetting

@param ActorData
@text アクター座標、画像設定
@desc アクターの個別の座標、画像設定を行います。
@default []
@type struct<ActorDataList>[]
@parent ActorSetting

@param OnActorPictureEX
@desc 立ち絵表示EXでの設定を適用します。
@text 立ち絵表示EX適用
@type boolean
@default false
@parent ActorSetting

@param Img_SW
@desc アクター画像の表示横幅。
@text アクター画像表示横幅
@type number
@default 0
@min 0
@max 9999
@parent ActorSetting

@param Img_SH
@desc アクター画像の表示縦幅。
@text アクター画像表示横幅
@type number
@default 0
@min 0
@max 9999
@parent ActorSetting

@param SelectBackShow
@desc アクターの行動選択時に表示されるアクター背景を表示する。
@text アクター行動時背景表示
@type boolean
@default true
@parent ActorSetting

@param ActorSelectBackShow
@desc アクターの対象選択時に表示されるアクター背景を表示する。
@text アクターの対象選択時背景表示
@type boolean
@default true
@parent ActorSetting

@param ActorStatusParamOption
@text アクターステータスウィンドウステータスオプション
@default ------------------------------
@parent ActorSetting

@param NameShow
@desc 名前を表示します。
@text 名前表示
@type boolean
@default true
@parent ActorStatusParamOption

@param TPBShow
@desc TPBゲージを表示します。外部プラグインで別の場所にTPBゲージを表示するときに設定します。
@text TPBゲージ表示
@type boolean
@default true
@parent ActorStatusParamOption

@param OutsideWindowVisible
@desc アイコンの表示をウィンドウ枠外でも表示させます。(アクター画像の上に表示されます)
@text アイコンウィンドウ枠外表示
@type boolean
@default false
@parent ActorStatusParamOption

@param StateVisible
@desc アイコンを表示させます。外部プラグインで別の場所にステートアイコンを表示するときに設定します。
@text ステートアイコン表示
@type boolean
@default true
@parent ActorStatusParamOption

@param FaceHeight
@desc 顔グラの縦幅を指定します。（0でデフォルト）
@text 顔グラ縦幅
@type number
@default 0
@min 0
@max 9999
@parent ActorStatusParamOption

@param FaceHeightOnWindow
@desc 画像の高さ範囲をウィンドウ内に納めます。
@text 画像ウィンドウ内表示
@type boolean
@default true
@parent ActorStatusParamOption

@param ActorEffect
@text アクターアニメーションエフェクト設定
@default ////////////////////////////////

@param ActorEffectShow
@desc フロントビューでもアニメーションエフェクトを表示。
@text フロントビューエフェクト表示
@type boolean
@default false
@parent ActorEffect

@param EffectPriority
@text エフェクト表示プロパティ
@desc エフェクトの表示プロパティ。
@type select
@option 最前面
@value 'top'
@option 中間
@value 'middle'
@default 'top'
@parent ActorEffect

@param ActorEffect_X
@desc アニメーションエフェクトのX座標（相対座標）。
@text アニメーションエフェクトX座標（相対座標）
@type number
@default 0
@min -9999
@max 9999
@parent ActorEffect

@param ActorEffect_Y
@desc アニメーションエフェクトのY座標（相対座標）。
@text アニメーションエフェクトY座標（相対座標）
@type number
@default 0
@min -9999
@max 9999
@parent ActorEffect

@param ActorDamage_X
@desc ダメージエフェクトのX座標。（相対座標）
@text ダメージエフェクトX座標（相対座標）
@type number
@default 0
@min -9999
@max 9999
@parent ActorEffect

@param ActorDamage_Y
@desc ダメージエフェクトのY座標。（相対座標）
@text ダメージエフェクトY座標（相対座標）
@type number
@default 0
@min -9999
@max 9999
@parent ActorEffect

@param ActorsMirror
@desc アクターのアニメーションを反転します。
@text アクターアニメーション反転
@type boolean
@default true
@parent ActorEffect

@param ActorImgEffect
@text アクターグラフィックエフェクト設定
@default ////////////////////////////////

@param DamageImgFrame
@desc ダメージ、回復時の画像変化フレーム。
@text ダメージ、回復時変化フレーム
@type number
@default 30
@min 1
@max 9999
@parent ActorImgEffect

@param OnActorShake
@desc ダメージ時のシェイクを有効にする。
@text ダメージシェイク有効
@type boolean
@default false
@parent ActorImgEffect

@param ActorShakeFlame
@desc ダメージ時のシェイクフレーム。（デフォルト36）
@text シェイクフレーム
@type number
@default 36
@min 0
@parent ActorImgEffect

@param ActorShakePower
@desc ダメージ時のシェイクの大きさ。（デフォルト2）
@text シェイクの大きさ
@type number
@default 2
@min 0
@parent ActorImgEffect

@param ActorShakeSpeed
@desc ダメージ時のシェイクのスピード。（デフォルト20）
@text シェイクスピード
@type number
@default 20
@min 0
@parent ActorImgEffect

@param OnActionZoom
@desc 行動時のエフェクトを有効にする。
@text 行動時エフェクト有効
@type boolean
@default false
@parent ActorImgEffect

@param ActionZoomDuration
@desc 行動時のエフェクトフレーム
@text 行動時エフェクトフレーム
@type number
@default 60
@min 0
@parent ActorImgEffect

@param ActorFlash
@desc アクター対象選択時にアクター画像を点滅させます。
@text 選択時アクター画像点滅
@type boolean
@default true
@parent ActorImgEffect

@param ImgDeathHide
@desc 戦闘不能になった場合、アクター画像（顔グラ）を非表示にします。
@text 戦闘不能時アクター画像非表示
@type boolean
@default true
@parent ActorImgEffect

@param EnemyAnimation
@text 敵キャラアニメーション設定
@default ////////////////////////////////

@param EnemySkillAnimation
@desc 敵キャラのデフォルトの通常攻撃時のアニメーションID
@text 通常攻撃アニメーションID
@type animation
@default 1
@min 0
@parent EnemyAnimation

@param EnemyAppearWindow
@text モンスター出現ウィンドウ
@default ////////////////////////////////

@param AppearWindowVisible
@desc モンスターが出現したときのメッセージを表示しません。
@text モンスター出現メッセージ非表示
@type boolean
@default false
@parent EnemyAppearWindow

@param AppearWindowAnchorMode
@text 出現ウィンドウ表示位置
@desc 出現ウィンドウの表示位置。
@type select
@option 上
@value 'top'
@option 下
@value 'under'
@default 'under'
@parent EnemyAppearWindow

@param AppearWindowOpacity
@desc 敵出現メッセージ表示時のアクターステータスウィンドウの不透明度（0で非表示）
@text 敵出現メッセージ表示時ウィンドウ不透明度
@type number
@default 255
@max 255
@min 0
@parent EnemyAppearWindow

@param AppearWindowBackGround
@text 敵出現メッセージ背景画像ウィンドウ背景設定
@default ------------------------------
@parent EnemyAppearWindow

@param AppearBackgroundImg
@desc 敵出現メッセージの背景画像ウィンドウを指定する。
@text 敵出現背景画像ウィンドウ
@type file
@dir img/
@default 
@parent AppearWindowBackGround

@param AppearWindowBackground_X
@desc 敵出現メッセージの背景画像X座標（相対）。
@text 敵出現背景画像X座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent AppearWindowBackGround

@param AppearWindowBackground_Y
@desc 敵出現メッセージの背景画像Y座標（相対）。
@text 敵出現背景画像Y座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent AppearWindowBackGround

@param ItemWindow
@text アイテム選択ウィンドウ
@default ////////////////////////////////

@param ItemWindowShow
@desc ウィンドウ画像を表示する。OFFにするとコマンド背後のウィンドウが表示されません。
@text ウィンドウ画像表示
@type boolean
@default true
@parent ItemWindow

@param ItemWindowOpacity
@desc アイテムウィンドウ表示時のアクターステータスウィンドウの不透明度（0で非表示）
@text アイテムウィンドウ表示時ウィンドウ不透明度
@type number
@default 255
@max 255
@min 0
@parent ItemWindow

@param ItemWindowBackGround
@text 背景画像ウィンドウ背景設定
@default ------------------------------
@parent ItemWindow

@param ItemWindowBackgroundImg
@desc 背景画像ウィンドウを指定する。
@text 背景画像ウィンドウ
@type file
@dir img/
@default 
@parent ItemWindowBackGround

@param ItemWindowBackground_X
@desc アイテムウィンドウの背景画像X座標（相対）。
@text 背景画像X座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent ItemWindowBackGround

@param ItemWindowBackground_Y
@desc アイテムウィンドウの背景画像Y座標（相対）。
@text 背景画像Y座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent ItemWindowBackGround

@param SkillWindow
@text スキル選択ウィンドウ
@default ////////////////////////////////

@param SkillWindowShow
@desc ウィンドウ画像を表示する。OFFにするとコマンド背後のウィンドウが表示されません。
@text ウィンドウ画像表示
@type boolean
@default true
@parent SkillWindow

@param SkillWindowOpacity
@desc スキルウィンドウ表示時のアクターステータスウィンドウの不透明度（0で非表示）
@text スキルウィンドウ表示時ウィンドウ不透明度
@type number
@default 255
@max 255
@min 0
@parent SkillWindow

@param SkillWindowBackGround
@text 背景画像ウィンドウ背景設定
@default ------------------------------
@parent SkillWindow

@param SkillWindowBackgroundImg
@desc 背景画像ウィンドウを指定する。
@text 背景画像ウィンドウ
@type file
@dir img/
@default 
@parent SkillWindowBackGround

@param SkillBackground_X
@desc スキルウィンドウの背景画像X座標（相対）。
@text 背景画像X座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent SkillWindowBackGround

@param SkillBackground_Y
@desc スキルウィンドウの背景画像Y座標（相対）。
@text 背景画像Y座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent SkillWindowBackGround

@param HelpWindow
@text ヘルプウィンドウ
@default ////////////////////////////////

@param HelpWindowShow
@desc ウィンドウ画像を表示する。OFFにするとコマンド背後のウィンドウが表示されません。
@text ウィンドウ画像表示
@type boolean
@default true
@parent HelpWindow

@param HelpWindowBackGround
@text 背景画像ウィンドウ背景設定
@default ------------------------------
@parent HelpWindow

@param HelpWindowBackgroundImg
@desc 背景画像ウィンドウを指定する。
@text 背景画像ウィンドウ
@type file
@dir img/
@default 
@parent HelpWindowBackGround

@param HelpBackground_X
@desc ヘルプウィンドウの背景画像X座標（相対）。
@text 背景画像X座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent HelpWindowBackGround

@param HelpBackground_Y
@desc ヘルプウィンドウの背景画像Y座標（相対）。
@text 背景画像Y座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent HelpWindowBackGround

@param VictoryWindow
@text 勝利時ウィンドウ
@default ////////////////////////////////

@param VictoryWindowAnchorMode
@text 勝利ウィンドウ表示位置
@desc 勝利ウィンドウの表示位置。
@type select
@option 上
@value 'top'
@option 下
@value 'under'
@default 'under'
@parent VictoryWindow

@param VictoryWindowOpacity
@desc 勝利時ウィンドウ表示時のアクターステータスウィンドウの不透明度（0で非表示）
@text 勝利時ウィンドウ表示時ウィンドウ不透明度
@type number
@default 255
@max 255
@min 0
@parent VictoryWindow

@param VictoryWindowBackGround
@text 背景画像ウィンドウ背景設定
@default ------------------------------
@parent VictoryWindow

@param VictoryBackgroundImg
@desc 背景画像ウィンドウを指定する。
@text 背景画像ウィンドウ
@type file
@dir img/
@default 
@parent VictoryWindowBackGround

@param VictoryBackground_X
@desc リザルトウィンドウの背景画像X座標（相対）。
@text 背景画像X座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent VictoryWindowBackGround

@param VictoryBackground_Y
@desc リザルトステータスウィンドウの背景画像Y座標（相対）。
@text 背景画像Y座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent VictoryWindowBackGround

@param LoseWindow
@text 敗北時ウィンドウ
@default ////////////////////////////////

@param LoseWindowAnchorMode
@text 敗北時ウィンドウ表示位置
@desc 敗北時ウィンドウの表示位置。
@type select
@option 上
@value 'top'
@option 下
@value 'under'
@default 'under'
@parent LoseWindow

@param LoseWindowOpacity
@desc 敗北時ウィンドウ表示時のアクターステータスウィンドウの不透明度（0で非表示）
@text 敗北時ウィンドウ表示時ウィンドウ不透明度
@type number
@default 255
@max 255
@min 0
@parent LoseWindow

@param LoseWindowBackGround
@text 背景画像ウィンドウ背景設定
@default ------------------------------
@parent LoseyWindow

@param LoseBackgroundImg
@desc 背景画像ウィンドウを指定する。
@text 背景画像ウィンドウ
@type file
@dir img/
@default 
@parent LoseWindowBackGround

@param LoseBackground_X
@desc 敗北時の背景画像X座標（相対）。
@text 背景画像X座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent LoseWindowBackGround

@param LoseBackground_Y
@desc 敗北時の背景画像Y座標（相対）。
@text 背景画像Y座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent LoseWindowBackGround

@param EscapeWindow
@text 逃走時ウィンドウ
@default ////////////////////////////////

@param EscapeWindowAnchorMode
@text 逃走時ウィンドウ表示位置
@desc 逃走時ウィンドウの表示位置。
@type select
@option 上
@value 'top'
@option 下
@value 'under'
@default 'under'
@parent EscapeWindow

@param EscapeWindowOpacity
@desc 逃走時ウィンドウ表示時のアクターステータスウィンドウの不透明度（0で非表示）
@text 逃走時ウィンドウ表示時ウィンドウ不透明度
@type number
@default 255
@max 255
@min 0
@parent EscapeWindow

@param EscapeWindowBackGround
@text 背景画像ウィンドウ背景設定
@default ------------------------------
@parent EscapeWindow

@param EscapeBackgroundImg
@desc 逃走成功時の背景画像ウィンドウを指定する。
@text 逃走成功時背景画像ウィンドウ
@type file
@dir img/
@default 
@parent EscapeWindowBackGround

@param EscapeBackground_X
@desc 逃走成功時の背景画像X座標（相対）。
@text 逃走成功時背景画像X座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent EscapeWindowBackGround

@param EscapeBackground_Y
@desc 逃走成功時の背景画像Y座標（相対）。
@text 逃走成功時背景画像Y座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent EscapeWindowBackGround

@param EscapeFailureBackgroundImg
@desc 逃走成功時の背景画像ウィンドウを指定する。
@text 逃走成功時背景画像ウィンドウ
@type file
@dir img/
@default 
@parent EscapeWindowBackGround

@param EscapeFailureBackground_X
@desc 逃走成功時の背景画像X座標（相対）。
@text 逃走成功時背景画像X座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent EscapeWindowBackGround

@param EscapeFailureBackground_Y
@desc 逃走成功時の背景画像Y座標（相対）。
@text 逃走成功時背景画像Y座標（相対）
@type number
@default 0
@min -9999
@max 9999
@parent EscapeWindowBackGround

@param MessageWindow
@text メッセージウィンドウ
@default ////////////////////////////////

@param MessageWindowOpacity
@desc メッセージウィンドウが下側に表示時のアクターステータスウィンドウの不透明度（0で非表示）
@text メッセージウィンドウ表示時ウィンドウ不透明度
@type number
@default 255
@max 255
@min 0
@parent MessageWindow
*/

var Imported = Imported || {};
Imported.NUUN_BattleStyleEX_Standard = true;

(() => {

const parameters = PluginManager.parameters('NUUN_BattleStyleEX_Standard');
const params = {};

params.bsMode = 'Standard';

params.PartyCommandPosition = eval(parameters['PartyCommandPosition']) || 'default';
params.PartyCommandMaxCol = Number(parameters['PartyCommandMaxCol'] || 1);
params.PartyCommandMaxRow = Number(parameters['PartyCommandMaxRow'] || 4);
params.PartyCommand_X = Number(parameters['PartyCommand_X'] || 0);
params.PartyCommand_Y = Number(parameters['PartyCommand_Y'] || 0);
params.PartyCommand_Width = Number(parameters['PartyCommand_Width'] || 192);
params.PartyCommandMode = eval(parameters['PartyCommandMode'] || "false");
params.PartyCommandWindowShow = eval(parameters['PartyCommandWindowShow'] || "true");
params.PartyCommandWindowCenter = eval(parameters['PartyCommandWindowCenter'] || "false");
params.PartyCommandBackgroundImg = String(parameters['PartyCommandBackgroundImg']);
params.PartyBackground_X = Number(parameters['PartyBackground_X'] || 0);
params.PartyBackground_Y = Number(parameters['PartyBackground_Y'] || 0);

params.ActorCommandPosition = eval(parameters['ActorCommandPosition']) || 'default';
params.ActorCommand_Width = Number(parameters['ActorCommand_Width'] || 192);
params.ActorCommandVariable = eval(parameters['ActorCommandVariable'] || "true");
params.ActorCommandMaxRow = Number(parameters['ActorCommandMaxRow'] || 10);
params.ActorCommandMinRow = Number(parameters['ActorCommandMinRow'] || 4);
params.ActorCommandMaxCol = Number(parameters['ActorCommandMaxCol'] || 1);
params.ActorCommandMode = eval(parameters['ActorCommandMode'] || "false");
params.ActorCommand_X = Number(parameters['ActorCommand_X'] || 0);
params.ActorCommand_Y = Number(parameters['ActorCommand_Y'] || 0);
params.ActorCommandWindowShow = eval(parameters['ActorCommandWindowShow'] || "true");
params.ActorCommandWindowCenter = eval(parameters['ActorCommandWindowCenter'] || "true");
params.ActorCommandBackgroundImg = String(parameters['ActorCommandBackgroundImg']);
params.ActorBackground_X = Number(parameters['ActorBackground_X'] || 0);
params.ActorBackground_Y = Number(parameters['ActorBackground_Y'] || 0);
params.WidthWithCommand = eval(parameters['WidthWithCommand'] || "true");

params.EnemyWindowShow = eval(parameters['EnemyWindowShow'] || "true");
params.EnemyMaxRow = Number(parameters['EnemyMaxRow'] || 4);
params.EnemyMaxCol = Number(parameters['EnemyMaxCol'] || 1);
params.EnemyWindow_X = Number(parameters['EnemyWindow_X'] || 0);
params.EnemyWindow_Y = Number(parameters['EnemyWindow_Y'] || 0);
params.EnemyWindow_Width = Number(parameters['EnemyWindow_Width'] || 0);
params.EnemyWindowMode = eval(parameters['EnemyWindowMode'] || "true");
params.EnemyWindowOpacity = Number(parameters['EnemyWindowOpacity'] || 255);
params.EnemyWindowBackgroundImg = String(parameters['EnemyWindowBackgroundImg']);
params.EnemyWindowBackground_X = Number(parameters['EnemyWindowBackground_X'] || 0);
params.EnemyWindowBackground_Y = Number(parameters['EnemyWindowBackground_Y'] || 0);

params.ActorStatusVariable = false;
params.ActorMaxCol = Number(parameters['ActorMaxCol'] || 1);
params.ActorMaxRow = Number(parameters['ActorMaxRow'] || 4);
params.ActorStatusMode = eval(parameters['ActorStatusMode']) || "center";
params.ActorStatusWindowPosition = eval(parameters['ActorStatusWindowPosition']) || 'under';
params.ActorStatusWindow_X = Number(parameters['ActorStatusWindow_X'] || 0);
params.ActorStatusWindow_Y = Number(parameters['ActorStatusWindow_Y'] || 0);
params.ActorStatusWindow_Width = Number(parameters['ActorStatusWindow_Width'] || 0);
params.ActorStatusWindow_Height = Number(parameters['ActorStatusWindow_Height'] || 0);
params.ActorStatusWindowCenter = eval(parameters['ActorStatusWindowCenter'] || "false");
params.WindowBackground = String(parameters['WindowBackground']);
params.WindowBackground_X = Number(parameters['WindowBackground_X'] || 0);
params.WindowBackground_Y = Number(parameters['WindowBackground_Y'] || 0);
params.ActorStatusWindowLock = eval(parameters['ActorStatusWindowLock'] || "false");;
params.WindowShow = eval(parameters['WindowShow'] || "true");
params.WindowFrameShow = eval(parameters['WindowFrameShow'] || "false");
params.CursorBackShow = eval(parameters['CursorBackShow'] || "true");

params.ActorEffectShow = eval(parameters['ActorEffectShow'] || "false");
params.ActorEffect_X = Number(parameters['ActorEffect_X'] || 0);
params.ActorEffect_Y = Number(parameters['ActorEffect_Y'] || 0);
params.ActorDamage_X = Number(parameters['ActorDamage_X'] || 0);
params.ActorDamage_Y = Number(parameters['ActorDamage_Y'] || 0);
params.EffectPriority = eval(parameters['EffectPriority']) || 'middle';

params.DamageImgFrame = Number(parameters['DamageImgFrame'] || 30);
params.ActorShakeFlame = Number(parameters['ActorShakeFlame'] || 36);
params.ActorShakePower = Number(parameters['ActorShakePower'] || 2);
params.ActorShakeSpeed = Number(parameters['ActorShakeSpeed'] || 20);
params.ActionZoomDuration = Number(parameters['ActionZoomDuration'] || 60);
params.ActorFlash = eval(parameters['ActorFlash'] || "true");
params.OnActionZoom = eval(parameters['OnActionZoom'] || "false");
params.OnActorShake = eval(parameters['OnActorShake'] || "false");

params.DefaultStatusPositionData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultStatusPositionData'])) : null) || {};
params.DefaultActorImgData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultActorImgData'])) : null) || {};
params.ActorData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorData'])) : null) || [];
params.OnActorPictureEX = eval(parameters['OnActorPictureEX'] || "false");
params.Img_SW = Number(parameters['Img_SW'] || 0);
params.Img_SH = Number(parameters['Img_SH'] || 0);
params.FaceHeight = Number(parameters['FaceHeight'] || 0);
params.NameShow = eval(parameters['NameShow'] || "true");
params.TPBShow = eval(parameters['TPBShow'] || "true");
params.StateVisible = eval(parameters['StateVisible'] || "true");
params.OutsideWindowVisible = eval(parameters['OutsideWindowVisible'] || "false");
params.SelectBackShow = eval(parameters['SelectBackShow'] || "true");
params.ActorSelectBackShow = eval(parameters['ActorSelectBackShow'] || "true");
params.ImgDeathHide = eval(parameters['ImgDeathHide'] || "true");
params.FaceHeightOnWindow = eval(parameters['FaceHeightOnWindow'] || "true");

params.EnemySkillAnimation = Number(parameters['EnemySkillAnimation'] || 1);

params.AppearWindowVisible = eval(parameters['AppearWindowVisible'] || "false");
params.AppearWindowOpacity = Number(parameters['AppearWindowOpacity'] || 255);
params.AppearWindowAnchorMode = eval(parameters['AppearWindowAnchorMode']) || 'under';
params.AppearBackgroundImg = String(parameters['AppearBackgroundImg']);
params.AppearBackground_X = Number(parameters['AppearBackground_X'] || 0);
params.AppearBackground_Y = Number(parameters['AppearBackground_Y'] || 0);

params.ItemWindowShow = eval(parameters['ItemWindowShow'] || "true");
params.ItemWindowOpacity = Number(parameters['ItemWindowOpacity'] || 255);
params.ItemWindowBackgroundImg = String(parameters['ItemWindowBackgroundImg']);
params.ItemBackground_X = Number(parameters['ItemBackground_X'] || 0);
params.ItemBackground_Y = Number(parameters['ItemBackground_Y'] || 0);

params.SkillWindowShow = eval(parameters['SkillWindowShow'] || "true");
params.SkillWindowOpacity = Number(parameters['SkillWindowOpacity'] || 255);
params.SkillWindowBackgroundImg = String(parameters['SkillWindowBackgroundImg']);
params.SkillBackground_X = Number(parameters['SkillBackground_X'] || 0);
params.SkillBackground_Y = Number(parameters['SkillBackground_Y'] || 0);

params.HelpWindowShow = eval(parameters['HelpWindowShow'] || "true");
params.HelpWindowBackgroundImg = String(parameters['HelpWindowBackgroundImg']);
params.HelpBackground_X = Number(parameters['HelpBackground_X'] || 0);
params.HelpBackground_Y = Number(parameters['HelpBackground_Y'] || 0);

params.VictoryWindowAnchorMode = eval(parameters['VictoryWindowAnchorMode']) || 'under';
params.VictoryWindowOpacity = Number(parameters['VictoryWindowOpacity'] || 255);
params.VictoryBackgroundImg = String(parameters['VictoryBackgroundImg']);
params.VictoryBackground_X = Number(parameters['VictoryBackground_X'] || 0);
params.VictoryBackground_Y = Number(parameters['VictoryBackground_Y'] || 0);

params.LoseWindowAnchorMode = eval(parameters['LoseWindowAnchorMode']) || 'under';
params.LoseWindowOpacity = Number(parameters['LoseWindowOpacity'] || 255);
params.LoseBackgroundImg = String(parameters['LoseBackgroundImg']);
params.LoseBackground_X = Number(parameters['LoseBackground_X'] || 0);
params.LoseBackground_Y = Number(parameters['LoseBackground_Y'] || 0);

params.EscapeWindowAnchorMode = eval(parameters['EscapeWindowAnchorMode']) || 'under';
params.EscapeWindowOpacity = Number(parameters['EscapeWindowOpacity'] || 255);
params.EscapeBackgroundImg = String(parameters['EscapeBackgroundImg']);
params.EscapeBackground_X = Number(parameters['EscapeBackground_X'] || 0);
params.EscapeBackground_Y = Number(parameters['EscapeBackground_Y'] || 0);
params.EscapeFailureBackgroundImg = String(parameters['EscapeFailureBackgroundImg']);
params.EscapeFailureBackground_X = Number(parameters['EscapeFailureBackground_X'] || 0);
params.EscapeFailureBackground_Y = Number(parameters['EscapeFailureBackground_Y'] || 0);

params.MessageWindowOpacity = Number(parameters['MessageWindowOpacity'] || 255);

NuunManager.getBattleStyleParams = function() {
    return params;
};

})();