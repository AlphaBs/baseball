import { IPlayer } from "./IPlayer";
import { AttackData } from "./AttackData";
import { IGame } from "./IGame";

export class LocalPlayer implements IPlayer {
    playing: boolean;
    numbers: number[];
    game: IGame;
    id: number;

    constructor(game: IGame) {
        this.game = game;
    }

    start(id: number, players: string[]) {
        if (this.onStart) this.onStart(id, players);
        this.id = id;
    }
    onStart: (id: number, players: string[]) => void;

    setMyNumber(numbers: number[]) {
        if (this.onNumberSet) this.onNumberSet(numbers);
        this.numbers = numbers;
    }
    onNumberSet: (numbers: number[]) => void;

    requestInputNumber(length: number, timeout: number): number[] {
        if (!this.onRequestInputNumber)
            return this.onRequestInputNumber(length, timeout);
    }
    onRequestInputNumber: (length: number, timeout: number) => number[];

    requestAttackData(playerCount: number, numberLength: number): void {
        if (!this.onRequestAttackData) this.onRequestAttackData();
    }
    onRequestAttackData: () => AttackData;

    sendAttackData(attackData: AttackData) {
        this.game.receiveAttackData(this.id, attackData);
    }

    receiveNotice(msg: string) {
        if (this.onReceiveNotice) return this.onReceiveNotice(msg);
    }
    onReceiveNotice: (msg: string) => void;

    win() {
        if (this.onWin) return this.onWin();
    }
    onWin: () => void;

    lose() {
        if (this.onLose) return this.onLose();
    }
    onLose: () => void;

    quit() {
        if (this.onQuit) return this.onQuit();
    }
    onQuit: () => void;
}
