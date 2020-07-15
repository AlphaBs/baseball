import { IPlayer } from "../player/IPlayer";
import { AttackResult } from "../AttackResult";

export interface IGame {
    playerConnect(player: IPlayer);
    start();
    stop();
    sendAttackResult(result: AttackResult);
    sendNotice(msg: string, player: IPlayer);
    sendChat(msg: string, player: IPlayer);
    receiveChat(msg: string);
}
