window.skins={};
function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.generateEUI = {};
generateEUI.paths = {};
generateEUI.styles = undefined;
generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml","Loading.LoadingPad":"resource/customer_skins/doctorPad/loadingPad.exml","Dialog.DialogPad":"resource/customer_skins/dialogPad/dialogPad.exml","Character.CharacterPad":"resource/customer_skins/characterPad/characterPad.exml"}
generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text")
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/catalogsPad/catalog.exml'] = window.skins.catalogSkin = (function (_super) {
	__extends(catalogSkin, _super);
	function catalogSkin() {
		_super.call(this);
		this.skinParts = ["mask","icon"];
		
		this.height = 90;
		this.width = 90;
		this.elementsContent = [this._Image1_i(),this.mask_i(),this.icon_i(),this._Label1_i()];
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("selected",
				[
					new eui.SetProperty("_Image1","source","resource/customer_ui/catalog/catalogBg.png")
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.icon"],[0],this.icon,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.data.catalog_name"],[0],this._Label1,"text")
	}
	var _proto = catalogSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.mask_i = function () {
		var t = new eui.Rect();
		this.mask = t;
		t.ellipseHeight = 56;
		t.ellipseWidth = 56;
		t.height = 56;
		t.width = 56;
		t.x = 17;
		t.y = 5;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 56;
		t.width = 56;
		t.x = 17;
		t.y = 5;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "微软雅黑";
		t.height = 24;
		t.size = 18;
		t.textAlign = "center";
		t.textColor = 0x00FFFF;
		t.verticalAlign = "middle";
		t.width = 90;
		t.x = 0;
		t.y = 65;
		return t;
	};
	return catalogSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/catalogsPad/catalogPad.exml'] = window.skins.catalogPadSkin = (function (_super) {
	__extends(catalogPadSkin, _super);
	var catalogPadSkin$Skin1 = 	(function (_super) {
		__extends(catalogPadSkin$Skin1, _super);
		var catalogPadSkin$Skin1$Skin2 = 		(function (_super) {
			__extends(catalogPadSkin$Skin1$Skin2, _super);
			function catalogPadSkin$Skin1$Skin2() {
				_super.call(this);
				this.skinParts = ["thumb"];
				
				this.elementsContent = [this.thumb_i()];
			}
			var _proto = catalogPadSkin$Skin1$Skin2.prototype;

			_proto.thumb_i = function () {
				var t = new eui.Image();
				this.thumb = t;
				t.scale9Grid = new egret.Rectangle(1,1,4,4);
				t.source = "resource/customer_ui/catalog/thumb.png";
				t.width = 8;
				return t;
			};
			return catalogPadSkin$Skin1$Skin2;
		})(eui.Skin);

		function catalogPadSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["verticalScrollBar"];
			
			this.elementsContent = [this.verticalScrollBar_i()];
		}
		var _proto = catalogPadSkin$Skin1.prototype;

		_proto.verticalScrollBar_i = function () {
			var t = new eui.VScrollBar();
			this.verticalScrollBar = t;
			t.percentHeight = 100;
			t.minHeight = 100;
			t.right = 0;
			t.width = 8;
			t.skinName = catalogPadSkin$Skin1$Skin2;
			return t;
		};
		return catalogPadSkin$Skin1;
	})(eui.Skin);

	function catalogPadSkin() {
		_super.call(this);
		this.skinParts = ["catalogBackground","ListCatalogs","scrListCatalogs"];
		
		this.minHeight = 520;
		this.minWidth = 450;
		this.elementsContent = [this.catalogBackground_i(),this.scrListCatalogs_i()];
	}
	var _proto = catalogPadSkin.prototype;

	_proto.catalogBackground_i = function () {
		var t = new eui.Image();
		this.catalogBackground = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 210;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(100,100,10,10);
		t.source = "resource/customer_ui/catalog/bg.png";
		t.top = 0;
		t.width = 450;
		return t;
	};
	_proto.scrListCatalogs_i = function () {
		var t = new eui.Scroller();
		this.scrListCatalogs = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 470;
		t.width = 400;
		t.x = 25;
		t.y = 25;
		t.viewport = this.ListCatalogs_i();
		t.skinName = catalogPadSkin$Skin1;
		return t;
	};
	_proto.ListCatalogs_i = function () {
		var t = new eui.List();
		this.ListCatalogs = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnAlign = "JUSTIFY_USING_GAP";
		t.horizontalGap = 5;
		t.requestedColumnCount = 4;
		t.verticalGap = 5;
		return t;
	};
	return catalogPadSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/characterPad/characterPad.exml'] = window.skins.characterPadSkin = (function (_super) {
	__extends(characterPadSkin, _super);
	function characterPadSkin() {
		_super.call(this);
		this.skinParts = ["waterMark","characterBackground","character","characterBorder"];
		
		this.elementsContent = [this.waterMark_i(),this.characterBackground_i(),this.character_i(),this.characterBorder_i()];
	}
	var _proto = characterPadSkin.prototype;

	_proto.waterMark_i = function () {
		var t = new eui.Image();
		this.waterMark = t;
		t.alpha = 0;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 680;
		t.source = "resource/customer_ui/character/huangyantai.png";
		t.width = 510;
		t.x = 24;
		t.y = 24;
		return t;
	};
	_proto.characterBackground_i = function () {
		var t = new eui.Image();
		this.characterBackground = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 20;
		t.scale9Grid = new egret.Rectangle(100,320,100,50);
		t.source = "resource/customer_ui/character/character_bg.png";
		t.width = 20;
		return t;
	};
	_proto.character_i = function () {
		var t = new eui.Image();
		this.character = t;
		t.alpha = 0;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 348;
		t.source = "resource/customer_ui/character/huangyantai.png";
		t.width = 260;
		t.x = 69;
		t.y = 77;
		return t;
	};
	_proto.characterBorder_i = function () {
		var t = new eui.Image();
		this.characterBorder = t;
		t.alpha = 0;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 400;
		t.scale9Grid = new egret.Rectangle(100,50,100,300);
		t.source = "resource/customer_ui/character/character_border.png";
		t.width = 300;
		t.x = 49;
		t.y = 53;
		return t;
	};
	return characterPadSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/dialogPad/dialogPad.exml'] = window.skins.dialogPanelSkin = (function (_super) {
	__extends(dialogPanelSkin, _super);
	function dialogPanelSkin() {
		_super.call(this);
		this.skinParts = ["leftTitle","rightTitle","border","dialogText","next"];
		
		this.height = 230;
		this.width = 600;
		this.elementsContent = [this.leftTitle_i(),this.rightTitle_i(),this.border_i(),this.dialogText_i(),this.next_i()];
	}
	var _proto = dialogPanelSkin.prototype;

	_proto.leftTitle_i = function () {
		var t = new eui.Label();
		this.leftTitle = t;
		t.anchorOffsetY = 0;
		t.height = 32;
		t.size = 20;
		t.textColor = 0x00a9a9;
		t.width = 100;
		t.x = 27;
		t.y = 14;
		return t;
	};
	_proto.rightTitle_i = function () {
		var t = new eui.Label();
		this.rightTitle = t;
		t.anchorOffsetY = 0;
		t.height = 32;
		t.size = 20;
		t.textColor = 0x00a9a9;
		t.width = 100;
		t.x = 473;
		t.y = 14;
		return t;
	};
	_proto.border_i = function () {
		var t = new eui.Image();
		this.border = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(50,50,100,100);
		t.source = "resource/customer_ui/dialog/border.png";
		t.top = 0;
		return t;
	};
	_proto.dialogText_i = function () {
		var t = new eui.Label();
		this.dialogText = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 157;
		t.left = 22;
		t.minHeight = 181;
		t.right = 26;
		t.size = 20;
		t.textColor = 0x00a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 13.5;
		t.width = 580;
		return t;
	};
	_proto.next_i = function () {
		var t = new eui.Image();
		this.next = t;
		t.anchorOffsetX = 10;
		t.anchorOffsetY = 10;
		t.height = 20;
		t.source = "resource/customer_ui/dialog/next.png";
		t.width = 20;
		t.x = 577;
		t.y = 197;
		return t;
	};
	return dialogPanelSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/finalPad/button.exml'] = window.skins.BackButtonSkin = (function (_super) {
	__extends(BackButtonSkin, _super);
	function BackButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","resource/customer_ui/final/backButton_down.png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = BackButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/customer_ui/final/backButton.png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "微软雅黑";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.text = "返回";
		t.textAlign = "center";
		t.textColor = 0x00FFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return BackButtonSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/finalPad/finalPad.exml'] = window.skins.finalPadSkin = (function (_super) {
	__extends(finalPadSkin, _super);
	function finalPadSkin() {
		_super.call(this);
		this.skinParts = ["playerInfo","backButton"];
		
		this.minHeight = 520;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.playerInfo_i(),this.backButton_i()];
	}
	var _proto = finalPadSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(20,20,410,580);
		t.source = "resource/customer_ui/final/bg.png";
		t.top = 0;
		return t;
	};
	_proto.playerInfo_i = function () {
		var t = new eui.List();
		this.playerInfo = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 400;
		t.width = 300;
		t.x = 75;
		t.y = 33;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		return t;
	};
	_proto.backButton_i = function () {
		var t = new eui.Button();
		this.backButton = t;
		t.height = 46;
		t.label = "返回";
		t.skinName = "skins.BackButtonSkin";
		t.width = 150;
		t.x = 150;
		t.y = 435;
		return t;
	};
	return finalPadSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/finalPad/player.exml'] = window.skins.playerFinalSkin = (function (_super) {
	__extends(playerFinalSkin, _super);
	function playerFinalSkin() {
		_super.call(this);
		this.skinParts = ["mask","icon","score"];
		
		this.height = 400;
		this.width = 300;
		this.elementsContent = [this._Image1_i(),this.mask_i(),this.icon_i(),this._Label1_i(),this._Label2_i(),this.score_i()];
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("selected",
				[
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.avatar"],[0],this.icon,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.data.nickname"],[0],this._Label1,"text")
		eui.Binding.$bindProperties(this, ["hostComponent.data.scores"],[0],this.score,"text")
	}
	var _proto = playerFinalSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 200;
		t.source = "resource/customer_ui/final/player_final.png";
		t.width = 200;
		t.x = 50;
		t.y = 0;
		return t;
	};
	_proto.mask_i = function () {
		var t = new eui.Rect();
		this.mask = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.height = 64;
		t.width = 64;
		t.x = 118;
		t.y = 28;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 64;
		t.width = 64;
		t.x = 118;
		t.y = 28;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "微软雅黑";
		t.height = 46;
		t.size = 36;
		t.textAlign = "center";
		t.textColor = 0x00FFFF;
		t.verticalAlign = "middle";
		t.width = 153;
		t.x = 74;
		t.y = 124;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "微软雅黑";
		t.height = 46;
		t.size = 20;
		t.text = "最终得分:";
		t.textAlign = "center";
		t.textColor = 0x00FFFF;
		t.verticalAlign = "middle";
		t.width = 153;
		t.x = 74;
		t.y = 247;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.Label();
		this.score = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "微软雅黑";
		t.height = 60;
		t.size = 44;
		t.textAlign = "center";
		t.textColor = 0x00FFFF;
		t.verticalAlign = "middle";
		t.width = 153;
		t.x = 74;
		t.y = 303;
		return t;
	};
	return playerFinalSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/loadingPad/processBar.exml'] = window.skins.CustomerProgressBarSkin = (function (_super) {
	__extends(CustomerProgressBarSkin, _super);
	function CustomerProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 60;
		this.minWidth = 400;
		this.elementsContent = [this._Image1_i(),this.thumb_i()];
	}
	var _proto = CustomerProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "resource/customer_ui/loading/track.png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "resource/customer_ui/loading/thumb.png";
		t.percentWidth = 100;
		return t;
	};
	return CustomerProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/loadingPad/loadingPad.exml'] = window.skins.loadingPanelSkin = (function (_super) {
	__extends(loadingPanelSkin, _super);
	function loadingPanelSkin() {
		_super.call(this);
		this.skinParts = ["pb"];
		
		this.minHeight = 1136;
		this.minWidth = 640;
		this.elementsContent = [this._Image1_i(),this.pb_i()];
	}
	var _proto = loadingPanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.percentHeight = 100;
		t.left = 0;
		t.right = 0;
		t.source = "resource/customer_ui/loading/bg.png";
		t.top = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.pb_i = function () {
		var t = new eui.ProgressBar();
		this.pb = t;
		t.height = 60;
		t.skinName = "skins.CustomerProgressBarSkin";
		t.width = 400;
		t.x = 120;
		t.y = 960;
		return t;
	};
	return loadingPanelSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/loginPad/button.exml'] = window.skins.CustomerButtonSkin = (function (_super) {
	__extends(CustomerButtonSkin, _super);
	function CustomerButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","resource/customer_ui/panel/login_button_down.png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = CustomerButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "resource/customer_ui/panel/login_button_up.png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "微软雅黑";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x00FFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return CustomerButtonSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/loginPad/input.exml'] = window.skins.CustomerTextInputSkin = (function (_super) {
	__extends(CustomerTextInputSkin, _super);
	function CustomerTextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("focused",
				[
					new eui.SetProperty("_Image1","source","resource/customer_ui/panel/textInput_selected.png")
				])
		];
	}
	var _proto = CustomerTextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(20,20,10,10);
		t.source = "resource/customer_ui/panel/textInput.png";
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0xffffff;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return CustomerTextInputSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/loginPad/loginPad.exml'] = window.skins.CustomerPanelSkin = (function (_super) {
	__extends(CustomerPanelSkin, _super);
	function CustomerPanelSkin() {
		_super.call(this);
		this.skinParts = ["login_input","pwd_input","code_input","loginButton","registButton","sendCheckButton","inputArea"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.inputArea_i()];
	}
	var _proto = CustomerPanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "resource/customer_ui/panel/border.png";
		t.top = 0;
		return t;
	};
	_proto.inputArea_i = function () {
		var t = new eui.Group();
		this.inputArea = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 205;
		t.left = 13;
		t.top = 11;
		t.width = 425;
		t.elementsContent = [this.login_input_i(),this.pwd_input_i(),this.code_input_i(),this.loginButton_i(),this.registButton_i(),this.sendCheckButton_i()];
		return t;
	};
	_proto.login_input_i = function () {
		var t = new eui.TextInput();
		this.login_input = t;
		t.horizontalCenter = 1.5;
		t.prompt = "输入登录名";
		t.skinName = "skins.CustomerTextInputSkin";
		t.verticalCenter = -76.5;
		return t;
	};
	_proto.pwd_input_i = function () {
		var t = new eui.TextInput();
		this.pwd_input = t;
		t.displayAsPassword = true;
		t.horizontalCenter = 1.5;
		t.prompt = "输入密码";
		t.skinName = "skins.CustomerTextInputSkin";
		t.verticalCenter = -29.5;
		return t;
	};
	_proto.code_input_i = function () {
		var t = new eui.TextInput();
		this.code_input = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = -74.5;
		t.prompt = "输入验证码";
		t.skinName = "skins.CustomerTextInputSkin";
		t.verticalCenter = 17.5;
		t.width = 148;
		return t;
	};
	_proto.loginButton_i = function () {
		var t = new eui.Button();
		this.loginButton = t;
		t.height = 46;
		t.label = "登录";
		t.skinName = "skins.CustomerButtonSkin";
		t.width = 150;
		t.x = 64;
		t.y = 149;
		return t;
	};
	_proto.registButton_i = function () {
		var t = new eui.Button();
		this.registButton = t;
		t.height = 46;
		t.label = "注册并登录";
		t.skinName = "skins.CustomerButtonSkin";
		t.width = 150;
		t.x = 215;
		t.y = 149;
		return t;
	};
	_proto.sendCheckButton_i = function () {
		var t = new eui.Button();
		this.sendCheckButton = t;
		t.height = 46;
		t.label = "发送验证";
		t.skinName = "skins.CustomerButtonSkin";
		t.width = 150;
		t.x = 215;
		t.y = 97;
		return t;
	};
	return CustomerPanelSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/questionPad/button.exml'] = window.skins.QuestionButtonSkin = (function (_super) {
	__extends(QuestionButtonSkin, _super);
	function QuestionButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","choiceButton"];
		
		this.height = 64;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 420;
		this.elementsContent = [this.choiceButton_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","resource/customer_ui/question/questionButton_up.png"),
					new eui.SetProperty("labelDisplay","textColor",0x00FFFF)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","resource/customer_ui/question/questionButton_down.png"),
					new eui.SetProperty("labelDisplay","textColor",0x00FFFF)
				])
			,
			new eui.State ("right",
				[
					new eui.SetProperty("_Image1","source","resource/customer_ui/question/questionButton_right.png"),
					new eui.SetProperty("labelDisplay","textColor",0x00FF00)
				])
			,
			new eui.State ("wrong",
				[
					new eui.SetProperty("_Image1","source","resource/customer_ui/question/questionButton_wrong.png"),
					new eui.SetProperty("labelDisplay","textColor",0xFF0000)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Image1","source","resource/customer_ui/question/questionButton_disable.png"),
					new eui.SetProperty("labelDisplay","textColor",0x888888)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.key"],[0],this.labelDisplay,"text")
	}
	var _proto = QuestionButtonSkin.prototype;

	_proto.choiceButton_i = function () {
		var t = new eui.Group();
		this.choiceButton = t;
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.height = 64;
		t.scale9Grid = new egret.Rectangle(240,36,20,4);
		t.width = 420;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.anchorOffsetX = 0;
		t.bottom = 8;
		t.left = 8;
		t.right = 12;
		t.size = 20;
		t.textAlign = "center";
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return QuestionButtonSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/questionPad/player.exml'] = window.skins.playerSkin = (function (_super) {
	__extends(playerSkin, _super);
	function playerSkin() {
		_super.call(this);
		this.skinParts = ["mask","icon","score"];
		
		this.height = 100;
		this.width = 175;
		this.elementsContent = [this._Image1_i(),this.mask_i(),this.icon_i(),this._Label1_i(),this.score_i()];
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("selected",
				[
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.avatar"],[0],this.icon,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.data.nickname"],[0],this._Label1,"text")
	}
	var _proto = playerSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "resource/customer_ui/question/player_info.png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.mask_i = function () {
		var t = new eui.Rect();
		this.mask = t;
		t.ellipseHeight = 30;
		t.ellipseWidth = 30;
		t.height = 38;
		t.width = 38;
		t.x = 18;
		t.y = 18;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.width = 38;
		t.x = 18;
		t.y = 18;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "微软雅黑";
		t.height = 24;
		t.size = 18;
		t.textAlign = "center";
		t.textColor = 0x00FFFF;
		t.verticalAlign = "middle";
		t.width = 90;
		t.x = 68;
		t.y = 23;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.Label();
		this.score = t;
		t.anchorOffsetX = 45;
		t.anchorOffsetY = 12;
		t.fontFamily = "微软雅黑";
		t.height = 24;
		t.size = 18;
		t.text = "得分:{data.score}";
		t.textAlign = "center";
		t.textColor = 0x00FFFF;
		t.verticalAlign = "middle";
		t.width = 90;
		t.x = 100;
		t.y = 70;
		return t;
	};
	return playerSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/questionPad/question.exml'] = window.skins.questionSkin = (function (_super) {
	__extends(questionSkin, _super);
	function questionSkin() {
		_super.call(this);
		this.skinParts = ["choice_list","choices"];
		
		this.height = 580;
		this.width = 520;
		this.elementsContent = [this._Image1_i(),this._Label1_i(),this.choices_i()];
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("selected",
				[
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.name"],[0],this._Label1,"text")
	}
	var _proto = questionSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(100,100,10,10);
		t.source = "resource/customer_ui/question/choice_bg.png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "微软雅黑";
		t.height = 66;
		t.size = 24;
		t.textAlign = "center";
		t.textColor = 0x00FFFF;
		t.verticalAlign = "middle";
		t.width = 436;
		t.x = 40;
		t.y = 40;
		return t;
	};
	_proto.choices_i = function () {
		var t = new eui.Group();
		this.choices = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 421;
		t.left = 40;
		t.top = 128;
		t.width = 436;
		t.elementsContent = [this.choice_list_i()];
		return t;
	};
	_proto.choice_list_i = function () {
		var t = new eui.List();
		this.choice_list = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnAlign = "JUSTIFY_USING_WIDTH";
		t.horizontalGap = 10;
		t.requestedColumnCount = 1;
		t.requestedRowCount = 4;
		t.verticalGap = 40;
		return t;
	};
	return questionSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/questionPad/questionPad.exml'] = window.skins.questionPadSkin = (function (_super) {
	__extends(questionPadSkin, _super);
	function questionPadSkin() {
		_super.call(this);
		this.skinParts = ["questionBackground","playerInfo","timer","question"];
		
		this.minHeight = 800;
		this.minWidth = 600;
		this.elementsContent = [this.questionBackground_i(),this.playerInfo_i(),this.timer_i(),this.question_i()];
	}
	var _proto = questionPadSkin.prototype;

	_proto.questionBackground_i = function () {
		var t = new eui.Image();
		this.questionBackground = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 210;
		t.scale9Grid = new egret.Rectangle(100,100,10,10);
		t.source = "resource/customer_ui/question/bg.png";
		t.width = 600;
		t.x = 0;
		t.y = 2;
		return t;
	};
	_proto.playerInfo_i = function () {
		var t = new eui.List();
		this.playerInfo = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 64;
		t.width = 175;
		t.x = 40;
		t.y = 34;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		return t;
	};
	_proto.timer_i = function () {
		var t = new eui.List();
		this.timer = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 120;
		t.width = 120;
		t.x = 240;
		t.y = 51;
		t.layout = this._TileLayout2_i();
		return t;
	};
	_proto._TileLayout2_i = function () {
		var t = new eui.TileLayout();
		t.columnAlign = "JUSTIFY_USING_GAP";
		return t;
	};
	_proto.question_i = function () {
		var t = new eui.List();
		this.question = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 580;
		t.width = 520;
		t.x = 40;
		t.y = 180;
		t.layout = this._TileLayout3_i();
		return t;
	};
	_proto._TileLayout3_i = function () {
		var t = new eui.TileLayout();
		t.columnAlign = "JUSTIFY_USING_GAP";
		return t;
	};
	return questionPadSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/questionPad/timer.exml'] = window.skins.timerSkin = (function (_super) {
	__extends(timerSkin, _super);
	function timerSkin() {
		_super.call(this);
		this.skinParts = ["circle_outter","circle_inner","timer_second"];
		
		this.height = 120;
		this.width = 120;
		this.elementsContent = [this.circle_outter_i(),this.circle_inner_i(),this.timer_second_i()];
		this.states = [
			new eui.State ("normal",
				[
					new eui.SetProperty("circle_outter","source","resource/customer_ui/question/timer_outter.png"),
					new eui.SetProperty("circle_inner","source","resource/customer_ui/question/timer_inner.png")
				])
			,
			new eui.State ("alert",
				[
					new eui.SetProperty("circle_outter","source","resource/customer_ui/question/timer_alert_outter.png"),
					new eui.SetProperty("circle_inner","source","resource/customer_ui/question/timer_alert_inner.png"),
					new eui.SetProperty("timer_second","textColor",0xFF0000)
				])
			,
			new eui.State ("stop",
				[
					new eui.SetProperty("timer_second","textColor",0x888888)
				])
		];
	}
	var _proto = timerSkin.prototype;

	_proto.circle_outter_i = function () {
		var t = new eui.Image();
		this.circle_outter = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.width = 120;
		t.x = 60;
		t.y = 60;
		return t;
	};
	_proto.circle_inner_i = function () {
		var t = new eui.Image();
		this.circle_inner = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.width = 120;
		t.x = 60;
		t.y = 60;
		return t;
	};
	_proto.timer_second_i = function () {
		var t = new eui.Label();
		this.timer_second = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "微软雅黑";
		t.height = 120;
		t.size = 60;
		t.text = "10";
		t.textAlign = "center";
		t.textColor = 0x00FFFF;
		t.verticalAlign = "middle";
		t.width = 120;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return timerSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/tipPad/info.exml'] = window.skins.infoSkin = (function (_super) {
	__extends(infoSkin, _super);
	function infoSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Label1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.info"],[0],this._Label1,"text")
	}
	var _proto = infoSkin.prototype;

	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Source Han Sans";
		t.height = 100;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x00FFFF;
		t.verticalAlign = "middle";
		return t;
	};
	return infoSkin;
})(eui.Skin);generateEUI.paths['resource/customer_skins/tipPad/tipPad.exml'] = window.skins.TipSkin = (function (_super) {
	__extends(TipSkin, _super);
	function TipSkin() {
		_super.call(this);
		this.skinParts = ["tipInfo"];
		
		this.elementsContent = [this._Rect1_i(),this._Image1_i(),this.tipInfo_i()];
	}
	var _proto = TipSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(100,20,10,10);
		t.source = "resource/customer_ui/tip/info_bg.png";
		t.percentWidth = 100;
		return t;
	};
	_proto.tipInfo_i = function () {
		var t = new eui.List();
		this.tipInfo = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.x = 0;
		t.y = 0;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		return t;
	};
	return TipSkin;
})(eui.Skin);