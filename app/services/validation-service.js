'use strict';
const StringValidator = require('validator');
const ServerConfig = require('../configs/server-config');
const isValidDataUrl = require('valid-data-url');

class ValidationService {

    static cleanString(string) {
        if (this.isString(string)) {
            return StringValidator.escape(string.trim());
        }
        return false;
    }

    static isString(stringCandidate) {
        return (typeof stringCandidate === 'string' || stringCandidate instanceof String);
    }

    static isValidPlayerName(playerName) {
        return playerName && StringValidator.isLength(playerName.trim(), { min: 1, max: ServerConfig.PLAYER_MAX_NAME_LENGTH });
    }

    static isValidBase64DataURI(uri) {
        return isValidDataUrl(uri);
    }
}

module.exports = ValidationService;
