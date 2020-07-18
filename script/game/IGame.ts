import { IPlayer } from "./IPlayer";
import { AttackResult } from "./AttackResult";
import { AttackData } from "./AttackData";

export interface IGame {
    playerConnect(player: IPlayer);
    start();
    stop();
    receiveAttackData(requestPlayer: number, attackData: AttackData);
    sendAttackResult(result: AttackResult);
    sendNotice(msg: string, player: IPlayer);
    sendChat(msg: string, player: IPlayer);
    receiveChat(msg: string);
}
