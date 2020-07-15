export interface IGame {
    playerConnect(player: IPlayer);
    start();
    stop();
    sendAttackResult(result: AttackResult);
    sendNotice(msg: string);
    sendChat(msg: string);
    receiveChat(msg: string);
}