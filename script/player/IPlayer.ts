import { AttackData } from "../AttackData";

export interface IPlayer {
    playing: boolean;
    numbers: Array<number>;

    setMyNumber(numbers: Array<number>);
    requestInputNumber(length: number, timeout: number): Array<number>;

    requestAttackData(): AttackData;

    receiveNotice(msg: string);

    win();
    lose();
    quit();
}
