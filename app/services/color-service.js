'use strict';
const { randomInt } = require('crypto');
/**
 *  Generates new unused colors and stores used colors
 */
class ColorService {

    constructor() {
        this.usedColors = new Set();
    }

    getColor() {
        let newColor;
        do {
            newColor = this._getRandomColor();
        } while (this.usedColors.has(newColor));
        // TODO check if too similar to any used colors
        this.usedColors.add(newColor);
        return newColor;
    }

    returnColor(color) {
        this.usedColors.delete(color);
    }

    // Format is #ABCDEF
    _getRandomColor() {
        return `#${this._getRandomLightHexRGBVal()}${this._getRandomLightHexRGBVal()}${this._getRandomLightHexRGBVal()}`;
    }

    _getRandomLightHexRGBVal() {
        const randomVal = randomInt(0, 256);
        return randomVal.toString(16);
    }
}

module.exports = ColorService;
