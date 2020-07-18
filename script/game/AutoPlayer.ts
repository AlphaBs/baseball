import { LocalPlayer } from "./LocalPlayer";
import { AttackData } from "./AttackData";
import { Utils } from "../Utils";

export class AutoPlayer extends LocalPlayer {
    requestInputNumber(length: number, timeout: number): number[] {
        return Utils.randomNumbers(length);
    }
    requestAttackData(playerNumber: number, numberLength): void {
        super.requestAttackData(playerNumber, numberLength);
        let data = new AttackData(playerNumber, Utils.randomNumbers(numberLength));
        super.sendAttackData(data);
    }
}
