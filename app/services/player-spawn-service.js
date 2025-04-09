'use strict';
const { randomInt } = require('crypto'); // Import de randomInt
const Direction = require('../models/direction');

class PlayerSpawnService {
    constructor(boardOccupancyService) {
        this.boardOccupancyService = boardOccupancyService;
    }

    /**
     * Spawn a player at the given coordinates with the corresponding direction
     * @param {Array} possibleSpawnCoordinates - Available coordinates for the spawn
     * @param {number} directionChance - The chance to spawn in a particular direction
     * @param {Array} directions - Array of possible directions for the spawn
     * @returns {Object} { newDirection, spawnCoordinate }
     */
    _spawnInCoordinates(possibleSpawnCoordinates, directionChance, directions) {
        if (possibleSpawnCoordinates.length === 0) {
            return;
        }
        const direction = randomInt(0, 2) < directionChance ? directions[0] : directions[1];
        const spawnCoordinate = direction === directions[0]
            ? possibleSpawnCoordinates[possibleSpawnCoordinates.length - 1]
            : possibleSpawnCoordinates[0];
        return { newDirection: direction, spawnCoordinate };
    }

    /**
     * Try to spawn the player in a safe area with enough time to react.
     * If no safe area is available, don't spawn the player.
     * @param {Object} player
     * @param {number} playerLength
     * @param {number} requiredFreeLength
     */
    async setupNewSpawn(player, playerLength, requiredFreeLength) {
        let spawnCoordinate;
        let newDirection;
        const randomValue = randomInt(0, 100) / 100;
        const directionsHorizontal = [Direction.LEFT, Direction.RIGHT];
        const directionsVertical = [Direction.UP, Direction.DOWN];

        const getSpawnCoordinates = (orientation, corner) => {
            if (orientation === 'horizontal') {
                switch (corner) {
                    case 'topLeft':
                        return this.boardOccupancyService.getUnoccupiedHorizontalCoordinatesFromTopLeft(requiredFreeLength);
                    case 'topRight':
                        return this.boardOccupancyService.getUnoccupiedHorizontalCoordinatesFromTopRight(requiredFreeLength);
                    case 'bottomRight':
                        return this.boardOccupancyService.getUnoccupiedHorizontalCoordinatesFromBottomRight(requiredFreeLength);
                    case 'bottomLeft':
                        return this.boardOccupancyService.getUnoccupiedHorizontalCoordinatesFromBottomLeft(requiredFreeLength);
                }
            } else {
                switch (corner) {
                    case 'topLeft':
                        return this.boardOccupancyService.getUnoccupiedVerticalCoordinatesFromTopLeft(requiredFreeLength);
                    case 'topRight':
                        return this.boardOccupancyService.getUnoccupiedVerticalCoordinatesFromTopRight(requiredFreeLength);
                    case 'bottomRight':
                        return this.boardOccupancyService.getUnoccupiedVerticalCoordinatesFromBottomRight(requiredFreeLength);
                    case 'bottomLeft':
                        return this.boardOccupancyService.getUnoccupiedVerticalCoordinatesFromBottomLeft(requiredFreeLength);
                }
            }
        };

        const spawnPlayer = (orientation) => {
            const randomValue2 = randomInt(0, 100) / 100;
            let corner;

            if (randomValue2 < 0.25) {
                corner = 'topLeft';
            } else if (randomValue2 < 0.5) {
                corner = 'topRight';
            } else if (randomValue2 < 0.75) {
                corner = 'bottomRight';
            } else {
                corner = 'bottomLeft';
            }

            const possibleSpawnCoordinates = getSpawnCoordinates(orientation, corner);
            if (possibleSpawnCoordinates) {
                const directionChance = 1;
                const result = orientation === 'horizontal'
                    ? this._spawnInCoordinates(possibleSpawnCoordinates, directionChance, directionsHorizontal)
                    : this._spawnInCoordinates(possibleSpawnCoordinates, directionChance, directionsVertical);
                if (result) {
                    newDirection = result.newDirection;
                    spawnCoordinate = result.spawnCoordinate;
                }
            }
        };

        if (randomValue < 0.5) {
            spawnPlayer('horizontal');
        } else {
            spawnPlayer('vertical');
        }

        if (!spawnCoordinate) {
            return;
        }

        this.boardOccupancyService.addPlayerOccupancy(player.id, [spawnCoordinate]);
        player.setStartingSpawn(newDirection, spawnCoordinate, playerLength - 1);
    }
}

module.exports = PlayerSpawnService;
