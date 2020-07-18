import { IGame } from "./IGame";
import { IPlayer } from "./IPlayer";
import { AttackData } from "./AttackData";
import { AttackResult } from "./AttackResult";
import { Utils } from "./../Utils";

class DefaultGame implements IGame {
    constructor() {}
    numberLength: number = 4;
    players: Array<IPlayer> = [];
    turn: number = 0;

    playing: boolean = false;
    attackPlayer: number;
    playingCount: number = 0;

    playerConnect(player: IPlayer): void {
        this.players.push(player);
    }

    start() {
        if (this.players.length < 2) {
            this.sendNoticeToAll("2명 이상의 플레이어가 접속해야 합니다.");
            return;
        }
        this.playing = true;
        this.attackPlayer = -1;
        this.playingCount = this.players.length;

        this.sendNoticeToAll("게임 시작!");
        this.sendNoticeToAll(
            `자신의 숫자 ${this.numberLength} 자리를 생각해 주세요.`
        );

        this.players.forEach((p) => {
            let input = this.inputNumbers(p, this.numberLength, 30 * 1000);

            if (input == null) {
                // 시간초과 혹은 유저 입력 실패했을때
                input = Utils.randomNumbers(this.numberLength);
                this.sendNotice(
                    `응답이 없어서 자동으로 ${input.join()}으로 설정합니다.`,
                    p
                );
            }

            p.setMyNumber(input);
        });

        while (this.playing) {
            this.turn++;

            for (let i = 0; i < this.players.length; i++) {
                let currentPlayer = this.players[i];
                if (!currentPlayer.playing) continue;

                this.attackPlayer = i;
                currentPlayer.requestAttackData(
                    this.players.length,
                    this.numberLength
                );
            }
        }
    }

    receiveAttackData(requestPlayer: number, attackData: AttackData) {
        if (this.attackPlayer != requestPlayer) return;

        this.attackPlayer = -1;
        // TODO: check targetPlayer is playing
        let attackResult: AttackResult = this.attack(attackData);
        this.sendAttackResult(attackResult);

        if (attackResult.strike == this.numberLength) {
            this.players[attackResult.target].lose();
            this.playingCount--;

            if (this.playingCount < 2) {
                this.players[this.attackPlayer].win();
                this.playing = false;
            }
        }
    }

    inputNumbers(
        target: IPlayer,
        length: number,
        timeout: number
    ): Array<number> {
        while (true) {
            if (false) {
                // TODO: timeout
                return null;
            }

            let input: Array<number> = target.requestInputNumber(
                length,
                timeout
            );
            if (input != null && input.length == length) return input;

            this.sendNotice(
                `${length}자리 숫자를 입력해주세요. ` +
                    `${input.length}자리를 입력하였습니다.`,
                target
            );
        }
    }

    stop() {}

    sendAttackResult(result: AttackResult) {}

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
                    if (i == j) strike++;
                    else ball++;
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

    sendNotice(msg: string, player: IPlayer) {
        player.receiveNotice(msg);
    }

    sendNoticeToAll(msg: string) {
        this.players.forEach((p) => {
            this.sendNotice(msg, p);
        });
    }

    sendChat(msg: string, player: IPlayer) {}

    sendChatToAll(msg: string) {
        this.players.forEach((p) => {
            this.sendChat(msg, p);
        });
    }

    receiveChat() {}
}
