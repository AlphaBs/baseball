class AttackResult {
    constructor(targetId: number, attackNumber: Array<number>, ball: number, strike: number) {
        this.target = targetId;
        this.number = attackNumber;
        this.ball = ball;
        this.strike = strike;
    }

    target: number;
    number: Array<number>;
    ball: number;
    strike: number;
}