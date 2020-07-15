class DefaultGame implements IGame {
    numberLength = 4;
    players: Array<IPlayer> = [];

    playerConnect(player: IPlayer): void {
        this.players.push(player);
    }

    start() {

    }

    stop() {

    }

    sendAttackResult(result: AttackResult) {

    }

    attack(attackData: AttackData): AttackResult {
        let targetPlayer: IPlayer = this.players[attackData.target];
        // check targetPlayer null or undefined
        // check targetPlayer is playing

        let targetNumbers: Array<number> = targetPlayer.numbers;
        let ball: number = 0;
        let strike: number = 0;

        for (let i = 0; i < this.numberLength; i++) {
            let checkTargetNumber: number = targetNumbers[i];
            for (let j = 0; j < this.numberLength; j++) {
                let currentNumber: number = attackData.numbers[j];

                if (checkTargetNumber == currentNumber) {
                    if (i == j) 
                        strike++;
                    else
                        ball++;
                }
            }
        }

        return new AttackResult(
            attackData.target,
            attackData.numbers,
            ball,
            strike
        );
    }

    sendNotice() {

    }

    sendChat() {

    }

    receiveChat() {

    }
}