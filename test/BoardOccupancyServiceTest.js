const assert = require('chai').assert;
const Coordinate = require('../app/models/coordinate');
const Player = require('../app/models/player');
const BoardOccupancyService = require('../app/services/board-occupancy-service');

describe('BoardOccupancyService', () => {
    'use strict';

    let boardOccupancyService;

    const createPlayer = (id, coords) => {
        const player = new Player(id);
        player._segments = coords.map(([x, y]) => new Coordinate(x, y));
        return player;
    };

    const addPlayersToBoard = (players) => {
        players.forEach(p => {
            boardOccupancyService.addPlayerOccupancy(p.id, p.getSegments());
        });
    };

    beforeEach(() => {
        boardOccupancyService = new BoardOccupancyService();
    });

    it('should detect no kills', done => {
        const players = [
            createPlayer(1, [[5,1],[4,1],[3,1],[2,1],[1,1]]),
            createPlayer(2, [[5,2],[4,2],[3,2],[2,2],[1,2]]),
            createPlayer(3, [[5,3],[4,3],[3,3],[2,3],[1,3]]),
            createPlayer(4, [[5,4],[4,4],[3,4],[2,4],[1,4]])
        ];
        addPlayersToBoard(players);

        const killReports = boardOccupancyService.getKillReports();
        assert.equal(killReports.length, 0);
        done();
    });

    it('should detect a single player kill', done => {
        const players = [
            createPlayer(1, [[4,2],[4,1],[3,1],[2,1],[1,1]]),
            createPlayer(2, [[5,2],[4,2],[3,2],[2,2],[1,2]]),
            createPlayer(3, [[5,3],[4,3],[3,3],[2,3],[1,3]]),
            createPlayer(4, [[5,4],[4,4],[3,4],[2,4],[1,4]])
        ];
        addPlayersToBoard(players);

        const killReports = boardOccupancyService.getKillReports();
        assert.equal(killReports.length, 1);
        assert.equal(killReports[0].killerId, 2);
        assert.equal(killReports[0].victimId, 1);
        done();
    });

    it('should detect multiple kills', done => {
        const players = [
            createPlayer(1, [[4,2],[4,1],[3,1],[2,1],[1,1]]),
            createPlayer(2, [[5,2],[4,2],[3,2],[2,2],[1,2]]),
            createPlayer(3, [[4,2],[4,3],[3,3],[2,3],[1,3]]),
            createPlayer(4, [[4,3],[4,4],[3,4],[2,4],[1,4]])
        ];
        addPlayersToBoard(players);

        const killReports = boardOccupancyService.getKillReports();
        assert.equal(killReports.length, 3);
        assert.equal(killReports[0].killerId, 2);
        assert.equal(killReports[0].victimId, 1);
        assert.equal(killReports[1].killerId, 2);
        assert.equal(killReports[1].victimId, 3);
        assert.equal(killReports[2].killerId, 3);
        assert.equal(killReports[2].victimId, 4);
        done();
    });

    it('should detect a head-to-head collision', done => {
        const players = [
            createPlayer(1, [[2,1],[1,1]]),
            createPlayer(2, [[2,1],[3,1]])
        ];
        addPlayersToBoard(players);

        const killReports = boardOccupancyService.getKillReports();
        assert.equal(killReports.length, 1);
        assert.deepEqual(killReports[0].getVictimIds(), [1, 2]);
        done();
    });

    it('should detect a head-to-head collision overlapping multiple coordinates', done => {
        const players = [
            createPlayer(1, [[2,1],[1,1]]),
            createPlayer(2, [[1,1],[2,1]])
        ];
        addPlayersToBoard(players);

        const killReports = boardOccupancyService.getKillReports();
        assert.equal(killReports.length, 2);
        assert.equal(killReports[0].killerId, 1);
        assert.equal(killReports[0].victimId, 2);
        assert.equal(killReports[1].killerId, 2);
        assert.equal(killReports[1].victimId, 1);
        done();
    });

    it('should determine if a player has collided with itself', done => {
        const player = createPlayer(1, [[4,2],[4,1],[4,2]]);
        boardOccupancyService.addPlayerOccupancy(player.id, player.getSegments());

        const killReports = boardOccupancyService.getKillReports();
        assert.equal(killReports.length, 1);
        assert.equal(killReports[0].killerId, 1);
        assert.equal(killReports[0].victimId, 1);
        done();
    });

    it('should detect food consumed by player', done => {
        const foodId = 'food1';
        const foodCoordinate = new Coordinate(4, 2);
        boardOccupancyService.addFoodOccupancy(foodId, foodCoordinate);

        const player = createPlayer(1, [[4,2],[4,1],[3,1],[2,1],[1,1]]);
        boardOccupancyService.addPlayerOccupancy(player.id, player.getSegments());

        let foodsConsumed = boardOccupancyService.getFoodsConsumed();
        assert.equal(foodsConsumed.length, 1);
        assert.equal(foodsConsumed[0].foodId, foodId);
        assert.equal(foodsConsumed[0].playerId, player.id);

        boardOccupancyService.removeFoodOccupancy(foodId, foodCoordinate);
        foodsConsumed = boardOccupancyService.getFoodsConsumed();
        assert.equal(foodsConsumed.length, 0);
        done();
    });

    it('should maintain a consistent kill report when a player occupancy is removed', done => {
        const players = [
            createPlayer(1, [[2,1],[1,1]]),
            createPlayer(2, [[2,1],[3,1]])
        ];
        addPlayersToBoard(players);

        const killReports = boardOccupancyService.getKillReports();
        assert.equal(killReports[0].getVictimIds().length, 2);
        const copyOfKillReport = JSON.stringify(killReports[0]);
        assert.equal(JSON.stringify(killReports[0]), copyOfKillReport);

        boardOccupancyService.removePlayerOccupancy(players[1].id, players[1].getSegments());
        assert.equal(JSON.stringify(killReports[0]), copyOfKillReport);
        done();
    });
});
