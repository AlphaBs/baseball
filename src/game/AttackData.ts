export class AttackData {
    constructor(target: number, num: Array<number>) {
        this.target = target;
        this.numbers = num;
    }

    target: number;
    numbers: Array<number>;
}
