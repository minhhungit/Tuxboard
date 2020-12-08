"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetSettings = void 0;
const TuxboardService_1 = require("../Services/TuxboardService");
const common_1 = require("../core/common");
const SettingValue_1 = require("../Models/SettingValue");
class WidgetSettings {
    constructor(widget, selector = null) {
        this.widget = widget;
        this.selector = selector;
        this.widgetSettingsSelector = ".widget-settings";
        this.widgetSettingsCancelButtonSelector = ".settings-cancel";
        this.widgetSettingsSaveButtonSelector = ".settings-save";
        this.widgetSettingInputsSelector = ".setting-value";
        this.service = new TuxboardService_1.TuxboardService();
        this.widgetSettingsSelector = selector || this.widgetSettingsSelector;
    }
    getDom() {
        return this.widget.getDom().querySelector(this.widgetSettingsSelector);
    }
    showWidgetSettings() {
        const settings = this.getDom();
        if (settings && settings.getAttribute('hidden') !== null) {
            settings.removeAttribute('hidden');
        }
        this.widget.hideBody();
    }
    hideWidgetSettings() {
        const settings = this.getDom();
        if (settings && settings.getAttribute('hidden') === null) {
            settings.setAttribute('hidden', '');
        }
        this.widget.showBody();
    }
    attachSettingsEvent() {
        const saveButton = this.getDom().querySelector(this.widgetSettingsSaveButtonSelector);
        saveButton.addEventListener('click', (ev) => {
            this.saveSettingsClick(ev);
        }, false);
        const cancelButton = this.getDom().querySelector(this.widgetSettingsCancelButtonSelector);
        cancelButton.addEventListener('click', () => {
            this.hideWidgetSettings();
            this.widget.showBody();
        }, false);
    }
    getSettingValues() {
        const inputs = this.getDom().querySelectorAll(this.widgetSettingInputsSelector);
        return Array.from(inputs).map((elem, index) => {
            return new SettingValue_1.SettingValue(common_1.getDataId(elem), elem.value);
        });
    }
    saveSettingsClick(ev) {
        const values = this.getSettingValues();
        this.service.saveSettings(values)
            .then((response) => {
            // Find the title if there is one
            const setting = Array.from(response).filter((elem) => elem.name.toLowerCase() === "widgettitle")[0];
            if (setting) {
                this.widget.setTitle(setting.value);
            }
            this.hideWidgetSettings();
            this.widget.update();
        });
    }
    displaySettings() {
        this.widget.showOverlay();
        this.service.getWidgetSettings(this.widget.getPlacementId())
            .then((data) => {
            const settings = this.getDom();
            if (settings) {
                common_1.clearNodes(settings);
                settings.insertAdjacentHTML("beforeend", String(data));
                this.widget.hideBody();
                this.widget.hideOverlay();
                this.showWidgetSettings();
                this.attachSettingsEvent();
            }
            else {
                this.widget.showBody();
                this.hideWidgetSettings();
            }
        });
    }
}
exports.WidgetSettings = WidgetSettings;
//# sourceMappingURL=WidgetSettings.js.map