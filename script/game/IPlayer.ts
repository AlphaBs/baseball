import { AttackData } from "./AttackData";

export interface IPlayer {
    playing: boolean;
    numbers: Array<number>;
    id: number;

    start(id: number, players: string[]);

    setMyNumber(numbers: Array<number>);
    requestInputNumber(length: number, timeout: number): Array<number>;

    requestAttackData(playerCount: number, numberLength: number): void;
    sendAttackData(attackData: AttackData);

    receiveNotice(msg: string);

    win();
    lose();
    quit();
}
