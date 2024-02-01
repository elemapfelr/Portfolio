let gameSessions = {}; // 게임 세션 저장

function makeNewGameSession(player1={}, player2={}){
    const sessionId = new Date().toString();
    gameSessions[sessionId] = {player1, player2};
    player1.sessionId = sessionId;
    player2.sessionId = sessionId;

    let msg = {
        type: 'GAME_START',
        data: {
            sessionId: sessionId,
            player1: {id: player1.user.id, unique: player1.user.unique},
            player2: {id: player2.user.id, unique: player2.user.unique},
        }
    }
    player1.send(JSON.stringify(msg))
    player2.send(JSON.stringify(msg))
}

module.exports = {makeNewGameSession}